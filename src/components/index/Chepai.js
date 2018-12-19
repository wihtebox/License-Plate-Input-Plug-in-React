import React, { Component } from 'react';
import './Chepai.css';
import choose from '../../dist/img/choose.svg'
import choosed from '../../dist/img/choosed.svg'
const inputContent = {
	provinces:["京","沪","浙","苏","粤","鲁","晋","冀","豫","川","渝","辽","吉","黑","皖","鄂","津","贵","云","桂","琼","青","新","藏","蒙","宁","甘","陕","闽","赣","湘"],
	keyNums:["0","1","2","3","4","5","6","7","8","9","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","确定","Z","X","C","V","B","N","M","删除"],
}

class Chepai extends Component {
	constructor(props) {
		super(props);
		this.state={
			open:this.props.open,
			energy:false,//是否是新能源
			license:['','','','','','','',''],
			inputKey:0,//输入的序号
			selectEnergy:choose
		};
	}
	returnProps=()=>{
		let license=''
		this.state.license.map((value,i)=>{
			value===''?'':license+=value;
		})
		this.props.onChange({license:license,energy:this.state.energy,index:this.state.inputKey})
	}
	clickBox=(key)=>{
		this.setState({
			inputKey:key,
			open:true
		})
	}
	chooseProvince=(val)=>{
		let license = this.state.license;
		license[0] = val;
	
		this.setState({
			license:license,
			inputKey:this.state.inputKey+1
		},this.returnProps())
		
	}
	choosekey=(val)=>{
		let license = this.state.license;
		if(val==='删除'){
			license[this.state.inputKey] = '';
			license[this.state.inputKey-1] = '';
			this.setState({
				license:license,
				inputKey:this.state.inputKey-1
			},this.returnProps())
			
			return;
		}
		if(val==='确定'){
			this.setState({
				open:!this.state.open
			})
			this.returnProps()
			return;
		}
		if(!this.state.energy&&this.state.inputKey===7){
			this.setState({
				open:!this.state.open
			})
			return;
		}
		if(this.state.energy&&this.state.inputKey===8){
			this.setState({
				open:!this.state.open
			})
			return;
		}
		if(!this.state.energy&&this.state.inputKey<7&&val!=='删除'&&val!=='确定'){
			license[this.state.inputKey] = val;
			this.setState({
				license:license,
				inputKey:!this.state.energy&&this.state.inputKey<6?this.state.inputKey+1:this.state.inputKey
			},this.returnProps())
		}else if(this.state.inputKey<8&&val!=='删除'&&val!=='确定'){
			license[this.state.inputKey] = val;
			this.setState({
				license:license,
				inputKey:this.state.energy&&this.state.inputKey<7?this.state.inputKey+1:this.state.inputKey
			},this.returnProps())
		}else{
			this.setState({
				open:false
			})
		}
	}
	selectEnergy=()=>{
		let license = this.state.license;
		this.state.selectEnergy===choose?license[7]='':''
		this.setState({
			selectEnergy:this.state.selectEnergy===choose?choosed:choose,
			energy:!this.state.energy,
			open:true,
			license:license
		},this.returnProps())
		
	}
	cleanPro=()=>{
		this.setState({
			license:['','','','','','','',''],
			inputKey:0,//输入的序号
		})
		this.returnProps()
	}
	closePro=()=>{
		this.setState({
			open:false
		})
	}

	render() {
		return (<div style={this.props.style||{position: 'fixed', height: '100%', width: '100%', top: 0}}>    
			<ul className='clearfix ul_input'>
				{this.state.license.map((value,i)=>{
					if(!this.state.energy && i === 7){
						return;
					}
					return(<li onClick={()=>this.clickBox(i)} className='input_pro' style={{width:this.state.energy?'12.5%':'14%'}} key={i}>
							<span  style={{width:this.state.energy?'32px':'40px',border:`${this.state.inputKey===i?'1px solid #ff1000':'1px solid #ccc'}`}} className='input_pp input_zim'>
								{value}
							</span>
						</li>)
				})}
			</ul>
			{this.state.open?<div>	
				{this.state.inputKey===0?
					<ul className='clearfix ul_pro' >
						{inputContent.provinces.map((value,i)=>{
							return(<li key={i}><span onClick={()=>this.chooseProvince(value)}>{value}</span></li>)
						})}
						<li className='li_close'><span onClick={()=>this.closePro()}>关闭</span></li>
						<li className='li_clean'><span onClick={()=>this.cleanPro()}>清空</span></li>
					</ul>
					:<ul className='clearfix ul_keybord' >
						{inputContent.keyNums.map((value,i)=>{
							return(<li key={i} className={
								i<10?'li_num':i===20?'li_zm ikey20':i>28?'li_zm li_w':'li_zm'
							}><span onClick={()=>this.choosekey(value)}>{value}</span></li>)
						})}
					</ul>
				}	
				</div>:''}
				<div className='energy_choose' onClick={()=>this.selectEnergy()} ><img src={this.state.selectEnergy} className='choose' alt=''/><span>新能源汽车</span></div>
        </div>)
	}
}

export default Chepai;
