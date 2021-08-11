export interface ITransaction{
    id: string;
    fromAccount: string;
    toAccount: string;
    description: string;
    amount: number;
    date?: number;
    owner: {
      id: string;
      name: string;
    }
}