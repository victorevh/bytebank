// Primitives Types
let balanceMoney = 3000;
let namePerson = "João";
let isActive = true;
let any = "any";
any = 1;
// Arrays
const list = [];
list.push(22, 45, 22, 34.5);
// Enum
var typeTransaction;
(function (typeTransaction) {
    typeTransaction["DEPOSIT"] = "Dep\u00F3sito";
    typeTransaction["TRANSFER"] = "Transfer\u00EAncia";
    typeTransaction["PAYMENT_BOLETO"] = "Pagamento de Boleto";
})(typeTransaction || (typeTransaction = {}));
const newTransaction = {
    typeTransaction: typeTransaction.DEPOSIT,
    date: new Date(),
    value: 0
};
