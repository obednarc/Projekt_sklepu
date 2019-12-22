"use strict";

const basket = document.getElementById("basket");
const button = document.getElementById("navbar-menu");

button.addEventListener("click", () => {
  basket.classList.toggle('basket-hidden');
});
