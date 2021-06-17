import React, { Component } from 'react'
import Grocery from './components/Grocery'
import Header from "./components/Header/Header"

export class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Grocery/>
      </div>
    )
  }
}

export default App
