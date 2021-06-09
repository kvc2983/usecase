import React, {useEffect, useState} from "react";
import HandleError from '../Common/HandleError'
import {
    NavLink,    
} from "react-router-dom";

function WishList(){

    useEffect(()=>{
        document.title = "My Wishlist";
    })

    const [wishList, setWishList] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/wishlist')
        .then(res => {
            if(!res.ok) {
                throw Error("Endpoint for Wishlist is failed to fetch data");
            }
            return res.json();
        })
        .then(data => {
            setWishList(data);
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
    if(wishList) {
    for(let i = 0; i < wishList.length; i++){
        courseList.push(
            <NavLink to={"/course/" + wishList[i].id} className="course rel" key={"popular-course-" + i}>
                <div className="block rel" style={{
                    background: "#e2e2e2 url(" + wishList[i].poster +") no-repeat center"
                }}>

                    <div className="user abs aic flex">
                        <div className="pic">
                            <img src={wishList[i].tutor.dp} className="bl" alt="CourseImg" />
                        </div>
                        <div className="meta rel">
                            <h2 className="s15 name fontb cfff">{wishList[i].tutor.name}</h2>
                            <h2 className="s13 uname fontn cfff">@{wishList[i].tutor.username}</h2>
                        </div>
                    </div>

                    <div className="dura abs">
                        <h2 className="s13 name fontb cfff">{wishList[i].duration}</h2>
                    </div>

                    <div className="course-title abs">
                        <h2 className="s15 name fontb cfff">{wishList[i].title}</h2>
                    </div>

                </div>
            </NavLink>
        );
    }
}

   
    try {
        return (
            <div className="app-page rel">
                { error ? <HandleError error={error} /> :
                    <h1 className="page-title s24 fontb c333">My Wishlist</h1>
                }
                <div className="home-page rel">
                    <div className="section section-b rel">
                        <div className="courses rel flex">
                            {courseList}
                        </div>
                    </div>

                </div>
            </div>
        )
    } catch (error) {
        return <HandleError error={error} />
    }
}

export default WishList;