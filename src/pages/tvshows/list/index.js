import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import StarIcon from "@material-ui/icons/Star";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SearchBar from "material-ui-search-bar";

import { ScrollTop, Loading } from "Components";
import { useDebounce } from "Util";
import { tvshowList } from "Redux/actions";

import styles from "./styles.scss";

const TvShowList = (props) => {
  const { tvshowList, loading, actionTvShowList } = props;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleSearchCancel = () => {
    setSearch("");
  };

  useEffect(() => {
    actionTvShowList("");
  }, [actionTvShowList]);

  useEffect(() => {
    handleRequestSerach();
  }, [debouncedSearch]);

  const handleRequestSerach = () => {
    actionTvShowList(search);
  };

  const handleClickShow = (id) => {
    props.history.push(`/tvshows/${id}`);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6">TV Shows</Typography>
          <div className={styles["search-wrapper"]}>
            <SearchBar
              className={styles.search}
              value={search}
              onChange={(value) => handleSearchChange(value)}
              onRequestSearch={() => handleRequestSerach()}
              onCancelSearch={() => handleSearchCancel()}
              size="small"
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box my={2}>
          {loading && <Loading description="Loading..." />}
          {!loading && (
            <div className={styles["show-container"]}>
              {tvshowList.map((item) => {
                const show = item.show ? item.show : item;
                return (
                  <Card
                    className={styles.show}
                    key={`show-${show.id}`}
                    onClick={(e) => handleClickShow(show.id)}
                  >
                    <CardMedia
                      className={styles.media}
                      image={
                        show.image
                          ? show.image.medium
                          : "/assets/images/movie.png"
                      }
                      title={show.name}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="h2"
                        className={styles.title}
                      >
                        {show.name}
                      </Typography>
                      {show.premiered && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {show.premiered}
                        </Typography>
                      )}
                      {show.rating.average > 0 && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          className={styles.rating}
                        >
                          <StarIcon className={styles.star} />{" "}
                          <span className={styles.rating}>
                            {show.rating.average}
                          </span>
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
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
  actionTvShowList: tvshowList,
})(TvShowList);
