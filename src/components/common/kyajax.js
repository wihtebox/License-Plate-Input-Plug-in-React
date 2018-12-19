import Config from './config';
var ajax = {
  common: function(url, params, type, success, fail) {
    var xhr = null;
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e1) {
        xhr = new XMLHttpRequest();
      }
    }
    xhr.open("post", Config.server_url + url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;"); //缺少这句，后台无法获取参数
    xhr.onreadystatechange = function() {
      console.log(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
      }
    };
    var content = "appid=11111&sign=222222222";
    xhr.send(content);
  },
  get: function(url, params, success, fail) {

    this.common(url, params, 'GET', success, fail);
  },
  post: function(url, params, success, fail) {
    this.common(url, params, 'POST', success, fail);
  }
};

export default ajax;