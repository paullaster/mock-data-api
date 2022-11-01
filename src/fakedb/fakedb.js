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
        isDeveloper: false,
    },
}