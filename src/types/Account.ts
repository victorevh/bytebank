import { TypeTransaction } from "./Transaction.js";
import { Transaction } from "./TypeTransaction.js";

let balance: number = 3000;

function debit(value: number): void {
    if(value <= 0){
        throw new Error("Valor a ser debitado deve ser maior que zero!");
    }
    if (value > balance) {
        throw new Error("Saldo insuficiente!");
    }

    balance -= value;
}

function deposit(value: number): void {
    if(value <= 0){
        throw new Error("Valor a ser depositado deve ser menor que zero!");
    }

    balance += value;
}

const Account = {
    getBalance() {
        return balance;
    },

    getAcessDate(): Date {
        return new Date();
    },

    transactionRegistry(newTransaction: Transaction): void {
        if (newTransaction.typeTransaction === TypeTransaction.DEPOSIT) {
            deposit(newTransaction.value);
        } else if (newTransaction.typeTransaction === TypeTransaction.TRANSFER || newTransaction.typeTransaction === TypeTransaction.PAYMENT_BOLETO) {
            debit(newTransaction.value);
        } else {
            throw new Error("Tipo de Transação é inválido!");
            return;
        }
    }
}

export default Account;