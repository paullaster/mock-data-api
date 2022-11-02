import React, {useState, useEffect} from 'react';
import './App.css';
import { getUsers, createUser, updateUser, deleteUser } from './fakedb/fakedb';


// creating developer text
const getDeveloperText = (isDeveloper) => {
  return `is ${ isDeveloper ? 'a' : 'not a' } developer`
};

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

  if (!users) {
    return null;
  };
  return (
    <div className="App">
      <ul>
        {
          users.map ( (user) => {
            const developerText = getDeveloperText (user.isDeveloper);
            return (
              <li key={user.id}>
                  {user.firstname} {user.lastname} {developerText}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default App;
