import { Box, IconButton } from '@mui/material'
import React from 'react'
import SearchBar from '../components/searchBar'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useNavigate} from 'react-router-dom'
const SearchBarPage = () => {
    const navigate = useNavigate();

    return (
        <div className='homeContainer'>
            <img className='backgroundImage' />
            <div>
                <div className="topNav">
                    <div className='topNavWrapper'>

                        <Box width='10px'></Box>
                        <IconButton onClick={() => { navigate(-1)}}> <CloseRoundedIcon /></IconButton>
                        <SearchBar />
                        <Box width='10px'></Box>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SearchBarPage