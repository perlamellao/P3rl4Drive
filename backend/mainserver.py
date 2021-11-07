from flask import Flask, request, jsonify
import hashlib
from flask_cors import CORS
from login import get_user

server = Flask(__name__)
CORS(server)



@server.route('/')
def index():
    return('lesgooo')



@server.route('/login', methods=['POST'])
def login():
    login = request.json['credentials']
    user = get_user(login['username'].lower())
    password = hashlib.sha256(login['password'].encode('utf-8')).hexdigest()
    if user is None:
        return("ERROR") 
    else:
        if user['password'] == password:
            return("letoken")
        else:
            return("ERROR")


if __name__ == '__main__':
    server.run(port=8080, debug=True)