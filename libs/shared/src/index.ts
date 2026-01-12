// Shared interfaces and DTOs for both frontend and backend

export interface Birthday {
  _id?: string;
  userId: string;
  name?: string;
  birthDay: number;    // 1-31
  birthMonth: number;  // 1-12
  birthYear?: number;  // optional
  createdAt?: Date;
  updatedAt?: Date;
}

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

export interface LoginResponse {
  accessToken: string;
  user: {
    _id: string;
    email: string;
    name?: string;
  };
}

export interface UpcomingBirthday extends Birthday {
  daysUntil: number;
  age?: number;
}

export interface NotificationPayload {
  title: string;
  body: string;
  data?: any;
}
