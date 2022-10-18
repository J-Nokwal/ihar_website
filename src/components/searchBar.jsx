import { Button } from '@mui/material'
import React, { useRef } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import searchSlice, { searchsuggestion } from '../store/searchStore'

export const SearchbarPage = () => {
  return (
    <div className='trybox'><SearchBar /></div>
  )
}


const SearchBar = () => {
  const inputBoxRef = useRef(null)
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);


  var onsearchIconClick = () => { }
  var ontexInputChange = () => {
    console.log(typeof inputBoxRef.current.value,inputBoxRef.current.value,inputBoxRef.current.value.length);
    if (inputBoxRef.current.value.length===0){
      dispatch(searchSlice.actions.setDefault())
    }else{
      dispatch(searchsuggestion(inputBoxRef.current.value))
    }
   }
  var onFocus= () => {
    dispatch(searchSlice.actions.activate())
   }
   var onFocusRemove=()=>{
    dispatch(searchSlice.actions.deActivate())
   }
  var showSuggestions=(suggestions)=>{
    return suggestions.map((s) => {
      // return <li key={s}><button onClick={() => onsearchIconClick({ s })}>{s}</button></li>
      return <button key={s} onClick={() => onsearchIconClick({ s })}>{s}</button>
  });
  }
  

 
  return (
    <div className='SearchBar'>
      <div className="searchBarWrapper" onBlur={onFocusRemove}>
        <input className='searchInput' type="text" placeholder="Search.."
          ref={inputBoxRef} onChange={ontexInputChange} onFocus={onFocus}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onsearchIconClick()
            }
          }} >
        </input>
        <Button className="SearchIcon" onClick={(e) => onsearchIconClick()}><BiSearchAlt > </BiSearchAlt></Button>
        {searchState.isActive && <div className='searchSuggestions'>{showSuggestions(searchState.suggestions)} </div>}
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