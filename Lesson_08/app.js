// Импортируем модуль
const { error } = require('console');
const http = require('http');

const PORT = 3000

// Создаем сервер
// объект запроса и объекта ответа
const server = http.createServer((req, res) => {
	console.log('Server request');
	//Узнаем методы и коректность запросов
	console.log(req.url, req.method);

	// ! ====== Создаем хедер ответов [в данном случае это текст]
	//res.setHeader('Content-Type', 'text/plain')
	// ====== Создаем ответ [на запрос на стронице он выведиться как текст] 
	//res.write('<h1>Hello Vasily</h1>');

	// ! ====== Создаем хедер ответов с другим значениеем [в данном случае это html]
	// res.setHeader('Content-Type', 'text/html');
	// ====== Создаем ответ на запрос
	// res.write('<head><link rel="stylesheet" href="#"></head>');
  // res.write('<h1>Hello world!</h1>');
  // res.write('<p>My name is Vasily</p>')
	
	// ! ====== Создаем хедер ответов с другим значениеем [в данном случае это json]
	// ! "Эмитируем получения API данных"
	res.setHeader('Content-Type', 'application/json');

	const data = JSON.stringify([
		{ name: 'Tommy', age: 35 },
		{ name: 'Arthur', age: 40 },
	]);
	res.end(data);
});

server.listen(3000, 'localhost', (error) => {
	error ? console.log(error) : console.log(`Listening hjrt ${PORT}`);
});