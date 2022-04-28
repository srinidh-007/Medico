import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Menubar.css';
import { IconContext } from 'react-icons';

function Menubar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='menubar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <a href="/"><h1 id="appName" style={{marginTop: "10px"}}>Medico</h1></a>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='menubar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                            <a href="/"><h1 id="appName" style={{marginTop: "10px"}}>Medico</h1></a>
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span className='spa'>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}


                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Menubar;
