//TODO skriptaa login credentials (tarkista admin/asiakas) / script login credentials (check if admin or a customer)

    //submit button

    function user() {
        var user = document.getElementById("userName").value; //ei hyvä idea kovakoodata käyttätunnusta scriptiin / not a good idea to hardcode username to script
        var pass = document.getElementById("passWord").value; //mutta muokkaa myöhemmin että hakee kannasta "oikeat tunnukset" / but modify it later to get correct username and password from i.e database or profile
        if (user == "admin" && pass == "admin")               // for now it's just for testing purposes
        {
            window.location.href = "adminPage.html"; 
        }
        else if (user == "customer" && pass == "customer") 
        {
            window.location.href = "customerPage.html";
        }    // check logic and if it works properly
        else (user != "customer" && pass != "customer" || user != "admin" && pass != "admin") 
        {
            alert("Wrong username or password!");
        }
        
    }

    //TODO käyttäjänimi ja salasana tarkistus kannasta tai profiilista
    // check username and password from database or profile

//i.e something like this

/*  const adminEmail = "";                                               
    const role = user[0].email===adminEmail? "admin" : "user";                                  
    const token = jwt.sign( 
    {
        email: user[0].email,
        userId: user[0]._id,
        phoneNo: user[0].phoneNumber,
        role: role
    },
    }

user.get('/profile', checkAuth, (req, res, data) =>{  
    User.find(req.userData, function(err, users) {
        if (req.role === "admin") {
        return res.json(users);
        }else{
        res.send(req.userData);
        }
  });
});*/

    

