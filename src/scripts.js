// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/chart.svg'
import './images/calendar.svg'
import './images/home.svg'
import './images/logout.svg'
import './images/bed.svg'
import {fetchInfo} from './apiCalls.js';
import domUpdates from './domUpdates';
import {searchDate, bookingHomeBtn, statisticsBtn} from './domElements'
import Customer from './classes/customer'
// import {dateSelector} from './domElements';


//global variables
let customers, rooms, bookings, customer, date

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
  // console.log(customers)
  // console.log(rooms)
  // console.log(bookings)
  instantiation(customers);
}

const instantiation = (customersArr) => {
  let i = Math.floor(Math.random() * customersArr.length);
  customer = new Customer(customersArr[i])
  console.log(customer)
}

//eventListeners
window.addEventListener('load', (e) => {
  fetchAllInfo();
  date = formatDate('-')
  domUpdates.updateCalendar(date);
  // date = dateSelector.value;
  // domUpdates.displayAvailableRooms(date, rooms, bookings); <----Ask Robbie why date, rooms, bookings don't exist yet!!
})

searchDate.addEventListener('click', () => {
  event.preventDefault()
  date = dateSelector.value;
  domUpdates.filterByRoomType(date, rooms, bookings);
})

statisticsBtn.addEventListener('click', () => {
  domUpdates.returnCustomerExpense(customer, bookings, rooms);
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
