import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchTransactions } from './TransactionApi';
import { ITransaction } from './types';

import { enableMapSet } from 'immer'

enableMapSet()

export interface ITransactionStateValue {
    transaction: ITransaction;
    status: 'idle' | 'loading' | 'failed';
}

export interface ITransactionsState {
    list: Array< ITransactionStateValue>;
    status: 'init' | 'idle' | 'loading' | 'failed';

}

const initialState: ITransactionsState = {
    list: [],
    status: 'init'
}

export const loadTransactionsAsync = createAsyncThunk(
    'transactions/loadAll',
    async (): Promise<ITransaction[]> => {
        const response = await fetchTransactions();
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);


export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTransactionsAsync.pending, (state) => {
                state.status = 'loading';
                // state.map = new Map();
            })
            .addCase(loadTransactionsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.list = [];
                action.payload.forEach(val => {
                    state.list.push({ transaction: val, status: 'idle' })
                })
            })
            .addCase(loadTransactionsAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
})


export const selectTransactions = (state: RootState): ITransactionsState =>{ return state.transactions }


export default transactionsSlice.reducer;