from flask import Flask, request, Response, make_response
import requests
import json
import os

app = Flask(__name__)

def add(js):
    return js["x"] + js["y"]


@app.route('/index', methods = ["POST"])
def index():
    # print(request.form)
    print(request.headers['Content-Type'])
    if request.headers['Content-Type'] == 'application/json':
    #     print(request.form)
        jj = request.json
        print(jj)
        resp = Response(str(jj), status=200, mimetype='application/json')
    return resp

@app.route('/addCard', methods = ["POST"])
def addCard():
    # print(request.form)
    # print(request.files)
    upload_file = request.files['addImage']
    filename = upload_file.filename
    print(filename)
    print(upload_file)
    print(type(upload_file))
    if upload_file:
        file_path = "/Users/alanhu/xiaochengxu/res/image/" + filename
        upload_file.save(file_path)
        return make_response('上传成功')  
    else:
        return "failed"
    # json_card = request.json
    # print(json_card)
    # resp = Response("我收到了", status=200, mimetype='multipart/form-data')
    # return resp

@app.route('/uploadImage', methods = ["POST"])
def uploadImage():
    # 上传图片到服务器
    # 需要做的事情：
    # 1）新建一个用户文件夹
    # 2）将图片存到磁盘，并在图数据库建立图片节点、属性（路径）和关系（与用户的病历的关系）
    upload_file = request.files['addImage']
    filename = upload_file.filename
    print(filename)
    print(upload_file)
    print(type(upload_file))
    if upload_file:
        file_path = "/Users/alanhu/xiaochengxu/res/image/" + filename
        upload_file.save(file_path)
        resp = make_response('上传成功', 200)  
        return resp
    else:
        resp = make_response('上传文件不存在', 404) 
        return resp 

@app.route('/getUserID', methods = ["POST"])
def getUserID():
    print(request.json)
    
    if request.json["code"]:
        # resp = make_response('获取用户登陆代码成功', 200)
        appid = "wx47b749cba8fbf848"
        secret = "fdb29f368b122095b03f0f590d9f31b9"
        geturl = "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code" % (appid,secret,request.json["code"])
        re = requests.get(geturl)

        # resp = Response(, status=200, mimetype='application/json')
        resp = make_response(json.loads(re.text)["openid"], 200)
        print(json.loads(re.text)["openid"])
    else:
        resp = make_response('获取用户登陆代码失败', 404)
    return resp 

if __name__ == '__main__':
    app.run(debug = True)