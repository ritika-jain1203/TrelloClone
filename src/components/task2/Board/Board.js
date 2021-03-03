import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { token, key } from '../config/config.json'
import List from '../List/List'
import './Board.css'

const Board = () => {
    const { id } = useParams()
    const [board, setBoard] = useState({
        lists: null,
        backgroundImage: '',
    })
    const [currentList, setCurrentList] = useState('')
    const [boardName, setBoardName] = useState('')
    const [editBoardName, setEdit] = useState(false)
    const [isLoading, setLoading] = useState(true)

    const handleInput = (e) => {
        setCurrentList(e.target.value)
    }
    const updateBoardName = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.put(
            `https://api.trello.com/1/boards/${id}?key=${key}&token=${token}`,
            { name: boardName }
        )
        setLoading(false)
        setEdit(!editBoardName)
    }
    const resetBoardName = async (e) => {
        const resetBoard = await axios.get(
            `https://api.trello.com/1/boards/${id}?&key=${key}&token=${token}`
        )
        setBoardName(resetBoard.data.name)
    }
    const addList = async (e) => {
        e.preventDefault()
        if (currentList !== '') {
            setLoading(true)
            await axios.post(
                `https://api.trello.com/1/lists?key=${key}&token=${token}&name=${currentList}&idBoard=${id}`
            )
            const newList = await axios.get(
                `https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`
            )
            setBoard({
                lists: newList.data,
                backgroundImage: board.backgroundImage,
            })
            setCurrentList('')
            setLoading(false)
        }
    }
    const updateList = (listId) => {
        const updatedList = board.lists.filter((list) => list.id !== listId)
        setBoard({
            lists: updatedList,
            backgroundImage: board.backgroundImage,
        })
    }
    useEffect(() => {
        const fetchLists = () => {
            setLoading(true)
            axios
                .all([
                    axios.get(
                        `https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`
                    ),
                    axios.get(
                        `https://api.trello.com/1/boards/${id}?&key=${key}&token=${token}`
                    ),
                ])
                .then(
                    axios.spread((lists, boardDetails) => {
                        setBoard({
                            lists: lists.data,
                            backgroundImage:
                                boardDetails.data.prefs.backgroundImage,
                        })
                        setBoardName(boardDetails.data.name)
                        setLoading(false)
                    })
                )
        }
        fetchLists()
    }, [id])

    if (isLoading) {
        return (
            <div className="loading-board">
                <img
                    src="https://media2.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.gif?cid=ecf05e47fo6yv05l6w7zbpy6d2ihiqd7fyse6xkwd3qn11n5&rid=giphy.gif"
                    alt="loading"
                ></img>
            </div>
        )
    } else {
        return (
            <div
                className="board"
                style={{ backgroundImage: `url(${board.backgroundImage})` }}
            >
                <div className="board-header">
                    {editBoardName ? (
                        <form
                            className="edit-board-form"
                            onSubmit={(e) => updateBoardName(e)}
                        >
                            <input
                                type="text"
                                className="board-heading"
                                data-testid="edit-board-input"
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}
                            />
                            <div className="edit-board-buttons">
                                <button
                                    type="submit"
                                    className="update-board-button"
                                >
                                    Update
                                </button>
                                <button
                                    className="cancel-board-button"
                                    onClick={() => {
                                        setEdit(!editBoardName)
                                        resetBoardName()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="wrapper-board-heading">
                            <p
                                className="board-heading"
                                data-testid="board-heading-name"
                                onClick={() => {
                                    setEdit(!editBoardName)
                                }}
                            >
                                {boardName}
                            </p>
                        </div>
                    )}
                </div>
                <div className="board-content">
                    {board.lists &&
                        board.lists.map((listItem) => (
                            <List
                                listItem={listItem}
                                updateList={updateList}
                                key={listItem.id}
                                setLoading={setLoading}
                            />
                        ))}
                    <div className="add-list">
                        <div className="add-list-div">
                            <form
                                className="add-list-form"
                                onSubmit={(e) => addList(e)}
                            >
                                <button
                                    type="submit"
                                    data-testid="add-list-button"
                                >
                                    +
                                </button>
                                <input
                                    type="text"
                                    placeholder="Add new List"
                                    value={currentList}
                                    onChange={(e) => handleInput(e)}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Board
