import React, { Component } from 'react';

export default class Background extends Component {
	 constructor(props){
		super(props);
		this.state={
            title:props.leftTile||''
        }
	 }
	render(){
		return (
			<div>
				背景墙{this.props.tabtitle}
			</div>
		);
	}
}