import Auth from "../auth";

export class Api {
    static cache = null
    static token = false

    static async request(url, method = "GET", params) {
        this.token = await Auth.getToken()
        let pathWithParams = url + '?' + Api.serializeQuery(params)
        let pathWithoutParams = url
        let body = method !== "GET" ? JSON.stringify(params) : null

        return await fetch((method === 'POST' || !Object.keys(params)?.length) ? pathWithoutParams : pathWithParams,
            {
                method,
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body,
            }
        )
            .then(async (res) => {
                return await res.json()
            })
            .catch(async (err) => {
                return err
            })
    }

    static async get(url, params) {
        return await this.request(url, "GET", params)
    }

    static async post(url, params) {
        return await this.request(url, "POST", params)
    }

    static async postFormData(url, params) {
        this.token = await Auth.getToken()
        let pathWithParams = url + '?' + Api.serializeQuery(params)
        let body = params
        let method = "POST"

        return await fetch(url,
            {
                method,
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body,
            }
        )
            .then(async (res) => {
                return await res.json()
            })
            .catch(async (err) => {
                return err
            })
    }


    static async put(url, params) {
        return await this.request(url, "PUT", params)
    }

    static async patch(url, params) {
        return await this.request(url, "PATCH", params)
    }

    static async del(url, params) {
        return await this.request(url, "DELETE", params)
    }

    static serializeQuery(params, prefix) {
        const query = Object.keys(params).map((key) => {
            const value = params[key]
            if (params.constructor === Array) {
                key = `${prefix}[]`
            } else if (params.constructor === Object) {
                key = (prefix ? `${prefix}[${key}]` : key)
            }
            if (typeof value === 'object') {
                return Api.serializeQuery(value, key)
            } else {
                return `${key}=${encodeURIComponent(value)}`
            }
        })
        return [].concat.apply([], query).join('&')
    }
}
