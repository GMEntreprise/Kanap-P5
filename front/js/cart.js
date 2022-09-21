//Initialisation LocalStorage----------------------
let productLocalStorage = JSON.parse(localStorage.getItem("products"));

const positionEmptyCart = document.querySelector("#cart__items");
const priceTableau = [];
fetch(`http://localhost:3000/api/products/`)
  .then((response) => response.json())
  .then((data) => {
    const getTotals = () => {
      // Get the total quantities----------------------------------------
      let elemsQtt = document.getElementsByClassName("itemQuantity");
      let myLength = elemsQtt.length;
      // console.log(elemsQtt);
      totalQtt = 0;

      // For Each quantity of input
      // Tant que i est inferieur à la valeur de l'input/ affiche moi la quantité qui se trouve dans l'input

      for (let i = 0; i < myLength; i++) {
        totalQtt += elemsQtt[i].valueAsNumber;
      }

      let productTotalQuantity = document.getElementById("totalQuantity");
      productTotalQuantity.innerHTML = totalQtt;
      // console.log(`You current quantity : ${totalQtt}`);

      // Get the total price‡------------------------------
      totalPrice = 0;
      // tant que i est inférieur à la longueur de l'input

      for (let i = 0; i < myLength; i++) {
        totalPrice += elemsQtt[i].valueAsNumber * data[i].price;
      }

      let productTotalPrice = document.getElementById("totalPrice");
      productTotalPrice.innerHTML = totalPrice;
      // console.log(`Your current price : ${totalPrice}`);
    };

    myProduct = data;

    // If the cart empty
    if (productLocalStorage === null || productLocalStorage == 0) {
      const emptyCart = `<p> Votre panier est vide </p>`;
      positionEmptyCart.innerHTML = emptyCart;
    } else {
      for (let i = 0; i < productLocalStorage.length; i++) {
        let colorProductPanier = productLocalStorage[i].colorProduct;
        let idProductPanier = productLocalStorage[i].idProduct;
        quantityProductPanier = productLocalStorage[i].quantityProduct;

        //on ne récupère que les données des canapés dont _id (de l'api) correspondent à l'id dans le localStorage
        const compositionProduitsPanier = data.find(
          (element) => element._id === idProductPanier
        );
        // console.log(compositionProduitsPanier);
        // Récupération du prix de chaque produit que l'on met dans une variable priceProductPanier
        priceProductPanier = compositionProduitsPanier.price;
        // Inserting the "article" element
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.classList.add("card__items");
        productArticle.dataset.id = idProductPanier;
        productArticle.dataset.color = colorProductPanier;

        // Inserting the Elément "div Image"
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.classList.add("cart__item__img");

        // Inserting de l'image
        let productImg = document.createElement("img");
        document.querySelector("#cart__item__img");
        productDivImg.appendChild(productImg);
        productImg.src = compositionProduitsPanier.imageUrl;
        productImg.alt = compositionProduitsPanier.altTxt;
        // Inserting Elément "div"
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.classList.add("cart__item__content");

        // Inserting Elément "div"
        let productItemContentDesc = document.createElement("div");
        productItemContent.appendChild(productItemContentDesc);
        productItemContentDesc.classList.add(
          "cart__item__content__description"
        );
        // Inserting title h2
        let productTitle = document.createElement("h2");
        productItemContentDesc.appendChild(productTitle);
        productTitle.innerHTML = compositionProduitsPanier.name;

        // Inserting the color
        let productColor = document.createElement("p");
        productItemContentDesc.appendChild(productColor);
        productColor.innerHTML = colorProductPanier;
        productColor.style.fontSize = "20px";

        // Inserting the price
        let productPrice = document.createElement("p");
        productItemContentDesc.appendChild(productPrice);
        productPrice.innerHTML = compositionProduitsPanier.price + " €";
        // Inserting Elément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.classList.add(
          "cart__item__content__settings"
        );

        // Inserting Elément "div"
        let productItemContentSettingQuantity = document.createElement("div");
        productItemContentSettings.appendChild(
          productItemContentSettingQuantity
        );
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
        productQuantity.value = quantityProductPanier;
        productQuantity.classList.add("itemQuantity");
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Inserting Elément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(
          productItemContentSettingsDelete
        );
        productItemContentSettingsDelete.classList.add(
          "cart__item__content__settings__delete"
        );

        // Inserting the "p" Delete
        let productDelete = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productDelete);
        productDelete.classList.add("deleteItem");
        productDelete.innerHTML = "Supprimer";
      }

      getTotals();
    }
    modifyQtt();
    deleteProduct();
  })

  .catch((error) => {
    console.log("L'API ne peut pas être chargée ! ", error);
  });

// Get element---------------------------------------

//----------------------------------Function Modify the quantity of an item in the cart/ Update Price--------------------------------------------------

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

      // console.log(`The previous quantity : ${quantityModif}`);
      // console.log(` The current quantity is :  ${qttModifValue}`);

      resultFind.quantityProduct = qttModifValue;
      productLocalStorage[k].quantityProduct = resultFind.quantityProduct;

      localStorage.setItem("products", JSON.stringify(productLocalStorage));

      // refresh rapide
      document.location.reload();
    });
  }
};
modifyQtt();

//----------------------------------Function Delete item from cart-----------------------------------------

const deleteProduct = () => {
  // On utilise le querySelectorAll car on veut récuperer toute les balise.
  let btnRemove = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < btnRemove.length; j++) {
    btnRemove[j].addEventListener("click", (event) => {
      event.preventDefault();

      //Sélection de l'élément à supprimer en fonction de son id ET de sa couleur
      let idDelete = productLocalStorage[j].idProduct;
      let colorDelete = productLocalStorage[j].colorProduct;

      // Ont filtre dans le localStorage si ID est different des autres id
      productLocalStorage = productLocalStorage.filter(
        (item) => item.id !== idDelete && item.colorProduct !== colorDelete
      );
      localStorage.setItem("products", JSON.stringify(productLocalStorage));

      //Alerte delete product and refresh Nous permet de actualiser la page rapidement.
      alert("Ce produit a été retiré de votre panier");
      document.location.reload();
    });
  }
};
deleteProduct();

//Instauration form with regex---------------------------------------

let errorFormulaireFirstName = true;
let errorFormulaireLastName = true;
let errorFormulaireAddress = true;
let errorFormulaireCity = true;
let errorFormulaireEmail = true;
let form = document.querySelector(".cart__order__form");

const getForm = () => {
  //Création des expressions régulières permet de tester la présence de certain caractère

  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Listen to the change of the firstName
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Listen to the change of the lastName
  form.lastName.addEventListener("change", function () {
    validLasttName(this);
  });

  // Listen to the change of the Adress
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Listen to the change of the City
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Listen to the change of the Email
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  // Valid firstName----------------------

  const validFirstName = (inputFirstName) => {
    // nextElementSibling nous permet d'attraper la balise suivante
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
      errorFormulaireFirstName = false;
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
      firstNameErrorMsg.style.color = "red";
      errorFormulaireFirstName = true;
    }
  };

  // Valid lastName---------------------

  const validLasttName = (inputLastName) => {
    // Récupération de la balise "p" nextElementSibling
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
      errorFormulaireLastName = false;
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
      firstNameErrorMsg.style.color = "red";
      errorFormulaireLastName = true;
    }
  };

  // Valid Address------------------

  const validAddress = (inputAddress) => {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
      errorFormulaireAddress = false;
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
      addressErrorMsg.style.color = "red";
      errorFormulaireAddress = true;
    }
  };
  // Valid City------------------------

  const validCity = (inputCity) => {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
      errorFormulaireCity = false;
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
      cityErrorMsg.style.color = "red";
      errorFormulaireCity = true;
    }
  };

  // Valid Email------------------------

  const validEmail = (inputEmail) => {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
      errorFormulaireEmail = false;
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre Email.";
      emailErrorMsg.style.color = "red";
      errorFormulaireEmail = true;
    }
  };
};
getForm();

// Envoi des informations

let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

const postForm = () => {
  const btnCommand = document.getElementById("order");

  // Listen the cart
  btnCommand.addEventListener("click", (event) => {
    //Récupération des coordonnées du formulaire client
    event.preventDefault(); // Empêche le rechargement de la page
    if (productLocalStorage === null || productLocalStorage.length === 0) {
      alert("Votre panier est vide !");
    }

    if (
      !inputFirstName.value ||
      !inputLastName.value ||
      !inputAddress.value ||
      !inputCity.value ||
      !inputEmail.value
    ) {
      alert("Veuillez renseigner tout les champs ! ");
      return;
    } else if (
      errorFormulaireFirstName === true ||
      errorFormulaireLastName === true ||
      errorFormulaireAddress === true ||
      errorFormulaireCity === true ||
      errorFormulaireEmail === true
    ) {
      alert(
        "Veuillez vérifier les champs du formulaire et les remplir correctement !"
      );
      event.preventDefault();
      return;
    }

    let productsId = [];
    // Obtenir le nombre d'élement stocké dans le localStorage.
    for (let i = 0; i < productLocalStorage.length; i++) {
      productsId.push(productLocalStorage[i].idProduct);
    }
    // Constituer un objet contact (à partir des données du formulaire) et un tableau de produits.
    const order = {
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: productsId,
    };

    // On envoie les données vers le back-end/ La method POST nous permet d'envoyé des données/ Requête POST
    fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      headers: {
        // Permet de dire au moment de l'envoie que le content-type c'est du JSON
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        localStorage.clear();
        window.location.href = `confirmation.html?orderid=${result.orderId}`;
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
postForm();
