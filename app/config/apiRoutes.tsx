// export const API_URL = "https://test.ultrafixappliance.com/api/v1";
export const API_URL = "https://ultrafix.pro/api/v1";


export default {
    // Auth
    authSignIn: API_URL + '/login',
    authUser: API_URL + '/auth/user',
    applyTech: API_URL + '/technician_applies',

    // Services
    servicesList: API_URL + '/services/list',

    // Orders
    orderList: API_URL + '/orders',
    orderInfo: API_URL + '/orders',
    orderCreate: API_URL + '/orders',
    orderUpdate: API_URL + '/orders',
    orderStatusUpdate: API_URL + '/orders/status',
    orderGeometry: API_URL + '/orders/geometry',
    orderPhotos: API_URL + '/orders/fileupload',
    ordersFileUpload: API_URL + '/orders/fileupload',
    ordersFileDelete: API_URL + '/orders/filedelete',
    ordersSummary: API_URL + '/summary',


    // Invoices
    invoices: API_URL + '/invoices',
    invoiceList: API_URL + '/invoices',
    invoiceInfo: API_URL + '/invoices',
    invoicesSummary: API_URL + '/invoices/summary',
    invoicesSignature: API_URL + '/invoices/editSignature',
    invoicesSendEmail: API_URL + '/invoices/sendmail',
    invoicesSendSms: API_URL + '/invoices/sendsms',

    // Employees
    employeesList: API_URL + '/employees',

    // Messages
    dialoguesList: API_URL + '/dialogues',

    // Dashboard
    dashboardData: API_URL + '/dashboard/data',

    // Contacts
    contacts: API_URL + '/contacts',

    // Parameters
    parameters: API_URL + '/parameters',
};

