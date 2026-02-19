import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Get Dashboard Data
    data: null,
    error: null,
    status: 'idle',

    // Get Source Data
    sourceData: null,
    sourceError: null,
    sourceStatus: 'idle',

    // Find Lead History Data
    findLeadData: null,
    findLeadError: null,
    findLeadStatus: 'idle',

    // Create User Data
    createUserData: null,
    createUserError: null,
    createUserStatus: 'idle',

    // Update User Data
    updateUserData: null,
    updateUserError: null,
    updateUserStatus: 'idle',

    // Global Search Value
    globalSearchValue: '',

    // Create Role Data
    createRoleData: null,
    createRoleError: null,
    createRoleStatus: 'idle',

    // Role List Data
    roleListData: null,
    roleListError: null,
    roleListStatus: 'idle',

    // User List Data
    userListData: null,
    userListError: null,
    userListStatus: 'idle',

    // Feedback Modules List Data
    feedbackModulesData: null,
    feedbackModulesError: null,
    feedbackModulesStatus: 'idle',

    // Update Role Data
    updateRoleData: null,
    updateRoleError: null,
    updateRoleStatus: 'idle',

    // Update Role Data
    assignRoleData: null,
    assignRoleError: null,
    assignRoleStatus: 'idle',
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // Get Dashboard Data Actions
        fetchDashboardData(state, action) {
            state.status = 'pending';
            state.error = null;
        },
        fetchDashboardDataSuccess(state, action) {
            state.data = action.payload;
            state.error = null;
            state.status = 'complete';
        },
        fetchDashboardDataFailure(state, action) {
            state.data = null;
            state.error = action.payload;
            state.status = 'failed';
        },

        // Get Source Data Actions
        fetchSourceList(state) {
            state.sourceStatus = 'pending';
            state.error = null;
        },
        fetchSourceListSuccess(state, action) {
            state.sourceData = action.payload;
            state.sourceError = null;
            state.sourceStatus = 'complete';
        },
        fetchSourceListFailure(state, action) {
            state.sourceData = null;
            state.sourceError = action.payload;
            state.sourceStatus = 'failed';
        },

        // Find Lead History Data
        findLeadHistoryDataRequest(state, payload) {
            state.findLeadStatus = 'pending';
            state.error = null;
        },
        findLeadHistoryDataSuccess(state, action) {
            state.findLeadData = action.payload;
            state.findLeadError = null;
            state.findLeadStatus = 'complete';
        },
        findLeadHistoryDataFailure(state, action) {
            state.findLeadData = null;
            state.findLeadError = action.payload;
            state.findLeadStatus = 'failed';
        },
        resetFindLeadHistoryData(state, action) {
            state.findLeadData = null;
            state.findLeadError = null;
            state.findLeadStatus = 'idle';
        },

        // Create User Actions
        createUserRequest(state, action) {
            state.createUserStatus = 'pending';
            state.createUserError = null;
        },
        createUserSuccess(state, action) {
            state.createUserData = action.payload;
            state.createUserError = null;
            state.createUserStatus = 'complete';
        },
        createUserFailure(state, action) {
            state.createUserData = null;
            state.createUserError = action.payload;
            state.createUserStatus = 'failed';
        },
        resetCreateUserData(state) {
            state.createUserData = null;
            state.createUserError = null;
            state.createUserStatus = 'idle';
        },

        // Set Global Search
        setGlobalSearch(state, action) {
            state.globalSearchValue = action.payload;
        },

        // Update User Actions
        updateUserRequest(state, action) {
            state.updateUserStatus = 'pending';
            state.updateUserError = null;
        },
        updateUserSuccess(state, action) {
            state.updateUserData = action.payload;
            state.updateUserError = null;
            state.updateUserStatus = 'complete';
        },
        updateUserFailure(state, action) {
            state.updateUserData = null;
            state.updateUserError = action.payload;
            state.updateUserStatus = 'failed';
        },
        resetUpdateUser(state) {
            state.updateUserData = null;
            state.updateUserError = null;
            state.updateUserStatus = 'idle';
        },

        // Create Role Actions
        createRoleRequest(state, action) {
            state.createRoleStatus = 'pending';
            state.createRoleError = null;
        },
        createRoleSuccess(state, action) {
            state.createRoleData = action.payload;
            state.createRoleError = null;
            state.createRoleStatus = 'complete';
        },
        createRoleFailure(state, action) {
            state.createRoleData = null;
            state.createRoleError = action.payload;
            state.createRoleStatus = 'failed';
        },
        resetCreateRoleData(state) {
            state.createRoleData = null;
            state.createRoleError = null;
            state.createRoleStatus = 'idle';
        },

        // Role List Actions
        fetchRoleList(state, payload) {
            state.roleListStatus = 'pending';
            state.roleListError = null;
        },
        fetchRoleListSuccess(state, action) {
            state.roleListData = action.payload;
            state.roleListError = null;
            state.roleListStatus = 'complete';
        },
        fetchRoleListFailure(state, action) {
            state.roleListData = null;
            state.roleListError = action.payload;
            state.roleListStatus = 'failed';
        },

        // Update Role Actions
        updateRoleRequest(state, action) {
            state.updateRoleStatus = 'pending';
            state.updateRoleError = null;
        },
        updateRoleSuccess(state, action) {
            state.updateRoleData = action.payload;
            state.updateRoleError = null;
            state.updateRoleStatus = 'complete';
        },
        updateRoleFailure(state, action) {
            state.updateRoleData = null;
            state.updateRoleError = action.payload;
            state.updateRoleStatus = 'failed';
        },
        resetUpdateRoleData(state) {
            state.updateRoleData = null;
            state.updateRoleError = null;
            state.updateRoleStatus = 'idle';
        },
        // User List Actions
        fetchUserList(state, payload) {
            state.userListStatus = 'pending';
            state.userListError = null;
        },
        fetchUserListSuccess(state, action) {
            state.userListData = action.payload;
            state.userListError = null;
            state.userListStatus = 'complete';
        },
        fetchUserListFailure(state, action) {
            state.userListData = null;
            state.userListError = action.payload;
            state.userListStatus = 'failed';
        },
        resetFetchUserList(state) {
            state.userListData = null;
            state.userListStatus = 'idle';
        },

        // Feedback Modules List Actions
        fetchFeedbackModules(state, payload) {
            state.feedbackModulesStatus = 'pending';
            state.feedbackModulesError = null;
        },
        fetchFeedbackModulesSuccess(state, action) {
            state.feedbackModulesData = action.payload;
            state.feedbackModulesError = null;
            state.feedbackModulesStatus = 'complete';
        },
        fetchFeedbackModulesFailure(state, action) {
            state.feedbackModulesData = null;
            state.feedbackModulesError = action.payload;
            state.feedbackModulesStatus = 'failed';
        },

        // Assign role to user Actions
        assignRoleRequest(state, action) {
            state.assignRoleStatus = 'pending';
            state.assignRoleError = null;
        },
        assignRoleSuccess(state, action) {
            state.assignRoleData = action.payload;
            state.assignRoleError = null;
            state.assignRoleStatus = 'complete';
        },
        assignRoleFailure(state, action) {
            state.assignRoleData = null;
            state.assignRoleError = action.payload;
            state.assignRoleStatus = 'failed';
        },
        resetAssignRoleData(state) {
            state.assignRoleData = null;
            state.assignRoleError = null;
            state.assignRoleStatus = 'idle';
        },
    },
});

export const {
    fetchDashboardData, fetchDashboardDataSuccess, fetchDashboardDataFailure,
    fetchSourceList, fetchSourceListSuccess, fetchSourceListFailure,
    findLeadHistoryDataRequest, findLeadHistoryDataSuccess, findLeadHistoryDataFailure, resetFindLeadHistoryData,
    createUserRequest, createUserSuccess, createUserFailure, resetCreateUserData,
    setGlobalSearch, updateUserRequest, updateUserSuccess, updateUserFailure, resetUpdateUser,
    createRoleRequest, createRoleSuccess, createRoleFailure, resetCreateRoleData,
    fetchRoleList, fetchRoleListSuccess, fetchRoleListFailure,
    updateRoleRequest, updateRoleSuccess, updateRoleFailure, resetUpdateRoleData,
    fetchUserList, fetchUserListFailure, fetchUserListSuccess, resetFetchUserList,
    assignRoleFailure, assignRoleRequest, assignRoleSuccess, resetAssignRoleData, fetchFeedbackModules, fetchFeedbackModulesFailure, fetchFeedbackModulesSuccess
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
