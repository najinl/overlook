import chai from 'chai';
const expect = chai.expect;
import {testData} from './sample-test.js';
import Booking from '../src/classes/booking';

describe('Booking', function() {
  let booking, bookings, rooms, allBookings

  beforeEach(() => {
    booking = new Booking(testData.bookings[0])
    rooms = testData.rooms;
    bookings = testData.bookings
    allBookings = testData.bookings
    .reduce((allBookings, booking) => {
      let currBooking = new Booking(booking);
      currBooking.calculateBookingCost(rooms);
      allBookings.push(currBooking);
      return allBookings;
    }, []);
  })

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should create an instance of Booking', () => {
    expect(booking).to.be.an.instanceof(Booking);
  })

  it('should have a booking id', () => {
    expect(booking.id).to.deep.equal('5fwrgu4i7k55hl6tb');
  })

  it('should have a user id', () => {
    expect(booking.userID).to.deep.equal(11);
  })

  it('should have a booking date', () => {
    expect(booking.date).to.deep.equal('2/6/2020');
  })

  it('should have a room number', () => {
    expect(booking.roomNumber).to.deep.equal(5);
  })

  it('should have no room service charges initially', () => {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  })

  it('should have an initial cost of zero', () => {
    expect(booking.cost).to.deep.equal(0);
  })

  it('should return the date in the format m/d/yyyy', () => {
    expect(booking.date).to.deep.equal('2/6/2020');
  })

  it('should store the cost of the room', () => {
    expect(allBookings).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6tb",
        "userID": 11,
        "date": "2/6/2020",
        "roomNumber": 5,
        "roomServiceCharges": [],
        "cost": 261.26
      },
      {
        "id": "5fwrgu4i7k55hl6tc",
        "userID": 11,
        "date": "2/5/2020",
        "roomNumber": 5,
        "roomServiceCharges": [],
        "cost": 261.26
      },
      {
        "id": "5fwrgu4i7k55hl6td",
        "userID": 14,
        "date": "1/31/2020",
        "roomNumber": 20,
        "roomServiceCharges": [],
        "cost": 200.39
      },
      {
        "id": "5fwrgu4i7k55hl6te",
        "userID": 15,
        "date": "1/19/2020",
        "roomNumber": 8,
        "roomServiceCharges": [],
        "cost": 497.64
      },
      {
        "id": "5fwrgu4i7k55hl6tf",
        "userID": 15,
        "date": "1/25/2022",
        "roomNumber": 2,
        "roomServiceCharges": [],
        "cost": 207.24
      },
      {
        "id": "5fwrgu4i7k55hl6tg",
        "userID": 16,
        "date": "2/3/2020",
        "roomNumber": 17,
        "roomServiceCharges": [],
        "cost": 172.09
      }
    ])
  })
});
