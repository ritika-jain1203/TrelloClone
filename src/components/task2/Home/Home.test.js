import React from 'react'
import Home from './Home'
import {
    act,
    render,
    getByText,
    fireEvent,
    getByPlaceholderText,
    getByTestId,
} from '@testing-library/react'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'

describe('test for Home component', () => {
    let container = null
    beforeEach(() => {
        jest.spyOn(axios, 'get').mockImplementation(() =>
            Promise.resolve({
                data: [
                    {
                        name: 'test-board',
                        id: '603252917084f754f3511cc2',
                        url: 'https://trello.com/b/KeWDhTQ5/test-board',
                        prefs: {
                            backgroundImage:
                                'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/971ccf50923a70ebe1cf88c8e5eff6f8/photo-1613667023109-4af33e671503.jpg',
                        },
                    },
                ],
            })
        )

        const RenderWithRouter = () => (
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        act(() => {
            container = render(<RenderWithRouter />).container
        })
    })

    afterEach(() => {
        container = null
    })

    test('should render Home', () => {
        expect(getByText(container, 'test-board')).toBeInTheDocument()
    })

    test('should add a new board', () => {
        const spy = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.resolve(true))
        const addBoardInput = getByPlaceholderText(container, 'Add New Board')
        fireEvent.change(addBoardInput, { target: { value: 'new board' } })
        const addBoardButton = getByTestId(container, 'add-board-button')
        fireEvent.click(addBoardButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should delete the board', () => {
        const spy = jest
            .spyOn(axios, 'delete')
            .mockImplementation(() => Promise.resolve(true))
        const deleteBoardButton = getByTestId(container, 'delete-board-button')
        fireEvent.click(deleteBoardButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })
})
