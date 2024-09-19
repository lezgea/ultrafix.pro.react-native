import {Api} from "../plugins";
import apiRoutes from "../config/apiRoutes";


export async function getLoggedUserInfo(params) {
    return await Api.get(apiRoutes.authUser, {...params})
}


export async function getEmployees(state, setState, role) {
    let response = await Api.get(apiRoutes.employeesList, {})

    try {
        if(!!role) {
            setState(response.data.filter(item => item.role === role))
            return
        }
        setState(response.data)
    } catch(err) {
    }
}


export async function getTechniciansList(state, setState) {
    let response = await Api.get(apiRoutes.employeesList, {})

    try {
        let data = response.data.filter(item => item.role === "Technician")
        let filteredData = data.map((item, i) => ({label: item.name, value: item.id, id:item.id}))
        setState({...state, list: filteredData})
    } catch(err) {
        console.log(err)
    }
}
