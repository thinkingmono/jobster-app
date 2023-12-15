//Turns user data into an string and saves user into browser's local storage.
export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

//Gets user from browser's local storage. If there is an user turn it into JSON and returns it.
export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user;
}

//Delete user from browser's local storage.
export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
}