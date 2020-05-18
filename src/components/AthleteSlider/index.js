import React, { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";

import {AthletePhoto} from "Components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.scss";
import classnames from "classnames";

const useResize = () => {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.clientWidth,
        height: window.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return dimensions;
};

const AthleteSlider = (props) => {
  const { className, data, photos, onClick } = props;
  const [leftArrowVisible, setLeftArrowVisible] = useState(false);
  const [rightArrowVisible, setRightArrowVisible] = useState(false);
  const dimensions = useResize();

  const root = useRef(null);
  const container = useRef(null);
  const dragRef = useRef(null);

  const updateArrowsVisibility = () => {
    setLeftArrowVisible(root.current.scrollLeft > 0);
    setRightArrowVisible(
      container.current.clientWidth - root.current.scrollLeft >
        root.current.clientWidth
    );
  };

  useEffect(() => {
    if (!container.current || !root.current) {
      return;
    }
    updateArrowsVisibility();
  }, [data, className, dimensions]);

  // during dragging scroll happens, which triggers rerender but our old data will be lost,
  // so need to cache it
  const [dragData] = useState({
    dragStart: null,
    dragEnd: null,
    oldScroll: null,
    dragStartTimestamp: null,
  });

  const [chevronScrollInfo] = useState({
    chevronScrollAction: null,
    scrollAmount: 0,
  });

  // debounced scroll
  const scrollPanel = (direction) => {
    if (chevronScrollInfo.chevronScrollAction) {
      clearTimeout(chevronScrollInfo.chevronScrollAction);
    }
    const sgn = direction === "left" ? -1 : 1;
    chevronScrollInfo.scrollAmount =
      2 * chevronScrollInfo.scrollAmount + root.current.clientWidth * 0.3 * sgn;
    chevronScrollInfo.chevronScrollAction = setTimeout(() => {
      root.current.scrollBy({
        left: chevronScrollInfo.scrollAmount,
        behavior: "smooth",
      });
      Object.assign(chevronScrollInfo, {
        chevronScrollAction: null,
        scrollAmount: 0,
      });
    }, 200);
  };

  return (
    <div className={classnames(styles["main"])}>
      <div
        className={classnames(
          styles.arrow,
          styles.arrowleft,
          leftArrowVisible ? styles.visible : null
        )}
        onClick={() => scrollPanel("left")}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div
        className={classnames(
          styles.arrow,
          styles.arrowright,
          rightArrowVisible ? styles.visible : null
        )}
        onClick={() => scrollPanel("right")}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div
        ref={root}
        draggable
        className={classnames(styles["panel"], className)}
        onScroll={updateArrowsVisibility}
        onDragStart={(e) => {
          e.dataTransfer.setDragImage(dragRef.current, 0, 0);
          dragData.dragStart = e.pageX;
          dragData.dragStartTimestamp = Date.now();
          dragData.oldScroll = root.current.scrollLeft;
        }}
        onDragOver={(e) => {
          const dragEnd = e.pageX;
          const distance = dragEnd - dragData.dragStart;
          root.current.scrollLeft = dragData.oldScroll - distance;
        }}
        onDragEnd={(e) => {
          const dragEnd = e.pageX;
          const distance = dragEnd - dragData.dragStart;
          const dragEndTimestamp = Date.now();
          const timeDelta = dragEndTimestamp - dragData.dragStartTimestamp;
          const factor = timeDelta > 800 ? 1 : Math.min(2000 / timeDelta, 10);
          const finalScroll = dragData.oldScroll - distance * factor;
          root.current.scrollTo({
            left: finalScroll,
            behavior: "smooth",
          });
        }}
      >
        <div
          ref={dragRef}
          style={{ position: "fixed", width: "1px", height: "1px" }}
        />
        <div ref={container} className={styles.container}>
          {data.map((d) => (
            <AthletePhoto
              onClick={e => {onClick(e, d.id)}}
              key={d.id}
              photoData={photos[d.photo]}
              name={`${d.name} ${d.surname}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

AthleteSlider.defaultProps = {
  onClick: () => null,
};

AthleteSlider.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  photos: PropTypes.shape({}),
};

export default AthleteSlider;
