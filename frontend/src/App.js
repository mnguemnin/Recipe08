import AppRoutes from './AppRoutes';
import './App.css';
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import { useLoading } from "./components/hooks/useLoading";
import {setLoadingInterceptor} from './components/Interceptors/loadingInterceptor';
import { useEffect } from "react";

function App() {
  const {showLoading, hideLoading}= useLoading();

  useEffect(()=>{
    setLoadingInterceptor({showLoading, hideLoading});
  },[]);
  return <>
  <Loading/>
  <Header/>
  <AppRoutes/>
  
  </>
  

}

export default App;
