export namespace surveyData {
    export interface data {
        id: string,
        Text: string
    }
    export interface questionsResult {
        consulations: {
            Questions: data[]
        }
    }
    export interface optionDataResult {
        Question: number
        Options: data[]
    }
    export interface SubmitResponse {
        email: string,
        QuestionID: number,
        ChosenOptionID: string
    }
    export interface options {
        optionId: Number,
        optionText: string
    }
    export interface submitQuestion {
        questionId: Number,
        questionText: string,
        options: options[]
    }
    export interface result {
        result: boolean,
        message: string
    }
    export interface questionCount {
        questionId: Number,
        count: Int32Array
    }
    export interface responseAnalysis {
        totalresponse: Number,
        eachQuestionCount: questionCount[]
    }
    export interface countOptions {
        id: number,
        count: number,
    }
    export interface questionOptionResponse {
        Question: number,
        Answers: countOptions[]
    }
}