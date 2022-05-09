import galleryItems from "./galleryItems.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightBox: document.querySelector(".js-lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

const galleryMarkup = galleryItems
  .map((item) => {
    return `
    <li class="gallery__item">

      <a
        class="gallery__link"
        href="${item.original}"
      >

      <img
        loading="lazy"
        class="gallery__image lazyload"
        src=${item.preview} data-source="${item.original}"
      >

      </a>
    </li>`;
  })
  .join("");

refs.gallery.innerHTML = galleryMarkup;

// const imagesRef = document.querySelectorAll('img[loading="lazy"]');

const linksRef = document.querySelectorAll(".gallery__link");
const btnLightBoxClose = document.querySelector(
  'button[data-action="close-lightbox"]'
);

refs.gallery.addEventListener("click", onGalleryImgClick);
btnLightBoxClose.addEventListener("click", onLightBoxClose);
refs.lightboxOverlay.addEventListener("click", onLightBoxClick);

function onGalleryImgClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  refs.lightBox.classList.add("is-open");
  window.addEventListener("keydown", onEscKey);
}

function onLightBoxClose(evt) {
  refs.lightBox.classList.remove("is-open");
  window.removeEventListener("keydown", onEscKey);
}

function onLightBoxClick(evt) {
  if (evt.target === evt.currentTarget) {
    onLightBoxClose();
  }
}

function onEscKey(evt) {
  if (evt.code === "Escape") {
    onLightBoxClose();
  }
}
