import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { ApiDrinkById } from '../services/ApiDrinks';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function DrinksInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const SIX = 6;
  const { copySuccess, setCopySuccess, isFav, setIsFav } = useContext(MyContext);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [paragraphy, setParagraphy] = useState([]);

  function setingFavorite() {
    const drink = drinkDetail[0];
    const typeOf = history.location.pathname.slice(1, SIX);
    const obj = [{
      id,
      type: typeOf,
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    }];
    const obj1 = {
      id,
      type: typeOf,
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };
    setIsFav(true);
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
    ) {
      if ((localStorage.getItem('favoriteRecipes')).includes(id)) {
        setIsFav(false);
        const itemWillBeRemoved = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const testando = itemWillBeRemoved.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(testando));
        return;
      }
      const newObjt = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const progressRecipes = [...newObjt, obj1];
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(progressRecipes));
    }
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) === null
    ) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(obj));
    }
  }

  useEffect(() => {
    async function getId() {
      const result = await ApiDrinkById(id);
      const ingredientsName = Object.entries(result[0])
        .filter((item) => item[0].includes('strIngredient'))
        .filter((item) => item[1] !== '' && item[1] !== ' ' && item[1] !== null)
        .map((item) => item[1]);
      const MeasureName = Object.entries(result[0])
        .filter((item) => item[0].includes('strMeasure'))
        .filter((item) => item[1] !== '' && item[1] !== ' ' && item[1] !== null)
        .map((item) => item[1]);
      console.log('medidas', MeasureName);
      setParagraphy(ingredientsName);
      setDrinkDetail(result);
    }
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
      if ((localStorage.getItem('favoriteRecipes')).includes(id)) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
    getId();
  }, [id, setIsFav]);

  function copyingLink() {
    const doThis = async () => {
      await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
      setCopySuccess(true);
      return copySuccess;
    };
    doThis();
  }
  return (
    <div className="container-recipes">
      {drinkDetail.map((item) => (
        <div
          className="card"
          key={ item.idDrink }
        >
          <img
            src={ item.strDrinkThumb }
            alt="ImageCard"
            className="ImageProgress"
            data-testid="recipe-photo"
          />
          <div className="title-btn">
            <h4 data-testid="recipe-title" className="name">
              {item.strDrink}
            </h4>
            <div>
              <button
                type="button"
                className="btn-recipe"
                onClick={ setingFavorite }
              >
                <img
                  alt="favorite"
                  data-testid="favorite-btn"
                  src={ isFav ? blackHeartIcon : whiteHeartIcon }
                />
              </button>
              <button
                type="button"
                className="btn-recipe"
                data-testid="share-btn"
                onClick={ () => copyingLink() }
              >
                <img
                  alt="favorite"
                  src={ shareIcon }
                />
              </button>
              { copySuccess && <span>Link copied!</span>}
            </div>
          </div>
          <p data-testid="recipe-category">{ item.strCategory }</p>
          <h4>Instructions</h4>
          <p data-testid="recipe-category">{ item.strAlcoholic }</p>
          <p data-testid="instructions">
            { item.strInstructions }
          </p>
          <h4>Ingredients</h4>
          <div>
            {paragraphy.map((ingrid, index) => (
              <div
                key={ ingrid }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  value={ `${item[`strIngredient${index + 1}`]}
              : ${item[`strMeasure${index + 1}`]}` }
                />
                {`${item[`strIngredient${index + 1}`]}
              : ${item[`strMeasure${index + 1}`]}` }
              </div>
            )) }
          </div>
        </div>
      ))}
      <button
        type="button"
        className="continue_btn"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>
  );
}
