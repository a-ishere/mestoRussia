  const ONE_SYMBOL = 1;
  const UPPER_LIMIT_LENGTH = 30;

  export class BasicValidation {
    constructor() {
      this.isValidText = field => !this.isEmpty(field) && !this.isWrongLength(field);
      this.isValidLink = field => !this.isEmpty(field) && !this.isNotLink(field); 
    }
    isEmpty(field) {
      return !field.value;
    }
    isWrongLength(field) {
      return field.value.length === ONE_SYMBOL || field.value.length > UPPER_LIMIT_LENGTH;
    }
    isNotLink(field) {
      return !field.validity.valid;
    }
  }