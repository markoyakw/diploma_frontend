import { configureStore, combineReducers } from "@reduxjs/toolkit"
import testSlice from "./testSlice"
import userSlice from "./userSlice"
import getTestedSlice from "./getTestedSlice"

const rootReducer = combineReducers({
    test: testSlice,
    user: userSlice,
    getTested: getTestedSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch