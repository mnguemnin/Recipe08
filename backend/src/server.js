import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import recipeRouter from './routers/recipe.router.js';
import userRouter from './routers/user.router.js';
import path from 'path';
import { dbconnect } from './config/database.config.js';

dbconnect();
//const path = require('path');

const app=express();
app.use(express.json());

app.use(
    cors({
        credentials:true,
        origin:['http://localhost:3001']
    })
);

// Convertir l'URL du module en chemin de fichier
const __filename = fileURLToPath(import.meta.url);

// Obtenir le répertoire de base du chemin du fichier
const __dirname = path.dirname(__filename);

// Maintenant, vous pouvez utiliser __dirname comme d'habitude
console.log(__filename);
// Determine the current directory using import.meta.url

app.use('/images', express.static(path.join('/Users/mnguemnin/Documents/Recipe08/backend/', 'images')));
console.log('ok')
app.use('/api/recipes',recipeRouter);
app.use('/api/users',userRouter);
//


const PORT=5002;
app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
});