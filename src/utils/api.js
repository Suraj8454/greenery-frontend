const configuredBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();
const API_BASE = configuredBase.replace(/\/+$/, '');
export const getToken = () => localStorage.getItem('cs_token') || '';

export const api = async (path, options = {}) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_BASE}${normalizedPath}`, {
      ...options,
      headers,
    });
  } catch (error) {
    throw new Error(`Unable to reach the API (${API_BASE}). Check VITE_API_URL and ensure the backend is running.`);
  }

  const type = response.headers.get('content-type') || '';
  let data;
  try {
    data = type.includes('application/json') ? await response.json() : await response.text();
  } catch {
    data = null;
  }
  if (!response.ok) {
    const message = typeof data === 'string'
      ? data
      : data?.error || data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
};

export const mediaUrl = (image) => {
  if (!image) return '';
  if (/^(https?:)?\/\//i.test(image)) return image;
  const origin = API_BASE.replace(/\/api$/i, '');
  return `${origin}${image.startsWith('/') ? image : `/${image}`}`;
};
