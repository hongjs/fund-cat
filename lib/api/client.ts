/**
 * API client utilities using native fetch
 * These clients point to our internal API routes which proxy to SEC API
 */

interface FetchOptions extends RequestInit {
  baseURL?: string;
}

interface ApiResponse<T> {
  data?: T;
  status: number;
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};

/**
 * Generic fetch wrapper for API calls
 */
async function apiFetch<T>(
  url: string,
  baseURL: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const origin = typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin;
    const fullUrl = `${origin}${baseURL}${url}`;

    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error(`API Error: ${response.status}`, data);
    }

    return { data, status: response.status };
  } catch (error) {
    console.error('Network Error:', error);
    throw error;
  }
}

/**
 * Fund Daily Info API client
 */
export const fundDailyClient = {
  get: async <T,>(path: string) => {
    return apiFetch<T>(path, '/api/fund-daily', {
      method: 'GET',
    });
  },
};

/**
 * Fund Factsheet API client
 */
export const fundFactsheetClient = {
  get: async <T,>(path: string) => {
    return apiFetch<T>(path, '/api/fund-factsheet', {
      method: 'GET',
    });
  },
};

export default { fundDailyClient, fundFactsheetClient };
