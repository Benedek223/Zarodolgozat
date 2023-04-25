//a regisztráció ellenőrzéséhez:
function felhasznaloVanEMar() {
    //1. először megnézzük, hogy minden mező ki van-e töltve
    if (document.getElementById('regUser').value != "" && document.getElementById('regPass1').value != "" && document.getElementById('regPass2').value != "") {
        if (document.getElementById('regPass1').value == document.getElementById('regPass2').value) {
            let bemenet = {
                user: document.getElementById('regUser').value
            };
            let url = "http://localhost:4000/felhasznaloLetezikE";
            let fetchOptions = {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            };

            fetch(url, fetchOptions)
                .then(x => x.json())
                .then(y => {//felhasznaloinev_ell(y)
                    //alert(y[0].fnev);
                    if (y.length != 0) {
                        alert("Már foglalt felhasználói név!!!!");
                    }
                    else {
                        regisztracio();
                        document.getElementById('regUser').value = "";
                        document.getElementById('regPass1').value = "";
                        document.getElementById('regPass2').value = "";
                    }
                });
        }
        else {
            alert("A két jelszó nem egyezik!");
        }
    }
    //2. Ha nincs minden mező kitöltve
    else {
        alert("Minden mezőt kötelező kitölteni!");
    }
};

function FoglaltE(){ 
            let bemenet = {
                ora: document.getElementById("dateOra").value,
                nap: document.getElementById("dateNap").value,
                honap: document.getElementById("dateHonap").value,
            };
            let url = "http://localhost:4000/FoglaltE";
            let fetchOptions = {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            };
            fetch(url, fetchOptions)
                .then(x => x.json())
                .then(y => {
                    if (y.length != 0) {
                        alert("Már foglalt időpont, kérlek válassz másikat!");
                    }
                    else {          
                            let bemenet = {
                                ora: document.getElementById("dateOra").value,
                                nap: document.getElementById("dateNap").value,
                                honap: document.getElementById("dateHonap").value,
                            };
                            let url = "http://localhost:4000/datumFel";
                            let fetchOptions = {
                                method: "POST",
                                body: JSON.stringify(bemenet),
                                headers: { "Content-type": "application/json; charset=UTF-8" }
                            };
                            fetch(url, fetchOptions)
                                .then(x => x.text())
                                .then(y => {
                                    alert(y);
                                });          
                    }
                }); 
};

// Foglalt időpontok törlése admin részére
function idopontTorles(){
        let bemenet = {
            ora: document.getElementById("dateOra").value,
            nap: document.getElementById("dateNap").value,
            honap: document.getElementById("dateHonap").value,
        };
        let url = "http://localhost:4000/datumTorles";
        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        };
        fetch(url, fetchOptions)
            .then(x => x.text())
            .then(y => {
                alert(y);
            });
    };

//foglaltak lekérdezése
function foglalt(){
    fetch("http://localhost:4000/foglalt")
    .then(x => x.json())
    .then(y => {
        //alert(y);
        //alert(JSON.stringify(y))
        var b=""
        y.forEach(elem => {
           
            b+='<tr>'
            b+='<td>'+elem.ora+'</td>'
            b+='<td>'+elem.nap+'</td>'
            b+='<td>'+elem.honap+'</td>'
            b+='</tr>'
            
        
            
        });
        document.getElementById("foglalt").innerHTML=b;
       
         
    });
};
// keptorles
function keptorles() {
    
    let url ="http://localhost:4000/keptorles"
    let kepNev = document.getElementById('refKep').value.split("\\")
    let bemenet={
        kep: kepNev[2]
    };
    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    };
    fetch(url, fetchOptions)
        .then(x => x.text())
        .then(y => {
            alert(y);
        });
};
// kepek lekerdezese Admin referenciamunkakhoz
function kepek2() {
    fetch("http://localhost:4000/kepek")
    .then(x=>x.json())
    .then(y=>megjelenit(y))

    function megjelenit(adatok) {

        var sz=""
        for(var sor of adatok) {
            sz+=`
          
            <img src="http://localhost:4000/${sor.kepnev}" alt="${sor.kepnev}" title="${sor.kepnev}" width="100" height="100"">
 
            `
        }
        document.getElementById("referencia").innerHTML+=sz;
    }
}
function kepek3() {
    fetch("http://localhost:4000/kepek")
    .then(x=>x.json())
    .then(y=>megjelenit(y))

    function megjelenit(adatok) {

        var sz=""
        for(var sor of adatok) {
            sz+=`
            <div class="carousel-item c-item ">
            <img src="http://localhost:4000/${sor.kepnev}" class="d-block w-100 c-img" alt="${sor.kepnev}" title="${sor.kepnev}" ">
            <div class="carousel-caption d-none d-md-block">
            </div>
          </div>
            
 
            `
        }
        document.getElementById("ref4").innerHTML+=sz;
    }
}

// kepek lekerdezese referenciamunkakhoz
function kepek() {
    fetch("http://localhost:4000/kepek")
    .then(x=>x.json())
    .then(y=>megjelenit(y))

    function megjelenit(adatok) {

        var sz=""
        for(var sor of adatok) {
            sz+=`
            <img src="http://localhost:4000/${sor.kepnev}" alt="${sor.kepnev}" title="${sor.kepnev}" width="300" height="300"">
            `
        }
        document.getElementById("referencia").innerHTML+=sz;
    }
};


//idopontfeltoltes
function datumfel() {
    let bemenet = {
        ora: document.getElementById("dateOra").value,
        nap: document.getElementById("dateNap").value,
        honap: document.getElementById("dateHonap").value,
    };
    let url = "http://localhost:4000/datumFel";
    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    };
    fetch(url, fetchOptions)
        .then(x => x.text())
        .then(y => {
            alert(y);
        });
};
//a tényleges regisztráció
function regisztracio() {
    let bemenet = {
        user: document.getElementById("regUser").value,
        jelszo: document.getElementById("regPass1").value,
    };
    let url = "http://localhost:4000/regisztracio";
    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    };
    fetch(url, fetchOptions)
        .then(x => x.text())
        .then(y => {
            alert(y);
        });
};

//Jelszó módosítás
function jelszomodosit() {
    let bemenet = {
        felhasznaloinev: document.getElementById("loginUser").value,
        jelszo: document.getElementById("loginPass").value,
    };
    let url = "http://localhost:4000/jelszoCsere";
    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    };
    fetch(url, fetchOptions)
        .then(x => x.text())
        .then(y => {
            alert(y);
        });
};

//Felhasználó törlése
function userDelete() {
    let bemenet = {
        felhasznaloinev: document.getElementById("loginUser").value,
    };
    let url = "http://localhost:4000/felhasznaloTorlese";
    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    };
    fetch(url, fetchOptions)
        .then(x => x.text())
        .then(y => {
            alert(y);
        });
};

//User ellenőrzése bejelentkezéshez
function userLogin() {
    if (document.getElementById('loginUser').value != "" && document.getElementById('loginPass').value != "") {
        let bemenet = {
            felhasznalo: document.getElementById('loginUser').value,
            jelszo: document.getElementById('loginPass').value,
        };
        let url = "http://localhost:4000/felhasznaloHelyesE";
        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        };

        fetch(url, fetchOptions)
            .then(x => x.json())
            .then(y => userStateUpdate(y))
    }
    else {
        alert("Minden mezőt kötelező kitölteni!");
    }   
};

//A felhasználó bejelentkezve van-e módosítása
function userStateUpdate(adatok) {
    if (adatok.length == 0) {
        alert("Hibás felhasználónév vagy jelszó!");
    }
    else {
        //console.log(adatok[0].felhasznalo);
        //console.log(adatok[0].jelszo);
        if (adatok[0].felhasznalo == document.getElementById('loginUser').value && adatok[0].jelszo == document.getElementById('loginPass').value) {
            let bemenet = {
                felhasznalo: document.getElementById('loginUser').value,
                jelszo: document.getElementById('loginPass').value
            };
            let url = "http://localhost:4000/felhasznaloLogUpdate";
            let fetchOptions = {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            };

            fetch(url, fetchOptions)
                .then(x => x.json())
                .then(y => {
                    fetch("http://localhost:4000/bejelentkezve")
                        .then(x=>x.json())
                        .then(y=>{
                            if(y[0].rang==1){
                                window.location.replace("Admin.html")
                            }
                            else if(y[0].rang==0){
                                window.location.replace("loggedIn.html")
                            }
                        })
                });
              
        }
    }
};


//Bejelentkezett felhasznalo kiírása
function melyikNev() {
    let url = "http://localhost:4000/whoIs";
    let fetchOptions = {
        method: "POST",
    };

    fetch(url, fetchOptions)
        .then(x => x.json())
        .then(y => nevKiir(y))
};

function nevKiir(nev) {
    //console.log(nev);
    for (var i of nev) {
        document.getElementById('loggedInUser').innerHTML = i.felhasznalo;
    }
};


//Kijelentkezés
function logout() {
    let bemenet = {
        felhasznalo: document.getElementById('loggedInUser').innerHTML,
    };
    let url = "http://localhost:4000/kijelentkezes";
    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    };

    fetch(url, fetchOptions)
        .then(x => x.json())
        .then(y => {
            alert("Sikeres kijelentkezés");
            window.location.href = "index.html";
        });
};
// Képfeltölrés Files mappába
function kepfeltoltes(){
    
        // Object 
        const myFiles = document.getElementById('refKep').files
    if(myFiles.length>0){
        const sendFiles = async () => {
            const formData = new FormData()
    
            Object.keys(myFiles).forEach(key => {
                formData.append(myFiles.item(key).name, myFiles.item(key))
            })
        
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData
            })
        
            const json = await response.json()
        document.getElementById('myFiles').value = ''
           
        }
        sendFiles()
    }
}

//kepfel 2

function kepnev() {
let url ="http://localhost:4000/kepnev"
let kepNev = document.getElementById('refKep').value.split("\\")
let bemenet={
    kep: kepNev[2]
}
let fetchOptions={
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: {"Content-type": "application/json; charset=UTF-8",
                    "Acces-Control-Allow-Origin" : "*" }
}
fetch (url, fetchOptions)
.then(x=>x.text())
.then(y=> {
    alert(y)
    kepfeltoltes()
})
}








