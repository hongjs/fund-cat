import axios, { AxiosInstance, AxiosError } from 'axios';

// Create axios instance for Fund Daily Info API
export const fundDailyClient: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SEC_FUND_DAILY_BASE_URL || 'https://api.sec.or.th/FundDailyInfo',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SEC_FUND_DAILY_API_KEY || '',
  },
});

// Create axios instance for Fund Factsheet API
export const fundFactsheetClient: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SEC_FUND_FACTSHEET_BASE_URL || 'https://api.sec.or.th/FundFactsheet',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SEC_FUND_FACTSHEET_API_KEY || '',
  },
});

// Request interceptor
const requestInterceptor = (config: any) => {
  // You can add custom logic here (e.g., logging, adding tokens)
  return config;
};

// Response interceptor
const responseInterceptor = (response: any) => {
  return response;
};

// Error interceptor
const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.status, error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('Network Error:', error.message);
  } else {
    // Something else happened
    console.error('Error:', error.message);
  }
  return Promise.reject(error);
};

// Add interceptors to both clients
[fundDailyClient, fundFactsheetClient].forEach((client) => {
  client.interceptors.request.use(requestInterceptor, errorInterceptor);
  client.interceptors.response.use(responseInterceptor, errorInterceptor);
});

export default { fundDailyClient, fundFactsheetClient };
