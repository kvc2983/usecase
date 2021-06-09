import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import HandleError from '../Common/HandleError'

function CourseDetails(props){

    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [enroll, setEnroll] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(true);


    //To get course Id for which details should be shown
    const courseID = props.match.params.courseid;

    //Fetching all Details of particular course
    useEffect(()=>{
        fetch('http://localhost:3000/allcourses/'+courseID)
        .then(res => {
            if(!res.ok) {
                throw Error("Endpoint for CourseDetails is failed to fetch data");
            }
            return res.json();
        })
        .then(data => {
            setCourse(data);
            setError(null);
        })
        .catch(err => {
            console.log(err.message);
            setError(err.message);
        });
    }, [courseID])

    //Check if user has allready Enrolled for this course
    useEffect(()=>{
        fetch('http://localhost:3000/mycourses/'+courseID)
        .then(res => {
            if(!res.ok) {
                throw Error("Endpoint CourseDetails is failed to fetch data");
            }
            return res.json();
        })
        .then(data => {
            data && setIsEnrolled(false);
            setError(null);
        })
        .catch(err => {
            console.log(err.message);
            setError(err.message);
        });
    }, [])

    //On click of enroll add course to my courses
    const handleEnroll = (id) => {
        fetch('http://localhost:3000/allcourses/' + id)
        .then(res => {
            return res.json();
        })
        .then(data => {
            fetch('http://localhost:3000/mycourses', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json'}
            });
            setEnroll(false);
        })
        .catch(err => {
            console.log(err.message);
            setError(err.message);
        });
    }

    var courseVideos = [];
   if(course) {
        for(let i = 0; i < course.videos.length; i++){
            courseVideos.push(
                <a href="/#" key={"course-video-" + i} className="noul aic rel flex">
                    <div className="id s18 fontn cfff">{course.videos[i].ID}</div>
                    <div className="meta rel">
                        <h1 className="s15 lbl fontb c333">{course.videos[i].title}</h1>
                        <h1 className="s13 dur fontn c777">{course.videos[i].duration}</h1>
                    </div>
                </a>            
            );
        }
    }
    try {
        return (
            <div className="course-page rel flex">
            { error && !course ? <HandleError error={error} /> 
            : course &&
            <div className="course-info rel">

                    <div className="tutor rel aic flex">
                        <div className="pic">
                            <img src={course.tutor.dp} className="bl" alt="CourseImg" />
                        </div>
                        <div className="meta rel">
                            <h2 className="s15 name fontb c333">{course.tutor.name}</h2>
                            <h2 className="s13 uname fontn c777">Course Tutor</h2>
                        </div>
                    </div>

                    <div className="course-meta">
                        <h2 className="s24 title fontb c333">{course.title}</h2>
                        <p className="s18 about fontn c777" dangerouslySetInnerHTML={{ __html: course.about}} />
                        <div className="section section-b rel">
                            <h2 className="title s24 fontb">Course <span  className="fontn">Achievements</span></h2>
                            <div className="course-stats aic flex">
                                <div className="stats-box flex">
                                    <div className="ico ico-points s24 icon-shield" />
                                    <h2 className="val s15 c333 fontb">{course.points}</h2>
                                    <h2 className="lbl s13 c777">points</h2>
                                </div>
                                <div className="stats-box flex">
                                    <div className="ico ico-battery s24 icon-battery-90" />
                                    <h2 className="val s15 c333 fontb">{course.percent}%</h2>
                                    <h2 className="lbl s13 c777">complete</h2>
                                </div>
                                <div className="stats-box flex">
                                    <div className="ico ico-battery s24 icon-battery-90" />
                                    <h2 className="val s15 c333 fontb">{course.level}</h2>
                                    <h2 className="lbl s13 c777">level</h2>
                                </div>
                            </div>
                        </div>        
                        {
                            enroll && isEnrolled ?
                            <input type="button" className="lbl s20 enroll-course" onClick={(e) => (e.preventDefault(), handleEnroll(courseID)) } value="Enroll Now" />
                            :
                            <p className="s18 about fontn c777" dangerouslySetInnerHTML={{ __html: "You have Enrolled for this course"}} />
                        }
                        <div className="section section-b rel">                    
                            <h2 className="title s24 fontb">Course <span  className="fontn">Details</span></h2>
                            <div className="course-videos flex">
                                {courseVideos}
                            </div>
                        </div>
                    </div>
                </div>
            }
                <div className="course-preview rel video-align">
                    <div className="player rel">
                        {course && <video poster={course.poster} /> }
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
            </div>
        )
    } catch (error) {
        return <HandleError error={error} />
    }
}

CourseDetails.propTypes = {
    match: PropTypes.object.isRequired,
    params: PropTypes.shape({
        courseid: PropTypes.number.isRequired
    })
}

export default CourseDetails;