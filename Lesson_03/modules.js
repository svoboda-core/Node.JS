// Для подключение экспортируемого значения исполюзуем require
//const user = require('./test');

// Также можно подключать внешние модули которые находяться внутри node.js и не только
// Для примера подключим модуль 'os' который дает свединия об операционки
const os = require('os');

// Для передачи значений через деструктуризацию 
const { userName: user, sayHi } = require('./test');

// Создаем переменную для передачи ее в импортированую функцию
const name = 'Developer'
// Вызываем функцию sayHi с новой переменной
console.log(sayHi(name));

console.log(os.platform(), os.version(), os.release());