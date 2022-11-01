import { v4 as uuidv4} from 'uuid';

//fake database
let users = {
    [uuidv4 ()]: {
        id: uuidv4 (),
        firstname: 'John',
        lastname: 'Smith',
        isDeveloper: true,
    },
    [uuidv4 ()]: {
        id: uuidv4 (),
        firstname: 'Paullaster',
        lastname: 'Okoth',
        isDeveloper: true,
    },
    [ uuidv4 ()]: {
        id: uuidv4 (),
        firstname: 'Arthur',
        lastname: 'Oduor',
        isDeveloper: false,
    },
}

//Fake endpoint:
//reading all users:
const getUsers = () => {
    return new Promise ( (resolve, reject) => {
        if (!users) {
            return setTimeout (
                () => reject (new Error ('User not found')), 250);
        };
        return setTimeout (
           () => resolve ( Object.values (users) ), 250
        );
    })
}

// reading single user:
const getUser = (id) => {
    return new Promise ( (resolve, reject) => {
        const user = users[id];
        if (!user) {
            return setTimeout (
                () => reject ( new Error ( 'User not found')), 250
            )
        };
        return setTimeout (
            () => resolve (users[id]), 250
        )
    });
};

// Creating a new user
const createUser = ( data) => {
    return new Promise ( (resolve, reject) => {
        if ( !data.firstname || !data.lastname ) {
            return setTimeout (
                () => reject ( new Error ( 'Cannot create user, provide all information!') ), 250
            );
        };
        const newUser = {
            id: uuidv4 (),
            ...data
        }
        users = {
            ...users,
            [uuidv4 ()]: newUser
        };
        return setTimeout (

            () => resolve (true), 250
        );
    });
};

//Updating an existing user
const updateUser = ( id, data) => {
    return new Promise ( (resolve, reject) => {
        const user = users[id];
        if (!user) {
            return setTimeout (
                () => reject ( new Error ( 'User not found') ), 250
            );
        };
        users[id] = {
            ...users[id],
            ...data
        };
        return setTimeout (
            () => resolve (true), 250
        );
    });
};

// Deleting an existing user
const deleteUser = ( id) => {
    return new Promise ( (resolve, reject) => {
        const {[id]:user, ...rest} = users;

        if ( !user) {
            return setTimeout (
                () => reject ( new Error ( 'user not found!')), 250
            );
        };

        users = {
            ...rest
        };

        return setTimeout (
            () => resolve (true), 250
        )

    });
};
