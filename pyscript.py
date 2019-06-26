from pprint import pprint
from pymongo import MongoClient
import requests
import time

maxData = 1000000

client = MongoClient('mongodb://localhost:27017')
db = client.iss

while True:
    response = requests.get('http://api.open-notify.org/iss-now.json')
    data = response.json()
    lat = data['iss_position']['latitude']
    long = data['iss_position']['longitude']

    coord = db.coordinates.find()
    if coord.count() == maxData:
        db.coordinates.delete_one(coord[0])

    db.coordinates.insert_one({'lat':lat, 'long':long})

    # for c in coord:
    #     pprint(c['lat'] + ', ' + c['long'])

    time.sleep(5)
