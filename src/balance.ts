let balance = 3000;

const balanceElement = document.querySelector(".saldo-valor .valor") as HTMLElement;

if (balanceElement !== null) {
    balanceElement.textContent = balance.toString();
}