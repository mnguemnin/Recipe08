import React, {useState} from 'react';
import Input from '../../Input/Input';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRecipe } from '../../hooks/useRecipe';
import Button from '../../Button/Button';
import classes from './addRecipePage.module.css';
import axios from 'axios';

export default function AddRecipe() {
  const { add } = useRecipe();

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

  const submit = async (data) => {
    try {

      
      // Prepare image data
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('instructions', data.instructions);
      formData.append('ingredients', data.ingredients);

      console.log(formData)
      
     

      // Attach the uploaded image URL to the recipe data
      //data.imageUrl = response.data.imageUrl;

      // Add the recipe data
      await add(formData);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
  <div className={classes.container}>
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Input
        type="text"
        label="Name"
        {...register('name', {
          required: true,
          minLength: 5,
        })}
        error={errors.name}
      />

      <Input
        type="text"
        label="Description"
        {...register('description', {
          required: true,
          minLength: 5,
        })}
        error={errors.description}
      />

      
      <Input
        type="text"
        label="Instructions"
        {...register('instructions', {
          required: true,
          minLength: 10,
        })}
        error={errors.instructions}
      />

      <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append("")}>
        Add Ingredient
      </button>


      <Button type="submit" text="Add" />

      
    </form>
    
  </div>
  );
}
