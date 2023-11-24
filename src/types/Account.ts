import { TypeTransaction } from "./Transaction.js";
import { Transaction } from "./TypeTransaction.js";

let balance: number = 3000;

const Account = {
    getBalance() {
        return balance;
    },

    getAcessDate(): Date {
        return new Date();
    },

    transactionRegistry(newTransaction: Transaction): void {
        if (newTransaction.typeTransaction === TypeTransaction.DEPOSIT) {
            balance += newTransaction.value;
        } else if (newTransaction.typeTransaction === TypeTransaction.TRANSFER || newTransaction.typeTransaction === TypeTransaction.PAYMENT_BOLETO) {
            balance -= newTransaction.value;
        } else {
            alert("Tipo de Transação é inválido!");
            return;
        }
    }
}

export default Account;