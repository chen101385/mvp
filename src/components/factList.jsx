import React from 'react'
import FunFacts from './funFacts.jsx'

const FactList = (props) => (
    <div className="hint">
    <button onClick={props.changeHint}>Generate New Hint</button>
    <br />
    <br />
    <br />
    <li>Here's a HINT: <i><strong>{props.funFact}</strong></i></li>
    <br />
    <br />
     </div>
)

export default FactList;