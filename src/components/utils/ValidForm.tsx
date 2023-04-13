export function isValidForm() {
  const requiredFields = document.querySelectorAll('[required]') as NodeListOf<HTMLInputElement>;
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value) {
      field.classList.add('is-invalid');
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
    }
  });  
    return isValid;
  }
  