import { v4 as uuidv4} from 'uuid';

//fake database
let id1 = uuidv4 ();
let id2 = uuidv4 ();
let id3 = uuidv4 ();
let users = {
    [id3]: {
        id: id3,
        firstName: 'John',
        lastName: 'Smith',
        isDeveloper: true,
    },
    [id1]: {
        id: id1,
        firstName: 'Paullaster',
        lastName: 'Okoth',
        isDeveloper: true,
    },
    [ id2]: {
        id: id2,
        firstName: 'Arthur',
        lastName: 'Oduor',
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
        if ( !data.firstName || !data.lastName ) {
            return setTimeout (
                () => reject ( new Error ( 'Cannot create user, provide all information!') ), 250
            );
        };
        let id = uuidv4 ();
        const newUser = {
            id: id,
            ...data
        }
        users = {
            ...users,
            [id]: newUser
        };
        return setTimeout (

            () => resolve (users), 250
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
            () => resolve (users), 250
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

// Exporting fake APIs
export {
    getUser, 
    getUsers, 
    createUser,
    updateUser,
    deleteUser,
};