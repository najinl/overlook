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
  // .catch(error => console.log(error);
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
  customer.addCustomerBooking(bookings); //<----Should go in on window load below.
  console.log(bookings)
}

const instantiation = (customersArr) => {
  let i = Math.floor(Math.random() * customersArr.length);
  customer = new Customer(customersArr[i]);
  firstName = customer.name.split(' ')[0]; //<----Should go in on window load below.
  domUpdates.greetCustomer(firstName) //<----Should go in on window load below.
}

//eventListeners
window.addEventListener('load', (e) => {
  fetchAllInfo();
  date = formatDate('-')
  domUpdates.updateCalendar(date);
  // console.log(name)
  // domUpdates.greetCustomer(name)<----Can't get to work here.
  // customer.addCustomerBooking(bookings);<----Can't get to work here.
  // domUpdates.displayAvailableRooms(date, rooms, bookings); <----Ask Robbie why date, rooms, bookings don't exist yet!!
})

searchDate.addEventListener('click', () => {
  event.preventDefault()
  date = dateSelector.value.split('-').join('/');
  date = new Date(date).toLocaleDateString();
  // console.log(date)
  domUpdates.filterByRoomType(date, rooms, bookings);
})

availableRooms.addEventListener('click', (e) => {
  if(e.target.classList.contains('book-room')) {
    // console.log(e.target)
    let cardData = e.target.parentNode
    console.log(customer);
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
  // console.log(customer)
  domUpdates.filterBookingHistory(customer, date)
  // domUpdates.filterBookingHistory(customer, '1/30/2020') //<---hard-coded date
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
  customer.addNewCustomerBooking(addedBooking); //--->Add to current customer bookings
  // console.log(customer.bookings)
  // console.log(addedBooking)
  // console.log('rawBook', bookings)
  bookings.push(addedBooking);
  addBooking(rawBooking) //--->Add to global hotel bookings
  // console.log('addedBook', bookings)
  domUpdates.filterByRoomType(date, rooms, bookings) //--->Update current available rooms display
}
