import { TypeTransaction } from "./Transaction";
import { TransactionGroup } from "./TransactionGroup";
import { Transaction } from "./TypeTransaction";

export class Account {
  static transactionRegistry(newTransaction: Transaction) {
      throw new Error("Method not implemented.");
  }
  static getBalance(): number {
      throw new Error("Method not implemented.");
  }
  static getAcessDate(): Date {
      throw new Error("Method not implemented.");
  }
  name: string;
  balance: number = JSON.parse(localStorage.getItem("balance")) || 0;
  transactions: Transaction[] =
    JSON.parse(
      localStorage.getItem("transactions"),
      (key: string, value: any) => {
        if (key === "date") {
          return new Date(value);
        }
        return value;
      }
    ) || [];

  constructor(name: string) {
    this.name = name;
  }

  getBalance() {
    return this.balance;
  }

  getAcessDate(): Date {
    return new Date();
  }

  getTransactionsGroups(): TransactionGroup[] {
    const transactionsGroups: TransactionGroup[] = [];
    const transactionsList: Transaction[] = structuredClone(this.transactions);
    const orderedTransactions: Transaction[] = transactionsList.sort(
      (t1, t2) => t2.date.getTime() - t1.date.getTime()
    );
    let actualLabelGroupTransaction: string = "";

    for (let transaction of orderedTransactions) {
      let labelGroupTransaction: string = transaction.date.toLocaleDateString(
        "pt-br",
        { month: "long", year: "numeric" }
      );
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

  transactionRegistry(newTransaction: Transaction): void {
    if (newTransaction.typeTransaction === TypeTransaction.DEPOSIT) {
      this.deposit(newTransaction.value);
    } else if (
      newTransaction.typeTransaction === TypeTransaction.TRANSFER ||
      newTransaction.typeTransaction === TypeTransaction.PAYMENT_BOLETO
    ) {
      this.debit(newTransaction.value);
      newTransaction.value *= 0;
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }

    this.transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  debit(value: number): void {
    if (value <= 0) {
      throw new Error("Valor a ser debitado deve ser maior que zero!");
    }
    if (value > this.balance) {
      throw new Error("Saldo insuficiente!");
    }

    this.balance -= value;
    localStorage.setItem("balance", this.balance.toString());
  }

  deposit(value: number): void {
    if (value <= 0) {
      throw new Error("Valor a ser depositado deve ser menor que zero!");
    }

    this.balance += value;
    localStorage.setItem("balance", this.balance.toString());
  }
}

export default Account;

export function getTransactionsGroups(): TransactionGroup[] {
    throw new Error("Function not implemented.");
}
