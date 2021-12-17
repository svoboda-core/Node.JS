// 
const http = require('http');
const fs = require('fs');
const path = require('path'); // Модуль коретного формирование пути

const PORT = 3000;

const server = http.createServer((req, res) => {
	console.log('Server reqvest');
	console.log('Just fo test');

	res.setHeader('Content-Type', 'text/html');

	// ================= Тема урока ==========================

	// Создаем константу в которой будем хнанить путь который к нам прилител 
	const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

	let basePath = '';

	switch (req.url) {
		case '/': // Вариант вызова корневого каталога
		case '/home': // Вариант вызова корневого каталога
		case '/index.html': // Вариант вызова корневого каталога
			basePath = createPath('index');
			res.statusCode = 200;
			break;
		case '/about-us': // ! организация редеректа перенаправления с старой страницы на новую
			res.statusCode = 301;
			res.setHeader('Location', '/contacts');
			res.end();
			break;
		case '/contacts': // вызов страници контакты 
			basePath = createPath('contacts');
			res.statusCode = 200;
			break;
		default: // вызов страници с ошибкой 
			basePath = createPath('error');
			res.statusCode = 404;
			break;
	}

	fs.readFile(basePath, (err, data) => {
		if (err) {
			console.log(err);
			res.statusCode = 500;
			res.end();
		} else {
			res.write(data);
			res.end();
		};
	});


	// Создадим условие по проверки адреся преходящего с запроса 
	/* if (req.url = '/') {
		fs.readFile('./views/index.html', (err, data) => {
			if (err) {
				console.log(err);
				res.end();
			}	else {
				res.write(data);
				res.end();
			};
		});
	}; */

});

server.listen(PORT, 'localhost', (error) => {
	error ? console.log(error) : console.log(`Listening port ${PORT}`);
});