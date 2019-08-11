const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id ='2b30f22403f1b1ada520'
module.exports = {
    GITHUB_OAUTH_URL,
    OAUTH_URL:`${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
    github: {
        client_id,
        client_secret: '399aac35c2622e116c818de157018eafb1f3a65f',
        request_token_url :'https://github.com/login/oauth/access_token'
    }
}