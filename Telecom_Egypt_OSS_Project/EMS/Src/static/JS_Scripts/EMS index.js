function connection(){
            // Selecting the input element and get its value 
            var username = document.getElementById("Server_username").value;
            var password = document.getElementById("Server_Password").value;
            var hostname = document.getElementById("Server_HostName").value;
            var password_B64=btoa(password);
            var link = "";
            var link_dir = link.concat("http://10.31.0.178:8888/?hostname=",hostname,"&username=",username,"&password=",password_B64)
            window.open(link_dir, '_blank');   
        }