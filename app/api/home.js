import {Api} from "../plugins";
import apiRoutes from "../config/apiRoutes";


export const loadDashboardData = async (params) => {
    return await Api.get(apiRoutes.dashboardData, {data: params})
}

