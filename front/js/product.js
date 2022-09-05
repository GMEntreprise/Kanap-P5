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
    // Recovering the options of the item to add to the cart
    const optionProduct = {
      idProduct: id,
      colorProduct: color,
      quantityProduct: quantity,
      priceProduct: article.price,
      nameProduct: article.name,
      descriptionProduct: article.description,
      imgProduct: article.imageUrl,
      altImgProduct: article.altTxt,
    };

    const popupConfirmation = () => {
      if (
        window.confirm(`Your order of ${quantity} ${article.name} ${color} is added to the cart
        To view your cart, click on OK`)
      )
        window.location.href = "cart.html";
      {
      }
    };

    // //Initialisation LocalStorage

    const tableauLocalStorage = JSON.parse(localStorage.getItem("products"));

    // Si aucune couleur et aucune quantité ne sont saisies, afficher un message d'alert.
    if (Number(quantity) <= 0 || color === "") {
      return alert("Please select a color and quantity.");
    }

    // Si le local storage est vide, créer un tableau vide et mettre un produit dans le local storage.
    if (tableauLocalStorage === null) {
      const kanapsInfos = [];

      kanapsInfos.push(optionProduct);
      popupConfirmation();

      return localStorage.setItem("products", JSON.stringify(kanapsInfos));
    }

    /* La methode array.some() renvoit un booléen true/false, si l'assertion entrée est vraie ou fausse,
           on va voir si le produit choisi par l'utilisateur est deja dans le localStorage ou pas.*/

    const isInsideLocalStorage = tableauLocalStorage.some((kanap) => {
      return kanap.idProduct === id && kanap.colorProduct === color;
    });

    // Si le produit ne se trouve dans le local storage, je le rajoute.

    if (isInsideLocalStorage === false) {
      tableauLocalStorage.push(optionProduct);
      popupConfirmation();

      return localStorage.setItem(
        "products",
        JSON.stringify(tableauLocalStorage)
      );
    }

    // La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
    // Si le produit est identique, j'additionne les quantités.
    const updateTableauLocalStorage = tableauLocalStorage.map((kanap) => {
      if (kanap.colorProduct === color) {
        kanap.quantityProduct =
          Number(kanap.quantityProduct) + Number(quantity);
      }
      popupConfirmation();
      return kanap;
    });

    return localStorage.setItem(
      "products",
      JSON.stringify(updateTableauLocalStorage)
    );
  });
}
