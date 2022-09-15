// // Retrieving items from the API

fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .then((result) => {
    getArticles(result);
  })
  .catch((error) => {
    alert(
      `Une erreur s'est produite et ne permet pas d'afficher les produits de notre catalogue. Nous nous excusons pour cette erreur`
    );
    console.log("Error : " + error);
  });

// browse and display sofa
const getArticles = (articles) => {
  // Container Select
  let productContainer = document.getElementById("items");

  // Overview of the table
  for (article of articles) {
    // Create element including "a"
    let productLink = document.createElement("a");
    productLink.href = "./product.html?id=" + article._id;
    // Insertion element "article"
    let productArticle = document.createElement("article");

    // Insertion IMG
    let productIMG = document.createElement("img");
    productIMG.src = article.imageUrl;
    productIMG.alt = article.altTxt;

    // Create H3
    let productName = document.createElement("h3");
    productName.innerHTML = article.name;
    productName.classList.add("productName");

    //  Create Description product
    let productDescription = document.createElement("p");
    productDescription.innerHTML = article.description;

    // Adding element on html
    productArticle.appendChild(productIMG);
    productArticle.appendChild(productName);
    productArticle.appendChild(productDescription);
    productLink.appendChild(productArticle);
    productContainer.appendChild(productLink);
  }
};
