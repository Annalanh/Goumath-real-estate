const express = require('express')
const router = express.Router()
const postController = require("./controller")

router.get('/my-posts', postController.getPostsByUserId)
      .get('/all-posts', postController.getAllPosts)
      .post('/create', postController.createPost)
      .post('/detail', postController.getPostById)
      .post('/update/:postId', postController.updatePostById)
      .delete('/delete', postController.deletePostById)
      .post('/save', postController.savePost)
      .post('/unsave', postController.unsavePost)

module.exports = router