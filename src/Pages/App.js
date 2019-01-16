import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Clock from './clock'
import AsyncTest from './asyncTest'
import CounterLink from './addEventListenerTest'
import ThisTest from './thisTest'
import Domss from './DOM'
import PropsDom from './propsDom'
import TestCa from './testCA'
import TestParent from './testParent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Clock/>
          <AsyncTest/>
          <CounterLink/>
          <ThisTest/>
          <Domss/>
          <PropsDom items={['Apple', 'Banana', 'Cranberry']}/>
          <TestCa/>
          <TestParent/>
      </div>
    );
  }
}

export default App;
