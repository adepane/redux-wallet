import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {
        "id": 0,
        "email": "",
        "first_name": "J",
        "last_name": "",
        "avatar": ""
    }, balance: 50000 }

export const userAsync = createAsyncThunk(
    'wallet/fetchUser',
    async (id) => {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        console.log(response)
        return response.data.data;
    }
);

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(userAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(userAsync.pending, (state, action) => {
                state.user = 'loading';
            })
            .addCase(userAsync.rejected, (state, action) => {
                console.log(state)
            })
    }
});

export const { deposit, withdraw } = walletSlice.actions;

// nama .wallet. tergantung dari configureStore
export const selectUser = state => state.wallet.user;
export const selectBalance = state => state.wallet.balance;

export default walletSlice.reducer;