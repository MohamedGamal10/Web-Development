#Setup Lib
from flask import Flask, render_template, redirect, url_for, request
import pandas as pd

app = Flask(__name__, static_url_path='/Static', static_folder='Static',template_folder='Template')

#Read Excel File
df= pd.read_excel('Excel_File/file.xlsx')

####################################################################################################################
#App Get all data and render them to Html file
@app.route('/', methods=("POST", "GET"))      
def index():                                  
    return render_template("Index.html",column_names=df.columns.values, row_data=list(df.values.tolist()))   
####################################################################################################################

####################################################################################################################
# App add New Book
@app.route('/add', methods=["POST"])
def add():
    #Retrive The data
    if request.method=='POST':
        Book_Title   = request.form['Book_Title_add']
        Book_Url     = request.form['Book_Url_add']
        Author_Name  = request.form['Author_Name_add']
        Author_Url   = request.form['Author_Url_add']
        Country_Name = request.form['Country_Name_add']
        Country_URL  = request.form['Country_URL_add']

    #Add Data To DataFrame
    df.loc[len(df)+1] = [len(df)+1,Book_Title,Book_Url,Author_Name,Author_Url,Country_Name,Country_URL]

    #Save DataFrame
    df.to_excel('Excel_File/file.xlsx',index=False)
    
    return render_template("Index.html",column_names=df.columns.values, row_data=list(df.values.tolist())) 
####################################################################################################################

####################################################################################################################
# App Update Book
@app.route('/update', methods=("POST", "GET"))
def update():
    if request.method=='POST':
        id_Book      = request.form['id_update']
        Book_Title   = request.form['Book_Title_update']
        Book_Url     = request.form['Book_Url_update']
        Author_Name  = request.form['Author_Name_update']
        Author_Url   = request.form['Author_Url_update']
        Country_Name = request.form['Country_Name_update']
        Country_URL  = request.form['Country_URL_update']

    #update Data To DataFrame
    df.loc[df.index==int(id_Book)-1,'index']=id_Book
    df.loc[df.index==int(id_Book)-1,'book_title']=Book_Title
    df.loc[df.index==int(id_Book)-1 , 'book_url'] = Book_Url
    df.loc[df.index==int(id_Book)-1 , 'author_name'] = Author_Name
    df.loc[df.index==int(id_Book)-1 , 'author_url'] = Author_Url
    df.loc[df.index==int(id_Book)-1 , 'country_name'] = Country_Name
    df.loc[df.index==int(id_Book)-1 , 'country_url'] = Country_URL
    
    #Save DataFrame
    df.to_excel('Excel_File/file.xlsx',index=False)
    return render_template("Index.html",column_names=df.columns.values, row_data=list(df.values.tolist())) 
####################################################################################################################

####################################################################################################################
#App Delete Book
@app.route('/delete', methods=("POST", "GET"))
def delete():
    if request.method=='POST':
        id_Book= request.form['id_delete']
    df.drop(labels=int(id_Book)-1, axis=0, inplace=True)
    
    #Save DataFrame
    df.to_excel('Excel_File/file.xlsx',index=False)
    return render_template("Index.html",column_names=df.columns.values, row_data=list(df.values.tolist()))
####################################################################################################################

####################################################################################################################
#Run App
if __name__=='__main__':
    app.run(debug=True)
####################################################################################################################