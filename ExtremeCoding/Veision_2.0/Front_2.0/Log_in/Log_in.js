var phone = document.getElementById('phone');
var password = document.getElementById('password');

var error = document.getElementById('error');

function senduser(user) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/postusr', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = xhr.responseText;
        console.log(response);
      } else {
        console.error('请求失败，状态码：' + xhr.status);
      }
    }
  };
  console.log(user);
  const data = {
    usr: user
  };
  xhr.send(JSON.stringify(data));
}

function login() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:5000/getusr', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        Data = JSON.parse(xhr.responseText);
        array = Data["data"];
        console.log(array);
        
        var user = 0;
        for (var i = 0; i < array.length; i++) {
          if (array[i][1] == phone.value && array[i][2] == password.value) {
            user = array[i][0];
            console.log(array[i][0]);
          } 
          console.log(array[i]);
        }
        console.log(user);
        if (user == 0) {
          phone.value = "密码错误，请重新输入";
          password.value = "";
        }else {
          senduser(user);
          window.location.href="../calculator/index.html";
        }
      } else {
        console.error('获取数据出错: ' + xhr.status);
      }
    }
  };
  xhr.send();
}

