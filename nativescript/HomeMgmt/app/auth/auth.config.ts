interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: 'fBho0w0uj5kvpQ6jef6lgK43rbgf8ZYV',
    domain: 'laxtech.eu.auth0.com',
    callbackURL: 'https://laxtech.eu.auth0.com/android/YOUR_APP_PACKAGE_NAME/callback'
    //callbackURL: 'http://localhost:4200'
};
