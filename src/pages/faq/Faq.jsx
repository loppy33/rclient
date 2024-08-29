import React, { useState } from 'react';
import './faq.sass';
import './phone.sass';

export default function Faq() {
    // Массив объектов, содержащий вопросы и ответы
    const faqData = [
        { 
            question: 'Как купить робуксы?', 
            answer: (
                <>
                    RBXSell подготовила видеоинструкции по <a href="ВАША_ССЫЛКА_НА_ПК">покупке робуксов на ПК</a> и <a href="ВАША_ССЫЛКА_НА_ТЕЛЕФОН">телефоне</a>. При оформлении заказа есть встроенная текстовая инструкция.
                </>
            ) 
        },
        { 
            question: 'Бесплатные робуксы?', 
            answer: (
                <>
                    Чтобы получить робуксы бесплатно, участвуйте в розыгрышах в наших соцсетях, а именно <a href="ВАША_ССЫЛКА_НА_ВКОНТАКТЕ">ВКонтакте</a> и <a href="ВАША_ССЫЛКА_НА_ДИСКОРД">Дискорд</a>.
                </>
            ) 
        },
        { 
            question: 'Можно ли вернуть деньги после оплаты?', 
            answer: 'Покупки на нашем сайте окончательные. После отправки робуксов, вернуть деньги за заказ нельзя. Если вы попросили до выполнения, ваша просьба может быть принята.' 
        },
        { 
            question: 'Мне не пришли робуксы!', 
            answer: (
                <>
                    Будьте внимательны, у каждого метода своё время ожидания робуксов, если вы всё сделали по инструкции, то вам обязательно всё придёт! Если время ожидания превышено ожидаемое, напишите в поддержку через личные сообщения нашей группы <a href="ВАША_ССЫЛКА_НА_ВКОНТАКТЕ">ВКонтакте</a>.
                </>
            ) 
        },
        { 
            question: 'Можно ли сделать несколько заказов подряд?', 
            answer: 'Да, вы можете сделать несколько заказов подряд, не дожидаясь их получения. Но вам нужно создать новый геймпасс.' 
        },
        { 
            question: 'Вы меня не обманете?', 
            answer: (
                <>
                    Мы честный сайт и никого не обманываем, а всегда выдаём все купленные робуксы. Вы можете почитать отзывы в нашей группе <a href="ВАША_ССЫЛКА_НА_ВКОНТАКТЕ">ВКонтакте</a>, чтобы убедиться в надёжности наших услуг. Также наша поддержка всегда готова ответить на все ваши вопросы.
                </>
            ) 
        },
        { 
            question: 'Когда придут робуксы?', 
            answer: (
                <>
                    Если робуксы в наличии на момент покупки, валюта доставляется на ваш аккаунт моментально. В самом роблоксе Pending Robux занимает 5-7 дней. Посмотреть можно по ссылке: <a href="https://www.roblox.com/transactions">https://www.roblox.com/transactions</a>.
                </>
            ) 
        },
        { 
            question: 'Как долго может идти обработка?', 
            answer: 'Если у вас статус заказа обработка это означает что не хватает робуксов для выдачи вашего заказа примерно время ожидания 1-24 часа. Но зависимо от накопленных заказов и проблем которые могут возникнуть, время доставки может увеличиться.' 
        },
        { 
            question: 'Мне не отвечают в поддержке?', 
            answer: 'Обычно время ожидания ответа в поддержке занимает 24ч, но в особо загруженные дни может вырасти до 72ч.' 
        },
        { 
            question: 'Сайт имеет другие ссылки?', 
            answer: 'Не попадитесь на мошенников, они делают копии нашего сайта и обычно не выдают робуксы никогда! У нашего сайта один адрес: rbxsell.com' 
        },
        { 
            question: 'Как пригласить друга?', 
            answer: 'На странице бонусы будет стоять ваш код, вы должны отправить его вашему другу. Если он использует его при первой покупке на сумму которая превышает 250 R$, вы и ваш друг получите 20 R$.' 
        },
    ];

    // Создаем состояние для отслеживания видимости каждого ответа
    const [visibleAnswers, setVisibleAnswers] = useState(
        Array(faqData.length).fill(false)
    );

    // Функция для переключения видимости ответа
    const toggleAnswer = (index) => {
        setVisibleAnswers(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    // Разделяем вопросы на две части
    const leftColumnData = faqData.slice(0, Math.ceil(faqData.length / 2));
    const rightColumnData = faqData.slice(Math.ceil(faqData.length / 2));

    return (
        <div className="Faq container">
            <h1>FAQ (ЧАВО)</h1>
            <h2><span>Любой</span> ответ на <span>любой вопрос</span> тут</h2>
            <div className="videos__container">
                <a href='#/' className="video">
                    <img src="images/1.png" alt="" />
                    <p>Название видео Название видео Название видео</p>
                </a>
                <a href='#/' className="video">
                    <img src="images/1.png" alt="" />
                    <p>Название видео Название видео Название видео</p>
                </a>
            </div>
            <div className="faq__columns">
                <div className="faq__column">
                    {leftColumnData.map((item, index) => (
                        <div className="answer" onClick={() => toggleAnswer(index)} key={index}>
                            <h3>
                                {item.question}  <img
                                    style={{ transform: visibleAnswers[index] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    src="images/arrow.svg"
                                    alt=""
                                />
                            </h3>
                            {visibleAnswers[index] && <p>{item.answer}</p>}
                        </div>
                    ))}
                </div>
                <div className="faq__column">
                    {rightColumnData.map((item, index) => (
                        <div className="answer" onClick={() => toggleAnswer(index + leftColumnData.length)} key={index + leftColumnData.length}>
                            <h3>
                                {item.question}  <img
                                    style={{ transform: visibleAnswers[index + leftColumnData.length] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    src="images/arrow.svg"
                                    alt=""
                                />
                            </h3>
                            {visibleAnswers[index + leftColumnData.length] && <p>{item.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
