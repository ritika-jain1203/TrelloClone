import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Todo from './Todo'
import React from 'react'

test('should render Todo correctly', () => {
    const tree = renderer.create(<Todo />).toJSON()
    expect(tree).toMatchSnapshot()
})

test('should add todo', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<Todo />)
    const input = getByPlaceholderText('Enter Text Here')
    fireEvent.change(input, { target: { value: 'test-todo-1' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(getByDisplayValue('test-todo-1')).toBeInTheDocument()
})

test('should not add todo', () => {
    const tree = renderer.create(<Todo />).toJSON()
    const { getByPlaceholderText } = render(<Todo />)
    const input = getByPlaceholderText('Enter Text Here')
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(tree).toMatchSnapshot()
})

test('should delete todo', () => {
    const {
        getByPlaceholderText,
        getByDisplayValue,
        getByText,
        getByTestId,
    } = render(<Todo />)
    const input = getByPlaceholderText('Enter Text Here')
    fireEvent.change(input, { target: { value: 'test-todo-3' } })
    const btn = getByText('ADD')
    fireEvent.click(btn)
    fireEvent.click(getByTestId('delete-button'))
    expect(() => getByDisplayValue('test-todo-3')).toThrowError()
})

test('should edit the todo', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<Todo />)
    const input = getByPlaceholderText('Enter Text Here')
    fireEvent.change(input, { target: { value: 'test-todo-3' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    const todo = getByDisplayValue('test-todo-3')
    fireEvent.change(todo, { target: { value: 'test-todo-edited' } })
    expect(getByDisplayValue('test-todo-edited')).toBeInTheDocument()
})
