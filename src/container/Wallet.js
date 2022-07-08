import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, selectBalance, selectUser, userAsync, withdraw } from "../reducers/walletSlice";
// import { selectBalance, selectUser } from "../rootReducer";

const Wallet = () => {
    
    const user = useSelector(selectUser);
    const balance = useSelector(selectBalance);

    const [currentAmount, setCurrentAmount] = useState(0);
    const [currentId, setCurrentId] = useState(0);

    const dispatch = useDispatch();

    const onWithdraw = (amount) => {
        dispatch(withdraw(amount))
    }

    const onDeposit = (amount) => {
        dispatch(deposit(amount))
    }

    const handleGetUserById = () => {
        dispatch(userAsync(currentId))
    }

    useEffect(() => {
        dispatch(userAsync(currentId));
    }, []);

    return (
        <div>
            <img src={user.avatar} alt={'avatar' + user.avatar} />
            <h1>{user.first_name} Wallet</h1>
            <h2>Balance: Rp. {balance.toLocaleString('ID')}</h2>
            <br></br>
            <input type="number" onChange={(e) => setCurrentId(parseInt(e.target.value))} />
            <button onClick={handleGetUserById}>Get User</button>
            <br></br>
            <button onClick={() => onDeposit({ 'amount': 10000 })}>Deposit 10.000</button>
            <button onClick={() => onWithdraw({ 'amount': 10000 })}>Withdraw 10.000</button>
            <br/>
            <input type="number" onChange={(e) => setCurrentAmount(parseInt(e.target.value))}/>
            <button onClick={() => onDeposit({amount: currentAmount})}>Deposit 10.000</button>
            <button onClick={() => onWithdraw({amount: currentAmount})}>Withdraw 10.000</button>
        </div>
    );
}

export default Wallet;