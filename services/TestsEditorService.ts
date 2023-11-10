import $api from '@/http';
import { IActivateTestRequest, IDeactivateTestRequest } from '@/ts/request/TestRequest';
import { IActivateTestResponse, IDeactivateTestResponse, IGenerateQuestionsResponse, IPostTestResponse } from '@/ts/response/TestsResponse';
import { FillTheGapsAnswerTypes, IConnectOptionsAnswerPair, IConnectOptionsQuestion, IEssayQuestion, IFillTheGapsFillAnswer, IFillTheGapsQuestion, IFillTheGapsTextAnswer, ITest, ITextInputAnswer, ITextInputQuestion, ITrueOrFalseQuestion, IsingleMultipleChoiceAnswer, IsingleMultipleChoiceQuestion, QuestionTypes } from "@/ts/test"
import { AxiosResponse } from 'axios';
const crypto = require('crypto');

export default class TestsEditorService {

    public static stringToDateNumber = ({ date, time }: { date: Date, time: string }): number => {
        const startDateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            parseInt(time.split(':')[0], 10),
            parseInt(time.split(':')[1], 10)
        );
        return Number(startDateTime)
    }

    public static GetUniqueId = () => {
        const timePart = String(Date.now());
        const randomBytes = crypto.randomBytes(4);
        const randomHex = randomBytes.toString('hex');
        const randomNumberComponent = parseInt(randomHex, 16);
        const uniqueId = timePart + randomNumberComponent;
        return Number(uniqueId);
    }

    public static async GenerateQuestions(theoreticalPart: string): Promise<AxiosResponse<IGenerateQuestionsResponse>> {
        return $api.post<IGenerateQuestionsResponse>("tests/generateQuestions", { theoreticalPart: theoreticalPart })
    }

    public static async ActivateTest(activateTestRequest: IActivateTestRequest): Promise<AxiosResponse<IActivateTestResponse>> {
        return $api.post<IActivateTestResponse>("tests/activate", activateTestRequest)
    }

    public static async DeactivateTest(deactivateTestRequest: IDeactivateTestRequest): Promise<AxiosResponse<IDeactivateTestResponse>> {
        return $api.post<IDeactivateTestResponse>("tests/deactivate", deactivateTestRequest)
    }

    private static GetNewSingleMultipleChoiceQuestion = (): IsingleMultipleChoiceQuestion => {
        return {
            _id: this.GetUniqueId(),
            type: QuestionTypes.singleMultipleChoice,
            question: "",
            answers:
                [{
                    _id: this.GetUniqueId(),
                    answerText: "",
                    isRight: false
                },
                {
                    _id: this.GetUniqueId(),
                    answerText: "",
                    isRight: false
                }]
        }
    }

    public static GetNewSingleMultipleChoiceAnswer = (): IsingleMultipleChoiceAnswer => {
        return {
            _id: this.GetUniqueId(),
            answerText: "",
            isRight: false
        }
    }

    public static GetNewTextInputQuestion = (): ITextInputQuestion => {
        return {
            _id: this.GetUniqueId(),
            type: QuestionTypes.textInput,
            question: "",
            answers:
                [{
                    _id: this.GetUniqueId(),
                    answerText: "",
                }],
            answer: ""
        }
    }

    public static GetNewTextInputAnswer = (): ITextInputAnswer => {
        return {
            _id: this.GetUniqueId(),
            answerText: "",
        }
    }

    public static GetNewTrueOrFalseQuestion = (): ITrueOrFalseQuestion => {
        return {
            _id: this.GetUniqueId(),
            type: QuestionTypes.trueOrFalse,
            question: "",
            answer: true
        }
    }

    public static GetNewFillTheGapsQuestion = (): IFillTheGapsQuestion => {
        return {
            _id: this.GetUniqueId(),
            type: QuestionTypes.fillTheGaps,
            answers: [
                {
                    _id: this.GetUniqueId(),
                    type: FillTheGapsAnswerTypes.text,
                    answerText: "",
                },
                {
                    _id: this.GetUniqueId(),
                    type: FillTheGapsAnswerTypes.fill,
                    answerText: "",
                }
            ]
        }
    }

    public static GetNewFillTheGapsAnswer = (type: FillTheGapsAnswerTypes): IFillTheGapsFillAnswer | IFillTheGapsTextAnswer => {
        return {
            _id: this.GetUniqueId(),
            type: type,
            answerText: "",
        }
    }

    public static GetNewConnectOptionsAnswerPair = (): IConnectOptionsAnswerPair => {
        return [
            {
                _id: this.GetUniqueId(),
                answerText: "",
            },
            {
                _id: this.GetUniqueId(),
                answerText: "",
            }
        ]
    }

    public static GetNewConnectOptionsQuestion = (): IConnectOptionsQuestion => {
        return {
            _id: this.GetUniqueId(),
            type: QuestionTypes.connectOptions,
            answers: [
                [
                    {
                        _id: this.GetUniqueId(),
                        answerText: "",
                    },
                    {
                        _id: this.GetUniqueId(),
                        answerText: "",
                    }
                ],
                [
                    {
                        _id: this.GetUniqueId(),
                        answerText: "",
                    },
                    {
                        _id: this.GetUniqueId(),
                        answerText: "",
                    }
                ]
            ],
            chosenAnswers: {},
            avaliableForChoosingAnswers: []
        }
    }

    public static GetNewEssayQuestion = (): IEssayQuestion => {
        return {
            _id: this.GetUniqueId(),
            type: QuestionTypes.essay,
            question: "",
            answer: ""
        }
    }

    static GetNewQuestion = (type: QuestionTypes) => {
        switch (type) {
            case QuestionTypes.singleMultipleChoice: {
                return TestsEditorService.GetNewSingleMultipleChoiceQuestion()
            }
            case QuestionTypes.textInput: {
                return TestsEditorService.GetNewTextInputQuestion()
            }
            case QuestionTypes.trueOrFalse: {
                return TestsEditorService.GetNewTrueOrFalseQuestion()
            }
            case QuestionTypes.connectOptions: {
                return TestsEditorService.GetNewConnectOptionsQuestion()
            }
            case QuestionTypes.fillTheGaps: {
                return TestsEditorService.GetNewFillTheGapsQuestion()
            }
            case QuestionTypes.essay: {
                return TestsEditorService.GetNewEssayQuestion()
            }
            default: {
                console.error("Не вказаний валідний тип запитання")
                return TestsEditorService.GetNewSingleMultipleChoiceQuestion()
            }
        }
    }
    
    public static InitialTest = {
        _id: TestsEditorService.GetUniqueId(),
        name: "",
        description: "",
        theoreticalPart: "",
        questions: [
            TestsEditorService.GetNewQuestion(QuestionTypes.singleMultipleChoice)
        ],
        updatedAt: Date.now(),
        interfaceData: {
            loading: false,
            questionGenerationLoading: false,
            message: null,
            error: null
        },
        isActive: false,
        setToActivate: false
    }
}