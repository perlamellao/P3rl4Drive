from pymongo import MongoClient
from dotenv import dotenv_values
config = dotenv_values(".env")


client = MongoClient("mongodb+srv://"+config['USER']+":"+config['KEY']+"@"+config['URL'])

db = client[config['DATABASE']]

col = db['usuarios']

def singupap(username , password):
    col.insert({
        "user":username,
        "password":password
    })
    return True
    