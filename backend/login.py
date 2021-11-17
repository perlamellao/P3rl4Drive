from pymongo import MongoClient
from dotenv import dotenv_values
config = dotenv_values(".env")


client = MongoClient("mongodb+srv://"+config['USER']+":"+config['KEY']+"@"+config['URL'])

db = client[config['DATABASE']]

col = db['usuarios']

def get_user(user):
    return col.find_one({"user":user})