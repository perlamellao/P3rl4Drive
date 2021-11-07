from flask import Flask, request, jsonify
from flask_cors import CORS

server = Flask(__name__)
CORS(server)
@server.route('/')
def index():
    return('lesgooo')



@server.route('/login', methods=['POST'])
def login():
    login = request.json['credentials']
    if login['username'] == 'admin' and login['password'] == 'admin':
        return("1293891283")
    else:
        return("ERROR")

if __name__ == '__main__':
    server.run(port=8080)