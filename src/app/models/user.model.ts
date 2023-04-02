
export namespace UserData{
    export interface registerUserModel {
        email:string,
        fullName:string,
        dob:Date,
        address:string,
        password:string,
        SNINumber:number,
        admin:boolean
    }
    export interface userLogin{
        email:string,
        password:string,
    }
    export interface loginResult{
        result:Boolean,
        message:string,
        admin:Boolean
    }
    export interface getUserData{
        email:string,
        fullName:string,
        dob:Date,
        address:string,
        SNINumber:number,
        admin?:boolean,
    }

}
