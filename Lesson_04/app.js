// Подключаем модуль по работе с файлами
const { error } = require('console');
const fs = require('fs');

// Чтение файла ********* но покажет значение которые хранятся в Buffer
fs.readFile('./test.txt', (err, data) => {
	if (err) throw err;
	console.log(data);
});

// Чтение файла в читаемом формате с методом .toString()
fs.readFile('./test.txt', (err, data) => {
	if (err) throw err;
	console.log(data.toString());
});

// Чтение файла в читаемом формате передав дополнительный параметер 'utf8'
fs.readFile('./test.txt', 'utf8', (err, data) => {
	if (err) throw err;
	console.log(data);
});

// Чтение и запись в другой фаил
fs.readFile('./test.txt', 'utf8', (err, data) => {
	fs.writeFile('./test2.txt', `${data} \nNew file !!!!!!`, () => {
		
	});
});

// Чтение и запись в другой фаил [и в другую не сушествующую дерикторию] выдаст ощибку 
fs.readFile('./test.txt', 'utf8', (err, data) => {
	fs.writeFile('./files/test2.txt', `${data} \nNew file !!!!!!`, (error) => {
		error ? console.log(error) : null;
	});
});

// Чтение и запись в другой фаил [и в другую не сушествующую дерикторию] 
// !!! Методы Асинхронны поэтому нужно придерживатья принципа матрешки. 
fs.readFile('./test.txt', 'utf8', (err, data) => {

	fs.mkdir('./files', () => {

		fs.writeFile('./files/test2.txt', `${data} \nNew file !!!!!!`, (error) => {
			error ? console.log(error) : null;
		});

	});

});

// Удаление файла без проверки
/* setTimeout(() => {
	fs.unlink('./files/test2.txt', () => {});
}, 4000); */

// Удаление деректории без проверки
/* setTimeout(() => {
	fs.rmdir('./files', () => {});
}, 6000); */

// Удаление файла с проверкой 
setTimeout(() => {
	if (fs.existsSync('./files/test2.txt')) {
		fs.unlink('./files/test2.txt', () => {});
	};
}, 4000);

// Удаление деректории с проверкой [Удаление не произошло поскольку условие не выполнелось]
/* setTimeout(() => {
	if (fs.existsSync('./files/test2.txt')) {
		fs.rmdir('./files', () => {});
	};
}, 6000); */

// Удаление деректории с проверкой [Удаление произошло поскольку условие выполнелось]
setTimeout(() => {
	if (fs.existsSync('./files')) {
		fs.rmdir('./files', () => {});
	};
}, 6000);