import { TypeTransaction } from "./Transaction.js"

export type Transaction = {
    typeTransaction: TypeTransaction,
    date: Date,
    value: number
}