import {model, Schema} from 'mongoose';

export const RecipeSchema= new Schema(
    {
        name: {type:String, required:true},
        instructions:{type: String, required:true},
        ingredients:{type:[String], requirea:true},
        description: {type:String, required: true},
        imageUrl: {type:String},
    },
    {
        timestamps:true,
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        },
    }
)

export const RecipeModel=model('recipe',RecipeSchema);