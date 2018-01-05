import React from 'react'

class Submit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            url: '',
            hints: [],
            hintMessage: 'Four hints max!!',
            savedName: '',
            savedUrl: ''
        }
    }

    nameCollector() {
        this.setState({
            savedName: this.state.name
        })
        this.setState({
            name: ''
        })
    }

    urlCollector() {
        this.setState({
            savedUrl: this.state.url
        })
        this.setState({
            url: ''
        })
    }

    hintCollector() {
        let hints = this.state.hints;
        hints.push(this.state.hintMessage)
        this.setState({
            hints: hints
        })

        this.setState({
            hintMessage: ''
        })
    }

    handleSubmit() {
        let profile = {};
        if (this.state.hints.length <= 4) {
            profile.name = this.state.savedName;
            profile.url = this.state.savedUrl;
            profile.hints = this.state.hints;

            console.log('this is profile:', profile)
            this.props.postProfile(profile);

            alert('profile submitted!')
        } else {
            alert('too many hints submitted!');
        }

        //call passed down function to post request
    }

    updateHints(e) {
        this.setState({
            hintMessage: e.target.value
        })
    }

    clearHint() {
        this.setState({
            hintMessage: ''
        })
    }

    updateName(e) {
        this.setState({
            name: e.target.value
        })
    }

    updateUrl(e) {
        this.setState({
            url: e.target.value
        })
    }


    render() {
        return (
            <div>
                <h3>Submit New Users Below!</h3>
                <div id="search">
                    <h4>Name</h4>
                    <input type="text" value={this.state.name} onChange={this.updateName.bind(this)} />
                    <button onClick={this.nameCollector.bind(this)}>Submit Name</button>
                    <h4>Picture URL</h4>
                    <input type="text" value={this.state.url} onChange={this.updateUrl.bind(this)} />
                    <button onClick={this.urlCollector.bind(this)}>Submit Picture</button>
                    <h4>"Fun Fact" Hints</h4>
                    <input type="text" value={this.state.hintMessage} onChange={this.updateHints.bind(this)} onClick={this.clearHint.bind(this)} />
                    <button onClick={this.hintCollector.bind(this)}>Submit Hints</button>
                </div>
                <br />
                <br />
                <br />
                <button onClick={this.handleSubmit.bind(this)}>Submit Profile</button>
            </div>
        )
    }
}

export default Submit;