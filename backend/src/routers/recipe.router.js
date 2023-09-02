import { Router } from "express";
import handler from 'express-async-handler';
import { RecipeModel } from "../models/recipe.model.js";
import path from 'path';
import fs from 'fs';

import multerConfigs from "../middleware/multer-configs.js";

/*
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {

      const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    const timestamp = Date.now(); 
    callback(null,`name.${timestamp}.${extension}`);
  }
});

const upload = multer({ storage });*/

const router=Router();

router.get('/',handler(async(req,res)=>{
    const data =await RecipeModel.find({});
    res.send(data);
}));


router.get('/search/:searchTerm', handler(async(req,res)=>{
    const {searchTerm}=req.params;
    const searchRegex=new RegExp(searchTerm,'i');
// Search for recipes by name or ingredients
const recipes = await RecipeModel.find({
    $or: [
        { name: { $regex: searchRegex } },
        { ingredients: { $regex: searchRegex } }
    ]
});
 res.send(recipes);
    console.log(recipes)
}));

router.get('/:recipeId',handler( async(req,res)=>{
    const {recipeId}=req.params;
    const recipe=await RecipeModel.findById(recipeId);
    res.send(recipe);
}));

router.put('/:recipeId',multerConfigs ,handler( async(req,res)=>{
    const {name, description, ingredients, instructions, oldImageUrl}=req.body;
    const imageUrl = req.file?`${req.protocol}://${req.get('host')}/${req.file.path}`:oldImageUrl; 
    const {recipeId}=req.params;
    const modifRecipe= {
       // _id: recipeId,
        name,
        description,
        ingredients,
        instructions,
        imageUrl
    };
    
    await RecipeModel.updateOne({_id:recipeId},modifRecipe).then(
        () => {
            res.status(201).json({
                message: 'Recipe updated successfully!',
                recipe:modifRecipe,
            });
        }
    ).catch( 
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
    
}));

router.delete('/:id', handler(async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Extract filename from the image URL and delete the image
        const filename = recipe.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, async (error) => {
            if (error) {
                return res.status(500).json({ error: 'Error deleting image' });
            }

            // Delete the recipe document
            await RecipeModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Recipe and image deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));


router.post(
    '/',multerConfigs ,
    handler(async(req,res)=>{

        const {name, description, ingredients, instructions}=req.body;
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`; 
        const recipe = await RecipeModel.findOne({name});
        console.log(req.body)
       // if(recipe){
       //     res.status(400).send('Recipe already exist!');
        //    return;
        //}

        const newRecipe={
            name,
            description,
            ingredients,
            instructions,
            imageUrl}

        const result=await RecipeModel.create(newRecipe);
        res.send(result);   
    })
);



export default router;