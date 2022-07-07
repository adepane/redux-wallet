import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBalance, selectUser } from "../rootReducer";

const Wallet = () => {
    
    const user = useSelector(selectUser);
    const balance = useSelector(selectBalance);

    const [currentAmount, setCurrentAmount] = useState();

    const dispatch = useDispatch();

    const onWithdraw = (amount) => {
        dispatch({
            type: "withdraw",
            amount: amount,
        })
    }

    const onDeposit = (amount) => {
        dispatch({
            type: "deposit",
            amount: amount,
        })
    }
    return (
        <div>
            <h1>{user} Wallet</h1>
            <h2>Balance: Rp. {balance.toLocaleString('ID')}</h2>
            <button onClick={() => onWithdraw(10000)}>Deposit 10.000</button>
            <button onClick={() => onDeposit(10000)}>Withdraw 10.000</button>
            <br/>
            <input type="number" onChange={(e) => setCurrentAmount(parseInt(e.target.value))}/>
            <button onClick={() => onWithdraw(currentAmount)}>Deposit 10.000</button>
            <button onClick={() => onDeposit(currentAmount)}>Withdraw 10.000</button>
        </div>
    );
}

export default Wallet;