"use client";
import React from "react";
import styles from "./FrontPage.module.scss";
import FlightModal from "@/app/Components/FlightModal/FlightModal";

function Frontpage() {
  return (
    <div className={styles.FrontPage}>
      <h1>FLIGHT CLUB</h1>
      <FlightModal />
    </div>
  );
}

export default Frontpage;
