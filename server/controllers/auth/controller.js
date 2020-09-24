const User = require('../../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs')
const path = require('path')
let generateUUID = require('../../utils/uuid-generator')

class AuthenticationController {
    login(req, res) {
        let { username, password } = req.body
        User.findOne({ username }).then((userFound) => {
            if (userFound) {
                if (bcrypt.compareSync(password, userFound.password)) {
                    const payload = {
                        username,
                        password
                    }
                    const token = jwt.sign(payload, 'privateKey', { expiresIn: 6000 });
                    res.send({ status: true, message: 'Signin success', token, username, userId: userFound._id })
                } else {
                    res.send({ status: false, message: 'wrong username or password' })
                }
            } else {
                res.send({ status: false, message: 'wrong username or password' })
            }
        })
    }
    signup(req, res) {
        let
            { username,
                fullname,
                email,
                phone,
                password,
            } = req.query

        User.findOne({ username }).then((userFound) => {
            if (userFound) res.send({ status: false, message: 'Username has already existed' })
            else {
                let form = formidable({ multiples: true })

                form.parse(req, function (err, fields, files) {
                    if (err) res.send({ status: false, message: "Cannot upload the files!" })
                    else {
                        let avatarPath = '/assets/uploads/default-avatar.png'
                        if (files.uploadedFiles) {
                            let uploadedFiles = files.uploadedFiles
                            let uploadedFilesLength = uploadedFiles.length
                            let fileList = []

                            if (uploadedFilesLength == undefined) {
                                fileList.push(uploadedFiles)
                            } else {
                                for (let i = 0; i < uploadedFilesLength; i++) {
                                    fileList.push(uploadedFiles[i])
                                }
                            }

                            fileList.forEach(file => {
                                let oldPath = file.path;
                                let uuid = generateUUID()
                                let newPath = path.join(__dirname, '../../../', `goumath-client/public/assets/uploads/${uuid}_${file.name}`)
                                avatarPath = `/assets/uploads/${uuid}_${file.name}`

                                fs.copyFile(oldPath, newPath, (err) => {
                                    if (err) throw err;
                                });
                            })
                        }

                        bcrypt.genSalt(saltRounds, function (err, salt) {
                            bcrypt.hash(password, salt, function (err, hash) {
                                User.create({
                                    username,
                                    fullname,
                                    email,
                                    phone,
                                    password: hash,
                                    avatar: avatarPath
                                }).then(userCreated => {
                                    if (userCreated) {
                                        const payload = {
                                            username,
                                            password: hash
                                        }
                                        const token = jwt.sign(payload, 'privateKey', { expiresIn: 600 });
                                        res.send({ status: true, token, username, userId: userCreated._id })
                                    } else {
                                        res.send({ status: false })
                                    }
                                })
                            });
                        });
                    }
                })
            }
        })
    }
    forgotPassword(req, res){
        let { newPassword, userId } = req.body

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(newPassword, salt, function (err, hash) {
                User.findOneAndUpdate({ _id: userId }, { $set: {password: hash} }, { new: true }, (err, doc) => {
                    if (err) res.send({ status: false, message: "k đổi đc" })
                    else {
                        res.send({ status: true, doc, message: "new password updated" })
                    }
                })
            });
        });
    }
}
module.exports = new AuthenticationController()
