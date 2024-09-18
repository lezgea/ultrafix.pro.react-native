export function getLabel(status = "completed") {
    let title, color = ""

    if (status === "completed") {
        title = "completed"
        color = "#91C325"
        return {title, color}
    }

    title = "uncompleted"
    color = "#EB9633"
    return {title, color}
}
