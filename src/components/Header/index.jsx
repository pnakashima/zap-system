import { useHistory } from "react-router"

const Header = () => {

    const history = useHistory()

    return (
        <div className="header-container">
            <div>
                <h1 className="title">ZAP SYSTEM</h1>
            </div>
            <div>
                <span onClick={() => history.push("/")}>Dashboard</span>
                <span onClick={() => history.push("/list")}>Mensagens</span>
            </div>
        </div>)

}

export default Header