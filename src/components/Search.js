import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import '../pages/style/Search.css';

function Search() {
  const { setInputValue, inputValue,
    ingredientSelect,
    nameSelect,
    firstLetterSelect,
    searchButton,
  } = useContext(MyContext);

  return (
    <section className="search">
      <div>
        <label htmlFor="ingredient" className="label-radio">
          <input
            type="radio"
            name="radiosButtons"
            id="ingredient"
            className="radio-input"
            data-testid="ingredient-search-radio"
            onClick={ ingredientSelect }
          />
          Ingredient
        </label>
        <label htmlFor="name" className="label-radio">
          <input
            type="radio"
            id="name"
            name="radiosButtons"
            className="radio-input"
            data-testid="name-search-radio"
            onClick={ nameSelect }
          />
          Name
        </label>
        <label htmlFor="first-letter" className="label-radio">
          <input
            type="radio"
            className="radio-input"
            id="first-letter"
            name="radiosButtons"
            data-testid="first-letter-search-radio"
            onClick={ firstLetterSelect }
          />
          First Letter
        </label>
      </div>
      <input
        type="text"
        data-testid="search-input"
        className="input-search"
        value={ inputValue }
        onChange={ ({ target }) => setInputValue(target.value) }
      />
      <button
        type="button"
        className="btn-search"
        data-testid="exec-search-btn"
        onClick={ searchButton }
      >
        Search
      </button>
    </section>
  );
}

export default Search;
