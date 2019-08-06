安装

```
npm install
```


开始项目

```
npm start
```


说明：
onChange：检测所输入的车牌号码
open：默认不打开输入键盘
energy：是否是新能源汽车车牌
bottom：输入键盘离底部的高度

```
<Chepai open={this.state.openCheipai}
    energy={this.state.energy}//是否是新能源
    onChange={v=>this.chepaiOnchange(v)}
    inputKey={this.state.inputKey}//当前输入序号
    license={this.state.licenseNum}//输入的车牌号，字符串
    bottom={"0px"} //样式
    zIndex="101" //样式
    style={{height:"auto"}}//样式
></Chepai>
```
![插件截图](https://raw.githubusercontent.com/wihtebox/License-Plate-Input-Plug-in-React/master/src/dist/img/1565071019.png)
