import React, { useEffect, useState } from 'react';
import './buyRobux.sass';
import './phone.sass'
import styles from '../../styles/modal.module.sass';
import { getRate, fetchGames, verifyGamePass, applyPromocode } from '../../http/buyRobuxAPI';
import { getUser, login } from '../../http/modalAPI';

export default function BuyRobux({ token, setError, setToken }) {
    const [rubleToRobuxRate, setRate] = useState(0);
    const [robuxAmount, setRobuxAmount] = useState(500);
    const [price, setPrice] = useState(0);
    const [promocode, setPromocode] = useState('');
    const [promocodeBonus, setPromocodeBonus] = useState(0);
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [gamePassPrice, setGamePassPrice] = useState(0);
    const [modal, setModal] = useState('');

    const [userName, setUserName] = useState('');
    const [userData, setUserData] = useState(null);
    const [choice, setChoice] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => { // що це чого це таймаут а не інтервал якщо іде 
            if (userName) {
                getUser(userName, setUserData, setChoice) // try catch  перепиши це з чатом гпт він тобі поможе
                    .catch(err => {
                        setError("Ошибка при поиске пользователя");
                        setUserData(null);
                        setChoice(false);
                    });
            } else {
                setUserData(null);
                setChoice(false);
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [userName, setError]);

    const handleInputChange = (event) => {
        setUserName(event.target.value);
    };

    useEffect(() => {
        getRate(setRate, setError).catch(err => setError("Ошибка при получении курса"));
    }, [setError]);

    useEffect(() => {
        setPrice((robuxAmount / rubleToRobuxRate).toFixed(1));
    }, [rubleToRobuxRate, robuxAmount]);

    const handleRobuxChange = (event) => {
        let value = parseInt(event.target.value);
        if (value > 10000) value = 10000;
        if (isNaN(value)) value = 0;
        setRobuxAmount(value);
    };

    const handlePriceChange = (event) => {
        let value = parseFloat(event.target.value);
        if (value > 100) value = 100;
        if (isNaN(value)) value = 0;
        setPrice(value);
        setRobuxAmount((value * rubleToRobuxRate).toFixed(0));
    };

    const handleGameSelect = (game) => {
        setSelectedGame(game);
        setGamePassPrice((robuxAmount * 1.43).toFixed(0));
        setModal('step3');
    };

    const Modals = () => {
        if (!modal) return null;
    // () => setModal('') це в отдельну функцію 
    // (e) => e.stopPropagation() це нахуя?
        return (
            <div onClick={() => setModal('')} className={styles.overlay__modal}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}> 
                    <span className={styles.close} onClick={() => setModal('')}>X</span>
                    {
                        modal === 'promocode' && (
                            <>
                                <div>
                                    <h1>Промокод</h1>
                                    <h2>Введите ваш промокод</h2>
                                </div>
                                <input
                                    type="text"
                                    placeholder='PROMO-CODE'
                                    onChange={(e) => setPromocode(e.target.value)}
                                    value={promocode.toUpperCase()}
                                    className='main__input'
                                />
                                <button
                                    onClick={() => {
                                        // в отдельну функцію винести отцюда
                                        applyPromocode(promocode, token.name, setPromocodeBonus, setError)
                                            .catch(err => setError("Ошибка применения промокода"));
                                        setModal('');
                                    }}
                                    className='main__btn'
                                >
                                    Активировать
                                </button>
                            </>
                        )
                    }

                    {
                        modal === 'step1' && (
                            <>
                                <div>
                                    <h1>Авторизация</h1>
                                    <h2>Введите свой никнейм, чтобы пройти авторизацию на сайте</h2>
                                </div>
                                <input
                                    className={"main__input"}
                                    type="text"
                                    placeholder="Введите ваш никнейм..."
                                    value={userName}
                                    onChange={handleInputChange}
                                />
                                <div>
                                    {!userData && <p className={userName && "search"}>{userName ? 'Ищем персонажа...' : 'Данные появятся после ввода никнейма'}</p>}
                                    {userData && (
                                        <div className={choice ? `${styles.user} ${styles.active}` : styles.user} onClick={() => setChoice(!choice)}>
                                            <img src={userData.avatarURL} alt="" />
                                            <h3><span>Никнейм</span> <br />{userData.name}</h3>
                                        </div>
                                    )}
                                </div>
                                <button
                                    style={choice ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0.5, pointerEvents: 'none' }}
                                    className="main__btn"
                                    onClick={async () => { // логіку винести в отдельну функцію нахуй
                                        if (userData) {
                                            await login(userData.name, setToken, userData)
                                                .catch(err => setError("Ошибка авторизации"));
                                            setModal('step2');
                                            fetchGames(userData.id, setGames, setError).catch(err => setError("Ошибка загрузки игр"));
                                        }
                                    }}
                                >
                                    Далее
                                </button>
                            </>
                        )
                    }

                    {
                        modal === 'step2' && (
                            <>
                                <div>
                                    <h1>Выберите ваш Place</h1>
                                    <h2>Чтобы продолжить, вам нужно выбрать имеющийся Place</h2>
                                </div>
                                {games.length < 1 &&
                                    <p className="search">Ищем place...</p>
                                }
                                {games.map((game) => (
                                    <div className={styles.user} onClick={() => handleGameSelect(game)} key={game.id} >
                                        <img src="images/place.png" alt="" />
                                        <h3><span>Place</span><br />{game.name}</h3>
                                    </div>
                                ))}
                            </>
                        )
                    }

                    {
                        modal === 'step3' && (
                            <>
                                <div>
                                    <h1>Установите цену на Game Pass</h1>
                                    <h2>Цена (на 43% больше, чем {robuxAmount + promocodeBonus} робуксов): {gamePassPrice}</h2>
                                </div>

                              {/* verifyGamePass перероби якось щоб кетч помилок в одну строку тобі ненада два раза кетчіти setError 2 рази */}
                                <button
                                    className='main__btn'
                                    onClick={() => verifyGamePass(selectedGame, gamePassPrice, setError, setModal, userData.name, robuxAmount).catch(err => setError("Ошибка проверки Game Pass"))}
                                >
                                    Проверить и продолжить
                                </button>
                                <button className='main__btn'>
                                    <a
                                        target='__blank'
                                        className='main__btn'
                                        href="https://create.roblox.com/dashboard/creations/experiences/4917567283/passes/877742805/sales"
                                    >
                                        Настроить Game Pass
                                    </a>
                                </button>
                            </>
                        )
                    }
                    {
                        modal === 'step4' && (
                            <>
                                <div>
                                    <h1>Тут типа оплата</h1>
                                    <h2>К оплате: {price}</h2>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        );
    };

    return (
        <div className="BuyRobux">
            {/* це неправильно Modals це компонент а не функція краще юзати <Modals />  */}
            {Modals()}

            <div className="main__container">
                <div className="input__container">
                    <div className='overlay'>
                        <h2>Ты платишь</h2>
                        <label>
                            <input
                                className='main__input'
                                type="number"
                                value={price}
                                onChange={handlePriceChange}
                                min="13.8"
                                max="100"
                                step="0.01"
                            />
                            <div className="image">
                                <img src="images/ruble.svg" alt="" />
                            </div>
                        </label>
                    </div>
                    <div className='overlay'>
                        <h2>Ты получаешь</h2>
                        <label>
                            <input
                                className='main__input'
                                type="number"
                                value={robuxAmount + promocodeBonus}
                                onChange={handleRobuxChange}
                                min="20"
                                max="10000"
                            />
                            <div className='image'>
                                <img src="images/robux.png" alt="" />
                            </div>
                        </label>
                    </div>
                </div>
                <div className="range__container">
                    <input
                        type="range"
                        min="20"
                        max="10000"
                        step="5"
                        value={robuxAmount}
                        onChange={handleRobuxChange}
                        onInput={handleRobuxChange}
                    />
                    <div
                        className='robux__counter'
                        style={{
                            left: `calc(${(robuxAmount - 20) / (10000 - 20) * 100}% + ${20 - (40 * (robuxAmount - 20) / (10000 - 20))}px)`
                        }}
                    >
                        {robuxAmount + promocodeBonus}
                    </div>
                </div>
                {promocodeBonus > 0 && (
                    <div className="bonus">
                        Промокод применен! Ваш бонус: {promocodeBonus} робуксов.
                    </div>
                )}
                <button
                    className='main__btn'
                    onClick={() => {
                        setModal('step1');
                    }}
                >
                    Купить робуксы
                </button>
                <span onClick={() => setModal('promocode')}>У меня есть промокод</span>
            </div>
        </div>
    );
}
