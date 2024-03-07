const cfg = {
    // API Config
    API_BASE_URL: import.meta.env.VITE_APP_API_BASE_URL,
    SIGNIN_ENDPOINT: import.meta.env.VITE_APP_API_SIGNIN_ENDPOINT,
    SIGNUP_ENDPOINT: import.meta.env.VITE_APP_API_SIGNUP_ENDPOINT,

    // Storage Config
    JWT_KEY: import.meta.env.VITE_APP_JWT_KEY,
}

export default cfg
