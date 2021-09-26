export function fetchInfo(info) {
 return fetch(`http://localhost:3001/api/v1/${info}`)
  .then(response => response.json())
  .then(data => data);
  // .catch(error => console.log(error))
}
