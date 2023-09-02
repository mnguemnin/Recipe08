import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Pages/Home/HomePage';
import RecipePage from './components/Pages/Recipe/RecipePage';
import AddRecipePage from './components/Pages/AddRecipe/AddRecipePage';
import EditRecipePage from './components/Pages/Edit/EditRecipePage';
import LoginPage from './components/Pages/Login/LoginPage';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/recipe/:id' element={<RecipePage/>}/>
        <Route path='/addRecipe' element={<AddRecipePage/>}/>
        <Route path='/edit/:id' element={<EditRecipePage/>}/>
        <Route path='/search/:searchTerm' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  )
}
