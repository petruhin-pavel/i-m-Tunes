//экспорт кода
export const videoPlayerInit = () => {
   // video-player
   // video-button__play
   // video-button__stop
   // video-time__passed
   // video-progress
   // video-time__total

   //Переменные и константы (получаем элементы)
   const videoPlayer = document.querySelector('.video-player');
   const videoButtonPlay = document.querySelector('.video-button__play');
   const videoButtonStop = document.querySelector('.video-button__stop');
   const videoProgress = document.querySelector('.video-progress');
   const videoTimePassed = document.querySelector('.video-time__passed');
   const videoTimeTotal = document.querySelector('.video-time__total');


   //Меняем иконку пдей на иконку пауза
   const toggleIcon = () => {
      if (videoPlayer.paused) {
         videoButtonPlay.classList.remove('fa-pause'); //удаляем иконку пауза
         videoButtonPlay.classList.add('fa-play'); //добавляем иконку плей
      } else {
         videoButtonPlay.classList.add('fa-pause'); //добавляем иконку пауза
         videoButtonPlay.classList.remove('fa-play'); //Удаляем иконку плей
      }
   }

   //Функция подмены кнопок плей и пауза, запуск видео (при клике в центр)
   const togglePlay = () => {
      if (videoPlayer.paused) { //Если видео воспроизводится, ставим на паузу
         videoPlayer.play(); //Запуск видео по клику в центре
      } else {
         videoPlayer.pause(); //Пауза видео по клику в центре
      }

      //toggleIcon(); // вызываем функцию плей и пауза и замена кнопок плей и пауза при клике в центр
   };

   //функция остановки видео
   const stopPlay = () => {
      videoPlayer.pause(); //ставим на паузу
      videoPlayer.currentTime = 0; //Возвращаем видео в начало

   };


   //условие ? (выполнится это если условие верно) : (выполнится это если условие не верно, лож)
   const addZero = n => n < 10 ? '0' + n : n; // добавляем 0 перед минутами и секундами, если число <10 (тернарный оператор "?")



   videoPlayer.addEventListener('click', togglePlay); //событие при клике в центр видео
   videoButtonPlay.addEventListener('click', togglePlay); //событие при клике на кнопку плей пауза
   videoButtonStop.addEventListener('click', stopPlay); //событие при клике на кнопку стоп
   //запуск времени при воспроизведении видео
   videoPlayer.addEventListener('timeupdate', () => {
      const currentTime = videoPlayer.currentTime; //получаем константу из функции stopPlay
      const duration = videoPlayer.duration; //Продолжительность видео

      //шкала времени
      videoProgress.value = (currentTime / duration) * 100; //делим время воспроизведения на общее время и округляем до целых

      //время воспроизведения
      let minutePassed = Math.floor(currentTime / 60); //перевод секунд в минуты при >60сек
      let secondsPassed = Math.floor(currentTime % 60); // вычисляем остаток (секунды)
      //полное время видео
      let minuteTotal = Math.floor(duration / 60);
      let secondsTotal = Math.floor(duration % 60);

      //videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed); //конкретенируем строки минут и секунд
      //videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal); //addZero добавили 0 перед минутами и секундами

      //пример выражения на шаблонной строке
      videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; //конкретенируем строки минут и секунд
      videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`; //addZero добавили 0 перед минутами и секундами

   });

   //управление видео ползунком
   videoProgress.addEventListener('change', () => {
      const duration = videoPlayer.duration; //получаем полную длину видео
      const value = videoProgress.value;

      videoPlayer.currentTime = (value * duration) / 100;
   });


   //Альтернативный метод вызова функции плей и пауза для аудио и видеоплееров
   videoPlayer.addEventListener('play', toggleIcon);
   videoPlayer.addEventListener('pause', toggleIcon);
};

//export default videoPlayer; //Альтернативный способ экспорта (по дефолту)