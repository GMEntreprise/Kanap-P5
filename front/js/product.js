//
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Retrieving informations
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

  // take title / price / description
  document.querySelector("#title").innerHTML = article.name;
  document.querySelector("#price").innerHTML = article.price;
  document.querySelector("#description").innerHTML = article.description;

  //   Create Element Option

  //   Adding element
  divContainer.appendChild(image);
};
