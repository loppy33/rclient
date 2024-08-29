import axios from 'axios';

// Общая функция для обработки ошибок
const handleError = (error, setError, defaultMessage) => {
    console.error(defaultMessage, error);
    if (setError) {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError(defaultMessage);
        }
    }
};

// Получение курса валют
export const getRate = async (setRate, setError) => {
    try {
        const { data, status } = await axios.get('http://localhost:5000/api/rate/get');
        if (status === 200) {
            setRate(data.rate || 0);
        } else {
            setRate(0);
            setError('Ошибка получения курса.');
        }
    } catch (error) {
        setRate(0);
        handleError(error, setError, 'Ошибка получения курса.');
    }
};

// Получение списка игр
export const fetchGames = async (userId, setGames, setError) => {
    try {
        const { data, status } = await axios.get(`http://localhost:5000/api/roblox/games/${userId}`);
        if (status === 200) {
            setGames(data.data || []);
        } else {
            setGames([]);
            setError('Ошибка получения списка игр.');
        }
    } catch (error) {
        setGames([]);
        handleError(error, setError, 'Ошибка получения списка игр.');
    }
};

// Проверка Game Pass
export const verifyGamePass = async (selectedGame, gamePassPrice, setError, setModal, robloxUserName, robuxAmount) => {
    try {
        const { data } = await axios.post(`http://localhost:5000/api/roblox/gamepass/${selectedGame.rootPlace.id}/${robloxUserName}/${robuxAmount}`);
        
        // Проверяем, есть ли подходящий Game Pass
        const pass = data.data.find(pass => pass.price === gamePassPrice);
        
        if (pass) {
            setModal('step4');
        } else {
            setError('Указана неверная цена Game Pass.');
        }
    } catch (error) {
        handleError(error, setError, 'Ошибка при проверке Game Pass.');
    }
};

// Создание заказа
export const createOrder = async (username, robuxAmount, promocodeBonus, price, promocode, setError) => {
    try {
        setError(null); // Сбрасываем ошибку перед запросом
        const { status } = await axios.post('http://localhost:5000/api/order/create', {
            username,
            robux: robuxAmount + promocodeBonus,
            price,
            promocode: promocode.toLowerCase()
        });
        if (status === 201) {
            alert('Order successfully created');
        } else {
            setError('Ошибка при создании заказа.');
        }
    } catch (error) {
        handleError(error, setError, 'Ошибка при создании заказа.');
    }
};

// Применение промокода
export const applyPromocode = async (promocode, setPromocodeBonus, setError) => {
    try {
        setError(null); // Сбрасываем ошибку перед запросом
        const { data, status } = await axios.post('http://localhost:5000/api/promocode/apply', {
            promocode: promocode.toLowerCase(),
        });
        
        if (status === 200) {
            setPromocodeBonus(data.bonus || 0);
        } else {
            setPromocodeBonus(0);
            setError('Промокода не существует.');
        }
    } catch (error) {
        setPromocodeBonus(0);
        handleError(error, setError, 'Ошибка активации промокода.');
    }
};