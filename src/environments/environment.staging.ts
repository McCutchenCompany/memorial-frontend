export const environment = {
  production: false,
  title: 'Memorial Staging',
  api: 'https://svc-stag.mymemorial.co',
  auth0: {
    clientID: 'ToDTNgJYq3WcLe2KdA7LrnTImrcwzP5C',
    domain: 'mitch-mccutchen.auth0.com',
    responseType: 'token id_token',
    audience: 'https://memorial-auth/',
    redirectUri: 'https://staging.mymemorial.co/callback',
    scope: 'openid email profile'
  },
  s3: {
    url: 'https://memorial-staging-imgs.s3.amazonaws.com/'
  },
  google: {
    apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE'
  },
  url: 'https://staging.mymemorial.co/'
};
