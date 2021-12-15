// Подключаем модуль событий 
const EventEmitter = require('events');

// Создаем контстанту для создание экземпляра события 
// const emitter = new EventEmitter();

//Создадим новый калас поскольку указаный сдесь const emitter = new EventEmitter();
// создает дополнительный конструктор и не работает
// Для этого создадим КЛАСС
class Logger extends EventEmitter { 
	log = (msg) => {
		console.log(msg);
		this.emit('some_event', 'XXXXXXXXX.XXXX.XXXXX');
	};
};

module.exports = Logger;