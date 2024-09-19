import Auth from "../auth";
import Cache from "../cache";

export default class Perms {
    static role = false
    static AdminPermissions = {
        canSeeOrders: true,
        canSeeInvoices: true,
        canSeeReportsSummary: true,
        canSeeReportsTechnician: true,
        canSeeReportsDispatcher: true,
        canSeeContacts: true,
        canSeeNewAppliers: true,
    }

    static TechnicianPermissions = {
        canSeeOrders: true,
        canSeeInvoices: true,
        canSeeReportsSummary: false,
        canSeeReportsTechnician: true,
        canSeeReportsDispatcher: false,
        canSeeContacts: false,
        canSeeNewAppliers: false,
    }

    static get(type) {
        if(role === "Admin") return this.AdminPermissions[type]
        if(role === "Technician") return this.TechnicianPermissions[type]
    }
}
