import React from 'react';
import Header from '../components/Header';
import './style/explorer.css';

function DoneRecipes() {
  return (
    <section>
      <Header />
      <div clasName="container-explorer">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
    </section>
  );
}

export default DoneRecipes;
