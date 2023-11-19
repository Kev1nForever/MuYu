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

UsrNumber = 0
table = 1

@app.route('/getusr', methods=['GET'])
def get_usr_data():
    try:
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        print(users)
        return jsonify({"data": users})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500

@app.route('/postusr', methods=['POST'])
def post_user(): #存储运算表达式和值
    try:
        data = request.get_json()  # 获取POST请求的JSON数据
        global table
        table = int(data.get('usr'))
        print(table)

        response_message = "ok"
        return jsonify({"message": response_message})
    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500

@app.route('/addusr', methods=['POST'])
def add_user(): #存储运算表达式和值
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

        print(has)
        if has == False:
            data = (len(users), phone, password)
            insert = "INSERT INTO users VALUES (%s, %s, %s)" #sql插入语句
            cursor.execute(insert, data)
            conn.commit()

        response_message = "ok"
        return jsonify({"message": response_message})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500

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

if __name__ == '__main__':
    app.run(host = 'localhost', port = 5000)
