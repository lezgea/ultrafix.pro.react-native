import React from "react";


export function orderReducer(state, action) {
    try {
        switch(action.type) {
            case "loading": return {...state, loading: true}
            case "ticket":
            case "customer_name":
            case "creator_id":
            case "customer_phone":
            case "address":
            case "city":
            case "state":
            case "zip":
            case "order_at":
            case "order_time_range":
            case "problem_description":
            case "latitude":
            case "appliances":
            case "longitude":
            case "notify_remote_tech":
            case "users":
                return {...state, data: {...state.data, [action.type]: action.val}}
            case "all":
                return {...state, data: {...action.val}}
        }
    } catch(err) {
    }
}
