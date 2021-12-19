const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

// Сщздаем метод прошлушки
app.listen(PORT, (error) => {
	error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

// ================= Тема урока ==========================
// Первая позиция "/" - роут путь по которому идет обращение
// Вторая позиция (reg, res) - колбек функция 
app.get('/', (reg, res) => {
	res
		.status(200)
		.sendFile(createPath('index'));
});

app.get('/contacts', (reg, res) => {
	res
		.status(200)
		.sendFile(createPath('contacts'));
});

// Перенаправление с старой страницы на новую 
app.get('/about-us', (reg, res) => {
	res
		.status(301)
		.redirect('/contacts');
});

// ! Ридерект - Перенаправление с старой страницы на новую 
app.get('/about-us', (reg, res) => {
	res
		.status(301)
		.redirect('/contacts');
});

// ! обработчик событий должен быть последним а иначе ридерект не сработает
// Обработка Ощибок первый параметер не передаем 
// Это МИДЕЛВАР перехват 
app.use((reg, res) => {
	//res.statusCode = 404; - старый метод 
	res
		.status(404)
		.sendFile(createPath('error'));
});


