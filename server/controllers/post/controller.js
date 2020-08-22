const formidable = require('formidable');
const Post = require('../../models/post')
const User = require('../../models/user')
const path = require('path')
const fs = require('fs')
let generateUUID = require('../../utils/uuid-generator')

class PostController {
    getPostsByUserId(req, res) {
        let current = Number(req.query.current)
        let pageSize = Number(req.query.pageSize)
        let userId = req.query.userId
        let { type, publish_status } = req.query
        let filterInfo = { author: userId }

        if (type != 'null') {
            filterInfo.type = type
        }
        if (publish_status != 'null') {
            filterInfo.publish_status = publish_status
        }

        let skip = pageSize * (current - 1)

        Post.count(filterInfo, (err, number) => {
            Post.find(filterInfo).skip(skip).limit(pageSize).exec((err, data) => {
                res.send({ results: data, totalCount: number })
            })
        })
    }

    getAllPosts(req, res) {
        let current = Number(req.query.current)
        let pageSize = Number(req.query.pageSize)
        let { type, publish_status } = req.query
        let filterInfo = {}

        if (type != 'null') {
            filterInfo.type = type
        }
        if (publish_status != 'null') {
            filterInfo.publish_status = publish_status
        }

        let skip = pageSize * (current - 1)

        Post.count(filterInfo, (err, number) => {
            Post.find(filterInfo).skip(skip).limit(pageSize).exec((err, data) => {
                res.send({ results: data, totalCount: number })
            })
        })
    }

    createPost(req, res) {
        let form = formidable({ multiples: true })
        let listImg = []

        form.parse(req, function (err, fields, files) {
            if (err) res.send({ status: false, message: "Cannot upload the files!" })
            else {
                let {
                    author,
                    type,
                    category,
                    title,
                    area,
                    num_bedroom,
                    num_floor,
                    num_bathroom,
                    province,
                    district,
                    ward,
                    street,
                    direction,
                    house_no,
                    lat,
                    lon,
                    radius,
                    price,
                    price_unit,
                    facade,
                    built_year,
                    car_parking,
                    fully_furnitured,
                    business_usable,
                    posted_by_landholder,
                    description,
                    contact_name,
                    contact_phone,
                    contact_email,
                    transaction_status,
                    publish_status
                } = fields

                if (type == 'sell' || type == 'rent') {
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
                            let avatarPath = `/assets/uploads/${uuid}_${file.name}`
                            listImg.push(avatarPath)

                            fs.copyFile(oldPath, newPath, (err) => {
                                if (err) throw err;
                            });
                        })
                    }

                    Post.create({
                        author,
                        type,
                        category,
                        title,
                        area: Number(area),
                        num_bedroom: Number(num_bedroom),
                        num_floor: Number(num_floor),
                        num_bathroom: Number(num_bathroom),
                        province,
                        district,
                        ward,
                        street,
                        direction,
                        house_no: Number(house_no),
                        lat,
                        lon,
                        price,
                        price_unit,
                        facade,
                        built_year: Number(built_year),
                        car_parking: JSON.parse(car_parking),
                        fully_furnitured: JSON.parse(fully_furnitured),
                        business_usable: JSON.parse(business_usable),
                        posted_by_landholder: JSON.parse(posted_by_landholder),
                        description,
                        contact_name,
                        contact_phone,
                        contact_email,
                        list_img: listImg,
                        transaction_status,
                        publish_status
                    }).then(postCreated => {
                        if (postCreated) {
                            res.send({ status: true, message: "new post is created" })
                        } else {
                            res.send({ status: false, message: "cannot create a new post" })
                        }
                    })
                } else {
                    Post.create({
                        author,
                        type,
                        category,
                        title,
                        area: Number(area),
                        num_bedroom: Number(num_bedroom),
                        num_floor: Number(num_floor),
                        num_bathroom: Number(num_bathroom),
                        province,
                        district,
                        ward,
                        street,
                        direction,
                        house_no: Number(house_no),
                        lat,
                        lon,
                        radius,
                        price,
                        price_unit,
                        description,
                        contact_name,
                        contact_phone,
                        contact_email,
                        transaction_status,
                        publish_status
                    }).then(postCreated => {
                        if (postCreated) {
                            res.send({ status: true, message: "new post is created" })
                        } else {
                            res.send({ status: false, message: "cannot create a new post" })
                        }
                    })
                }
            }
        })
    }

    getPostById(req, res) {
        let { postId, userId } = req.body

        Post.findOne({ _id: postId })
            .populate({
                path: 'author',
                select: 'avatar',
            })
            .exec((err, post) => {
                if (err) res.send({ status: false, message: "Cannot find post" })
                else {
                    User.findOne({ _id: userId }, (err, user) => {
                        if(err) res.send({status: false, message: "Current user does not exist"})
                        else{
                            let favoritePosts = user.favorite_posts
                            let isSaved = favoritePosts.includes(postId)
                            res.send({status: true, post, isSaved})
                        }
                    })
                }
            })
    }

    updatePostById(req, res) {
        let { postId } = req.params
        let form = formidable({ multiples: true })
        let listImg = []

        form.parse(req, function (err, fields, files) {
            if (err) res.send({ status: false, message: "Cannot upload the files!" })
            else {
                let {
                    type,
                    category,
                    title,
                    area,
                    num_bedroom,
                    num_floor,
                    num_bathroom,
                    province,
                    district,
                    ward,
                    street,
                    direction,
                    house_no,
                    lat,
                    lon,
                    radius,
                    price,
                    price_unit,
                    facade,
                    built_year,
                    car_parking,
                    fully_furnitured,
                    business_usable,
                    posted_by_landholder,
                    description,
                    contact_name,
                    contact_phone,
                    contact_email,
                    transaction_status,
                    publish_status,
                    currentUploadedFiles
                } = fields

                if (type == 'sell' || type == 'rent') {
                    if (currentUploadedFiles != 'empty') {
                        let currentUploadedFilesToArray = currentUploadedFiles.split(',')
                        currentUploadedFilesToArray.forEach(file => {
                            listImg.push(file)
                        })
                    }
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
                            let avatarPath = `/assets/uploads/${uuid}_${file.name}`
                            listImg.push(avatarPath)

                            fs.copyFileSync(oldPath, newPath);
                        })
                    }

                    Post.findOneAndUpdate({ _id: postId }, {
                        $set: {
                            type,
                            category,
                            title,
                            area: Number(area),
                            num_bedroom: Number(num_bedroom),
                            num_floor: Number(num_floor),
                            num_bathroom: Number(num_bathroom),
                            province,
                            district,
                            ward,
                            street,
                            direction,
                            house_no: Number(house_no),
                            lat,
                            lon,
                            price,
                            price_unit,
                            facade,
                            built_year: Number(built_year),
                            car_parking: JSON.parse(car_parking),
                            fully_furnitured: JSON.parse(fully_furnitured),
                            business_usable: JSON.parse(business_usable),
                            posted_by_landholder: JSON.parse(posted_by_landholder),
                            description,
                            contact_name,
                            contact_phone,
                            contact_email,
                            list_img: listImg,
                            transaction_status,
                            publish_status
                        }
                    }, { new: true }, (err, postCreated) => {
                        if (postCreated) {
                            res.send({ status: true, message: "post is updated" })
                        } else {
                            res.send({ status: false, message: "cannot update the post" })
                        }
                    })
                } else {
                    Post.findOneAndUpdate({ _id: postId }, {
                        $set: {
                            type,
                            category,
                            title,
                            area: Number(area),
                            num_bedroom: Number(num_bedroom),
                            num_floor: Number(num_floor),
                            num_bathroom: Number(num_bathroom),
                            province,
                            district,
                            ward,
                            street,
                            direction,
                            house_no: Number(house_no),
                            lat,
                            lon,
                            radius,
                            price,
                            price_unit,
                            description,
                            contact_name,
                            contact_phone,
                            contact_email,
                            transaction_status,
                            publish_status
                        }
                    }, { new: true }, (err, postCreated) => {
                        if (postCreated) {
                            res.send({ status: true, message: "post is updated" })
                        } else {
                            res.send({ status: false, message: "cannot update the post" })
                        }
                    })
                }
            }
        })
    }

    deletePostById(req, res) {
        let { postId } = req.body

        Post.deleteOne({ _id: postId }, (err) => {
            if (err) res.send({ status: false, message: "Cannot delete this post" })
            else res.send({ status: true, message: "Post is deleted" })
        })
    }

    async savePost(req, res) {
        let { userId, postId } = req.body
        try{
            let userInfo = await User.findOne({ _id: userId })
            userInfo.favorite_posts.push(postId)
            try{
                await userInfo.save()
                res.send({status: true})
            }catch(err){
                res.send({status: false, message: "Cannot save post"})
            }  
        }catch(err){
            res.send({status: false, message: "Current user does not exist"})
        }  
    }

    async unsavePost(req, res){
        let { userId, postId } = req.body
        try{
            let userInfo = await User.findOne({ _id: userId })
            let favoritePosts = userInfo.favorite_posts
            favoritePosts.splice(favoritePosts.indexOf(postId), 1)
            try{
                await userInfo.save()
                res.send({status: true})
            }catch(err){
                res.send({status: false, message: "Cannot unsave post"})
            }  
        }catch(err){
            res.send({status: false, message: "Current user does not exist"})
        }  
    }
}
module.exports = new PostController()