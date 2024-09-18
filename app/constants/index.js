import Auth from "../plugins/auth";


export const STATUSES = [
    { label: 'Pending', color: "#99ACC3", value: 1 },
    { label: 'On the Way', color: "#EB9633", value: 2 },
    { label: 'Completed', color: "#91C325", value: 3 },
    { label: 'Parts Ordered', color: "#25A7F0", value: 4 },
    { label: 'Cancelled', color: "#FC636B", value: 5 },
    { label: 'Parts Received', color: "#0551A8", value: 6 },
    { label: 'Manager', color: "#000", value: 7 },
]


export const PAYMENT_TYPES = [
    { label: 'Card', value: 1 },
    { label: 'Check', value: 3 },
    { label: 'Other', value: 4 },
    { label: 'Zelle', value: 5 },
    { label: 'CashApp', value: 6 },
    { label: 'Venmo', value: 7 },
    { label: 'PayPal', value: 8 },




    { label: 'Unpaid', value: 2 },





    { label: 'Cash', value: 9 },
]


export const ORDER_TIME_RANGES = [
    { label: "8am - 11am", value: "08:00-11:00" },
    { label: "9am - 12am", value: "09:00-12:00" },
    { label: "10am - 1pm", value: "10:00-13:00" },
    { label: "11am - 2pm", value: "11:00-14:00" },
    { label: "12pm - 3pm", value: "12:00-15:00" },
    { label: "1pm - 4pm", value: "13:00-16:00" },
    { label: "2pm - 5pm", value: "14:00-17:00" },
    { label: "3pm - 6pm", value: "15:00-18:00" },
    { label: "4pm - 7pm", value: "16:00-19:00" },
    { label: "5pm - 8pm", value: "17:00-20:00" },
]


export const ORDER_INITIAL = {
    loading: false,
    success: false,
    error: false,
    description: "",
    data: {
        ticket: "",
        customer_name: "",
        customer_phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        order_at: new Date(),
        order_time_range: "",
        problem_description: "",
        status: 1,
        creator_id: parseInt(JSON.parse(Auth.getData()).id),
        latitude: 0.1,
        longitude: 0.1,
        appliances: [],
        users: [],
        notify_remote_tech: 0
    }
}
