import axios from "axios"
import { useEffect, useState } from "react";

import './bonuses.sass'
import './phone.sass'
import { getUserInfo } from "../../http/bonusesAPI";

export default function Bonuses({ token }) {
    const [bonuses, setBonuses] = useState(0)
    const [referrals, setReferrals] = useState(0)
    useEffect(() => {
        getUserInfo(token.name, setBonuses, setReferrals)

    }, [token])

    return (
        <div className="Bonuses">
            <div className="container">
                <div className="main__info">
                    <div>
                        <h2>Друзей приглашено</h2>
                        <p>{referrals}</p>
                    </div>
                    <div>
                        <h2>Бонусный баланс</h2>
                        <p>{bonuses} R$</p>
                    </div>
                </div>
                <div className="copy__code">
                    <h2>Твой промокод</h2>
                    <p>{token.name.toUpperCase()} <button className="main__btn" onClick={() => navigator.clipboard.writeText(token.name.toUpperCase())}>Скопировать</button></p>
                </div>
            </div>
        </div>
    )
}