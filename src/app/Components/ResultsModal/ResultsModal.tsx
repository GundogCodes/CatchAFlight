import React, { useState } from "react";
import styles from "./ResultsModal.module.scss";
import { CloseIcon } from "@chakra-ui/icons";

function ResultsModal({
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
  const [foundMatchingFlights, setFoundMatchingFlights] = useState([]);
  console.log(
    "DEPARTING CITY",
    departingCity,
    "DESTINATION",
    destinationCity,
    //     departureDate,
    //     returnDate,
    //     adultPassengers,
    //     childPassengers,
    //     infantPassengers,
    //     seatSelection,
    "FLIGHTS SCHEDULE",
    flightSchedules,
    "ALL FLIGHTS",
    allFlights
  );
  function handleOffClick() {
    setResultsModal(false);
  }

  function findflights() {}

  return (
    <div className={styles.ResultsModal}>
      <div className={styles.modal}>
        <p>
          <CloseIcon onClick={handleOffClick} />
        </p>
        <h1>Available flights</h1>
      </div>
    </div>
  );
}

export default ResultsModal;
