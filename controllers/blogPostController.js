// Import your models
const BlogPost = require('../models/blogPostModel');
const Comment = require('../models/commentModel');
const Reply = require('../models/replyModel');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body; // Get the userId from the request body

    // Create a new blog post
    const blogPost = new BlogPost({ title, content, author: userId });
    await blogPost.save();

    res.status(201).json({ message: 'Blog post created successfully', blogPost });
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog post' });
  }
};


const getAllBlogPosts = async (req, res) => {
  try {
    // Get all blog posts along with the author's name
    const blogPosts = await BlogPost.find().populate('author', 'name');
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving blog posts' });
  }
};

const likeBlogPost = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log(postId);

    // Find the blog post by ID
    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Update the likes count and save the blog post
    blogPost.likes++;
    await blogPost.save();

    res.status(200).json({ message: 'Blog post liked successfully', blogPost });
  } catch (error) {
    res.status(500).json({ error: 'Error liking blog post' });
  }
};

const commentOnBlogPost = async (req, res) => {
  try {
    const { postId, content, userId } = req.body;
    const author = userId;

    // Create a new comment
    const comment = new Comment({ content, author });
    await comment.save();

    // Find the blog post by ID and add the comment to its comments array
    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    blogPost.comments.push(comment);
    await blogPost.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};

const replyToComment = async (req, res) => {
  try {
    const { postId, commentId, content, userId } = req.body;
    const author = userId;

    // Create a new reply
    const reply = new Reply({ content, author });
    await reply.save();

    // Find the blog post by ID and get the comment by its ID
    const blogPost = await BlogPost.findById(postId).populate({
      path: 'comments',
      match: { _id: commentId },
    });
    
    if (!blogPost || !blogPost.comments.length) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Add the reply to the comment's replies array
    blogPost.comments[0].replies.push(reply); // Push the reply object directly, not just reply._id
    await blogPost.save();

    res.status(201).json({ message: 'Reply added successfully', reply });
  } catch (error) {
    res.status(500).json({ error: 'Error adding reply' });
  }
};


const likeComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Update the likes count and save the comment
    comment.likes++;
    await comment.save();

    res.status(200).json({ message: 'Comment liked successfully', comment });
  } catch (error) {
    res.status(500).json({ error: 'Error liking comment' });
  }
};

const likeReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.body;

    // Find the comment by ID and get the reply by its ID
    const comment = await Comment.findById(commentId).populate('replies');
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    const reply = comment.replies.id(replyId);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    console.log(replyId, commentId);

    // Update the likes count and save the reply
    reply.likes++;
    await comment.save();

    res.status(200).json({ message: 'Reply liked successfully', reply });
  } catch (error) {
    res.status(500).json({ error: 'Error liking reply' });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  likeBlogPost,
  commentOnBlogPost,
  replyToComment,
  likeComment,
  likeReply,
};
