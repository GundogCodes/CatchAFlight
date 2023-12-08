"use client";
import React, { useEffect, useState } from "react";
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
function FlightModal() {
  /******************************** VARIABLES ********************************/
  interface Airport {
    airportCode: string;
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

  /******************************** STATES ********************************/
  const [returnSelected, setReturnSelected] = useState(true);
  const [oneWaySelected, setOneWaySelected] = useState(false);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flightSchedules, setFlightSchedules] = useState<FlightSchedules[]>([]);
  const [seatClasses, setSeatClasses] = useState([
    "First Class",
    "Business",
    "Economy",
  ]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [userQuery, setUserQuery] = useState();
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
          "https://irs-api-4e39390b0223.herokuapp.com/flight-schedule/get-all-flight-schedules"
        );
        const data = await response.json();
        setFlightSchedules(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFlights();
    getAirports();
  }, []);
  /******************************** API CALLS ********************************/
  console.log("AIRPORTS", airports);
  console.log("SEAT CLASSES", seatClasses);
  console.log("FLIGHT SCHEDULES", flightSchedules);
  /******************************** FUNCTIONS ********************************/
  function setTripType(e) {
    if (e.target.id === "return") {
      /*************** update Frontend /***************/
      setReturnSelected(true);
      setOneWaySelected(false);
      const sectionDiv = document.getElementById("cardbody");
      sectionDiv.style.backgroundColor = "rgb(90,151,290)";
      console.log(sectionDiv);
      /*************** update backend /***************/
    } else if (e.target.id === "oneWay") {
      /*************** update Frontend /***************/
      setReturnSelected(false);
      setOneWaySelected(true);
      const sectionDiv = document.getElementById("cardbody");
      sectionDiv.style.backgroundColor = "rgb(235,126,40)";
      /*************** update backend /***************/
    }
  }

  function handleFromSelect(e) {
    const chosenCity = e.target.innerText;
    const fromSelected = document.getElementById("selectedCity1");
    const h6 = document.getElementById("h6");
    fromSelected.innerText = chosenCity;
    h6.innerText = `Departing from ${chosenCity}`;
  }

  function handleToSelect(e) {
    console.log(e.target.innerText);
    const chosenCity = e.target.innerText;
    const fromSelected = document.getElementById("selectedCity2");
    fromSelected.innerText = chosenCity;
    const h62 = document.getElementById("h62");
    fromSelected.innerText = chosenCity;
    h62.innerText = `Destination: ${chosenCity}`;
  }
  /******************************** CODE ********************************/
  console.log("DEPART ", departureDate, "RETURN ", returnDate);
  return (
    <div className={styles.FlightModal}>
      <aside>
        {/*************************** TRIP TYP BUTTONS ***************************/}
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
      </aside>
      <Card
        width={"77.5vw"}
        height={"35vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
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
                width="120w"
                height="10vw"
              >
                <div className={styles.sectionCard}>
                  <h2>From</h2>
                  <h4 id="selectedCity1">Edmonton</h4>
                  <h6 id="h6">Enter Departure City</h6>
                </div>
              </MenuButton>
              <MenuList>
                {airports ? (
                  airports.map((airport) => {
                    return (
                      <MenuItem onClick={handleFromSelect}>
                        {airport.airportCode}
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
                width="20vw"
                height="10vw"
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
                        {airport.airportCode}
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
                width="120w"
                height="10vw"
              >
                <div className={styles.sectionCard}>
                  {returnDate ? (
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
                    <>
                      <h2 id={styles.line}> _______</h2>
                      <h4>Date</h4>
                      <h6>select departure date</h6>
                    </>
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
                  <DatePicker
                    selected={departureDate}
                    onChange={(departureDate) =>
                      setDepartureDate(departureDate)
                    }
                  />
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
                width="20vw"
                height="10vw"
              >
                <div className={styles.sectionCard}>
                  <h2 id={styles.line}> Passenger</h2>
                  <h4>Passenger</h4>
                  <h6>select departure date</h6>
                </div>
              </MenuButton>
              <MenuList width={"25vw"} height={"40vh"}>
                <Text marginLeft={"1vw"}>
                  <span style={{ fontWeight: "bold" }}>
                    Passenger and cabin class
                  </span>
                  <br />
                  You can add up to nine passengers. <br />
                  Adult passengers must be at least 16 to accompany a child or
                  an infant.
                </Text>

                <MenuItem
                  display={"flex"}
                  marginLeft={"1vw"}
                  height={"8vh"}
                  width={"21vw"}
                  borderRadius={"3px"}
                  justifyContent={"space-around"}
                  _hover={{ bg: "none" }}
                >
                  Adult
                  <NumberInput
                    marginLeft={"1vw"}
                    step={1}
                    defaultValue={0}
                    min={0}
                    max={30}
                    width={"5vw"}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>{" "}
                  <Button marginTop={"10vh"} height={"7vh"}>
                    Economy
                  </Button>
                </MenuItem>
                <MenuItem
                  display={"flex"}
                  marginLeft={"1vw"}
                  height={"8vh"}
                  width={"21vw"}
                  borderRadius={"3px"}
                  justifyContent={"space-around"}
                  _hover={{ bg: "none" }}
                >
                  Child
                  <NumberInput
                    marginLeft={"1vw"}
                    step={1}
                    defaultValue={0}
                    min={0}
                    max={30}
                    width={"5vw"}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>{" "}
                  <Button marginTop={"10vh"} height={"7vh"}>
                    Business
                  </Button>
                </MenuItem>
                <MenuItem
                  display={"flex"}
                  height={"8vh"}
                  width={"21vw"}
                  borderRadius={"3px"}
                  marginLeft={"3vh"}
                  _hover={{ bg: "none" }}
                >
                  Infant
                  <NumberInput
                    marginLeft={"2vw"}
                    step={1}
                    defaultValue={0}
                    min={0}
                    max={30}
                    width={"5vw"}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </MenuItem>
              </MenuList>
            </Menu>
            {/*************************** SEARCH BUTTON ***************************/}
            <Button className={styles.search}>Search Flights</Button>
          </CardBody>
        </section>
      </Card>
    </div>
  );
}

export default FlightModal;
