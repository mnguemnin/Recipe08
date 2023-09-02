import { connect, set} from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { RecipeModel } from '../models/recipe.model.js';
import { sample_users } from '../../data.js';
import {data} from '../../data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS=10;

set('strictQuery', true);

export const dbconnect=async()=>{
    try{
        connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        await seedUsers();
        await seedRecipes();
        console.log('connect successfully---');
    }catch(error){
        console.log(error);
    }
};

async function seedUsers(){
    const userCount=await UserModel.countDocuments();
    if(userCount>0){
        console.log('Users seed is already done!');
        return;
    }
    for(let user of sample_users){
        user.password=await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }

    console.log('Users seed is done!');
}

async function seedRecipes(){
    const recipes=await RecipeModel.countDocuments();
    if(recipes>0){
        console.log('Recipes seed is already done!');
        return;
    }
    for(const recipe of data){
        await RecipeModel.create(recipe);
    }

    console.log('Recipes seed is done!');
}