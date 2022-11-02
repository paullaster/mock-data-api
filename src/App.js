import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import { getUsers, createUser, updateUser, deleteUser } from './fakedb/fakedb';


// creating developer text
const getDeveloperText = (isDeveloper) => {
  return `is ${ isDeveloper ? 'a' : 'not a' } developer`
};

//Form component:
const Form = ( {onSubmit, children}) => {
  return (
    <form
    onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

//Form Input with label component:
const InputWithLabel = ( {onChange, type='text', placeHolder='Enter first name', children}) => {
  return (
    <label>
      {children}
      <input 
      type={type} 
      placeholder={placeHolder}
      onChange={onChange} 
      />
    </label>
  );
};


//Button Component:
const Button = ( {id, onClick,  type='button', children}) => {
  return (
    <button
    onClick={ () => onClick (id)}
    type={type}
    >
      {children}
    </button>
  );
};

const App = () => {

  const [users, setUsers] = useState (null);
  const [firstName, setFirstName] = useState ( '' );
  const [lastName, setLastName] = useState ( '' );

  const doGetUsers = useCallback ( () => {
    getUsers ()
    .then ( (result) => {
      setUsers (result);
    })
    .catch ( (error) => {
      console.log (error.message);
    });
  }, [])
  useEffect ( () => {
    doGetUsers ();
  }, [doGetUsers]);

  //Refetching users:
  const reFetch = () => {
    doGetUsers();
  };
//Handling Change in first name:
const handleFirstNameChange = (event) => {
  setFirstName (event.target.value);
};

//Handling Change in last name:
const handleLastNamechange = (event) => {
  setLastName (event.target.value);
}

//Handling user creation:
const handleUserCreation = (event) => {
  event.preventDefault();
  createUser ( {firstName, lastName, isDeveloper: false} )
  .then ( (response) => {
    reFetch ();
    console.log (response);
  })
  .catch ( (error) => {
    console.log (error.message);
  });
};

// Handling user update!
const handleUserUpdate = (id) => {
  const user = users.find ( (user) => user.id === id);
  const isDeveloper = !user.isDeveloper;
  updateUser (id, {isDeveloper})
  .then ( (response) => {
    reFetch ();
    console.log (response);
  })
  .catch ( (error) => {
    console.log (error.message);
  });
};

//Handlin delete user:
const handleDeleteUser = (id) => {
  deleteUser (id)
  .then ( (response) => {
    reFetch ();
    console.log (response);
  })
  .catch ( (error) => {
    console.log (error.message);
  });
};

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
                  {user.firstName} {user.lastName} {developerText}
                  <Button
                  id={user.id}
                  onClick={ handleUserUpdate }
                  >
                    toggle developer
                  </Button>
                  <Button
                  id={user.id}
                  onClick={handleDeleteUser}
                  >
                    delete
                  </Button>
              </li>
            );
          })
        }
      </ul>
      <span>Create Users:</span>
      <div>
        <Form
        onSubmit={handleUserCreation}
        >
          <div>
            <InputWithLabel
            onChange={handleFirstNameChange}
            >
              Firstname:
            </InputWithLabel>
          </div>
          <div>
            <InputWithLabel
            onChange={handleLastNamechange}
            placeHolder='Enter your last name'
            >
              Lastname:
            </InputWithLabel> 
          </div>
          <Button
          type='submit'
          >
            Create User
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
