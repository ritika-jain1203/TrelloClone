import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { token, key } from '../config/config.json'
import Card from '../Card/Card'
import './List.css'
const List = ({ listItem, updateList, setLoading }) => {
    //declaring the state of the component
    const [list, setList] = useState({
        cards: null,
        currentCardName: '',
    })
    const [currentListName, setListName] = useState(listItem.name)
    const [editUI, setEdit] = useState(false)

    // to change the current state
    const handleInput = (e) => {
        setList({
            cards: list.cards,
            currentCardName: e.target.value,
        })
    }
    const addCard = async (e) => {
        e.preventDefault()
        if (list.currentCardName !== '') {
            setLoading(true)
            await axios.post(
                `https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${listItem.id}&name=${list.currentCardName}`
            )
            const newCards = await axios.get(
                `https://api.trello.com/1/lists/${listItem.id}/cards?key=${key}&token=${token}`
            )

            setList({
                cards: newCards.data,
                currentCardName: '',
            })
            setLoading(false)
        }
    }
    // to update the card
    const updateCards = (cardId) => {
        const updatedCardList = list.cards.filter((card) => card.id !== cardId)
        setList({
            cards: updatedCardList,
        })
    }
    // edit the name of the list
    const updateListName = async (e) => {
        e.preventDefault()
        await axios.put(
            `https://api.trello.com/1/lists/${listItem.id}?key=${key}&token=${token}`,
            { name: currentListName }
        )
        setEdit(!editUI)
        console.log(currentListName)
    }
    const deleteList = async () => {
        setLoading(true)
        await axios.put(
            `https://api.trello.com/1/lists/${listItem.id}/closed?key=${key}&token=${token}`,
            {
                value: true,
            }
        )
        updateList(listItem.id)
        setLoading(false)
    }
    //useEffect

    useEffect(() => {
        const fetchCards = async () => {
            const cards = await axios.get(
                `https://api.trello.com/1/lists/${listItem.id}/cards?key=${key}&token=${token}`
            )
            setList({
                cards: cards.data,
            })
            setLoading(false)
        }
        fetchCards()
    }, [listItem.id, setLoading])
    return (
        <div className="list">
            <div className="list-header">
                {editUI ? (
                    <form
                        className="edit-list-form"
                        onSubmit={(e) => updateListName(e)}
                    >
                        <input
                            type="text"
                            data-testid="edit-list-name"
                            value={currentListName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                        <div className="edit-list-buttons">
                            <button
                                type="submit"
                                className="update-list-button"
                            >
                                Update
                            </button>
                            <button
                                className="cancel-list-button"
                                onClick={() => {
                                    setEdit(!editUI)
                                    setListName(listItem.name)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="wrapper-list">
                        <p
                            className="list-heading"
                            data-testid="list-name"
                            onClick={() => {
                                setEdit(!editUI)
                            }}
                        >
                            {currentListName}
                        </p>
                        <i
                            className="fas fa-times"
                            data-testid="delete-list-button"
                            onClick={() => deleteList()}
                        ></i>
                    </div>
                )}
            </div>
            <div className="list-content">
                {list.cards &&
                    list.cards.map((cardItem) => (
                        <Card
                            cardItem={cardItem}
                            key={cardItem.id}
                            updateCards={updateCards}
                            setLoading={setLoading}
                        />
                    ))}
                <form className="add-card-form" onSubmit={(e) => addCard(e)}>
                    <button type="submit" data-testid="add-card-button">
                        +
                    </button>
                    <input
                        type="text"
                        placeholder="Add Another Card"
                        value={list.currentCardName}
                        onChange={(e) => handleInput(e)}
                    />
                </form>
            </div>
        </div>
    )
}

export default List
