import './SearchBar.css'
const SearchBar = ({ boards, setFilteredBoards }) => {
    return (
        <div className="search__wrapper">
            <form className="search-bar-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Jump to..."
                    onChange={(e) => {
                        const newFilteredBoards = boards.filter(({ name }) =>
                            name
                                .toLowerCase()
                                .includes(e.target.value.toLowerCase())
                        )
                        setFilteredBoards(newFilteredBoards)
                    }}
                />
                <i className="fas fa-search"></i>
            </form>
        </div>
    )
}
export default SearchBar
