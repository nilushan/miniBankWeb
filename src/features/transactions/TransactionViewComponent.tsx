
// import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ITransactionStateValue, selectTransaction, selectTransactions, updateTransactionsAsync } from './transactionSlice';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';

import { ITransaction } from './types';
import { Col, Row } from 'react-bootstrap/esm';
import { useEffect, useState } from 'react';

interface ITransactionViewProps {
    transactionId: string;
    show: boolean;
    handleClose: () => void;
}
export function TransactionViewComponent(props: ITransactionViewProps) {

    const [formValues, setFormValueObject] = useState<any>({});
    const dispatch = useAppDispatch();

    useEffect(() => {
        // console.log( 'useeffect called');
    })

    const transactionState = useAppSelector((state) => selectTransaction(state, props.transactionId));

    let transaction: ITransaction | undefined;
    if (transactionState) {
        transaction = transactionState.transaction;
    }

    const setFormValue = (field: string, value: any) => {
        setFormValueObject({ ...formValues, [field]: value });
    }

    const setFormValueClear = () => {
        setFormValueObject({});
    }

    const saveUpdatedTransaction = () => {

        const updatedTransaction: any = { ...transaction };
        ['fromAccount', 'toAccount', "description", "amount",]
            .forEach(field => {

                if (formValues[field]) {
                    updatedTransaction[field] = formValues[field]
                }
            })

        const castUpdatedTransaction: ITransaction = updatedTransaction as ITransaction;
        dispatch(updateTransactionsAsync({ id: castUpdatedTransaction.id, data: castUpdatedTransaction }))
    }

    const handleClose = () => {
        setFormValueClear();
        props.handleClose();
    }

    return (

        <Modal
            show={props.show}
            onHide={handleClose}
            // backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Transaction View </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Row>
                    <Col >
                        {
                            (
                                (transactionState?.status === 'idle' && transaction === undefined) ?
                                    <Alert key='transaction-not-found' variant='warning'>  Transaction not found  </Alert>
                                    :
                                    transaction ?

                                        <Form>
                                            <Form.Group as={Row} controlId='transactionId'>
                                                <Form.Label column sm="3" > Transaction Id</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control plaintext readOnly defaultValue={transaction ? transaction.id : ''} ></Form.Control>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId='transactionDate'>
                                                <Form.Label column sm="3" > Date </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control plaintext readOnly defaultValue={transaction && transaction.date ? new Date(transaction?.date).toISOString() : ''} />
                                                </Col>
                                            </Form.Group>


                                            <Form.Group as={Row} controlId='transactionFromAccount'>
                                                <Form.Label column sm="3" > From Account</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="textbox" defaultValue={transaction ? transaction?.fromAccount : ''} onChange={e => setFormValue('fromAccount', e.target.value)} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId='transactionToAccount'>
                                                <Form.Label column sm="3" > To Account</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="textbox" defaultValue={transaction ? transaction?.toAccount : ''} onChange={e => setFormValue('toAccount', e.target.value)} />
                                                </Col>
                                            </Form.Group>


                                            <Form.Group as={Row} controlId='transactionDescription'>
                                                <Form.Label column sm="3" > Description</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="textbox" defaultValue={transaction ? transaction?.description : ''} onChange={e => setFormValue('description', e.target.value)} />
                                                </Col>
                                            </Form.Group>


                                            <Form.Group as={Row} controlId='transactionAmount'>
                                                <Form.Label column sm="3" > Amount</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="textbox" defaultValue={transaction ? transaction?.amount : ''} onChange={e => setFormValue('amount', e.target.value)} />
                                                </Col>
                                            </Form.Group>


                                            <Form.Group as={Row} controlId='transactionOwnerName'>
                                                <Form.Label column sm="3" > Owner Name</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="textbox" defaultValue={transaction ? transaction?.owner.name : ''} onChange={e => setFormValue('ownername', e.target.value)} />
                                                </Col>
                                            </Form.Group>


                                            <Form.Group as={Row} controlId='transactionOwnerId'>
                                                <Form.Label column sm="3" > Owner Id</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="textbox" defaultValue={transaction ? transaction?.owner.id : ''} onChange={e => setFormValue('ownerid', e.target.value)} />
                                                </Col>
                                            </Form.Group>

                                        </Form>
                                        :
                                        <></>
                            )
                        }

                    </Col>
                </Row>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant={ transactionState?.status === 'failed' ? "danger": transactionState?.status === 'idle' ? "success": "primary"} onClick={saveUpdatedTransaction} >
                    {transactionState?.status && transactionState.status === 'loading' ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="false"
                    /> : < ></>
                    }
                    Save changes</Button>
            </Modal.Footer>
        </Modal>



    )
}