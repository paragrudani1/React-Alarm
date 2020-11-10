import React, { useState, useEffect } from 'react';
import classes from './Clock.module.css'

const Clock = () => {
    const deg = 6;
    
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;

        
        let hr = {transform: `rotateZ(${hh + (mm / 12)}deg)`};
        let mn = {transform: `rotateZ(${mm}deg)`};
        let sc = {transform: `rotateZ(${ss}deg)`}
        
        
            // Update Hour
            // eslint-disable-next-line no-unused-vars
            const [hour, updateHour] = useState(hh);

            useEffect(() => {
                setInterval(() => {
                    updateHour(hour => hour + 1)
                }, 1000)
            }, []);

            // Update Minutes
            const [minute, updateMinutes] = useState(mm);

            useEffect(() => {
                setInterval(() => {
                    updateMinutes(minute => minute + 1)
                }, 1000)
            }, []);

            // Update Seconds
            const [secound, updateSecounds] = useState(ss);

            useEffect(() => {
                setInterval(() => {
                    updateSecounds(secound => secound + 1)
                }, 1000)
            }, []);

            
                return (
                    <div className={classes.clock}>
                    <div className={classes.hour}>
                        <div style={hr} className={classes.hr} id='hr'></div>
                    </div>
                    <div className={classes.min}>
                        <div style={mn} className={classes.mn} id='mn'></div>
                    </div>
                    <div className={classes.sec}>
                        <div style={sc} className={classes.sc} id='sc'></div>
                    </div>
                </div>
             );     
    } 

 
export default Clock;