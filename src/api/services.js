import {Api} from "../plugins";
import apiRoutes from "../config/apiRoutes";
import {Alert} from "react-native";


export async function getServices(state,setState) {
    let response = await Api.get(apiRoutes.servicesList, {})
    
    if (!!response.data.length) {
       var temp=[]
        for(let i=0;i<response.data.length;i++)
        {
            temp.push({label:response.data[i].title,value:response.data[i].id})
        }
       
        setState(temp)
    } else {
        Alert.alert(response.description, "Something went wrong. Please, try again.")
    }
}
