import { ITest, ITestResult } from "../test";

export interface IGetTestedResponse {
    test: ITest,
    message: string
}

export interface IPostTestResultResponse {
    gradedTestResult: ITestResult,
    message: string,
    highlightedWrongPartsArr?: { highlightedWrongPartsArr: string[] }
}

export interface IGetTestResultsByIdResponse {
    testResults: ITestResult[],
    testId: number
}