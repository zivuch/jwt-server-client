import {useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppContext} from '../App';
const Users = (props) => {
  const[users, setUsers] = useState([]);
  const {token, setToken} = useContext(AppContext);
  const navigate = useNavigate()

  useEffect(()=>{
    fetch('/users',{
      headers:{
        'x-access-token':token
      }
    })
    .then(res => {
      if(res.status === 200){
        return res.json()
      }
      else{
        navigate('/login')
      }
    })
    .then(data => {
      setUsers(data)
    })
    .catch(e=>{
      console.log(e);
    })
  },[])

  if(users.length === 0) return null

  return(
    <div>
    {
      users ? users.map(item=>{
        return (
          <div key={item.id}>
           {item.id} : {item.email}
          </div>
        )
      }) : 'Unauthorized'
    }
    </div>
  )
}
export default Users
