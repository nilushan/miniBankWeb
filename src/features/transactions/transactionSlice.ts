import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchTransactions, updateTransaction } from './TransactionApi';
import { ITransaction } from './types';

import { enableMapSet } from 'immer'

enableMapSet()

export interface ITransactionStateValue {
    transaction: ITransaction;
    status: 'init'|'idle' | 'loading' | 'failed';
}

export interface ITransactionsState {
    list: Array<ITransactionStateValue>;
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

export const updateTransactionsAsync = createAsyncThunk(
    'transactions/update',
    async (data: { id: string, data: ITransaction }): Promise<ITransaction> => {
        const response = await updateTransaction(data.id, data.data);
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
                    state.list.push({ transaction: val, status: 'init' })
                })
            })
            .addCase(loadTransactionsAsync.rejected, (state) => {
                state.status = 'failed';
            })

            .addCase(updateTransactionsAsync.pending, (state, action) => {
                const foundTransaction = state.list.find(
                    item => item.transaction.id === action.meta.arg.id
                )
                if (foundTransaction) {
                    foundTransaction.status = 'loading';
                }
            })
            .addCase(updateTransactionsAsync.rejected, (state, action) => {
                const foundTransaction = state.list.find(
                    item => item.transaction.id === action.meta.arg.id
                )
                if (foundTransaction) {
                    foundTransaction.status = 'failed';
                }
            })
            .addCase(updateTransactionsAsync.fulfilled, (state, action) => {
                const foundTransaction = state.list.find(
                    item => item.transaction.id === action.meta.arg.id
                )
                if (foundTransaction) {
                    if(  (action.payload as ITransaction ).id ){

                        foundTransaction.transaction = action.payload;
                    }
                    foundTransaction.status = 'idle'
                }
            })
    }
})


export const selectTransactions = (state: RootState): ITransactionsState => { return state.transactions }

export const selectTransaction = (state: RootState, id: string): ITransactionStateValue | undefined => { 

    const foundTransaction = state.transactions.list.find(
        item => item.transaction.id === id 
        
        )
        return foundTransaction;
}


export default transactionsSlice.reducer;