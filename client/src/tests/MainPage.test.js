import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import MainPage from "../MainPage";
import userEvent from '@testing-library/user-event';

const transactionData = {
    type: 1,
    date: "22/12/2022",
    product: "CURSO BEM ESTAR",
    salesman: "Joao Silva",
    value: "5000"
}

describe('Page elements', () => {
    it("Check buttons in page", () => {
        // render the component on virtual dom
        render(<MainPage />);
        const getAllProducersBtn = screen.getByTestId("getAll");
        const chooseFileBtn = screen.getByTestId("chooseFile");
        const uploadBtn = screen.getByTestId("upload");
    
        //assert the expected result
        expect(getAllProducersBtn).toBeInTheDocument();
        expect(chooseFileBtn).toBeInTheDocument();
        expect(uploadBtn).toBeInTheDocument();
    });

});

describe('File upload', () => {
    it('Should choose file and show label', async () => {
        render(<MainPage/>);
        const fakeFile = new File(['hello'], 'hello.txt', { type: 'text/plain' });
        const inputFile = screen.getByTestId("fileInput");
        userEvent.upload(inputFile, fakeFile);
        await waitFor(() => expect(screen.queryByTestId('fileName')).toBeTruthy());
    });

    it('should render a typography label, file input field and disabled button', () => {
        render(<MainPage/>);
        expect(screen.getByTestId("fileInput")).toBeInTheDocument();
        expect(screen.getByTestId("fileName")).toBeInTheDocument();
        const button = screen.getByTestId("upload");
        expect(button).toHaveAttribute("aria-disabled");
    });
});