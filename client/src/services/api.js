import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://text-to-design.onrender.com';

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
