export interface User {
  _id?: string;
  email: string;
  password?: string;
  name?: string;
  createdAt?: Date;
  pushSubscription?: PushSubscription;
}

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    _id: string;
    email: string;
    name?: string;
  };
}

export interface NotificationPayload {
  title: string;
  body: string;
  data?: any;
}
