import axios from 'axios';

export const getAll= async()=>{
    const {data}=await axios.get('/api/recipes');
    return data;
};

export const getById= async recipeId=>{
    const {data}=await axios.get('/api/recipes/'+recipeId);
    return data;
    }

export const addRecipe=async formData=>{
        //const {data}=await axios.post('api/recipes/', recipeData);
        const {data}= await axios.post('/api/recipes/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    

        return data;
    }

export const updateRecipe=async (formData,id)=>{
     await axios.put('api/recipes/'+id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
   
      //await axios.put('api/recipes/'+id, recipeData);

       
    }

export const deleteRecipe=async id=>{
        await axios.delete('api/recipes/'+id);
    }

export const search=async searchTerm=>{
   const {data}= await  axios.get('api/recipes/search/'+searchTerm);
   return data;
}