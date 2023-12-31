import axios from "axios"

import apiBaseUrl from "../utils/apiBaseUrl"

export default async function(urlTitle) {
  try {
    const response = await axios(`${apiBaseUrl}/Posts/get-blog-post-by-url-title?urlTitle=${urlTitle}`)
    return response.data
  } catch(error) {
    return {getDataError: true}
  }
}