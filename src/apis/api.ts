
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Mock API for development

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data generators
const generateMockPeople = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `person-${i + 1}`,
    name: `Person ${i + 1}`,
    email: `person${i + 1}@example.com`,
    phone: `+1 555-${String(i + 1).padStart(3, '0')}-${Math.floor(Math.random() * 9000) + 1000}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=person${i + 1}`,
    role: ['Manager', 'Developer', 'Designer', 'Analyst'][Math.floor(Math.random() * 4)],
    status: Math.random() > 0.3 ? 'active' : 'inactive',
    joinedDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
    location: ['New York', 'London', 'Tokyo', 'Sydney'][Math.floor(Math.random() * 4)],
    department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
  }));
};

const generateMockTerritories = () => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `territory-${i + 1}`,
    name: `Territory ${i + 1}`,
    type: ['Urban', 'Rural', 'Suburban', 'Metropolitan'][Math.floor(Math.random() * 4)],
    area: Math.floor(Math.random() * 10000) + 1000,
    population: Math.floor(Math.random() * 100000) + 10000,
    status: Math.random() > 0.2 ? 'active' : 'inactive',
    manager: `Manager ${i + 1}`,
    createdDate: new Date(2019 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
    coordinates: {
      lat: 40.7128 + (Math.random() - 0.5) * 10,
      lng: -74.0060 + (Math.random() - 0.5) * 10,
    },
    description: `This is a detailed description of Territory ${i + 1} with comprehensive coverage and strategic importance.`,
  }));
};

export const authApi = {
  sendOtp: async (phoneNumber: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { success: true } };
  },
  verifyOtp: async (otp: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (otp === '1234') {
      return { 
        data: { 
          user: { 
            id: '1', 
            name: 'Admin User', 
            email: 'admin@example.com' 
          } 
        } 
      };
    }
    throw new Error('Invalid OTP');
  },
};

export const peopleApi = {
  fetchPeople: async () => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return { data: generateMockPeople() };
  },
};

export const territoryApi = {
  fetchTerritories: async () => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return { data: generateMockTerritories() };
  },
};
