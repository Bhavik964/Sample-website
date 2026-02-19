import { method } from 'lodash';
import { apiRequest } from './apiRequest';
import { Role } from '../types/DashboardTypes';

export const getUserApi = async (
    page: number = 1,
    pageSize: number = 10,
    search: string = '',
    emailVerificationStatus: string = '',
    phoneVerificationStatus: string = '',
    platform: string = '',
    userCategory: string = ''
): Promise<any> => {
    // Convert statuses to appropriate values
    const emailVerified = emailVerificationStatus === 'verified' ? 1 : emailVerificationStatus === 'not_verified' ? 0 : '';
    const phoneVerified = phoneVerificationStatus === 'verified' ? 1 : phoneVerificationStatus === 'not_verified' ? 0 : '';

    // Dynamically construct query parameters
    const params: Record<string, any> = {
        // page,
        // pageSize,
        search,
        // emailVerified,
        // phoneNumberVerified: phoneVerified,
    };

    // if (platform !== 'All') {
    //     params.platformType = platform;
    // }

    // if (userCategory !== 'all') {
    //     params.sourceId = userCategory;
    // }

    // Use the dynamic request function
    return await apiRequest({
        method: 'GET',
        url: 'users/admin/list?page=1',
        params,
    });
};

// Get source List
export const getSourceListApi = async (): Promise<any> => {
    return await apiRequest({
        method: 'GET',
        url: 'sources/list',
        params: {
            page: 1,
        },
    });
};

// Get Lead History Data
export const getLeadHistoryApi = async (leadPayload: any): Promise<any> => {
    return await apiRequest({
        method: 'POST',
        url: 'common-leads/global-search',
        data: leadPayload
    });
};

// This function creates a new user
export const createUserApi = async (userData: any): Promise<any> => {
    return await apiRequest({
        method: 'POST',
        url: 'admin/users/create',
        data: userData,
    });
};

// This function update user details
export const updateUserDataApi = async (userData: any): Promise<any> => {
    return await apiRequest({
        method: 'POST',
        url: 'admin/users/update',
        data: userData,
    });
};

// Create Role
export const createRoleApi = async (roleData: { slug: string; title: string }): Promise<any> => {
    return await apiRequest({
        method: 'POST',
        url: 'roles/create',
        data: roleData,
    });
};

// Get role list
export const getRoleListApi = async (data: any): Promise<any> => {
    return await apiRequest({
        method: 'GET',
        url: 'roles/list',
        params: data,
    });
}

// Update User role
export const updateRoleApi = async (roleData: { roleId: string; title: string; slug: string }): Promise<any> => {
    return await apiRequest({
        method: 'POST',
        url: 'roles/update',
        data: roleData,
    });
};

// Get user list
export const getUserListApi = async (page: any, data: any): Promise<any> => {
    return await apiRequest({
        method: 'GET',
        url: `directory/new-list?page=${page}&search=${data}`
        // url: `directory/list?page=${page}&search=${data}`,
    });
}

// Get feedback modules list
export const getFeedbackModulesApi = async (page: any): Promise<any> => {
    return await apiRequest({
        method: 'GET',
        url: `feedback-module/list?page=${page}`,
    });
}

//Role Assign to user
export const assignRoleApi = async (data: { roleId: string; userId: string; slug: string }): Promise<any> => {
    return await apiRequest({
        method: 'POST',
        url: 'roles/assign-role-to-users',
        data: data,
    });
};