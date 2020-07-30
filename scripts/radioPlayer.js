//экспорт кода
export const radioPlayerInit = () => {

   //константы и переменные
   const radio = document.querySelector('.radio');
   const radioCoverImg = document.querySelector('.radio-cover__img');
   const radioHeaderBig = document.querySelector('.radio-header__big');
   const radioNavigation = document.querySelector('.radio-navigation');
   const radioItem = document.querySelectorAll('.radio-item'); //получаем все элементы
   const radioStop = document.querySelector('.radio-stop');

   //аудио конструктор
   const audio = new Audio(); //функция создает новый объект на основе функции конструктора audio
   audio.type = "audio/aac";  //какой формат принимает функция, в данном случае aac, можно mp3

   radioStop.disabled = true; //Блокинуем кнопку плей (добавлением кнопке атребута disabled)

   //меняем логотип кнопки
   const changeIconPlay = () => {
      if (audio.paused) {
         radio.classList.remove('play') //убираем класс play
         radioStop.classList.add('fa-play'); //добавляем кнопку плей
         radioStop.classList.remove('fa-stop'); //убираем кнопку стоп
      } else {
         radio.classList.add('play') //добавляем класс play (добавляется анимация колонки)
         radioStop.classList.add('fa-stop');
         radioStop.classList.remove('fa-play');
      }
   }

   //функция обводки выбранной радиостанции и убрать обводку с других станций
   const selectItem = elem => {
      radioItem.forEach(item => item.classList.remove('select'));
      elem.classList.add('select'); //добавляем обводку выбранного элемента
   }


   //выбор радиостанции
   radioNavigation.addEventListener('change', event => {
      const target = event.target;
      const parrent = target.closest('.radio-item'); //получаем родителя элемента, чтобы найти нужный класс (название в заголовке)

      selectItem(parrent);

      //меняем заголовок радио
      const title = parrent.querySelector('.radio-name').textContent; //получаем название
      radioHeaderBig.textContent = title;

      //добавляем обложку к анимации
      const urlImg = parrent.querySelector('.radio-img').src; //получаем путь к картинке
      radioCoverImg.src = urlImg;

      radioStop.disabled = false; //Разблокируем кнопку плей
      audio.src = target.dataset.radioStantion; //с помощью event и dataset получаем data атребут в формате camelcase и получаем путь

      //вызываем функцию
      audio.play();

      //вызываем функцию изменения кнопки
      changeIconPlay();
   });

   //кнопка стоп
   radioStop.addEventListener('click', () => {
      if (audio.paused) { //если радио на паузе
         audio.play(); // запустить радио
      } else { //если нет
         audio.pause(); //поставить на паузу
      }
      changeIconPlay();
   });
};