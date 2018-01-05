import React from 'react'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            query: 'type your guess here!'
        }
    }

    handleQuery() {
      let currentQuery = this.state.query
      if (currentQuery === this.props.name) {
          alert('YOU GOT IT!')
          this.handleClick();
      } else {
          alert('WRRROOONNNGG!')
          this.handleClick();
      }
    }

    handleChange(e) {
        this.setState({
            query: e.target.value
        })
    }

    handleClick() {
        this.setState({
            query: ''
        })
    }

    giveUp() {
        alert(`Name: ${this.props.name}`)
    }

    render() {
        return (
            <div className="refresh">
                <button onClick={this.props.refreshUser}>refresh user!</button>
                <div id="search">
                    <h3>Ready to Answer?</h3>
                    <input type="text" value={this.state.query} onClick={this.handleClick.bind(this)} onChange={this.handleChange.bind(this)} />
                    <button onClick={this.handleQuery.bind(this)}>Take a guess!</button>
                    <br />
                    <br />
                    <br />
                    <button onClick={this.giveUp.bind(this)}>GIVE UP?</button> 
                </div>
            </div>
        )
    }
}

export default Search;