import './purchases.sass'
import './phone.sass'

export default function Purchases({ token }) {


    return (
        <div className="Purchases">
            <div className="container">
                <h1>История покупок</h1>
                <div className="history__container">
                    <div className="order">
                        <h2>ID: 1</h2>
                        <p>Количество робуксов: <span className='amount'>100 <img src="images/robux.png" alt="" /></span> </p>
                        <p>Стоимость: <span className='amount'>100 <img src="images/ruble.svg" alt="" /></span> </p>
                        <p>Статус: <span className="success">Выполнено</span></p>
                        <p>Дата: <span className='date'>n</span></p>
                    </div>
                    <div className="order">
                        <h2>ID: 1</h2>
                        <p>Количество робуксов: <span className='amount'>100 <img src="images/robux.png" alt="" /></span> </p>
                        <p>Стоимость: <span className='amount'>100 <img src="images/ruble.svg" alt="" /></span> </p>
                        <p>Статус: <span className="wait">Ожидание</span></p>
                        <p>Дата: <span className='date'>n</span></p>
                    </div>
                    <div className="order">
                        <h2>ID: 1</h2>
                        <p>Количество робуксов: <span className='amount'>100 <img src="images/robux.png" alt="" /></span> </p>
                        <p>Стоимость: <span className='amount'>100 <img src="images/ruble.svg" alt="" /></span> </p>
                        <p>Статус: <span className="success">Выполнено</span></p>
                        <p>Дата: <span className='date'>n</span></p>
                    </div>
                    <div className="order">
                        <h2>ID: 1</h2>
                        <p>Количество робуксов: <span className='amount'>100 <img src="images/robux.png" alt="" /></span> </p>
                        <p>Стоимость: <span className='amount'>100 <img src="images/ruble.svg" alt="" /></span> </p>
                        <p>Статус: <span className="success">Выполнено</span></p>
                        <p>Дата: <span className='date'>n</span></p>
                    </div>
                    <div className="order">
                        <h2>ID: 1</h2>
                        <p>Количество робуксов: <span className='amount'>100 <img src="images/robux.png" alt="" /></span> </p>
                        <p>Стоимость: <span className='amount'>100 <img src="images/ruble.svg" alt="" /></span> </p>
                        <p>Статус: <span className="success">Выполнено</span></p>
                        <p>Дата: <span className='date'>n</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
