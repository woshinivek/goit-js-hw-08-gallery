import galleryItems from "./galleryItems.js";

const galleryRef = document.querySelector(".js-gallery");

const galleryMarkup = galleryItems
  .map((item) => {
    return `<li><div class="thumb"><img src=${item.preview} width="340"  ></div></li>`;
  })
  .join("");

galleryRef.innerHTML = galleryMarkup;
