import galleryItems from "./galleryItems.js";

if ("loading" in HTMLImageElement.prototype) {
  console.log("supported");
} else {
  console.log("not supported");
}

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightBox: document.querySelector(".js-lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  lightBoxImage: document.querySelector(".lightbox__image"),
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
const linksArray = [...linksRef];

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

  const imageSrc = evt.target.parentNode.href;
  refs.lightBoxImage.src = imageSrc;

  window.addEventListener("keydown", onEscKey);
  window.addEventListener("keydown", onArrowKeyPress);
}

function onLightBoxClose(evt) {
  refs.lightBox.classList.remove("is-open");
  window.removeEventListener("keydown", onEscKey);
  window.removeEventListener("keydown", onArrowKeyPress);
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

// function replacingImgSrc(evt, link) {
//   evt.target.src = link;
// }

function onArrowKeyPress(evt) {
  console.log(evt.code);
}
