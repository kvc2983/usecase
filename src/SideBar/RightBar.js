import React, { useEffect, useState } from "react";

import Cake from "../ui/cake.png";

function Rightbar(){

    const [popularCourse, setPopularCourse] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/popular')
        .then(res => {
            if(!res.ok) {
                throw Error("Endpoint popular courses from right sidebar is failed to fetch data");
            }
            return res.json();
        })
        .then(data => {
            setPopularCourse(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        });
    }, [])
    

    var courseList = [];
    { isPending && <div>Loading...</div> }
    if(popularCourse && !isPending && !error) {
    for(let i = 0; i < popularCourse.length; i++){
        courseList.push(
            <a href={"#/course/"+popularCourse[i].id} className="course rel" key={"popular-course-" + i}>
                <div className="block rel" style={{
                    background: "#e2e2e2 url(" + popularCourse[i].poster +") no-repeat center"
                }}>

                    <div className="user abs aic flex">
                        <div className="meta rel">
                            <h2 className="s15 name fontb cfff">{popularCourse[i].tutor.name}</h2>
                            <h2 className="s13 uname fontn cfff">@{popularCourse[i].tutor.username}</h2>
                        </div>
                    </div>
                    
                    <div className="course-title abs">
                        <h2 className="s15 name fontb cfff">{popularCourse[i].title}</h2>
                    </div>

                </div>
            </a>
        );
    }

    }

    return (
        <div className="rightbar rel">

            <div className="section rel">
                <h2 className="title s24 fontb">Advanced <span  className="fontn">Search</span></h2>
                <div className="search-box rel flex">
                    <input type="text" placeholder="Start writing something..." className="qry s15 fontb" />
                    <button className="go cfff s15 fontb">Find</button>
                </div>
            </div>

            <div className="section section-b rel">
                <h2 className="title s24 fontb">Popular <span  className="fontn">This Week</span></h2>
                <div className="courses rel flex">
                    <div className="course-a">
                        {courseList[0]}
                    </div>
                    <div className="flex cols">
                        {courseList[1]}
                    </div>
                </div>
            </div>

            <div className="section section-b rel">
                <h2 className="title s24 fontb">Special <span  className="fontn">Offers</span></h2>
                <div className="special-offer rel flex">
                    <div className="meta rel">
                        <h2 className="h1 s20 fontb">50 Days Premium!</h2>        
                        <h2 className="h2 s14 fontb">Get it before 5.5.2020</h2>        
                        <button className="s15 fontb">Learn more</button>
                    </div>                    
                    <div className="vector rel">
                        <img src={Cake} alt='course' />
                    </div>
                    <div className="ring abs" />
                </div>
            </div>
        </div>
    )
}

export default Rightbar;