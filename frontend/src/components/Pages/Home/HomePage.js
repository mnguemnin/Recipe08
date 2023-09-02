import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import ListRecipes from '../../ListRecipes/ListRecipes';
import { getAll, search } from '../../../services/recipeService';
import Search from '../../Search/Search';

const initialState = { recipes :[], ingredients:[] };

const reducer=(state, action)=>{
    switch(action.type){
        case 'RECIPES_LOADED':
            return {...state,  recipes:action.payload};
        case 'INGREDIENTS_LOADED':
            return {...state, ingredients:action.payload};
        default:
            return state;
    }
};

export default function HomePage() {
    const [state, dispatch]=useReducer(reducer, initialState);
    const {recipes, ingredients}=state;
    const {searchTerm}=useParams();

  useEffect(()=>{
    const loadRecipes= 
    searchTerm?search(searchTerm):getAll();
   
    loadRecipes.then(recipes=> dispatch({type: 'RECIPES_LOADED',payload:recipes}))
  },[searchTerm])
  return (
   <>
   {recipes.length===0&&<div>No Recipe Found</div>}
   <Search/>
   <ListRecipes recipes={recipes}/>
   </>
  )
}
