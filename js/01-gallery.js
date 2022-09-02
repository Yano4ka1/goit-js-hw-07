
// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у
//  модальному вікні. 

// 1. Створення і рендер розмітки на підставі масиву даних galleryItems 
//      і наданого шаблону елемента галереї.
// 2. Реалізація делегування на div.gallery і отримання url великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. 
// 4. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані 
//      (.min) файли бібліотеки.
// 5. Відкриття модального вікна по кліку на елементі галереї.
//      Для цього ознайомся з документацією і прикладами.
// 6. Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. 
//      Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, 
// і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, 
// що містяться в цьому шаблоні.
{/* <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div> */}

// Зверни увагу на те, що зображення обгорнуте посиланням, 
// отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. 
// Заборони цю поведінку за замовчуванням.

// Закриття з клавіатури

// Додай закриття модального вікна після натискання клавіші Escape. 
// Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. 
// Бібліотекаи basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);


const galleryRef = document.querySelector('.gallery');

galleryRef.insertAdjacentHTML('beforeend',createGalleryMarkup(galleryItems))

function createGalleryMarkup(galleryItems) {

  const galleryMarkup = galleryItems
    .map(item => {

      return `
      <div class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
          alt="${item.description}"
          />
        </a>
      </div>`
    })
  .join('')

  return galleryMarkup;
}


galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(evn) {
  evn.preventDefault();

  if (!evn.target.classList.contains('gallery__image')) {
    return
  };

  openBasicLightboxImage(evn.target.dataset.source);
}

function openBasicLightboxImage(image) {
  
  const basicLightboxImage = basicLightbox.create(`
        <img width="1400" height="900" src="${image}">
        `, {
      onShow: () => {
        document.addEventListener('keydown', onEcsKeyDown);
        document.body.classList.add('modal-open');
      },
      onClose: () => {
        document.removeEventListener('keydown', onEcsKeyDown);
        document.body.classList.remove('modal-open');
      }
  })

    function onEcsKeyDown(evn) {
      if (evn.code === "Escape") {
        basicLightboxImage.close()
      }
  }

  basicLightboxImage.show()
}