import { FormControl } from '@angular/forms';

export class PhoneValidator {

  static isValid(control: FormControl): any {

    if(isNaN(control.value)){
      return {
        "not a number": true
      };
    }

    if(control.value % 1 !== 0){
      return {
        "not a whole number": true
      };
    }

    if(control.value < 9){
      return {
        "Phone number should be 9 digit long": true
      };
    }

    if (control.value.size > 9){
      return {
        "Phone number should be 9 digit long": true
      };
    }

    return null;
  }

}
