import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { ApiFoodById } from '../services/ApiMeals';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './style/FoodInProgress.css';

export default function FoodsInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { isFav, setIsFav, copySuccess, setCopySuccess } = useContext(MyContext);
  const [foodDetail, setFoodDetail] = useState([]);
  // const [FoodsProgress, setFoodsProgress] = useState([]);
  const [paragraphy, setParagraphy] = useState([]);

  function setingFavFalse() {
    setIsFav(false);
  }

  function setingFavTrue() {
    setIsFav(true);
    localStorage.removeItem('favoriteRecipes');
  }

  function btnLike() {
    return (
      isFav ? (
        <button
          type="button"
          className="btn-recipe"
          onClick={ setingFavFalse }
        >
          <img
            data-testid="favorite-btn"
            alt="favorite"
            src={ whiteHeartIcon }
          />
        </button>)
        : (
          <button
            type="button"
            className="btn-recipe"
            onClick={ setingFavTrue }
          >
            <img
              alt="favorite"
              data-testid="favorite-btn"
              src={ blackHeartIcon }
            />
          </button>)
    );
  }

  useEffect(() => {
    async function getId() {
      const result = await ApiFoodById(id);
      const ingredientsName = Object.entries(result[0])
        .filter((item) => item[0].includes('strIngredient'))
        .filter((item) => item[1] !== '' && item[1] !== ' ' && item[1] !== null)
        .map((item) => item[1]);
      const MeasureName = Object.entries(result[0])
        .filter((item) => item[0].includes('strMeasure'))
        .filter((item) => item[1] !== '' && item[1] !== ' ' && item[1] !== null)
        .map((item) => item[1]);
      console.log('medidas', MeasureName);
      // const paragraph = {
      //   ingredientsName[index] :
      // };
      setParagraphy(ingredientsName);
      // const obj = { meals: { [id]: paragraph } };
      // setFoodsProgress(obj);
      // localStorage.setItem('inProgressRecipes', JSON.stringify(FoodsProgress));
      setFoodDetail(result);
    }
    getId();
  }, [id]);
  function copyingLink() {
    const doThis = async () => {
      await navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
      setCopySuccess(true);
      return copySuccess;
    };
    doThis();
  }
  return (
    <div>
      {foodDetail.map((item) => (
        <div
          className="card"
          key={ item.idMeal }
        >
          <img src={ item.strMealThumb } alt="ImageCard" data-testid="recipe-photo" />
          <h4 data-testid="recipe-title">
            {item.strMeal}
          </h4>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyingLink() }
          >
            <img
              alt="favorite"
              src={ shareIcon }
            />
          </button>
          { btnLike() }
          { copySuccess && <span>Link copied!</span>}
          <p data-testid="recipe-category">{ item.strCategory }</p>
          <p data-testid="instructions">
            { item.strInstructions }
          </p>
          {paragraphy.map((ingrid, index) => (
            <div
              key={ ingrid }
              data-testid={ `${index}-ingredient-step` }
            >
              {`${item[`strIngredient${index + 1}`]}
              : ${item[`strMeasure${index + 1}`]}` }
              <input
                type="checkbox"
                value={ `${item[`strIngredient${index + 1}`]}
              : ${item[`strMeasure${index + 1}`]}` }
              />
            </div>

          )) }
        </div>
      ))}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>
  );
}
// Os ingredientes devem possuir o atributo data-testid=${index}-ingredient-step, a verificação será feita pelo length do atributo. esta parte ainda tem que ver...
