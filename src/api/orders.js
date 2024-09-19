import { Api } from "../plugins";
import apiRoutes from "../config/apiRoutes";


export async function getOrdersList(params) {
    return await Api.get(apiRoutes.orderList, { ...params })
}

export async function getOrderInfo(params) {
    return await Api.get(`${apiRoutes.orderInfo}/${params.id}`, { ...params })
}

export async function getOrdersSummary(params) {
    return await Api.get(apiRoutes.ordersSummary, { ...params })
}



export async function getOrdersGeometry(params) {
    return await Api.get(apiRoutes.orderGeometry, { ...params })
}


export async function updateOrderStatus(status, id, func, showToast) {
    let response = await Api.post(apiRoutes.orderStatusUpdate, { status: status, id: id })

    if (response.status === "success") {
        showToast({ description: "Order status updated!" })
        await func()
    } else {
    }
}


export async function addOrderPhoto(params) {
    return await Api.post(apiRoutes.orderPhotos, { ...params })
}


export async function updateOrder(id, data, appliances, showToast) {
    var temp_user = data['users']
    var temp_data = []
    for (var i = 0; i < temp_user.length; i++) {
        temp_data.push(parseInt(temp_user[i].id))
    }
    var final_data = {
        "id": id,
        "address": data.address,
        "longitude": "-96.776012",
        "latitude": "32.677436",
        "problem_description": data.problem_description,
        "customer_name": data.customer_name,
        "customer_phone": data.customer_phone,
        "order_time_range": data.order_time_range,
        "ticket_num": data.ticket_num,
        "order_at": data.order_at.split(' ')[0],
        "address_location": "",
        "status": data.status,
        "creator_id": data.creator_id,
        "type": data.type,
        "notify_remote_tech": data.notify_remote_tech,
        "state": data.state,
        "zip": data.zip,
        "city": data.city,
        "users": temp_data,
        "technichians": data.technichians,
        "appliances": appliances
    }

    for (var i = 0; i < final_data.appliances.length; i++) {
        final_data.appliances[i]["description"] = ""
    }
}



const replaceNull = (value) => {
    return (value == null) ? "" : value
}
//Parse Json and check for null
const removeNullFromJson = (object1, jsonObj) => {
    for (const [key, value] of Object.entries(object1)) {
        if (Array.isArray(value)) {
            jsonObj[key] = [];
            for (let i = 0; i < value.length; i++) {
                jsonObj[key].push(removeNullFromJson(value[i], {}))
            }
        }
        else if (typeof value == "object" && value != null) {
            jsonObj[key] = removeNullFromJson(value, {})
        }
        else {
            jsonObj[key] = replaceNull(value);
        }
    }
    return jsonObj

}

export async function createOrder(state, dispatch, navigation, showToast) {
    let response = await Api.post(apiRoutes.orderCreate, { ...state.data })

    if (response.status === "success") {
        showToast({ description: "Order has been created successfully!" })
        await navigation.navigate("OrdersScreen")
    } else {
        showToast({ description: response.message })
    }
}



export async function ordersFileUpload(params) {
    var formData = new FormData()
    formData.append('id', params.id)
    formData.append('file', params.file?.uri, params.file?.fileName)
    console.log('----', formData)
    return await Api.postFormData(apiRoutes.ordersFileUpload, formData)
}


export async function ordersFileDelete(params) {
    return await Api.post(apiRoutes.ordersFileDelete, params)
}
