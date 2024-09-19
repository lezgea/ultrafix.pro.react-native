import {Api} from "../plugins";
import apiRoutes from "../config/apiRoutes";


export async function getContactsList(params) {
    return await Api.get(apiRoutes.contacts, {...params})
}

export async function getContactInfo(params) {
    return await Api.get(`${apiRoutes.contacts}/${params.id}`, {...params})
}
