let balance = 3000;
const balanceElement = document.querySelector(".saldo-valor .valor");
const dateAcessElement = document.querySelector(".block-saldo time");
if (balanceElement !== null) {
    balanceElement.textContent = coinFormat(balance);
}
if (dateAcessElement !== null) {
    const dateAcess = new Date();
    dateAcessElement.textContent = dateFormat(dateAcess, DateFormat.DAY_WEEK_DAY_MONTH_YEAR);
}
