const express = require('express');
const path = require('path');
const morgan = require('morgan');

const mongoose = require('mongoose');
const Post = require('./models/post');
// ================= Тема урока ==========================//
const Contacts = require('./models/contacts');
// ================= Тема урока ==========================//
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
//Создаем доступ к файлам 
app.use(express.static('styles'));

app.get('/', (reg, res) => {
	const title = 'Home'
	res
		.status(200)
		.render(createPath('index'), { title });
});

app.get('/contacts', (reg, res) => {
	const title = 'Contacts';
	Contacts
		.find()
		.then((contacts) => res.status(200).render(createPath('contacts'), { contacts, title }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		})
});

app.get('/posts/:id', (reg, res) => {
	const title = 'Posts'
	Post
		.findById(reg.params.id)
		.then((post) => res.status(200).render(createPath('post'), { post, title }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});

app.get('/posts', (reg, res) => {
	const title = 'Posts'
	Post
		.find()
		.sort({ createdAt: -1 }) // сортировка по дате 
		.then((posts) => res.status(200).render(createPath('posts'), { posts, title }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});

app.post('/add-post', (reg, res) => {
	//res.send(reg.body); - для проверки работоспособности
	const { title, author, text } = reg.body;
	const post = new Post({ title, author, text }); // создаем новый пост с помощю конструктора
	post
		.save()
		.then((result) => res.redirect('/posts'))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		})
});

app.get('/add-post', (reg, res) => {
	const title = 'add-posts'
	res
		.status(200)
		.render(createPath('add-post'), { title });
});



app.get('/about-us', (reg, res) => {
	res
		.status(301)
		.render('/contacts');
});


app.use((reg, res) => {
	const title = 'error 404'
	//res.statusCode = 404; - старый метод 
	res
		.status(404)
		.render(createPath('error'), { title });
});


