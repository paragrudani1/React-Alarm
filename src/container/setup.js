/* eslint-disable no-unreachable */
import React, { Component } from 'react';
import sound from '../assets/songs/astronomia.mp3'
import classes from './Setup.module.css'

class Setup extends Component {
    
    state = { 
        setDate: null,
        snoozed: false,
        alarmSet: false,
        alarmRang: false,
        hourValue: null,
        minValue : null
     }

    constructor(props) {
        super(props)
        this.sd = React.createRef()
        this.sh = React.createRef()
        this.sm = React.createRef()
        this.sap = React.createRef()
        
        this.alarmSound = new Audio();
        this.alarmSound.src = sound;

        this.time = []
    }

    setAlarm = (e) => {
        e.preventDefault()
        let alarmTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), this.sh.current.value, this.sm.current.value);
        
        let rh = null
            if(this.sap.current.value === 'AM') {
                rh =  alarmTime.getHours();
            } else {
               rh = (12 + (alarmTime.getHours()))
            }

            let setTime = new Date(alarmTime.getFullYear(), alarmTime.getMonth(), alarmTime.getDate(), rh, alarmTime.getMinutes(), alarmTime.getSeconds())

            if(isNaN(alarmTime)) {
                alert('Invalid time')
                return;
            }
            
            const diffInMs = setTime.getTime() - new Date().getTime()
            
            if(diffInMs < 0) {
                alert('Selected time has passed!')
                
                return false;
            }

            this.time.push(alarmTime)
            
            this.setState({setDate: this.time, alarmSet: true})
            
            
            setTimeout(() => {
                this.setState({alarmRang: true})
                    const n = this.state.setDate ? this.alarmSound.loop = true : null
                    const s = this.state.setDate ? this.alarmSound.play() : null;
                        // eslint-disable-next-line no-sequences
                        return n, s

                    setTimeout(() => {
                        this.alarmSound.pause();
                        this.alarmSound.currentTime = 0
                    }, 60000);
                    
                }, diffInMs) 
            }
            
            stopAlarm = () => {
                this.setState({setDate: null, alarmSet: false, alarmRang: false});
                
                    this.alarmSound.pause();
                    this.alarmSound.currentTime = 0;
                    
                    if(this.state.snoozed) {
                        this.setState({snoozed: false})
                    }
                }

                snooz = () => {
                    this.setState({snoozed: true})

                        setTimeout(() => {
                            this.alarmSound.pause();
                            this.alarmSound.currentTime = 0;
                            setTimeout(() => {
                                    const n = this.state.snoozed ? this.alarmSound.play() : null;
                                    const s = this.state.snoozed ? this.alarmSound.loop = true : null;

                                    // eslint-disable-next-line no-sequences
                                    return n, s;
                            }, 5000)
                        }, 10)

            }

            adjustHourInputWidth = (e) => {
                this.setState({hourValue: e.target.value})
            }

            adjustMinInputWidth = (e) => {
                this.setState({minValue: e.target.value})
            }

    render() {

        let hourInputWidth;
        if(this.state.hourValue) {
            hourInputWidth = {width: ((this.state.hourValue.length + 1) * 10) + 'px' }
        }

        let minInputWidth;
        if(this.state.minValue) {
            minInputWidth = {width: ((this.state.minValue.length + 1) * 10) + 'px' }
        }


        let dateOptions = [];
        for(let i = 1; i <= 31; i++) {
            dateOptions.push(i) 
        }
        
        let hourOptions = [];
        for(let i = 1; i <= 12; i++) {
            hourOptions.push(i) 
        }

        let minutesOptions = [];
        for(let i = 0; i <= 59; i++) {
            minutesOptions.push(i) 
        }

        const setBtn = this.state.alarmSet ? null : <button>Set Alarm</button>;
        const stopBtn = this.state.alarmSet ? <button onClick={this.stopAlarm}>Stop Alarm</button> : null;
        const snoozBtn = this.state.alarmRang ? <button onClick={this.snooz}>Snooz Alarm</button> : null;

        return ( 
            <>
            <form className={classes.alarmDetail} onSubmit={this.setAlarm}>
                   

                    <div className={classes.text}>
                            <label htmlFor="hour">I want to set alarm at 
                                <input type='number' min='1'max='12' ref={this.sh} style={hourInputWidth} className={classes.hour} name="hour" required onChange={this.adjustHourInputWidth} />
                            </label>
                            <label htmlFor="minute">: 
                                <input type='number' min='00' max='59' style={minInputWidth} ref={this.sm} className={classes.min} name="minute" required onChange={this.adjustMinInputWidth} />
                            </label>
                            
                            <label htmlFor='time'>
                                <select ref={this.sap} name="time" className={classes.time} required>
                                    <option>AM</option>
                                    <option>PM</option>
                                </select>
                            </label>
                    </div>

                    {setBtn}
                </form>
                
                {stopBtn}
                {this.state.snoozed ? null : snoozBtn}
            </>
         );
    }
}
 
export default Setup;