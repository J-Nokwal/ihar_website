import React from 'react'
import Heart from 'react-heart';
import { Link } from 'react-router-dom';
import appLogo from '../img/appLogo.svg';

const AboutBox = () => {
    return (
        <div className='aboutBoxWrapper'>
            <div className='aboutBox'>
            <img className='appLogo' src={appLogo} />
            <h3><span>Made with</span><span className='heart'> ❤</span><span> by Jagrit Nokwal</span></h3>
            <a className='githubLink' href='https://github.com/J-Nokwal' target="_blank">Check Out My GitHub Profile</a>
            </div>
        </div>
    )
}

export default AboutBox