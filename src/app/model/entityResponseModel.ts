export interface EntityReponseModel<T>{
    data:T;
    success:boolean;
    message:string;
}