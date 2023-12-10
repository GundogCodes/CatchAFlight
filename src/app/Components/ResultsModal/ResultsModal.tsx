import React, { useEffect, useState } from "react";
import styles from "./ResultsModal.module.scss";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

function ResultsModal({
  airports,
  setResultsModal,
  departingCity,
  setDepartingCity,
  destinationCity,
  setDestinationCity,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  adultPassengers,
  setAdultPassengers,
  childPassengers,
  setChildPassengers,
  infantPassengers,
  setInfantPassengers,
  seatSelection,
  setSeatSelection,
  flightSchedules,
  allFlights,
}) {
  /******************************* STATES *******************************/
  const [foundMatchingFlights, setFoundMatchingFlights] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);

  console.log("FLIGHT SCHEDULES", flightSchedules);
  console.log("ALL FLIGHTS", allFlights);
  console.log("ALL AIRPORTS", airports);
  console.log("departing city: ", departingCity);
  console.log("destination city: ", destinationCity);
  console.log("departure date: ", departureDate);
  console.log("return date: ", returnDate);
  console.log("adult passengers: ", adultPassengers);
  console.log("child passengers: ", childPassengers);
  console.log("infant passengers: ", infantPassengers);
  console.log("seat class: ", seatSelection);
  /******************************* USE EFFECTS *******************************/
  useEffect(() => {
    findMatchingToAndFromFlights();
  }, []);
  /******************************* FUNCTIONS *******************************/
  function handleOffClick() {
    setResultsModal(false);
  }

  function findMatchingToAndFromFlights() {
    //One-way trip
    const potFoundFlights = [];
    const foundyFlights = [];
    //check all flights from departing city going to destination city
    console.log("departing AirportID", departingCity.airportId);
    console.log("arriving AirportID", destinationCity.airportId);
    for (let flight of allFlights) {
      if (
        flight.fromAirport === departingCity.airportId &&
        flight.toAirport === destinationCity.airportId
      ) {
        potFoundFlights.push(flight);
      }
    }
    for (let flightSchedule of flightSchedules) {
      for (let flights of potFoundFlights) {
        if (flights.flightId === flightSchedule.flightId) {
          foundyFlights.push({
            flightNum: flights.flightNumber,
            flightID: flights.flightId,
            flightSchedule: flightSchedule,
          });
        }
      }
    }
    console.log("POT FF", potFoundFlights);
    console.log("FOUNDYYYYYYYYYYYUYUYYUYUYUYUYUYu FLIGHTS", foundyFlights);
    setFoundMatchingFlights(foundyFlights);
    // if no flights available that day check all dates around selected departing dates
    //check if numOfPassengers selected is available on flight
    //return trip
  }
  function showLoginOrSignUp() {}

  console.log("FOUND FLIGHTS", foundMatchingFlights);
  return (
    <div className={styles.ResultsModal}>
      {showFormModal ? <></> : <></>}
      <div className={styles.modal}>
        <p>
          <CloseIcon onClick={handleOffClick} />
        </p>
        <h1>Available flights</h1>
        <div className={styles.foundFlightsDisplay}>
          {foundMatchingFlights.length > 0 ? (
            foundMatchingFlights.map((foundFlight) => {
              return (
                <div className={styles.flightsResults}>
                  <h4 style={{ fontWeight: "bolder" }}>
                    FLIGHT #{foundFlight.flightNum}{" "}
                  </h4>
                  <h4>
                    DEPARTURE
                    <span>
                      {foundFlight.flightSchedule.departureDateTime
                        .toString()
                        .slice(3, 7)}{" "}
                    </span>
                  </h4>
                  <h4>
                    ARRIVAL{" "}
                    <span>
                      {foundFlight.flightSchedule.arrivalDateTime
                        .toString()
                        .slice(3, 7)}
                    </span>
                  </h4>
                  <h4 id={styles.seats}>
                    <h6 style={{ fontWeight: "bold" }}>Available Seats</h6>
                    <div id={styles.seatsDis}>
                      First Class{" "}
                      <span>
                        {foundFlight.flightSchedule.availableFirstClassSeats}
                      </span>
                    </div>
                    <div id={styles.seatsDis}>
                      Business{" "}
                      <span>
                        {foundFlight.flightSchedule.availableBusinessClassSeats}
                      </span>
                    </div>
                    <div id={styles.seatsDis}>
                      Economy{" "}
                      <span>
                        {foundFlight.flightSchedule.availableEconomyClassSeats}
                      </span>
                    </div>
                  </h4>
                  <h4>
                    <Button onClick={showLoginOrSignUp}>Book</Button>
                  </h4>
                </div>
              );
            })
          ) : (
            <div className={styles.noFlights}>No Flights Available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsModal;
