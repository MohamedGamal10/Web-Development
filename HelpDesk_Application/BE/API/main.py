########################################Import Lib##################################################
from datetime import datetime
import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json
import psycopg2 as pg
import pandas.io.sql as psql
from typing import Optional
from pydantic import BaseModel
import jwt
from fastapi.encoders import jsonable_encoder
import sys
####################################################################################################
param_dic = {
    "host"      : "DB",
    "database"  : "postgres",
    "user"      : "postgres",
    "password"  : "postgres"
}

def connect(params_dic):
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = pg.connect(**params_dic)
    except (Exception, pg.DatabaseError) as error:
        print(error)
        sys.exit(1) 
    return conn
def single_insert(conn, insert_req):
    """ Execute a single INSERT request """
    cursor = conn.cursor()
    try:
        cursor.execute(insert_req)
        conn.commit()
    except (Exception, pg.DatabaseError) as error:
        print("Error: %s" % error)
        conn.rollback()
        cursor.close()
        return 1
    cursor.close()

###############################################App##################################################
app = FastAPI()

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
####################################################################################################

##########################################Search####################################################

@app.get("/search")
def search(msisdn:Optional[str] = '',imsi:Optional[str] = '',serial_number:Optional[str] = '',problem_case:Optional[str] = '',problem_input:Optional[str] = ''
,datefrom:Optional[str] = '',dateto:Optional[str] = '',action:Optional[str] = '',solving_comment:Optional[str] = ''
,other_comments:Optional[str] = ''):

    MSISDN = msisdn
    IMSI = imsi
    Serial_Number = serial_number
    Problem_Case = problem_case
    Problem_input = problem_input
    DateFrom = datefrom
    DateTo = dateto
    Action = action
    Solving_Comment = solving_comment
    Other_Comments = other_comments
    
    connection = pg.connect("host=DB port=5432 dbname=postgres user=postgres password=postgres")
    
    if (DateFrom=='') or (DateTo==''):
        df = psql.read_sql("""SELECT "ID", "MSISDN", "IMSI", "Serial_Number", "Problem_Case", "Problem_input", "Date", "Action", "Solving_Comment", "Other_Comments"
                            FROM public."Problem_db" WHERE 
                            "MSISDN" like '%{}%' and "IMSI" like '%{}%' and "Serial_Number" like '%{}%' and "Problem_Case" like '%{}%'
                            and "Problem_input" like '%{}%' and "Action" like '%{}%'
                            and "Solving_Comment" like '%{}%' and "Other_Comments" like '%{}%';""".format(
                            MSISDN,IMSI,Serial_Number,Problem_Case,Problem_input,Action,Solving_Comment,Other_Comments), connection)
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df['Date'] = df['Date'].dt.strftime('%m-%d-%Y')
        data = df.to_json(orient='records',force_ascii=False)
        data_json = json.loads(data)
        return data_json

    else:
        df = psql.read_sql("""SELECT "ID", "MSISDN", "IMSI", "Serial_Number", "Problem_Case", "Problem_input", "Date", "Action", "Solving_Comment", "Other_Comments"
                            FROM public."Problem_db" WHERE 
                            "MSISDN" like '%{}%' and "IMSI" like '%{}%' and "Serial_Number" like '%{}%' and "Problem_Case" like '%{}%'
                            and "Problem_input" like '%{}%' and "Date" BETWEEN  '{}' and '{}' and "Action" like '%{}%'
                            and "Solving_Comment" like '%{}%' and "Other_Comments" like '%{}%';""".format(
                            MSISDN,IMSI,Serial_Number,Problem_Case,Problem_input,DateFrom,DateTo,Action,Solving_Comment,Other_Comments), connection)
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df['Date'] = df['Date'].dt.strftime('%m-%d-%Y')
        data = df.to_json(orient='records',force_ascii=False)
        data_json = json.loads(data)
        return data_json

########################################################################################################

########################################login############################################################
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
    connection = pg.connect("host=DB port=5432 dbname=postgres user=postgres password=postgres")

    try:
        df = psql.read_sql("""SELECT "UserName", "Password" FROM public."Users_db" WHERE "UserName" ='{}' and "Password" ='{}';""".format(data['username'],data['password']), connection)
        user['username'] = df['UserName'].iloc[0]
        user['password'] = df['Password'].iloc[0]
    except:
        user['username'] = ""
        user['password'] = ""

    if data['username']== user['username'] and data['password']== user['password']:

        encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt}

    else:
        return {"message":"login failed"}

########################################################################################################

################################################File Upload#############################################
@app.post("/uploadfile")
async def check(file: UploadFile = File(...)):
    files = await file.read()
    df = pd.read_excel(files)

    # Connecting to the database
    conn = connect(param_dic)
    # Inserting each row
    try:
        for i in df.index:
            MSISDN = df['MSISDN'][i]
            IMSI = df['IMSI'][i]
            Serial_Number = str(df['Serial Number'][i]).replace("'","’")
            Problem_Case = str(df['Problem Case'][i]).replace("'","’")
            Problem_input = str(df['Problem input'][i]).replace("'","’")
            Date = df['Date'][i]
            Action = str(df['Action'][i]).replace("'","’")
            solving_comment = str(df['solving comment'][i]).replace("'","’")
            Other_comments = str(df['Other comments'][i]).replace("'","’")

            query = """INSERT INTO public."Problem_db"("MSISDN", "IMSI", "Serial_Number" ,"Problem_Case", "Problem_input", "Date", "Action",
                    "Solving_Comment", "Other_Comments") 
                    VALUES ('%s', '%s', '%s', '%s', '%s', '%s','%s', '%s', '%s');"""%(MSISDN,IMSI,Serial_Number,Problem_Case,Problem_input,Date,
                    Action,solving_comment,Other_comments)
            single_insert(conn, query)
        # Close the connection
        conn.close()

        return {"Added Successfully"}
    except Exception as e:
        return {"{}".format(e)}

############################################################################################################

################################################Select######################################################
class SelectItem(BaseModel):
    msisdn : str = ''
    imsi : str = ''
    serial_number : str = ''
    problem_case : str = ''
    problem_input : str = ''
    datefrom : str = ''
    dateto : str = ''
    action : str = ''
    solving_comment : str = ''
    other_comments : str = ''

@app.post("/select")
async def select(selectItem:SelectItem):
    data = jsonable_encoder(selectItem)
    connection = pg.connect("host=DB port=5432 dbname=postgres user=postgres password=postgres")

    if (data['datefrom']=='') or (data['dateto']==''):
        df = psql.read_sql("""SELECT "ID", "MSISDN", "IMSI","Serial_Number","Problem_Case", "Problem_input", "Date", "Action", "Solving_Comment", "Other_Comments"
                            FROM public."Problem_db" WHERE 
                            "MSISDN" like '%{}%' and "IMSI" like '%{}%' and "Serial_Number" like '%{}%' and "Problem_Case" like '%{}%'
                            and "Problem_input" like '%{}%' and "Action" like '%{}%'
                            and "Solving_Comment" like '%{}%' and "Other_Comments" like '%{}%';""".format(
                            data['msisdn'], data['imsi'],data['serial_number'],data['problem_case'],data['problem_input'],data['action'],data['solving_comment'],data['other_comments']), connection)
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df['Date'] = df['Date'].dt.strftime('%m-%d-%Y')
        data = df.to_json(orient='records',force_ascii=False)
        data_json = json.loads(data)
        
        return data_json

    else:
        df = psql.read_sql("""SELECT "ID", "MSISDN", "IMSI","Serial_Number","Problem_Case", "Problem_input", "Date", "Action", "Solving_Comment", "Other_Comments"
                            FROM public."Problem_db" WHERE 
                            "MSISDN" like '%{}%' and "IMSI" like '%{}%' and "Serial_Number" like '%{}%' and "Problem_Case" like '%{}%'
                            and "Problem_input" like '%{}%' and "Date" BETWEEN  '{}' and '{}' and "Action" like '%{}%'
                            and "Solving_Comment" like '%{}%' and "Other_Comments" like '%{}%';""".format(
                           data['msisdn'], data['imsi'],data['serial_number'],data['problem_case'],data['problem_input'],data['datefrom'],data['dateto'],data['action'],data['solving_comment'],data['other_comments']), connection)
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df['Date'] = df['Date'].dt.strftime('%m-%d-%Y')
        data = df.to_json(orient='records',force_ascii=False)
        data_json = json.loads(data)
        return data_json

################################################################################################################

######################################################Delete####################################################
@app.delete("/delete/{request_id}")
def delete (request_id:int):
    connection = pg.connect("host=DB port=5432 dbname=postgres user=postgres password=postgres")
    df = psql.read_sql("""SELECT "ID" FROM public."Problem_db" WHERE "ID" = {} ;""".format(request_id), connection)
    try:
        
        conn=pg.connect(
        database="postgres",
        user="postgres",
        password="postgres",
        host="DB",
        port="5432"
    )
        cursor = conn.cursor()
        sql = """DELETE FROM public."Problem_db" WHERE "ID" = {};""".format(df['ID'].iloc[0])
        cursor.execute(sql)
        conn.commit()
        conn.close()
        return {"Deleted Successfully"}
    except:
        return {"ID Not Found"}

################################################################################################################