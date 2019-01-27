import React from 'react';
import classes from './NewSeason.module.css';

const NewSeason = () => {
  return (
    <div className={classes.NewSeason}>
      <h3>Pick a template:</h3>
      <p>Beginner</p>
      <p>Intermediate</p>
      <p>Advanced</p>
      <p>Trad</p>
      <p>Bouldering</p>
      <h3>Or create your own:</h3>
      <p>Blank template</p>
    </div>
  );
};

export default NewSeason;
