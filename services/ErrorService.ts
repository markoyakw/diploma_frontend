import { StyledMessageComponentTypes } from "@/ts/styledCoponents"

type ErrorServiceReturns = {
    messageText: string,
    messageType: StyledMessageComponentTypes
}

export default class ErrorService {
    static getInputErrorAfterFirstSubmission = (submissionAttemptHappened: boolean, error: string | null): ErrorServiceReturns | undefined => {
        if (submissionAttemptHappened && error)
            return {
                messageText: error,
                messageType: StyledMessageComponentTypes.error
            }
            return undefined
    }
}