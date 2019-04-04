export const createQueryString = paramsObj =>
  Object.keys(paramsObj)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObj[key]);
    })
    .join('&');
