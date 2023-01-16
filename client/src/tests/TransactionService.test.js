import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import transactionService from '../services/transaction.service';

const mockTransactions = {
    type: 1,
    date: "22/12/2022",
    product: "CURSO BEM ESTAR",
    salesman: "Joao Silva",
    value: "5000"
}

describe('testing transaction API service', () => {
    let mock;
    beforeEach(() => {
      mock = new MockAdapter(axios);
    });

    it('should return all transactions when the getAll endpoint is called', async () => {
        mock.onGet('/transactions').reply(200, mockTransactions);
        transactionService.getAll = jest.fn().mockReturnValue(mockTransactions);
        const actualTransactions = await transactionService.getAll();
        expect(actualTransactions).toEqual(mockTransactions);
    });

    it('should return all transactions by producers', async () => {
        mock.onGet('/transactions/getByProducer/', {name: 'Joao Silva'}).reply(200, mockTransactions);
        transactionService.getByProducer = jest.fn().mockReturnValue(mockTransactions);
        const actualTransactions = await transactionService.getByProducer();
        expect(actualTransactions).toEqual(mockTransactions);
    });
});