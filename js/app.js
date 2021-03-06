import galleryItems from "./galleryItems.js";

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
      data-src="${item.preview}"
      alt="${item.description}"
      > 

      </a>
    </li>`;
  })
  .join("");

refs.gallery.innerHTML = galleryMarkup;

if ("loading" in HTMLImageElement.prototype) {
  console.log("hi google");
  addSrcAtribute();
} else {
  console.log("hi safari");
  addLazySizesScript();
}

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

function onLightBoxClose() {
  refs.lightBox.classList.remove("is-open");
  refs.lightBoxImage.src = "";

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

function onArrowKeyPress(evt) {
  console.log(evt.code);
}

function addSrcAtribute() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach((img) => {
    img.src = img.dataset.src;
  });
}

function addLazySizesScript() {
  const script = document.createElement("script");

  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";

  script.setAttribute(
    "integrity",
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ=="
  );
  script.setAttribute("crossorigin", "anonymous");
  script.setAttribute("referrerpolicy", "no-referrer");

  document.body.appendChild(script);
}

/* 

const allImages = document.querySelectorAll('img[class="gallery__image"]');

allImages.forEach((img) => img.addEventListener("load", onImageLoaded));
function onImageLoaded(evt) {
  evt.target.classList.add("appear");
}

console.log(allImages); 

*/
