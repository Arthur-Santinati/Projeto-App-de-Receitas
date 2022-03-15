import React from 'react';
import { useHistory } from 'react-router-dom';

export default function DrinksInProgress() {
  const history = useHistory();
  return (
    <div className="container-explorer">
      DrinksInProgress
      <button
        type="button"
        className="btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe

      </button>
    </div>
  );
}
