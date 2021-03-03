import React, { useState } from 'react'
import axios from 'axios'
import { token, key } from '../config/config.json'
import './Card.css'
const Card = ({ cardItem, updateCards, setLoading }) => {
    const [card, setCard] = useState(cardItem.name)
    const [editCard, setEdit] = useState(false)

    const updateCard = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.put(
            `https://api.trello.com/1/cards/${cardItem.id}?key=${key}&token=${token}`,
            { name: card }
        )
        setEdit(!editCard)
        setLoading(false)
    }
    const deleteCard = async () => {
        setLoading(true)
        await axios.delete(
            `https://api.trello.com/1/cards/${cardItem.id}?key=${key}&token=${token}`
        )
        updateCards(cardItem.id)
        setLoading(false)
    }
    return (
        <div className="card">
            {editCard ? (
                <form
                    className="edit-card-form"
                    onSubmit={(e) => updateCard(e)}
                >
                    <input
                        type="text"
                        value={card}
                        data-testid="edit-card-input"
                        onChange={(e) => setCard(e.target.value)}
                    />
                    <div className="edit-card-buttons">
                        <button type="submit" className="update-card-button">
                            Update
                        </button>
                        <button
                            className="cancel-card-button"
                            onClick={() => {
                                setEdit(!editCard)
                                setCard(cardItem.name)
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="wrapper-card">
                    <p
                        className="card-heading"
                        onClick={() => {
                            setEdit(!editCard)
                        }}
                    >
                        {card}
                    </p>
                    <i
                        class="far fa-trash-alt"
                        data-testid="delete-card-button"
                        onClick={() => deleteCard()}
                    ></i>
                </div>
            )}
        </div>
    )
}

export default Card
