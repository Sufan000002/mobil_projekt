export const gv = {
    get deleteAfterCopy() {
      return JSON.parse(localStorage.getItem('deleteAfterCopy') || 'false');
    },
    set deleteAfterCopy(value: boolean) {
      localStorage.setItem('deleteAfterCopy', JSON.stringify(value));
    },
  
    get includeSignature() {
      return JSON.parse(localStorage.getItem('includeSignature') || 'true');
    },
    set includeSignature(value: boolean) {
      localStorage.setItem('includeSignature', JSON.stringify(value));
    },
  };