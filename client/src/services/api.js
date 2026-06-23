import axios from 'axios';
import { normalizeApiBaseUrl } from '../lib/urlHelpers';

let API_BASE = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL || 'https://text-to-design.onrender.com');
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  API_BASE = 'http://localhost:5173';
}

export async function generateUI(prompt) {
  const payload = { text: prompt };
  // payload logging removed

  const response = await axios.post(`${API_BASE}/generate-ui`, payload, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });

  // response logging removed
  return response.data;
}
