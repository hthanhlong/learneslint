/* eslint-disable react/display-name */
import React from 'react'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  render() {
    console.log('render counter')
    return (
      <div>
        Count: {this.state.count}
        <button
          id="hello"
          // eslint-disable-next-line react/prop-types
          ref={this.props.ref}
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          Increment Component counter
        </button>
      </div>
    )
  }
}

export default Counter
