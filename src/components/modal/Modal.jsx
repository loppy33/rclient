import React, { useState, useEffect } from 'react';
import styles from '../../styles/modal.module.sass';
import { getUser, login } from '../../http/modalAPI';

export default function Modal({ setToken, setModal }) {
    const [userName, setUserName] = useState('');
    const [userData, setUserData] = useState(null);
    const [choice, setChoice] = useState(false);


    useEffect(async() => { 
        if (userName) {
           await getUser(userName, setUserData, setChoice);
           return;
        }
        setUserData(null);
        setChoice(false);
    })

    // useEffect(() => {
    //     /// 
    //     // 
    //     const delayDebounceFn = setTimeout(() => {
    //         if (userName) {
    //             getUser(userName, setUserData, setChoice);

    //             console.log(userData.name);
                
    //         } else {
    //             setUserData(null);
    //             setChoice(false);
    //         }
    //     }, 500); // Delay of 500ms навіщо??

    //     return () => clearTimeout(delayDebounceFn);
    // }, [userName]);

    const handleInputChange = (event) => {
        setUserName(event.target.value);
    };

    return (
        <div className={styles.overlay__modal} onClick={() => setModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <span className={styles.close} onClick={() => setModal(false)}>X</span>

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
                    onClick={async () => {
                        await login(userData.name, setToken, userData);
                        setModal(false);
                    }}
                >
                    Далее
                </button>
            </div>
        </div>
    );
}
