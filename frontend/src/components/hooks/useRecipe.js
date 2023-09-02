import { createContext, useContext} from "react";
import {toast} from 'react-toastify';
import {updateRecipe ,addRecipe, deleteRecipe} from '../../services/recipeService';
import { useNavigate} from 'react-router-dom';

const RecipeContext=createContext(null);


export const RecipeProvider=({children})=>{
    const navigate=useNavigate();

    const add=async data=>{
        try{
           
            await addRecipe(data);
            toast.success('Recipe added Successfully');
            navigate('/');
        }catch(err){
            toast.error('Error! Recipe Not added');
            navigate('/');
        }
    }; 

    const updateRec=async (data,id)=>{
        try{
           
            await updateRecipe(data, id);
            toast.success('Recipe Updated Successfully');
            navigate('recipe/'+id);
        }catch(err){
            
            toast.error('Error! Cannot delete');
            navigate('recipe/'+id);
        }
    }; 


    const del=async id=>{
        try{
           
            await deleteRecipe(id);
            toast.success('Recipe deleted Successfully');
            navigate('/');
        }catch(err){
            toast.error('Error! Cannot delete');
            navigate('/');
        }
    }; 

    
    return (
        <RecipeContext.Provider value={{ add, del, updateRec}}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipe=()=>useContext(RecipeContext);