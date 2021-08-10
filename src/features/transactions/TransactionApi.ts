import { ITransaction } from "./types";


export function fetchTransactions() {
    return new Promise<ITransaction[]>((resolve) =>
        setTimeout(() => resolve(
            [
                {
                    id: "221142e2-8240-4196-80df-fce8a711c462",
                    fromAccount: "123456",
                    toAccount: "789123",
                    description: "Third transaction description",
                    amount: 98765,
                    // date: new Date( Date.now()),
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
                    // date: new Date( Date.now()),
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
                    // date: new Date( Date.now()),
                    owner: {
                        id: "be9c4f94-0993-4b8f-a9bb-bf3b2ded22bc",
                        name: "Customer 1"
                    }
                },
            ]
        ), 1000)
    );
}
