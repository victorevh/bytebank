const formElement = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!formElement.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação");
        return;
    }

    const typeTransactionInput = formElement.querySelector("#tipoTransacao") as HTMLSelectElement;
    const valueInput = formElement.querySelector("#valor") as HTMLInputElement;
    const dateInput = formElement.querySelector("#data") as HTMLInputElement;

    let typeTransaction: typeTransactionEnum = typeTransactionInput.value as typeTransactionEnum;
    let value: number = valueInput.valueAsNumber;
    let date: Date = new Date(dateInput.value);

    if (typeTransaction === typeTransactionEnum.DEPOSIT) {
        balance += value;
    } else if (typeTransaction === typeTransactionEnum.TRANSFER || typeTransaction === typeTransactionEnum.PAYMENT_BOLETO) {
        balance -= value;
    } else {
        alert("Tipo de Transação é inválido!");
        return;
    }

    if (balanceElement !== null) {
        balanceElement.textContent = coinFormat(balance);
    }

    const newTransaction: Transaction = {
        typeTransaction: typeTransaction,
        value: value,
        date: date
    }

    console.log(newTransaction)
    formElement.reset();
});
