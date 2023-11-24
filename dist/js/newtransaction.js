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
    let value = valueInput.valueAsNumber;
    let date = new Date(dateInput.value);
    if (typeTransaction === typeTransactionEnum.DEPOSIT) {
        balance += value;
    }
    else if (typeTransaction === typeTransactionEnum.TRANSFER || typeTransaction === typeTransactionEnum.PAYMENT_BOLETO) {
        balance -= value;
    }
    else {
        alert("Tipo de Transação é inválido!");
        return;
    }
    if (balanceElement !== null) {
        balanceElement.textContent = coinFormat(balance);
    }
    const newTransaction = {
        typeTransaction: typeTransaction,
        value: value,
        date: date
    };
    console.log(newTransaction);
    formElement.reset();
});
