"use client"
import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

// import { WaveformContianer, Wave, PlayButton } from './Waveform.styled';

class Waveform extends Component {  
  state = {
    playing: false,
    currentTime: 0,
    duration: 0,
  };

  audioRef = React.createRef()
  playRef = React.createRef()

  

  componentDidMount() {
    const track = document.querySelector('#track');

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
    });

    this.waveform.load(track);

    this.waveform.on('finish', () => {
      this.waveform.pause();
      this.setState({ playing: false })
    });
  };
  
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
    // if(this.state.playing) {
    //     this.audioRef.current.pause();
    // }else {
    //     this.audioRef.current.play();
    // }
    // console.log(this.audioRef.current);
  };

//   handleTimeUpdate = (e) => {
//     this.setState({
//       currentTime: this.audioRef.current.currentTime,
//       duration: this.audioRef.current.duration
//     })

//     // console.log(e.target)
//   }
  
  render() {
    const url = '/assets/track.mp3';
    const {currentTime, duration } = this.state
    const { src } = this.props
    // console.log(src);

    return (
    <div className='wavesF ms-2 d-flex justify-content-center'>
      <div className='wave_cont1'>
        <button className='play_but me-2 mb-2' onClick={this.handlePlay} >
          {!this.state.playing ? <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.96494 12.2226C1.63161 12.4393 1.29394 12.4516 0.951941 12.2596C0.610608 12.0683 0.439941 11.7726 0.439941 11.3726V1.02259C0.439941 0.62259 0.610608 0.32659 0.951941 0.13459C1.29394 -0.0567435 1.63161 -0.0440767 1.96494 0.17259L10.1149 5.34759C10.4149 5.54759 10.5649 5.83092 10.5649 6.19759C10.5649 6.56426 10.4149 6.84759 10.1149 7.04759L1.96494 12.2226Z" fill="#465ADA"/>
            </svg>
            : 
            <div className='pause'>
                <svg width="3" height="20" viewBox="0 0 2 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="2" height="20" rx="1" fill="#465ADA"/>
                </svg>
                <svg width="2" className='ms-2' height="20" viewBox="0 0 2 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="2" height="20" rx="1" fill="#465ADA"/>
                </svg>
            </div>
            }
        </button>
        <div id="waveform" className='waveF1' >
        </div>
        <audio ref={this.audioRef} id="track" src={src} />
      </div>

    </div>
    );
  }
};

export default Waveform;