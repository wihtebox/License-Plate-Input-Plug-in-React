import React, { Component } from 'react';
import Chepai from './Chepai';
import './index.css';
import add_1 from "../../dist/img/add-1.svg";
class Index extends Component {
	constructor(props) {
		super(props);
		this.state={
			parkNumberError:false,
			energy:false,
			openCheipai:true,
			licenseNum:'',
			inputKey:0,
			licenseTest:false,//检测车牌 是否正确：正确：true
			licenseList_switch:false,//开关
			licenseList_show_item:[],
		}
	}

	chepaiOnchange=(v)=>{
		console.log(v)
		let licenseTest;
		if(/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(v.license)){
			licenseTest=true;
		}else{
			licenseTest=false;
		}
		this.setState({
			licenseNum:v.license,
			openCheipai:v.open,
			inputKey:v.inputKey,
			licenseTest:licenseTest,
		},()=>console.log("车牌是否监测通过："+this.state.licenseTest))
	}
	isEnergy=()=>{
		let inputKey=this.state.inputKey;
		if(this.state.energy&&inputKey===7){
			this.setState({
					licenseNum:this.state.licenseNum.split("").length===8?this.state.licenseNum.substring(0,this.state.licenseNum.length-1):this.state.licenseNum,
					inputKey:6
				},
				()=>console.log(this.state.inputKey))
		}
		if(this.state.energy&&inputKey<7){
			this.setState({
					licenseNum:this.state.licenseNum.split("").length===8?this.state.licenseNum.substring(0,this.state.licenseNum.length-1):this.state.licenseNum,
					inputKey:this.state.inputKey
				},
				()=>console.log(this.state.inputKey))
		}
		if(!this.state.energy&&inputKey===6){
			this.setState({
					inputKey:7
				},
				()=>console.log(this.state.inputKey))
		}
		this.setState({energy:!this.state.energy})
	}
	openCheipaiInput=()=>{
		this.setState({
			openCheipai:true,
		},()=>console.log(this.state.openCheipai))
	}

	render() {
		let style={position: 'fixed', height: '100%', width: '100%', top: 0}
		return (<div className={"Index"}>
				<div className="chepai-box" onClick={()=>{this.openCheipaiInput()}}>
					<div className={`chepai-box-item ${this.state.inputKey===0?"activity":""}`}
						 onClick={()=>this.setState({inputKey:0})}
					>{this.state.licenseNum.split("")[0]!=="-"?this.state.licenseNum.split("")[0]:""}</div>
					<div className={`chepai-box-item ${this.state.inputKey===1?"activity":""}`}
						 onClick={()=>this.setState({inputKey:1})}
					>{this.state.licenseNum.split("")[1]!=="-"?this.state.licenseNum.split("")[1]:""}</div>
					<div className={`chepai-box-item ${this.state.inputKey===2?"activity":""}`}
						 onClick={()=>this.setState({inputKey:2})}
					>{this.state.licenseNum.split("")[2]!=="-"?this.state.licenseNum.split("")[2]:""}</div>
					<div className={`chepai-box-item ${this.state.inputKey===3?"activity":""}`}
						 onClick={()=>this.setState({inputKey:3})}
					>{this.state.licenseNum.split("")[3]!=="-"?this.state.licenseNum.split("")[3]:""}</div>
					<div className={`chepai-box-item ${this.state.inputKey===4?"activity":""}`}
						 onClick={()=>this.setState({inputKey:4})}
					>{this.state.licenseNum.split("")[4]!=="-"?this.state.licenseNum.split("")[4]:""}</div>
					<div className={`chepai-box-item ${this.state.inputKey===5?"activity":""}`}
						 onClick={()=>this.setState({inputKey:5})}
					>{this.state.licenseNum.split("")[5]!=="-"?this.state.licenseNum.split("")[5]:""}</div>
					<div className={`chepai-box-item ${this.state.inputKey===6?"activity":""}`}
						 onClick={()=>this.setState({inputKey:6})}
					>{this.state.licenseNum.split("")[6]!=="-"?this.state.licenseNum.split("")[6]:""}</div>
					<div className={`energy chepai-box-item ${this.state.inputKey===7?"activity":""}`} onClick={()=>this.isEnergy()}>
						{this.state.energy?this.state.licenseNum.split("")[7]:<div className={"cen"}>
							<img src={add_1} alt=""/>
							<div className={"text"}>新能源</div>
						</div>}
					</div>
				</div>
				<Chepai open={this.state.openCheipai}
						energy={this.state.energy}
						onChange={v=>this.chepaiOnchange(v)}
						inputKey={this.state.inputKey}
						license={this.state.licenseNum}
						bottom={"0px"} zIndex="101" style={{height:"auto"}}
				></Chepai>
			</div>
			)
	}
}

export default Index;
