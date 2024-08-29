import axios from 'axios';

// Базовая настройка axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Общая функция для обработки ошибок
const handleError = (error, defaultMessage) => {
    console.error(error);
    return defaultMessage || 'Произошла ошибка';
};

// Функция авторизации
export const handleLogin = async (login, password, onLogin, setError) => {
    console.log(123);
    
    try {
        const { data, status } = await api.post('/manager/check', { login, password });
        if (status === 200) {
            onLogin(data.role);
        }
    } catch (error) {
        setError(handleError(error, 'Неправильный логин или пароль'));
    }
};

// Получение курса валюты
export const getRate = async (setRate) => {
    try {
        const { data, status } = await api.get('/rate/get');
        if (status === 200) {
            setRate(data.rate || '');
        }
    } catch (error) {
        setRate('');
        handleError(error, 'Ошибка при получении курса');
    }
};

// Получение списка менеджеров
export const fetchManagers = async (setManagers) => {
    try {
        const { data, status } = await api.get('/manager');
        if (status === 200) {
            setManagers(data);
        }
    } catch (error) {
        handleError(error, 'Ошибка при получении менеджеров');
    }
};

// Получение списка промокодов
export const fetchPromocodes = async (setPromocodes) => {
    try {
        const { data, status } = await api.get('/promocode');
        if (status === 200) {
            setPromocodes(data);
        }
    } catch (error) {
        handleError(error, 'Ошибка при получении промокодов');
    }
};

// Сохранение курса валюты
export const handleSaveRate = async (rate) => {
    try {
        await api.post('/rate/update', { currency: rate });
    } catch (error) {
        handleError(error, 'Ошибка при сохранении курса');
    }
};

// Создание нового менеджера
export const handleCreateManager = async (newManager, managers, setManagers, setNewManager) => {
    try {
        const { data, status } = await api.post('/manager/create', newManager);
        if (status === 200) {
            setManagers([...managers, data]);
            setNewManager({ login: '', password: '' });
        }
    } catch (error) {
        handleError(error, 'Ошибка при создании менеджера');
    }
};

// Создание нового промокода
export const handleCreatePromocode = async (newPromocode, promocodes, setPromocodes, setNewPromocode) => {
    try {
        const { data, status } = await api.post('/promocode/create', newPromocode);
        if (status === 200) {
            setPromocodes([...promocodes, data]);
            setNewPromocode({ name: '', nominal: '' });
        }
    } catch (error) {
        handleError(error, 'Ошибка при создании промокода');
    }
};

// Удаление менеджера
export const handleDeleteManager = async (id, managers, setManagers) => {
    try {
        const { status } = await api.delete(`/manager/${id}`);
        if (status === 200) {
            setManagers(managers.filter(manager => manager.id !== id));
        }
    } catch (error) {
        handleError(error, 'Ошибка при удалении менеджера');
    }
};

// Удаление промокода
export const handleDeletePromocode = async (id, promocodes, setPromocodes) => {
    try {
        const { status } = await api.delete(`/promocode/${id}`);
        if (status === 200) {
            setPromocodes(promocodes.filter(promocode => promocode.id !== id));
        }
    } catch (error) {
        handleError(error, 'Ошибка при удалении промокода');
    }
};

// Получение отчета по продажам
export const fetchSalesReport = async (setReportContent) => {
    try {
        const { data, status } = await api.get('/reports/sales');
        setReportContent(status === 200 && data.count > 0 ? `Количество продаж: ${data.count}` : 'Ничего не найдено');
    } catch (error) {
        setReportContent(handleError(error, 'Ошибка при получении отчета по продажам'));
    }
};

// Получение отчета по пользователям
export const fetchUserReport = async (setReportContent) => {
    try {
        const { data, status } = await api.get('/reports/users');
        setReportContent(status === 200 && data.count > 0 ? `Количество пользователей: ${data.count}` : 'Ничего не найдено');
    } catch (error) {
        setReportContent(handleError(error, 'Ошибка при получении отчета по пользователям'));
    }
};

// Получение отчета по промокодам
export const fetchPromocodeReport = async (setReportContent) => {
    try {
        const { data, status } = await api.get('/reports/promocodes');
        setReportContent(status === 200 && data.count > 0 ? `Количество промокодов: ${data.count}` : 'Ничего не найдено');
    } catch (error) {
        setReportContent(handleError(error, 'Ошибка при получении отчета по промокодам'));
    }
};
