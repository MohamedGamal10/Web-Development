########################################Import Lib##################################################
from cProfile import label
from datetime import datetime
from turtle import st, title, width
import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.responses import FileResponse
import io
import pandas as pd
import json
import psycopg2 as pg
import plotly.offline as pyo
import plotly.graph_objs as go
import pandas.io.sql as psql
import plotly.express as px
from typing import Optional
from pydantic import BaseModel
import jwt
from fastapi.encoders import jsonable_encoder
import sys
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
from sklearn.cluster import KMeans
from sklearn import mixture
import pandas as pd
from prophet import Prophet
from prophet.plot import plot_plotly, plot_components_plotly
import warnings
warnings.filterwarnings("ignore")
##################################################################################################
DB_IP="localhost"
DB_Port = "5432"
API_IP = "localhost"
API_Port="8000"

###############################################DB##################################################
param_dic = {
    "host"      : DB_IP,
    "port"      : DB_Port,
    "database"  : "postgres",
    "user"      : "postgres",
    "password"  : "1234"
}

def connect(params_dic):
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
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
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))

    try:
        df = psql.read_sql("""SELECT * FROM public."Users" WHERE "Username" ='{}' and "Password" ='{}';""".format(data['username'],data['password']), connection)
        user['username'] = df['Username'].iloc[0]
        user['password'] = df['Password'].iloc[0]
        user['role']     = df['Role'].tolist()
    except:
        user['username'] = ""
        user['password'] = ""
        user['role']     = ""

    if data['username']== user['username'] and data['password']== user['password']:

        encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt , "role":user['role']}

    else:
        return {"message":"login failed"}

########################################################################################################

################################################insert_user#############################################
class creationitem(BaseModel):
    email   : str
    username: str
    password: str
    role    : str

@app.post("/insert_user")
def insert_user(creationitem:creationitem):
    data = jsonable_encoder(creationitem)
    conn = connect(param_dic)
    query = """INSERT INTO public."Users"(
	                    "Email", "Username", "Password", "Role")
	                    VALUES ('%s', '%s', '%s', '%s');"""%(str(data['email']), str(data['username']),
                         str(data['password']), str(data['role']))
    single_insert(conn, query)
    # Close the connection
    conn.close()

    return {"message":"Done"}

######################################################################################################

#########################################################get_user#####################################
class username(BaseModel):
    email : str
@app.post("/get_user")
def get_user(username:username):
    data = jsonable_encoder(username)

    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT * FROM public."Users" WHERE "Email" = '{}' """.format(data['email']), connection)

    final_data = df.to_json(orient='records',force_ascii=False)
    data_json = json.loads(final_data)
    return data_json

######################################################delete_user####################################
@app.delete("/delete_user/{request_id}")
def delete_user(request_id:int):

    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT "ID" FROM public."Users" WHERE "ID" = {} ;""".format(request_id), connection)
    try:
        
        conn=pg.connect(
        database="postgres",
        user="postgres",
        password="1234",
        host=DB_IP,
        port=DB_Port
    )
        cursor = conn.cursor()
        sql = """DELETE FROM public."Users" WHERE "ID" = {};""".format(df['ID'].iloc[0])
        cursor.execute(sql)
        conn.commit()
        conn.close()
        return {"Message":"Deleted Successfully"}
    except:
        return {"Message":"ID Not Found"}



########################################################################################################

################################################geo######################################################
class SectorItem(BaseModel):
    sector_input: str
@app.post("/sites-geo_down")
def dash_geo(sectorItem:SectorItem):
    data = jsonable_encoder(sectorItem)
    data['sector_input']
    down_df = pd.read_excel("Files/Dashboard/Down Sites Dashboard 0900.xlsx",sheet_name='Current Down Sites')
    df  = pd.read_excel("Files/Dashboard/Down Sites Dashboard 0900.xlsx",sheet_name='Site Status')

    down = down_df[["Site ID","Sector"]]
    down.rename(columns={"Site ID": "Site_ID"},inplace=True)
    down['id'] = down["Site_ID"].str.lower()
    #geo = df[["Site Name","Latitude","Longitude"]]
    geo = df[["Site Name","Lat","Long"]]
    geo.rename(columns={"Site Name": "Site_ID"},inplace=True)
    geo['id'] = geo["Site_ID"].str.lower()

    merge=pd.merge(down,geo,on='id')

    merge['Sector'].replace('\s+', '_', regex=True,inplace=True)
    if(str(data['sector_input'])=='all'):
       # merge["Latitude"].replace('N','',regex=True,inplace=True)
       # merge["Latitude"].replace('E','',regex=True,inplace=True)
       # merge["Latitude"].replace('°','',regex=True,inplace=True)
       # merge["Latitude"].replace(u"\uFFFD",'',regex=True,inplace=True)
       # merge["Latitude"].replace(u"\u00A0",'',regex=True,inplace=True)
       # merge["Latitude"].fillna("31.846299",inplace=True)
        merge["Lat"].fillna("31.846299",inplace=True)
       # merge["Longitude"].replace('N','',regex=True,inplace=True)
       # merge["Longitude"].replace('E','',regex=True,inplace=True)
       # merge["Longitude"].replace('°','',regex=True,inplace=True)
       # merge["Longitude"].replace(u"\uFFFD",'',regex=True,inplace=True)
       # merge["Longitude"].replace(u"\u00A0",'',regex=True,inplace=True)
       # merge["Longitude"].fillna("31.038530",inplace=True)
        merge["Long"].fillna("31.038530",inplace=True)
        #merge = merge[["Site_ID_x","Longitude","Latitude"]]
        merge = merge[["Site_ID_x","Long","Lat"]]
        data = merge.to_json(orient='records',force_ascii=False)
        data_json = json.loads(data)
    else:
        merge = merge[merge['Sector']== str(data['sector_input'])]
       # merge["Latitude"].replace('N','',regex=True,inplace=True)
       # merge["Latitude"].replace('E','',regex=True,inplace=True)
       # merge["Latitude"].replace('°','',regex=True,inplace=True)
       # merge["Latitude"].replace(u"\uFFFD",'',regex=True,inplace=True)
       # merge["Latitude"].replace(u"\u00A0",'',regex=True,inplace=True)
       # merge["Latitude"].fillna("31.846299",inplace=True)
        merge["Lat"].fillna("31.846299",inplace=True)
       # merge["Longitude"].replace('N','',regex=True,inplace=True)
       # merge["Longitude"].replace('E','',regex=True,inplace=True)
       # merge["Longitude"].replace('°','',regex=True,inplace=True)
       # merge["Longitude"].replace(u"\uFFFD",'',regex=True,inplace=True)
       # merge["Longitude"].replace(u"\u00A0",'',regex=True,inplace=True)
       # merge["Longitude"].fillna("31.038530",inplace=True)
        merge["Long"].fillna("31.038530",inplace=True)
        #merge = merge[["Site_ID_x","Longitude","Latitude"]]
        merge = merge[["Site_ID_x","Long","Lat"]]
        data = merge.to_json(orient='records',force_ascii=False)
        data_json = json.loads(data)
    return data_json
################################################################################################################

#############################################Counts############################################################
@app.post("/counts")
def counts(sectorItem:SectorItem):
    data = jsonable_encoder(sectorItem)
    data['sector_input']
    df  = pd.read_excel("Files/Dashboard/Down Sites Dashboard 0900.xlsx",sheet_name='Current Down Sites')
    df = df[["Site ID","Owner","Vendor","Sector"]]
    df.rename(columns={"Site ID": "Site_ID"},inplace=True)
    df['Sector'].replace('\s+', '_', regex=True,inplace=True)
    
    if(str(data['sector_input'])=='all'):
        df_fm = df[df['Owner']=='FM']
        df_rot = df[df['Owner']=='ROT']
    else:
        df = df[df["Sector"]==str(data['sector_input'])]
        df_fm = df[df['Owner']=='FM']
        df_rot = df[df['Owner']=='ROT']

    
    data_dict = {'Total_Sites': df.shape[0],
                'Total_Sites_HUAWEI': df[df['Vendor']=='HUAWEI'].shape[0],
                'Total_Sites_NOKIA': df[df['Vendor']=='NOKIA'].shape[0],
                'Total_Sites_FM':df_fm.shape[0],
                'Total_Sites_FM_HUAWEI':df_fm[df_fm['Vendor']=='HUAWEI'].shape[0],
                'Total_Sites_FM_NOKIA':df_fm[df_fm['Vendor']=='NOKIA'].shape[0],
                'Total_Sites_ROT':df_rot.shape[0],
                'Total_Sites_ROT_HUAWEI':df_rot[df_rot['Vendor']=='HUAWEI'].shape[0],
                'Total_Sites_ROT_NOKIA':df_rot[df_rot['Vendor']=='NOKIA'].shape[0]}
    

    data_json = json.loads(json.dumps(data_dict))
    return data_json  



################################################################################################################
################################################################################################################
class SiteItem(BaseModel):
    Site_Name_input: str

@app.post("/site")
def info(siteitem:SiteItem):
    data = jsonable_encoder(siteitem)
    data['Site_Name_input']
    df  = pd.read_excel("Files/Dashboard/Site Status Dashboard 23_May_2022.xlsx")
    geo = df[["Site Name","Status","CI Subcategory","Site Type","TX Type",
                "Power Type","Latitude","Longitude","Address","Vendor","Sector","Locking Date"
                ,"VIP","Sharing Operator","Sharing Type","Hosting type"]]

    geo.rename(columns={"Site Name": "Site_Name","Site Type":"Site_Type",
                        "TX Type":"TX_Type","Power Type":"Power_Type",
                        "Locking Date":"Locking_Date","Sharing Operator":"Sharing_Operator", "Sharing Type":"Sharing_Type",
                        "Hosting type":"Hosting_type","CI Subcategory":"Subcategory"},inplace=True)

    geo['Locking_Date'] = geo['Locking_Date'].apply(lambda x:str(x))

    
    geo = geo[geo["Site_Name"]==str(data['Site_Name_input'])]
    geo["Latitude"].replace('N','',regex=True,inplace=True)
    geo["Latitude"].replace('E','',regex=True,inplace=True)
    geo["Latitude"].replace('°','',regex=True,inplace=True)
    geo["Latitude"].replace(u"\uFFFD",'',regex=True,inplace=True)
    geo["Latitude"].replace(u"\u00A0",'',regex=True,inplace=True)
    geo["Longitude"].replace('N','',regex=True,inplace=True)
    geo["Longitude"].replace('E','',regex=True,inplace=True)
    geo["Longitude"].replace('°','',regex=True,inplace=True)
    geo["Longitude"].replace(u"\uFFFD",'',regex=True,inplace=True)
    geo["Longitude"].replace(u"\u00A0",'',regex=True,inplace=True)

    #Change
    try:
        df_change  = pd.read_excel("Files/Change/Change.xlsx")
        df_change = df_change[['Affected CI','Status']]
        values = pd.Series(df_change[df_change['Affected CI']==str(data['Site_Name_input'])].iloc[:,1].unique()).isin(['IMPL','ACC_CAT'])
        values.loc[values == True].index[0]
        geo['Change']='yes'
    except:
        geo['Change']='No'

    #SIR
    try:
        df_sir  = pd.read_excel("Files/SIR/SIR.xlsx")
        df_sir = df_sir[['Site Name','Status']]
        values = pd.Series(df_sir[df_sir['Site Name']==str(data['Site_Name_input'])].iloc[:,1].unique()).isin(['INPRG','NEW'])
        values.loc[values == True].index[0]
        geo['SIR']='yes'
    except:
        geo['SIR']='No'

    data = geo.to_json(orient='records',force_ascii=False)
    data_json = json.loads(data)
    return data_json

################################################################################################################

################################################Network Kpi######################################################
class KPI(BaseModel):
    KPI: str

@app.post("/network-kpi")
def NetKpiViz(KPI:KPI):
    data = jsonable_encoder(KPI)
    df  = pd.read_csv("Files/NetworkKPI/NetworkKPI.csv")
    #df.drop(['Whole Network','Integrity'],axis=1,inplace=True)
    #data = []
    #for i in df.columns[1:]:
    #    trace = go.Scatter(x=pd.to_datetime(df['Time']),y=df[i],name=i,mode='markers+lines')
    #    data.append(trace)
    #layout = go.Layout(title='Whole Network KPI', xaxis ={'title':'Time'},yaxis={'title':'KPI'},hovermode='x unified',width=1140, height=600)
    #fig = go.Figure(data=data, layout=layout)
    #fig.update_xaxes(categoryorder='category ascending')
    #return json.loads(fig.to_json())
    snap = df[['Time', str(data['KPI'])]]
    snap['Time'] = pd.to_datetime(snap['Time'])
    snap.rename(columns = {'Time':'ds', str(data['KPI']):'y'}, inplace = True)
    m = Prophet()
    m.fit(snap)
    future = m.make_future_dataframe(periods=365, freq='H')
    forecast = m.predict(future)
    fig = plot_plotly(m, forecast, xlabel='Time', ylabel= str(data['KPI']))
    return json.loads(fig.to_json())



@app.post("/network-kpi-components")
def NetKpiViz(KPI:KPI):
    data = jsonable_encoder(KPI)
    df  = pd.read_csv("Files/NetworkKPI/NetworkKPI.csv")
    snap = df[['Time', str(data['KPI'])]]
    snap['Time'] = pd.to_datetime(snap['Time'])
    snap.rename(columns = {'Time':'ds', str(data['KPI']):'y'}, inplace = True)
    m = Prophet()
    m.fit(snap)
    future = m.make_future_dataframe(periods=365, freq='H')
    forecast = m.predict(future)
    fig = plot_components_plotly(m, forecast)
    return json.loads(fig.to_json())
    

################################################################################################################

################################################Site Alarms Viz######################################################
@app.post("/site-alarms-viz")
def SiteAlarmsViz(siteitem:SiteItem):
    Site_Name_input = jsonable_encoder(siteitem)
    df  = pd.read_parquet("Files/SitesAlarms/Alarms_data_processed.parquet")
    snap = df[df['Alarm Source']==str(Site_Name_input['Site_Name_input'])]
    data = []
    for i in snap['Name'].unique():
        snap2 = snap[snap['Name']==i]
        trace = go.Scatter(x=pd.to_datetime(snap2['Occurred On (NT)']),y=snap2['Name'],name=i,mode='markers')
        data.append(trace)
    layout = go.Layout(title='Alarms per time for {}'.format(str(Site_Name_input['Site_Name_input'])), xaxis ={'title':'time'},yaxis={'title':'Alarm'}, hovermode = 'x unified',width=1140,height=600)
    fig = go.Figure(data=data, layout=layout)
    fig.update_xaxes(categoryorder='category ascending')
    return json.loads(fig.to_json())

################################################################################################################

################################################Site Alarms Duration################################################
@app.post("/site-alarms-duration")
def SiteAlarmsDue(siteitem:SiteItem):
    Site_Name_input = jsonable_encoder(siteitem)
    df  = pd.read_parquet("Files/SitesAlarms/Alarms_data_processed.parquet")
    snap = df[df['Alarm Source']==str(Site_Name_input['Site_Name_input'])]
    fig = px.timeline(snap, x_start='Occurred On (NT)', x_end='Cleared On (NT)', y="Name" ,width=1140,height=600, title="Alarms Durations")
    return json.loads(fig.to_json())


################################################################################################################

################################################Site Alarms MBA######################################################
@app.post("/site-mba")
def SiteMBA(siteitem:SiteItem):
    Site_Name_input = jsonable_encoder(siteitem)
    df  = pd.read_parquet("Files/SitesAlarms/New_Alarms_data_processed.parquet")

    # Encode Function
    def encode(x):
        if x <=0:
            return 0
        if x >=1:
            return 1
    
    snap = df[df['Alarm Source']==str(Site_Name_input['Site_Name_input'])]
    snap['q'] = 1
    snap = snap[['Name','Alarm Source','Occurred On (NT)','q']]
    basket = snap.groupby(['Alarm Source','Occurred On (NT)','Name'])['q'].sum().unstack().reset_index().fillna(0).set_index('Occurred On (NT)')
    basket.drop(columns=['Alarm Source'],inplace=True)
    basket_encode = basket.applymap(encode)
    basket_plus = basket_encode[(basket_encode>0).sum(axis=1)>=2]
    freq_pattern = apriori(basket_plus,min_support=0.03,use_colnames=True).sort_values('support',ascending=False).reset_index(drop=True)
    freq_pattern['len'] = freq_pattern['itemsets'].apply(lambda x: len(x))
    freq_pattern['support'] = (freq_pattern['support']*100).apply(lambda x:round(x,2))
    data = freq_pattern[freq_pattern['len']>1].head(5)
    data['itemsets'] = data['itemsets'].apply(lambda x: ', '.join(list(x))).astype("unicode")
    data_json_process = data.to_json(orient='records',force_ascii=False)
    data_json = json.loads(data_json_process)
    return data_json


#####################################################################################################################

################################################Select WE_Incident######################################################
class SelectItemIncedient(BaseModel):
    Event_Date               : str = ''
    Event_End_Date           : str = ''
    IR_Slogan                : str = ''
    Area                     : str = ''
    Site                     : str = ''
    Node_ID                  : str = ''
    Impact                   : str = ''
    Category                 : str = ''
    Reason                   : str = ''
    CR_Violation             : str = ''

@app.post("/incident_select")
async def select(SelectItemIncedient:SelectItemIncedient):
    data = jsonable_encoder(SelectItemIncedient)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT * FROM public.we_incident""", connection)
    df['Event_start_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['Event_Time'].apply(lambda x:str(x)), utc=True)
    df['Event_end_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_End_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['End_Time'].apply(lambda x:str(x)), utc=True)
    if (data['Event_Date'] == '') or (data['Event_End_Date'] == ''):
        snap = df[ (df['IR_Slogan'].str.contains(str(data['IR_Slogan']),case=False, na=False))]
        snap1 = snap[snap['Area'].str.contains(data['Area'],case=False, na=False)]
        snap2 = snap1[snap1['Site'].str.contains(data['Site'],case=False, na=False)]
        snap3 = snap2[snap2['Node_ID'].str.contains(data['Node_ID'],case=False, na=False)]
        snap4 = snap3[snap3['Impact'].str.contains(data['Impact'],case=False, na=False)]
        snap5 = snap4[snap4['Category'].str.contains(data['Category'],case=False, na=False)]
        snap6 = snap5[snap5['Reason'].str.contains(data['Reason'],case=False, na=False)]
        snap7 = snap6[snap6['CR_Violation'].str.contains(data['CR_Violation'],case=False, na=False)]
        data = snap7.to_json(orient='records',force_ascii=False)


    else:
        snap = df[(df['Event_start_date_time'] > data['Event_Date']) & (df['Event_end_date_time'] <= data['Event_End_Date'])]
        snap1 = snap[ (snap['IR_Slogan'].str.contains(str(data['IR_Slogan']),case=False, na=False))]
        snap2 = snap1[snap1['Area'].str.contains(data['Area'],case=False, na=False)]
        snap3 = snap2[snap2['Site'].str.contains(data['Site'],case=False, na=False)]
        snap4 = snap3[snap3['Node_ID'].str.contains(data['Node_ID'],case=False, na=False)]
        snap5 = snap4[snap4['Impact'].str.contains(data['Impact'],case=False, na=False)]
        snap6 = snap5[snap5['Category'].str.contains(data['Category'],case=False, na=False)]
        snap7 = snap6[snap6['Reason'].str.contains(data['Reason'],case=False, na=False)]
        snap8 = snap7[snap7['CR_Violation'].str.contains(data['CR_Violation'],case=False, na=False)]
        data = snap8.to_json(orient='records',force_ascii=False)
    data_json = json.loads(data)
    return data_json
#######################################################################################################################

################################################Download WE_Incident######################################################
class IdItemIncedient(BaseModel):
    Id : int = 0

@app.post("/incedient_csv")
async def get_csv(IdItemIncedient:IdItemIncedient):
    data = jsonable_encoder(IdItemIncedient)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT * FROM public.we_incident WHERE "Id" = {}""".format(data['Id']), connection)
    response = StreamingResponse(io.StringIO(df.to_csv(index=False)), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=export.csv"

    return response

#######################################################################################################################

################################################Delete WE_Incident######################################################
@app.delete("/delete_incident/{request_id}")
def delete (request_id:int):
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT "Id" FROM we_incident WHERE "Id" = {} ;""".format(request_id), connection)
    try:
        
        conn=pg.connect(
        database="postgres",
        user="postgres",
        password="1234",
        host=DB_IP,
        port=DB_Port
    )
        cursor = conn.cursor()
        sql = """DELETE FROM we_incident WHERE "Id" = {};""".format(df['Id'].iloc[0])
        cursor.execute(sql)
        conn.commit()
        conn.close()
        return {"Deleted Successfully"}
    except:
        return {"ID Not Found"}

###################################################################################################################################

#######################################################################################################################

################################################Insert WE_Incident######################################################
@app.post("/insert_we_incident")
async def insert_we_incident(file: UploadFile = File(...)):
    files = await file.read()
    df = pd.read_excel(files)

    # Connecting to the database
    conn = connect(param_dic)
    # Inserting each row
    try:
        for i in df.index:
            Wk                     = df['Wk'][i]
            IR                     = df['IR'][i]
            Event_Date             = df['Event_Date'][i]
            Event_Time             = df['Event_Time'][i] 
            Outage_Start           = df['Outage_Start'][i]
            Event_End_Date         = df['Event_End_Date'][i]
            End_Time               = df['End_Time'][i]
            IR_Slogan              = df['IR_Slogan'][i]
            Area                   = df['Area'][i]
            Site                   = df['Site'][i]
            Node_ID                = df['Node_ID'][i]
            Impact                 = df['Impact'][i]
            Category               = df['Category'][i]
            Reason                 = df['Reason'][i]
            CR_Violation           = df['CR_Violation'][i]
            Power_Alarm_Appearance = df['Power_Alarm_Appearance'][i]
            Power_Source           = df['Power_Source'][i]
            Duration               = df['Duration'][i]
            Lost_Hours             = df['Lost_Hours'][i]
            Affected_Nodes         = df['Affected_Nodes'][i]
            Other_Info             = df['Other_Info'][i]
            SLA                    = df['SLA'][i]
            Comments               = df['Comments'][i]
            Number_Of_Sites        = df['Number_Of_Sites'][i]
            Repeatative            = df['Repeatative'][i]
            FM_Comments            = df['FM_Comments'][i]
            Rootcause              = df['Rootcause'][i]
            Workaround             = df['Workaround'][i]
            IM                     = df['IM'][i]
            Associated_Complaints  = df['Associated_Complaints'][i]
            Sent_To_Customer       = df['Sent_To_Customer'][i]
            IM_Handled             = df['IM_Handled'][i]


            query = """INSERT INTO public.we_incident(
	                    "Wk", "IR", "Event_Date", "Event_Time", "Outage_Start", "Event_End_Date", 
                        "End_Time", "IR_Slogan", "Area", "Site", "Node_ID", "Impact", "Category", 
                        "Reason", "CR_Violation", "Power_Alarm_Appearance", "Power_Source", "Duration",
                         "Lost_Hours", "Affected_Nodes", "Other_Info", "SLA", "Comments", "Number_Of_Sites",
                          "Repeatative", "FM_Comments", "Rootcause", "Workaround", "IM","Associated_Complaints", "Sent_To_Customer", "IM_Handled")
	                    VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s','%s', '%s',
                         '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s',
                          '%s', '%s', '%s', '%s','%s');"""%(Wk, IR, Event_Date, Event_Time, Outage_Start, Event_End_Date, 
                          End_Time, IR_Slogan, Area, Site, Node_ID, Impact, Category, Reason, CR_Violation, Power_Alarm_Appearance,
                          Power_Source, Duration, Lost_Hours, Affected_Nodes, Other_Info, SLA, Comments, Number_Of_Sites,
                          Repeatative, FM_Comments, Rootcause, Workaround, IM, Associated_Complaints, Sent_To_Customer, IM_Handled)
            single_insert(conn, query)
        # Close the connection
        conn.close()

        return {"Message":"Added Successfully"}
    except Exception as e:
        return {"Message":"{}".format(e)}

###################################################################################################################################


################################################Select Etisalat_incident_Case######################################################
class Etisalat_incident_Case(BaseModel):
    Date                        : str = ''
    Case                        : str = ''
    Description                 : str = ''
    Etisalat_Notification_Time  : str = ''
    Etisalat_Feedback           : str = ''
    Etisalat_Response_Time      : str = ''
    Resolution_Time             : str = ''
    Violated                    : str = ''
    Comments                    : str = ''

@app.post("/etisalat_incident_cases_select")
async def select(Etisalat_incident_Case:Etisalat_incident_Case):
    data = jsonable_encoder(Etisalat_incident_Case)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT * FROM public."Etisalat_incident_Cases" """, connection)
    df['Etisalat_Notification_Time'] = pd.to_datetime(df['Etisalat_Notification_Time'],errors='coerce')
    df['Resolution_Time'] = pd.to_datetime(df['Resolution_Time'],errors='coerce')
    df['Date'] = pd.to_datetime(df['Date'],errors='coerce')
    if (data['Etisalat_Notification_Time'] == '') or (data['Resolution_Time'] == ''):
        snap = df[ (df['Case'].str.contains(str(data['Case']),case=False, na=False))]
        snap1 = snap[ (snap['Description'].str.contains(str(data['Description']),case=False, na=False))]
        snap2 = snap1[ (snap1['Etisalat_Feedback'].str.contains(str(data['Etisalat_Feedback']),case=False, na=False))]
        snap3 = snap2[ (snap2['Violated'].str.contains(str(data['Violated']),case=False, na=False))]
        snap4 = snap3[ (snap3['Comments'].str.contains(str(data['Comments']),case=False, na=False))]
        snap4['Date'] = snap4['Date'].apply(lambda x:str(x))
        snap4['Etisalat_Notification_Time'] = snap4['Etisalat_Notification_Time'].apply(lambda x:str(x))
        snap4['Resolution_Time'] = snap4['Resolution_Time'].apply(lambda x:str(x))
        data = snap4.to_json(orient='records',force_ascii=False)


    else:
        snap = df[(df['Etisalat_Notification_Time'] > data['Etisalat_Notification_Time']) & (df['Resolution_Time'] <= data['Resolution_Time'])]
        snap1 = snap[ (snap['Case'].str.contains(str(data['Case']),case=False, na=False))]
        snap2 = snap1[ (snap1['Description'].str.contains(str(data['Description']),case=False, na=False))]
        snap3 = snap2[ (snap2['Etisalat_Feedback'].str.contains(str(data['Etisalat_Feedback']),case=False, na=False))]
        snap4 = snap3[ (snap3['Violated'].str.contains(str(data['Violated']),case=False, na=False))]
        snap5 = snap4[ (snap4['Comments'].str.contains(str(data['Comments']),case=False, na=False))]
        snap5['Date'] = snap5['Date'].apply(lambda x:str(x))
        snap5['Etisalat_Notification_Time'] = snap5['Etisalat_Notification_Time'].apply(lambda x:str(x))
        snap5['Resolution_Time'] = snap5['Resolution_Time'].apply(lambda x:str(x))
        data = snap5.to_json(orient='records',force_ascii=False)
    
    data_json = json.loads(data)
    return data_json
######################################################################################################################################

################################################Download Etisalat_Incident_Cases######################################################
class IdItemIncedient_Etisalat(BaseModel):
    Id : int = 0

@app.post("/incedient_csv_Etisalat_Cases")
async def get_csv(IdItemIncedient_Etisalat:IdItemIncedient_Etisalat):
    data = jsonable_encoder(IdItemIncedient_Etisalat)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT * FROM public."Etisalat_incident_Cases" WHERE "Id" = {}""".format(data['Id']), connection)
    response = StreamingResponse(io.StringIO(df.to_csv(index=False)), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=export.csv"

    return response

####################################################################################################################################

################################################Delete Etisalat_Incident_Cases######################################################
@app.delete("/delete_etisalat_incident_Cases/{request_id}")
def delete (request_id:int):
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT "Id" FROM "Etisalat_incident_Cases" WHERE "Id" = {} ;""".format(request_id), connection)
    try:
        
        conn=pg.connect(
        database="postgres",
        user="postgres",
        password="1234",
        host=DB_IP,
        port=DB_Port
    )
        cursor = conn.cursor()
        sql = """DELETE FROM "Etisalat_incident_Cases" WHERE "Id" = {};""".format(df['Id'].iloc[0])
        cursor.execute(sql)
        conn.commit()
        conn.close()
        return {"Deleted Successfully"}
    except:
        return {"ID Not Found"}

###################################################################################################################################

################################################Insert Etisalat_Incident######################################################
@app.post("/insert_etisalat_incident")
async def insert_etisalat_incident(file: UploadFile = File(...)):
    files = await file.read()
    df = pd.read_excel(files)

    # Connecting to the database
    conn = connect(param_dic)
    # Inserting each row
    try:
        for i in df.index:
            Date                       = df['Date'][i]
            Case                       = df['Case'][i]
            Description                = df['Description'][i]
            Etisalat_Notification_Time = df['Etisalat_Notification_Time'][i]
            Etisalat_Feedback          = df['Etisalat_Feedback'][i]
            Etisalat_Response_Time     = df['Etisalat_Response_Time'][i]
            Resolution_Time            = df['Resolution_Time'][i]
            Violated                   = df['Violated'][i]
            Comments                   = df['Comments'][i]
            Associated_Complaints      = df['Associated_Complaints'][i]

            query = """INSERT INTO "Etisalat_incident_Cases" (
                "Date","Case","Description","Etisalat_Notification_Time",
                "Etisalat_Feedback","Etisalat_Response_Time","Resolution_Time",
                "Violated","Comments","Associated_Complaints") VALUES ('{}','{}','{}','{}','{}','{}','{}'
                ,'{}','{}','{}');""".format(Date,Case,Description,Etisalat_Notification_Time,
                Etisalat_Feedback,Etisalat_Response_Time,Resolution_Time,Violated,Comments,Associated_Complaints)
            
            single_insert(conn, query)
        # Close the connection
        conn.close()

        return {"Message":"Added Successfully"}
    except Exception as e:
        return {"Message":"{}".format(e)}

###################################################################################################################################

################################################WE_Incedient_Event_counts######################################################
@app.get("/we_incident_event_counts")
def we_incident_event_counts():
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT *FROM public.we_incident""", connection)
    df['Event_start_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['Event_Time'].apply(lambda x:str(x)), utc=True)
    df['Event_end_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_End_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['End_Time'].apply(lambda x:str(x)), utc=True)
    fig = px.histogram(df, x="Event_start_date_time", title="Event Counts",width=1200, height=350)
    fig.update_layout(bargap=0.2)
    return json.loads(fig.to_json())

#################################################################################################################################

############################################################WE_Incedient_event_per_quarter####################################################

class Quarter(BaseModel):
    Quarter: list
    year : int

@app.post("/we_incedient_event_per_quarter")
def event_per_quarter(Quarter:Quarter):
    data = jsonable_encoder(Quarter)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT *FROM public.we_incident""", connection)
    df['Event_start_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['Event_Time'].apply(lambda x:str(x)), utc=True)
    df['Event_end_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_End_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['End_Time'].apply(lambda x:str(x)), utc=True)
    snap = df[ (df['Event_start_date_time'].dt.year==data["year"]) & (df['Event_start_date_time'].dt.month.isin(list(data["Quarter"])))]
    fig = px.timeline(snap, x_start='Event_start_date_time', x_end='Event_end_date_time', y="IR_Slogan",width=1200, height=500, title="IR Slogan")
    return json.loads(fig.to_json())

#################################################################################################################################

############################################################WE_Incedient_Area####################################################

@app.post("/we_incedient_area")
def we_incedient_area(Quarter:Quarter):
    data = jsonable_encoder(Quarter)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT *FROM public.we_incident""", connection)
    df['Event_start_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['Event_Time'].apply(lambda x:str(x)), utc=True)
    df['Event_end_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_End_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['End_Time'].apply(lambda x:str(x)), utc=True)
    snap = df[ (df['Event_start_date_time'].dt.year==data["year"]) & (df['Event_start_date_time'].dt.month.isin(list(data["Quarter"])))]
    fig = px.pie(snap, 'Area', height=350,width=400, title="Area")
    
    return json.loads(fig.to_json())

#################################################################################################################################

############################################################WE_Incedient_Category####################################################

@app.post("/we_incedient_category")
def we_incedient_category(Quarter:Quarter):
    data = jsonable_encoder(Quarter)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT *FROM public.we_incident""", connection)
    df['Event_start_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['Event_Time'].apply(lambda x:str(x)), utc=True)
    df['Event_end_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_End_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['End_Time'].apply(lambda x:str(x)), utc=True)
    snap = df[ (df['Event_start_date_time'].dt.year==data["year"]) & (df['Event_start_date_time'].dt.month.isin(list(data["Quarter"])))]
    fig = px.histogram(snap, x="Category", width=1200, height=350, title="Category")
    fig.update_layout(bargap=0.2)
    fig.update_xaxes(tickangle=45)
    
    return json.loads(fig.to_json())

#################################################################################################################################

############################################################WE_Incedient_Repeatative####################################################

@app.post("/we_incedient_repeatative")
def we_incedient_repeatative(Quarter:Quarter):
    data = jsonable_encoder(Quarter)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT *FROM public.we_incident""", connection)
    df['Event_start_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['Event_Time'].apply(lambda x:str(x)), utc=True)
    df['Event_end_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_End_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['End_Time'].apply(lambda x:str(x)), utc=True)
    snap = df[ (df['Event_start_date_time'].dt.year==data["year"]) & (df['Event_start_date_time'].dt.month.isin(list(data["Quarter"])))]
    fig = px.pie(snap, 'Repeatative', height=350,width=400, title="Repeatative")
    
    return json.loads(fig.to_json())

#################################################################################################################################

############################################################WE_Incedient_SLA####################################################

@app.post("/we_incedient_sla")
def we_incedient_sla(Quarter:Quarter):
    data = jsonable_encoder(Quarter)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT *FROM public.we_incident""", connection)
    df['Event_start_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['Event_Time'].apply(lambda x:str(x)), utc=True)
    df['Event_end_date_time'] = pd.to_datetime(pd.to_datetime(df['Event_End_Date']).dt.strftime('%m/%d/%Y').apply(lambda x:str(x)) + ' ' +df['End_Time'].apply(lambda x:str(x)), utc=True)
    snap = df[ (df['Event_start_date_time'].dt.year==data["year"]) & (df['Event_start_date_time'].dt.month.isin(list(data["Quarter"])))]
    fig = px.pie(snap, 'SLA', height=350,width=400, title="SLA")
    fig.update_xaxes(tickangle=45)
    
    return json.loads(fig.to_json())

#################################################################################################################################

################################################Etisalat_Incedient_Event_counts######################################################
@app.get("/etisalat_incident_event_counts")
def Etisalat_incident_event_counts():
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT * FROM public."Etisalat_incident_Cases" """, connection)
    df['Resolution_Time'] = pd.to_datetime(df['Resolution_Time'])
    fig = px.histogram(df, x="Etisalat_Notification_Time", title="Event Counts", width=1200, height=350)
    fig.update_layout(bargap=0.2)
    return json.loads(fig.to_json())

#################################################################################################################################

############################################################Etisalat_Incedient_event_per_quarter####################################################
@app.post("/etisalat_Incedient_event_per_quarter")
def etisalat_Incedient_event_per_quarter(Quarter:Quarter):
    data = jsonable_encoder(Quarter)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT * FROM public."Etisalat_incident_Cases" """, connection)
    df['Resolution_Time'] = pd.to_datetime(df['Resolution_Time'])
    snap = df[ (df['Etisalat_Notification_Time'].dt.year==data["year"]) & (df['Etisalat_Notification_Time'].dt.month.isin(list(data["Quarter"])))]
    fig = px.timeline(snap, x_start='Etisalat_Notification_Time', x_end='Resolution_Time', y="Case", title="Event Per Quarter", width=1200, height=500)
    
    return json.loads(fig.to_json())

#################################################################################################################################

############################################################Etisalat_Incedient_Violated####################################################
@app.post("/etisalat_Incedient_violated")
def etisalat_Incedient_violated(Quarter:Quarter):
    data = jsonable_encoder(Quarter)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT * FROM public."Etisalat_incident_Cases" """, connection)
    df['Resolution_Time'] = pd.to_datetime(df['Resolution_Time'])
    snap = df[ (df['Etisalat_Notification_Time'].dt.year==data["year"]) & (df['Etisalat_Notification_Time'].dt.month.isin(list(data["Quarter"])))]
    fig = px.pie(snap,'Violated', title='Violated',width=1200, height=500)
    return json.loads(fig.to_json())

###################################################################################################################################

################################################Sites_Clustering###################################################################
class Sites_Clustering(BaseModel):
    Date    : str = ''


@app.post("/sites_clustering")
async def sites_clustering(Sites_Clustering:Sites_Clustering):
    data = jsonable_encoder(Sites_Clustering)
    DATA_PATH = 'Files/Site_Cells_KPI/Sites/Sites_KPI_processed.parquet'
    df = pd.read_parquet(DATA_PATH)
    df_one_hour = df[df['Time']==data['Date']]
    df_one_hour.index = df_one_hour['eNodeB Name']
    X = df_one_hour[['EPM_RRC_SR', 'EPM_UL_Traffic_GB', 'EPM_ERAB_SR','EPM_DL_Traffic_GB','EPM_CSFB_Preparation_SR','EPM_CSFB_SR']]
    #kmeans = KMeans(n_clusters =3 , init = 'k-means++', random_state = 42)
    #y_kmeans = kmeans.fit_predict(X)
    #X['cluster']=y_kmeans

    gmm = mixture.GaussianMixture(n_components=3)
    y_gmm = gmm.fit_predict(X)
    X['cluster']=y_gmm
    fig = px.parallel_coordinates(X, color="cluster",
                              dimensions=['EPM_RRC_SR', 'EPM_UL_Traffic_GB', 'EPM_ERAB_SR','EPM_CSFB_Preparation_SR','EPM_CSFB_SR',
                                          'EPM_DL_Traffic_GB','cluster'],
                              color_continuous_scale=px.colors.diverging.Tealrose,
                              color_continuous_midpoint=2, title="Sites Clustering",width=1140, height=500)

    
    return json.loads(fig.to_json())

###################################################################################################################################

################################################Sites_Clustering_centroids#########################################################

@app.post("/sites_clustering_centroids")
async def sites_clustering(Sites_Clustering:Sites_Clustering):
    data = jsonable_encoder(Sites_Clustering)
    DATA_PATH = 'Files/Site_Cells_KPI/Sites/Sites_KPI_processed.parquet'
    df = pd.read_parquet(DATA_PATH)
    df_one_hour = df[df['Time']==data['Date']]
    df_one_hour.index = df_one_hour['eNodeB Name']
    X = df_one_hour[['EPM_RRC_SR', 'EPM_UL_Traffic_GB', 'EPM_ERAB_SR','EPM_DL_Traffic_GB','EPM_CSFB_Preparation_SR','EPM_CSFB_SR']]
    #kmeans = KMeans(n_clusters =3 , init = 'k-means++', random_state = 42)
    #y_kmeans = kmeans.fit_predict(X)
    #X['cluster']=y_kmeans

    gmm = mixture.GaussianMixture(n_components=3)
    y_gmm = gmm.fit_predict(X)
    X['cluster']=y_gmm
    centroids = pd.DataFrame(gmm.means_, columns=['EPM_RRC_SR', 'EPM_UL_Traffic_GB', 'EPM_ERAB_SR', 'EPM_DL_Traffic_GB',
       'EPM_CSFB_Preparation_SR', 'EPM_CSFB_SR'])
    centroids['cluster'] = centroids.index

    fig = px.parallel_coordinates(centroids, color="cluster",
                              dimensions=['EPM_RRC_SR', 'EPM_UL_Traffic_GB', 'EPM_ERAB_SR','EPM_CSFB_Preparation_SR','EPM_CSFB_SR',
                                          'EPM_DL_Traffic_GB','cluster'],
                              color_continuous_scale=px.colors.diverging.Tealrose,
                              color_continuous_midpoint=2 , title="Sites Centroids Clusters",width=1140, height=500)

    
    return json.loads(fig.to_json())

###################################################################################################################################

################################################Sites_Clustering_Download###########################################################
@app.post("/sites_clustering_download")
async def sites_clustering_download(Sites_Clustering:Sites_Clustering):
    data = jsonable_encoder(Sites_Clustering)
    DATA_PATH = 'Files/Site_Cells_KPI/Sites/Sites_KPI_processed.parquet'
    df = pd.read_parquet(DATA_PATH)
    df_one_hour = df[df['Time']==data['Date']]
    df_one_hour.index = df_one_hour['eNodeB Name']
    X = df_one_hour[['EPM_RRC_SR', 'EPM_UL_Traffic_GB', 'EPM_ERAB_SR','EPM_DL_Traffic_GB','EPM_CSFB_Preparation_SR','EPM_CSFB_SR']]
    #kmeans = KMeans(n_clusters =3 , init = 'k-means++', random_state = 42)
    #y_kmeans = kmeans.fit_predict(X)
    #X['cluster']=y_kmeans

    gmm = mixture.GaussianMixture(n_components=3)
    y_gmm = gmm.fit_predict(X)
    X['cluster']=y_gmm
    response = StreamingResponse(io.StringIO(X.to_csv()), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=export.csv"

    return response

####################################################################################################################################

####################################################Site-KPI###########################################################################
@app.post("/site-kpi")
def sitekpi(siteitem:SiteItem):
    data = jsonable_encoder(siteitem)
    DATA_PATH = 'Files/Site_Cells_KPI/Sites/Sites_KPI_processed.parquet'
    df = pd.read_parquet(DATA_PATH)
    snap = df[ (df['eNodeB Name'].str.contains(str(data['Site_Name_input']),case=False, na=False))]
    data = []
    for i in snap.columns[3:]:
        trace = go.Scatter(x=snap['Time'],y=snap[i],name=i,mode='markers+lines')
        data.append(trace)
    layout = go.Layout(title='{} KPI'.format(snap['eNodeB Name'].iloc[0]), xaxis ={'title':'time'},yaxis={'title':'KPI'},hovermode='x unified',width=1140, height=500)
    fig = go.Figure(data=data, layout=layout)
    fig.update_xaxes(categoryorder='category ascending')
    return json.loads(fig.to_json())
######################################################################################################################################

####################################################Site-Cells###########################################################################
@app.post("/site-cells")
def sitecells(siteitem:SiteItem):
    data = jsonable_encoder(siteitem)
    DATA_PATH = 'Files/Site_Cells_KPI/Cells/KPI_processed.parquet'
    df = pd.read_parquet(DATA_PATH)
    snap = df[ (df['eNodeB Name'].str.contains(str(data['Site_Name_input']),case=False, na=False))]
    snap_unique = sorted(snap['Cell Name'].unique().tolist())
    group = []
    for i in range(len(snap_unique)):
        dict1= {"cellname":snap_unique[i]}
        group.append(dict1)
    data_json = json.loads(json.dumps(group))
    return data_json 
####################################################################################################################################

####################################################Cell-KPI###########################################################################
class CellItem(BaseModel):
    Cell_Name_input: str

@app.post("/cell-kpi")
def cellkpi(cellitem:CellItem):
    data = jsonable_encoder(cellitem)
    DATA_PATH = 'Files/Site_Cells_KPI/Cells/KPI_processed.parquet'
    df = pd.read_parquet(DATA_PATH)
    snap = df[ (df['Cell Name'].str.contains(str(data['Cell_Name_input']),case=False, na=False))]
    data = []
    for i in snap.columns[3:]:
        trace = go.Scatter(x=snap['Time'],y=snap[i],name=i,mode='markers+lines')
        data.append(trace)
    layout = go.Layout(title='{} KPI'.format(snap['Cell Name'].iloc[0]), xaxis ={'title':'time'},yaxis={'title':'KPI'},hovermode='x unified',width=1140, height=500)
    fig = go.Figure(data=data, layout=layout)
    fig.update_xaxes(categoryorder='category ascending')
    return json.loads(fig.to_json())
######################################################################################################################################

###########################################################Battary status#############################################################
@app.post("/battary_status")
def battary_status(sectorItem:SectorItem):
    data = jsonable_encoder(sectorItem)
    df  = pd.read_excel("Files/Battary/Battary status.xlsx")
    df['Sector'].replace('\s+', '_', regex=True,inplace=True)
    if(str(data['sector_input'])=='all'):
        data = df.to_json(orient='records',force_ascii=False)
        data_json = json.loads(data)
    else:
        df = df[df['Sector']== str(data['sector_input'])]
        data = df.to_json(orient='records',force_ascii=False)
        data_json = json.loads(data)
    return data_json

####################################################################################################

##########################################Search_Problem####################################################

@app.get("/search_problem")
def search_problem(msisdn:Optional[str] = '',imsi:Optional[str] = '',serial_number:Optional[str] = '',problem_case:Optional[str] = '',problem_input:Optional[str] = ''
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
    
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    
    if (DateFrom=='') or (DateTo==''):
        df = psql.read_sql("""SELECT "Id", "MSISDN", "IMSI", "Serial_Number", "Problem_Case", "Problem_input", "Date", "Action", "Solving_Comment", "Other_Comments"
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
        df = psql.read_sql("""SELECT "Id", "MSISDN", "IMSI", "Serial_Number", "Problem_Case", "Problem_input", "Date", "Action", "Solving_Comment", "Other_Comments"
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

################################################File Upload_Problem#############################################
@app.post("/uploadfile_problem")
async def uploadfile_problem(file: UploadFile = File(...)):
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

################################################Select_Problem######################################################
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

@app.post("/select_problem")
async def select(selectItem:SelectItem):
    data = jsonable_encoder(selectItem)
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))

    if (data['datefrom']=='') or (data['dateto']==''):
        df = psql.read_sql("""SELECT "Id", "MSISDN", "IMSI","Serial_Number","Problem_Case", "Problem_input", "Date", "Action", "Solving_Comment", "Other_Comments"
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
        df = psql.read_sql("""SELECT "Id", "MSISDN", "IMSI","Serial_Number","Problem_Case", "Problem_input", "Date", "Action", "Solving_Comment", "Other_Comments"
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

#######################################################################################################################

######################################################Delete_Problem####################################################
@app.delete("/delete_problem/{request_id}")
def delete_problem (request_id:int):
    connection = pg.connect("host={} port={} dbname=postgres user=postgres password=1234".format(DB_IP,DB_Port))
    df = psql.read_sql("""SELECT "Id" FROM public."Problem_db" WHERE "Id" = {} ;""".format(request_id), connection)
    try:
        
        conn=pg.connect(
        database="postgres",
        user="postgres",
        password="1234",
        host="localhost",
        port="5432"
    )
        cursor = conn.cursor()
        sql = """DELETE FROM public."Problem_db" WHERE "Id" = {};""".format(df['Id'].iloc[0])
        cursor.execute(sql)
        conn.commit()
        conn.close()
        return {"Deleted Successfully"}
    except:
        return {"ID Not Found"}

################################################################################################################

###################################################NetworkKPIForcating##########################################
