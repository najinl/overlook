import chai from 'chai';
const expect = chai.expect;
import {testData} from './sample-test.js';
import Booking from '../src/classes/booking';

describe('Booking', function() {
  let booking;

  beforeEach(() => {
    booking = new Booking(testData.bookings[0])
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
});
