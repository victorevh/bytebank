import { TypeTransaction } from "./Transaction.js";
let balance = JSON.parse(localStorage.getItem("balance")) || 0;
const transactions = JSON.parse(localStorage.getItem("transactions"), (key, value) => {
    if (key === "date") {
        return new Date(value);
    }
    return value;
}) || [];
function debit(value) {
    if (value <= 0) {
        throw new Error("Valor a ser debitado deve ser maior que zero!");
    }
    if (value > balance) {
        throw new Error("Saldo insuficiente!");
    }
    balance -= value;
    localStorage.setItem("balance", balance.toString());
}
function deposit(value) {
    if (value <= 0) {
        throw new Error("Valor a ser depositado deve ser menor que zero!");
    }
    balance += value;
    localStorage.setItem("balance", balance.toString());
}
const Account = {
    getBalance() {
        return balance;
    },
    getAcessDate() {
        return new Date();
    },
    getTransactionsGroups() {
        const transactionsGroups = [];
        const transactionsList = structuredClone(transactions);
        const orderedTransactions = transactionsList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let actualLabelGroupTransaction = "";
        for (let transaction of orderedTransactions) {
            let labelGroupTransaction = transaction.date.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (actualLabelGroupTransaction !== labelGroupTransaction) {
                actualLabelGroupTransaction = labelGroupTransaction;
                transactionsGroups.push({
                    label: labelGroupTransaction,
                    transactions: []
                });
            }
            transactionsGroups.at(-1).transactions.push(transaction);
            return transactionsGroups;
        }
    },
    transactionRegistry(newTransaction) {
        if (newTransaction.typeTransaction === TypeTransaction.DEPOSIT) {
            deposit(newTransaction.value);
        }
        else if (newTransaction.typeTransaction === TypeTransaction.TRANSFER || newTransaction.typeTransaction === TypeTransaction.PAYMENT_BOLETO) {
            debit(newTransaction.value);
            newTransaction.value *= 0;
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
};
export default Account;
