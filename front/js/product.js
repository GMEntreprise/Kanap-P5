// Obtenir l'id du produit passé dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Envoyez une requête au back-end pour récupérer les informations sur le produit pour l'identifiant récupéré dans l'url.
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    getPost(data);
  })
  .catch((error) => {
    console.log("Cant charge API ! ", error);
  });

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
    // console.table(color);
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

    // Récupération des options de l'article à ajouter au panier
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

    if (quantity > 100) {
      alert("You can't drop more than 100 sofas");
      return;
    }

    // //Initialisation LocalStorage/On récuperer les données avec JSON.parse()

    const tableauLocalStorage = JSON.parse(localStorage.getItem("products"));

    // Si aucune couleur et aucune quantité ne sont saisies, afficher un message d'alert.
    if (Number(quantity) <= 0 || color === "") {
      return alert("Please select a color and quantity.");
    }

    // Si le local storage est vide, créer un tableau vide et mettre un produit dans le local storage./ JSON.stringify va nous transformer un objet on lui met en parametre en string.
    if (tableauLocalStorage === null) {
      const kanapsInfos = [];

      kanapsInfos.push(optionProduct);
      popupConfirmation();

      // Nous enregistrons notre clés qui s'appellent "products,"/ nous transformons objet en string
      return localStorage.setItem("products", JSON.stringify(kanapsInfos));
    }

    /* La methode array.some() renvoit un booléen true/false, si l'assertion entrée est vraie ou fausse,
           on va voir si le produit choisi par l'utilisateur est deja dans le localStorage ou pas.*/

    const isInsideLocalStorage = tableauLocalStorage.some((kanap) => {
      return kanap.idProduct === id && kanap.colorProduct === color;
    });

    // Si le produit ne se trouve pas dans le local storage, je le rajoute.

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
