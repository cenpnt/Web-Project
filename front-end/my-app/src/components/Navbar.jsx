

function Navbar() {
    return (
        <div className="navContainer">
            <nav>
                <div className="imageContainer">
                </div>
                <ul>
                    <li><img className="logo" src="https://www.se.kmitl.ac.th/assets/se.png" width={100}></img></li>
                    <li>Home</li>
                    <li>Reservation</li>
                    <li>Career Recommedation</li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar