export function fetchInfo(info) {
 return fetch(`http://localhost:3001/api/v1/${info}`)
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.log(error))
}

export function addBooking(bookingInfo) {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bookingInfo)
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}
