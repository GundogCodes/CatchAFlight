"use client";
import React from "react";
import styles from "./FrontPage.module.scss";
import FlightModal from "@/app/Components/FlightModal/FlightModal";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
  useSteps,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
function Frontpage() {
  function Example() {
    const { activeStep } = useSteps({
      index: 1,
      count: steps.length,
    });
  }

  const steps = [
    { title: "First", description: "Select Departure " },
    { title: "Second", description: "Select Destination" },
    { title: "Third", description: "Select Dates" },
    { title: "Fourth", description: "Select Passenger(s)" },
  ];

  return (
    <div className={styles.FrontPage}>
      <div className={styles.top}>
        <h1>FLIGHT CLUB</h1>
        <nav>
          <div className={styles.menus}>
            <Menu>
              <MenuButton
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "rgb(180,217,247).400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                marginLeft={"30px"}
                height={"4vh"}
                paddingInline={"2px"}
                color={"white"}
                border={"none"}
              >
                Book and Manage
              </MenuButton>
              <MenuList>
                <MenuItem>Book a flight </MenuItem>
                <MenuItem>Meet and greet</MenuItem>
                <MenuItem>Home check-in</MenuItem>
                <MenuItem>Airport transfer</MenuItem>
                <MenuItem>Book a Flight + Hotel</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "rgb(180,217,247).400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                marginLeft={"30px"}
                height={"4vh"}
                paddingInline={"2px"}
                color={"white"}
                border={"none"}
              >
                Fly with us
              </MenuButton>
              <MenuList>
                <MenuItem>Plan</MenuItem>
                <MenuItem>Baggage</MenuItem>
                <MenuItem> Fare types and rules</MenuItem>
                <MenuItem>Timetable</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "rgb(180,217,247).400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                marginLeft={"30px"}
                height={"4vh"}
                paddingInline={"2px"}
                color={"white"}
                border={"none"}
              >
                Destinations
              </MenuButton>
              <MenuList>
                <MenuItem>Where we fly</MenuItem>
                <MenuItem>Popular Getaways</MenuItem>
                <MenuItem>Explore</MenuItem>
                <MenuItem>New Destinations</MenuItem>
                <MenuItem>All Destinations</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </nav>
      </div>
      <Stepper
        border={"solid 2px white"}
        width={"77.5vw"}
        padding={"5px"}
        borderRadius={"18px"}
        margin={"20px"}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <FlightModal />
      <div className={styles.bottom}>
        <Card height={"95%"} width={"24%"}>
          <CardBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text>
              <Image src="https://www.flydubai.com/en/media/skywards2_tcm8-163766_w265.jpg" />
              <span>Emirates Skywards</span>
              <br />
              The Emirates Skywards programme has four membership tiers
            </Text>
          </CardBody>
        </Card>
        <Card height={"95%"} width={"24%"}>
          <CardBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text>
              <Image src="https://www.flydubai.com/en/media/Buy-extras-flydubai-2x-668x460_tcm8-165717_w265.jpg" />
              <span>Holidays By FlightClub</span>
              <br />
              We make it our mission to create exciting, memory-worthy and
              pocket-friendly
            </Text>
          </CardBody>
        </Card>
        <Card height={"95%"} width={"24%"}>
          <CardBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text>
              <Image src="https://www.flydubai.com/en/media/Holidays-callout-homepage-2x-668x460_tcm8-164517_w265.jpg" />
              <span>Add Extras</span>
              <br />
              Select your preferred seat and meal, add travel insurance or
              <br />
              buy...
            </Text>
          </CardBody>
        </Card>
        <Card height={"95%"} width={"24%"}>
          <CardBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text>
              <Image src="https://www.flydubai.com/en/media/Flight-status-flydubai-2x-668x460_tcm8-168029_w265.jpg" />
              <span>Flight Status</span>
              <br />
              Setting off for the airport? Before you go, here's where you can
              ...
            </Text>
          </CardBody>
        </Card>
      </div>
      <footer>
        <div className={styles.footerSection}>
          <label>
            <h6>Flight Club</h6>
            <p>Policies</p>
            <p>Terms and conditions</p>
          </label>
        </div>
        <div className={styles.footerSection}>
          <label>
            <h6>Book a flight</h6>
            <p>Offers</p>
            <p>Destinations</p>
            <p>Baggage</p>
          </label>
        </div>
        <div className={styles.footerSection}>
          <label>
            <h6>Manage your booking</h6>
            <p>News</p>
            <p>Contact us</p>
          </label>
        </div>
        <div className={styles.footerSection}>
          <label>
            <h6>Online check-in</h6>
            <p>FAQs</p>
            <p>Cargo</p>
          </label>
        </div>
      </footer>
    </div>
  );
}

export default Frontpage;
