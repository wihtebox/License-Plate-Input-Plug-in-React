var storage = {
  set: function(k,v){
    localStorage.setItem(k,JSON.stringify(v));
  },
  get: function(k){
    var str = localStorage.getItem(k);
    if (str) {
      return JSON.parse(str);
    }
    return null;
  },
  remove:function(k){
    localStorage.removeItem(k);
  },
  clear:function(){
    localStorage.clear();
  },
};

export default storage;
