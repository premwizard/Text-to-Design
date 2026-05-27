import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export async function generateUI(prompt) {
  const payload = { text: prompt };
  console.log('Sending /generate-ui payload:', payload);

  const response = await axios.post(`${API_BASE}/generate-ui`, payload, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });

  console.log('Received /generate-ui response:', response.data);
  return response.data;
}
