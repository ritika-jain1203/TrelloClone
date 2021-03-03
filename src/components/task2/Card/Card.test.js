import React from 'react'
import Card from './Card'
import {
    fireEvent,
    getByTestId,
    getByText,
    render,
    screen,
} from '@testing-library/react'
import axios from 'axios'

describe('test for Card Component', () => {
    let container = null
    beforeEach(() => {
        container = render(
            <Card
                cardItem={{
                    id: '12345',
                    name: 'test-card',
                }}
                updateCards={() => true}
            />
        ).container
    })

    afterEach(() => {
        container = null
    })

    test('should render the Card', () => {
        expect(getByText(container, 'test-card')).toBeInTheDocument()
    })

    test('should edit the card', () => {
        const spy = jest
            .spyOn(axios, 'put')
            .mockImplementation(() => Promise.resolve(true))
        const card = getByText(container, 'test-card')
        fireEvent.click(card)
        const editCardInput = getByTestId(container, 'edit-card-input')
        fireEvent.change(editCardInput, { target: { value: 'card (edited)' } })
        fireEvent.click(getByText(container, 'Update'))
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should not edit the card', () => {
        const spy = jest
            .spyOn(axios, 'put')
            .mockImplementation(() => Promise.reject(new Error('Error')))
        const card = getByText(container, 'test-card')
        fireEvent.click(card)
        const editCardInput = getByTestId(container, 'edit-card-input')
        fireEvent.change(editCardInput, { target: { value: 'card (edited)' } })
        fireEvent.click(getByText(container, 'Update'))
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should delete the card', () => {
        const spy = jest
            .spyOn(axios, 'delete')
            .mockImplementation(() => Promise.resolve(true))
        const deleteButton = getByTestId(container, 'delete-card-button')
        fireEvent.click(deleteButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should not delete the card', () => {
        const spy = jest
            .spyOn(axios, 'delete')
            .mockImplementation(() => Promise.reject(new Error('Error')))
        const deleteButton = getByTestId(container, 'delete-card-button')
        fireEvent.click(deleteButton)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should toggle editCard', () => {
        const card = getByText(container, 'test-card')
        fireEvent.click(card)
        const editCardInput = getByTestId(container, 'edit-card-input')
        fireEvent.change(editCardInput, { target: { value: 'card(edited)' } })
        fireEvent.click(getByText(container, 'Cancel'))
        expect(() => {
            getByTestId(container, 'edit-card-input')
        }).toThrow()
    })
})
