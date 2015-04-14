import urllib2
import json
import pymongo
import time

urlRoot = 'http://maps.googleapis.com/maps/api/geocode/json?address='

# Connection to Mongo DB
try:
    conn=pymongo.MongoClient()
    print "Connected successfully!!!"
except pymongo.errors.ConnectionFailure, e:
   print "Could not connect to MongoDB: %s" % e
conn

db = conn.finder
meetings = db.meetings
#print meetings.count()

cursor = meetings.find({ 'location' : None }).limit(500)

for doc in cursor:
    try:
        fullAddress = doc['address'] + '+' + doc['city'] + '+' + doc['state']
        cleanAddress = fullAddress.replace(' ', '+')
        url = urlRoot + cleanAddress
        response = urllib2.urlopen(url).read().decode('utf-8')
        json_obj = json.loads(response)
        if json_obj['status'] == 'OK':
            coor = json_obj['results'][0]['geometry']['location']
            print doc['_id']
            lng = coor['lng']
            lat = coor['lat']
            doc['location'] = [lng, lat]
            #db.test.update({ '_id': doc['_id'] }, { $set: { 'location[0]': lng, 'location[1]': lat } })
            db.meetings.save(doc)

        #sleep to throttle requests to api
        time.sleep(.3)

    except Exception:
        print 'Error: ' + str(doc['_id'])
        pass