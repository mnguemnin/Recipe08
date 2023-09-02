import React from 'react';
import classes from './listRecipes.module.css';
import { Link } from 'react-router-dom'

export default function ListRecipes({recipes}) { console.log(recipes)
  return (
   
    <ul className={classes.list}>
    {recipes.map(recipe=>(
        <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
            {recipe.imageUrl&&<img
                    className={classes.image}
                    src={`${recipe.imageUrl}`}
                    alt={recipe.name}
                />}
             
            <div className={classes.content}>
                <div className={classes.name}>{recipe.name}</div>
               
                <div className={classes.product_item_footer}>
                    <div className={classes.ingredients}>
                        ingredients :
                        {recipe.ingredients.map(ingredient=>(
                            <span key={ingredient}>{ingredient}</span>
                        ))}
                    </div>
                </div>
            </div>
            </Link>            
        </li>
    ))}
    </ul>
  )
}
