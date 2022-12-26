import {useContext,useState,useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import {AppContext} from '../App';

const Home = (props) => {

  const {token,setToken} = useContext(AppContext);
  const navigate = useNavigate()

  useEffect(()=>{
    try{
      const decode = jwt_decode(token);
      const expire = decode.exp;
      if(expire * 1000 < new Date().getTime()){
        setToken(null);
        navigate('/login')
      }
    }
    catch(e){
      console.log(e);
      setToken(null);
      navigate('/login')
    }
  },[token]);

  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}
export default Home
