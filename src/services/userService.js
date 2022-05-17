import http from './httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/users`;

// export function saveUser(user) {
//     if (user._id) {
//         const body = {...user};
//         delete body._id;
//         return http.put(`${apiEndpoint}/${user._id}`, body);
//     }

//     // new user
//     return http.post(apiEndpoint, user);
// }

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
};

export default {
    register
};