const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// 
app.set('view engine', 'ejs');

const PORT = 3000;

//
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.use(express.urlencoded({ extended: false }));


app.listen(PORT, (error) => {
	error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

// ================= Тема урока ==========================
// Добавляем промежуточние обработчиков Middleware
// Middleware - Должны создаваться в начале всех процесоов
// Это самописный  Middleware
/* app.use((reg, res, next) => {
	console.log(`path: ${reg.path}`);
	console.log(`method: ${reg.method}`);
	next();
}) */

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
//Создаем доступ к файлам 
app.use(express.static('styles'));

// ================= Тема урока ==========================

app.get('/', (reg, res) => {
	const title = 'Home'
	res
		.status(200)
		.render(createPath('index'), { title });
});

app.get('/contacts', (reg, res) => {
	const contacts = [
		{ name: 'YouTube Vasily Konoval', link: 'https://www.youtube.com/channel/UCr9d6mG4tdC_r78-VTdEkug' },
		{ name: 'GitHub', link: 'https://github.com/svoboda-core' },
		{ name: 'Facebook', link: 'https://www.facebook.com/%D0%92%D1%81%D0%B5-%D0%BE-HTML-CSS-%D0%B8-JS-106140331870667' },
	]
	const title = 'Contacts'
	res
		.status(200)
		.render(createPath('contacts'), { contacts, title  });
});
// ================= Тема урока ==========================//
app.get('/posts/:id', (reg, res) => {
	const title = 'Posts'
	const post = {
		id: '1',
		text: '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemomollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemomollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemomollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem Lorem ipsum dolor sit amet consectetur adipisicing elit !!!!!!!!!!!!!!.',
		title: 'Post title My first post :)',
		date: '22.12.2021',
		author: 'Vasily',
	}
	res
		.status(200)
		.render(createPath('post'), { title, post });
});

app.get('/posts', (reg, res) => {
	const title = 'Posts'
	const posts = {
		id: '1',
		text: '	Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemomollitia impedit unde fugit sint eveniet, minima odio **************',
		title: 'Post title',
		date: '22.12.2021',
		author: 'Vasily',
	}
	res
		.status(200)
		.render(createPath('posts'), { posts, title });
});

app.post('/add-post', (reg, res) => {
	//res.send(reg.body); - для проверки работоспособности
	const { title, author, text } = reg.body;
	const post = {
		id: new Date(),
		date: (new Date()).toLocaleDateString(),
		title,
		author,
		text,
	}
	res.render(createPath('post'), { title, post });
})
// ================= Тема урока ==========================//
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


