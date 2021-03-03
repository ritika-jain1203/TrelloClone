import { Link } from 'react-router-dom'
import './Header.css'
const Header = () => {
    return (
        <div className="header">
            <div class="left-header">
                <div className="app-launcher">
                    <i class="fas fa-th"></i>
                </div>
                <div className="home-page">
                    <Link to={'/trello/boards'} className="link-to-home">
                        <i class="fas fa-home"></i>
                    </Link>
                </div>
                <div className="trello-icon">
                    <i class="fab fa-trello"></i>
                    <p>Boards</p>
                </div>
            </div>

            <div className="middle-header">
                <div className="trello-heading">
                    <img
                        src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.8835731c276d3777b6ee.gif"
                        alt="trello"
                        height={30}
                        width={'auto'}
                    ></img>
                </div>
            </div>

            <div className="right-header">
                <div className="create-menu">
                    <i class="fas fa-plus"></i>
                </div>

                <div className="notification">
                    <i class="far fa-bell"></i>
                </div>

                <div className="profile">
                    <i class="fas fa-user-circle"></i>
                </div>
            </div>
        </div>
    )
}
export default Header
