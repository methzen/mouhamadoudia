import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl"

export default async function(req) {
  try {
    const cookie = req.headers.cookie ? req.headers.cookie : ""

    const response = await axios.get(`${apiBaseUrl}/users/authenticate`, {
      headers: req ? {cookie: cookie} : "",
      withCredentials: true
    })

    return response.data
  } catch(error) {
    return {success: false}
  }
}