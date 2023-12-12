import React, { useEffect, useState } from "react";
import styles from "./ResultsModal.module.scss";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

interface Airport {
  airportCode: string;
  airportId: string;
  airportName: string;
  city: string;
  country: string;
}
interface SeatClass {
  className: string;
}
interface FlightSchedules {
  scheduleId: string;
  flightId: string;
  availableFirstClassSeats: number;
  availableBusinessClassSeats: number;
  availableEconomyClassSeats: 43;
  departureDateTime: string;
  arrivalDateTime: string;
}
interface Flight {
  aircraftId: string;
  createdAt: string;
  flightId: string;
  flightNumber: number;
  fromAirport: string;
  toAirport: string;
  totalBusinessClassSeats: number;
  totalEconomyClassSeats: number;
  totalFirstClassSeats: number;
}

interface ResultsModalProps {
  airports: Airport[];
  setResultsModal: React.Dispatch<React.SetStateAction<boolean>>;
  departingCity: Airport | null;
  setDepartingCity: React.Dispatch<React.SetStateAction<Airport | null>>;
  destinationCity: Airport | null;
  setDestinationCity: React.Dispatch<React.SetStateAction<Airport | null>>;
  departureDate: Date | null;
  setDepartureDate: React.Dispatch<React.SetStateAction<Date | null>>;
  returnDate: Date | null;
  setReturnDate: React.Dispatch<React.SetStateAction<Date | null>>;
  adultPassengers: number;
  setAdultPassengers: React.Dispatch<React.SetStateAction<number>>;
  childPassengers: number;
  setChildPassengers: React.Dispatch<React.SetStateAction<number>>;
  infantPassengers: number;
  setInfantPassengers: React.Dispatch<React.SetStateAction<number>>;
  seatSelection: string;
  setSeatSelection: React.Dispatch<React.SetStateAction<string>>;
  flightSchedules: FlightSchedules[];
  allFlights: Flight[];
}

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
}: ResultsModalProps) {
  /******************************* VARIABLES *******************************/

  /******************************* STATES *******************************/
  const [foundMatchingFlights, setFoundMatchingFlights] = useState<
    Array<Flight>
  >([]);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);

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
    const matchingFlight = [];
    //check all flights from departing city going to destination city
    // console.log("departing AirportID", departingCity.airportId);
    // console.log("arriving AirportID", destinationCity.airportId);
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
          matchingFlight.push({
            flightNum: flights.flightNumber,
            flightID: flights.flightId,
            flightSchedule: flightSchedule,
          });
        }
      }
    }
    console.log("POT FF", potFoundFlights);
    console.log("FOUNDYYYYYYYYYYYUYUYYUYUYUYUYUYu FLIGHTS", matchingFlight);
    setFoundMatchingFlights(matchingFlight);
    // if no flights available that day check all dates around selected departing dates
    //check if numOfPassengers selected is available on flight
    //return trip
  }
  function showLoginOrSignUp() {
    setShowFormModal(true);
  }

  console.log("FOUND FLIGHTS", foundMatchingFlights);
  return (
    <div className={styles.ResultsModal}>
      {showFormModal ? (
        <div className={styles.form}>
          <p
            onClick={() => {
              setShowFormModal(false);
            }}
          >
            <CloseIcon />
          </p>
          <h2>Login</h2>
          <label>Username:</label>
          <input></input>
          <label>Password:</label>
          <input></input>
          <Button marginTop={"10px"}>Login</Button>
          <p id={styles.signUpPrompt}>Don't have an account? Sign up here</p>
        </div>
      ) : (
        <></>
      )}
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
