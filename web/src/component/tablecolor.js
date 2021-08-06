
import React from 'react';
import { Component } from 'react'

export default class Tablecolor extends Component {
    render() {

        return (
            <div>
                <p>Your favorite color(s) are:</p>
                <ul>
                    {(this.props.color_blue === 1) ? <li>blue</li> : ""}
                    {(this.props.color_red === 1) ? <li>red</li> : ""}
                    {(this.props.color_green === 1) ? <li>green</li> : ""}
                    {(this.props.color_yellow === 1) ? <li>yellow</li> : ""}
                    {(this.props.color_purple === 1) ? <li>purple</li> : ""}
                </ul>
            </div>

        )

    }

}
