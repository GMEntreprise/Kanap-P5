// Obtenir l'id du produit passé dans l'url/ Je recupère la valeur de mon id=107 donc "107". La méthode URLSearchParams.get()
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Envoyez une requête au back-end pour récupérer les informations sur le produit pour l'identifiant récupéré dans l'url. Requête GET
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    getPost(data);
  })
  .catch((error) => {
    console.log("L'API ne peut pas être chargée ! ", error);
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
    // Je recupere la valeur de la couleur et de la quantité.
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;

    // Récupération des informations de l'article à ajouter au panier.
    const optionProduct = {
      idProduct: id,
      colorProduct: color,
      quantityProduct: quantity,
      // priceProduct: article.price,
      // nameProduct: article.name,
      // descriptionProduct: article.description,
      // imgProduct: article.imageUrl,
      // altImgProduct: article.altTxt,
    };

    const popupConfirmation = () => {
      if (
        window.confirm(`Votre commande de ${quantity} ${article.name} ${color} est ajoutée au panier
        Pour visualiser votre panier, cliquez sur OK.`)
      )
        window.location.href = "cart.html";

      {
      }
    };

    if (quantity > 100) {
      alert("Vous ne pouvez pas prendre plus de 100 Canapé ! ");
      return;
    }

    // //Initialisation LocalStorage/On récuperer la clés avec JSON.parse()/ localStorage : Stocke dans le navigateur les information même après qu'il soit fermé

    const tableauLocalStorage = JSON.parse(localStorage.getItem("products"));

    // Si aucune couleur et aucune quantité ne sont saisies, afficher un message d'alert.
    if (Number(quantity) <= 0 || color === "") {
      return alert("Veuillez sélectionner une quantité et une couleur.");
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
