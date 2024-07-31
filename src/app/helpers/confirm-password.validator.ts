import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(controlName:string, matchControlName:string){
    return(FormGroup:FormGroup)=>{
        const passwordConfirm=FormGroup.controls[controlName];
        const ConfirmPasswordControl=FormGroup.controls[matchControlName];
        if(ConfirmPasswordControl.errors && ConfirmPasswordControl.errors['confirmPasswordValidator']){
            return;
        }
        if( passwordConfirm.value!== ConfirmPasswordControl.value){
            ConfirmPasswordControl.setErrors({ConfirmPasswordValidator:true})
        }
        else{
            ConfirmPasswordControl.setErrors(null)
        }
    }
}
