import React, { Component } from 'react';
import Chepai from './Chepai';
import './index.css';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state={
			open:true,
		}
	}

	onChange=(val)=>{
		console.log(val)
	}

	render() {
		let style={position: 'fixed', height: '100%', width: '100%', top: 0}
		return (<Chepai style={style} onChange={val=>this.onChange(val)} open={this.state.open}/>)
	}
}

export default Index;
