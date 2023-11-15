var balance = 3000;
var balanceElement = document.querySelector(".saldo-valor .valor");
if (balanceElement !== null) {
    balanceElement.textContent = balance.toString();
}
var formElement = document.querySelector(".block-nova-transacao form");
formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!formElement.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação");
        return;
    }
    var typeTransactionInput = formElement.querySelector("#tipoTransacao");
    var valueInput = formElement.querySelector("#valor");
    var dateInput = formElement.querySelector("#data");
    var typeTransaction = typeTransactionInput.value;
    var value = valueInput.valueAsNumber;
    var date = new Date(dateInput.value);
    if (typeTransaction === "Depósito") {
        balance += value;
    }
    else if (typeTransaction === "Transferência" || typeTransaction === "Pagamento de Boleto") {
        balance -= value;
    }
    else {
        alert("Tipo de Transação é inválido!");
        return;
    }
    if (balanceElement !== null) {
        balanceElement.textContent = balance.toString();
    }
    var newTransaction = {
        typeTransaction: typeTransaction,
        value: value,
        date: date
    };
    console.log(newTransaction);
    formElement.reset();
});
