import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import appLogo from '../img/appLogo.svg';

const DownloadPage = () => {
    function downloadURI() {
       const uri= "https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/apk%2FI%20Heard%20A%20Rumor%20v-1.apk?alt=media&token=62bda0da-5b5c-4e71-87ca-0e4f9a23db5a"
        var link = document.createElement("a");
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    return (

        <div className='downloadContainer'>
            {/* <img className='backgroundImage' /> */}
            <div className='downloadWrapper'>
                <span className='logo'><img src={appLogo} /></span>
                <Button className='downloadButton' sx={{
                    backgroundColor: 'aliceblue',
                    color: '#3390ff',
                    ':hover': {
                        backgroundColor: '#87ebc97d',
                    },
                }} 
                onClick={(s)=>{
                    downloadURI();
                    // https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/apk%2FI%20Heard%20A%20Rumor%20v-1.apk?alt=media&token=62bda0da-5b5c-4e71-87ca-0e4f9a23db5a
                }}
                >
                    <h3>Download APK</h3>
                </Button>
                <Link className='orlogin' to="/login">Or LogIn</Link>

            </div>

        </div>
    )
}

export default DownloadPage