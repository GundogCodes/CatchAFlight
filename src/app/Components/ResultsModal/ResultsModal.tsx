import React from "react";
import styles from "./ResultsModal.module.scss";
import { CloseIcon } from "@chakra-ui/icons";
function ResultsModal({ userQuery, setResultsModal }) {
  function handleOffClick() {
    setResultsModal(false);
  }

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
