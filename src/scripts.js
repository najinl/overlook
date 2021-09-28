import './css/base.scss';
import './images/chart.svg'
import './images/calendar.svg'
import './images/home.svg'
import './images/logout.svg'
import './images/bed.svg'
import {fetchInfo, addBooking} from './apiCalls.js'
import domUpdates from './domUpdates';
import {searchDate, bookingHomeBtn, statisticsBtn, bookingHistoryBtn, usernameField, passwordField, loginBtn}
from './domElements'
import Customer from './classes/customer'
import Booking from './classes/booking'

//global variables
let customers, rooms, bookings, customer, date, firstName, userID, loadFailMsg

//API fetch-parse-instantiation
const fetchAllInfo = (user) => {
  let customersPromise = fetchInfo('customers');
  let roomsPromise = fetchInfo('rooms');
  let bookingsPromise = fetchInfo('bookings');
  let customerPromise = fetchInfo(`customers/${user}`);
  Promise.all([customerPromise, customersPromise, roomsPromise, bookingsPromise])
  .then(data => parseData(data))
  .catch(error => {
    let loadFailMsg = `Sorry, it's like the year 2020 over here! Instead of a pesky virus though, we're battling a server issue!`;
    domUpdates.returnApiFailMsg(loadFailMsg)
  })
}

const parseData = (info) => {
  customer = info[0]
  customers = info[1].customers
  rooms = info[2].rooms
  bookings = info[3].bookings
  .reduce((acc, booking) => {
    let currBooking = new Booking(booking);
    currBooking.calculateBookingCost(rooms);
    acc.push(currBooking)
  return acc;
  }, [])
  instantiation(customer);
  customer.addCustomerBooking(bookings);
}

const instantiation = (customerRaw) => {
  customer = new Customer(customerRaw);
  firstName = customer.name.split(' ')[0];
  domUpdates.greetCustomer(firstName)
}

window.addEventListener('load', (e) => {
  date = formatDate('-');
  domUpdates.updateCalendar(date);
})

loginBtn.addEventListener('click', () => {
  if(checkPassword(passwordField.value) && checkUsername(usernameField.value)) {
    domUpdates.leaveLogin();
    userID = checkUsername(usernameField.value);
    fetchAllInfo(userID);
    domUpdates.toggleToHome();
  }
  else {
    domUpdates.returnFailureMessage();
  }
})

searchDate.addEventListener('click', () => {
  event.preventDefault()
  date = dateSelector.value.split('-').join('/');
  date = new Date(date).toLocaleDateString();
  domUpdates.filterByRoomType(date, rooms, bookings);
})

availableRooms.addEventListener('click', (e) => {
  let cardData = e.target.parentNode
  if(e.target.classList.contains('book-room')) {
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
const checkUsername = (user) => {
 let prefix = null;
 let userID = null;
 if(user.length > 10 || user.length < 9) {
   return false;
 }
 if(user.length === 10) {
   prefix = user.slice(0, 8);
   userID = parseInt(`${user[8]}${user[9]}`)
   if(userID < 10 || userID > 50 || prefix !== 'customer' || !userID) {
     return false;
   }
  }
 else if(user.length === 9) {
   prefix = user.slice(0, 8);
   userID = parseInt(`${user[8]}`)
   if(!userID || userID < 1 || prefix !== 'customer') {
     return false;
   }
  }
  return userID;
}

const checkPassword = (password) => {
  return password === 'overlook2021';
}

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
  addBooking(rawBooking);
  domUpdates.filterByRoomType(date, rooms, bookings);
}
