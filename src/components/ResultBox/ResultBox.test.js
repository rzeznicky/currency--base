import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';



describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            { amount: '100.00', from: 'PLN', to: 'USD', resultAmount: '28.57' },
            { amount: '20.00', from: 'PLN', to: 'USD', resultAmount: '5.71' },
            { amount: '200.00', from: 'PLN', to: 'USD', resultAmount: '57.14' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`PLN ${testObj.amount} = $${testObj.resultAmount}`);
            cleanup();
        }
    });
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100.00', from: 'USD', to: 'PLN', resultAmount: '350.00' },
            { amount: '20.00', from: 'USD', to: 'PLN', resultAmount: '70.00' },
            { amount: '7.00', from: 'USD', to: 'PLN', resultAmount: '24.50' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`$${testObj.amount} = PLN ${testObj.resultAmount}`);
            cleanup();
        }
    });
    it('should render proper info about conversion when PLN -> PLN', () => {
        const testCases = [
            { amount: '100.00', from: 'PLN', to: 'PLN', resultAmount: '100.00' },
            { amount: '5.00', from: 'PLN', to: 'PLN', resultAmount: '5.00' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`PLN ${testObj.amount} = PLN ${testObj.resultAmount}`);
            cleanup();
        }
    });
    it('should render proper info about conversion when USD -> USD', () => {
        const testCases = [
            { amount: '30.00', from: 'USD', to: 'USD', resultAmount: '30.00' },
            { amount: '5.00', from: 'USD', to: 'USD', resultAmount: '5.00' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`$${testObj.amount} = $${testObj.resultAmount}`);
            cleanup();
        }
    });
    it('should render text wrong value when input is less than 0', () => {
        render(<ResultBox from="PLN" to="USD" amount={-1} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent("Wrong value");
    });
});