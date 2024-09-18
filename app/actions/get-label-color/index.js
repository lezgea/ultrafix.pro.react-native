
export function getLabelColor(payment = "") {
    let color = ""

    switch (payment) {
        case "cash":
            color = "#6b9808"
            break;
        case "cashapp":
            color = "#91C325"
            break;
        case "check":
            color = "#EB9633"
            break;
        case "zelle":
            color = "#8549E4"
            break;
        case "card":
            color = "#000"
            break;
        case "paypal":
            color = "#024592"
            break;
        case "venmo":
            color = "#3B86EF"
            break;
        case "other":
            color = "#F4667F"
            break;
        default:
            color = "#fff"
    }
    return color
}
