// Admin.jsx
import React, { useEffect, useState } from 'react';
import './Admin.sass';
import {
    handleLogin,
    getRate,
    fetchManagers,
    fetchPromocodes,
    handleSaveRate,
    handleCreateManager,
    handleCreatePromocode,
    handleDeleteManager,
    handleDeletePromocode,
    fetchSalesReport,
    fetchUserReport,
    fetchPromocodeReport
} from '../../http/adminAPI';

function Login({ onLogin, setError }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        handleLogin(login, password, onLogin, setError);
    };

    return (
        <div className="login-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
            <input
                type="text"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="main__input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="main__input"
            />
            <button onClick={handleSubmit} className="main__btn">Войти</button>
        </div>
    );
}

export default function Admin({setError}) {
    const [activeTab, setActiveTab] = useState('orders');
    const [role, setRole] = useState(null);
    const [rate, setRate] = useState('');
    const [managers, setManagers] = useState([]);
    const [promocodes, setPromocodes] = useState([]);
    const [newManager, setNewManager] = useState({ login: '', password: '' });
    const [newPromocode, setNewPromocode] = useState({ name: '', nominal: '' });
    const [reportContent, setReportContent] = useState('');

    useEffect(() => {
        if (activeTab === 'rates') {
            getRate(setRate);
        }
        if (activeTab === 'managers') {
            fetchManagers(setManagers);
        }
        if (activeTab === 'promocodes') {
            fetchPromocodes(setPromocodes);
        }
    }, [activeTab]);

    const renderTabContent = () => {
        if (role === 'manager' && activeTab !== 'orders') {
            return <div>У вас нет доступа к этой вкладке</div>;
        }

        switch (activeTab) {
            case 'orders':
                return (
                    <div className="orders__container">
                        <div className="orders">
                            Список заказов
                        </div>
                    </div>
                );
            case 'managers':
                return (
                    <div className="managers__container">
                        <div className="manager__create">
                            <input
                                type="text"
                                className='main__input'
                                placeholder='login'
                                value={newManager.login}
                                onChange={(e) => setNewManager({ ...newManager, login: e.target.value })}
                            />
                            <input
                                type="text"
                                className='main__input'
                                placeholder='password'
                                value={newManager.password}
                                onChange={(e) => setNewManager({ ...newManager, password: e.target.value })}
                            />
                            <button
                                className='main__btn'
                                onClick={() => handleCreateManager(newManager, managers, setManagers, setNewManager)}
                            >
                                Создать менеджера
                            </button>
                        </div>
                        <div className="managers">
                            <h2>Список менеджеров</h2>
                            <ul>
                                {managers.map(manager => (
                                    <li key={manager.id}>
                                        Login: {manager.login} <br /> Password: {manager.password}
                                        <button onClick={() => handleDeleteManager(manager.id, managers, setManagers)}>Удалить</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case 'promocodes':
                return (
                    <div className="promocodes__container">
                        <div className="promocode__create">
                            <input
                                type="text"
                                className='main__input'
                                placeholder='Название'
                                value={newPromocode.name}
                                onChange={(e) => setNewPromocode({ ...newPromocode, name: e.target.value })}
                            />
                            <input
                                type="text"
                                className='main__input'
                                placeholder='Номинал'
                                value={newPromocode.nominal}
                                onChange={(e) => setNewPromocode({ ...newPromocode, nominal: e.target.value })}
                            />
                            <button
                                className='main__btn'
                                onClick={() => handleCreatePromocode(newPromocode, promocodes, setPromocodes, setNewPromocode)}
                            >
                                Создать промокод
                            </button>
                        </div>
                        <div className="promocodes">
                            <h2>Список промокодов</h2>
                            <ul>
                                {promocodes.map(promocode => (
                                    <li key={promocode.id}>
                                        Название: {promocode.name.toUpperCase()} <br /> Номинал: {promocode.nominal}
                                        <button onClick={() => handleDeletePromocode(promocode.id, promocodes, setPromocodes)}>Удалить</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case 'rates':
                return (
                    <div className="rates_container">
                        <input
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            type="text"
                            className='main__input'
                            placeholder='Курс не установлен, введите курс'
                        />
                        <button className='main__btn' onClick={() => handleSaveRate(rate)}>Сохранить</button>
                    </div>
                );

            case 'analytic':
                return (
                    <div className="analytic__container">
                        <h2>Аналитика и отчеты</h2>
                        <div>
                            <button onClick={() => fetchSalesReport(setReportContent)}>Отчет по продажам</button>
                            <button onClick={() => fetchUserReport(setReportContent)}>Отчет по пользователям</button>
                            <button onClick={() => fetchPromocodeReport(setReportContent)}>Отчет по промокодам</button>
                        </div>
                        {/* { тут буде помилка поверненна в тебе один стор на 3 реквести не вірно } */}
                        <div>{reportContent}</div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!role) {
        return <Login onLogin={setRole} setError={setError} />;
    }

    return (
        <div className="Admin">
            <div className="container">
                <div className="tab-navigation">
                    <button className='main__btn' onClick={() => setActiveTab('orders')}>Заказы</button>
                    {role === 'admin' && (
                        <>
                            <button className='main__btn' onClick={() => setActiveTab('promocodes')}>Промокоды</button>
                            <button className='main__btn' onClick={() => setActiveTab('managers')}>Менеджеры</button>
                            <button className='main__btn' onClick={() => setActiveTab('rates')}>Курсы</button>
                            <button className='main__btn' onClick={() => setActiveTab('analytic')}>Аналитика</button>
                        </>
                    )}
                </div>
                <div className="tab-content">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}
