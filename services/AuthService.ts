import $api from "@/http";
import { ICheckResponse, ILoginResponse, IRegistrationResponse } from "@/ts/response/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
    static async check(): Promise<AxiosResponse<ICheckResponse>> {
        return $api.get<ICheckResponse>("auth/check")
    }

    static async login(login: string, password: string): Promise<AxiosResponse<ILoginResponse>> {
        return $api.post<ILoginResponse>("auth/login", { login, password })
    }

    static async registration(login: string, username: string, password: string): Promise<AxiosResponse<IRegistrationResponse>> {
        return $api.post<IRegistrationResponse>("auth/registration", { login, password, username })
    }
}