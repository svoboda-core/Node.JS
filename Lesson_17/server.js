const express = require('express');
const path = require('path');
const morgan = require('morgan');

const mongoose = require('mongoose');
const Post = require('./models/post');

const Contact = require('./models/contacts');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');


const db = 'mongodb+srv://VasilyMoon:Tw3HKC2bBEmJRvJ@cluster0.ubdad.mongodb.net/node-blog?retryWrites=true&w=majority'


const PORT = 3000;


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
	.then((res) => console.log('Connected to BD'))
	.catch((error) => console.log(error))
	.then((res) => console.log('Connected to BD'));


const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.use(express.urlencoded({ extended: false }));


app.listen(PORT, (error) => {
	error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	const title = 'Home';
	res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
	const title = 'Contacts';
	Contact
		.find()
		.then(contacts => res.render(createPath('contacts'), { contacts, title }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});

app.get('/posts/:id', (req, res) => {
	const title = 'Post';
	Post
		.findById(req.params.id)
		.then(post => res.render(createPath('post'), { post, title }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});
//==================Тема урока================//
app.delete('/posts/:id', (req, res) => {
	Post
		.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});

app.get('/edit/:id', (req, res) => {
	const title = 'Edit Post';
	Post
		.findById(req.params.id)
		.then(post => res.render(createPath('edit-post'), { post, title }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});
// 
app.put('/edit/:id', (req, res) => {
	const { title, author, text } = req.body;
	const { id } = req.params;
	Post
		.findByIdAndUpdate(id, { title, author, text })
		.then((result) => res.redirect(`/posts/${id}`))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});
//==================Тема урока================//

app.get('/posts', (req, res) => {
	const title = 'Posts';
	Post
		.find()
		.sort({ createdAt: -1 })
		.then(posts => res.render(createPath('posts'), { posts, title }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});

app.get('/add-post', (req, res) => {
	const title = 'Add Post';
	res.render(createPath('add-post'), { title });
});

app.post('/add-post', (req, res) => {
	const { title, author, text } = req.body;
	const post = new Post({ title, author, text });
	post
		.save()
		.then((result) => res.redirect('/posts'))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});

app.use((req, res) => {
	const title = 'Error Page';
	res
		.status(404)
		.render(createPath('error'), { title });
});