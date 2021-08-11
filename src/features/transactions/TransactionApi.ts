import axios from 'axios';

import { ITransaction } from "./types";

// TODO move to a configuration file
const BackendBaseURL = 'https://alex-code-test.azurewebsites.net/api'
// const BackendBaseURL = 'https://localhost:5001/api'
const useTestDate = false;


export function fetchTransactions() {
    return new Promise<ITransaction[]>((resolve, reject) => {

        if (useTestDate) {
            loadTestTransactions(resolve)
        } else {
            axios(
                {
                    method: 'get',
                    url: BackendBaseURL + '/transactions',
                    // data: params,
                    headers: { 'content-type': 'application/json', 'charset': 'UTF-8' },

                }
            ).then((ret) => {
                resolve((ret.data))

            }).catch(err => {
                reject(err);
            })
        }
    })
}


function loadTestTransactions(resolve: (value: ITransaction[] | PromiseLike<ITransaction[]>) => void): void {
    setTimeout(() => resolve(
        [
            {
                id: "221142e2-8240-4196-80df-fce8a711c462",
                fromAccount: "123456",
                toAccount: "789123",
                description: "Third transaction description",
                amount: 98765,
                date: (Date.now()),
                owner: {
                    id: "be9c4f94-0993-4b8f-a9bb-bf3b2ded22bc",
                    name: "Customer 1"
                }
            },
            {
                id: "221142e2-8240-4196-80df-fce8a711c463",
                fromAccount: "123456",
                toAccount: "789123",
                description: "Third transaction description",
                amount: 1000,
                date: (Date.now()),
                owner: {
                    id: "be9c4f94-0993-4b8f-a9bb-bf3b2ded22bc",
                    name: "Customer 1"
                }
            },
            {
                id: "221142e2-8240-4196-80df-fce8a711c464",
                fromAccount: "123456",
                toAccount: "789123",
                description: "Third transaction description",
                amount: 2000,
                date: (Date.now()),
                owner: {
                    id: "be9c4f94-0993-4b8f-a9bb-bf3b2ded22bc",
                    name: "Customer 1"
                }
            },
            {
                id: "221142e2-8240-4196-80df-fce8a711c465",
                fromAccount: "123456",
                toAccount: "789123",
                description: "Third transaction description",
                amount: 98765,
                date: (Date.now()),
                owner: {
                    id: "be9c4f94-0993-4b8f-a9bb-bf3b2ded22bc",
                    name: "Customer 1"
                }
            },
            {
                id: "221142e2-8240-4196-80df-fce8a711c466",
                fromAccount: "123456",
                toAccount: "789123",
                description: "Third transaction description",
                amount: 1000,
                date: (Date.now()),
                owner: {
                    id: "be9c4f94-0993-4b8f-a9bb-bf3b2ded22bc",
                    name: "Customer 1"
                }
            },
            {
                id: "221142e2-8240-4196-80df-fce8a711c467",
                fromAccount: "123456",
                toAccount: "789123",
                description: "Third transaction description",
                amount: 2000,
                date: (Date.now()),
                owner: {
                    id: "be9c4f94-0993-4b8f-a9bb-bf3b2ded22bc",
                    name: "Customer 1"
                }
            },
        ]
    ), 1000);
}

export function updateTransaction(id: string, updatedValue: ITransaction) {
    return new Promise<ITransaction>((resolve, reject) =>
        // setTimeout(() => resolve(
        //     { ...updatedValue, id },
        // ), 1000)


        axios(
            {
                method: 'put',
                url: BackendBaseURL + '/transactions/' + id,
                data: JSON.stringify(updatedValue),
                headers: { 'content-type': 'application/json', 'charset': 'UTF-8' },
            }
        ).then((ret) => {
            resolve((ret.data))

        }).catch(err => {
            reject(err);
        })
    )
};