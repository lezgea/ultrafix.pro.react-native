export const reports = [
    {
        ticket: 9266,
        payments: ["card", "check"],
        paid: true,
        partsPrice: 5262,
        techEarning: 12369,
        amount: 25000,
        date: "27 Nov, 2022",
        time: "10 AM",
        customer: "Anar Musayev",
        technician: "Dede",
    },
    {
        ticket: 9265,
        payments: ["cashapp", "cash"],
        paid: false,
        partsPrice: false,
        techEarning: 36000,
        amount: 80000,
        date: "27 Nov, 2022",
        time: "11 AM",
        customer: "Musa Manayev",
        technician: "Aydin",
    },
    {
        ticket: 9265,
        payments: ["zelle"],
        paid: false,
        partsPrice: false,
        techEarning: 36000,
        amount: 80000,
        date: "27 Nov, 2022",
        time: "11 AM",
        customer: "Musa Manayev",
        technician: "Aydin",
    },
    {
        ticket: 9264,
        payments: ["paypal", "check", "cash"],
        paid: true,
        partsPrice: false,
        techEarning: 45000,
        amount: 120000,
        date: "27 Nov, 2022",
        time: "12 PM",
        customer: "Anar Musayev",
        technician: "Fariz",
    },
    {
        ticket: 9263,
        payments: ["venmo"],
        paid: true,
        partsPrice: false,
        techEarning: 30000,
        amount: 70000,
        date: "27 Nov, 2022",
        time: "1:30 PM",
        customer: "Musa Manayev",
        technician: "Mack",
    },
    {
        ticket: 9262,
        payments: [],
        paid: false,
        partsPrice: false,
        techEarning: 30000,
        amount: 70000,
        date: "27 Nov, 2022",
        time: "2 PM",
        customer: "Anar Musayev",
        technician: "Dede",
    },
    {
        ticket: 9261,
        payments: ["zelle"],
        paid: false,
        partsPrice: 12000,
        techEarning: 45000,
        amount: 120000,
        date: "27 Nov, 2022",
        time: "3 PM",
        customer: "Musa Manayev",
        technician: "Aydin",
    },
    {
        ticket: 9260,
        payments: ["check"],
        paid: true,
        partsPrice: false,
        techEarning: 12369,
        amount: 120000,
        date: "27 Nov, 2022",
        time: "4 PM",
        customer: "Kaplinsky",
        technician: "Dede",
    },
    {
        ticket: 9259,
        payments: ["paypal", "cash"],
        paid: false,
        partsPrice: false,
        techEarning: 30000,
        amount: 70000,
        date: "27 Nov, 2022",
        time: "5 PM",
        customer: "Anar Musayev",
        technician: "Mack",
    },
    {
        ticket: 9258,
        payments: ["cash"],
        paid: false,
        partsPrice: 12000,
        techEarning: 45000,
        amount: 120000,
        date: "27 Nov, 2022",
        time: "6 PM",
        customer: "Musa Manayev",
        technician: "Aydin",
    },
    {
        ticket: 9259,
        payments: ["venmo", "card"],
        paid: true,
        partsPrice: false,
        techEarning: 12369,
        amount: 120000,
        date: "27 Nov, 2022",
        time: "7:30 PM",
        customer: "Anar Musayev",
        technician: "Dede",
    },
]


export const invoices = [
    {
        ticket: 9265,
        completed: true,
        paid: true,
        amount: 1200,
        date: "22 Nov, 2022",
        time: "11 AM",
        customer: "Yvett Kaplinsky",
        technician: "Aydin",
    },
    {
        ticket: 9264,
        completed: false,
        paid: false,
        amount: 375,
        date: "22 Nov, 2022",
        time: "3 PM",
        customer: "Ulfeddin Xalu",
        technician: "Dede",
    },
    {
        ticket: 9263,
        completed: false,
        paid: true,
        amount: 1550,
        date: "22 Nov, 2022",
        time: "5 PM",
        customer: "Dadash",
        technician: "Mack",
    },
    {
        ticket: 9262,
        completed: true,
        paid: true,
        amount: 1300,
        date: "22 Nov, 2022",
        time: "6 PM",
        customer: "Filankes Filankesov",
        technician: "Mack",
    },
    {
        ticket: 9261,
        completed: false,
        paid: false,
        amount: 445,
        date: "22 Nov, 2022",
        time: "7 PM",
        customer: "Nazeddin",
        technician: "Dede",
    },
    {
        ticket: 9260,
        completed: true,
        paid: true,
        amount: 775,
        date: "22 Nov, 2022",
        time: "8 PM",
        customer: "Lezgi Kamran",
        technician: "Aydin",
    },
    {
        ticket: 9259,
        completed: true,
        paid: true,
        amount: 500,
        date: "22 Nov, 2022",
        time: "8 PM",
        customer: "Yaxshi Oglan",
        technician: "Dede",
    },
]


export const gCharts = [
    {
        name: "COMPLETED",
        value: 67,
        color: '#91C325',
    },
    {
        name: "PARTS RECEIVED",
        value: 1,
        color: '#0551A8',
    },
    {
        name: "PARTS ORDERED",
        value: 1,
        color: '#25A7F0',
    },
    {
        name: "PENDING",
        value: 1,
        color: '#99ACC3',
    },
    {
        name: "CANCELLED",
        value: 1,
        color: '#FC636B',
    },
    {
        name: "ON THE WAY",
        value: 1,
        color: '#EB9633',
    },
]



export const cancelledCharts = [
    {
        value: 21,
        color: '#FC636B',
    },
    {
        value: 279,
        color: '#efefef',
    },
]

export const onTheWayCharts = [
    {
        value: 9,
        color: '#EB9633',
    },
    {
        value: 191,
        color: '#efefef',
    },
]

export const partsOrderedCharts = [
    {
        value: 10,
        color: '#25A7F0',
    },
    {
        value: 290,
        color: '#efefef',
    },
]

export const partsReceivedCharts = [
    {
        value: 12,
        color: '#0551A8',
    },
    {
        value: 93,
        color: '#efefef',
    },
]

export const pendingCharts = [
    {
        value: 112,
        color: '#99ACC3',
    },
    {
        value: 188,
        color: '#efefef',
    },
]

export const completedCharts = [
    {
        name: "COMPLETED",
        value: 164,
        color: '#91C325',
    },
    {
        name: "COMPLETED",
        value: 21,
        color: '#FC636B',
    },
    {
        name: "COMPLETED",
        value: 136,
        color: '#efefef',
    },
]

export const unCompletedCharts = [
    {
        name: "UNCOMPLETED",
        value: 136,
        color: '#25A7F0',
    },
    {
        name: "UNCOMPLETED",
        value: 21,
        color: '#0551A8',
    },
    {
        name: "UNCOMPLETED",
        value: 120,
        color: '#99ACC3',
    },
    {
        name: "UNCOMPLETED",
        value: 164,
        color: '#efefef',
    },
]
