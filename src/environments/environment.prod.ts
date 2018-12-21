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
    bucket: 'memorial-staging-imgs'
  }
};
