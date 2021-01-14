import React, {useState, useEffect} from 'react';
import LocalStorageService from '../../services/localStorageService'
import jwtDecode from 'jwt-decode';
import './NavBar.css'
import Setting from '../Setting/Setting';
import ModalForm from '../ModalForm/ModalForm';
import Login from '../Login/Login';

const NavBar = props => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const changeTool = path => {
    console.log('running')
    if (path === '/manage') {
      return (
        <div className='NavBar' id='username-container'>
          <p className='NavBar' id='username'>{props.name}</p>
          <Setting 
            username={username} 
            firstName={firstName} 
            lastName={lastName} 
            setRole={props.setRole}
          />
        </div>
      );
    } else if (path === '/') {
      return (
        <>
          <ModalForm 
          title='Login'
          form={<Login setRole={props.setRole}/>}
          buttonStyle='anchor' 
          buttonElement='Login'/>
        </>
      );
    }
  }

  const token = LocalStorageService.getToken()
  const path = window.location.pathname;

  useEffect(() => {
    const token = LocalStorageService.getToken();
    if(token) {
      const user = jwtDecode(token);
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [token]);



  return (
    <>
      <nav>
        <div className='NavBar' id='nav-container'>
          <h1 className='NavBar' id='logo'>Money Manager</h1>
          {changeTool(path)}
        </div>
      </nav>
    </>
  );
}

export default NavBar;