import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Terrritory Data
    territoryData: null,
    territoryError: null,
    territoryStatus: 'idle',
};

const territorySlice = createSlice({
    name: 'territory',
    initialState,
    reducers: {
        // Get Territory Data
        getTerritoryDataRequest(state, action) {
            state.territoryStatus = 'pending';
        },
        getTerritoryDataSuccess(state, action) {
            state.territoryData = action.payload;
            state.territoryError = null;
            state.territoryStatus = 'complete';
        },
        getTerritoryDataFailure(state, action) {
            state.territoryData = null;
            state.territoryError = action.payload;
            state.territoryStatus = 'failed';
        },
        resetTerritoryData(state) {
            state.territoryStatus = 'idle';
        },
    },
});

export const {
    getTerritoryDataRequest, getTerritoryDataSuccess, getTerritoryDataFailure, resetTerritoryData
} = territorySlice.actions;

export default territorySlice.reducer;
