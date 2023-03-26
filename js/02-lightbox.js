import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

/* 1. Сделай такую же галерею как в первом задании, но используя библиотеку SimpleLightbox, которая возьмет на себя обработку кликов по изображениям, открытие и закрытие модального окна, а также пролистывание изображений при помощи клавиатуры. Посмотри демо видео работы галереи с подключенной библиотекой.
2. Необходимо немного изменить разметку карточки галереи, используй этот шаблон.
3. Выполняй это задание в файлах 02-lightbox.html и 02-lightbox.js. Разбей его на несколько подзадач:
3.1 Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи. Используй готовый код из первого задания.
3.2 Подключение скрипта и стилей библиотеки используя CDN сервис cdnjs. Необходимо добавить ссылки на два файла: simple-lightbox.min.js и simple-lightbox.min.css.
3.3 Инициализация библиотеки после того как элементы галереи созданы и добавлены в ul.gallery. Для этого ознакомься с документацией SimpleLightbox - в первую очередь секции «Usage» и «Markup».
3.4 Посмотри в документации секцию «Options» и добавь отображение подписей к изображениям из атрибута alt. Пусть подпись будет снизу и появляется через 250 миллисекунд после открытия изображения */

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems); /* хранит результат вызова функции создания всей разметки */
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup); /* распарсит все элементы в конце */

galleryContainer.addEventListener('click', onGalleryContainerClick); /* вешаем слушатель событий на карточку, открытие модалки с большим изображением */

function createGalleryCardsMarkup(galleryItems) { /*создаем динамическкю разметку, рендерим всю разметку галереи */
  const markup = galleryItems.map(({ preview, original, description }) => { /* мепаем массив, возвращаем карточку для каждого объекта, и деструктуризируем свойства (preview, original, description), свойства на объекте есть, приходят в колбек мэпа и деструктуризируем */
    return `
  <li class='gallery__item'>
    <a class='gallery__link' href='${original}'>
      <img class='gallery__image'
      src='${preview}' 
      alt='${description}' 
      />
    </a>
</li>
  `
  }).join(''); /* массив елементов, который сшивает в одну строку */

  return markup; /* возвращаем массив строк/карточек */
}

  const imgParameter = new SimpleLightbox('.gallery a', { /* добавление опций с помощью галереи simplelightbox */
    captionSelector: 'img',
    captionsData: 'alt',
    captionDelay: 250,
    scrollZoom: false,
  });

function onGalleryContainerClick(event) { /* вешаем делегирование на контейнер */
  console.log(event.target); /* ссылка на то куда кликнули (где зародилось событие) */
  event.preventDefault(); /* для отмены действия браузера (перезагрузка или переход на новую страницу) по умолчанию на объекте события используем метод preventDefault() */

  if (event.target.nodeName !== 'IMG') { /* в обработчике события клика используем event.target, чтобы получить элемент на котором произошло событие, для проверки типа элемента 'IMG' используем свойство nodeName */
    return;
  }
}