import AuthService from "@/services/AuthService";
import GetTestedService from "@/services/GetTestedService";
import TestsEditorService from "@/services/TestsEditorService";
import UserService from "@/services/UserService";
import { ILoginRequst, IRegistrationRequest } from "@/ts/request/AuthRequest";
import { IGetTestResultsByIdRequest, IPostTestResultRequest } from "@/ts/request/GetTestedRequest";
import { IActivateTestRequest, IDeactivateTestRequest, IEditTestRequest, IPostTestRequest } from "@/ts/request/TestRequest";
import { ICheckResponse, ILoginResponse, IRegistrationResponse } from '@/ts/response/AuthResponse';
import { IGetTestResultsByIdResponse, IPostTestResultResponse } from "@/ts/response/GetTestedResponse";
import { IActivateTestResponse, IDeactivateTestResponse, IDeleteTestResponse, IEditTestResponse, IPostTestResponse } from "@/ts/response/TestsResponse";
import { ITest, ITestResult } from "@/ts/test";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type InitialState = {
    _id: string | null,
    username: string | null,
    login: string | null,
    tests: Array<ITest>,
    interfaceData: {
        loading: boolean,
        message: null | string,
        error: null | string,
        isLoggedIn: boolean,
    },
    testResultsById: {
        ref: number,
        name: string,
        description: string,
        createdAt: number,
        testResults: ITestResult[]
    }[]
}

const initialState: InitialState = {
    _id: null,
    username: null,
    login: null,
    tests: [],
    interfaceData: {
        loading: false,
        message: null,
        error: null,
        isLoggedIn: false,
    },
    testResultsById: []
}

export const deleteTestAction = createAsyncThunk<IDeleteTestResponse, { testIdToDelete: number }>(
    'test/deleteTestAction',
    async ({ testIdToDelete: id }, thunkAPI) => {
        try {
            const response = await UserService.DeleteTest(id);
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const loginAction = createAsyncThunk<ILoginResponse, ILoginRequst>(
    'user/login',
    async ({ login, password }, thunkAPI) => {
        try {
            const response = await AuthService.login(login, password);
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const registrationAction = createAsyncThunk<IRegistrationResponse, IRegistrationRequest>(
    'user/registration',
    async ({ username, login, password }, thunkAPI) => {
        try {
            const response = await AuthService.registration(login, username, password);
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const checkAuthnAction = createAsyncThunk<ICheckResponse>(
    'user/check',
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.check();
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const postTestAction = createAsyncThunk<IPostTestResponse, IPostTestRequest>(
    'test/postTestAction',
    async ({ test }, thunkAPI) => {
        try {
            const response = await UserService.PostTest(test);
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const editTestAction = createAsyncThunk<IEditTestResponse, IEditTestRequest>(
    'test/editTestAction',
    async ({ test }, thunkAPI) => {
        try {
            const response = await UserService.EditTest({ test });
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const activateTestAction = createAsyncThunk<IActivateTestResponse, IActivateTestRequest>(
    'test/activateTestAction',
    async ({ activatingTestId, startTime, endTime }, thunkAPI) => {
        try {
            const response = await TestsEditorService.ActivateTest({ activatingTestId, startTime, endTime });
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const deactivateTestAction = createAsyncThunk<IDeactivateTestResponse, IDeactivateTestRequest>(
    'test/deactivateTestAction',
    async ({ deactivatingTestId }, thunkAPI) => {
        try {
            const response = await TestsEditorService.DeactivateTest({ deactivatingTestId });
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const getTestResultsByTestId = createAsyncThunk<IGetTestResultsByIdResponse, IGetTestResultsByIdRequest>(
    'test/getTestResultsByTestId',
    async ({ id }, thunkAPI) => {
        try {
            const response = await GetTestedService.GetTestResultsByTestId(String(id));
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError(state) {
            state.interfaceData.error = null
        },
        clearMessage(state) {
            state.interfaceData.message = null
        },
        logOutAction(state) {
            localStorage.removeItem('token')
            state.interfaceData.isLoggedIn = false
        }
    },
    extraReducers: (builder) => {

        builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<{ token: string, message: string }>) => {
            state.interfaceData.loading = false
            localStorage.setItem('token', action.payload.token)
            state.interfaceData.message = action.payload.message
            state.interfaceData.error = null
            state.interfaceData.isLoggedIn = true
        })
            .addCase(loginAction.rejected, (state, action) => {
                state.interfaceData.loading = false
                state.interfaceData.message = null
                state.interfaceData.error = action.payload as string
            })
            .addCase(loginAction.pending, (state, action) => {
                state.interfaceData.loading = true
                state.interfaceData.message = null
                state.interfaceData.error = null
            }),
            builder.addCase(registrationAction.fulfilled, (state, action) => {
                state.interfaceData.loading = false
                state.interfaceData.message = action.payload.message
                state.interfaceData.error = null
            })
                .addCase(registrationAction.rejected, (state, action) => {
                    state.interfaceData.loading = false
                    state.interfaceData.message = null
                    state.interfaceData.error = action.payload as string
                })
                .addCase(registrationAction.pending, (state, action) => {
                    state.interfaceData.loading = true
                    state.interfaceData.message = null
                    state.interfaceData.error = null
                }),
            builder.addCase(checkAuthnAction.fulfilled, (state, action) => {
                state.interfaceData.loading = false
                state.login = action.payload.login
                state.username = action.payload.username
                state._id = action.payload._id
                state.tests = action.payload.tests
                state.testResultsById = action.payload.testResultsById
                state.interfaceData.error = null
                state.interfaceData.isLoggedIn = true
            })
                .addCase(checkAuthnAction.rejected, (state, action) => {
                    state.interfaceData.loading = false
                    state.interfaceData.message = null
                    state.interfaceData.isLoggedIn = false
                    state.interfaceData.error = action.payload as string
                    localStorage.removeItem('token')
                })
                .addCase(checkAuthnAction.pending, (state, action) => {
                    state.interfaceData.error = null
                    state.interfaceData.message = null
                    state.interfaceData.loading = true
                }),
            builder.addCase(postTestAction.fulfilled, (state, action: PayloadAction<IPostTestResponse>) => {
                state.interfaceData.loading = false
                state.interfaceData.message = action.payload.message
                state.interfaceData.error = null
                state.tests.push(action.payload.newTest)
            })
                .addCase(postTestAction.rejected, (state, action) => {
                    state.interfaceData.loading = false
                    state.interfaceData.message = null
                    state.interfaceData.error = action.payload as string
                })
                .addCase(postTestAction.pending, (state, action) => {
                    state.interfaceData.loading = true
                    state.interfaceData.message = null
                    state.interfaceData.error = null
                }),
            builder.addCase(deleteTestAction.fulfilled, (state, action: PayloadAction<IDeleteTestResponse>) => {
                state.interfaceData.loading = false
                state.interfaceData.error = null
                state.interfaceData.message = action.payload.message
                state.tests = state.tests.filter((test) => {
                    if (test._id === action.payload.deletedTestId) return false
                    else return true
                })
            })
                .addCase(deleteTestAction.rejected, (state, action) => {
                    state.interfaceData.loading = false
                    state.interfaceData.message = null
                    state.interfaceData.error = action.payload as string
                })
                .addCase(deleteTestAction.pending, (state, action) => {
                    state.interfaceData.loading = true
                    state.interfaceData.message = null
                    state.interfaceData.error = null
                })
        builder.addCase(activateTestAction.fulfilled, (state, action: PayloadAction<IActivateTestResponse>) => {
            state.interfaceData.loading = false
            state.interfaceData.error = null
            state.interfaceData.message = action.payload.message
            state.tests = state.tests.map((test) => {
                if (test._id === action.payload.activatedTest._id) return action.payload.activatedTest
                else return test
            })
        })
            .addCase(activateTestAction.rejected, (state, action) => {
                state.interfaceData.loading = false
                state.interfaceData.message = null
                state.interfaceData.error = action.payload as string
            })
            .addCase(activateTestAction.pending, (state, action) => {
                state.interfaceData.loading = true
                state.interfaceData.message = null
                state.interfaceData.error = null
            })
        builder.addCase(deactivateTestAction.fulfilled, (state, action: PayloadAction<IDeactivateTestResponse>) => {
            state.interfaceData.loading = false
            state.interfaceData.message = action.payload.message
            state.interfaceData.error = null
            state.tests = state.tests.map((test) => {
                if (test._id === action.payload.deactivatedTest._id) return action.payload.deactivatedTest
                else return test
            })
        })
            .addCase(deactivateTestAction.rejected, (state, action) => {
                state.interfaceData.loading = false
                state.interfaceData.message = null
                state.interfaceData.error = action.payload as string
            })
            .addCase(deactivateTestAction.pending, (state, action) => {
                state.interfaceData.loading = true
                state.interfaceData.message = null
                state.interfaceData.error = null
            })
        builder.addCase(editTestAction.fulfilled, (state, action: PayloadAction<IEditTestResponse>) => {
            state.interfaceData.loading = false
            state.interfaceData.message = action.payload.message
            state.interfaceData.error = null
            state.tests = state.tests.filter((test) => {
                if (test._id === action.payload.editedTest._id) return false
                else return true
            })
            state.tests = [action.payload.editedTest, ...state.tests]
        })
            .addCase(editTestAction.rejected, (state, action) => {
                state.interfaceData.loading = false
                state.interfaceData.message = null
                state.interfaceData.error = action.payload as string
            })
            .addCase(editTestAction.pending, (state, action) => {
                state.interfaceData.loading = true
                state.interfaceData.message = null
                state.interfaceData.error = null
            })
        builder.addCase(getTestResultsByTestId.fulfilled, (state, action: PayloadAction<IGetTestResultsByIdResponse>) => {
            state.interfaceData.loading = false
            state.interfaceData.error = null
            state.testResultsById = state.testResultsById.map(testResultById => {
                if (testResultById.ref === action.payload.testId) return { ...testResultById, testResults: action.payload.testResults }
                else return testResultById
            })
        })
            .addCase(getTestResultsByTestId.rejected, (state, action) => {
                state.interfaceData.loading = false
                state.interfaceData.message = null
                state.interfaceData.error = action.payload as string
            })
            .addCase(getTestResultsByTestId.pending, (state, action) => {
                state.interfaceData.loading = true
                state.interfaceData.message = null
                state.interfaceData.error = null
            })
    }
})

export default userSlice.reducer

export const { clearError, clearMessage, logOutAction } = userSlice.actions