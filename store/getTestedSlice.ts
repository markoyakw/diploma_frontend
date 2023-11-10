import { ITest, IQuestion, QuestionTypes, ITestResult } from './../ts/test';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IGetTestedResponse, IPostTestResultResponse } from '@/ts/response/GetTestedResponse';
import GetTestedService from '@/services/GetTestedService';
import { IGetTestedRequest, IPostTestResultRequest } from '@/ts/request/GetTestedRequest';
import TestsEditorService from '@/services/TestsEditorService';
import { IConnectOptionsAnswer, IConnectOptionsQuestion, IEssayQuestion, IFillTheGapsQuestion, ITextInputQuestion, ITrueOrFalseQuestion, IsingleMultipleChoiceAnswer, IsingleMultipleChoiceQuestion } from '@/ts/test';

const initialState: ITest & {
    testResult?: ITestResult | null,
    highlightedWrongPartsArr?: string[] | undefined
} = TestsEditorService.InitialTest

export const fetchGetTestedTest = createAsyncThunk<IGetTestedResponse, IGetTestedRequest>(
    'test/fetchInitialState',
    async ({ id }, thunkAPI) => {
        try {
            const response = await GetTestedService.GetTested(id);
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const postTestResultAction = createAsyncThunk<IPostTestResultResponse, IPostTestResultRequest>(
    'test/postTestResultAction',
    async (testResult, thunkAPI) => {
        try {
            const response = await GetTestedService.PostTestResult(testResult);
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

const getTestedSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        onTextInputAnswerChange(state, action: PayloadAction<{ answer: string, questionId: number }>) {
            const question = state.questions[action.payload.questionId] as ITextInputQuestion
            question.answer = action.payload.answer
        },
        onSingleMultipleChoiceAnswerCheckboxToggle(state, action: PayloadAction<{ questionId: number, answerId: number }>) {
            const question = state.questions[action.payload.questionId] as IsingleMultipleChoiceQuestion
            const answer = question.answers[action.payload.answerId]
            answer.isRight = !answer.isRight
        },
        onTrueOrFalseAnswerToggle(state, action: PayloadAction<{ questionId: number }>) {
            const question = state.questions[action.payload.questionId] as ITrueOrFalseQuestion
            question.answer = !question.answer
        },
        onFillTheGapsAnswerChange(state, action: PayloadAction<{ questionId: number, answerId: number, answerText: string }>) {
            const fillTheGapsQuestion = state.questions[action.payload.questionId] as IFillTheGapsQuestion
            const fillTheGapsAnswer = fillTheGapsQuestion.answers[action.payload.answerId]
            fillTheGapsAnswer.answerText = action.payload.answerText
        },
        onEssayAnswerChange(state, action: PayloadAction<{ questionId: number, answerText: string }>) {
            const question = state.questions[action.payload.questionId] as IEssayQuestion
            question.answer = action.payload.answerText
        },
        onConnectOptionsInitialize(state, action: PayloadAction<{ questionId: number }>) {
            const question = state.questions[action.payload.questionId] as IConnectOptionsQuestion
            question.avaliableForChoosingAnswers = question.answers.map(answerPair => {
                return answerPair[1]
            })
        },
        onAnswerPairChoice(state, action: PayloadAction<{ questionId: number, targetAnswerPairId: number, newAnswerPairId: number }>) {
            const question = state.questions[action.payload.questionId] as IConnectOptionsQuestion
            let avaliableForChoosingAnswers = question.avaliableForChoosingAnswers
            let newAnswerPair = question.avaliableForChoosingAnswers[action.payload.newAnswerPairId]
            let targetAnswerPair = question.chosenAnswers[action.payload.targetAnswerPairId]
            if (!question.chosenAnswers[action.payload.targetAnswerPairId] || !("answerText" in question.chosenAnswers[action.payload.targetAnswerPairId])) {
                question.chosenAnswers[action.payload.targetAnswerPairId] = newAnswerPair
                avaliableForChoosingAnswers.splice(action.payload.newAnswerPairId, 1)
            }
            else {
                question.chosenAnswers[action.payload.targetAnswerPairId] = newAnswerPair
                question.avaliableForChoosingAnswers[action.payload.newAnswerPairId] = targetAnswerPair
            }
        },
        deleteConnectOptionsChoice(state, action: PayloadAction<{ questionId: number, targetAnswerPairId: number }>) {
            const question = state.questions[action.payload.questionId] as IConnectOptionsQuestion
            question.avaliableForChoosingAnswers.push(question.chosenAnswers[action.payload.targetAnswerPairId])
            delete question.chosenAnswers[action.payload.targetAnswerPairId]
            question.chosenAnswers = Object.values(question.chosenAnswers).filter((element: IConnectOptionsAnswer | undefined) => element !== undefined);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetTestedTest.fulfilled, (state, action: PayloadAction<IGetTestedResponse>) => {

            const deleteRightAnswerValue = (question: IQuestion) => {
                switch (question.type) {
                    case QuestionTypes.fillTheGaps: {
                        question.answers.forEach(answer => {
                            if (answer.type === "fill") {
                                answer.answerText = ""
                            }
                        })
                        return
                    }
                    case QuestionTypes.singleMultipleChoice: {
                        question.answers = question.answers as IsingleMultipleChoiceAnswer[]
                        question.answers.forEach(answer => {
                            answer.isRight = false
                        })
                        return
                    }
                    case QuestionTypes.trueOrFalse: {
                        question = question as ITrueOrFalseQuestion
                        question.answer = false
                        return
                    }
                    case QuestionTypes.connectOptions: {
                        question = question as IConnectOptionsQuestion
                        question.chosenAnswers = {}
                        return
                    }
                    default: {
                        return
                    }
                }
            }

            const fetchedTest = action.payload.test
            state._id = fetchedTest._id
            state.activateAt = fetchedTest.activateAt
            state.deactivateAt = fetchedTest.deactivateAt
            state.isActive = fetchedTest.isActive
            state.setToActivate = fetchedTest.setToActivate
            state.name = fetchedTest.name
            state.description = fetchedTest.description
            state.theoreticalPart = fetchedTest.theoreticalPart
            state.questions = fetchedTest.questions
            state.questions.forEach(question => deleteRightAnswerValue(question))

            state.interfaceData.loading = false
            state.interfaceData.error = null
            state.interfaceData.message = action.payload.message
        })
            .addCase(fetchGetTestedTest.rejected, (state, action) => {
                state.interfaceData.loading = false
                state.interfaceData.message = null
                state.interfaceData.error = action.payload as string
            })
            .addCase(fetchGetTestedTest.pending, (state, action) => {
                state.interfaceData.loading = true
                state.interfaceData.message = null
                state.interfaceData.error = null
            })
        builder.addCase(postTestResultAction.fulfilled, (state, action: PayloadAction<IPostTestResultResponse>) => {
            state.interfaceData.loading = false
            state.interfaceData.message = action.payload.message
            state.interfaceData.error = null
            state.testResult = action.payload.gradedTestResult
            state.highlightedWrongPartsArr = action.payload.highlightedWrongPartsArr?.highlightedWrongPartsArr
        })
            .addCase(postTestResultAction.rejected, (state, action) => {
                state.interfaceData.loading = false
                state.interfaceData.message = null
                state.interfaceData.error = action.payload as string
            })
            .addCase(postTestResultAction.pending, (state, action) => {
                state.interfaceData.loading = true
                state.interfaceData.message = null
                state.interfaceData.error = null
            })
    }
})

export default getTestedSlice.reducer

export const { onTextInputAnswerChange, onSingleMultipleChoiceAnswerCheckboxToggle,
    onTrueOrFalseAnswerToggle, onFillTheGapsAnswerChange, onEssayAnswerChange,
    onAnswerPairChoice, onConnectOptionsInitialize,
    deleteConnectOptionsChoice
} = getTestedSlice.actions
