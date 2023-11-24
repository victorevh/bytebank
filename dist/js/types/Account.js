import { TypeTransaction } from "./Transaction.js";
let balance = 3000;
const Account = {
    getBalance() {
        return balance;
    },
    getAcessDate() {
        return new Date();
    },
    transactionRegistry(newTransaction) {
        if (newTransaction.typeTransaction === TypeTransaction.DEPOSIT) {
            balance += newTransaction.value;
        }
        else if (newTransaction.typeTransaction === TypeTransaction.TRANSFER || newTransaction.typeTransaction === TypeTransaction.PAYMENT_BOLETO) {
            balance -= newTransaction.value;
        }
        else {
            alert("Tipo de Transação é inválido!");
            return;
        }
    }
};
export default Account;
