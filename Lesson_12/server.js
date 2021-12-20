const express = require('express');
const path = require('path');

const app = express();

// 
app.set('view engine', 'ejs');

const PORT = 3000;

//
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)


app.listen(PORT, (error) => {
	error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

// ================= Тема урока ==========================
// Меняем метод sendFile - отправка файла на render
app.get('/', (reg, res) => {
	const titel = 'Home'
	res
		.status(200)
		.render(createPath('index'), { titel });
});

app.get('/contacts', (reg, res) => {
	const contacts = [
		{ name: 'YouTube Vasily Konoval', link: 'https://www.youtube.com/channel/UCr9d6mG4tdC_r78-VTdEkug' },
		{ name: 'GitHub', link: 'https://github.com/svoboda-core' },
		{ name: 'Facebook', link: 'https://www.facebook.com/%D0%92%D1%81%D0%B5-%D0%BE-HTML-CSS-%D0%B8-JS-106140331870667' },
	]
	const titel = 'Contacts'
	res
		.status(200)
		.render(createPath('contacts'), { contacts, titel  });
});

app.get('/posts/:id', (reg, res) => {
	const titel = 'Posts'
	res
		.status(200)
		.render(createPath('post'), { titel });
});

app.get('/posts', (reg, res) => {
	const titel = 'Posts'
	res
		.status(200)
		.render(createPath('posts'), { titel });
});

app.get('/add-post', (reg, res) => {
	const titel = 'add-posts'
	res
		.status(200)
		.render(createPath('add-post'), { titel });
});

app.get('/about-us', (reg, res) => {
	res
		.status(301)
		.render('/contacts');
});


app.use((reg, res) => {
	const titel = 'error 404'
	//res.statusCode = 404; - старый метод 
	res
		.status(404)
		.render(createPath('error'), { titel });
});


