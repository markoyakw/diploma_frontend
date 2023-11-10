import $api from '@/http';
import { IEditTestRequest } from '@/ts/request/TestRequest';
import { IPostTestResultResponse } from '@/ts/response/GetTestedResponse';
import { IDeleteTestResponse, IEditTestResponse, IGenerateQuestionsResponse, IPostTestResponse } from '@/ts/response/TestsResponse';
import { ITest } from '@/ts/test';
import { AxiosResponse } from 'axios';

export default class UserService {

    public static async PostTest(test: ITest): Promise<AxiosResponse<IPostTestResponse>> {
        return $api.post<IPostTestResponse>("tests/test", test)
    }

    public static async DeleteTest(testId: number): Promise<AxiosResponse<IDeleteTestResponse>> {
        return $api.delete<IDeleteTestResponse>(`tests/test?id=${testId}`)
    }

    public static async EditTest({ test }: IEditTestRequest): Promise<AxiosResponse<IEditTestResponse>> {
        return $api.patch<IEditTestResponse>("tests/test", { test })
    }

}