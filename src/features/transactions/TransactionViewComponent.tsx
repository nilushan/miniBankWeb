
// import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ITransactionStateValue, selectTransactions } from './transactionSlice';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';

import { ITransaction } from './types';
import { Col, Row } from 'react-bootstrap/esm';
import { useState } from 'react';

interface ITransactionViewProps {
    transactionId: string;
    show: boolean;
    handleClose: () => void;

}
export function TransactionViewComponent(props: ITransactionViewProps) {

    const [formValues, setFormValueObject] = useState({});

    const setFormValue = ( field: string, value: any) => {
        setFormValueObject( {...formValues, [field]: value});
    }

    const transactions = useAppSelector(selectTransactions);
    // const dispatch = useAppDispatch();

    let transaction: ITransaction | undefined;
    let transactionState: ITransactionStateValue | undefined;
    if (transactions.list.length > 0) {
        transactionState = transactions.list.find(trans => trans.transaction.id === props.transactionId);
        transaction = transactionState?.transaction;
    }


    return (

        <Modal
            show={props.show}
            onHide={props.handleClose}
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
                                (transactions.status === 'idle' && transaction === undefined) ?
                                    <Alert key='transaction-not-found' variant='warning'>  Transaction not found  </Alert>
                                    :
                                    transactionState && transactionState.status === 'loading' ?
                                        <Spinner animation="border" variant="primary" />
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
                                                        <Form.Control type="textbox" defaultValue={transaction ? transaction?.fromAccount : ''} onChange={ e => setFormValue('fromAccount' , e.target.value) } />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId='transactionToAccount'>
                                                    <Form.Label column sm="3" > To Account</Form.Label>
                                                    <Col sm="9">
                                                        <Form.Control type="textbox" defaultValue={transaction ? transaction?.toAccount : ''} onChange={ e => setFormValue('toAccount' , e.target.value)} />
                                                    </Col>
                                                </Form.Group>


                                                <Form.Group as={Row} controlId='transactionDescription'>
                                                    <Form.Label column sm="3" > Description</Form.Label>
                                                    <Col sm="9">
                                                        <Form.Control type="textbox" defaultValue={transaction ? transaction?.description : ''} onChange={ e => setFormValue('description' , e.target.value)} />
                                                    </Col>
                                                </Form.Group>


                                                <Form.Group as={Row} controlId='transactionAmount'>
                                                    <Form.Label column sm="3" > Amount</Form.Label>
                                                    <Col sm="9">
                                                        <Form.Control type="textbox" defaultValue={transaction ? transaction?.amount : ''} onChange={ e => setFormValue('amount' , e.target.value)}/>
                                                    </Col>
                                                </Form.Group>


                                                <Form.Group as={Row} controlId='transactionOwner'>
                                                    <Form.Label column sm="3" > Owner</Form.Label>
                                                    <Col sm="9">
                                                        <Form.Control type="textbox" defaultValue={transaction ? transaction?.owner.name : ''} onChange={ e => setFormValue('ownername' , e.target.value)}/>
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
                <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>



    )
}