import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl"

export default function(id, callback) {
  axios.put(`${apiBaseUrl}/blog-posts/delete`, {
    id: id
  }, {
    withCredentials: true
  })
  .then(function(response) {
    callback(response.data)
  })
  .catch(function(error) {
    callback({submitError: true})
  })
}