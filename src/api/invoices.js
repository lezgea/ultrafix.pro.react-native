import { Api } from "../plugins";
import apiRoutes from "../config/apiRoutes";


export const getInvoicesList = async (params) => {
    return await Api.get(apiRoutes.invoiceList, { ...params })
}

export const getInvoiceInfo = async (params) => {
    return await Api.get(`${apiRoutes.invoiceInfo}/${params.id}`, { ...params })
}

export const onInvoiceUpdate = async (params) => {
    return await Api.put(`${apiRoutes.invoices}/${params.id}`, { ...params })
}

export const getInvoicesSummary = async (params) => {
    return await Api.get(apiRoutes.invoicesSummary, { ...params })
}

export const getInvoiceTypes = async (params) => {
    return await Api.get(`${apiRoutes.parameters}?key=invoice_types`, {})
}

export async function updateInvoiceSignature(params) {
    var formData = new FormData();
    formData.append('id', params.id);
    formData.append('signature', params.signature);
    return await Api.postFormData(apiRoutes.invoicesSignature, formData)
}


export const onSendEmail = async (params) => {
    return await Api.post(`${apiRoutes.invoicesSendEmail}/${params.id}`, { email: params.email, pdf: params.pdf })
}


export const onSendText = async (params) => {
    return await Api.post(`${apiRoutes.invoicesSendSms}/${params.id}`, { number: params.number })
}


