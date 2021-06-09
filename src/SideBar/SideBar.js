import React, { useState } from "react";
import logo from '../ui/logo-coral.svg';
import kunal from '../ui/kunal.jpg';
import { getUser, removeUserSession } from '../Utils/Common';

import {
    NavLink,    
} from "react-router-dom";


function Sidebar(){

    const [nav, setNav] = useState([
        {label: "Home", slug: "home", icon: "icon-home"},
        {label: "All Courses", slug: "allcourses", icon: "icon-ul"},
        {label: "My Courses", slug: "my-courses", icon: "icon-briefcase"},
        {label: "Wishlist", slug: "wishlist", icon: "icon-tag"}
    ])

    const [loginFlag, setLoginFlag] = useState(true);
    const handleLogout = () => {
        removeUserSession();
        setLoginFlag(false);
    }

    var navigation = [];
    for(let i = 0; i < nav.length; i++){
        navigation.push(
            <li key={"nav-" + i + "-" + nav[i].slug}>
                <a href={"#/" + nav[i].slug} className={"aic link noul flex c333"}>
                    <div className={"ico s20 " + nav[i].icon} />
                    <h2 className="lbl s20">{nav[i].label}</h2>
                </a>
            </li>
        );
    }
    
    return (
        <div className="sidebar rel">
            <a href="#/home" className="logo bl">
                <img src={logo} className="bl" alt="Logo" />
            </a>

            <ul className="nav">
                {navigation}
            </ul>

             <div className="updated-course flex aic">
                <div className="icon-lamp-bright cfff s24 ico" />
                <div className="lbl s15 fontb c333">
                    Updated Courses
                    <h2 className="author s13 c777">by Kunal Chandegaonkar</h2>
                </div>
            </div>

            <div className="stats aic flex">

                <div className="stats-box flex">
                    <div className="ico ico-points s24 icon-shield" />
                    <h2 className="val s15 c333 fontb">1800</h2>
                    <h2 className="lbl s13 c777">points</h2>
                </div>

                <div className="stats-box flex">
                    <div className="ico ico-battery s24 icon-battery-90" />
                    <h2 className="val s15 c333 fontb">45.3%</h2>
                    <h2 className="lbl s13 c777">complete</h2>
                </div>

            </div>

            { getUser() && loginFlag &&
                <div className="me flex">
                    <div className="photo cfff s24">
                        <img src={kunal} className="bl" alt="User"/>
                    </div>
                    <div className="lbl s15 fontb c333">
                        Kunal Chandegaonkar
                        <h2 className="uname s13 c777">@kunalchandegaonkar</h2>                 
                    </div>
                </div> 
            }

            { getUser() && loginFlag && 
                <div className="me flex">
                    <div>
                        <NavLink to={"/home"} className={"aic link noul flex c333"}>
                            <input type="button" className="lbl s20" onClick={handleLogout} value="Logout" />
                        </NavLink>
                    </div>
                </div> 
            }

        </div>
    )
}

export default Sidebar;