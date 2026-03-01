import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router'; 
import { AuthContext } from '../contexts/AuthContext';

const axiosSecure = axios.create({
  baseURL: 'https://a11-b2b-wholesale-platformt-server.vercel.app', // <-- Updated to standard Express port
  // withCredentials: true // <-- Add this ONLY if your backend is setting JWTs via HTTP-only cookies instead of localStorage
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Request Interceptor
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token'); 
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 2. Response Interceptor
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response?.status;
        
        // Match this with your backend verifyToken.js status codes
        if (status === 401 || status === 403) {
          console.error('Unauthorized access - logging out');
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;