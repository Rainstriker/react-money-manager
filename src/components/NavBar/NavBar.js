import React, {useState, useEffect, useRef } from 'react';
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
  // const [path, setPath] = useState(window.location.pathname);
  const changeTool = role => {
    if (role === 'user') {
      return (
        <div className='NavBar' id='username-container'>
          <p className='NavBar' id='username'>{firstName}</p>
          <p className='NavBar' id='username'>{lastName}</p>
          <Setting 
            username={username} 
            firstName={firstName} 
            lastName={lastName} 
            setRole={props.setRole}
          />
        </div>
      );
    } else if (role === 'guest') {
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

  useEffect(() => {
    const token = LocalStorageService.getToken();
    if(token) {
      const user = jwtDecode(token);
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, []);



  return (
    <>
      <nav>
        <div className='NavBar' id='nav-container'>
          <h1 className='NavBar' id='logo'>Money Manager</h1>
          {changeTool(props.role)}
        </div>
      </nav>
    </>
  );
}

export default NavBar;