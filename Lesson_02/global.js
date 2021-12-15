//Обращение к глобальному объекту
console.log(global);

// Вывод с задержкой обращаясь к функции у глобального объекта.
setTimeout(() => {
	console.log("Hello!");
}, 4000);

// Обращение к функции у глобального объекта которая покажит путь к текущему файлу
console.log(__dirname);

// Обращение к функции у глобального объекта которая покажит путь к текущему файлу [вместе с расщирениям]
console.log(__filename);

// Обращение к функции у глобального объекта которая выводит настройки сервера и многое другое
console.log(process);

// Распарсинг строки 
const url = new URL('https://github.com/svoboda-core#name');
// Получение имени хоста
console.log(url.hostname);
// Получение силки
console.log(url.href);
// Получение 
console.log(url.pathname);
// Получение значение хеш [#]
console.log(url.hash);
