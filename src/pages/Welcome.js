import React, { useRef } from 'react';
import NavBar from '../components/NavBar/NavBar';
import ModalForm from '../components/ModalForm/ModalForm';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import 'antd/dist/antd.css';

const Index = props => {

  return (
    <>
      <div id='welcome-container'>
        <h1 id='welcome-text'>Money Manager</h1>
        <ModalForm 
        title='Sign Up'
        form={<RegistrationForm />} 
        buttonStyle='button'
        buttonElement='Sign Up'
        />
      </div>
    </>
  );
}

export default Index;