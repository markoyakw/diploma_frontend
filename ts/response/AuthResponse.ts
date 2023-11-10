import { ITest, ITestResult, ITestResultsById } from "../test";

export interface ILoginResponse {
    message: string;
    token: string
}

export interface IRegistrationResponse {
    message: string;
}

export interface ICheckResponse {
    _id: string,
    login: string,
    username: string,
    tests: Array<ITest>,
    testResultsById: ITestResultsById[]
}