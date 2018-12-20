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
    accessKeyId: 'AKIAIB42X6566NMXGCOQ',
    secretAccessKey: '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',
    region: 'us-east-1',
    bucket: 'memorial-staging-imgs',
    url: 'https://memorial-staging-imgs.s3.amazonaws.com/'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
