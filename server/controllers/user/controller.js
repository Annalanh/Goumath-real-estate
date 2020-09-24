const User = require('../../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs')
const path = require('path')
let generateUUID = require('../../utils/uuid-generator')

class UserController {
    getUserByUsername(req, res) {
        let { username } = req.params

        User.findOne({ username }, function (err, userInfo) {
            if (err) res.send({ status: false, message: "User not found!" })
            else {
                res.send({ status: true, userInfo })
            }
        })
    }

    updateUserById(req, res) {
        let { fullname, username, email, phone, password, dob, gender, address, role, userId, defaultAvatar, register_province, register_district, is_register } = req.query
        let newUserData = { fullname, username, email, phone, dob, gender, address, role, register_province, register_district, is_register }
        let form = formidable({ multiples: true })

        if (password !== '') newUserData.password = password
        form.parse(req, function (err, fields, files) {
            if (err) res.send({ status: false, message: "Cannot upload the files!" })
            else {
                if (defaultAvatar == 'true') {
                    newUserData.avatar = '/assets/uploads/default-avatar.png'
                } else {
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
                            let uuid = generateUUID()
                            let newPath = path.join(__dirname, '../../../', `goumath-client/public/assets/uploads/${uuid}_${file.name}`)
                            avatarPath = `/assets/uploads/${uuid}_${file.name}`

                            fs.copyFile(oldPath, newPath, (err) => {
                                if (err) throw err;
                            });
                        })
                        newUserData.avatar = avatarPath
                    }
                }


                User.findOneAndUpdate({ _id: userId }, { $set: newUserData }, { new: true }, (err, doc) => {
                    if (err) res.send({ status: false, message: "cannot update profile" })
                    else {
                        res.send({ status: true, doc, message: "profile is updated" })
                    }
                })
            }
        })
    
    }

    changePassword(req, res) {
        let { oldPassword, newPassword, username } = req.body

        User.findOne({ username }).then((userFound) => {
            if (bcrypt.compareSync(oldPassword, userFound.password)) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(newPassword, salt, function (err, hash) {
                        res.send({ status: true, password: hash })
                    });
                });

            } else {
                res.send({ status: false, message: 'incorrect password' })
            }
        })
    }

    getFavoritePostsByUserId(req, res) {
        let current = Number(req.query.current)
        let pageSize = Number(req.query.pageSize)
        let userId = req.query.userId
        let { type, publish_status, all_types } = req.query
        let filterInfo = { $and: [] }

        if (type != 'null') {
            filterInfo.$and.push({ type })
        } else {
            if (all_types == 'sell-rent') {
                filterInfo.$and.push({ $or: [{ type: "sell" }, { type: "rent" }] })
            } else {
                filterInfo.$and.push({ $or: [{ type: "need buy" }, { type: "need rent" }] })
            }
        }
        if (publish_status != 'null') {
            filterInfo.$and.push({ publish_status })
        }

        let skip = pageSize * (current - 1)

        User.findOne({ _id: userId })
            .populate({
                path: 'favorite_posts',
                select: '_id type title area price house_no street ward district province lat lon radius num_floor num_bathroom num_bedroom createdAt direction list_img',
                match: filterInfo,
            })
            .exec((err, doc) => {
                if (err) res.send({ status: false, message: 'cannot retrieve favorite posts' })
                else {
                    let returnFavoritePosts = []

                    let filteredFavoritePosts = doc.favorite_posts
                    let totalPostCount = filteredFavoritePosts.length
                    let chosenFilteredPostCount = 0;

                    for (let i = 0; i < totalPostCount; i++) {
                        if (i + 1 > skip) {
                            chosenFilteredPostCount += 1
                            if (chosenFilteredPostCount <= pageSize) returnFavoritePosts.push(filteredFavoritePosts[i])
                            else break
                        }
                    }
                    res.send({ status: true, favorite_posts: returnFavoritePosts, totalPostCount })
                }
            })
    }
}
module.exports = new UserController()
