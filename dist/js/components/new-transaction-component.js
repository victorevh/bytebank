import { Account } from "../types/Account.js";
import BalanceComponent from "./balance-component.js";
const formElement = document.querySelector(".block-nova-transacao form");
formElement.addEventListener("submit", function (event) {
    try {
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
        let date = new Date(dateInput.value + " 00:00:00");
        const newTransaction = {
            typeTransaction: typeTransaction,
            value: value,
            date: date,
        };
        Account.transactionRegistry(newTransaction);
        BalanceComponent.update();
        formElement.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
