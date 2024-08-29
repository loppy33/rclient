import axios from "axios";

export const getUserInfo = async (name, setBonuses, setReferrals) => {
    try {
        const resp = await axios.get(`http://localhost:5000/api/user/get/${name}`);
        
        // Проверяем, что ответ содержит нужные данные
        const { bonuses = 0, referrals = [] } = resp.data || {};
        
        setBonuses(bonuses);
        setReferrals(referrals.length);
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
        setBonuses(0);
        setReferrals(0);
    }
};