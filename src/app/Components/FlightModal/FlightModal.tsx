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
  const cardBody = useRef(null);
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
  const [returnSelected, setReturnSelected] = useState<boolean>(false);
  const [oneWaySelected, setOneWaySelected] = useState<boolean>(true);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flightSchedules, setFlightSchedules] = useState<FlightSchedules[]>([]);
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [resultsModal, setResultsModal] = useState<boolean>(false);
  const [seatSelection, setSeatSelection] = useState<string>("Economy");
  const [seatClasses, setSeatClasses] = useState<string[]>([
    "First Class",
    "Business",
    "Economy",
  ]);
  const [adultPassengers, setAdultPassengers] = useState<number>(0);
  const [childPassengers, setChildPassengers] = useState<number>(0);
  const [infantPassengers, setInfantPassengers] = useState<number>(0);

  const [departureDate, setDepartureDate] = useState<string>("");
  const [departingCity, setDepartingCity] = useState<Airport | null>(null);
  const [destinationCity, setDestinationCity] = useState<Airport | null>(null);
  const [returnDate, setReturnDate] = useState<string>("");
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
  function setTripType(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "return") {
      /*************** update Frontend /***************/
      setReturnSelected(true);
      setOneWaySelected(false);
      const sectionDiv = document.getElementById(
        "cardbody"
      ) as HTMLDivElement | null;
      const butt = document.getElementById("butt") as HTMLButtonElement | null;

      if (butt && sectionDiv) {
        butt.style.border = "solid 2px rgb(90,151,290)";
        butt.style.backgroundColor = "rgb(90,151,290)";
        butt.style.color = "white";
        sectionDiv.style.border = "solid 2px rgb(90,151,290)";
      }

      /*************** update backend /***************/
    } else if (e.target.id === "oneWay") {
      /*************** update Frontend /***************/
      setReturnSelected(false);
      setOneWaySelected(true);
      const sectionDiv = document.getElementById(
        "cardbody"
      ) as HTMLDivElement | null;
      const butt = document.getElementById("butt") as HTMLButtonElement | null;

      if (butt && sectionDiv) {
        butt.style.border = "solid 2px rgb(90,151,290)";
        butt.style.backgroundColor = "rgb(90,151,290)";
        butt.style.color = "white";
        sectionDiv.style.border = "solid 2px rgb(90,151,290)";
      }

      /*************** update backend /***************/
    }
  }
  function handleFromSelect(e: React.ChangeEvent<HTMLInputElement>) {
    /*************** update frontend /***************/
    const chosenCity = e.target.innerText;
    const fromSelected = document.getElementById(
      "selectedCity1"
    ) as HTMLDivElement | null;
    const h6 = document.getElementById("h6") as HTMLHeadingElement | null;

    if (fromSelected && h6) {
      fromSelected.innerText = chosenCity;
      h6.innerText = `Departing from ${chosenCity}`;
    }

    /*************** update backend /***************/
    for (let airport of airports) {
      if (airport.airportName === chosenCity) {
        setDepartingCity(airport);
      }
    }
  }

  function handleToSelect(e: React.ChangeEvent<HTMLInputElement>) {
    /*************** update frontend /***************/
    const chosenCity = e.target.innerText;
    const fromSelected = document.getElementById(
      "selectedCity2"
    ) as HTMLDivElement | null;
    const h62 = document.getElementById("h62") as HTMLHeadingElement | null;

    if (fromSelected && h62) {
      fromSelected.innerText = chosenCity;
      /*************** update backend /***************/
      h62.innerText = `Destination: ${chosenCity}`;
    }

    for (let airport of airports) {
      if (airport.airportName === chosenCity) {
        setDestinationCity(airport);
      }
    }
  }

  function handlePassenger(e: React.ChangeEvent<HTMLInputElement>) {
    const adultValue = parseInt(numOfAdult.current?.value ?? "0", 10);
    const childValue = parseInt(numOfChild.current?.value ?? "0", 10);
    const infantValue = parseInt(numOfInfant.current?.value ?? "0", 10);

    setAdultPassengers(adultValue);
    setChildPassengers(childValue);
    setInfantPassengers(infantValue);
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
  function handleSeatClassSelection(e: React.ChangeEvent<HTMLInputElement>) {
    const classType = e.target.id;
    const seatTypes = ["First Class", "Business", "Economy"];

    setSeatSelection(classType);

    seatTypes.forEach((type) => {
      const element = document.getElementById(type);
      if (element) {
        if (type === classType) {
          element.style.backgroundColor = "rgb(90,151,290)";
          element.style.color = "white";
        } else {
          element.style.backgroundColor = "rgb(238,242,246)";
          element.style.color = "black";
        }
      }
    });
  }

  /******************************** CODE ********************************/
  // if(window.innerWidth < 900){
  //   console.log('SMALLL SCREEEn')
  //   cardBody.current.style.flex ='display'
  // }
  return (
    <div className={styles.FlightModal}>
      {resultsModal ? (
        <ResultsModal
          airports={airports}
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
        {/*************************** TRIP TYPE BUTTONS ***************************/}
        {oneWaySelected ? (
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => setTripType(e)}
            id="oneWay"
            backgroundColor={"rgb(235,126,40)"}
            color={"white"}
          >
            <Text>One-way</Text>
          </Button>
        ) : (
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => setTripType(e)}
            id="oneWay"
          >
            <Text>One-way</Text>
          </Button>
        )}
        {/* {returnSelected ? (
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
        )} */}
        <h3>
          <Text>Book A Flight</Text>
        </h3>
      </aside>
      <Card
        width={"80vw"}
        height={{ base: "80vh", md: "35vh" }}
        display={{ base: "flex", md: "flex" }}
        justifyContent={{ base: "center", md: "center" }}
        alignItems={"center"}
        flexDirection={"column"}
        maxWidth={"2200px"}
      >
        {/*************************** DISPLAY CARD ***************************/}
        <section id="cardbody">
          <CardBody
            ref={cardBody}
            display={{ base: "flex", md: "flex" }}
            height={{ base: "60vh", md: "10vh" }}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{ base: "center", md: "center" }}
          >
            {/*************************** DEPARTURE CARD ***************************/}
            <Menu>
              <MenuButton
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                width={{ base: "60vw", md: "18vw" }}
                height={{ base: "16vh", md: "10vw" }}
                maxWidth={"500px"}
                margin={"12px"}
              >
                <div className={styles.sectionCard}>
                  <h2>
                    <Text>From</Text>
                  </h2>
                  <h4 id="selectedCity1"></h4>
                  <h6 id="h6">
                    <Text>Enter Departure City</Text>
                  </h6>
                </div>
              </MenuButton>
              <MenuList>
                {airports ? (
                  airports.map((airport) => {
                    return (
                      <MenuItem
                        key={airport.airportId}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleFromSelect
                        }
                      >
                        {airport.city}
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
                width={{ base: "60vw", md: "18vw" }}
                height={{ base: "16vh", md: "10vw" }}
                maxWidth={"500px"}
                margin={"12px"}
              >
                <div className={styles.sectionCard}>
                  <h2>To</h2>
                  <h4 id="selectedCity2"></h4>
                  <h6 id="h62">
                    <Text>Enter destination</Text>
                  </h6>
                </div>
              </MenuButton>
              <MenuList>
                {airports ? (
                  airports.map((airport) => {
                    return (
                      <MenuItem
                        key={airport.airportId}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleToSelect
                        }
                      >
                        {airport.city}
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
                width={{ base: "60vw", md: "18vw" }}
                height={{ base: "16vh", md: "10vw" }}
                maxWidth={"500px"}
                margin={"12px"}
              >
                <div id={styles.dateCard} className={styles.sectionCard}>
                  {returnDate === "" && departureDate === "" ? (
                    <>
                      <h2 id={styles.line}> _______</h2>
                      <h4>
                        <Text>Select</Text>{" "}
                      </h4>
                    </>
                  ) : (
                    <></>
                  )}
                  {returnSelected && returnDate ? (
                    <div className={styles.tripDisplay}>
                      <div>
                        <h2>
                          <Text>Departure</Text>
                        </h2>
                        <h4>{departureDate.toString().slice(3, 7)}</h4>
                        <h4 id={styles.dateNum}>
                          {departureDate.toString().slice(7, 10)}
                        </h4>
                        <h4>{departureDate.toString().slice(0, 3)}</h4>
                      </div>
                      <div>
                        <h2>
                          <Text>Return</Text>
                        </h2>
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
                        <Text> Departing Date</Text>
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
                      <h2>
                        <Text>Departure</Text>
                      </h2>
                      <DatePicker
                        selected={departureDate}
                        onChange={(newDate: Date | null) =>
                          setDepartureDate(newDate)
                        }
                      />
                    </aside>
                    <aside>
                      <h2>
                        <Text>Return</Text>
                      </h2>
                      <DatePicker
                        selected={departureDate}
                        onChange={(newDate: Date | null) =>
                          setDepartureDate(newDate)
                        }
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
                      <Text>Departure</Text>
                    </h2>
                    <DatePicker
                      selected={departureDate}
                      onChange={(newDate: Date | null) =>
                        setDepartureDate(newDate)
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
                width={{ base: "60vw", md: "18vw" }}
                height={{ base: "16vh", md: "10vw" }}
                maxWidth={"500px"}
                margin={"12px"}
              >
                <div className={styles.sectionCard}>
                  <h2 id={styles.line}> Passenger</h2>
                  {adultPassengers > 0 ||
                  infantPassengers > 0 ||
                  childPassengers > 0 ? (
                    <h4>
                      {parseInt(adultPassengers) +
                        parseInt(infantPassengers) +
                        parseInt(childPassengers)}
                      Passengers
                    </h4>
                  ) : (
                    <h4> Passenger</h4>
                  )}
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
                        <Text>Adults</Text>
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
                        <Text>Child</Text>
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
                        <Text>Infant</Text>
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
                            key={seatClass}
                            id={`${seatClass}`}
                            onClick={(e) => handleSeatClassSelection(e)}
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
          </CardBody>
        </section>
      </Card>
      <div className={styles.buttonDiv}>
        <Button
          id="butt"
          onClick={handleSearch}
          className={styles.search}
          justifySelf={"flex-end"}
        >
          Search Flights
        </Button>
      </div>
    </div>
  );
}

export default FlightModal;
