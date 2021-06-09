import React, {useEffect, useState} from "react";
import HandleError from '../Common/HandleError'
import {
    NavLink,    
} from "react-router-dom";

function MyCoursesPage(){

    const [course, setCourse] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [deleteCourse, setDeleteCourse] = useState(true);

    useEffect(()=>{
        fetch('http://localhost:3000/mycourses')
        .then(res => {
            if(!res.ok) {
                throw Error("Endpoint for MyCourses is failed to fetch data");
            }
            return res.json();
        })
        .then(data => {
            setCourse(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        });
    }, [])

    const handleRemove = (id) => {
        fetch('http://localhost:3000/mycourses/' + id, {
            method: 'DELETE'
        });
        setDeleteCourse(false);
        window.location.reload();
    }

    var courseList = [];
    { isPending && <div>Loading...</div> }
    if(course) {
    for(let i = 0; i < course.length; i++){
        courseList.push(
            <div className="course-page rel flex">
                { error && <HandleError error={error} /> }
                <div className="course-info rel">

                <div className="tutor rel aic flex tutor">
                    <div className="pic">
                        <img src={course[i].tutor.dp} className="bl" alt="dp" />
                    </div>
                    <div className="meta rel">
                        <h2 className="s15 name fontb c333">{course[i].tutor.name}</h2>
                        <h2 className="s13 uname fontn c777">Course Tutor</h2>
                    </div>
                </div>

                
                <div >
                    <h2 className="s24 title fontb c333">{course[i].title}</h2>
                    <p className="s18 about fontn c777" dangerouslySetInnerHTML={{ __html: course[i].about}} />

                    {deleteCourse ?
                        <input type="button" id="Remove" className="lbl s20" onClick={(e) => (e.preventDefault(), handleRemove(course[i].id)) } value="Remove" /> 
                        :
                        <p  id="s18" className="s18 about fontn c777" dangerouslySetInnerHTML={{ __html: "Course removed from my courses"}} />
                    }

                    <div className="section section-b rel">
                        <h2 className="title s24 fontb">Course <span  className="fontn">Achievements</span></h2>
                        <div className="course-stats aic flex">
                            <div className="stats-box flex">
                                <div className="ico ico-points s24 icon-shield" />
                                <h2 className="val s15 c333 fontb">{course[i].points}</h2>
                                <h2 className="lbl s13 c777">points</h2>
                            </div>
                            <div className="stats-box flex">
                                <div className="ico ico-battery s24 icon-battery-90" />
                                <h2 className="val s15 c333 fontb">{course[i].percent}%</h2>
                                <h2 className="lbl s13 c777">complete</h2>
                            </div>
                            <div className="stats-box flex">
                                <div className="ico ico-battery s24 icon-battery-90" />
                                <h2 className="val s15 c333 fontb">{course[i].level}</h2>
                                <h2 className="lbl s13 c777">level</h2>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
                <NavLink to={"/course/" + course[i].id} key={"popular-course-" + i}>
                    <div className="course-preview rel">
                        <div className="player rel video">
                            <video poster={course[i].poster} />
                            <div className="ctrls abs aic flex">
                                <button className="icon-pause s24 pp" />
                                <div className="timer rel fontn s15 cfff">
                                    02:54 / 09:55
                                </div>
                                <div className="slider rel">
                                    <div className="prog rel">
                                        <div className="bar rel">
                                            <div className="knob abs" />
                                        </div>
                                    </div>
                                </div>
                                <button className="icon-volume-100 s24 vol" />
                                <button className="icon-full-screen-enter2 s24 fs" />
                            </div>
                        </div>
                    </div>
                </NavLink>
            
            </div>
        );
    }
}
    
    try {
        return (
            <div className="app-page rel">
                {error &&
                    <div className="section rel">
                        <h2 className="title s24 fontb"><span  className="fontn">Something went wrong!</span></h2>
                        <div className="tutors rel flex">
                            <><small style={{ color: 'red' }}>{error}</small><br /></>
                        </div>
                    </div>
                }

                <h1 className="page-title s24 fontb c333">My Courses</h1>
                { course &&
                    <div className="section section-b rel">
                        <h2 className="title s24 fontb fontenroll"> Total <span  className="fontn">Enrolled Cources: </span>{course.length}</h2>
                    </div> }

                {  courseList }
            </div>
        )
    } catch (error) {
        return <HandleError error={error} />
    }

}

export default MyCoursesPage;