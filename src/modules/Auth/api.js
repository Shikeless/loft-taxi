export const authUser = (email, password) =>
    fetch(
        `https://loft-taxi.glitch.me/auth?username=${email}&password=${password}`
    ).then(response => {
        return response.status !== 200
            ? Promise.reject(response)
            : response.json();
    });
