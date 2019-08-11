const axios = require("axios");
const isServer = typeof window === "undefined"
const github_base_url = 'https://api.github.com'
async function requestGitHub(method,url,data,headers){
    return await axios({
        method,
        url:`${github_base_url}${url}`,
        data,
        headers
    })
}
async function request({ method = "GET", url, data={} }, req, res) {
    if(!url){
        throw Error('url must provide')
    }
  if (isServer) {
    const session = req.session;
    const gitHubAuth = session.github  || {};
    const headers = {};
    if (gitHubAuth && gitHubAuth.access_token) {
      headers["Authorization"] = `${gitHubAuth.token_type} ${
        gitHubAuth.access_token
      }`;
    }
    return await requestGitHub(method,url,data,headers)
  }else{
      return await axios({
          method,
          url:`/github${url}`,
          data
      })
  }
}
module.exports = {
    request,
    requestGitHub
}