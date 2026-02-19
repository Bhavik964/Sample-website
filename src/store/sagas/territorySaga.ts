import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getTerritoryDataRequest, getTerritoryDataSuccess, getTerritoryDataFailure } from '../slices/territorySlice';
import { User } from '../../types/CommonTypes';
import { getTerritoryDataApi } from '../../apis/territory';

// Saga to get territory data
function* getTerritoryData(action: PayloadAction<any>) {
    try {
        // Call the getTerritoryDataApi
        const user: User = yield call(getTerritoryDataApi);
        // Dispatch the getTerritoryDataSuccess action with the user data
        yield put(getTerritoryDataSuccess(user));
    } catch (error: any) {
        // If there is an error, dispatch the getTerritoryDataFailure action with the error message
        yield put(getTerritoryDataFailure(error.message || 'An error occurred'));
    }
}

function* territorySaga() {
    // Listen for the loginUser action and call the getTerritoryData saga when dispatched
    yield takeLatest(getTerritoryDataRequest.type, getTerritoryData);
}

export default territorySaga;
