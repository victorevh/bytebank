let balance = 3000;

const balanceElement = document.querySelector(".saldo-valor .valor");

balanceElement.textContent = balance;

const formElement = document.querySelector(".block-nova-transacao form");
formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    if(!formElement.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação");
        return;
    }
});