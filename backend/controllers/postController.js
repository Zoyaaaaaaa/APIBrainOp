
import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  console.log('getPosts function called');
  const { page = 1, limit = 20 } = req.query;
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
