// Подключаем модуль по работе с файлами
const fs = require('fs');
// Подключаем модуль по сзжатию
const zlib = require('zlib');

let data = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae natus nisi corrupti. Quod doloribus molestiae vitae aut vero consectetur corrupti voluptas doloremque facilis. Recusandae, iste voluptas aspernatur in velit doloremque."

let newData = "\n************************************\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae natus nisi corrupti. Quod doloribus molestiae vitae aut vero consectetur corrupti voluptas doloremque facilis. Recusandae, iste voluptas aspernatur in velit doloremque. "

fs.mkdir('./docs', () => {
	fs.writeFile('./docs/test.txt', `${data}`, (error) => {
		error ? console.log(error) : null;
		for (let i = 0; i < 500; i++){
			fs.appendFile('./docs/test.txt', `${newData}`, () => { });
		};

		// ================= Тема урока ==========================
		// Создаем читающий поток 
		const readStream = fs.createReadStream('./docs/test.txt');
		// Создаем пишущий поток 
		const wraitStream = fs.createWriteStream('./docs/New-test.txt');

		// Вызывающий поток
		readStream.on('data', (chunk) => {
			wraitStream.write('\n############## Начало порции ##############\n ')
			wraitStream.write(chunk);
			wraitStream.write('\n############## Конец порции ##############\n ')
		});

		
		// ================= Тема урока ==========================
	});
});


// ================= Альтернативный метод с отловом ошибок и сжатием ==============
// !! Отлов ошибок произойдет если указать не верный путь к файлу ./docs/test2.txt вместо ./docs/test3.txt
// Создаем читающий поток 
const readStream_2 = fs.createReadStream('./docs/test3.txt');
// Создаем пишущий поток 
const wraitStream_2 = fs.createWriteStream('./docs/New-test_3.txt');
// Создаем сжимающий поток
const compressStream = zlib.createGzip()

const handleError = () => {
	console.log('Error');
	readStream_2.destroy();
	wraitStream_2.end('Finished with error ...')
}
readStream_2
	.on('error', handleError)
	.pipe(compressStream)
	.pipe(wraitStream_2)
	.on('error', handleError);