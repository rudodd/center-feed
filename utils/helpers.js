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

// Helper function to return the published time for an article
export const getPublishedTime = (publishedAt) => {
  let publishedTime = '0 minutes';
  const currentTime = new Date();
  const articleTime = new Date(publishedAt);
  const difference = Math.round((currentTime - articleTime) / 1000 / 60);
  switch (difference) {
    case (difference < 60):
      publishedTime = `${difference} minutes`;
      break;
    case ((difference / 60) <= 1.5):
      publishedTime = "1 hour";
      break;
    case ((difference / 60) <= 24):
      publishedTime = `${Math.round(difference / 60)} hours`;
      break;
    case (((difference / 60) / 24) <= 1.5):
      publishedTime = '1 day';
      break;
    default:
      publishedTime = `${Math.round((difference / 60) / 24)} days`;
  }
  return publishedTime;
}