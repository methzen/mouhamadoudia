import axios from "axios"

import apiBaseUrl from "../utils/apiBaseUrl.js"

export default async function() {
    try {
        const response = await axios (`${apiBaseUrl}/Posts/get-Three-newest-posts`)
        return response.data

    } catch (error) {
        return {getDataError : true}
    }

}
