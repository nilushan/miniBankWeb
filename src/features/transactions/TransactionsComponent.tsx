
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loadTransactionsAsync, selectTransactions } from './transactionSlice';
import { Table, Spinner, Modal, Button } from 'react-bootstrap';
import { TransactionViewComponent } from './TransactionViewComponent';

export function TransactionsComponent() {

    const transactions = useAppSelector(selectTransactions);
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);
    const [selectedTransactionId, setTransactionId] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (transactionId: string) => {
        setShow(true);
        setTransactionId(transactionId)
    }



    useEffect(() => {
        if (transactions.list.length === 0) {
            dispatch(loadTransactionsAsync())
        }
    })

    return (
        <div>

            <h2>Transactions</h2>
            {
                (transactions.status === 'loading' ?
                    <Spinner animation="border" variant="primary" />
                    :

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
                                            <td> {transaction.transaction.date ? new Date(transaction.transaction.date).toISOString() : ''}</td>
                                            <td> {transaction.transaction.fromAccount}</td>
                                            <td> {transaction.transaction.toAccount}</td>
                                            <td> {transaction.transaction.description}</td>
                                            <td> {transaction.transaction.amount}</td>
                                            <td> {transaction.transaction.owner.id}</td>
                                            <td> {transaction.transaction.owner.name}</td>
                                            <td>
                                                <Button className="bi bi-pencil" variant='light' onClick={() => handleShow(transaction.transaction.id)}> </Button>
                                                {/* <i className="bi bi-pencil" ></i> */}
                                            </td>
                                        </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                )
            }


            <TransactionViewComponent show={show} handleClose={handleClose} transactionId={selectedTransactionId} />

        </div>

    )
}