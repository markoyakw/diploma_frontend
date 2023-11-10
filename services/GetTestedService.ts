import { IPostTestResultRequest } from './../ts/request/GetTestedRequest';
import $api from '@/http';
import { IGetTestResultsByIdResponse, IGetTestedResponse, IPostTestResultResponse } from '@/ts/response/GetTestedResponse';
import { ITestResultsById } from '@/ts/test';
import { AxiosResponse } from 'axios';

interface GroupedData {
    [key: string]: any[];
}

export default class GetTestedService {
    public static GetTested = (id: string) => {
        return $api.get<IGetTestedResponse>(`tests/getTested?id=${id}`)
    }

    public static async PostTestResult(testResult: IPostTestResultRequest): Promise<AxiosResponse<IPostTestResultResponse>> {
        return $api.post<IPostTestResultResponse>("tests/testResult", testResult)
    }

    public static async GetTestResultsByTestId(id: string): Promise<AxiosResponse<IGetTestResultsByIdResponse>> {
        return $api.get<IGetTestResultsByIdResponse>(`tests/testResultsByTestId?id=${id}`)
    }

    public static groupTestsByMonthAndYear(dataArray: ITestResultsById[]) {
        const groupedData: GroupedData = {}
        dataArray.forEach(item => {
            const date = new Date(item.createdAt);
            const year = date.getFullYear();
            const month = date.getMonth();

            const key = `${year}-${month}`;
            if (!groupedData[key]) {
                groupedData[key] = [];
            }

            groupedData[key].push(item);
        });
        return groupedData
    }

    public static GetUkrainianMonthName(monthNumber: number) {
        const months = [
            'січень',
            'лютий',
            'березень',
            'квітень',
            'травень',
            'червень',
            'липень',
            'серпень',
            'вересень',
            'жовтень',
            'листопад',
            'грудень',
        ];

        if (monthNumber >= 1 && monthNumber <= 12) {
            return months[monthNumber - 1];
        } else {
            return 'Помилка';
        }
    }

}