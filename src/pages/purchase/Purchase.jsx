import './purchase.sass'
import BuyRobux from '../../components/buyRobux/BuyRobux';

export default function Purchase({token, setError, setToken}) {
 

    return (
        <div className="Purchase">
            <div className="container">
                <h1>Лучшие робуксы по <br /> выгодным ценам!</h1>
                <BuyRobux token={token} setError={setError} setToken={setToken}/>
            </div>
        </div>
    );
}
