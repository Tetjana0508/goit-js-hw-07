import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

/* Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. Посмотри демо видео работы галереи.
Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
2. Реализация делегирования на ul.gallery и получение url большого изображения.
3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

Разметка элемента галереи
Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.
Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. Запрети это поведение по умолчанию.

Закрытие с клавиатуры (№6_Занятие 12-1:30)
Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox есть метод для программного закрытия модального окна.*/
// console.log(createGalleryCardsMarkup(galleryItems));
const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup)

galleryContainer.addEventListener('click', onGalleryContainerClick) 

function createGalleryCardsMarkup(galleryItems) { /*динамическая разметка, рендерит всю разметку галереи */
  const markup = galleryItems.map(({preview, original, description}) => { /* мепаем массив,возвращаем карточку для каждого объекта, и деструктуризируем свойства (preview, original, description), свойства на объекте есть, приходят в колбек мэпа и деструктуризируем */
    return `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `
  }).join('');

  return markup; /* возвращаем массив строк */
}

function onGalleryContainerClick(event) {
  console.log(event.target);
  event.preventDefault()

  if (event.target.nodeName !== 'IMG') {
    return
  }
  const onGalleryModal = event.target.dataset.source
  console.log(onGalleryModal);

  const imgParameter = basicLightbox.create(`<img src='${onGalleryModal}'width='800' height='600'>`)
imgParameter.show()
}