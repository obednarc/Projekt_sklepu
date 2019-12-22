"use strict";

const buyButton = document.getElementsByClassName("basket-buy-button")[0];
const clearButton = document.getElementsByClassName("basket-clear-button")[0];

const totalPriceLabel = document.getElementById("total-price");
const basketList = document.getElementsByClassName("basket-item-list")[0];

const addItemButtons = document.getElementsByClassName("products-item-buy");
const itemHolders= document.getElementsByClassName("products-item-holder");

const itemBadge = document.getElementsByClassName("badge")[0];
const itemsQuantity = document.getElementsByClassName("quantity")[0];

let totalPrice = 0;
let itemsCount = 0;




// Add event listener to a button which is responsible for creating a fake "checkout".
buyButton.addEventListener("click", () => {
  event.preventDefault();
  alert("Wartość koszyka:  " + totalPriceLabel.innerHTML);
  clearCart();
});

// Add event listener to a button which is responsible for clearing all items from cart.
clearButton.addEventListener("click", () => {
  event.preventDefault();
  clearCart();
});


// Foreach item buy button create an event listener which adds the item to the cart, updates cart's price, items quantity in cart and cart-icon.
for(let i = 0; i < addItemButtons.length ; i++){
  addItemButtons[i].addEventListener("click", () => {
    event.preventDefault();
    let basketItemName = itemHolders[i].getElementsByClassName('products-item-name')[0].innerHTML;
    let basketItemPrice = itemHolders[i].getElementsByClassName('products-item-price')[0].innerHTML;
    if(checkItemAmountInCart()){
      totalPrice += parseInt(basketItemPrice);
      refreshPrice();
      basketList.insertAdjacentHTML('beforeend', '<li><div class="basket-item-wrapper"><span class="basket-item-name">'+basketItemName+'</span><a class="basket-item-remove" href="#" onclick="remove(this)">Usuń</a><span class="basket-item-price">'+basketItemPrice+'</span></div></li>');
      itemsCount++;
      setItemBadge(itemsCount);
      setItemsQuantity(itemsCount);
    } else {
      alert("Nie możesz dodać więcej produktów do koszyka :(")
    }
  });
}

// Simple function for refreshing the price DOM element and formatting it.
function refreshPrice(){
    totalPriceLabel.innerHTML = '  ' + totalPrice + ' zł';
}

// Simple function for refreshing the items quantity in cart and cart-icon
function refreshQuantity(){
  itemsQuantity.innerHTML = '0';
  itemBadge.innerHTML = '0';
}

//Simple function which clears the cart and sets total price and items quantity to 0.
function clearCart(){
  while (basketList.firstChild) {
    basketList.removeChild(basketList.firstChild);
    totalPrice = 0;
    refreshPrice();
    itemsCount = 0;
    refreshQuantity();
  }
}

function remove(link){
  let itemPrice = parseInt(link.parentNode.getElementsByClassName('basket-item-price')[0].innerHTML);
  totalPrice -= itemPrice;
  refreshPrice();
  link.parentNode.parentNode.parentNode.removeChild(link.parentNode.parentNode);
  itemsCount--;
  setItemBadge(itemsCount);
  setItemsQuantity(itemsCount);
}

function checkItemAmountInCart(){
  let itemsAmount = parseInt(basketList.getElementsByTagName('li').length);
  if (itemsAmount < 8) {
    return true;
  } else {
    return false;
  }
}

function setItemBadge(itemsCount){
  itemBadge.innerHTML = itemsCount;
}

function setItemsQuantity(itemsCount){
  itemsQuantity.innerHTML = itemsCount;
}
