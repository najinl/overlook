import chai from 'chai';
const expect = chai.expect;
import {testData} from './sample-test.js';
import Customer from '../src/classes/customer';
import Booking from '../src/classes/booking';

describe('Customer', function() {
  let customer11, bookings, rooms

  beforeEach(() => {
    bookings = testData.bookings
    .reduce((allBookings, booking) => {
      allBookings.push(new Booking(booking))
      return allBookings;
    }, []);
    customer11 = new Customer(testData.customers[0])
    rooms = testData.rooms;
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  })

  it('should create an instance of Customer', () => {
    expect(customer11).to.be.an.instanceof(Customer);
  })

  it('should have a customer id', () => {
    expect(customer11.id).to.deep.equal(11);
  })

  it('should have a customer name', () => {
    expect(customer11.name).to.deep.equal('Melissa Sauer');
  })

  it('should have no bookings by default', () => {
    expect(customer11.bookings).to.deep.equal([]);
  })

  it('should have a starting total spent of zero', () => {
    expect(customer11.totalSpent).to.deep.equal(0);
  })

  it('should store all bookings for the customer in the bookings array', () => {
    customer11.addCustomerBooking(bookings);
    expect(customer11.bookings).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6tb",
      "userID": 11,
      "date": "2/6/2020",
      "roomNumber": 5,
      "roomServiceCharges": [],
      "cost": 0
    },
    {
      "id": "5fwrgu4i7k55hl6tc",
      "userID": 11,
      "date": "2/5/2020",
      "roomNumber": 5,
      "roomServiceCharges": [],
      "cost": 0
    }])
  })

  it('should keep track of how much the customer spent', () => {
    customer11.addCustomerBooking(bookings);
    customer11.calculateTotalSpent(rooms)

    expect(customer11.totalSpent).to.deep.equal(522.52)
  })

  it('should return all future bookings', () => {
    customer11.addCustomerBooking(bookings);
    expect(customer11.findFutureBookings('2/1/2020')).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6tb",
      "userID": 11,
      "date": "2/6/2020",
      "roomNumber": 5,
      "roomServiceCharges": [],
      "cost": 0
    },
    {
      "id": "5fwrgu4i7k55hl6tc",
      "userID": 11,
      "date": "2/5/2020",
      "roomNumber": 5,
      "roomServiceCharges": [],
      "cost": 0
    }])
  })
  it('should return all past bookings', () => {
    customer11.addCustomerBooking(bookings);
    expect(customer11.findPastBookings('2/6/2020')).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6tc",
      "userID": 11,
      "date": "2/5/2020",
      "roomNumber": 5,
      "roomServiceCharges": [],
      "cost": 0
    }])
  })
});
