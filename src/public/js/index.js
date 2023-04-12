const formatNumber = (price) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const price = document.querySelectorAll(".price");
for (let i = 0; i < price.length; i++) {
  const formattedPrice = formatNumber(price[i].textContent);
  price[i].innerText = formattedPrice;
}
