declare global {
  const process: {
    env: {
      PORT: number;
      NODE_ENV: string;
      BD_APP_NAME: string;
      BD_ENV: string;
      BD_API_URL: string;
      BD_PORT: number;
    };
  };
}
