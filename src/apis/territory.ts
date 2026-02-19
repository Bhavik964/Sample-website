import { User } from '../types/CommonTypes';
import { apiRequest } from './apiRequest';

// API function to get territory data
export const getTerritoryDataApi = async (): Promise<User> => {
    return await apiRequest<User>({
        method: 'GET',
        url: 'territory/list?page=1',
    });
};