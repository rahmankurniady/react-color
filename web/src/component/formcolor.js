
import React from 'react';
import { Component } from 'react'

export default class Formcolor extends Component {
    render() {

        return (
            <div>
                <p>You have not selected your favorite color(s)
                    Pick your favorite colors: 1 or more</p>
                <form onSubmit={this.props.submitColor}>
                    <input type="checkbox" name="color_blue" onChange={this.props.handleCheck} /> Blue
                    <input type="checkbox" name="color_red" onChange={this.props.handleCheck} /> Red
                    <input type="checkbox" name="color_green" onChange={this.props.handleCheck} />Green
                    <input type="checkbox" name="color_yellow" onChange={this.props.handleCheck} />Yellow
                    <input type="checkbox" name="color_purple" onChange={this.props.handleCheck} />Purple
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        )

    }

}
