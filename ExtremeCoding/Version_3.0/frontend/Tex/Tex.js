function switchBack() {
  window.location.href = "./../calculator/index.html";
}

function switchToModify() {
  window.location.href = "./Modify.html";
}

function switchToRad() {
  window.location.href = "./Calc_tex.html";
}

var tag = 1;
function changeTag(_tag) {
  tag = _tag;
  console.log(tag);
  if (tag == 1) {
    document.getElementById("current").style.backgroundColor="#aec6d5";
    document.getElementById("change").style.backgroundColor="#F5F5F5";
    document.getElementById("load").style.backgroundColor="#F5F5F5";
  }else if (tag == 2) {
    document.getElementById("current").style.backgroundColor="#F5F5F5";
    document.getElementById("change").style.backgroundColor="#aec6d5";
    document.getElementById("load").style.backgroundColor="#F5F5F5";
  }else {
    document.getElementById("current").style.backgroundColor="#F5F5F5";
    document.getElementById("change").style.backgroundColor="#F5F5F5";
    document.getElementById("load").style.backgroundColor="#aec6d5";
  }
}

function calculateTax(){
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/calculateTax', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
          Data = JSON.parse(xhr.responseText);
          document.getElementById('income').value=Data["result"];
      } else {
          console.error('获取数据出错: ' + xhr.status);
      }
    }
  };

  const data = {
    time : document.getElementById("time").value,
    money: document.getElementById("money").value,
    category: tag
  };

  xhr.send(JSON.stringify(data));
}

function changeTax(){
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/changeTax', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        Data = JSON.parse(xhr.responseText);
      } else {
        console.error('获取数据出错: ' + xhr.status);
      }
    }
  };
  console.log(document.getElementById("tax_time").value);
  const data = {
    time: document.getElementById("tax_time").value,
    rate: document.getElementById("tax_rate").value,
    flag: tag
  };
  xhr.send(JSON.stringify(data));
}






