const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

const postUrl = (reqObj) => {
  return fetch('http://localhost:3001/api/v1/urls', reqObj)
    .then(resp => resp.json())
    .then(json => console.log(json))
}

export { getUrls, postUrl }