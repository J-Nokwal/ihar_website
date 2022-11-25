import { Button } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import searchSlice, { searchsuggestion } from '../store/searchStore'

export const SearchbarPage = () => {
  return (
    <div className='trybox'><SearchBar /></div>
  )
}


const SearchBar = ({showValue=false}) => {
  
  const inputBoxRef = useRef(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchState = useSelector((state) => state.search);
  
useEffect(() => {
    if (showValue){
      inputBoxRef.current.value=searchState.crrQuery;
    }

}, [searchState.searchResults])


  var onsearchIconClick = ({ s }) => {
    if (s) {

      dispatch(searchSlice.actions.replaceData({isActive:false,crrQuery:s}))
      navigate(`/search/${s}`)

    }
    else if (inputBoxRef.current.value.length != 0) {
      navigate(`/search/${inputBoxRef.current.value}`)
      dispatch(searchSlice.actions.replaceData({isActive:false}))

    }

  }
  var ontexInputChange = () => {
    console.log(typeof inputBoxRef.current.value, inputBoxRef.current.value, inputBoxRef.current.value.length);
    if (inputBoxRef.current.value.length === 0) {
      dispatch(searchSlice.actions.setDefault())
    } else {
      dispatch(searchsuggestion(inputBoxRef.current.value))
    }
  }
  var onFocus = () => {
    dispatch(searchSlice.actions.activate())
  }
  var onFocusRemove =async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    dispatch(searchSlice.actions.deActivate())
  }
  var showSuggestions = (suggestions) => {

    return suggestions.map((s) => {
      // return <li key={s}><button onClick={() => onsearchIconClick({ s })}>{s}</button></li>
      return <button key={s} onClick={() => {
        console.log("clicked on", s);
        onsearchIconClick({ s })
      }}>{s}</button>
    });
  }
  var value=()=>{
    if (showValue && searchState.crrQuery){
      // inputBoxRef.current.value=searchState.crrQuery;
      return searchState.crrQuery;
    }else{
      // dispatch(searchSlice.actions.setDefault())
      return "";
    }

  }
  

  return (
    <div   className='SearchBar'>
      <div className="searchBarWrapper" onBlur={onFocusRemove}>
        {searchState.isActive && <div className='searchSuggestions'>{showSuggestions(searchState.suggestions)} </div>}
        <input className='searchInput' type="text" placeholder="Search.."
          ref={inputBoxRef} onChange={ontexInputChange} onFocus={onFocus}
          defaultValue={value()}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onsearchIconClick({})
            }
          }} >
        </input>
        <Button className="SearchIcon" onClick={(e) => onsearchIconClick({})} onFocus={onFocus}><BiSearchAlt > </BiSearchAlt></Button>
      </div>
    </div>
  )
}

export default SearchBar
//  <input className='searchInput' type="text" placeholder="Search.."
//         ref={inputBoxRef} onChange={ontexInputChange} onFocus={ontexInputChange}
//         onKeyUp={(e) => {
//           if (e.key === 'Enter') {
//             onsearchIconClick()
//           }
//         }} >
//       </input>
      // <div className="SearchIcon" onClick={(e) => onsearchIconClick()}><BiSearchAlt > </BiSearchAlt></div>
      // <div className='searchSuggestions'>{showSuggestions(suggestions)} </div> 