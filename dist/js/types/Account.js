var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TypeTransaction } from "./Transaction.js";
import { Storage } from "./Storage.js";
import { DebitValidation, DepositValidation } from "./Decorators.js";
export class Account {
    name;
    balance = Storage.get("balance") || 0;
    transactions = Storage.get("transactions", (key, value) => {
        if (key === "date") {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(name) {
        this.name = name;
    }
    getOwner() {
        return this.name;
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
        Storage.save("transactions", JSON.stringify(this.transactions));
    }
    debit(value) {
        this.balance -= value;
        Storage.save("balance", this.balance.toString());
    }
    deposit(value) {
        this.balance += value;
        Storage.save("balance", this.balance.toString());
    }
}
__decorate([
    DebitValidation
], Account.prototype, "debit", null);
__decorate([
    DepositValidation
], Account.prototype, "deposit", null);
export class PremiumAccount extends Account {
    transactionRegistry(transaction) {
        if (transaction.typeTransaction === TypeTransaction.DEPOSIT) {
            transaction.value += 0.5;
        }
        super.transactionRegistry(transaction);
    }
}
const UserAccount = new Account("Victor");
const UserPremiumAccount = new PremiumAccount("Victor Santos");
export default UserAccount;
