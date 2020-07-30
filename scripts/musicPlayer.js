//импорт кода из supScript.js
import { addZero } from './supScript.js';

//экспорт кода
export const musicPlayerInit = () => {
   //переменные и константы
   const audio = document.querySelector('.audio');
   const audioImg = document.querySelector('.audio-img');
   const audioHeader = document.querySelector('.audio-header');
   const audioPlayer = document.querySelector('.audio-player');
   const audioNavigation = document.querySelector('.audio-navigation');
   const audioButtonPlay = document.querySelector('.audio-button__play');
   const audioProgress = document.querySelector('.audio-progress');
   const audioProgressTiming = document.querySelector('.audio-progress__timing');
   const audioTimePassed = document.querySelector('.audio-time__passed');
   const audioTimeTotal = document.querySelector('.audio-time__total');

   //добавляем файлы из папок
   const playList = ['hello', 'flow', 'speed']; //массив с плейлистами

   //индекс песни которая воспроизводится
   let trackIndex = 0;

   //функция запуска музыки после переключения трека
   const loadTrack = () => {
      const isPlayed = audioPlayer.paused;
      const track = playList[trackIndex];
      audioImg.src = `./audio/${track}.jpg`;
      audioHeader.textContent = track.toUpperCase(); //добавляем название трека (верхний регистр)
      audioPlayer.src = `./audio/${track}.mp3`; //получаем название трека

      if (isPlayed) {
         audioPlayer.pause();
      } else {
         audioPlayer.play();
      }
   };

   //предыдущий трек
   const prevTrack = () => {
      if (trackIndex !== 0) { //не равен 0
         trackIndex--; //--декримент, отнимаем 1
      } else {
         trackIndex = playList.length - 1; //получаем количество объектов массива и -1 (переходим к последнему треку)
      }
      //запуск музыки после переключения
      loadTrack();
   };

   //следующий трек
   const nextTrack = () => {
      if (trackIndex === playList.length - 1) {
         trackIndex = 0;
      } else {
         trackIndex++; //++инкремент, добавляем 1
      }
      //запуск музыки после переключения
      loadTrack();
   };

   audioNavigation.addEventListener('click', event => {
      const target = event.target;

      if (target.classList.contains('audio-button__play')) {  //contains проверяет класс
         audio.classList.toggle('play');
         audioButtonPlay.classList.toggle('fa-play');
         audioButtonPlay.classList.toggle('fa-pause');

         //условия запуска музыки
         if (audioPlayer.paused) {
            audioPlayer.play();
         } else {
            audioPlayer.pause();
         }
         //при нажатии на плей меняется заголовок
         const track = playList[trackIndex];
         audioHeader.textContent = track.toUpperCase(); //добавляем название трека (верхний регистр)
      }

      //логика кнопки прев
      if (target.classList.contains('audio-button__prev')) {
         prevTrack();
      }

      //логика кнопки некст
      if (target.classList.contains('audio-button__next')) {
         nextTrack();
      }
   });

   //автопереключение на следующий трек
   audioPlayer.addEventListener('ended', () => {
      nextTrack();
      audioPlayer.play(); //запускаем в любом случае
   });

   //прогресс бар
   audioPlayer.addEventListener('timeupdate', () => {
      //шкала прогресса
      const duration = audioPlayer.duration;
      const currentTime = audioPlayer.currentTime;
      const progress = (currentTime / duration) * 100;

      audioProgressTiming.style.width = progress + '%';

      //время река
      const minutesPassed = Math.floor(currentTime / 60) || '0'; // заменяем значение null на 0 при переключении трека (оператор ||)
      const secondsPassed = Math.floor(currentTime % 60) || '0';

      const minutesTotal = Math.floor(duration / 60) || '0';
      const secondsTotal = Math.floor(duration % 60) || '0';

      audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
      audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
   });

   //перемотка ползунком и работа ползунка
   audioProgress.addEventListener('click', e => { // e или ev = event
      const x = event.offsetX; //получаем координат нажатия
      const allWidth = audioProgress.clientWidth; //получаем полную длину трека
      const progress = (x / allWidth) * audioPlayer.duration;
      audioPlayer.currentTime = progress;
   });

   //остановка при переключении вкладки
   musicPlayerInit.stop = () => {
      if (!audioPlayer.paused) {
         audioPlayer.pause();
         audio.classList.remove('play'); // убираем классы
         audioButtonPlay.classList.remove('fa-pause');
         audioButtonPlay.classList.add('fa-play');
      }
   }
};