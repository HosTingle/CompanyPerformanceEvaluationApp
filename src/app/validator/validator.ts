import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

export function mailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Boş değerler için hata döndürme
    }
    
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const endsWithDotCom = /\.com$/.test(value);
    const errors: ValidationErrors = {};
  
    // Eğer email geçersizse hata döndür
    if (!isValidEmail || !endsWithDotCom) {
      errors['mailWrong'] = true;
    }
  
    // Eğer hata varsa döndür, yoksa null
    return Object.keys(errors).length > 0 ? errors : null;
  }

  export function turkishCharacterValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
        return null; // Boş değerler için hata döndürme
      }
    const turkishChars = /[çÇğĞıİöÖşŞüÜ]/.test(value);
    return !turkishChars ? null : { turkishCharacter: true };
  }

  export function phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
        return null; // Boş değerler için hata döndürme
      }
    const phoneNumberPattern = /^0\d{10}$/.test(value);
    return phoneNumberPattern ? null : { invalidPhoneNumber: true };
  }



  export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    
    const value = control.value;
    const hasCapitalLetter = /^[A-Z]/.test(value);
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const hasSpecialChar = specialChars.test(value);
    const hasNumber = /\d/.test(value);
  
    if (!value) {
        return null; // Boş değerler için hata döndürme
      }

    const errors: ValidationErrors = {};
    if (!hasCapitalLetter || !hasSpecialChar || !hasNumber) {
      errors['both'] = true;
    }
  
    return Object.keys(errors).length > 0 ? errors : null;
  }

  export function usernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Boş değerler için hata döndürme
    }
  
    const turkishChars = /[çÇğĞıİöÖşŞüÜ]/;
    const hasTurkishChars = turkishChars.test(value);
  
    const errors: ValidationErrors = {};
  
    if (hasTurkishChars) {
      errors['turkishCharacter'] = true;
    }
  
    return Object.keys(errors).length > 0 ? errors : null;
  }
  