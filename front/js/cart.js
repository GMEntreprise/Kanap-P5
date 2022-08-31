//Initialisation LocalStorage
const cart = [];
const positionEmptyCart = document.querySelector("#cart__items");

getElement();

// To get all the keys
function getElement() {
  // Returns the length of the locals
  const productLocalStorage = localStorage.length;
  console.log(`Numner of items : ${productLocalStorage}`);
  // Create a while for get key
  for (let i = 0; i < productLocalStorage; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
  console.log(cart);
}

const getCart = () => {
  for (let product of cart) {
    // Inserting the "article" element
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.classList.add("card__items");
    productArticle.dataset.id = product.idProduct;
    productArticle.dataset.color = product.colorProduct;

    // Inserting the Elément "div Image"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.classList.add("cart__item__img");

    // Inserting de l'image
    let productImg = document.createElement("img");
    document.querySelector("#cart__item__img");
    productDivImg.appendChild(productImg);
    productImg.src = product.imgProduct;
    productImg.alt = product.altImgProduct;
    // Inserting Elément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.classList.add("cart__item__content");

    // Inserting Elément "div"
    let productItemContentDesc = document.createElement("div");
    productItemContent.appendChild(productItemContentDesc);
    productItemContentDesc.classList.add("cart__item__content__description");
    // Inserting title h2
    let productTitle = document.createElement("h2");
    productItemContentDesc.appendChild(productTitle);
    productTitle.innerHTML = product.nameProduct;

    // Inserting the color
    let productColor = document.createElement("p");
    productItemContentDesc.appendChild(productColor);
    productColor.innerHTML = product.colorProduct;
    productColor.style.fontSize = "20px";

    // Inserting the price
    let productPrice = document.createElement("p");
    productItemContentDesc.appendChild(productPrice);
    productPrice.innerHTML = product.priceProduct + " €";
    // Inserting Elément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.classList.add("cart__item__content__settings");

    // Inserting Elément "div"
    let productItemContentSettingQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingQuantity);
    productItemContentSettingQuantity.classList.add(
      "cart__item__content__settings__quantity"
    );

    // Inserting the "Qté"
    let productQte = document.createElement("p");
    productItemContentSettingQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // Inserting the "Quantity"
    let productQuantity = document.createElement("input");
    productItemContentSettingQuantity.appendChild(productQuantity);
    productQuantity.value = product.quantityProduct;
    productQuantity.classList.add("itemQuantity");
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Inserting Elément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.classList.add(
      "cart__item__content__settings__delete"
    );

    // Inserting the "p" Delete
    let productDelete = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productDelete);
    productDelete.classList.add("deleteItem");
    productDelete.innerHTML = "Supprimer";
  }
};

getCart();

const getTotals = () => {
  // Recovering the total quantities
  // Recovering of the total price
};

// idProduct: "107fb5b75607497b96722bda5b504926", colorProduct: "Blue", quantityProduct: 2, … }
// ​​
// altImgProduct: "Photo d'un canapé bleu, deux places"
// ​​
// colorProduct: "Blue"
// ​​
// descriptionProduct: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// ​​
// idProduct: "107fb5b75607497b96722bda5b504926"
// ​​
// imgProduct: "http://localhost:3000/images/kanap01.jpeg"
// ​​
// nameProduct: "Kanap Sinopé"
// ​​
// priceProduct: 1849
// ​​
// quantityProduct: 2

// If the cart empty
// function getCart() {
//   if (productLocalStorage === null || productLocalStorage == 0) {
//     const emptyCart = `<p> Votre panier est vide </p>`;
//     positionEmptyCart.innerHTML = emptyCart;
//   } else {
//     for (let product of productLocalStorage) {
//       // Inserting the "article" element
//       let productArticle = document.createElement("article");
//       document.querySelector("#cart__items").appendChild(productArticle);
//       productArticle.className = "cart__item__img";
//       productArticle.setAttribute(
//         "data-id",
//         productLocalStorage[product].idProduct
//       );

//       // Inserting de l'élément "div"
//       let productDivImg = document.createElement("div");
//       productArticle.appendChild(productDivImg);
//       productDivImg.className = "cart__item__img";

//       // Inserting de l'image
//       let productImg = document.createElement("img");
//       productDivImg.appendChild(productImg);

//     }
//   }
// }
// getCart();
