// lib/api.ts - Tạo helper functions cho API calls

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:3000';

// Generic API function
async function apiCall(
  endpoint: string, 
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API call failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Fitness Plans API functions
export const fitnessPlansAPI = {
  // Lấy tất cả plans
  getAll: () => apiCall('/fitness-plans'),

  // Lấy plan theo ID
  getById: (id: string) => apiCall(`/fitness-plans/${id}`),

  // Tạo plan mới
  create: (planData: any) => apiCall('/fitness-plans', {
    method: 'POST',
    body: JSON.stringify(planData),
  }),

  // Update plan
  update: (id: string, planData: any) => apiCall(`/fitness-plans/${id}`, {
    method: 'PUT',
    body: JSON.stringify(planData),
  }),

  // Xóa plan
  delete: (id: string) => apiCall(`/fitness-plans/${id}`, {
    method: 'DELETE',
  }),
};

// Test API function
export const testAPI = {
  hello: () => apiCall('/hello'),
  sendData: (data: any) => apiCall('/hello', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default apiCall;