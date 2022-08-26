import { Counter } from '@'
import React from 'react'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.aRef = React.createRef()
  }
  render() {
    console.log('render app')
    return (
      <>
        <Counter ref={this.aRef} />
        <button
          onClick={() => {
            console.log(this.aRef.current)
          }}
        >
          Ref Component App
        </button>
      </>
    )
  }
}

export default App
