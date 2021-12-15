// **************************************** EventEmitter КОНСТРУКТОР
// ** нужно создавать класс и его передавать.

// Подключаем модуль событий 
//const EventEmitter = require('events');
const Logger = require('./log');
const logger = new Logger();

// Создаем контстанту для создание экземпляра события 
//const emitter = new EventEmitter();

// Создание слижения за событием вызывая метод .on
// 'some_event' - любое название
// text - аргумент который мы передаем
logger.on('some_event', (text) => {
	console.log(text);
});

//Вызов события не [Не самый распрастраненый вариант]
// 'some_event' - вызов события с названием
// 'XXXXXXXXX.XXXX.XXXXX' - данные которые мы передаем как аргумент в (text)
logger.emit('some_event', 'XXXXXXXXX.XXXX.XXXXX');

//Вызов события и передача обекта значений 
// 'some_event' - вызов события с названием
// 'XXXXXXXXX.XXXX.XXXXX' - данные которые мы передаем как аргумент в (text)
logger.emit('some_event', { id: 1, text: 'EEEEEEEEE.XXXX.XXXXX' });


logger.on('some_event_2', (args) => {
	const { id, text } = args;
	console.log(id, text);
});

//Вызов события и передача обекта значений 
// 'some_event_2' - вызов события с названием
// 'XXXXXXXXX.XXXX.XXXXX' - данные которые мы передаем как аргумент в (text)
logger.emit('some_event_2', { id: 1, text: 'EEEEEEEEE.XXXX.XXXXX' });

// ======================================================= //

logger.log('TTTTTTTTTT')

