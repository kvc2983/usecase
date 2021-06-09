import React, {useEffect, useState} from "react";
import HandleError from '../Common/HandleError'

import {
    NavLink,    
} from "react-router-dom";

function Home(){

    useEffect(()=>{
        document.title = "Udemy";
    })

    const [recentCourse, setRecentCourse] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/recent')
        .then(res => {
            if(!res.ok) {
                throw Error("Endpoint for Home Page showing recent courses is failed to fetch data");
            }
            return res.json();
        })
        .then(data => {
            setRecentCourse(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        });
    }, [])

    const [topTutors, setTopTutors] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/tutor')
        .then(result => {
            if(!result.ok) {
                throw Error("Endpoint for Home Page showing tutor list is failed to fetch data");
            }
            return result.json();
        })
        .then(data => {
            setTopTutors(data);
            setError(null);
        })
        .catch(err => {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        });
    }, [])

    //Live Tutors List
    var tutorList = [];
    for(let i = 0; i < 8; i++){
        tutorList.push(
            <button className="tutor rel" key={"tutor-live-" + i}>
                <img src={"http://placeimg.com/100/100/people?" + i}  className="bl" alt="people" />
            </button>
        );
    }

    var courseList = [];
    { isPending && <div>Loading...</div> }
    if(recentCourse && !error) {
    for(let i = 0; i < 2; i++){
        courseList.push(
            <NavLink to={"/course/" + recentCourse[i].id} className="course rel" key={"popular-course-" + i}>
                <div className="block rel" style={{
                    background: "#e2e2e2 url(" + recentCourse[i].poster +") no-repeat center"
                }}>

                    <div className="user abs aic flex">
                        <div className="pic">
                            <img src={recentCourse[i].tutor.dp} className="bl" alt="CourseImg" />
                        </div>
                        <div className="meta rel">
                            <h2 className="s15 name fontb cfff">{recentCourse[i].tutor.name}</h2>
                            <h2 className="s13 uname fontn cfff">@{recentCourse[i].tutor.username}</h2>
                        </div>
                    </div>

                    <div className="dura abs">
                        <h2 className="s13 name fontb cfff">{recentCourse[i].duration}</h2>
                    </div>

                    <div className="course-title abs">
                        <h2 className="s15 name fontb cfff">{recentCourse[i].title}</h2>
                    </div>

                </div>
            </NavLink>
        );
    }
}

    var topTutorsList = [];
    if(topTutors) {
    for(let i = 0; i < topTutors.length; i++){
        topTutorsList.push(
            <a href="/#" className="user-block rel noul" key={"top-tutors-" + i}>
                <div className="user aic flex">
                    <div className="pic">
                        <img src={topTutors[i].dp} className="bl" alt="video" />
                    </div>
                    <div className="meta rel">
                        <h2 className="s15 name fontb c333">{topTutors[i].name}</h2>
                        <h2 className="s13 uname fontn c333">@{topTutors[i].username}</h2>
                    </div>
                </div>                
            </a>
        );
    }
}

    try {
        return (
            <div className="home-page rel">

                { error && <HandleError error={error} /> }

                {/**Tutors Live Now */}
                <div className="section rel">
                    <h2 className="title s24 fontb">Streaming <span  className="fontn">Now</span></h2>
                    <div className="tutors rel flex">
                        {tutorList}
                    </div>
                </div>

                {/**Popular Courses */}
                <div className="section section-b rel">
                    <h2 className="title s24 fontb">Recently <span  className="fontn">Accessed</span></h2>
                    <div className="courses rel flex">
                        {courseList}
                    </div>
                </div>

                {/**Top Tutors */}
                <div className="section section-b rel">
                    <h2 className="title s24 fontb">Top <span  className="fontn">Tutors</span></h2>
                    <div className="top-tutors rel flex">
                        {topTutorsList}
                    </div>
                </div>

            </div>
        )
    } catch (error) {
        return <HandleError error={error} />
    }
}

export default Home;