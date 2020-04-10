function login()
{
    var name = document.getElementById("username").value,
        pass = document.getElementById("password").value;
        
    if(name=="Mohamed"&&pass=="123456")
    {
       window.location = "pages/index.html"; 
    }
    else
    {
        alert("Please enter valid username/password");
    }
    
}