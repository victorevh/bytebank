import { TypeTransaction } from "./Transaction";
export class Account {
    constructor(name) {
        this.balance = JSON.parse(localStorage.getItem("balance")) || 0;
        this.transactions = JSON.parse(localStorage.getItem("transactions"), (key, value) => {
            if (key === "date") {
                return new Date(value);
            }
            return value;
        }) || [];
        this.name = name;
    }
    static transactionRegistry(newTransaction) {
        throw new Error("Method not implemented.");
    }
    static getBalance() {
        throw new Error("Method not implemented.");
    }
    static getAcessDate() {
        throw new Error("Method not implemented.");
    }
    getBalance() {
        return this.balance;
    }
    getAcessDate() {
        return new Date();
    }
    getTransactionsGroups() {
        const transactionsGroups = [];
        const transactionsList = structuredClone(this.transactions);
        const orderedTransactions = transactionsList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let actualLabelGroupTransaction = "";
        for (let transaction of orderedTransactions) {
            let labelGroupTransaction = transaction.date.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (actualLabelGroupTransaction !== labelGroupTransaction) {
                actualLabelGroupTransaction = labelGroupTransaction;
                transactionsGroups.push({
                    label: labelGroupTransaction,
                    transactions: [],
                });
            }
            transactionsGroups.at(-1).transactions.push(transaction);
            return transactionsGroups;
        }
    }
    transactionRegistry(newTransaction) {
        if (newTransaction.typeTransaction === TypeTransaction.DEPOSIT) {
            this.deposit(newTransaction.value);
        }
        else if (newTransaction.typeTransaction === TypeTransaction.TRANSFER ||
            newTransaction.typeTransaction === TypeTransaction.PAYMENT_BOLETO) {
            this.debit(newTransaction.value);
            newTransaction.value *= 0;
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        this.transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
    }
    debit(value) {
        if (value <= 0) {
            throw new Error("Valor a ser debitado deve ser maior que zero!");
        }
        if (value > this.balance) {
            throw new Error("Saldo insuficiente!");
        }
        this.balance -= value;
        localStorage.setItem("balance", this.balance.toString());
    }
    deposit(value) {
        if (value <= 0) {
            throw new Error("Valor a ser depositado deve ser menor que zero!");
        }
        this.balance += value;
        localStorage.setItem("balance", this.balance.toString());
    }
}
export default Account;
export function getTransactionsGroups() {
    throw new Error("Function not implemented.");
}
