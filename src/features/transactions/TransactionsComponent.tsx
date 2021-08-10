
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loadTransactionsAsync, selectTransactions } from './transactionSlice';
import Table from 'react-bootstrap/Table'

export function TransactionsComponent() {

    const transactions = useAppSelector(selectTransactions);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (transactions.list.length === 0) {
            dispatch(loadTransactionsAsync())
        }
    })

    const transactionDivs: any[] = [];


    return (
        <div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th> ID</th>
                        <th> Date</th>
                        <th> From </th>
                        <th> To</th>
                        <th> Description</th>
                        <th> Amount</th>
                        <th> Owner Id</th>
                        <th> Owner name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody key='trans-table-body'>
                    {
                        transactions.list.map((transaction, id) => {
                            return (
                                <tr key={'trans-table-body-tr-' + id}>
                                    <td> {transaction.transaction.id}</td>
                                    <td> {transaction.transaction.date}</td>
                                    <td> {transaction.transaction.fromAccount}</td>
                                    <td> {transaction.transaction.toAccount}</td>
                                    <td> {transaction.transaction.description}</td>
                                    <td> {transaction.transaction.amount}</td>
                                    <td> {transaction.transaction.owner.id}</td>
                                    <td> {transaction.transaction.owner.name}</td>
                                    <td>
                                        <i className="bi bi-pencil" ></i>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </Table>
        </div>

    )



}