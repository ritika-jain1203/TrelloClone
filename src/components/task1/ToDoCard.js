import React from 'react'
import './ToDoCard.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ToDoCard(props) {
    const items = props.items
    const listItems = items.map((item) => {
        return (
            <div className="to-do-card" key={item.key}>
                <p>
                    <input
                        type="text"
                        id={item.key}
                        value={item.text}
                        onChange={(e) => {
                            props.updateItems(e.target.value, item.key)
                        }}
                    />
                    <span>
                        <i
                            className="far fa-trash-alt"
                            icon="trash"
                            data-testid="delete-button"
                            onClick={() => props.deleteItem(item.key)}
                        />
                    </span>
                </p>
            </div>
        )
    })

    return <div>{listItems}</div>
}

export default ToDoCard
