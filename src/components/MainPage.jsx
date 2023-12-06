import React, { useState, useEffect } from 'react';
import firebase from '../firebase.js';
import TextToSpeech from './TextToSpeech.jsx';
import Circle from 'react-circle';
import './MainPage.css';

const MainPage = () => {
    const [water, setwater] = useState(null);
    const [food, setfood] = useState(null);
    const [blueledStatus, setblueledStatus] = useState(null);
    const [redledStatus, setredledStatus] = useState(null);
    const [feedStatus, setfeedStatus] = useState(null);
  
    useEffect(() => {
      const waterRef = firebase.database().ref('water');
      const foodRef = firebase.database().ref('food');
      const blueledRef = firebase.database().ref('blueled');
      const redledRef = firebase.database().ref('redled');
      const feedRef = firebase.database().ref('feed');
  
      const handlewaterChange = (snapshot) => {
        setwater(snapshot.val());
      };
  
      const handlefoodChange = (snapshot) => {
        setfood(snapshot.val());
      };
  
      const handleblueledStatusChange = (snapshot) => {
        setblueledStatus(snapshot.val());
      };
  
      const handleredledStatusChange = (snapshot) => {
        setredledStatus(snapshot.val());
      };
  
      const handlefeedStatusChange = (snapshot) => {
        setfeedStatus(snapshot.val());
      };
  
      waterRef.on('value', handlewaterChange);
      foodRef.on('value', handlefoodChange);
      blueledRef.on('value', handleblueledStatusChange);
      redledRef.on('value', handleredledStatusChange);
      feedRef.on('value', handlefeedStatusChange);
  
      return () => {
        waterRef.off('value', handlewaterChange);
        foodRef.off('value', handlefoodChange);
        blueledRef.off('value', handleblueledStatusChange);
        redledRef.off('value', handleredledStatusChange);
        feedRef.off('value', handlefeedStatusChange);
      };
    }, 
    []);

    const toggleblueled = () => {
        const newblueledStatus = blueledStatus === 0 ? 1 : 0;
        firebase.database().ref('blueled').set(newblueledStatus);
      };
    
      const toggleredled = () => {
        const newredledStatus = redledStatus === 0 ? 1 : 0;
        firebase.database().ref('redled').set(newredledStatus);
      };
    
      const togglefeed = () => {
        const newfeedStatus = feedStatus === 0 ? 1 : 0;
        firebase.database().ref('feed').set(newfeedStatus);
      };

    return (<div className="main">
                <div className="header">
                <h1>00011244</h1>
                </div>
                <div className="data">
                {/* First Line - Progress Bars */}
                <div className="graph-bars">
                    {water !== null && (
                    <div className="data-item">
                        <p>Water resource: {water} °C</p>
                        <Circle
                        animate={true}
                        animationDuration="4s"
                        progress={water}
                        progressColor={'blue'}
                        bgColor="#white"
                        textColor="#000"
                        size={300}
                        lineCap="butt"
                        lineWidth={50}
                        roundedStroke={true}
                        showPercentageSymbol={true}
                        />
                        {water !== null && <TextToSpeech text={`The water is ${water} dangerous`} />}
                    </div>
                    )}
                    {food !== null && (
                    <div className="data-item">
                        <p>Food capacity: {food} %</p>
                        <Circle
                        animate={true}
                        animationDuration="4s"
                        progress={food}
                        progressColor={"green"}
                        bgColor="#d6d6d6"
                        textColor="#000"
                        size={300}
                        lineWidth={50}
                        roundedStroke={true}
                        showPercentageSymbol={true}
                        />
                        {food !== null && <TextToSpeech text={`Food is below ${food} percent`} />}
                    </div>
                    )}
                </div>
                <div className="switches">
                    {blueledStatus !== null && (
                    <div className="data-item">
                        <p>BlueLED Controller</p>
                        <label className="toggle-switch">
                        <input type="checkbox" checked={blueledStatus === 1} onChange={toggleblueled} />
                        <span className="slider"></span>
                        </label>
                        {blueledStatus !== null && <TextToSpeech text={`The blueled is ${blueledStatus === 1 ? 'On' : 'Off'}`} />}
                    </div>
                    )}
                    {feedStatus !== null && (
                    <div className="data-item">
                        <p>Toggle Feed Controller</p>
                        <label className="toggle-switch">
                        <input type="checkbox" checked={feedStatus === 1} onChange={togglefeed} />
                        <span className="slider"></span>
                        </label>
                        {feedStatus !== null && <TextToSpeech text={`The feed is ${feedStatus === 1 ? 'On' : 'Off'}`} />}
                    </div>
                    )}
                    {redledStatus !== null && (
                    <div className="data-item">
                        <p>RedLED Controller</p>
                        <label className="toggle-switch">
                        <input type="checkbox" checked={redledStatus === 1} onChange={toggleredled} />
                        <span className="slider"></span>
                        </label>
                        {redledStatus !== null && <TextToSpeech text={`The redled is ${redledStatus === 1 ? 'On' : 'Off'}`} />}
                    </div>
                    )}
                </div>
                </div>
            </div>
            );
};

export default MainPage;