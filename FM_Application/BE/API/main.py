########################################Import Lib##################################################
from cProfile import label
from distutils.log import error
from fastapi import FastAPI, UploadFile, File ,Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi import UploadFile, File
from PIL import Image
from bson import ObjectId
import io
import pandas as pd
import json
from pydantic import BaseModel
import jwt
from fastapi.encoders import jsonable_encoder
import pymongo
import gridfs
import numpy as np
from dateutil import parser
import warnings
warnings.filterwarnings("ignore")
###############################################App##################################################
app = FastAPI()
app.mount("/src/static", StaticFiles(directory="src/static"), name="static")

DB_IP="DB"
DB_Port = "27017"
API_IP = "localhost"
API_Port="8000"

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
###########################################################################################################

################################################Get Info######################################################
class siteinfo(BaseModel):
    Site_ID      : str = ''
    Date_From    : str = ''
    Date_To      : str = ''

@app.post("/getsiteinfo")
def getsiteinfo(siteinfo:siteinfo):
    data = jsonable_encoder(siteinfo) 

    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["power_reading_meter"]
    
    df = pd.DataFrame(list(mycol.find({"Site_ID":{"$regex":".*"+str(data['Site_ID'])+".*"},
            "Date": { "$gte": pd.to_datetime(data['Date_From']), "$lte": pd.to_datetime(data['Date_To'])}})))
    
    df["Image_URL"]=""

    fs = gridfs.GridFS(mydb)

    for i in range(df.shape[0]):
        im = Image.open(fs.get(ObjectId(str(df['Image'][i]))))
        im.save("src/static/{}".format(str(df['Image'][i]) +"." +im.format))
        df["Image_URL"].iloc[i] = "http://{}:{}/src/static/{}".format(API_IP, API_Port,str(df['Image'][i]) +"." +str(im.format))

    df['_id'] = df['_id'].apply(lambda x: str(x))
    df['Site_ID'] = df['Site_ID'].apply(lambda x: str(x))
    df['Vendor'] = df['Vendor'].apply(lambda x: str(x))
    df['Cash'] = df['Cash'].apply(lambda x: float(x))
    df['Image'] = df['Image'].apply(lambda x: str(x))
    df['Image_URL'] = df['Image_URL'].apply(lambda x: str(x))
    df['Date'] = df['Date'].dt.strftime('%m/%d/%Y').apply(lambda x: str(x))
    
    final_data = df.to_json(orient='records',force_ascii=False)
    data_json = json.loads(final_data)
    return data_json


###########################################################################################################################

#########################################################Insert_Power_Meter################################################
class Power_Meter_Value(BaseModel):
    Site_ID           : str = ''
    Vendor            : str = ''
    Reading_Number    : str = ''
    Date              : str = ''
    Power             : str = ''
    Cash              : str = ''

    
@app.post("/insert_reading_meter", status_code=201)
async def insert_reading_meter(Power_Meter_Value: Power_Meter_Value = Depends(), file: UploadFile = File(...)):

    data = jsonable_encoder(Power_Meter_Value) 
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["power_reading_meter"]

    fs = gridfs.GridFS(mydb)

    image_id = fs.put(file.file,filename=file.filename) 

    
    mycol.insert_one({"Site_ID":str(data['Site_ID']),"Reading_Number":int(str(data['Reading_Number']))
                      ,"Vendor":str(data['Vendor']), "Date":parser.parse(str(data['Reading_Number'])),
                       "Power":int(str(data['Power'])), "Cash":float(data['Cash']),"Image":str(image_id)})


    return {"Message": "Done"}


###########################################################################################################################

#########################################################Delete_Power_Meter################################################

@app.delete("/delete_reading_meter/{request_id}")
async def delete_reading_meter(request_id:str):

    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["power_reading_meter"]

    req_id = [ x for x in mycol.find({"_id" : ObjectId(request_id)})]
    row_id = str(req_id[0]['_id'])
    image_id = str(req_id[0]['Image'])

    mycol.delete_one({"_id" : ObjectId(row_id)})
    fs = gridfs.GridFS(mydb)
    fs.delete(ObjectId(image_id))


    return {"Message": "Done"}

###########################################################################################################################

#########################################################Login#############################################################
    
#https://dev.to/oyedeletemitope/login-authentication-with-react-and-fastapi-397b
SECERT_KEY = "01097619294"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

user = {
   "username": "",
    "password": "",

}

class LoginItem(BaseModel):
    username: str
    password: str


@app.post("/login")
async def user_login(loginitem:LoginItem):

    data = jsonable_encoder(loginitem)
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["users"]
    try:
        y = [ x for x in mycol.find({"Username" :str(data['username']), "Password":str(data['password'])})]
        df = pd.DataFrame(list(y))
        user['username'] = str(df['Username'].iloc[0])
        user['password'] = str(df['Password'].iloc[0])
        user['role']     = str(df['Role'].iloc[0])
    except:
        user['username'] = ""
        user['password'] = ""
        user['role']     = ""

    if data['username']== user['username'] and data['password']== user['password']:

        encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt , "role":user['role']}

    else:
        return {"message":"login failed"}

###########################################################################################################################

#########################################################insert_user#######################################################
class creationitem(BaseModel):
    email   : str
    username: str
    password: str
    role    : str

@app.post("/insert_user")
def insert_user(creationitem:creationitem):
    data = jsonable_encoder(creationitem)
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["users"]
    mycol.insert_one({"Email":str(data['email']),"Username":str(data['username']),"Password":str(data['password'])
                    ,"Role":str(data['role'])})

    return {"message":"Done"}
    


###########################################################################################################################

#########################################################get_user##########################################################
class username(BaseModel):
    email : str
@app.post("/get_user")
def get_user(username:username):
    data = jsonable_encoder(username)
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["users"]

    df = pd.DataFrame(list(mycol.find({"Email": {"$regex":".*"+str(data['email'])+".*"}})))
    
    df['_id'] = df['_id'].apply(lambda x: str(x))
    df['Email'] = df['Email'].apply(lambda x: str(x))
    df['Username'] = df['Username'].apply(lambda x: str(x))
    df['Password'] = df['Password'].apply(lambda x: str(x))
    df['Role'] = df['Role'].apply(lambda x: str(x))

    final_data = df.to_json(orient='records',force_ascii=False)
    data_json = json.loads(final_data)
    return data_json


######################################################delete_user##########################################################
@app.delete("/delete_user/{request_id}")
def delete_user(request_id:str):
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["users"]

    req_id = [ x for x in mycol.find({"_id" : ObjectId(request_id)})]
    row_id = str(req_id[0]['_id'])

    mycol.delete_one({"_id" : ObjectId(row_id)})


    return {"Message": "Done"}



############################################################################################################################

#########################################################insert_jvrequests##################################################
class JvRequests(BaseModel):
    Site_ID           : str = ''
    Visit_Date        : str = ''
    Done              : str = ''
    Comment           : str = ''

@app.post("/insert_jvrequests")
def insert_jvrequests(JvRequests:JvRequests):
    data = jsonable_encoder(JvRequests) 
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["jv_requests"]
    
    mycol.insert_one({"Site_ID":str(data['Site_ID']),"Visit_Date":parser.parse(str(data['Visit_Date']))
                      ,"Done":str(data['Done']), "Comment":str(data['Comment'])})



    return {"message":"Done"}

###########################################################################################################################

##################################################insert_exchangeaccess####################################################
class ExchangeAccess(BaseModel):
    Site_ID           : str = ''
    Exchange_Name     : str = ''
    Access_Date       : str = ''
    Comment           : str = ''

@app.post("/insert_exchangeaccess")
def insert_exchangeaccess(ExchangeAccess:ExchangeAccess):
    data = jsonable_encoder(ExchangeAccess) 
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["exchange_access"]

    mycol.insert_one({"Site_ID":str(data['Site_ID']),"Access_Date":parser.parse(str(data['Access_Date']))
                      ,"Exchange_Name":str(data['Exchange_Name']), "Comment":str(data['Comment'])})

    return {"message":"Done"}

###########################################################################################################################

##################################################insert_spare_parts_requests####################################################
class SparePartsRequests(BaseModel):
    Site_ID           : str = ''
    Faulty_Item       : str = ''
    Request_Date      : str = ''
    Delivery_Date     : str = ''

@app.post("/insert_spare_parts_requests")
def insert_spare_parts_requests(SparePartsRequests:SparePartsRequests):
    data = jsonable_encoder(SparePartsRequests) 
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["spare_parts_requests"]

    mycol.insert_one({"Site_ID":str(data['Site_ID']),"Request_Date":parser.parse(str(data['Request_Date']))
                      ,"Faulty_Item":str(data['Faulty_Item']), "Delivery_Date":parser.parse(str(data['Delivery_Date']))})

    return {"message":"Done"}

###########################################################################################################################

#########################################################Delete_jvrequests################################################

@app.delete("/delete_jvrequests/{request_id}")
async def delete_jvrequests(request_id:str):

    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["jv_requests"]

    req_id = [ x for x in mycol.find({"_id" : ObjectId(request_id)})]
    row_id = str(req_id[0]['_id'])

    mycol.delete_one({"_id" : ObjectId(row_id)})


    return {"Message": "Done"}

###########################################################################################################################

#########################################################Delete_exchangeaccess################################################

@app.delete("/delete_exchangeaccess/{request_id}")
async def delete_exchangeaccess(request_id:str):

    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["exchange_access"]

    req_id = [ x for x in mycol.find({"_id" : ObjectId(request_id)})]
    row_id = str(req_id[0]['_id'])

    mycol.delete_one({"_id" : ObjectId(row_id)})


    return {"Message": "Done"}

##############################################################################################################################


#########################################################Delete_spare_parts_requests###########################################

@app.delete("/delete_spare_parts_requests/{request_id}")
async def delete_spare_parts_requests(request_id:str):

    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["spare_parts_requests"]

    req_id = [ x for x in mycol.find({"_id" : ObjectId(request_id)})]
    row_id = str(req_id[0]['_id'])

    mycol.delete_one({"_id" : ObjectId(row_id)})


    return {"Message": "Done"}

##############################################################################################################################

################################################Get jv_requests###############################################################

@app.post("/getjv_requests")
def getjv_requests(siteinfo:siteinfo):
    data = jsonable_encoder(siteinfo) 

    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["jv_requests"]
    
    df = pd.DataFrame(list(mycol.find({"Site_ID": {"$regex":".*"+str(data['Site_ID'])+".*"},
            "Visit_Date": { "$gte": parser.parse(str(data['Date_From'])), "$lte": parser.parse(str(data['Date_To']))}})))
    
    df['_id'] = df['_id'].apply(lambda x: str(x))
    df['Site_ID'] = df['Site_ID'].apply(lambda x: str(x))
    df['Visit_Date'] = df['Visit_Date'].dt.strftime('%m/%d/%Y').apply(lambda x: str(x))
    df['Done'] = df['Done'].apply(lambda x: str(x))
    df['Comment'] = df['Comment'].apply(lambda x: str(x))

    final_data = df.to_json(orient='records',force_ascii=False)
    data_json = json.loads(final_data)
    return data_json

##############################################################################################################################

################################################Get exchangeaccess###############################################################

@app.post("/getexchangeaccess")
def getexchangeaccess(siteinfo:siteinfo):
    data = jsonable_encoder(siteinfo) 

    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["exchange_access"]
    
    df = pd.DataFrame(list(mycol.find({"Site_ID": {"$regex":".*"+str(data['Site_ID'])+".*"},
            "Access_Date": { "$gte": parser.parse(str(data['Date_From'])), "$lte": parser.parse(str(data['Date_To']))}})))
    
    df['_id'] = df['_id'].apply(lambda x: str(x))
    df['Site_ID'] = df['Site_ID'].apply(lambda x: str(x))
    df['Access_Date'] = df['Access_Date'].dt.strftime('%m/%d/%Y').apply(lambda x: str(x))
    df['Exchange_Name'] = df['Exchange_Name'].apply(lambda x: str(x))
    df['Comment'] = df['Comment'].apply(lambda x: str(x))

    final_data = df.to_json(orient='records',force_ascii=False)
    data_json = json.loads(final_data)
    return data_json


###########################################################################################################################

################################################Get spare_parts_requests####################################################
@app.post("/getspare_parts_requests")
def getspare_parts_requestss(siteinfo:siteinfo):
    data = jsonable_encoder(siteinfo) 

    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["spare_parts_requests"]
    
    df = pd.DataFrame(list(mycol.find({"Site_ID": {"$regex":".*"+str(data['Site_ID'])+".*"},
            "Request_Date": { "$gte": parser.parse(str(data['Date_From'])), "$lte": parser.parse(str(data['Date_To']))}})))
    
    df['_id'] = df['_id'].apply(lambda x: str(x))
    df['Site_ID'] = df['Site_ID'].apply(lambda x: str(x))
    df['Request_Date'] = df['Request_Date'].dt.strftime('%m/%d/%Y').apply(lambda x: str(x))
    df['Faulty_Item'] = df['Faulty_Item'].apply(lambda x: str(x))
    df['Delivery_Date'] = df['Delivery_Date'].dt.strftime('%m/%d/%Y').apply(lambda x: str(x))

    final_data = df.to_json(orient='records',force_ascii=False)
    data_json = json.loads(final_data)
    return data_json

###############################################################################################################################


#######################################################Generate Report#########################################################
@app.post("/genrate_avg_power_report")
async def genrate_avg_power_report(file: UploadFile = File(...)):
    files = await file.read()
    myclient = pymongo.MongoClient("mongodb://{}:{}/".format(DB_IP,DB_Port))
    mydb = myclient["fm_db"]
    mycol = mydb["power_reading_meter"]
    input_data = pd.read_excel(files)

    data = {'Site_ID': [],'Vendor': [],'Count_Visits':[], 'Average_Cash':[],'Average_Date':[],'Alert':[]}
    for i in range(input_data.shape[0]):
    ########################################Nokia################################################  
        if (input_data.iloc[i,1]=='NOKIA'):
            data['Site_ID'].append(input_data.iloc[i,0])
            data['Vendor'].append(input_data.iloc[i,1])
            ################################Count_Visits#############################
            y = [ x for x in mycol.find({"Site_ID" : str(input_data.iloc[i,0]), "Vendor": str(input_data.iloc[i,1])})]
            try:
                for x in mycol.aggregate(
                [{"$match":
                    {"Site_ID": str(y[0]["Site_ID"]), "Vendor": str(input_data.iloc[i,1]),
                    "Date": {"$gte":  pd.to_datetime(input_data.iloc[i,2]),"$lte": pd.to_datetime(input_data.iloc[i,3])}}},
                    {"$count": "Count_Visits"}]):
                    
                    data['Count_Visits'].append(str(x["Count_Visits"]))
            except:
                data['Count_Visits'].append("Not Found")
            ################################Average_Cash#############################
            try:
                df = pd.DataFrame(list(mycol.find({"Site_ID": str(y[0]["Site_ID"]), "Vendor": str(input_data.iloc[i,1]),
                    "Date": { "$gte": pd.to_datetime(input_data.iloc[i,2]), "$lte": pd.to_datetime(input_data.iloc[i,3])}})))
                Cash = []
                Date = []
                for i in range(df.shape[0]):
                    try:
                        common_cash = df['Cash'][i] - df['Cash'][i+1]
                        common_date = df['Date'][i] - df['Date'][i+1]
                        Cash.append(common_cash)
                        Date.append(common_date)
                    except:
                        break
                Average_Cash = sum(Cash)/(df.shape[0]-1)
                Average_Date = np.absolute(pd.Series(Date).dt.days.astype('int16').sum())/(df.shape[0]-1)
                Alert = round((Average_Date* df['Cash'][df.shape[0]-1])/Average_Cash)

                data['Average_Cash'].append(str(Average_Cash))
                data['Average_Date'].append(str(Average_Date))
                data['Alert'].append(str(Alert))
            except:
                data['Average_Cash'].append("Not Found")
                data['Average_Date'].append("Not Found")
                data['Alert'].append("Not Found")
    ########################################HUAWEI################################################
        if (input_data.iloc[i,1]=='HUAWEI'):
            data['Site_ID'].append(input_data.iloc[i,0])
            data['Vendor'].append(input_data.iloc[i,1])
            ################################Count_Visits#############################
            y = [ x for x in mycol.find({"Site_ID" : str(input_data.iloc[i,0]), "Vendor": str(input_data.iloc[i,1])})]
            try:
                for x in mycol.aggregate(
                [{"$match":
                    {"Site_ID": str(y[0]["Site_ID"]), "Vendor": str(input_data.iloc[i,1]),
                    "Date": {"$gte":  pd.to_datetime(input_data.iloc[i,2]),"$lte": pd.to_datetime(input_data.iloc[i,3])}}},
                    {"$count": "Count_Visits"}]):
                    data['Count_Visits'].append(str(x["Count_Visits"]))
            except:
                data['Count_Visits'].append("Not Found")
            ################################Average_Cash#############################
            try:
                df = pd.DataFrame(list(mycol.find({"Site_ID": str(y[0]["Site_ID"]), "Vendor": str(input_data.iloc[i,1]),
                    "Date": { "$gte": pd.to_datetime(input_data.iloc[i,2]), "$lte": pd.to_datetime(input_data.iloc[i,3])}})))
                Cash = []
                Date = []
                for i in range(df.shape[0]):
                    try:
                        common_cash = df['Cash'][i] - df['Cash'][i+1]
                        common_date = df['Date'][i] - df['Date'][i+1]
                        Cash.append(common_cash)
                        Date.append(common_date)
                    except:
                        break
                Average_Cash = sum(Cash)/(df.shape[0]-1)
                Average_Date = np.absolute(pd.Series(Date).dt.days.astype('int16').sum())/(df.shape[0]-1)
                Alert = round((Average_Date* df['Cash'][df.shape[0]-1])/Average_Cash)

                data['Average_Cash'].append(str(Average_Cash))
                data['Average_Date'].append(str(Average_Date))
                data['Alert'].append(str(Alert))
            except:
                data['Average_Cash'].append("Not Found")
                data['Average_Date'].append("Not Found")
                data['Alert'].append("Not Found")
            
    final = pd.DataFrame(data)
    response = StreamingResponse(io.StringIO(final.to_csv(index=False)), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=export.csv"

    return response


