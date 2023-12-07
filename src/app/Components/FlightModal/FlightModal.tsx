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

  /******************************** STATES ********************************/
  const [returnSelected, setReturnSelected] = useState(true);
  const [oneWaySelected, setOneWaySelected] = useState(false);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [seatClasses, setSeatClasses] = useState<SeatClass[]>([]);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [userQuery, setUserQuery] = useState();
  /******************************** USE EFFECTS ********************************/
  useEffect(() => {
    const getAirports = async () => {
      try {
        const response = await fetch(
          "https://irs-api.samesoft.co/airport/list"
        );
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error(error);
      }
    };
    // const getFlights = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://irs-api.samesoft.co/flight-schedule/search-flights"
    //     );
    //     const data = await response.json();
    //     console.log("FLIGHTS", data);
    //     setAirports(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    const getSeatClasses = async () => {
      try {
        const response1 = await fetch(
          "https://irs-api.samesoft.co/seat-class/list"
        );
        const data = await response1.json();

        setSeatClasses(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAirports();
    getSeatClasses();
    //getFlights();
  }, []);
  /******************************** API CALLS ********************************/
  console.log(airports);
  console.log(seatClasses);
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
    fromSelected.innerText = chosenCity;
  }

  function handleToSelect(e) {
    console.log(e.target.innerText);
    const chosenCity = e.target.innerText;
    const fromSelected = document.getElementById("selectedCity2");
    fromSelected.innerText = chosenCity;
  }
  /******************************** CODE ********************************/
  console.log("DEPART ", departureDate, "RETURN ", returnDate);
  return (
    <div className={styles.FlightModal}>
      <aside>
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
        <section id="cardbody">
          <CardBody>
            <Menu>
              <MenuButton
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                width="120w"
                height="8vw"
              >
                <div className={styles.sectionCard}>
                  <h2>From</h2>
                  <h4 id="selectedCity1">Edmonton</h4>
                  <h6>Enter Departure City</h6>
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
                height="8vw"
              >
                <div className={styles.sectionCard}>
                  <h2>To</h2>
                  <h4 id="selectedCity2"></h4>
                  <h6>Enter destination</h6>
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
                height="8vw"
              >
                <div className={styles.sectionCard}>
                  <h2 id={styles.line}> _______</h2>
                  <h4>Date</h4>
                  <h6>select departure date</h6>
                </div>
              </MenuButton>

              <MenuList>
                {returnSelected ? (
                  <>
                    <DatePicker
                      selected={departureDate}
                      onChange={(departureDate) =>
                        setDepartureDate(departureDate)
                      }
                    />
                    <DatePicker
                      selected={returnDate}
                      onChange={(returnDate) => setReturnDate(returnDate)}
                    />
                  </>
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
                height="8vw"
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
            <Button className={styles.search}>Search</Button>
          </CardBody>
        </section>
      </Card>
    </div>
  );
}

export default FlightModal;
