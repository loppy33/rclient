import axios from 'axios';

// export const getUser = async (userName, setUserData, setChoice) => {
//     try {
//         setChoice(false);

//         const response = await axios.get(`https://rbxsell.com/api/roblox-utils/users?username=${userName}&withAvatar=true`);
//         console.log(response.data.data);

//         // const response = await axios.get(`https://robux.space/api/v1/users/usernames/${userName}`);
//         setUserData(response.data.data);
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//     }
// };

const userCache = {};


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUser = async (username, setUserData, setChoice) => {
    try {
        setChoice(false);


        if (userCache[username]) {
            console.log("Using cached data");
            return setUserData(userCache[username]);
        }

        // Добавляем задержку перед запросом
        await delay(1000); // Задержка в 1 секунду

        const response = await axios.get(`http://localhost:5000/api/roblox/user/${username}`);
        console.log(response.data);

        setUserData(response.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 429) {
            console.log("Too many requests. Retrying after delay...");
            // Ретрай с задержкой
            await delay(2000); // Задержка в 2 секунды перед повтором
            return getUser(username, setUserData, setChoice);
        }
    }
};

export const login = async (username, setToken, userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/create', { username });
        setToken(userData);
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
