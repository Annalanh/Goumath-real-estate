const User = require('../../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs')
const path = require('path')

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
                    const token = jwt.sign(payload, 'privateKey', { expiresIn: 600 });
                    res.send({ status: true, message: 'Signin success', token, username })
                } else {
                    res.send({ status: false, message: 'Signin fail' })
                }
            } else {
                res.send({ status: false, message: 'Signin fail' })
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
            if (userFound) res.send({ status: false, message: 'Username or email has already existed !' })
            else {
                let form = formidable({ multiples: true })

                form.parse(req, function (err, fields, files) {

                    console.log('fields', fields)

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
                                let newPath = path.join(__dirname, '../../../', `goumath-client/public/assets/uploads/${file.name}`)
                                avatarPath = `/assets/uploads/${file.name}`

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
                                        res.send({ status: true, token, username })
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
}
module.exports = new AuthenticationController()
