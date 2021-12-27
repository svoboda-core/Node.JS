const express = require('express');
const { getPost,
	getDelet,
	getEeditPost,
	editPost,
	getPosts,
	getAddPost,
	addPost} = require('../controllers/post-controller');
const router = express.Router();


router.get('/posts/:id', getPost);
router.delete('/posts/:id', getDelet);
router.get('/edit/:id', getEeditPost);
router.put('/edit/:id', editPost);
router.get('/posts', getPosts);
router.get('/add-post', getAddPost);
router.post('/add-post', addPost);

module.exports = router;