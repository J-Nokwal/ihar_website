import React from 'react'
import appLogo from '../img/AppIconFlat.svg';
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import jsonpAdapter from "axios-jsonp";
import { appAuth } from '../firebase/AppAuth';
import { useSelector } from 'react-redux';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

import SearchBar from './searchBar';

const Navbar = ({ showCreateRumorButton = true, showValue = false }) => {
    const currentUser = useSelector((state) => state.auth.user);
    const inputBoxRef = useRef(null)
    const [showsearchbar, setshowsearchbar] = useState(window.innerWidth>=453)
    const navigate = useNavigate();
    var tempSuggestion = [
        "sfsd",
        "asfdasfsd",
        "bdsfsd",
        "fdsddbdfsd",
        "dfgsfsd",
        "sdsfgsfsd",
        "qeaefsfsd",
        "behsfsd",
    ];
    useEffect(() => {
        var x = window.matchMedia("(max-width: 453px)")
        function navbarSizeHandler(ev) {
            const { innerWidth } = window;
            if (innerWidth < 453) {
                setshowsearchbar(false)
            } else {
                setshowsearchbar(true);            }
        }
        x.addEventListener("change", navbarSizeHandler)
        return ()=>{
            x.removeEventListener("change",navbarSizeHandler)
        }
    }, [])

    const [suggestions, setSuggestions] = useState([]);
    var c = 0;
    function showSuggestions(list) {
        console.log("showSuggestions function" + list.length);
        c = c + 1;

        let listData;
        if (!list.length) {
            if (inputBoxRef.current === document.activeElement) {
                var userValue = inputBoxRef.current.value;
                if (userValue === '') {
                    return tempSuggestion.map((s) => {
                        return <li key={s}><button onClick={() => onsearchIconClick({ s })}>{s}</button></li>
                        // return <button onClick={() => onsearchIconClick({ s })}>{s}</button>

                    });
                }
                return <li key={userValue}><button onClick={() => onsearchIconClick({ userValue })}>{userValue}</button></li>
            } else {
                console.log("not active element");
                return null;
            }

        } else {
            listData = list.map((s) => {
                return <li key={s}><button onClick={() => onsearchIconClick({ s })}>{s}</button></li>
            });
        }
        // console.log(listData);
        return listData
    }
    let ontexInputChange = async (e) => {
        console.log("inut value changed")

        if (e.target.value !== '') {
            var emptyArray = await getGoogleSuggestions(e.target.value);
        } else {
            var emptyArray = []
        }

        setSuggestions(emptyArray);
    }
    const getGoogleSuggestions = async (searchInput) => {
        var results
        try {
            results = await axios({
                url: `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchInput}`,
                adapter: jsonpAdapter,
            });
        } catch (error) {
            console.log("error on search suggession api ")
            console.log(error)
            throw error;
        }
        return results.data[1];
    };
    

    var onsearchIconClick = (s) => {

        console.log("search button clicked");
        const searchquery = s ?? inputBoxRef.current.value
        if (searchquery !== "") {
            navigate(`/search/${searchquery}`)
        }
    }
    var logOutButtonPressed = () => {
        appAuth.appSignOut();
    }
    const [anchorAvatarEl, setAnchorAvatarEl] = React.useState(null);
    const openAvatarMenu = Boolean(anchorAvatarEl);
    const handleAvatarClick = (event) => {
        setAnchorAvatarEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorAvatarEl(null);
    };
    const handleProfileButtonClicked=()=>{
        navigate("/user/"+currentUser.userId);
        handleProfileMenuClose();
    }
    const downloadApkButtonPressed=()=>{
        navigate("/download");
        handleProfileMenuClose();
    }
    return (
        <div className="topNav">
            <div className='topNavWrapper'>

                <span className='flatLogo'><button onClick={(e) => {
                    // e.preventDefault()
                    navigate("/")
                }}><img src={appLogo} /></button></span>
                {/* <input className='searchContainer' type="text" placeholder="Search.."></input> */}
                {/* <div className='searchContainer' onBlur={onFucusRemove} >
                    <input className='searchInput' type="text" placeholder="Search.."
                        ref={inputBoxRef} onChange={ontexInputChange} onFocus={ontexInputChange}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                onsearchIconClick()
                            }
                        }} >
                    </input>
                    <div className="SearchIcon" onClick={(e) => onsearchIconClick()}><BiSearchAlt > </BiSearchAlt></div>
                    <div className='searchSuggestions'>
                        {showSuggestions(suggestions)}
                    </div>

                </div> */}
                {showsearchbar && <SearchBar  showValue={showValue} />}
                <div className='Navbuttons'>
                    {!showsearchbar && <IconButton onClick={() => { navigate("/searchbar") }}  sx={{width:'45px'}}  ><BiSearchAlt  /></IconButton>}                
                    {showCreateRumorButton && <IconButton className='postRumor' onClick={() => { navigate("/postRumor") }} sx={{ backgroundColor: "blue" }} ><AddIcon sx={{}} /></IconButton>}
                    <Button aria-describedby="profile-menu" onClick={handleAvatarClick}><Avatar className='profileButton' alt='Profile Pic' src={currentUser.ProfilePhotoLink}></Avatar></Button>
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorAvatarEl}
                        open={openAvatarMenu}
                        onClose={handleProfileMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleProfileButtonClicked}>My Profile</MenuItem>
                        {/* <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem> */}
                        <MenuItem onClick={downloadApkButtonPressed}>Download Apk</MenuItem>
                        <MenuItem onClick={logOutButtonPressed}>Logout</MenuItem>

                    </Menu>
                </div>

            </div>
        </div>)
}

export default Navbar