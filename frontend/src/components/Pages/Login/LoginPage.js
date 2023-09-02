import React, { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './loginPage.module.css';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

export default function LoginPage() {
    const{
        handleSubmit,
        register,
        formState:{errors},
    }=useForm();

    const navigate=useNavigate();
    const {user, login}=useAuth();
    const [params]=useSearchParams();
    const returnUrl=params.get('returnUrl');

    useEffect(()=>{
        if(!user) return;
        returnUrl? navigate(returnUrl):navigate('/');
    },[user]);

    const submit=async ({ email, password})=>{
        await login(email, password);
    }
  return (
    <div className={classes.container}>
        <div className={classes.details}>
           
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input
                type="email"
                label="Email"
                {...register('email',{
                    required:true,
                    pattern:{
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                        message:'Email Is Not Valid',
                    }
                })}
                error={errors.email}
                />

                <Input
                    type="password"
                    label="Password"
                    {...register('password',{
                        required:true,
                    })}
                    error={errors.password}
                />

                <Button type='Submit' text='Login'/>

                <div className={classes.register}>
                    New user? &nbsp;
                    <Link to={`/register${returnUrl?'?returnUrl='+returnUrl:''}`}>
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}
