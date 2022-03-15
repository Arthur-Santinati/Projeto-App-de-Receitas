import React from 'react';
import PropTypes from 'prop-types';

function Paragraph({ foods }) {
  console.log(foods);
  // {drinkRecomended.map((foods) => (
  //   <div
  //     className="cardRecomended"
  //     key={ foods.idMeal }
  //   >
  //     <div className="card1">
  //       <Link
  //         to={ `/drinks/${foods.idDrink}` }
  //       >
  //         <img
  //           src={ foods.strMealThumb }
  //           alt="ImageCard"
  //           width="300px"
  //           height="300px"
  //         />
  //       </Link>
  //     </div>
  //   </div>
  // ))}
  return (
    <>
      <p data-testid="instructions">
        {foods.strInstructions}
      </p>
      <iframe title="video" data-testid="video" src="">VIdeo</iframe>
      <p
        data-testid="0-ingredient-name-and-measure"
      >
        {foods.strIngredient1}
        {foods.strMeasure1}
      </p>
      <p
        data-testid="1-ingredient-name-and-measure"
      >
        {foods.strIngredient2}
        {foods.strMeasure2}
      </p>
      <p
        data-testid="2-ingredient-name-and-measure"
      >
        {foods.strIngredient3}
        {foods.strMeasure3}
      </p>
      <p
        data-testid="3-ingredient-name-and-measure"
      >
        {foods.strIngredient4}
        {foods.strMeasure4}
      </p>
      <p
        data-testid="4-ingredient-name-and-measure"
      >
        {foods.strIngredient5}
        {foods.strMeasure5}
      </p>
      <p
        data-testid="5-ingredient-name-and-measure"
      >
        {foods.strIngredient6}
        {foods.strMeasure6}
      </p>
      <p
        data-testid="6-ingredient-name-and-measure"
      >
        {foods.strIngredient7}
        {foods.strMeasure7}
      </p>
      <p
        data-testid="7-ingredient-name-and-measure"
      >
        {foods.strIngredient8}
        {foods.strMeasure8}
      </p>
      <p
        data-testid="8-ingredient-name-and-measure"
      >
        {foods.strIngredient9}
        {foods.strMeasure9}
      </p>
      <p
        data-testid="9-ingredient-name-and-measure"
      >
        {foods.strIngredient10}
        {foods.strMeasure10}
      </p>
      <p
        data-testid="10-ingredient-name-and-measure"
      >
        {foods.strIngredient11}
        {foods.strMeasure11}
      </p>
      <p
        data-testid="11-ingredient-name-and-measure"
      >
        {foods.strIngredient12}
        {foods.strMeasure12}
      </p>
      <p
        data-testid="12-ingredient-name-and-measure"
      >
        {foods.strIngredient13}
        {foods.strMeasure13}
      </p>
      <p
        data-testid="13-ingredient-name-and-measure"
      >
        {foods.strIngredient14}
        {foods.strMeasure14}
      </p>
      <p
        data-testid="14-ingredient-name-and-measure"
      >
        {foods.strIngredient15}
        {foods.strMeasure15}
      </p>
      <p
        data-testid="15-ingredient-name-and-measure"
      >
        {foods.strIngredient16}
        {foods.strMeasure16}
      </p>
      <p
        data-testid="16-ingredient-name-and-measure"
      >
        {foods.strIngredient17}
        {foods.strMeasure17}
      </p>
      <p
        data-testid="17-ingredient-name-and-measure"
      >
        {foods.strIngredient18}
        {foods.strMeasure18}
      </p>
      <p
        data-testid="18-ingredient-name-and-measure"
      >
        {foods.strIngredient19}
        {foods.strMeasure19}
      </p>
      <p
        data-testid="19-ingredient-name-and-measure"
      >
        {foods.strIngredient20}
        {foods.strMeasure20}
      </p>
    </>
  );
}

Paragraph.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.any),

}.isRequired;

export default Paragraph;