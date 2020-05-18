import React from "react";
import { PropTypes } from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { convertBlobToImageUrl } from "Util";

import styles from "./styles.scss";

const AthletePhoto = ({ photoData, name, onClick }) => {
  return (
    <div className={styles.root} role="button" onClick={e => onClick ? onClick(e) : {}}>
      {"data" in photoData && (
        <img
          className={styles.photo}
          src={convertBlobToImageUrl(photoData)}
          alt=""
        />
      )}
      {!("data" in photoData) && (
        <FontAwesomeIcon className={styles["blank-icon"]} icon={faUser} />
      )}
      {name && <div className={styles.name}>{name}</div>}
    </div>
  );
};

AthletePhoto.propTypes = {
  photoData: PropTypes.shape({
    type: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  name: PropTypes.string,
};

export default AthletePhoto;
