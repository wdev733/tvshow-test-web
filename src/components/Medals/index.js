import React from "react";
import { PropTypes } from "prop-types";

import styles from "./style.scss";

const Medals = ({ gameResult }) => {
  return (
    <div className={styles.root}>
      <ul>
        {gameResult.map((game) => (
          <li className={styles["game-wrapper"]} key={game.city}>
            <div className={styles.city}>&bull; {game.city}</div>
            <div className={styles.space}></div>
            <div className={styles["medal-container"]}>
              {game.gold > 0 && (
                <div className={styles["medal-wrapper"]}>
                  <span>{game.gold}</span>
                  <img
                    className={styles.medal}
                    src="/assets/images/medal_gold.png"
                    alt="gold"
                  />
                </div>
              )}
              {game.silver > 0 && (
                <div className={styles["medal-wrapper"]}>
                  <span>{game.silver}</span>
                  <img
                    className={styles.medal}
                    src="/assets/images/medal_silver.png"
                    alt="silver"
                  />
                </div>
              )}
              {game.bronze > 0 && (
                <div className={styles["medal-wrapper"]}>
                  <span>{game.bronze}</span>
                  <img
                    className={styles.medal}
                    src="/assets/images/medal_bronze.png"
                    alt="bronze"
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Medals.propTypes = {
  gameResult: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string,
      year: PropTypes.number,
      gold: PropTypes.number,
      silver: PropTypes.number,
      bronze: PropTypes.number,
    })
  ).isRequired,
};

export default Medals;
