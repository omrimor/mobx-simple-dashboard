export function toQueryString(obj) {

  const properties = Object.keys(obj);

  if (!properties.length) {
    return '';
  }

  const queryString = properties
    .map((key) => `${key}=${obj[key]}`)
    .join('&');

  return '?' + queryString;
}
