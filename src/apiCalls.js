const checkResponse = (resp) => {
  if(!resp.ok) {
    throw new Error(resp.statusCode)
  }
  return resp.json();
}

const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(resp => checkResponse(resp))
}

const postUrl = (reqObj) => {
  return fetch('http://localhost:3001/api/v1/urls', reqObj)
    .then(resp => checkResponse(resp))
}

export { getUrls, postUrl }