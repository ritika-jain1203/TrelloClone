import renderer from 'react-test-renderer'
import ToDoCard from './ToDoCard'
import React from 'react'

test('should render Todo correctly', () => {
    const tree = renderer
        .create(
            <ToDoCard
                items={[
                    {
                        text: 'random-todo',
                        key: 'key',
                    },
                ]}
            ></ToDoCard>
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})
