import { useState, useEffect } from "react";

export default httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const responseInterceptor = httpClient.interceptors.response.use(
    r => r,
    err => {
      setError(err);
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(responseInterceptor);
    };
  }, [reqInterceptor, responseInterceptor]);

  const confirmedErrorHandler = () => setError(null);

  return [error, confirmedErrorHandler];
};
