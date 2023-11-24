import { DateFormat } from "../types/FormatDate.js";

export function coinFormat(value: number): string {
    return value.toLocaleString("pt-br", { currency: "BRL", style: "currency"});
}

export function dateFormat(date: Date, format: DateFormat = DateFormat.DEFAULT): string {
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