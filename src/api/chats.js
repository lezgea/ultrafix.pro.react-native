import {Alert} from 'react-native'
import {Api} from "../plugins";
import apiRoutes from "../config/apiRoutes";


export async function loadDialogues(state, setState) {
    setState({refreshing: true})
    let response = await Api.get(apiRoutes.dialoguesList, state.params)

    if (response.status === "success") {
        if (state.params.skip > 1) {
            setState({
                data: state.data.concat(response.data),
                loading: false,
                refreshing: false
            })
        } else {
            setState({
                data: response.data,
                loading: false,
                refreshing: false
            })
        }
    } else {
        setState({loading: false, refreshing: false})
        Alert.alert(response.description, "Something went wrong. Please, try again.")
    }
}
