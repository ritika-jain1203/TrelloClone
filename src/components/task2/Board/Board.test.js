import React from 'react'
import Board from './Board'
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

describe('test for board', () => {
    let container = null

    beforeEach(async () => {
        jest.mock('react-router', () => ({
            useParams: jest
                .fn()
                .mockReturnValue({ boardId: '603252917084f754f3511cc2' }),
        }))

        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(true))

        jest.spyOn(axios, 'all').mockImplementation(() =>
            Promise.resolve([
                {
                    data: [
                        {
                            id: '603252917084f754f3511cc3',
                            name: 'To Do',
                            idBoard: '603252917084f754f3511cc2',
                        },
                    ],
                },
                {
                    data: {
                        name: 'test-board',
                        prefs: {
                            backgroundImage:
                                'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/29087b574035655ae3f595833542a117/photo-1613667023109-4af33e671503',
                        },
                    },
                },
            ])
        )

        const RenderWithRouter = () => (
            <MemoryRouter>
                <Board />
            </MemoryRouter>
        )

        await act(() => {
            container = render(<RenderWithRouter />).container
        })
    })

    afterEach(() => {
        container = null
    })

    test('should render', async () => {
        expect(getByText(container, 'To Do')).toBeInTheDocument()
    })

    test('should add a new list', () => {
        const spy = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.resolve(true))
        const addListInput = getByPlaceholderText(container, 'Add new List')
        fireEvent.change(addListInput, { target: { value: 'new-list' } })
        const addListButton = getByTestId(container, 'add-list-button')
        fireEvent.click(addListButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })
    test('should not add a new list', () => {
        const spy = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.reject(new Error('Error')))
        const addListInput = getByPlaceholderText(container, 'Add new List')
        fireEvent.change(addListInput, { target: { value: 'new-list' } })
        const addListButton = getByTestId(container, 'add-list-button')
        fireEvent.click(addListButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should edit the board name', () => {
        const spy = jest
            .spyOn(axios, 'put')
            .mockImplementation(() => Promise.resolve(true))
        const boardName = getByTestId(container, 'board-heading-name')
        fireEvent.click(boardName)
        const editBoardInput = getByTestId(container, 'edit-board-input')
        fireEvent.change(editBoardInput, {
            target: { value: 'board name(edited)' },
        })
        fireEvent.click(getByText(container, 'Update'))
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should not edit the board name', () => {
        const spy = jest
            .spyOn(axios, 'put')
            .mockImplementation(() => Promise.reject(new Error('Error')))
        const boardName = getByTestId(container, 'board-heading-name')
        fireEvent.click(boardName)
        const editBoardInput = getByTestId(container, 'edit-board-input')
        fireEvent.change(editBoardInput, {
            target: { value: 'board name(edited)' },
        })
        fireEvent.click(getByText(container, 'Update'))
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should toggle editBoardName', () => {
        const boardName = getByTestId(container, 'board-heading-name')
        fireEvent.click(boardName)
        const editBoardInput = getByTestId(container, 'edit-board-input')
        fireEvent.change(editBoardInput, {
            target: { value: 'board name(edited)' },
        })
        fireEvent.click(getByText(container, 'Cancel'))
        expect(() => {
            getByTestId(container, 'edit-board-input')
        }).toThrow()
    })
})
