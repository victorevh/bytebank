let balance: number = 3000;

const balanceElement = document.querySelector(".saldo-valor .valor") as HTMLElement;
const dateAcessElement = document.querySelector(".block-saldo time") as HTMLElement;

if (balanceElement !== null) {
    balanceElement.textContent = coinFormat(balance);
}

if (dateAcessElement !== null) {
    const dateAcess: Date = new Date();
    dateAcessElement.textContent = dateFormat(dateAcess, DateFormat.DAY_WEEK_DAY_MONTH_YEAR)
}