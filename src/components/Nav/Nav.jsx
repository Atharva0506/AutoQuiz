import React,{useState} from 'react'
import './Nav.css';
import './Nav.js';


function Nav() {
const [show,set] = useState(false);
    return (
        <header>
                 
               
            
        <nav>
       <div className="logo">
       <h1 className='logo'>AutoQuiz</h1>
       </div>

       <div className={show ? "links mLinks" : 'links mLinks'}>
            <ul>
                <li><a href=""><h2>Home</h2></a></li>
                <li><a href=""><h2>Documentation</h2></a></li>
                <li><a href=""><h2>About</h2></a></li>
                <li><a href=""><h2>F&Q</h2></a></li>
            </ul>
            {/* Hamburger */}

            </div>
        </nav>

        </header>
    )
}

export default Nav