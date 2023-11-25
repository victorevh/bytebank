import { Transaction } from "./TypeTransaction.js";

export type TransactionGroup = {
    label: string;
    transactions: Transaction[]
}