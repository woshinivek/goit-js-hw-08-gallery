import galleryItems from "./galleryItems.js";

const galleryRef = document.querySelector(".js-gallery");

const galleryMarkup = galleryItems
  .map((item) => {
    return `
    <li class="gallery__item">
        <img class="gallery__image "src=${item.preview} >
    </li>`;
  })
  .join("");

galleryRef.innerHTML = galleryMarkup;
