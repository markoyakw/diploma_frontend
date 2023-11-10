import { ITest } from "../test"

export interface IGetTestedRequest {
    id: string
}

export interface IPostTestResultRequest {
    testResult: ITest
}

export interface IGetTestResultsByIdRequest {
    id: string
}