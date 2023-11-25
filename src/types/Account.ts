import { TypeTransaction } from "./Transaction.js";
import { TransactionGroup } from "./TransactionGroup.js";
import { Transaction } from "./TypeTransaction.js";

let balance: number = JSON.parse(localStorage.getItem("balance")) || 0;
const transactions: Transaction[] = JSON.parse(localStorage.getItem("transactions"), (key: string, value: string) => {
    if (key === "date") {
        return new Date(value);
    }
    return value;

}) || [];

function debit(value: number): void {
    if(value <= 0){
        throw new Error("Valor a ser debitado deve ser maior que zero!");
    }
    if (value > balance) {
        throw new Error("Saldo insuficiente!");
    }

    balance -= value;
    localStorage.setItem("balance", balance.toString());
}

function deposit(value: number): void {
    if(value <= 0){
        throw new Error("Valor a ser depositado deve ser menor que zero!");
    }

    balance += value;
    localStorage.setItem("balance", balance.toString());
}

const Account = {
    getBalance() {
        return balance;
    },

    getAcessDate(): Date {
        return new Date();
    },

    getTransactionsGroups(): TransactionGroup[] {
        const transactionsGroups: TransactionGroup[] = [];
        const transactionsList: Transaction[] = structuredClone(transactions);
        const orderedTransactions: Transaction[] = transactionsList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let actualLabelGroupTransaction: string = "";

        for (let transaction of orderedTransactions) {
            
            let labelGroupTransaction: string = transaction.date.toLocaleDateString("pt-br", { month: "long", year: "numeric"});
            if (actualLabelGroupTransaction !== labelGroupTransaction) {
                actualLabelGroupTransaction = labelGroupTransaction
                transactionsGroups.push({
                    label: labelGroupTransaction,
                    transactions: []
                })
            }
            transactionsGroups.at(-1).transactions.push(transaction);

            return transactionsGroups;
        }
    },

    transactionRegistry(newTransaction: Transaction): void {
        if (newTransaction.typeTransaction === TypeTransaction.DEPOSIT) {
            deposit(newTransaction.value);
        } else if (newTransaction.typeTransaction === TypeTransaction.TRANSFER || newTransaction.typeTransaction === TypeTransaction.PAYMENT_BOLETO) {
            debit(newTransaction.value);
            newTransaction.value *= 0
        } else {
            throw new Error("Tipo de Transação é inválido!");
        }

        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
}

export default Account;