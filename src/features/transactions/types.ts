export interface ITransaction{
    id: string;
    fromAccount: string;
    toAccount: string;
    description: string;
    amount: number;
    date?: Date;
    owner: {
      id: string;
      name: string;
    }
}