import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    fetchDashboardData, fetchDashboardDataSuccess, fetchDashboardDataFailure,
    fetchSourceListFailure, fetchSourceListSuccess, fetchSourceList,
    findLeadHistoryDataRequest, findLeadHistoryDataSuccess, findLeadHistoryDataFailure,
    createUserRequest, createUserSuccess, createUserFailure,
    updateUserRequest, updateUserSuccess, updateUserFailure,
    createRoleRequest, createRoleSuccess, createRoleFailure,
    fetchRoleList, fetchRoleListSuccess, fetchRoleListFailure,
    updateRoleRequest, updateRoleSuccess, updateRoleFailure,
    fetchUserListSuccess,
    fetchUserListFailure,
    fetchUserList,
    assignRoleSuccess,
    assignRoleFailure,
    assignRoleRequest,
    fetchFeedbackModulesSuccess,
    fetchFeedbackModulesFailure,
    fetchFeedbackModules
} from '../slices/dashboardSlice';
import { getLeadHistoryApi, getSourceListApi, getUserApi, createUserApi, createRoleApi, updateUserDataApi, getRoleListApi, updateRoleApi, getUserListApi, assignRoleApi, getFeedbackModulesApi } from '../../apis/dashboard';
import { SourceResponse, UserListPayload, UserResponse } from '../../types/DashboardTypes';

// Saga to handle dashboard Details
function* handleDashboard(action: PayloadAction<UserListPayload>) {
    const { page, pageSize, search, emailVerificationStatus, phoneVerificationStatus, platform, userCategory } = action.payload;
    try {
        // Call the getUserApi function
        const response: UserResponse = yield call(getUserApi, page, pageSize, search, emailVerificationStatus, phoneVerificationStatus, platform, userCategory);
        // Dispatch the fetchDashboardDataSuccess action
        yield put(fetchDashboardDataSuccess(response));
    } catch (error: any) {
        // If there is an error, dispatch the fetchDashboardDataFailure action with the error message
        yield put(fetchDashboardDataFailure(error.message || 'An error occurred'));
    }
}

// Saga to handle source list
function* handleSourceList(action: PayloadAction<any>) {
    try {
        // Call the getSourceListApi API function
        const response: SourceResponse = yield call(getSourceListApi);
        // Dispatch the fetchSourceListSuccess action
        yield put(fetchSourceListSuccess(response));
    } catch (error: any) {
        // If there is an error, dispatch the fetchSourceListFailure action with the error message
        yield put(fetchSourceListFailure(error.message || 'An error occurred'));
    }
}

function* findLeadHistoryData(action: PayloadAction<any>) {
    try {
        // Call the getSourceListApi API function
        const response: SourceResponse = yield call(getLeadHistoryApi, action.payload);
        // Dispatch the findLeadHistoryDataSuccess action
        yield put(findLeadHistoryDataSuccess(response));
    } catch (error: any) {
        // If there is an error, dispatch the findLeadHistoryDataFailure action with the error message
        yield put(findLeadHistoryDataFailure(error.message || 'An error occurred'));
    }
}

// Saga to handle user creation
function* handleCreateUser(action: PayloadAction<any>): Generator<any, void, any> {
    try {
        const response = yield call(createUserApi, action.payload);
        if (response?.result) {
            yield put(createUserSuccess(response));
        } else {
            yield put(createUserFailure(response?.message || 'Failed to create user'));
        }
    } catch (error: any) {
        yield put(createUserFailure(error?.message || 'An unexpected error occurred'));
    }
}

// saga to handle update user data
function* handleUpdateUser(action: PayloadAction<any>): Generator<any, void, any> {
    try {
        const response = yield call(updateUserDataApi, action.payload);
        if (response?.result) {
            yield put(updateUserSuccess(response));
        } else {
            yield put(updateUserFailure(response?.message || 'Failed to update user'));
        }

    } catch (error: any) {
        yield put(updateUserFailure(error?.message || 'An unexpected error occurred'));

    }
}

// Saga to handle role creation
function* handleCreateRole(action: PayloadAction<{ slug: string; title: string }>): Generator<any, void, any> {
    try {
        const response = yield call(createRoleApi, action.payload);
        if (response?.result) {
            yield put(createRoleSuccess(response));
        } else {
            yield put(createRoleFailure(response?.message || 'Failed to create role'));
        }
    } catch (error: any) {
        yield put(createRoleFailure(error?.message || 'An unexpected error occurred'));
    }
}

// Saga to handle role list
function* handleRoleList(action: PayloadAction<any>): Generator<any, void, any> {
    try {
        const response = yield call(getRoleListApi, action.payload);
        if (response?.result) {
            yield put(fetchRoleListSuccess(response));
        } else {
            yield put(fetchRoleListFailure(response?.message || 'Failed to fetch roles'));
        }
    } catch (error: any) {
        yield put(fetchRoleListFailure(error?.message || 'An unexpected error occurred'));
    }
}

// Saga to handle role update
function* handleUpdateRole(action: PayloadAction<any>): Generator<any, void, any> {
    try {
        const response = yield call(updateRoleApi, action.payload);
        if (response?.result) {
            yield put(updateRoleSuccess(response));
            // Refresh the role list after successful update
            // yield put(fetchRoleList());
        } else {
            yield put(updateRoleFailure(response?.message || 'Failed to update role'));
        }
    } catch (error: any) {
        yield put(updateRoleFailure(error?.message || 'An unexpected error occurred'));
    }
}

// Saga to handle user list
function* handleUserList(action: PayloadAction<any>): Generator<any, void, any> {
    try {
        const { page, data } = action.payload
        const response = yield call(getUserListApi, page, data);
        if (response?.result) {
            yield put(fetchUserListSuccess(response));
        } else {
            yield put(fetchUserListFailure(response?.message || 'Failed to fetch roles'));
        }
    } catch (error: any) {
        yield put(fetchUserListFailure(error?.message || 'An unexpected error occurred'));
    }
}

// Saga to handle feedback modules list
function* handleFeedbackModuleList(action: PayloadAction<any>): Generator<any, void, any> {
    try {
        const { page } = action.payload
        const response = yield call(getFeedbackModulesApi, page);
        if (response?.result) {
            yield put(fetchFeedbackModulesSuccess(response));
        } else {
            yield put(fetchFeedbackModulesFailure(response?.message || 'Failed to fetch feedback modules'));
        }
    } catch (error: any) {
        yield put(fetchFeedbackModulesFailure(error?.message || 'An unexpected error occurred'));
    }
}

// saga to handle assign role to user
function* handleAssignRoleUser(action: PayloadAction<any>): Generator<any, void, any> {
    try {
        const response = yield call(assignRoleApi, action.payload);
        if (response?.result) {
            yield put(assignRoleSuccess(response));
        } else {
            yield put(assignRoleFailure(response?.message || 'Failed to update user'));
        }

    } catch (error: any) {
        yield put(assignRoleFailure(error?.message || 'An unexpected error occurred'));

    }
}

// Watcher saga
function* dashboardSaga() {
    // Listen for the handleDashboard action handleSourceList
    yield takeLatest(fetchDashboardData.type, handleDashboard);
    yield takeLatest(fetchSourceList.type, handleSourceList);
    yield takeLatest(findLeadHistoryDataRequest.type, findLeadHistoryData);
    yield takeLatest(createUserRequest.type, handleCreateUser);
    yield takeLatest(updateUserRequest.type, handleUpdateUser);
    yield takeLatest(createRoleRequest.type, handleCreateRole);
    yield takeLatest(fetchRoleList.type, handleRoleList);
    yield takeLatest(updateRoleRequest.type, handleUpdateRole);
    yield takeLatest(fetchUserList.type, handleUserList);
    yield takeLatest(fetchFeedbackModules.type, handleFeedbackModuleList);
    yield takeLatest(assignRoleRequest.type, handleAssignRoleUser);
}

export default dashboardSaga;