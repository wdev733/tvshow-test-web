import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

import IconButton from "@material-ui/core/IconButton";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { ScrollTop, Loading } from "Components";

import { tvshowGet } from "Redux/actions";

import styles from "./styles.scss";

const ShowDetails = (props) => {
  const { actionTvShowGet, loading } = props;

  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    actionTvShowGet(id, callbackGetTvShow);
  }, [actionTvShowGet]);

  const callbackGetTvShow = (show, cast, crew) => {
    setShow(show);
    setCast(cast);
    setCrew(crew);
  };

  const handleBack = () => {
    props.history.push("/tvshows");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={(e) => handleBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">{show ? show.name : ""}</Typography>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box my={2}>
          {loading && <Loading description="Loading..." />}
          {show && !loading && (
            <div className={styles["show-container"]}>
              <div className={styles.info}>
                <img
                  className={styles["info__poster"]}
                  src={show.image ? show.image.medium : ""}
                  alt=""
                />
                <div className={styles["info__description"]}>
                  <div className={styles["info__description__item"]}>
                    <span className={styles["info__description__item__left"]}>
                      Title:
                    </span>
                    <span className={styles["info__description__item__right"]}>
                      {show.name}
                    </span>
                  </div>
                  <div className={styles["info__description__item"]}>
                    <span className={styles["info__description__item__left"]}>
                      Language:
                    </span>
                    <span className={styles["info__description__item__right"]}>
                      {show.language}
                    </span>
                  </div>
                  <div className={styles["info__description__item"]}>
                    <span className={styles["info__description__item__left"]}>
                      Genre:
                    </span>
                    <span className={styles["info__description__item__right"]}>
                      {show.genres.join(", ")}
                    </span>
                  </div>
                  {show.premiered && (
                    <div className={styles["info__description__item"]}>
                      <span className={styles["info__description__item__left"]}>
                        Premiered:
                      </span>
                      <span
                        className={styles["info__description__item__right"]}
                      >
                        {show.premiered}
                      </span>
                    </div>
                  )}
                  {show.rating.average > 0 && (
                    <div className={styles["info__description__item"]}>
                      <span className={styles["info__description__item__left"]}>
                        Rating:
                      </span>
                      <span
                        className={styles["info__description__item__right"]}
                      >
                        {show.rating.average}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {cast.length > 0 && (
                <div className={styles["extra"]}>
                  <h1>Casts</h1>
                  {cast.map((item, index) => (
                    <div
                      className={styles["extra__item"]}
                      key={`cast-${item.person.id}-${index}`}
                    >
                      <img
                        className={styles.photo}
                        src={item.person.image.medium}
                        alt=""
                      />
                      <span className={styles.text}>{item.person.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {crew.length > 0 && (
                <div className={styles["extra"]}>
                  <h1>Crew</h1>
                  {crew.map((item, index) => (
                    <div
                      className={styles["extra__item"]}
                      key={`crew-${item.person.id}-${index}`}
                    >
                      <img
                        className={styles.photo}
                        src={item.person.image ? item.person.image.medium : ""}
                        alt=""
                      />
                      <span className={styles.text}>{item.type}</span>
                      <span className={styles.text}>{item.person.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

const mapStateToProps = ({ tvshow }) => {
  const { tvshowList, loading } = tvshow;
  return {
    tvshowList,
    loading,
  };
};

export default connect(mapStateToProps, {
  actionTvShowGet: tvshowGet,
})(ShowDetails);
