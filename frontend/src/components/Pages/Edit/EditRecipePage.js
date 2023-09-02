import React, { useEffect, useState } from 'react';
import Input from '../../Input/Input';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRecipe } from '../../hooks/useRecipe';
import { useParams } from 'react-router-dom';
import Button from '../../Button/Button';
import classes from './editRecipePage.module.css';
import { getById } from '../../../services/recipeService';
import axios from 'axios';

export default function EditRecipe() {
  const { updateRec } = useRecipe();
  const {id}=useParams();
  const [recipe, setRecipe]=useState({});
  
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

 const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  
  useEffect(() => {
    getById(id).then((fetchedRecipe) => {
      setRecipe(fetchedRecipe);
      fetchedRecipe.ingredients.forEach((ingredient, index) => {
       fields[index]={name: ingredient };
      });
    });
  }, [append,id,fields]);

  
  

  const submit = async (data) => {
    try {

      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('instructions', data.instructions);
      formData.append('ingredients', data.ingredients);
      formData.append('oldImageUrl', recipe.imageUrl);

      
      await updateRec(formData, id);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
   
    
  };


  return (!recipe?<div>Recipe Not Found</div>:
(  <div className={classes.container}>
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Input
        type="text"
        label="Name"
        
        {...register('name', {
          required: true,
          minLength: 5,
        })}
        defaultValue={recipe.name}
        error={errors.name}
      />

      <Input
        type="text"
        label="Description"
        {...register('description', {
          required: true,
          minLength: 5,
        })}
        defaultValue={recipe.description}
        error={errors.description}
      />

      
      <Input
        type="text"
        label="Instructions"
        {...register('instructions', {
          required: true,
          minLength: 10,
        })}
        defaultValue={recipe.instructions}
        error={errors.instructions}
      />
      <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
      />
      <img
                    className={classes.image}
                    src={`${recipe.imageUrl}`}
                    alt={recipe.name}
                />
                

{/* Ingredients List */}
<div>Ingredients:</div>
      {fields.map((field, index) => (
        <div key={field.id} className={classes.inputwithbutton}>
          <Input
        type="text"
        label={`Ingredient ${index + 1}`}
            {...register(`ingredients.${index}`, {
              required: true,
              minLength: 2,
            })}
            defaultValue={field.name}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append("")}>
        Add Ingredient
      </button>


      <Button type="submit" text="Edit Recipe" />

      
    </form>
    
  </div>)
  );
}
