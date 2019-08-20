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
    url: 'https://memorial-imgs.s3.amazonaws.com/'
  },
  google: {
    apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE'
  },
  stripe: {
    publicKey: 'pk_live_dusuYntW07CvPrTL0i3PHnhj'
  },
  url: 'https://mymemorial.co/',
  discount: null,
  example: {
    uuid: '020cac1f-f335-4c0d-831f-7567b9076b61',
    name: 'John F. Kennedy'
  },
  price: 50
};
