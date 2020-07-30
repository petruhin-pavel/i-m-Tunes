// Импорт из других файлов
import { radioPlayerInit } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
//import videoPlayerInit from './videoPlayer.js'; //Альтернативный способ экспорта

// Переменные и константы
const playerBtn = document.querySelectorAll('.player-btn'); // получаем все объекты с классом .player-btn
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp'); //получаем только один объект (первый в доме элемент с данным классом)

//функции
const deactivationPlayer = () => {
   temp.style.display = 'none'; //скрываем элемент
   playerBtn.forEach((item) => { item.classList.remove('active') }); //если код в одной стоке, можно не использовать {}
   playerBlock.forEach((item) => { item.classList.remove('active') });//если принимаем только один элемент "item" можно не использовать ()
};

// Обработчики событий (перебор элементов "Кол бэк функция")
playerBtn.forEach((btn, i) => {
   btn.addEventListener('click', () => { //добавляем функцию "Добавить слушатель событий" (по событию клик и добавляем "Кол бэк функцию" )
      deactivationPlayer(); //убираем предыдущие окно при клике на другое
      btn.classList.add('active'); //добавляем элементу класс
      playerBlock[i].classList.add('active'); //обращаемся к классу по индексу и добавляем класс
   })
});



// вызов функций
videoPlayerInit();
radioPlayerInit();
musicPlayerInit();