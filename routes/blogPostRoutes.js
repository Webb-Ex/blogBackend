const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogPostController');
const  validateToken  = require('../middleware/validateToken');


router.post('/blogPost',validateToken, blogPostController.createBlogPost);
router.get('/blogPost', blogPostController.getAllBlogPosts);
router.put('/blogPost/like',validateToken,  blogPostController.likeBlogPost);
router.post('/blogPost/comments',validateToken, blogPostController.commentOnBlogPost);
router.post('/blogPost/comments/replies',validateToken, blogPostController.replyToComment);
router.put('/blogPost/comments/like',validateToken, blogPostController.likeComment);
router.put('/blogPost/comments/replies/like',validateToken,  blogPostController.likeReply);

module.exports = router;

module.exports = router;
