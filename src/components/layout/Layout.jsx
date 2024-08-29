import './layout.sass';
import './phone.sass'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { SlSocialVkontakte } from "react-icons/sl";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Modal from '../modal/Modal';
import { useState } from 'react';

const Layout = ({ modal, setModal, token, setToken, error }) => {
  const [phoneMenu, setPhoneMenu] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  // Функция для проверки активного пути
  const isActive = (path) => location.pathname === path;

  const handleProtectedRoute = (path) => {
    phoneMenu ? setPhoneMenu(false) : null
    if (token) {
      navigate(path); // Перенаправляем на нужную страницу, если есть токен
    } else {
      setModal(true); // Открываем модальное окно, если токена нет
    }
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            <Link to="/"><img src="images/logo.jpg" alt="" /></Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link className={isActive("/") ? "active" : ""} to="/">Купить Робуксы</Link>

              </li>
              <li>
                <span
                  className={isActive("/bonuses") ? "active" : ""}
                  onClick={() => handleProtectedRoute("/bonuses")}
                >
                  Бонусы
                </span>
              </li>
              <li>
                <span
                  className={isActive("/purchases") ? "active" : ""}
                  onClick={() => handleProtectedRoute("/purchases")}
                >
                  Мои покупки
                </span>
              </li>
              <li>
                <Link className={isActive("/faq") ? "active" : ""} to="/faq">FAQ (ЧАВО)</Link>
              </li>
            </ul>
          </nav>
          <div className='menu'>
            {
              token ?
                <>
                  <div className="avatar">
                    <img src={token.avatarURL} alt="" />
                    <div onClick={() => setToken(null)} className="logout">
                      Выход
                    </div>
                  </div>
                </>
                :
                <>
                  <button onClick={() => setModal(!modal)} className='main__btn'>Войти в аккаунт</button>
                </>
            }
          </div>
          <img onClick={() => setPhoneMenu(!phoneMenu)} className='hamburger' src="images/hamburger.svg" alt="" />
        </div>
      </header>

      {modal ? <Modal setToken={setToken} setModal={setModal} /> : null}

      {phoneMenu &&
        <>
          <div className="phoneMenu">
            <div className="menu__container">
              <span className='close' onClick={() => setPhoneMenu(!phoneMenu)}>X</span>


              <nav>
                <ul>
                  <li>
                    <Link onClick={() => phoneMenu ? setPhoneMenu(false) : null} className={isActive("/") ? "active" : ""} to="/">Купить Робуксы</Link>
                  </li>
                  <li>
                    <span
                      className={isActive("/bonuses") ? "active" : ""}
                      onClick={() => handleProtectedRoute("/bonuses")}
                    >
                      Бонусы
                    </span>
                  </li>
                  <li>
                    <span
                      className={isActive("/purchases") ? "active" : ""}
                      onClick={() => handleProtectedRoute("/purchases")}
                    >
                      Мои покупки
                    </span>
                  </li>
                  <li>
                    <Link onClick={() => phoneMenu ? setPhoneMenu(false) : null} className={isActive("/faq") ? "active" : ""} to="/faq">FAQ (ЧАВО)</Link>
                  </li>
                </ul>
              </nav>
              <div className='menu'>
                {
                  token ?
                    <>
                      <div className="avatar">
                        <img src={token.avatarURL} alt="" />
                        <div onClick={() => setToken(null)} className="logout">
                          Выход
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <button onClick={() => { phoneMenu ? setPhoneMenu(false) : null; setModal(!modal) }} className='main__btn'>Войти в аккаунт</button>
                    </>
                }
              </div>
            </div>
          </div>
        </>
      }
      <Outlet />


      <div className={error ? "error active" : "error"}>
        <img src="images/error.svg" alt="" />
        <div>
          <h2>Упс... Ошибка!</h2>
          <p>{error}</p>
        </div>
      </div>
    </>
  )
};

export default Layout;
