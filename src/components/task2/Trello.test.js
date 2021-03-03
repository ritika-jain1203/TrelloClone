import React from 'react'
import renderer from 'react-test-renderer'
import Trello from './Trello'

test('renders app', () => {
    const tree = renderer.create(<Trello />).toJSON()
    expect(tree).toMatchSnapshot()
})
