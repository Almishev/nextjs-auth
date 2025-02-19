export function getBaseUrl() {
  // Always use absolute URLs in SSR
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Check if we're in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // Fallback to relative URL
  return '';
}

export async function fetchApi(endpoint: string, options = {}) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
} 