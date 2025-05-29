
const oidcConfig = {
    // authority: process.env.REACT_APP_AUTHORITY,
    // clientId: process.env.REACT_APP_CLIENT_ID,
    // authority: 'https://authenticationserver20230103102155.azurewebsites.net/',
    authority: 'https://authenticationserver.azurewebsites.net/',
    clientId: 'react-client-local',
    scope: 'openid profile native-client-scope IdentityServerApi',
    responseType: 'id_token token',
    redirectUri: window.location.origin + '/signin-oidc',
    autoSignIn: false,
}

export default oidcConfig
