import React from 'react'

const Picture = (props) => (
    <div className="picture">
        <img src={props.pictureURL} alt="this is a default picture" />
    </div>
)


export default Picture;