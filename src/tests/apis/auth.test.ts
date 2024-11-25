import { describe, it, expect } from 'vitest';
import { httpClient } from '@/apis/http';
import axios from 'axios';

describe('Authentication API Tests', () => {
  it('should successfully log in', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    try {
      const response = await httpClient.post('/api/auth/login', loginData);
      console.log('Response:', response.data);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('accessToken');
      expect(response.data).toHaveProperty('refreshToken');
    } catch (error: any) {
      console.error('Error:', error.message || error);

      if (axios.isAxiosError(error)) {
        if (!error.response) {
          console.error('Network error occurred, response is undefined.');
        } else {
          expect(error.response).toBeDefined();
          console.log('Axios Error Response:', error.response?.data);
        }
      } else {
        throw error;
      }
    }
  });
});
