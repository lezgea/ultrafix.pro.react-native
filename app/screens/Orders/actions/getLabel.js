export function getLabel(item) {
    let label, color, value = ""
    switch(item) {
        case "pending":
            value = "pending"
            label = "Pending"
            color = "#99ACC3"
            break
        case "completed":
            value = "completed"
            label = "Completed"
            color = "#91C325"
            break
        case "on_way":
            value = "on the way"
            label = "On the Way"
            color = "#EB9633"
            break
        case "canceled":
            value = "cancelled"
            label = "Cancelled"
            color = "#FC636B"
            break
        case "part_ordered":
            value = "parts ordered"
            label = "Parts Ordered"
            color = "#25A7F0"
            break
        case "part_received":
            value = "parts received"
            label = "Parts Received"
            color = "#0551A8"
            break
        default:
            value = "manager"
            label = "Manager"
            color = "#000"
    }
    return {label, color, value}
}


export function getLabelById(id) {
    let label, color, value = ""
    switch(id) {
        case 1:
            value = "pending"
            label = "Pending"
            color = "#99ACC3"
            break
        case 2:
            value = "on the way"
            label = "On the Way"
            color = "#EB9633"
            break
        case 3:
            value = "completed"
            label = "Completed"
            color = "#91C325"
            break
        case 4:
            value = "parts ordered"
            label = "Parts Ordered"
            color = "#25A7F0"
            break
        case 5:
            value = "cancelled"
            label = "Cancelled"
            color = "#FC636B"
            break
        case 6:
            value = "parts received"
            label = "Parts Received"
            color = "#0551A8"
            break
        default:
            value = "manager"
            label = "Manager"
            color = "#000"
    }
    return {label, color, value}
}
