//Initialisation LocalStorage----------------------
let productLocalStorage = JSON.parse(localStorage.getItem("products"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// fetch(`http://localhost:3000/api/products/`);

// Get element---------------------------------------
const getCart = () => {
  // If the cart empty
  if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p> Votre panier est vide </p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
    for (let product of productLocalStorage) {
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
    totalPrice +=
      elemsQtt[i].valueAsNumber * productLocalStorage[i].priceProduct;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log(`Your current price : ${totalPrice}`);
};
getTotals();

//---Function Recalculates the total quantity of items in the cart, when changing the quantity or deleting an item---

//----------------------------------Function Modify the quantity of an item in the cart--------------------------------------------------

// Modification d'une quantité de produit
const modifyQtt = () => {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur

      let quantityModif = productLocalStorage[k].quantityProduct;
      let qttModifValue = qttModif[k].valueAsNumber;
      const resultFind = productLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );
      console.log(`The previous quantity : ${quantityModif}`);
      console.log(` The current quantity is :  ${qttModifValue}`);

      resultFind.quantityProduct = qttModifValue;
      productLocalStorage[k].quantityProduct = resultFind.quantityProduct;

      localStorage.setItem("products", JSON.stringify(productLocalStorage));
      console.log(resultFind);

      // refresh rapide
      location.reload();
    });
  }
};
modifyQtt();

//----------------------------------Function Delete item from cart-----------------------------------------

const deleteProduct = () => {
  let btnRemove = document.querySelectorAll(".deleteItem");
  for (let j = 0; j < btnRemove.length; j++) {
    btnRemove[j].addEventListener("click", (event) => {
      event.preventDefault();

      let idDelete = productLocalStorage[j].idProduct;
      let colorDelete = productLocalStorage[j].colorProduct;

      productLocalStorage = productLocalStorage.filter(
        (item) => item.id !== idDelete && item.colorProduct !== colorDelete
      );
      localStorage.setItem("products", JSON.stringify(productLocalStorage));

      //Alerte delete product and refresh
      alert("This product has been removed from your cart");
      location.reload();
      console.log(idDelete);
      console.log(colorDelete);
    });
  }
};
deleteProduct();

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
