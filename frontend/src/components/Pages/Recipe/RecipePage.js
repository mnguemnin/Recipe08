import React, { useEffect, useState } from 'react';
import classes from './recipePage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../../services/recipeService';
import { useRecipe } from '../../hooks/useRecipe';

export default function RecipePage() {
    const [recipe, setRecipe]=useState({});
    const {id}=useParams();
    const navigate=useNavigate();
    const {del}=useRecipe();

    const handleModify=()=>{
       
        navigate('/edit/'+recipe.id);

    }
    const handleDelete=()=>{

       
        del(recipe.id);

    }

    useEffect(()=>{
        getById(id).then(setRecipe);
    },[id]);
  return (
    <>{!recipe?<div>Recipe Not Found</div>
                      :(
    <div className={classes.container}>
     <img
                    className={classes.image}
                    src={`${recipe.imageUrl}`}
                    alt={recipe.name}
                />
     <div className={classes.details}>
        <div className={classes.header}>
            <span className={classes.name}>{recipe.name}</span>
            
        </div>
        
        <div className={classes.ingredients}>
            {recipe.ingredients?.map(ingredient=>(
                <span key={ingredient}>{ingredient}</span>
            ))}
        </div>

        <div className={classes.description}>
            <span>{recipe.description}</span>
            
        </div>
        <div className={classes.instructions}>
            <span>{recipe.instructions}</span>
            
        </div>
      
        <div><button onClick={handleModify}>Edit</button>
       <button onClick={handleDelete}>Delete</button></div>
   </div>
   </div>
   )}
   </>
  )
}
