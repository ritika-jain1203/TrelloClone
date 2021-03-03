import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { token, key } from '../config/config.json'
import SearchBar from '../SearchBar/SearchBar'
import './Home.css'

const BoardCard = ({ board, fetchData, setLoading }) => {
    const deleteBoard = async () => {
        setLoading(true)
        await axios.delete(
            `https://api.trello.com/1/boards/${board.id}?key=${key}&token=${token}`
        )
        fetchData()
    }
    return (
        <div
            className="board-card"
            style={{ backgroundImage: `url(${board.prefs.backgroundImage})` }}
        >
            <div className="board-link-header">
                <Link
                    to={`/trello/board/${board.id}`}
                    className="link-to-board"
                >
                    {board.name}
                </Link>
                <i
                    className="far fa-trash-alt"
                    data-testid="delete-board-button"
                    onClick={() => deleteBoard()}
                ></i>
            </div>
        </div>
    )
}

const Home = () => {
    const [boards, setBoards] = useState(null)
    const [currentBoard, setCurrentBoard] = useState('')
    const [filteredBoards, setFilteredBoards] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const fetchData = async () => {
        const url = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`
        const boardsJson = await axios.get(url)
        setBoards(boardsJson.data)
        setFilteredBoards(boardsJson.data)
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const addBoard = async (e) => {
        e.preventDefault()
        if (currentBoard !== '') {
            setLoading(true)
            await axios.post(
                `https://api.trello.com/1/boards/?key=${key}&token=${token}&name=${currentBoard}`
            )
            setCurrentBoard('')
            fetchData()
        }
    }
    if (isLoading) {
        return (
            <div className="loading-home">
                <img
                    src="https://media2.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.gif?cid=ecf05e47fo6yv05l6w7zbpy6d2ihiqd7fyse6xkwd3qn11n5&rid=giphy.gif"
                    alt="loading"
                ></img>
            </div>
        )
    } else {
        return (
            <div className="home-page">
                <div className="search-bar-header">
                    <SearchBar
                        boards={boards}
                        setFilteredBoards={setFilteredBoards}
                    />
                </div>
                <div className="content-home-page">
                    <div className="side-bar">
                        <div className="side-bar-content">
                            <p>Boards</p>
                        </div>
                        <div className="side-bar-content">
                            <p>Templates</p>
                        </div>
                        <div className="side-bar-content">
                            <p>Home</p>
                        </div>
                    </div>
                    <div className="boards-page">
                        <h4 className="boards-page-heading">My Boards</h4>
                        <div className="all-boards">
                            {filteredBoards &&
                                filteredBoards.map((board) => (
                                    <BoardCard
                                        board={board}
                                        key={board.id}
                                        fetchData={fetchData}
                                        setLoading={setLoading}
                                    />
                                ))}
                            <div className="add-board">
                                <div className="add-board-div">
                                    <form
                                        className="add-board-form"
                                        onSubmit={(e) => addBoard(e)}
                                    >
                                        <button
                                            type="submit"
                                            data-testid="add-board-button"
                                        >
                                            +
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Add New Board"
                                            value={currentBoard}
                                            onChange={(e) =>
                                                setCurrentBoard(e.target.value)
                                            }
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home
