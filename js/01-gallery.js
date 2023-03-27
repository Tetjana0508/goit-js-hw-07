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

Закрытие с клавиатуры 
Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox есть метод для программного закрытия модального окна.*/

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems); /* хранит результат вызова функции создания всей разметки */
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup); /* распарсит все элементы в конце */

galleryContainer.addEventListener('click', onGalleryContainerClick); /* вешаем слушатель событий на карточку, открытие модалки с большим изображением */

function createGalleryCardsMarkup(galleryItems) { /*создаем динамическкю разметку, рендерим всю разметку галереи */
  const markup = galleryItems.map(({preview, original, description}) => { /* мепаем массив, возвращаем карточку для каждого объекта, и деструктуризируем свойства (preview, original, description), свойства на объекте есть, приходят в колбек мэпа и деструктуризируем */
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
  }).join(''); /* массив елементов, который сшивает в одну строку */

  return markup; /* возвращаем массив строк/карточек */
}
function onGalleryContainerClick(event) { /* вешаем делегирование на контейнер */
  console.log(event.target); /* ссылка на то куда кликнули (где зародилось событие) */
  event.preventDefault(); /* для отмены действия браузера (перезагрузка или переход на новую страницу) по умолчанию на объекте события используем метод preventDefault() */

  if (event.target.nodeName !== 'IMG') { /* в обработчике события клика используем event.target, чтобы получить элемент на котором произошло событие, для проверки типа элемента 'IMG' используем свойство nodeName */
    return
  }
  window.addEventListener('keydown', onEscKeyPress); /* подписка на глобальные виндов keydown */
  const onGalleryModal = event.target.dataset.source; /* получения значения data-атрибута (свойство dataset), после которого идет имя атрибута data-source="${original}" */
  console.log(onGalleryModal);

  const imgParameter = basicLightbox.create(`
  <img src='${onGalleryModal}'width='800' height='600'>
  `);
  imgParameter.show(); /* открытие модалки и отображение изображения с помощью галереи basicLightbox */

function onCloseModal() { /* закрытие модалки по Escape */
  window.removeEventListener('keydown', onEscKeyPress); /* отписка от глобальные виндов keydown во время закрытия */
  imgParameter.close();
  }

function onEscKeyPress(evt) {
  console.log(evt.code);
    if (evt.code === 'Escape') {
      onCloseModal();
    }
  }
}