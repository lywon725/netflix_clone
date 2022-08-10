import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setsearchValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setsearchValue(e.target.value); //바로 검색가능하다. 
        navigate(`/search?q=${e.target.value}`)
    };

    useEffect(() => {
        // 스크롤 시 색깔 변경
        window.addEventListener("scroll", () => {
            if(window.scrollY > 50){
                setShow(true);
            }else{
                setShow(false);
            }
        })
        return () => {
            window.removeEventListener("scroll",()=>{});
        }
    }, [])
    
    return (
        //and연산자 둘다 true면 실행, nav=>참, show값에 따라 보여줌
        <nav className={`nav ${show && "nav_black" }`}>
            {/* 로고, 유저 아이콘 */}
            <img
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png"
                className='nav__logo'
                onClick={()=>window.location.reload()}
            />
            <inpuut
                value = {searchValue}
                onChange={handleChange}
                className="nav__input"
                type="text"
                placeholder="영화제목을 입력해주세요."
            />
            <img
                alt="User logged"
                src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
                className='nav__avater'
            />
        </nav>
    )
}