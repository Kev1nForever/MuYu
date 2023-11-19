from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import datetime

conn = pymysql.connect(
    host = 'localhost',
    port = 3306,
    user = 'root',
    password = '123456',
    database = 'caculator'
)

app = Flask(__name__)
CORS(app)
cursor = conn.cursor()


#===========================登录/注册=====================================
table = 1

@app.route('/getusr', methods=['GET'])
def get_usr_data(): #得到用户信息
    try:
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        print(users)
        return jsonify({"data": users})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500

@app.route('/postusr', methods=['POST'])
def post_user():
    try:
        data = request.get_json()
        global table
        table = int(data.get('usr'))
        print(table)

        response_message = "ok"
        return jsonify({"message": response_message})
    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500

@app.route('/addusr', methods=['POST'])
def add_user(): #添加用户
    try:
        data = request.get_json()  # 获取POST请求的JSON数据
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()

        phone = data.get('phone')
        password = data.get('password')

        print(phone, password)

        has = False
        for x,y,z in users:
            if y == phone:
                has = True

        if has == False:
            data = (len(users) + 1, phone, password)
            insert = "INSERT INTO users VALUES (%s, %s, %s)" #sql插入语句
            cursor.execute(insert, data)
            conn.commit()

        response_message = "ok"
        return jsonify({"message": response_message})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


#====================================================================





#===========================科学计算器=====================================
@app.route('/post', methods=['POST'])
def post_history(): #存储运算表达式和值
    try:
        data = request.get_json()  # 获取POST请求的JSON数据
        expression = data.get('expression')
        result = data.get('result')

        global table
        print(table)
        time = datetime.datetime.now()
        data = (time, expression, result)
        insert = "INSERT INTO " + "table" + str(table) + " VALUES (%s, %s, %s)" #sql插入语句
        cursor.execute(insert, data)
        conn.commit()

        response_message = "ok"
        return jsonify({"message": response_message})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


@app.route('/get', methods=['GET'])
def get_calculation_data():#得到历史值
    try:
        global table
        cursor.execute("SELECT expression, result FROM " + "table" + str(table) + " ORDER BY time DESC LIMIT 10")
        data = cursor.fetchall()
        return jsonify({"data": data})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


@app.route('/send_clear', methods=['POST'])
def send_clear():#清除数据库
    try:
        insert = "DELETE FROM equation"
        cursor.execute(insert)
        conn.commit()

        response_message = "ok"
        return jsonify({"message": response_message})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500

#=====================================================================






#===========================税率计算器=====================================


@app.route('/calculateTax', methods=['POST'])#查税率信息
def calculateTax():
    try:
        data = request.get_json()  # 获取POST请求的JSON数据
        flag = data.get('category')
        money = data.get('money')
        time = data.get('time')
        insert = ""

        print(flag, money, time)
        if flag == 1:
            insert = "SELECT rate FROM currentinterestrate"
        elif flag == 2:
            insert = "SELECT rate FROM terminterestrate WHERE time = " + time
        else:
            time = int(time)
            month = time
            if time <= 6:
                month = "6"
            elif time <= 12:
                month = "12"
            elif time <= 36:
                month = "35"
            elif time <= 60:
                month = "59"
            else:
                month = "60"
            insert = "SELECT rate FROM lendingrate WHERE time = " + month

        cursor.execute(insert)
        data = cursor.fetchall()


        t = data[0][0]
        print(t, money, time)
        result = float(t) / 100.0 * float(money) * float(time) / 12.0

        return jsonify({"result": result})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


@app.route('/changeTax', methods=['POST'])
def changeTax():#修改税率信息
    try:
        data = request.get_json()  # 获取POST请求的JSON数据
        flag = data.get('flag')
        rate = data.get('rate')
        time = data.get('time')
        insert = ""

        print(flag)
        if flag == 1:
            insert = "UPDATE currentinterestrate SET rate = " + rate
        elif flag == 2:
            insert = "UPDATE terminterestrate SET rate = " + rate + " WHERE time = " + time
        else:
            insert = "UPDATE lendingrate SET rate = " + rate + " WHERE time = " + time

        cursor.execute(insert)
        conn.commit()

        response_message = "ok"
        return jsonify({"message": response_message})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


#=========================================================================

if __name__ == '__main__':
    app.run(host = 'localhost', port = 5000)
