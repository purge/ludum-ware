'use strict';
import React from 'react';
import Howler from 'react-howler';
import Icon from 'react-fa';

import {MUTED_BY_DEFAULT, ENGINE_VOL, INTRO_VOL} from './config'

export const Sound = React.createClass({

  getInitialState() {
    return {
      muted: MUTED_BY_DEFAULT
    };
  },

  componentDidMount() {
    this.setVolume.call(this, 'engine', ENGINE_VOL);
    setTimeout(() => window.Howler.mute(this.state.muted));
  },

  setVolume(ref, vol) {
    this.refs[ref]._howler._volume = vol;
  },

  toggleGlobalMute() {
    const {muted} = this.state;

    window.Howler.mute(!muted);
    this.setState({ muted: !muted });
  },

  render() {
    const {muted} = this.state;

    return (
      <aside id="sounds">
        <button
          type="button"
          className="mute-all"
          tabIndex="-1"
          onClick={this.toggleGlobalMute}
        >
          <Icon name={`volume-${muted ? 'off' : 'up'}`} size="2x" />
        </button>
        <Howler
          src='sound/engine.wav'
          playing={true}
          loop={true}
          ref="engine"
        />
      </aside>
    );
  }

});

export const IntroSound = React.createClass({

  componentDidMount() {
    this.setVolume.call(this, 'intro', INTRO_VOL);
  },

  setVolume(ref, vol) {
    this.refs[ref]._howler._volume = vol;
  },

  render() {
    return (
      <Howler
        src='sound/intro.wav'
        playing={true}
        loop={true}
        ref="intro"
      />
    );
  }

});
