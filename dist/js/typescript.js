/* Primitives Types
let balanceMoney: number = 3000;
let namePerson: string = "João";
let isActive: boolean = true;
let any: any = "any";
any = 1;

// Arrays
const list: number[] = [];
list.push(22, 45, 22, 34.5);

// Types personalizados (Alias)
type Transaction = {
    typeTransaction: typeTransaction,
    date: Date,
    value: number
}

// Enum
enum typeTransaction {
    DEPOSIT = "Depósito",
    TRANSFER = "Transferência",
    PAYMENT_BOLETO = "Pagamento de Boleto"
}

const newTransaction: Transaction = {
    typeTransaction: typeTransaction.DEPOSIT,
    date: new Date(),
    value: 0
}
*/ 
