import { ITest } from "../test";

export interface IPostTestRequest {
    test: ITest
}

export interface IGenerateQuestionsRequest {
    theoreticalPart: string
}

export interface IActivateTestRequest {
    activatingTestId: number;
    startTime: number | "now",
    endTime: number
} 

export interface IDeactivateTestRequest {
    deactivatingTestId: number;
}

export interface IEditTestRequest {
    test: ITest
}
