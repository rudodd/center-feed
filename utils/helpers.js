// Helper function that returns whether a variable is empty, null, or undefined
export const empty = (variable) => {

  // check undefined 
  if (typeof variable === 'undefined') {
    return true;
  
  // check for null
  } else if (variable === null) {
    return true;

  // check for empty string
  } else if (typeof variable === 'string' && variable.length === 0){
    return true;

  // check for bad number  
  } else if (typeof variable === 'number' && isNaN(variable)){
    return true;

  // check for empty object 
  } else if (typeof variable === 'object' && Object.keys(variable).length === 0){
    return true;

  // check for empty arrays 
  } else if (Array.isArray(variable) && variable.length === 0){
    return true;

  } else {
    return false;
  }
}