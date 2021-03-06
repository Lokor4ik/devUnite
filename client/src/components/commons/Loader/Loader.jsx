﻿import React from 'react';
import Loader from 'react-loader';

const Loading = () => {
  const options = {
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: false,
    zIndex: 2e9,
    top: '50%',
    left: '50%',
    scale: 1,
    loadedClassName: 'loadedContent',
  };

  return (
    <div className="loader">
      <Loader
        options={options}
        className="spinner"
      />
    </div>
  );
};

export default Loading;
