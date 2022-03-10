from flask import Flask, request, jsonify
import hashlib
from flask_cors import CORS
from login import get_user
from files import get_files
from singup import singupap
server = Flask(__name__)
CORS(server)




@server.route('/')
def index():
    return('La API esta funcionando')

@server.route('/singup', methods=['POST'])
def singup():
    login = request.json['credentials']
    singupap(login['username'].lower(), hashlib.sha256(login['password'].encode('utf-8')).hexdigest())
    user = get_user(login['username'].lower())
    
    return(str(user['_id']))
    
@server.route('/files', methods=['POST'])
def files():
    id = request.json['id']
    files = get_files(id)
    return(files)


@server.route('/login', methods=['POST'])
def login():
    login = request.json['credentials']
    user = get_user(login['username'].lower())
    password = hashlib.sha256(login['password'].encode('utf-8')).hexdigest()
    if user is None:
        return("ERROR") 
    else:
        if user['password'] == password:
            return(str(user['_id']))
        else:
            return("ERROR")


if __name__ == '__main__':
    server.run(port=8020, debug=True)