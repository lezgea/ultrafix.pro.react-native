import {Api} from "../plugins";
import apiRoutes from "../config/apiRoutes";


export const applyCreate = async (params) => {
    return await Api.post(apiRoutes.applyTech, params)
}

export const applyList = async (params) => {
    return await Api.get(apiRoutes.applyTech, {data: params})
}

export const applyUpdate = async (params) => {
    return await Api.put(`${apiRoutes.applyTech}/${params.id}`, params)
}

