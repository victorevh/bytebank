let balance = 3000;

const balanceElement = document.querySelector(".saldo-valor .valor");

balanceElement.textContent = balance.toString();

const formElement = document.querySelector(".block-nova-transacao form");
formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!formElement.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação");
        return;
    }

    const typeTransactionInput = formElement.querySelector("#tipoTransacao");
    const valueInput = formElement.querySelector("#valor");
    const dateInput = formElement.querySelector("#data");

    let typeTransaction = typeTransactionInput.value;
    let value = valueInput.value;
    let date = dateInput.value;

    if (typeTransaction === "Depósito") {
        balance += value;
    } else if (typeTransaction === "Transferência" || typeTransaction === "Pagamento de Boleto") {
        balance -= value;
    } else {
        alert("Tipo de Transação é inválido!");
        return;
    }

    balanceElement.textContent = balance;

    const newTransaction = {
        typeTransaction: typeTransaction,
        value: value,
        date: date
    }

    console.log(newTransaction)
    formElement.reset();
});
