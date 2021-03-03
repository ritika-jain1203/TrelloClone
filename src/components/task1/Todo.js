import './Todo.css'
import React from 'react'
import ToDoCard from './ToDoCard'

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            currentItem: {
                text: '',
                key: '',
            },
        }
    }

    handleInput = (e) => {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now(),
            },
        })
    }
    addItem = (e) => {
        e.preventDefault()
        const newItem = this.state.currentItem
        if (newItem.text !== '') {
            const newItems = [...this.state.items, newItem]
            this.setState({
                items: newItems,
                currentItem: {
                    text: '',
                    key: '',
                },
            })
        }
    }
    deleteItem = (key) => {
        const filteredItems = this.state.items.filter(
            (item) => item.key !== key
        )
        this.setState({
            items: filteredItems,
        })
    }
    updateItems = (text, key) => {
        const items = this.state.items
        const updatedItems = items.map((item) => {
            return item.key === key ? { text, key } : item
        })
        this.setState({
            items: updatedItems,
        })
    }
    render() {
        return (
            <div className="Todo">
                <header>
                    <div className="text-center">
                        <h1 className="to-do-heading">To-Do List</h1>
                    </div>
                    <form className="to-do-form" onSubmit={this.addItem}>
                        <input
                            type="text"
                            placeholder="Enter Text Here"
                            value={this.state.currentItem.text}
                            onChange={this.handleInput}
                        />
                        <button type="submit">ADD</button>
                    </form>
                </header>
                <ToDoCard
                    items={this.state.items}
                    deleteItem={this.deleteItem}
                    updateItems={this.updateItems}
                ></ToDoCard>
            </div>
        )
    }
}

export default Todo
