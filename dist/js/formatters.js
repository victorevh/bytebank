function coinFormat(value) {
    return value.toLocaleString("pt-br", { currency: "BRL", style: "currency" });
}
function dateFormat(date, format = DateFormat.DEFAULT) {
    if (format === DateFormat.DAY_WEEK_DAY_MONTH_YEAR) {
        return date.toLocaleDateString("pt-br", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
    }
    else if (format === DateFormat.DAY_MONTH) {
        return date.toLocaleDateString("pt-br", {
            month: "2-digit",
            day: "2-digit"
        });
    }
    return date.toLocaleDateString("pt-br");
}
