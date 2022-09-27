import React from 'react'
import appLogo from '../img/AppIconFlat.svg';
import { BiSearchAlt } from "react-icons/bi";
import { useEffect,useState ,useRef } from 'react';
import axios from 'axios';
import jsonpAdapter from "axios-jsonp";

const Navbar = () => {
    const inputBoxRef =useRef(null)
    var tempSuggestion=[   
        "sfsd",
        "asfdasfsd",
        "bdsfsd",
        "fdsddbdfsd",
        "dfgsfsd",
        "sdsfgsfsd",
        "qeaefsfsd",
        "behsfsd",
    ];
    const [suggestions, setSuggestions] = useState([ ]);
    var c=0;
    function showSuggestions(list){
        console.log("showSuggestions function"+list.length);
        c=c+1;

            let listData;
            if(!list.length){
                if(inputBoxRef.current===document.activeElement){
                    var userValue = inputBoxRef.current.value;
                    if (userValue===''){
                        return tempSuggestion.map((s)=>{
                            return <li>{s}</li>
                          });
                    }
                    return <li>{userValue}</li>
                }else{
                    console.log("not active element");
                    return null;
                }
          
                listData = <li>{userValue}</li>;
            }else{
              listData = list.map((s)=>{
                return <li>{s}</li>
              });
            }
            // console.log(listData);
            return listData
        }
   let ontexInputChange=async(e) =>  {
    console.log("inut value changed")
        
       if (e.target.value!==''){
           var emptyArray=await getGoogleSuggestions(e.target.value);
       } else 
       {
        var emptyArray=[]
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
   let onFucusRemove=()=>{
    console.log("focus removed");
    setSuggestions([])
   }

   var onsearchIconClick=()=>{
    console.log("search button clicked");
   }
        
   return (
    <div className="topNav">
        <div className='topNavWrapper'>

            <span className='flatLogo'><img src={appLogo} /></span>
            {/* <input className='searchContainer' type="text" placeholder="Search.."></input> */}
            <div className='searchContainer'>
                <input className='searchInput' type="text" placeholder="Search.."ref={inputBoxRef} onChange={ontexInputChange} onFocus={ontexInputChange} onBlur={onFucusRemove } onKeyUp={(e)=>{
                    if (e.key==='Enter'){
                    onsearchIconClick()
                }}} ></input>
                <div className="SearchIcon" onClick={onsearchIconClick}><BiSearchAlt > </BiSearchAlt></div>
                <div className='searchSuggestions'>
                  {showSuggestions(suggestions)}
                </div>

            </div>

            <div className='profileButton'>
                <div></div>
            </div>
            <div className='profileButton'>
                <div></div>
            </div>
            <div className='profileButton'>
                <div></div>
            </div>
            <div className='profileButton'>
                <div></div>
            </div>

        </div>
    </div>)
}

export default Navbar