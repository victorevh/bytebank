import Account from "../types/Account.js";
import { DateFormat } from "../types/FormatDate.js";
import { coinFormat, dateFormat } from "../utils/formatters.js";
const balanceElement = document.querySelector(".saldo-valor .valor");
const dateAcessElement = document.querySelector(".block-saldo time");
if (dateAcessElement !== null) {
    dateAcessElement.textContent = dateFormat(Account.getAcessDate(), DateFormat.DAY_WEEK_DAY_MONTH_YEAR);
}
renderBalance();
export function renderBalance() {
    if (balanceElement !== null) {
        balanceElement.textContent = coinFormat(Account.getBalance());
    }
}
const BalanceComponent = {
    update() {
        renderBalance();
    }
};
export default BalanceComponent;
