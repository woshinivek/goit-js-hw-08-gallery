import galleryItems from "./galleryItems.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightBox: document.querySelector(".js-lightbox"),
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

refs.gallery.addEventListener("click", onLinkClick);

function onLinkClick(evt) {
  evt.preventDefault();

  console.log("on link click");
}

refs.gallery.addEventListener("click", onGalleryImgClick);

function onGalleryImgClick(evt) {
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  // refs.lightBox.classList.add("is-open");
  console.log("modal is open");
}
