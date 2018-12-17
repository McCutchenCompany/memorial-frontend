export const environment = {
  production: false,
  title: 'Memorial Staging',
  api: 'https://svc-stag.mymemorial.co',
  auth0: {
    clientID: 'ToDTNgJYq3WcLe2KdA7LrnTImrcwzP5C',
    domain: 'mitch-mccutchen.auth0.com',
    responseType: 'token id_token',
    audience: 'https://mymemorial.co',
    redirectUri: 'https://staging.mymemorial.co/callback',
    scope: 'openid email profile'
  }
};
