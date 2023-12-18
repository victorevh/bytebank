import UserAccount from "../types/Account.js";
import { DateFormat } from "../types/FormatDate.js";
import { coinFormat, dateFormat } from "../utils/formatters.js";
const registryTransactionsExtractElement = document.querySelector(".extrato .registro-transacoes");
extractRenderize();
function extractRenderize() {
    const transactionsGroups = UserAccount.getTransactionsGroups();
    registryTransactionsExtractElement.innerHTML = "";
    let registryTransactionsHTML = "";
    for (let transactionGroup of transactionsGroups) {
        let transactionItemHTML = "";
        for (let transaction of transactionGroup.transactions) {
            transactionItemHTML += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transaction.typeTransaction}</span>
                        <strong class="valor">${coinFormat(transaction.value)}</strong>
                    </div>
                    <time class="data">${dateFormat(transaction.date, DateFormat.DAY_MONTH)}</time>
                </div>
            `;
        }
        registryTransactionsHTML += `
            <div class="transacoes-group">
                <strong class="mes-group">${transactionGroup.label}</strong>
                ${transactionItemHTML}
            </div>
        `;
    }
    if (registryTransactionsHTML === "") {
        registryTransactionsHTML = `
            <div>Não há transações registradas</div>
        `;
    }
    registryTransactionsExtractElement.innerHTML = registryTransactionsHTML;
}
const ExtractComponent = {
    update() {
        extractRenderize();
    },
};
export default ExtractComponent;
