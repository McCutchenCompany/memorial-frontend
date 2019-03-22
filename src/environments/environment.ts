// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'Memorial Local',
  api: 'https://svc-stag.mymemorial.co',
  auth0: {
    clientID: 'ToDTNgJYq3WcLe2KdA7LrnTImrcwzP5C',
    domain: 'mitch-mccutchen.auth0.com',
    responseType: 'token id_token',
    audience: 'https://memorial-auth/',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid email profile'
  },
  s3: {
    url: 'https://memorial-staging-imgs.s3.amazonaws.com/'
  },
  google: {
    apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE'
  },
  stripe: {
    publicKey: 'pk_test_nN2N0PLFIBrWEW9Atg1HdGen'
  },
  url: 'http://localhost:4200/',
  discount: '7ede932c',
  example: {
    uuid: '41f5a855-c76d-4385-b97f-aeee827bbccc',
    name: 'Obi-wan Kenobi'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
