from flask import Flask, request, jsonify
import hashlib
import re
import os
from flask_cors import CORS
from login import get_user
from files import get_files
from singup import singupap
from base64 import b64decode
server = Flask(__name__)
CORS(server)


def decode_base64(data, altchars=b'+/'):
    """Decode base64, padding being optional.

    :param data: Base64 data as an ASCII byte string
    :returns: The decoded byte string.

    """
    data = re.sub(rb'[^a-zA-Z0-9%s]+' % altchars, b'', data)  # normalize
    missing_padding = len(data) % 4
    if missing_padding:
        data += b'='* (4 - missing_padding)
    return base64.b64decode(data, altchars)



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
    return(jsonify(files))


@server.route('/files/upload', methods=['POST'])
def filesupload():
    filename = request.json['filename']
    b64 = request.json['b64']
    id = request.json['id']
    b64 = b64.partition(",")[2]
    bytes = b64decode(b64, validate=True)
    with open("files/{}/{}".format(id, filename), 'wb') as f:
        f.write(bytes)
    print(b64)

    return("OK")


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