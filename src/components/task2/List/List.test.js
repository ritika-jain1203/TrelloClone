import React from 'react'
import List from './List'
import {
    act,
    render,
    getByText,
    fireEvent,
    getByPlaceholderText,
    getByTestId,
} from '@testing-library/react'
import axios from 'axios'

describe('test for error', () => {
    test('should throw error', () => {
        const spy = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.reject(new Error('Error')))

        render(
            <List
                listItem={{
                    id: '12345',
                    name: 'test-card',
                }}
                updateList={() => true}
            />
        )

        expect(spy).toHaveBeenCalledTimes(1)
    })
})

describe('test for List component', () => {
    let container = null

    beforeEach(async () => {
        jest.spyOn(axios, 'get').mockImplementation(() =>
            Promise.resolve({
                data: [
                    {
                        id: '602a07d73395341b2019186b',
                        name: 'test-card',
                    },
                ],
            })
        )

        await act(() => {
            container = render(
                <List
                    listItem={{
                        id: '12345',
                        name: 'Test Card',
                    }}
                    updateList={() => true}
                />
            ).container
        })
    })

    afterEach(() => {
        container = null
    })

    test('should render', () => {
        expect(getByText(container, 'Test Card')).toBeInTheDocument()
    })

    test('should add a card', () => {
        const spy = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.resolve(true))
        const addCardInput = getByPlaceholderText(container, 'Add Another Card')
        fireEvent.change(addCardInput, { target: { value: 'new-card' } })
        const addCardButton = getByTestId(container, 'add-card-button')
        fireEvent.click(addCardButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should not add a card', () => {
        const spy = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.reject(new Error('Error')))
        const addCardInput = getByPlaceholderText(container, 'Add Another Card')
        fireEvent.change(addCardInput, { target: { value: 'new-card' } })
        const addCardButton = getByTestId(container, 'add-card-button')
        fireEvent.click(addCardButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should update the list name', () => {
        const spy = jest
            .spyOn(axios, 'put')
            .mockImplementation(() => Promise.resolve(true))
        const listName = getByTestId(container, 'list-name')
        fireEvent.click(listName)
        const editListName = getByTestId(container, 'edit-list-name')
        fireEvent.change(editListName, {
            target: { value: 'List name(edited)' },
        })
        fireEvent.click(getByText(container, 'Update'))
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should not update the list name', () => {
        const spy = jest
            .spyOn(axios, 'put')
            .mockImplementation(() => Promise.reject(new Error('Error')))
        const listName = getByTestId(container, 'list-name')
        fireEvent.click(listName)
        const editListName = getByTestId(container, 'edit-list-name')
        fireEvent.change(editListName, {
            target: { value: 'List name(edited)' },
        })
        fireEvent.click(getByText(container, 'Update'))
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should toggle editUI', () => {
        const listName = getByTestId(container, 'list-name')
        fireEvent.click(listName)
        const editListName = getByTestId(container, 'edit-list-name')
        fireEvent.change(editListName, {
            target: { value: 'List name(edited)' },
        })
        fireEvent.click(getByText(container, 'Cancel'))
        expect(() => {
            getByTestId(container, 'edit-list-name')
        }).toThrow()
    })

    test('should delete the list', () => {
        const spy = jest
            .spyOn(axios, 'put')
            .mockImplementation(() => Promise.resolve(true))
        const deleteListButton = getByTestId(container, 'delete-list-button')
        fireEvent.click(deleteListButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should not delete the list', () => {
        const spy = jest
            .spyOn(axios, 'put')
            .mockImplementation(() => Promise.reject(new Error('Error')))
        const deleteListButton = getByTestId(container, 'delete-list-button')
        fireEvent.click(deleteListButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })
})
