from csv_diff import load_csv, compare
import pandas as pd
import datetime
import psycopg2
import json

file_old=pd.read_csv('old.csv',header=None)
file_old.iloc[0,0]="LTE NE NAME"
file_old.iloc[0,1]="ETHPORT CN"
file_old.iloc[0,2]="ETHPORT SRN"
file_old.iloc[0,3]="ETHPORT SN"
file_old.iloc[0,4]="ETHPORT SBT"
file_old.iloc[0,5]="ETHPORT PN"
file_old.iloc[0,6]="ETHPORT PA"
file_old.iloc[0,7]="ETHPORT MTU"
file_old.iloc[0,8]="ETHPORT SPEED"
file_old.iloc[0,9]="ETHPORT DUPLEX"
file_old.iloc[0,10]="ETHPORT ARPPROXY"
file_old.iloc[0,11]="ETHPORT FC"
file_old.iloc[0,12]="ETHPORT FERAT"
file_old.iloc[0,13]="ETHPORT FERDT"
file_old.iloc[0,14]="ETHPORT RXBCPKTALMOCRTHD"
file_old.iloc[0,15]="ETHPORT RXBCPKTALMCLRTHD"
file_old.iloc[0,16]="ETHPORT USERLABEL"
file_old.iloc[0,17]="ETHPORT FIBERSPEEDMATCH"
file_old.iloc[0,18]="ETHPORT AUTOCFGFLAG"
file_old.drop([1]).to_csv(r'final_old.csv',index=False,header=False)


file_new=pd.read_csv('new.csv',header=None)
file_new.iloc[0,0]="LTE NE NAME"
file_new.iloc[0,1]="ETHPORT CN"
file_new.iloc[0,2]="ETHPORT SRN"
file_new.iloc[0,3]="ETHPORT SN"
file_new.iloc[0,4]="ETHPORT SBT"
file_new.iloc[0,5]="ETHPORT PN"
file_new.iloc[0,6]="ETHPORT PA"
file_new.iloc[0,7]="ETHPORT MTU"
file_new.iloc[0,8]="ETHPORT SPEED"
file_new.iloc[0,9]="ETHPORT DUPLEX"
file_new.iloc[0,10]="ETHPORT ARPPROXY"
file_new.iloc[0,11]="ETHPORT FC"
file_new.iloc[0,12]="ETHPORT FERAT"
file_new.iloc[0,13]="ETHPORT FERDT"
file_new.iloc[0,14]="ETHPORT RXBCPKTALMOCRTHD"
file_new.iloc[0,15]="ETHPORT RXBCPKTALMCLRTHD"
file_new.iloc[0,16]="ETHPORT USERLABEL"
file_new.iloc[0,17]="ETHPORT FIBERSPEEDMATCH"
file_new.iloc[0,18]="ETHPORT AUTOCFGFLAG"
file_new.drop([1]).to_csv(r'final_new.csv',index=False,header=False)



diff = compare(
    load_csv(open("final_old.csv"), key="LTE NE NAME"),
    load_csv(open("final_new.csv"), key="LTE NE NAME")
)

p=pd.DataFrame(diff['changed'])
p['Date']=datetime.date.today()

param_dic = {
    "host"      : "localhost",
    "database"  : "OSS",
    "user"      : "postgres",
    "password"  : "postgres"
}

def connect(params_dic):
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params_dic)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        sys.exit(1) 
    return conn
def single_insert(conn, insert_req):
    """ Execute a single INSERT request """
    cursor = conn.cursor()
    try:
        cursor.execute(insert_req)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error: %s" % error)
        conn.rollback()
        cursor.close()
        return 1
    cursor.close()
# Connecting to the database
conn = connect(param_dic)
# Inserting each row
for i in p.index:
    key=p['key'][i]
    changes=json.dumps(p['changes'][i])
    Date=p['Date'][i]
    query = """INSERT INTO public."Change"(enb, "Changes", "Change_Date") VALUES ('%s','%s','%s');""" % (key, changes, Date)
    single_insert(conn, query)
# Close the connection
conn.close()


