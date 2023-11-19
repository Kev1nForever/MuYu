const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
let history = document.getElementById('history');


buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == 'clear') {
      display.innerText = ''; // 清空显示屏
    } else if (item.id == 'backspace') {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1); // 删除最后一个字符
    } else if (item.id == 'equal') {
      // 获取显示屏内容并处理数学表达式
      let expression = display.innerText;
      exp = expression
          .replace(/sin\(([^)]+)\)/g, (match, angle) => {
              return `Math.sin(${angle * Math.PI / 180})`; // 替换sin函数
          })
          .replace(/cos\(([^)]+)\)/g, (match, angle) => {
              return `Math.cos(${angle * Math.PI / 180})`; // 替换cos函数
          })
          .replace(/tan\(([^)]+)\)/g, (match, angle) => {
              return `Math.tan(${angle * Math.PI / 180})`; // 替换tan函数
          })
          .replace(/lg/g, 'Math.log10') // 替换lg为Math.log10
          .replace(/ln/g, 'Math.log') // 替换ln为Math.log
          .replace(/sqrt/g, 'Math.sqrt') // 替换sqrt为Math.sqrt
          .replace(/\^/g, '**') // 替换^为**
          .replace(/e/g, 'Math.E') // 替换e为Math.E
          .replace(/pi/g, 'Math.PI') // 替换pi为Math.PI
          .replace(/abs/g, 'Math.abs'); // 替换abs为Math.abs

      // 处理包含特殊函数的表达式
      try {
          // 计算表达式结果
          let result = eval(exp);

          // 创建XMLHttpRequest对象，发送POST请求
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:5000/post', true);
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                      const response = xhr.responseText;
                      console.log(response);
                  } else {
                      console.error('请求失败，状态码：' + xhr.status);
                  }
              }
          };

          // 构建POST数据
          const data = {
            expression: expression,
            result: result
          };
          xhr.send(JSON.stringify(data));
          display.innerText = result; // 在显示屏上显示结果
      } catch (error) {
          display.innerText = `Error: ${error.message}`; // 处理错误情况
      }
    } else if (item.id == 'exp') {
      display.innerText += '^'; // 添加指数运算符
    } else if (item.id == 'sin') {
      display.innerText += 'sin('; // 添加sin函数
    } else if (item.id == 'cos') {
      display.innerText += 'cos('; // 添加cos函数
    } else if (item.id == 'tan') {
      display.innerText += 'tan('; // 添加tan函数
    } else if (item.id == 'History') {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:5000/get', true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  Data = JSON.parse(xhr.responseText);
                  array = Data["data"];
                  console.log(array);
                  history.value = ""; // 清空历史显示框
                  for (i = 0; i < array.length; i++) {
                      history.value += array[i][0] + " = " + array[i][1] + '\n'; // 在历史显示框中显示历史记录
                  }
                  console.log(history.value);
              } else {
                  console.error('获取数据出错: ' + xhr.status); // 请求错误处理
              }
          }
      };
      xhr.send();
    } else if (item.id == "goto") {
      window.location.href = "./../Tex/Calc_tex.html";
    } else {
      display.innerText += item.id; // 添加按钮文本到显示屏
    }
  }
});

// 获取主题切换按钮及相关元素
const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');
const toggleIcon = document.querySelector('.toggler-icon');
let isDark = true;

// 监听主题切换按钮点击事件
themeToggleBtn.onclick = () => {
  calculator.classList.toggle('dark'); // 切换暗色主题
  themeToggleBtn.classList.toggle('active'); // 切换按钮样式
  isDark = !isDark; // 切换主题标志
}

// -------------------------------------