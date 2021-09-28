import './css/base.scss';
import './images/chart.svg'
import './images/calendar.svg'
import './images/home.svg'
import './images/logout.svg'
import './images/bed.svg'
import {fetchInfo, addBooking} from './apiCalls.js';
import domUpdates from './domUpdates';
import {searchDate, bookingHomeBtn, statisticsBtn, bookingHistoryBtn}
from './domElements'
import Customer from './classes/customer'
import Booking from './classes/booking'

//global variables
let customers, rooms, bookings, customer, date, firstName

function fetchAllInfo() {
  let customersPromise = fetchInfo('customers');
  let roomsPromise = fetchInfo('rooms');
  let bookingsPromise = fetchInfo('bookings');
  Promise.all([customersPromise, roomsPromise, bookingsPromise])
  .then(data => parseData(data))
}

const parseData = (info) => {
  customers = info[0].customers
  rooms = info[1].rooms
  bookings = info[2].bookings
  .reduce((acc, booking) => {
    let currBooking = new Booking(booking);
    currBooking.calculateBookingCost(rooms);
    acc.push(currBooking)
  return acc;
  }, [])

  instantiation(customers);
  customer.addCustomerBooking(bookings);
}

const instantiation = (customersArr) => {
  let i = Math.floor(Math.random() * customersArr.length);
  customer = new Customer(customersArr[i]);
  firstName = customer.name.split(' ')[0];
  domUpdates.greetCustomer(firstName);
}

//eventListeners
window.addEventListener('load', (e) => {
  fetchAllInfo();
  date = formatDate('-')
  domUpdates.updateCalendar(date);
})

searchDate.addEventListener('click', () => {
  event.preventDefault()
  date = dateSelector.value.split('-').join('/');
  date = new Date(date).toLocaleDateString();
  domUpdates.filterByRoomType(date, rooms, bookings);
})

availableRooms.addEventListener('click', (e) => {
  if(e.target.classList.contains('book-room')) {
    let cardData = e.target.parentNode
    let roomNumber = cardData.childNodes[3].childNodes[3].childNodes[1].innerText
      .split('Room Number: ')[1];
    bookRoom(roomNumber, customer, rooms);
  }
})

statisticsBtn.addEventListener('click', () => {
  domUpdates.returnCustomerExpense(customer, bookings, rooms);
  domUpdates.toggleToStatistics();
})

bookingHomeBtn.addEventListener('click', () => {
  domUpdates.toggleToHome();
})

bookingHistoryBtn.addEventListener('click', () => {
  date = dateSelector.value.split('-').join('/');
  domUpdates.toggleToHistory();
  domUpdates.filterBookingHistory(customer, date)
})



//functions
const formatDate = (joinBy) => {
    let today = new Date()
    let month = '' + (today.getMonth() + 1);
    let day = '' + today.getDate();
    let year = today.getFullYear();

    if (month.length < 2) {
      month = '0' + month
    }

    if (day.length < 2) {
      day = '0' + day
    }

    return [year, month, day].join(joinBy);
}

const bookRoom = (roomNumber, customer, rooms) => {
  let rawBooking = {
    "id": Date.now(),
    "userID": customer.id,
    "date": dateSelector.value.split('-').join('/'),
    "roomNumber": parseInt(roomNumber),
  };
  let addedBooking = new Booking(rawBooking);
  addedBooking.calculateBookingCost(rooms);
  customer.addNewCustomerBooking(addedBooking);
  bookings.push(addedBooking);
  addBooking(rawBooking)
  domUpdates.filterByRoomType(date, rooms, bookings);
}
