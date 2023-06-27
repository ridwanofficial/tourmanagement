/* eslint-disable import/prefer-default-export */
function getClient (
  endpoint,
  { body, isStringified = false, postMethod = false, ...customConfig } = {},
  successStatus = 200
) {
  const headers = { 'content-type': 'application/json' }
  // headers.Authorization = `Bearer ${token}`
  const config = {
    method: postMethod ? 'POST' : body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }
  if (body) {
    config.body = isStringified ? body : JSON.stringify(body)
  }

  return getResponse(endpoint, config, successStatus)
}

function getResponse (endpoint, config, successStatus) {
  return window
    .fetch(`${endpoint}`, config)
    .then(response => {
      if (!response.ok) {
        throw new Error(response?.statusText)
      } else return response.json()
    })
    .then(data => {
      // if (data.status === successStatus)
      return data
      // throw Error(data.message)
    })
    .catch(err => {
      console.log('err:', err)
      throw new Error(err)
    })
}
export { getClient }
