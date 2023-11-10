import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FillTheGapsAnswerTypes, IConnectOptionsQuestion, IFillTheGapsQuestion, ITest, ITextInputQuestion, ITrueOrFalseQuestion, IsingleMultipleChoiceQuestion, QuestionTypes } from '@/ts/test';
import TestsEditorService from '@/services/TestsEditorService';
import { IGenerateQuestionsResponse } from "@/ts/response/TestsResponse";
import { IGenerateQuestionsRequest } from "@/ts/request/TestRequest";

const initialState: ITest = TestsEditorService.InitialTest

const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        resetTest(state) {
            state._id = initialState._id
            state.activateAt = initialState.activateAt
            state.deactivateAt = initialState.deactivateAt
            state.isActive = initialState.isActive
            state.setToActivate = initialState.setToActivate
            state.name = initialState.name
            state.description = initialState.description
            state.theoreticalPart = initialState.theoreticalPart
            state.questions = initialState.questions
            state._id = TestsEditorService.GetUniqueId()
            state.interfaceData.fieldsWereEdited = false
        },
        setTest(state, action: PayloadAction<ITest>) {
            const test = action.payload
            state._id = test._id
            state.activateAt = test.activateAt
            state.deactivateAt = test.deactivateAt
            state.isActive = test.isActive
            state.setToActivate = test.setToActivate
            state.name = test.name
            state.description = test.description
            state.theoreticalPart = test.theoreticalPart
            state.questions = test.questions
            state.interfaceData.fieldsWereEdited = false
        },
        handleNameChange(state, action: PayloadAction<string>) {
            state.name = action.payload
            state.interfaceData.fieldsWereEdited = true
        },
        handleDescriptionChange(state, action: PayloadAction<string>) {
            state.description = action.payload
            state.interfaceData.fieldsWereEdited = true
        },
        handleTheoreticalPartChange(state, action: PayloadAction<string>) {
            state.theoreticalPart = action.payload
            state.interfaceData.fieldsWereEdited = true
        },
        addQuestion(state, action: PayloadAction<{ type: QuestionTypes }>) {
            const newQuestion = TestsEditorService.GetNewQuestion(action.payload.type)
            state.questions.push(newQuestion)
        },
        deleteQuestion(state, action: PayloadAction<number>) {
            state.questions.splice(action.payload, 1)
        },
        handleQuestionTextChange(state, action: PayloadAction<{ changingQuestionId: number, question: string }>) {
            const question = state.questions[action.payload.changingQuestionId]
            if ("question" in question) {
                question.question = action.payload.question
            }
            state.interfaceData.fieldsWereEdited = true
        },
        handleSingleMultipleChoiceAnswerTextChange(state, action: PayloadAction<{ questionId: number, answerId: number, answerText: string }>) {
            const questionId = action.payload.questionId
            const answerId = action.payload.answerId
            const multipleChoiceQuestion = state.questions[questionId] as IsingleMultipleChoiceQuestion
            multipleChoiceQuestion.answers[answerId].answerText = action.payload.answerText
            state.interfaceData.fieldsWereEdited = true
        },
        deleteSingleMultipleQuestion(state, action: PayloadAction<{ questionId: number, answerId: number }>) {
            const singleMultipleQuestion = state.questions[action.payload.questionId] as IsingleMultipleChoiceQuestion
            singleMultipleQuestion.answers.splice(action.payload.answerId, 1)
        },
        handleCheckboxAnswerToggle(state, action: PayloadAction<{ questionId: number, answerId: number }>) {
            const questionId = action.payload.questionId
            const answerId = action.payload.answerId
            const multipleChoiceQueestion = state.questions[questionId] as IsingleMultipleChoiceQuestion
            const multipleChoiceAnswer = multipleChoiceQueestion.answers[answerId]
            multipleChoiceAnswer.isRight = !multipleChoiceAnswer.isRight
        },
        addCheckboxAnswer(state, action: PayloadAction<{ questionId: number }>) {
            const multipleChoiceQuestion = state.questions[action.payload.questionId] as IsingleMultipleChoiceQuestion
            multipleChoiceQuestion.answers.push(TestsEditorService.GetNewSingleMultipleChoiceAnswer())
        },
        handleTextInputAnswerTextChange(state, action: PayloadAction<{ questionId: number, answerId: number, answerText: string }>) {
            const questionId = action.payload.questionId
            const answerId = action.payload.answerId
            const textInputAnswer = state.questions[questionId] as ITextInputQuestion
            textInputAnswer.answers[answerId].answerText = action.payload.answerText
            state.interfaceData.fieldsWereEdited = true
        },
        addTextInputAnswer(state, action: PayloadAction<{ questionId: number }>) {
            const textInputQuestion = state.questions[action.payload.questionId] as ITextInputQuestion
            textInputQuestion.answers.push(TestsEditorService.GetNewTextInputAnswer())
        },
        deleteTextInputAnswer(state, action: PayloadAction<{ questionId: number, answerId: number }>) {
            const textInputQuestion = state.questions[action.payload.questionId] as ITextInputQuestion
            textInputQuestion.answers.splice(action.payload.answerId, 1)
        },
        handleTrueOrFalseAnswerChange(state, action: PayloadAction<{ questionId: number, isRight: boolean }>) {
            const trueOrFalseQuestion = state.questions[action.payload.questionId] as ITrueOrFalseQuestion
            trueOrFalseQuestion.answer = action.payload.isRight
            state.interfaceData.fieldsWereEdited = true
        },
        handleFillTheGapsAnswerChange(state, action: PayloadAction<{ questionId: number, answerId: number, answerText: string }>) {
            const fillTheGapsQuestion = state.questions[action.payload.questionId] as IFillTheGapsQuestion
            const fillTheGapsAnswer = fillTheGapsQuestion.answers[action.payload.answerId]
            fillTheGapsAnswer.answerText = action.payload.answerText
            state.interfaceData.fieldsWereEdited = true
        },
        addFillTheGapsAnswer(state, action: PayloadAction<{ questionId: number, type: FillTheGapsAnswerTypes }>) {
            const fillTheGapsQuestion = state.questions[action.payload.questionId] as IFillTheGapsQuestion
            const fillTheGapsAnswers = fillTheGapsQuestion.answers
            fillTheGapsAnswers.push(TestsEditorService.GetNewFillTheGapsAnswer(action.payload.type))
        },
        deleteFillTheGapsAnswer(state, action: PayloadAction<{ questionId: number, answerId: number }>) {
            const fillTheGapsQuestion = state.questions[action.payload.questionId] as IFillTheGapsQuestion
            fillTheGapsQuestion.answers.splice(action.payload.answerId, 1)
        },
        addConnectOptionsAnswer(state, action: PayloadAction<{ questionId: number }>) {
            const connectOptionsQuestion = state.questions[action.payload.questionId] as IConnectOptionsQuestion
            connectOptionsQuestion.answers.push(TestsEditorService.GetNewConnectOptionsAnswerPair())
        },
        handleConnectOptionsAnswerChange(state, action: PayloadAction<{ questionId: number, answerId: number, answerPairId: number, answerText: string }>) {
            const connectOptionsQuestion = state.questions[action.payload.questionId] as IConnectOptionsQuestion
            connectOptionsQuestion.answers[action.payload.answerPairId][action.payload.answerId].answerText = action.payload.answerText
            state.interfaceData.fieldsWereEdited = true
        },
        deleteConnectOptionsAnswerPair(state, action: PayloadAction<{ questionId: number, answerPairId: number }>) {
            const connectOptionsQuestion = state.questions[action.payload.questionId] as IConnectOptionsQuestion
            connectOptionsQuestion.answers.splice(action.payload.answerPairId, 1)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(generateQuestionsAction.fulfilled, (state, action: PayloadAction<IGenerateQuestionsResponse>) => {
            state.interfaceData.questionGenerationLoading = false
            state.questions = [...state.questions, ...action.payload.questions]
            state.interfaceData.error = null
        })
            .addCase(generateQuestionsAction.rejected, (state, action) => {
                state.interfaceData.questionGenerationLoading = false
                state.interfaceData.error = action.payload as string
            })
            .addCase(generateQuestionsAction.pending, (state, action) => {
                state.interfaceData.questionGenerationLoading = true
                state.interfaceData.message = null
                state.interfaceData.error = null
            })
    }
})

export const generateQuestionsAction = createAsyncThunk<IGenerateQuestionsResponse, IGenerateQuestionsRequest>(
    'test/generateQuestionsAction',
    async ({ theoreticalPart }, thunkAPI) => {
        try {
            const response = await TestsEditorService.GenerateQuestions(theoreticalPart);
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export default testSlice.reducer

export const { setTest, handleNameChange, handleDescriptionChange, handleTheoreticalPartChange, addQuestion, resetTest,
    handleQuestionTextChange, deleteQuestion, handleCheckboxAnswerToggle,
    handleSingleMultipleChoiceAnswerTextChange, addCheckboxAnswer, addTextInputAnswer, handleTextInputAnswerTextChange,
    handleTrueOrFalseAnswerChange, handleFillTheGapsAnswerChange, addFillTheGapsAnswer, deleteFillTheGapsAnswer, addConnectOptionsAnswer,
    handleConnectOptionsAnswerChange, deleteSingleMultipleQuestion, deleteConnectOptionsAnswerPair, deleteTextInputAnswer } = testSlice.actions