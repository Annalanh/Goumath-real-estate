const User = require('../../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs')
const path = require('path')

class UserController {
    getUserByUsername(req, res) {
        let { username } = req.params

        User.findOne({ username }, function (err, userInfo) {
            if (err) res.send({ status: false, message: "User not found!" })
            else res.send({ status: true, userInfo })
        })
    }

    updateUserByUsername(req, res) {
        let { fullname, username, email, phone, password, dob, gender, address, role } = req.query
        let newUserData = { fullname, username, email, phone, dob, gender, address, role }
        let form = formidable({ multiples: true })

        if(password !== '') newUserData.password = password
        form.parse(req, function (err, fields, files) {
            if (err) res.send({ status: false, message: "Cannot upload the files!" })
            else {
                if (files.uploadedFiles) {
                    let uploadedFiles = files.uploadedFiles
                    let uploadedFilesLength = uploadedFiles.length
                    let fileList = []
                    let avatarPath = ''

                    if (uploadedFilesLength == undefined) {
                        fileList.push(uploadedFiles)
                    } else {
                        for (let i = 0; i < uploadedFilesLength; i++) {
                            fileList.push(uploadedFiles[i])
                        }
                    }

                    fileList.forEach(file => {
                        let oldPath = file.path;
                        let newPath = path.join(__dirname, '../../../', `goumath-client/public/assets/uploads/${file.name}`)
                        avatarPath = `/assets/uploads/${file.name}`

                        fs.copyFile(oldPath, newPath, (err) => {
                            if (err) throw err;
                        });
                    })
                    newUserData.avatar = avatarPath
                }

                User.findOneAndUpdate({ username }, { $set: newUserData }, { new: true }, (err, doc) => {
                    if (err) res.send({ status: false, message: "Update fail!" })
                    else {
                        res.send({ status: true, doc })
                    }
                })
            }
        })
    }

    changePassword(req, res){
        let { oldPassword, newPassword, username } = req.body

        User.findOne({ username }).then((userFound) => {
            if (bcrypt.compareSync(oldPassword, userFound.password)) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(newPassword, salt, function (err, hash) {
                        res.send({ status: true, password: hash })
                    });
                });
               
            } else {
                res.send({ status: false, message: 'Invalid password!' })
            }
        })
    }

}
module.exports = new UserController()
