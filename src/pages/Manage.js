import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Backend from '../util/Backend';
import LocalStorageService from '../services/localStorageService'
import jwtDecode from 'jwt-decode';
// import TransactionsList from '../components/TransactionsList/TransactionsList';
// import Statistic from '../components/Statistic/Statistic';
// import './Manage.css';

const Manage = props => {
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  // const [transactions, setTransactions] = useState();

  //const expense = transactions.filter(data => Number(data.cost) < 0);

  // const getTransactionFromBackend = () => {
  //   Backend.getTansactions(
  //     ).then(result => {
  //       setTransactions(result.data)
  //     }).catch(err => console.log(err));
  // }

  useEffect(() => {
    const token = LocalStorageService.getToken();
    if(token) {
      const user = jwtDecode(token);
      setName(user.name);
      setId(user.id);
    }
  }, []);

  // useEffect(() => {
  //   getTransactionFromBackend();
  // }, [transactions]);

  return (    
    <>
      <div className='main stage'>
        <div className='sub stage'>
          {/* <Statistic transactions={transactions}/> */}
          {/* <TransactionsList transactions={transactions} refresh={getTransactionFromBackend}/> */}
        </div>
      </div>
    </>
  );
}

export default Manage;