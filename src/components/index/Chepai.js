import React, { Component } from 'react';
import './Chepai.css';
import choose from '../../dist/img/choose.svg'
import choosed from '../../dist/img/choosed.svg'
const inputContent = {
	provinces:["桂","京","沪","浙","苏","粤","鲁","晋","冀","豫","川","渝","辽","吉","黑","皖","鄂","津","贵","云","琼","青","新","藏","蒙","宁","甘","陕","闽","赣","湘"],
	keyNums:["0","1","2","3","4","5","6","7","8","9","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","确定","Z","X","C","V","B","N","M","删除"],
}

class Chepai extends Component {
	constructor(props) {
		super(props);
		this.state={
			open:this.props.open,
			energy:this.props.energy===0?false:true,//是否是新能源
			license:['-','-','-','-','-','-','-','-'],
			inputKey:this.props.inputKey||0,//输入的序号
			selectEnergy:choose,
			bottom:this.props.bottom||'0px',//离底部的高度
			zIndex:this.props.zIndex||'0',
			status:"input",//input:输入状态，delete:删除状态
		};

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.open){
			this.setState({
				open:true,
			})
		}else{
			this.setState({
				open:false,
			})
		}

		let license = '';
		console.log(nextProps.license)
		if(nextProps.license===""){
			license = ['-','-','-','-','-','-','-','-'];
		}else{
			license = (nextProps.license).split('');
		}
		if(nextProps.inputKey===0){
			license = (nextProps.license).split('');
		}
		if(!nextProps.energy){
			license[7]='';
		}

		this.setState({
			energy: nextProps.energy,
			license:license,
			inputKey:nextProps.inputKey
		})
	}
	returnProps=()=>{
		let license=''
		console.log(this.state.license)
		this.state.license.map((value,i)=>{
			let res = value===''?'':license+=value;
		})
		this.props.onChange({license:license,open:this.state.open,inputKey:this.state.inputKey})
	}

	chooseProvince=(val)=>{
		let license = this.state.license;
		license[0] = val;
		let key;
		if((this.state.inputKey<7&&this.state.energy)||(this.state.inputKey<6&&!this.state.energy)){
			console.log("454554")
			key=this.state.inputKey+1;
		}else if(!this.state.energy&&this.state.inputKey===6){
			console.log("454554")
			key=this.state.inputKey;
		}

		this.setState({
			license:license,
			inputKey:key,
			status:"input",
		},()=>this.returnProps())

	}
	choosekey=(val)=>{
		let license = this.state.license;
		//删除操作
		if(val==='删除'){
			let inputKey=this.state.inputKey;
			license[inputKey]="-";
			this.setState({
				license:license,
				inputKey:inputKey>0?inputKey-1:inputKey,
				status:"delete",
			},()=>{console.log(this.state.inputKey);this.returnProps()})
			return;
		}
		//确定操作
		if(val==='确定'){
			this.setState({
				open:false,
			},()=>this.returnProps())
			return;
		}
		//非新能源 输入信息，字母和数字
		if(!this.state.energy&&val!=='删除'&&val!=='确定'){
			// 根据输入状态作不同操作
			//输入状态
			if(this.state.status==="input"){
				if(this.state.inputKey<6){
					license[this.state.inputKey] = val;
					this.setState({
						license:license,
						inputKey:this.state.inputKey===6?this.state.inputKey:this.state.inputKey+1,
					},()=>this.returnProps())
				}
				if(this.state.inputKey===6){
					license[this.state.inputKey] = val;
					this.setState({
						license:license,
						inputKey:this.state.inputKey,
					},()=>this.returnProps())
				}
				if(this.state.inputKey===7){
					license[this.state.inputKey] = val;
					this.setState({
						license:license,
						inputKey:this.state.inputKey,
					},()=>this.returnProps())
				}
			}
			// 删除状态
			if(this.state.status==="delete"){
				if(license[this.state.inputKey]==='-'){
					license[this.state.inputKey] = val;
					this.setState({
						license:license,
						inputKey:this.state.inputKey+1,
						status:"input",
					},()=>this.returnProps())
				}else{
					if(this.state.inputKey<5){
						license[this.state.inputKey+1] = val;
						this.setState({
							license:license,
							inputKey:this.state.inputKey+2,
							status:"input",
						},()=>this.returnProps())
					}
					if(this.state.inputKey===5){
						license[this.state.inputKey+1] = val;
						this.setState({
							license:license,
							inputKey:this.state.inputKey+1,
							status:"input",
						},()=>this.returnProps())
					}
					if(this.state.inputKey===6){
						license[this.state.inputKey+1] = val;
						this.setState({
							license:license,
							inputKey:this.state.inputKey+1,
							status:"input",
						},()=>this.returnProps())
					}
				}

			}
		}
		//非能源 输入信息，字母和数字
		if(this.state.energy&&val!=='删除'&&val!=='确定'){
			if(this.state.status==="input"){
				if(this.state.inputKey<7){
					license[this.state.inputKey] = val;
					this.setState({
						license:license,
						inputKey:this.state.inputKey===7?this.state.inputKey:this.state.inputKey+1,
					},()=>this.returnProps())
				}
				if(this.state.inputKey===7){
					license[this.state.inputKey] = val;
					this.setState({
						license:license,
						inputKey:this.state.inputKey,
					},()=>this.returnProps())
				}
			}
			if(this.state.status==="delete"){
				if(license[this.state.inputKey]==='-'){
					license[this.state.inputKey] = val;
					this.setState({
						license:license,
						inputKey:this.state.inputKey+1,
						status:"input",
					},()=>this.returnProps())
				}else{
					if(this.state.inputKey<6){
						license[this.state.inputKey+1] = val;
						this.setState({
							license:license,
							inputKey:this.state.inputKey+2,
							status:"input",
						},()=>this.returnProps())
					}
					if(this.state.inputKey===6){
						license[this.state.inputKey+1] = val;
						this.setState({
							license:license,
							inputKey:this.state.inputKey+1,
							status:"input",
						},()=>this.returnProps())
					}
				}
			}
		}
	}
	//清空输入信息
	cleanPro=()=>{
		console.log('清空')
		this.setState({
			license:['-','-','-','-','-','-','-','-'],
			inputKey:0,//输入的序号
		},()=>{
			console.log(this.state.license,this.state.inputKey)
			this.returnProps()
		})
	}
	closePro=()=>{
		this.setState({
			open:false
		})
	}

	render() {
		return (<div className={"Chepai"} style={this.props.style||{height: '100%', width: '100%', top: 0}}>
			{this.state.open?<div>
				{this.state.inputKey===0?
					<ul className='clearfix ul_pro' style={{bottom:this.props.bottom||'50px',zIndex:this.state.zIndex}}>
						{inputContent.provinces.map((value,i)=>{
							return(<li key={i}><span name="chepaiInput" onClick={()=>this.chooseProvince(value)}>{value}</span></li>)
						})}
						<li   className='li_close'><span onClick={()=>this.closePro()}>关闭</span></li>
						<li name="chepaiInput" className='li_clean'><span name="chepaiInput" onClick={()=>this.cleanPro()}>清空</span></li>
						<li   className='li_delete'><span className={"delete"} onClick={()=>this.choosekey("删除")}></span></li>
					</ul>
					:<ul className='clearfix ul_keybord' style={{bottom:this.props.bottom||'50px',zIndex:this.state.zIndex}}>
						{inputContent.keyNums.map((value,i)=>{
							return(<li key={i} name="chepaiInput" className={
								i<10?'li_num':i===20?'li_zm ikey20':i>28?'li_zm li_w':'li_zm'
							}><span name="chepaiInput" className={value==="删除"?"delete":""} onClick={()=>this.choosekey(value)}>{value!=="删除"?value:""}</span></li>)
						})}
					</ul>
				}
			</div>:''}
		</div>)
	}
}

export default Chepai;
