const loginState = {
    set: (state) => sessionStorage.setItem('isLogin', JSON.stringify(state)),
    get: () => JSON.parse(sessionStorage.getItem('isLogin')),
}

const accessToken = {
    set: (token) => sessionStorage.setItem('access_token', JSON.stringify(token)),
    get: () => sessionStorage.getItem('access_token'),
}

export const authStorageService = {
    loginState,
    accessToken,
}
