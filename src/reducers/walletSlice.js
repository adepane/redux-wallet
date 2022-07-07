import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: 'Busettttt', balance: 50000 }
const walletSlice = createSlice({
    name: "wallet",
    initialState: initialState,
    reducers: {
        withdraw: (state, action) => {
            if (state.balance >= action.payload.amount) {
                state.balance -= action.payload.amount;
            }
        },
        deposit: (state, action) => {
            state.balance += action.payload.amount;
        },
    }
});

export const { deposit, withdraw } = walletSlice.actions;

// nama .wallet. tergantung dari configureStore
export const selectUser = state => state.wallet.user;
export const selectBalance = state => state.wallet.balance;

export default walletSlice.reducer;