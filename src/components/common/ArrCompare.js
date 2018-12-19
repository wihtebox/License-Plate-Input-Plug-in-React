let ArrCompare = {
	//调用方法 :  arr.sort(ArrCompare.compare)
	//var arr = [23, 9, 4, 78, 3];
	compare:function(x,y) {
	    if (x < y) {
	        return -1;
	    } else if (x > y) {
	        return 1;
	    } else {
	        return 0;
	    }
	},

	//调用方法 :  arr.sort(ArrCompare.compareObj("age"))
	//var arr = [{name: "zlw", age: 24}, {name: "wlz", age: 25}];则str='age'
	compareObj:function(str){
		return function(obj1, obj2){
			let val1 = obj1[str];
		    let val2 = obj2[str];
		    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
	            val1 = Number(val1);
	            val2 = Number(val2);
	        }
		    if (val1 < val2) {
		        return -1;
		    } else if (val1 > val2) {
		        return 1;
		    } else {
		        return 0;
		    }    
		}        
	}
}

export default ArrCompare;