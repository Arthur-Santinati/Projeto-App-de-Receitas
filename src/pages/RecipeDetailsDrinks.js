import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { ApiDrinkById } from '../services/ApiDrinks';
import { ApiFoodRecomendation } from '../services/ApiMeals';
import MyContext from '../context/MyContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Paragrafo from '../components/Paragrafo';
import './style/Recomend.css';
import './style/RecipeDetails.css';

function RecipeDetailsDrinks() {
  const history = useHistory();
  const {
    isFav,
    setIsFav,
    copySuccess,
    setCopySuccess,
    drinkDetails,
    setDrinkDetails,
    drinkRecomended,
    setDrinkRecomended,
    buttonChecked,
    setButtonChecked,
    NUMBER_SIX,
  } = useContext(MyContext);
  const SIX = 6;
  const { id } = useParams();
  const [paragraphy, setParagraphy] = useState([]);

  useEffect(() => {
    async function getId() {
      const result = await ApiDrinkById(id);
      const ingredientsName = Object.entries(result[0])
        .filter((item) => item[0].includes('strIngredient'))
        .filter((item) => item[1] !== '' && item[1] !== ' ' && item[1] !== null)
        .map((item) => item[1]);
      setParagraphy(ingredientsName);
      return setDrinkDetails(result);
    }

    async function getRecomendation() {
      const result = await ApiFoodRecomendation();
      const filter = result.slice(0, NUMBER_SIX);
      return setDrinkRecomended(filter);
    }
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      if ((localStorage.getItem('inProgressRecipes')).includes(id)) {
        setButtonChecked(true);
      } else {
        setButtonChecked(false);
      }
    }
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
      if ((localStorage.getItem('favoriteRecipes')).includes(id)) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
    getId();
    getRecomendation();
  }, [id, NUMBER_SIX, setDrinkDetails, setDrinkRecomended, setButtonChecked, setIsFav]);

  function copyingLink() {
    const doThis = async () => {
      await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
      setCopySuccess(true);
      // REFERÊNCIA: https://stackoverflow.com/questions/65930199/copy-active-browsers-url-to-clipboard-with-reactjs
    };
    doThis();
  }

  function isStartedFunc() {
    const obj = [{ cocktails: { [id]: paragraphy } }];
    const obj1 = { cocktails: { [id]: paragraphy } };
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      const newObjt = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const progressRecipes = [...newObjt, obj1];
      localStorage.setItem('inProgressRecipes', JSON
        .stringify(progressRecipes));
    }
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify(obj));
    }
    history.push(`/drinks/${id}/in-progress`);
  }

  function setingFavorite() {
    const drink = drinkDetails[0];
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

  return (
    <section className="container-recipes">
      {drinkDetails.map((item, index) => (
        <div
          className="card"
          key={ item.idDrink }
        >
          <img
            src={ item.strDrinkThumb }
            alt="ImageCard"
            className="imgDrink"
            data-testid="recipe-photo"
          />
          <h4 data-testid="recipe-title">
            {item.strDrink}
          </h4>
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
          <p data-testid="recipe-category">{ item.strCategory }</p>
          <div>
            <h4>instructions</h4>
            <p data-testid="recipe-category">{ item.strAlcoholic }</p>
            <p data-testid="instructions">
              { item.strInstructions }
            </p>
          </div>
          <iframe title="video" data-testid="video" src="">Video</iframe>
          <div>
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
            />
            <div>
              <h4>Ingredients</h4>
              <Paragrafo iten={ item } paragraphy={ paragraphy } />
            </div>
            <div
              className="containerRecomend"
            >
              <h4>Receitas recomendadas</h4>
              <div className="cardRecomend">
                {drinkRecomended
                  .map((food, ind) => (
                    <div
                      className="cardRecomend2"
                      key={ food.strMeal }
                      data-testid={ `${ind}-recomendation-card` }
                    >
                      <Link
                        to={ `/foods/${food.idMeal}` }
                      >
                        <img
                          src={ food.strMealThumb }
                          alt="ImageCard"
                          width="100px"
                          data-testid={ `${ind}-card-img` }
                        />
                      </Link>
                      <h4 data-testid={ `${ind}-recomendation-title` }>{food.strMeal}</h4>
                    </div>
                  )) }
              </div>
            </div>
          </div>
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ isStartedFunc }
            className="start_recipe_btn"
          >
            { buttonChecked ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        </div>
      ))}
    </section>
  );
}

export default RecipeDetailsDrinks;
