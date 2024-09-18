import React from 'react';
import Cache from "../cache";


export default class Auth
{
    static data = false;
    static token= false;
    static role= false;
    static deviceToken= false;

    static async get()
    {
        let token = await Cache.getItem('token');
        let user_data = await Cache.getItem('userdata');
        let role = await Cache.getItem('role');

        if(!!token && !!user_data && !!role)
        {
            Auth.token = token
            Auth.data = user_data
            Auth.role = role
            return {
                token: JSON.stringify(token),
                // data: user_data,
            };
        }
        return false;
    }


    static async setData(data)
    {
        Auth.data=data;
        await Cache.setItem('userdata', JSON.stringify(data));
        return data;
    }


    static async setToken(token)
    {
        Auth.token=token;
        await Cache.setItem('token', token);
        return token;
    }


    static async setRole(role)
    {
        Auth.role=role;
        await Cache.setItem('role', role);
        return role;
    }


    static async flush() {
        try {
            Auth.token = false;
            Auth.role = false;
            Auth.data = false;
            await Cache.removeItem('token');
            await Cache.removeItem('userdata');
            await Cache.removeItem('role');
            // await Cache.removeItem('role');
            return true;
        } catch (error) {
            return false;
        }
    }




    static getToken()
    {
        if(Auth.token)
            return Auth.token;
        return false;
    }


    static getData()
    {
        if(Auth.data)
            return Auth.data;
        return false;
    }


    static getRole()
    {
        if(Auth.role)
            return Auth.role;
        return false;
    }

}
