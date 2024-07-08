import React from 'react';

const Info = ({ name, param }) => {
  return (
    <div>
      <b>{name}</b>
      <p>{param}</p>
    </div>
  );
};

export default Info;
