import React, {useState, useEffect} from 'react';
import './App.css';
import { getUsers, createUser, updateUser, deleteUser } from './fakedb/fakedb';


function App() {

  const [users, setUsers] = useState (null);

  useEffect ( () => {
    getUsers ()
    .then ( (result) => {
      setUsers (result);
    })
    .catch ( (error) => {
      console.log (error.message);
    });
  }, []);

  return (
    <div className="App">
      <h1>Fake data </h1>
    </div>
  );
}

export default App;
