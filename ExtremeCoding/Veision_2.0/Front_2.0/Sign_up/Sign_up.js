var phone = document.getElementById('phone');
var password = document.getElementById('password');

function signup() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/addusr', true);
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
  console.log(phone.value, password.value);
  const data = {
    phone: phone.value,
    password: password.value
  };
  xhr.send(JSON.stringify(data));
}