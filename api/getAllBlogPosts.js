import axios from "axios"

import apiBaseUrl from "../utils/apiBaseUrl"

export default async function() {
  try {
    const response = await axios(`${apiBaseUrl}/Posts/get-all-blog-posts`)
    return response.data
  } catch(error) {
    return {getDataError: true}
  }
}