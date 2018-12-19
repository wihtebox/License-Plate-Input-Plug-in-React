import Config from './config';
import Storage from './storage';
import { createHashHistory } from 'history'
import { Modal} from 'antd-mobile';
var ajax = {
  common: function(url, params, type,success, fail) {
    url=Config.server_url+url;
    var str = '';
    console.log(url)
    for (var key in params) {
      str += key + '=' + params[key] + '&'
    }
    if (str.length > 0 && type === 'GET') {
      url += '?' + str;
      str = null;
    }
    const xhr = new XMLHttpRequest();

    xhr.open(type || 'GET', url);
    if(Storage.get('token')){
      xhr.setRequestHeader("Authorization", Storage.get('token'));
    }
    if (type === 'POST') {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.Method = "POST";
    }
    xhr.withCredentials = true;
    xhr.send(str);
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
           const data = JSON.parse(xhr.responseText);
           console.log(data)
          if(success){
            if(data.status===200)
              success(data);
            else
               fail(data.message);
          }
        } catch (e) {
          if(fail){
            fail(JSON.parse(xhr.responseText).message);
          }
        }
      }
      if (xhr.readyState === 4 && xhr.status === 500) {
        try {
            const data = JSON.parse(xhr.responseText);
            Modal.alert('提示',data.message,[
            {
              text: '取消', 
                onPress: () => {
              }
            },
            {
              text: '确定', 
              onPress: () => {
                createHashHistory().push('/login')
              }
            },
        ])
        } catch (e) {
          if(fail){
            fail(JSON.parse(xhr.responseText).message);
          }
        }
      }
    });

    xhr.addEventListener('error', function(e) {
      if(fail){
        fail(e);
      }
    });
  },
  get: function(url, params, success, fail) {
    this.common(url, params, 'GET', success, fail);
  },
  post: function(url, params, success, fail) {
    this.common(url, params, 'POST', success, fail);
  },
  json:function(url, params, success, fail){
    url=Config.server_url+url;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var res = JSON.parse(xhr.responseText);
            try {
              const data = JSON.parse(xhr.responseText);
              if(success){
                success(data);
              }
            } catch (e) {
              if(fail){
                fail(e);
              }
            }
            }
        }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(params)
  }
};

export default ajax;
