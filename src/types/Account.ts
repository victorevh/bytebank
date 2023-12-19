import { TypeTransaction } from "./Transaction.js";
import { TransactionGroup } from "./TransactionGroup.js";
import { Transaction } from "./TypeTransaction.js";
import { Storage } from "./Storage.js";
import { DebitValidation, DepositValidation } from "./Decorators.js";

export class Account {
  protected name: string;
  protected balance: number = Storage.get<number>("balance") || 0;
  private transactions: Transaction[] =
    Storage.get<Transaction[]>("transactions", (key: string, value: any) => {
      if (key === "date") {
        return new Date(value);
      }
      return value;
    }) || [];

  constructor(name: string) {
    this.name = name;
  }

  public getOwner() {
    return this.name;
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
    Storage.save("transactions", JSON.stringify(this.transactions));
  }

  @DebitValidation
  debit(value: number): void {
    this.balance -= value;
    Storage.save("balance", this.balance.toString());
  }

  @DepositValidation
  deposit(value: number): void {
    this.balance += value;
    Storage.save("balance", this.balance.toString());
  }
}

export class PremiumAccount extends Account {
  transactionRegistry(transaction: Transaction): void {
    if (transaction.typeTransaction === TypeTransaction.DEPOSIT) {
      transaction.value += 0.5;
    }
    super.transactionRegistry(transaction);
  }
}

const UserAccount = new Account("Victor");
const UserPremiumAccount = new PremiumAccount("Victor Santos");
export default UserAccount;
