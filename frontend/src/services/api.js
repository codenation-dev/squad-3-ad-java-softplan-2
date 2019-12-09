import axios from 'axios';
import {browserHistory} from  'react-router';

const API = axios.create({ baseURL : 'https://centralerros.herokuapp.com' })

  const getUsers = async ({token}) => {
    const { data } = await API.get(`/logins/token=${token}`);
    return data;
  };

  const login = async ({email, pwd}) => {
    const requestInfo = {
        method:'POST',
        body:JSON.stringify({ login:email
                            , senha:pwd}),
        headers:{
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*',
        }
    };
    fetch(`https://centralerros.herokuapp.com/login`,requestInfo)
        .then(response => {
            if(response.ok) {
                console.log("login ok");
                return response.text();
            } else {
                console.log("não foi possível fazer o login");
                throw new Error('não foi possível fazer o login');
            }
        })
        .then(token => {
            localStorage.setItem('central-erros-auth-token',token);
            browserHistory.push('/list');
        })
        .catch(error => {
            this.setState({msg:error.message});
        });

  };

  const getLogs = async ({ token }) => {
    const { data } = await API.get(`/logs/token=${token}`);
    return data;
  };
  
  export { login, getUsers, getLogs };
  