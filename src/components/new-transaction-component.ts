import { Account } from "../types/Account.js";
import { TypeTransaction } from "../types/Transaction.js";
import { Transaction } from "../types/TypeTransaction.js";
import BalanceComponent from "./balance-component.js";

const formElement = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;
formElement.addEventListener("submit", function (event) {
  try {
    event.preventDefault();
    if (!formElement.checkValidity()) {
      alert("Por favor, preencha todos os campos da transação");
      return;
    }

    const typeTransactionInput = formElement.querySelector(
      "#tipoTransacao"
    ) as HTMLSelectElement;
    const valueInput = formElement.querySelector("#valor") as HTMLInputElement;
    const dateInput = formElement.querySelector("#data") as HTMLInputElement;

    let typeTransaction: TypeTransaction =
      typeTransactionInput.value as TypeTransaction;
    let value: number = valueInput.valueAsNumber;
    let date: Date = new Date(dateInput.value + " 00:00:00");

    const newTransaction: Transaction = {
      typeTransaction: typeTransaction,
      value: value,
      date: date,
    };

    Account.transactionRegistry(newTransaction);

    BalanceComponent.update();

    formElement.reset();
  } catch (error) {
    alert(error.message);
  }
});
