import { ITest, IsingleMultipleChoiceQuestion } from "../test";

export interface IPostTestResponse {
    message: string;
    newTest: ITest
}

export interface IGenerateQuestionsResponse {
    questions: Array<IsingleMultipleChoiceQuestion>
}

export interface IDeleteTestResponse {
    message: string;
    deletedTestId: number
}

export interface IActivateTestResponse {
    message: string,
    activatedTest: ITest
}


export interface IDeactivateTestResponse {
    message: string,
    deactivatedTest: ITest
}

export interface IEditTestResponse {
    message: string,
    editedTest: ITest
}




