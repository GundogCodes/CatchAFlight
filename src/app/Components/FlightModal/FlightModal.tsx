"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./FlightModal.module.scss";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  flexbox,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ResultsModal from "../ResultsModal/ResultsModal";
function FlightModal() {
  /******************************** VARIABLES ********************************/
  const numOfChild = useRef(null);
  const numOfAdult = useRef(null);
  const numOfInfant = useRef(null);
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

  /******************************** STATES ********************************/
  const [returnSelected, setReturnSelected] = useState(false);
  const [oneWaySelected, setOneWaySelected] = useState(true);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flightSchedules, setFlightSchedules] = useState<FlightSchedules[]>([]);
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [resultsModal, setResultsModal] = useState(false);
  const [seatSelection, setSeatSelection] = useState("Economy");
  const [seatClasses, setSeatClasses] = useState([
    "First Class",
    "Business",
    "Economy",
  ]);
  const [adultPassengers, setAdultPassengers] = useState(0);
  const [childPassengers, setChildPassengers] = useState(0);
  const [infantPassengers, setInfantPassengers] = useState(0);

  const [departureDate, setDepartureDate] = useState("");
  const [departingCity, setDepartingCity] = useState({});
  const [destinationCity, setDestinationCity] = useState({});
  const [returnDate, setReturnDate] = useState("");
  /******************************** USE EFFECTS ********************************/
  useEffect(() => {
    const getAirports = async () => {
      try {
        const response = await fetch(
          "https://irs-api-4e39390b0223.herokuapp.com/airport/list"
        );
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error(error);
      }
    };
    const getFlights = async () => {
      try {
        const response = await fetch(
          "https://irs-api-4e39390b0223.herokuapp.com/flight/get-all-flights"
        );
        const data = await response.json();
        setAllFlights(data);
      } catch (error) {
        console.error(error);
      }
    };
    const getFlightSchedules = async () => {
      try {
        const response = await fetch(
          "https://irs-api-4e39390b0223.herokuapp.com/flight-schedule/get-all-flight-schedules"
        );
        const data = await response.json();
        setFlightSchedules(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFlightSchedules();
    getAirports();
    getFlights();
  }, []);
  /******************************** API CALLS ********************************/
  /******************************** FUNCTIONS ********************************/
  function setTripType(e) {
    if (e.target.id === "return") {
      /*************** update Frontend /***************/
      setReturnSelected(true);
      setOneWaySelected(false);
      const sectionDiv = document.getElementById("cardbody");
      const butt = document.getElementById("butt");
      butt.style.border = "solid 2px rgb(90,151,290)";
      butt.style.backgroundColor = "rgb(90,151,290)";
      butt.style.color = "white";
      sectionDiv.style.border = "solid 2px rgb(90,151,290)";
      /*************** update backend /***************/
    } else if (e.target.id === "oneWay") {
      /*************** update Frontend /***************/
      setReturnSelected(false);
      setOneWaySelected(true);
      const sectionDiv = document.getElementById("cardbody");
      const butt = document.getElementById("butt");
      butt.style.border = "solid 2px rgb(235,126,40)";
      butt.style.backgroundColor = "rgb(235,126,40)";
      butt.style.color = "white";
      sectionDiv.style.border = "solid 2px rgb(235,126,40)";
      /*************** update backend /***************/
    }
  }
  function handleFromSelect(e) {
    /*************** update frontend /***************/
    const chosenCity = e.target.innerText;
    const fromSelected = document.getElementById("selectedCity1");
    const h6 = document.getElementById("h6");
    fromSelected.innerText = chosenCity;
    h6.innerText = `Departing from ${chosenCity} Airport`;
    /*************** update backend /***************/
    for (let airport of airports) {
      if (airport.airportName === chosenCity) {
        setDepartingCity(airport);
      }
    }
  }
  function handleToSelect(e) {
    /*************** update frontend /***************/
    const chosenCity = e.target.innerText;
    const fromSelected = document.getElementById("selectedCity2");
    fromSelected.innerText = chosenCity;
    const h62 = document.getElementById("h62");
    fromSelected.innerText = chosenCity;
    /*************** update backend /***************/
    h62.innerText = `Destination: ${chosenCity} Airport`;
    for (let airport of airports) {
      if (airport.airportName === chosenCity) {
        setDestinationCity(airport);
      }
    }
  }

  function handlePassenger(e) {
    setAdultPassengers(numOfAdult.current.value);
    setChildPassengers(numOfChild.current.value);
    setInfantPassengers(numOfInfant.current.value);
  }
  function handleSearch() {
    setResultsModal(true);
    // console.log("departing city: ", departingCity);
    // console.log("destination city: ", destinationCity);
    // console.log("departure date: ", departureDate);
    // console.log("return date: ", returnDate);
    // console.log("adult passengers: ", adultPassengers);
    // console.log("child passengers: ", childPassengers);
    // console.log("infant passengers: ", infantPassengers);
    // console.log("seat class: ", seatSelection);
  }
  function handleSeatClassSelection(e) {
    const classType = e.target.id;
    if (classType === "First Class") {
      setSeatSelection("First Class");
      const selectedSeatType = document.getElementById("First Class");
      selectedSeatType.style.backgroundColor = "rgb(90,151,290)";
      selectedSeatType.style.color = "white";
      const unselectedSeatType = document.getElementById("Economy");
      unselectedSeatType.style.backgroundColor = "rgb(238,242,246)";
      unselectedSeatType.style.color = "black";
      const unselectedSeatType2 = document.getElementById("Business");
      unselectedSeatType2.style.backgroundColor = "rgb(238,242,246)";
      unselectedSeatType2.style.color = "black";
    } else if (classType === "Business") {
      setSeatSelection("Business");
      const selectedSeatType = document.getElementById("Business");
      selectedSeatType.style.backgroundColor = "rgb(90,151,290)";
      selectedSeatType.style.color = "white";
      const unselectedSeatType = document.getElementById("Economy");
      unselectedSeatType.style.backgroundColor = "rgb(238,242,246)";
      unselectedSeatType.style.color = "black";
      const unselectedSeatType2 = document.getElementById("First Class");
      unselectedSeatType2.style.backgroundColor = "rgb(238,242,246)";
      unselectedSeatType2.style.color = "black";
    } else {
      setSeatSelection("Economy");
      const selectedSeatType = document.getElementById("Economy");
      selectedSeatType.style.backgroundColor = "rgb(90,151,290)";
      selectedSeatType.style.color = "white";
      const unselectedSeatType = document.getElementById("Business");
      unselectedSeatType.style.backgroundColor = "rgb(238,242,246)";
      unselectedSeatType.style.color = "black";
      const unselectedSeatType2 = document.getElementById("First Class");
      unselectedSeatType2.style.backgroundColor = "rgb(238,242,246)";
      unselectedSeatType2.style.color = "black";
    }
  }
  /******************************** CODE ********************************/
  //console.log("DEPART ", departureDate, "RETURN ", returnDate);
  console.log(airports);
  return (
    <div className={styles.FlightModal}>
      {resultsModal ? (
        <ResultsModal
          setResultsModal={setResultsModal}
          departingCity={departingCity}
          setDepartingCity={setDepartingCity}
          destinationCity={destinationCity}
          setDestinationCity={setDestinationCity}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          adultPassengers={adultPassengers}
          setAdultPassengers={setAdultPassengers}
          childPassengers={childPassengers}
          setChildPassengers={setChildPassengers}
          infantPassengers={infantPassengers}
          setInfantPassengers={setInfantPassengers}
          seatSelection={seatSelection}
          setSeatSelection={setSeatSelection}
          flightSchedules={flightSchedules}
          allFlights={allFlights}
        />
      ) : (
        <></>
      )}
      <aside>
        {/*************************** TRIP TYP BUTTONS ***************************/}
        {oneWaySelected ? (
          <Button
            onClick={setTripType}
            id="oneWay"
            backgroundColor={"rgb(235,126,40)"}
            color={"white"}
          >
            One-way
          </Button>
        ) : (
          <Button onClick={setTripType} id="oneWay">
            One-way
          </Button>
        )}
        {returnSelected ? (
          <Button
            onClick={setTripType}
            id="return"
            backgroundColor={"rgb(90,151,290)"}
            color={"white"}
          >
            Return
          </Button>
        ) : (
          <Button onClick={setTripType} id="return">
            Return
          </Button>
        )}
        <h3>Book A Flight</h3>
      </aside>
      <Card
        width={"77.5vw"}
        height={"35vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        maxWidth={"2200px"}
      >
        {/*************************** DISPLAY CARD ***************************/}
        <section id="cardbody">
          <CardBody>
            {/*************************** DEPARTURE CARD ***************************/}
            <Menu>
              <MenuButton
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                width="18vw"
                height="10vw"
                maxWidth={"500px"}
                maxHeight={"11vw"}
              >
                <div className={styles.sectionCard}>
                  <h2>From</h2>
                  <h4 id="selectedCity1"></h4>
                  <h6 id="h6">Enter Departure City</h6>
                </div>
              </MenuButton>
              <MenuList>
                {airports ? (
                  airports.map((airport) => {
                    return (
                      <MenuItem onClick={handleFromSelect}>
                        {airport.airportName}
                      </MenuItem>
                    );
                  })
                ) : (
                  <></>
                )}
              </MenuList>
            </Menu>
            {/*************************** DESTINATION CARD ***************************/}
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                width="18vw"
                height="10vw"
                maxWidth={"500px"}
                maxHeight={"11vw"}
              >
                <div className={styles.sectionCard}>
                  <h2>To</h2>
                  <h4 id="selectedCity2"></h4>
                  <h6 id="h62">Enter destination</h6>
                </div>
              </MenuButton>
              <MenuList>
                {airports ? (
                  airports.map((airport) => {
                    return (
                      <MenuItem onClick={handleToSelect}>
                        {airport.airportName}
                      </MenuItem>
                    );
                  })
                ) : (
                  <></>
                )}
              </MenuList>
            </Menu>
            {/*************************** DATE CARD ***************************/}
            <Menu closeOnSelect={false}>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                width="18vw"
                height="10vw"
                maxWidth={"500px"}
                maxHeight={"11vw"}
              >
                <div className={styles.sectionCard}>
                  {returnDate === "" && departureDate === "" ? (
                    <>
                      <h2 id={styles.line}> _______</h2>
                      <h4>Select </h4>
                    </>
                  ) : (
                    <></>
                  )}
                  {returnSelected && returnDate ? (
                    <div className={styles.tripDisplay}>
                      <div>
                        <h2>Departure</h2>
                        <h4>{departureDate.toString().slice(3, 7)}</h4>
                        <h4 id={styles.dateNum}>
                          {departureDate.toString().slice(7, 10)}
                        </h4>
                        <h4>{departureDate.toString().slice(0, 3)}</h4>
                      </div>
                      <div>
                        <h2>Return</h2>
                        <h4 className={styles.returnSec}>
                          {returnDate.toString().slice(3, 7)}
                        </h4>
                        <h4 id={styles.dateNum} className={styles.returnSec}>
                          {returnDate.toString().slice(7, 10)}
                        </h4>
                        <h4 className={styles.returnSec}>
                          {returnDate.toString().slice(0, 3)}
                        </h4>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.oneWayTrip}>
                      <h2 style={{ borderBottom: "solid 1px black" }}>
                        Departing Date
                      </h2>
                      <h4>{departureDate.toString().slice(3, 7)}</h4>
                      <h4 id={styles.dateNum}>
                        {departureDate.toString().slice(7, 10)}
                      </h4>
                      <h4>{departureDate.toString().slice(0, 3)}</h4>
                    </div>
                  )}
                </div>
              </MenuButton>

              <MenuList>
                {returnSelected ? (
                  <div className={styles.datePicker}>
                    <aside>
                      <h2>Departure</h2>
                      <DatePicker
                        selected={departureDate}
                        onChange={(departureDate) =>
                          setDepartureDate(departureDate)
                        }
                      />
                    </aside>
                    <aside>
                      <h2>Return</h2>
                      <DatePicker
                        selected={returnDate}
                        onChange={(returnDate) => setReturnDate(returnDate)}
                      />
                    </aside>
                  </div>
                ) : (
                  <>
                    <h2
                      style={{
                        fontWeight: "bold",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        borderBottom: "solid 1px black",
                      }}
                    >
                      Departure
                    </h2>
                    <DatePicker
                      selected={departureDate}
                      onChange={(departureDate) =>
                        setDepartureDate(departureDate)
                      }
                    />
                  </>
                )}
              </MenuList>
            </Menu>
            {/*************************** PASSENGER CARD ***************************/}
            <Menu closeOnSelect={false}>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                width="18vw"
                height="10vw"
                maxWidth={"500px"}
                maxHeight={"11vw"}
              >
                <div className={styles.sectionCard}>
                  <h2 id={styles.line}> Passenger</h2>
                  <h4>Passenger</h4>
                  <h6>{seatSelection}</h6>
                </div>
              </MenuButton>
              <MenuList width={"25vw"} height={"40vh"} padding={"2px"}>
                <div className={styles.passengerMenu}>
                  <div className={styles.textTop}>
                    <Text>
                      <span>Passenger and cabin class</span> <br />
                      You can add up to nine passengers. Adult passengers must
                      be at least 16 to accompany a child or an infant.
                    </Text>
                  </div>
                  <div className={styles.bottomSection}>
                    <div className={styles.incrementSide}>
                      <div className={styles.increments}>
                        Adults
                        <NumberInput
                          size="xs"
                          maxW={16}
                          defaultValue={0}
                          min={0}
                          max={9}
                        >
                          <NumberInputField id="Adult" ref={numOfAdult} />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              id="Adult"
                              onClick={handlePassenger}
                            />
                            <NumberDecrementStepper
                              id="Adult"
                              onClick={handlePassenger}
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      </div>
                      <div className={styles.increments}>
                        Child
                        <NumberInput
                          size="xs"
                          maxW={16}
                          defaultValue={0}
                          min={0}
                          max={9}
                        >
                          <NumberInputField id="Child" ref={numOfChild} />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              id="Child"
                              onClick={handlePassenger}
                            />
                            <NumberDecrementStepper
                              id="Child"
                              onClick={handlePassenger}
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      </div>
                      <div className={styles.increments}>
                        Infant
                        <NumberInput
                          size="xs"
                          maxW={16}
                          defaultValue={0}
                          min={0}
                          max={9}
                        >
                          <NumberInputField id="Infant" ref={numOfInfant} />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              id="Infant"
                              onClick={handlePassenger}
                            />
                            <NumberDecrementStepper
                              id="Infant"
                              onClick={handlePassenger}
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      </div>
                    </div>
                    <div className={styles.seatClassSide}>
                      {seatClasses.map((seatClass) => {
                        return (
                          <Button
                            id={`${seatClass}`}
                            onClick={handleSeatClassSelection}
                          >
                            {seatClass}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </MenuList>
            </Menu>
            {/*************************** SEARCH BUTTON ***************************/}
            <Button id="butt" onClick={handleSearch} className={styles.search}>
              Search Flights
            </Button>
          </CardBody>
        </section>
      </Card>
    </div>
  );
}

export default FlightModal;
