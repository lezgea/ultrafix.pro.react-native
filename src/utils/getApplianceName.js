import {getServices} from "../api";

export default async function getApplianceName(id = 2) {
    let data = await getServices()

    if(!!data.length)
        return data.filter(item => item.id == id)
}

