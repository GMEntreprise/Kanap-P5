const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderid");

document.getElementById("orderId").textContent = orderId;
