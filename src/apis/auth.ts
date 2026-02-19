import { User } from '../types/CommonTypes';
import { apiRequest } from './apiRequest';

// API function to authenticate user
export const authenticateUserApi = async (data: string): Promise<User> => {
    return await apiRequest<User>({
        method: 'POST',
        url: 'users/admin/send-phone-otp',
        data: data,
    });
};

// API function to verify OTP
export const verifyOTPApi = async (data: any): Promise<User> => {
    return await apiRequest<User>({
        method: 'POST',
        url: 'users/admin/verify-phone-otp',
        data: data,
    });
};