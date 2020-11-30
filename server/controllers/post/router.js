const express = require('express')
const router = express.Router()
const postController = require("./controller")

router.get('/my-posts', postController.getPostsByUserId)
      .get('/all-sell-posts-homepage', postController.getSellPostsForHomepage)
      .get('/all-rent-posts-homepage', postController.getRentPostsForHomepage)
      .get('/all-posts', postController.getAllPosts)
      .post('/create', postController.createPost)
      .post('/detail', postController.getPostById)
      .post('/update/:postId', postController.updatePostById)
      .delete('/delete', postController.deletePostById)
      .post('/save', postController.savePost)
      .post('/unsave', postController.unsavePost)
      .post('/filter-one-district', postController.filterOneDistrict)
      .post('/filter-many-districts', postController.filterDistricts)

module.exports = router