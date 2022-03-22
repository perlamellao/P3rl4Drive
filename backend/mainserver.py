from flask import Flask, request, jsonify, send_file
import hashlib
import re
import os
from flask_cors import CORS
from login import get_user
from files import get_files
from singup import singupap
from base64 import b64decode
from collections import Counter
server = Flask(__name__)
CORS(server)


def decode_base64(data, altchars=b'+/'):
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


@server.route('/files/gettotal', methods=['POST'])
def filestot():
    id = request.json['id']
    extensions = []
    totalExtensions = []
    init_path = os.getcwd()
    os.chdir("files/{}".format(id))
    size = 0
    
    
    for file in os.listdir():
        size += os.path.getsize(file)
    

    for file in os.listdir():
        extensions.append(file.split('.')[-1])
    extensionsCounter = Counter(extensions)
    totalExtensions = list(extensionsCounter.values())
    extensions = list(extensionsCounter.keys()) 

    print(extensions)
    print(totalExtensions)


    os.chdir(init_path)
    size = size/1024/1024
    size = float(size)
    size = round(size, 2)
    size = "{} MB".format(size)

    return(jsonify(totalExtensions, extensions, [size]))

@server.route('/getfile/<id>/<filename>', methods=['GET'])
def getfile(id,filename):
    return send_file("files/{}/{}".format(id, filename), download_name=filename, as_attachment=True)

@server.route('/delfile/<id>/<filename>', methods=['GET'])
def delfile(id,filename):
    try:
        os.remove("files/{}/{}".format(id, filename))
    except:
        pass
    return("""<script type='text/javascript'>self.close();</script>""")



@server.route('/files/upload/<id>', methods=['POST'])
def filesupload(id):
    files = request.files.getlist('file')
    for file in files:
        file.save("files/{}/{}".format(id, file.filename))


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
    server.run(port=8020, debug=True, host="0.0.0.0")
