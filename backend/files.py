from pymongo import MongoClient
import json 

from dotenv import dotenv_values
config = dotenv_values(".env")
client = MongoClient("mongodb+srv://"+config['USER']+":"+config['KEY']+"@"+config['URL'])
db = client[config['DATABASE']]

def get_files(id):
    total = []
    col = db[id]
    for doc in col.find():
        total.append(doc['filename'])
    total = dict(zip(range(0,len(total)), total))
    return total






