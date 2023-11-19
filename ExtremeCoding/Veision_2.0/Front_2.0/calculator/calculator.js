var display = document.getElementById('display');
var historyEl = document.getElementById('history');
var lastRecordEl = document.getElementById('last-record');

//---------- 发送 ------------------

function saveHistory(expression, result) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/post', true);
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

    const data = {
      expression: expression,
      result: result
    };
    xhr.send(JSON.stringify(data));
  } catch (error) {
    display.value = 'Error';
  }
}

function getHistory() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:5000/get', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        Data = JSON.parse(xhr.responseText);
        array = Data["data"];
        console.log(array)
        historyEl.innerHTML = '';
        for(let i = 0; i < array.length; i++) {
          let pEl = document.createElement('p')
          pEl.innerHTML = array[i][0] + " = " + array[i][1] + "\n";
          historyEl.append(pEl);
        }
      } else {
        console.error('获取数据出错: ' + xhr.status);
      }
    }
  };
  xhr.send();
}

// 控制键点击事件
document.getElementById("control-keys").addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    var btnVal = e.target.innerText;
    switch (btnVal) {
      case 'C':
        display.value = '';
        break;
      case 'DEL':
        if (display.value) {
          display.value = display.value.slice(0, -1);
        }
        break;
      case 'Ans':
        break;
      case 'history':
        getHistory()
        break;
    }
  }
});

//-----------------------------------


// ----------- 计算 ----------------

function appendToScreen(btnVal) {
  display.value += btnVal;
}

// 符号按钮点击事件
document.getElementById("buttons").addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    var btnVal = e.target.innerText;
    switch (btnVal) {
      case '=':
        try {
          var result = new Function('return ' + display.value)();
          saveHistory(display.value, result.toString())
          display.value = result.toString();
        } catch (err) {
          display.value = "错误";
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case '.':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '(':
      case ')': // 添加对括号按钮的处理
        appendToScreen(btnVal);
        break;
    }
  }
});


// 高级运算按钮点击事件
document.getElementById("advanced-buttons").addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    var op = e.target.innerText;
    var curVal = parseFloat(display.value);
    switch (op) {
      case 'e^x':
        display.value = `Math.exp(${curVal})`; // 显示计算过程
        break;
      case 'e':
        display.value = Math.E.toString();
        break;
      case 'ln':
        display.value = `Math.log(${curVal})`; // 显示计算过程
        break;
      case 'x^y':
        display.value = `Math.pow(${curVal}, y)`; // 这里假设y是想要使用的变量
        break;
      case '√':
        display.value = `Math.sqrt(${curVal})`; // 显示计算过程
        break;
      case 'sin':
        var rad = curVal * (Math.PI / 180); // 把角度转换为弧度
        display.value = `Math.sin(${curVal})`; // 显示计算过程
        break;
      case 'cos':
        var rad = curVal * (Math.PI / 180); // 把角度转换为弧度
        display.value = `Math.cos(${curVal})`; // 显示计算过程
        break;
      case 'tan':
        var rad = curVal * (Math.PI / 180); // 把角度转换为弧度
        display.value = `Math.tan(${curVal})`; // 显示计算过程
        break;
      case 'log':
        display.value = `Math.log10(${curVal})`; // 显示计算过程
        break;
      case 'π':
      display.value = Math.PI.toString();
      break;
    }
  }
});
// -------------------------------------