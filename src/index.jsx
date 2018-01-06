import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import FactList from './components/factList.jsx'
import Picture from './components/picture.jsx'
import Search from './components/search.jsx'
import Submit from './components/submit.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profiles: [],
            currentName: 'nobody',
            currentURL: `https://i.imgflip.com/uwkcv.jpg`,
            currentHint: 'this is not a person',
            hints: ["this is no one", "this is nobody", "c'mon, this isn't even a real person", "enough already!"],
            hintNumber: 0
        }

    }

    //post profile object to database

    postProfile(obj) {
        //hint is an array of hints;
        let profileObj = {};

        let id = this.state.profiles.length;
        profileObj.id = id;
        profileObj.name = obj.name;
        profileObj.imageURL = obj.url;
        profileObj.hint1 = obj.hints[0];
        profileObj.hint2 = obj.hints[1];
        profileObj.hint3 = obj.hints[2];
        profileObj.hint4 = obj.hints[3];

        console.log('this is profileObj', profileObj)

        $.post({
            //always write out full URLs on client-side
            url: "http://localhost:3000/profile",
            contentType: 'application/json',
            data: JSON.stringify(profileObj),
            success: () => this.refreshPage(),
            error: console.log('client-side post request failed')
        })
    }

    //get top profile 
    refreshUser() {

      console.log('pre state', this.state)   
      
      let randomProfile = Math.floor(Math.random() * this.state.profiles.length)

      console.log('random Profile', randomProfile)

        this.setState({
            currentName: this.state.profiles[randomProfile].name,
            currentURL: this.state.profiles[randomProfile].imageURL,
            hints: [
                this.state.profiles[randomProfile].hint1,
                this.state.profiles[randomProfile].hint2,
                this.state.profiles[randomProfile].hint3,
                this.state.profiles[randomProfile].hint4
            ],
            hintNumber: 0
        }, () => this.setState({currentHint: this.state.hints[0]}))
    }

    changeHint() {
        let newHintNumber = this.state.hintNumber + 1
        if (newHintNumber < 4) {
            this.setState({
                currentHint: this.state.hints[newHintNumber],
                hintNumber: newHintNumber
            })  
        } else {
            alert('You\'re out of hints!')
        }
    }

    refreshPage() {
        $.get({
            url: `http://localhost:3000/profiles`,
            contentType: `application/json`,
            success: (data) => {
                this.setState({
                    profiles: data
                })
            },
            error: () => console.log('componentDM get request failed')
        })
        console.log(this.state);
    }

    //get profile object from database
    componentDidMount() {
        $.get({
            url: `http://localhost:3000/profiles`,
            contentType: `application/json`,
            success: (data) => {
                this.setState({
                    profiles: data
                }, () => console.log(this.state))
            },
            error: () => console.log('componentDM get request failed')
        })
    }

    render() {
        return (
            <div>
                <Picture pictureURL={this.state.currentURL} />
                <div>
                    <br />
                    <br />
                    <br />
                    <FactList funFact={this.state.currentHint}  changeHint={this.changeHint.bind(this)}/>
                </div>
                <div>
                    <Search name={this.state.currentName} refreshUser={this.refreshUser.bind(this)}/>
                </div>
                < br />
                < br />
                < br />
                <Submit postProfile={this.postProfile.bind(this)} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));