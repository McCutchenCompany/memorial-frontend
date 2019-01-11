export class AppState {
  loading: boolean;
  loaded: boolean;
  purchasing: boolean;
  purchased: boolean;
  email: {
    sending: boolean;
    sent: boolean;
    error: any;
  };
  error: any;
  discount: Discount;
}

export class Discount {
  percent: number;
  code: string;
  error: any;
}
