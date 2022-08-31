// Get the id of the product passed in the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

// Send a request to the back-end to retrieve the product info for the id retrieved in the url
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    getPost(data);
  })
  .catch((error) => {
    console.log("Cant charge API ! ", error);
  });

// .then((response) => {
//   if (response.ok) {
//     console.log(response);
//     response.json().then((data) => {
//       getPost(data);
//     });
//   } else {
//     console.log("Error can't charge API !");
//   }
// });

//   Container
let divContainer = document.querySelector(".item__img");

const getPost = (article) => {
  // Create Element
  const image = document.createElement("img");
  image.src = article.imageUrl;
  image.alt = article.altTxt;
  divContainer.appendChild(image);

  // take title / price / description
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // Modification price
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // Modification description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  //   Create Element Option
  for (color of article.colors) {
    let select = document.getElementById("colors");
    productColor = document.createElement("option");
    productColor.value = color;
    productColor.innerHTML = color;
    select.appendChild(productColor);
  }
  addToCart(article);
};

// Gestion Cart
const button = document.getElementById("addToCart");
function addToCart(article) {
  // Listener Cart with conditions
  button.addEventListener("click", () => {
    // Take Element
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;

    //  Check cart
    if (color == null || color === "" || quantity == null || quantity == 0) {
      alert("Please select a color and quantity");
      return;
    }
    if (quantity > 100) {
      alert("Please, note that you can't oder more than 100 Canape");
      return;
    }
    // Recovering the options of the item to add to the cart
    const optionProduct = {
      idProduct: id,
      colorProduct: color,
      quantityProduct: Number(quantity),
      priceProduct: article.price,
      nameProduct: article.name,
      descriptionProduct: article.description,
      imgProduct: article.imageUrl,
      altImgProduct: article.altTxt,
    };

    //Initialisation LocalStorage

    localStorage.setItem(id, JSON.stringify(optionProduct));

    window.location.href = "cart.html";

    // const popupConfirmation = () => {
    //   if (
    //     window.confirm(`Your order of ${quantity} ${article.name} ${color} is added to the cart
    // To view your cart, click on OK`)
    //   )
    //     window.location.href = "cart.html";
    //   {
    //   }
    // };

    // if (productLocalStorage) {
    //   //Import to the localStorage
    //   //If the basket already contains at least 1 item
    //   let resultFind = productLocalStorage.find((element) => {
    //     element.idProduct === idProduct && element.colorProduct === color;
    //     popupConfirmation();
    //   });
    // }
    //   // If the ordered product is already in the cart
    //   if (resultFind) {
    //     let newQuantity =
    //       parseInt(optionProduct.quantityProduct) +
    //       parseInt(resultFind.quantityProduct);
    //     resultFind.quantityProduct = newQuantity;
    //     localStorage.setItem("id", JSON.stringify(productLocalStorage));
    //     console.table(productLocalStorage);
    //     popupConfirmation();
    //     // If the ordered product is not in the cart
    //   } else {
    //     productLocalStorage.push(optionProduct);
    //     localStorage.setItem("id", JSON.stringify(productLocalStorage));
    //     console.table(productLocalStorage);
    //     popupConfirmation();
    //   }
    //   // If the basket is empty
    // } else {
    //   productLocalStorage = [];
    //   productLocalStorage.push(optionProduct);
    //   localStorage.setItem("id", JSON.stringify(productLocalStorage));
    //   console.table(productLocalStorage);
    //   popupConfirmation();
    // }
  });
}
