const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogPostController');
const { validateToken } = require('../middleware/validateToken');


router.post('/blogPost', blogPostController.createBlogPost);
router.get('/blogPost', blogPostController.getAllBlogPosts);
router.put('/blogPost/like',  blogPostController.likeBlogPost);
router.post('/blogPost/comments', blogPostController.commentOnBlogPost);
router.post('/blogPost/comments/replies', blogPostController.replyToComment);
router.put('/blogPost/comments/like', blogPostController.likeComment);
router.put('/blogPost/comments/replies/like',  blogPostController.likeReply);

module.exports = router;

module.exports = router;
