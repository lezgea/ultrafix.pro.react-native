import {Api} from "../../../plugins";
import apiRoutes from '../../../config/apiRoutes'
import Auth from "../../../plugins/auth";
import {Alert} from "react-native";
import Perms from "../../../plugins/perms";
import Cache from "../../../plugins/cache";


export async function signIn(state, setState, props) {
    setState({loading: true, error: ''});

    if (!state.email) {
        alert('Email field should not be empty');
        setState({...state, loading: false})
        return;
    }
    if (!state.password) {
        alert('Password field should not be empty');
        setState({...state, loading: false})
        return;
    }

    let response = await Api.post(
        apiRoutes.authSignIn,
        {
            email: state.email,
            password: state.password,
        },
    )

    if (response.status === "success") {
        let user_token = response.data?.token
        let user_data = response.data?.user

        if (!!user_token) {
            await Cache.setItem("role1", response.data?.user?.role)
            await Auth.setToken(user_token)
            await Auth.setData(user_data)
            await Auth.setRole(user_data?.role)
            setState({...state, loading: false})
        }
    } else {
        setState({loading: false, refreshing: false})
        Alert.alert(response.description, "Something went wrong. Please, try again.")
    }
}

