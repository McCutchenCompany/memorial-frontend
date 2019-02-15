export const environment = {
  production: true,
  title: 'Memorial',
  api: 'https://memprod.mymemorial.co',
  auth0: {
    clientID: 'ToDTNgJYq3WcLe2KdA7LrnTImrcwzP5C',
    domain: 'mitch-mccutchen.auth0.com',
    responseType: 'token id_token',
    audience: 'https://memorial-auth/',
    redirectUri: 'https://mymemorial.co/callback',
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
  url: 'https://mymemorial.co/',
  discount: 'dd7dbe8a'
};
