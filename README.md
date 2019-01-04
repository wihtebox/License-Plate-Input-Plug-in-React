安装
npm install

开始项目
npm start

引用：
onChange：检测所输入的车牌号码
open：默认不打开输入键盘
energy：是否是新能源汽车车牌
bottom：输入键盘离底部的高度
<Chepai onChange={v=>this.parkNumberChange(v)} open={false} energy={true}  bottom={'0px'}/>
