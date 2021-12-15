const userName = 'Vasily';

const sayHi = (userName) => `Hello, my name is ${userName}`;

// Берем глобальный обхект module и в свойства exports передали [переменную] 
// module.exports = userName;

// Берем глобальный обхект module и в свойства exports передали объект с данными 
module.exports = {
	userName,
	sayHi,
};