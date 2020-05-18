import React from "react";
import { PropTypes } from "prop-types";

import ReactLoading from "react-loading";

import styles from "./styles.scss";

const Loading = ({ description }) => {
  return (
    <div className={styles.root}>
      <ReactLoading type={"bars"} color={"grey"} />
      <h3>{description}</h3>
    </div>
  );
};

Loading.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Loading;
