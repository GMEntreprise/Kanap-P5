//Initialisation LocalStorage----------------------
fetch("");
const cart = [];
const positionEmptyCart = document.querySelector("#cart__items");
// Returns the length of the locals
const productLocalStorage = localStorage.length;
getElement();

// To get all the keys
function getElement() {
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
  // If the cart empty
  if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p> Votre panier est vide </p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
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
  }
};

getCart();

const getTotals = () => {
  // Get the total quantities----------------------------------------
  let elemsQtt = document.getElementsByClassName("itemQuantity");
  let myLength = elemsQtt.length;
  // console.log(elemsQtt);
  totalQtt = 0;

  // For Each quantity of input
  // Tant que est inferieur à la longeur de l'input

  for (let i = 0; i < myLength; i++) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }
  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;
  console.log(`You current quantity : ${totalQtt}`);

  // Get the total price‡------------------------------
  totalPrice = 0;

  for (let i = 0; i < myLength; i++) {
    totalPrice += elemsQtt[i].valueAsNumber * cart[i].priceProduct;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log(`Your current price : ${totalPrice}`);
};
getTotals();

//---Function Recalculates the total quantity of items in the cart, when changing the quantity or deleting an item---
// const recalculTotalPrice = () => {
//   let newTotalPrice = 0;
//   for (const item of cart) {
//     const idProductsLocalStorage = item.idProduct;
//     const quantityProductsLocalStorage = item.quantityProduct;
//     // console.log(`id product is : ${idProductsLocalStorage}`);

//     const findProducts = cart.find(
//       (element) => element.idProduct === idProductsLocalStorage
//     );

//     if (findProducts) {
//       const newTotalProductPriceCart =
//         findProducts.priceProduct * quantityProductsLocalStorage;
//       newTotalPrice += newTotalProductPriceCart;

//       // console.log("New Total price : ", newTotalPrice);
//     }
//     document.getElementById("totalPrice").innerHTML = newTotalPrice;
//   }
// };
// recalculTotalPrice();
//----------------------------------Function Modify the quantity of an item in the cart--------------------------------------------------
const changeQuantity = () => {
  // Select the html element (input) in which the quantity is modified
  let changeQuantity = document.querySelectorAll(".itemQuantity");

  changeQuantity.forEach((item) => {
    //Listen to the change on the "itemQuantity" input
    item.addEventListener("change", (event) => {
      event.preventDefault();
      choiceQuantity = Number(item.value);
      // console.log(choiceQuantity);

      // We point to the hierarchical parent <item> of the input "itemQuantity"
      let myArticle = item.closest("article");
      // console.log(myArticle);

      // We retrieve in the localStorage the element (same id and same color) whose quantity we want to modify
      let selectMyArticleInLocalStorage = cart.find(
        (element) =>
          element.idProduct === myArticle.dataset.id &&
          element.colorProduct === myArticle.dataset.color
      );

      // If the quantity is between 1 and 100 and it is an integer,...
      //...we update the quantity in the localStorage and the DOM
      if (
        (choiceQuantity) =>
          0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)
      ) {
        parseChoiceQuantity = parseInt(choiceQuantity);
        selectMyArticleInLocalStorage.quantityProduct = parseChoiceQuantity;
        localStorage.setItem(
          "produit",
          JSON.stringify(selectMyArticleInLocalStorage)
        );
      }

      // And, we recalculate the quantity and the total price of the basket
      getTotals();

      console.table(selectMyArticleInLocalStorage);
    });
  });
};
changeQuantity();

//----------------------------------Function Delete item from cart-----------------------------------------

const deleteProduct = () => {
  let selectDelete = document.querySelectorAll(".deleteItem");
  for (let removeProduct of selectDelete) {
    removeProduct.addEventListener("click", (event) => {
      event.preventDefault();

      // We point to the hierarchical parent <article> of the "delete" link
      let myArticle = removeProduct.closest("article");
      console.log(myArticle);
    });
  }
};
deleteProduct();

// Create loop forEach
// const deleteProduct = () => {
//   let selectDelete = document.querySelectorAll(".deleteItem");
//   selectDelete.forEach((removeProduct) => {
//     removeProduct.addEventListener("click", (event) => {
//       event.preventDefault();

//       // We point to the hierarchical parent <article> of the "delete" link
//       let myArticle = removeProduct.closest("article");
//       console.log(myArticle);

//       // we filter the elements of the localStorage to keep only those which are different from the element we delete
//     });
//   });
// };
// deleteProduct();

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
