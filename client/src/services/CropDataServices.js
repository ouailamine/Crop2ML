import axios from 'axios';

require('dotenv').config()
// prod
var url = 'db-services';

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/db-services';
    
}

class CropDataServices {


    //Envoyer un mail
    static async sendMail(emetteur,mailEmetteur,sujet,contenuMail){
        console.log("Checking send mail " + emetteur,mailEmetteur,sujet,contenuMail);
        let body = { emetteur: emetteur ,mailEmetteur: mailEmetteur ,sujet: sujet, contenuMail:contenuMail}
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "/sendMail", body).then(res => {
                    console.log(res.data.affectedRows)
                    if (res.data.affectedRows === 1 ) {
                        resolve(true);
                    }
                    else { resolve(false); }
                })
            } catch (err) {
                reject(err);
            }
        })
    }


    static register_user(loggedUserEmail,username,password,role) {
        console.log("loggedUserEmail:",loggedUserEmail);
        console.log("username:",username);
        console.log("password:",password);
        let body = { transaction: "register_user", userEMail: loggedUserEmail,password:password ,username:username,role:role}

        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "/register_user", body).then(res => {
                
                    if (res.data !== undefined && res.data.length > 0) {
                        console.log("mail registered in table user")
                        resolve(true);
                    }else { 
                        console.log("mail not registered in table user")
                        
                            {resolve(false);}
                       
                    }
                })
            } catch (err) {
                reject(err);
            }
        })
    }


    static register_model(titre,auteur,mail_auteur,details) {
        console.log("loggedUserEmail:",titre);
        console.log("username:",auteur);
        console.log("password:",mail_auteur);

        let body = { transaction: "register_model",titre:titre,auteur:auteur,mail:mail_auteur,details:details,pulie:false}

        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "/register_model", body).then(res => {
                
                    if (res.data !== undefined && res.data.length > 0) {
                        console.log("model registered in table crop-models")
                        resolve(true);
                    }else { 
                        console.log("model not registered in table user")
                        
                            {resolve(false);}
                       
                    }
                })
            } catch (err) {
                reject(err);
            }
        })
    }

    //Recuperation du mot de passe oublié
    static async ResetPassword(loggedUserEmail){
        console.log("Checking email " + loggedUserEmail);
        let body = { UserEMail: loggedUserEmail }
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "/resetpassword", body).then(res => {
                    console.log(res.data.affectedRows)
                    if (res.data.affectedRows === 1 ) {
                        resolve(true);
                    }
                    else { resolve(false); }
                })
            } catch (err) {
                reject(err);
            }
        })
    }

    //ajouter et modifier un mot de passe
    static async pwsadd(req_body) {
        // console.log(req_body)
        return new Promise((resolve, reject) => {
            try {
                if (req_body !== null && req_body.transaction != null) {
                    if (req_body.transaction === "alter_password") {
                        axios.post(url + "/password", req_body).then(res => {
                            resolve(res.affectedRows);
                        })
                    } else { reject(" ERROR  does not accept " + req_body); }
                } else { reject(" ERROR  does not accept " + req_body); }
            } catch (err) { reject(err); }
        })
    }


    static checkEMail(loggedUserEmail) {
        console.log("Checking email in Apex Vignes user Table :" + loggedUserEmail);
        let body = { transaction: "select_useremail", userEMail: loggedUserEmail }

        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "/login", body).then(res => {
                    if (res.data !== undefined && res.data.length > 0) {
                        console.log("mail registered in table user")
                        resolve(true);
                    }else { 
                        console.log("mail not registered in table user")
                        CropDataServices.checkEMailAuth(loggedUserEmail).then( resp => 
                            {resolve(resp);}
                        )
                    }
                })
            } catch (err) {
                reject(err);
            }
        })
    }

    static checkEMailAuth(loggedUserEmail) {
        console.log("Checking email in Apex Territoire authentification table :" + loggedUserEmail);
        let body = { transaction: "select_useremailAuth", userEMail: loggedUserEmail };
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "/checkAuth", body).then(res => {
                    if (res !== null && res.data.length > 0) {
                        console.log('mail registered in table auth')
                        resolve(true);
                    }
                    else {
                        console.log("mail not registered in table auth")
                        resolve(false);
                    }
                })
            } catch (err) { reject(err); }
        })
    }

    static checkpasswordRequire(loggedUserEmail) {
        console.log("checkpasswordRequire "+ loggedUserEmail)
        let body = { transaction: "select_passwordRequireAuth", userEMail: loggedUserEmail };
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "/checkAuth", body).then(res => {
                    if (res !== undefined) {                  
                        if (res.data[0].passwordRequire === 1) {
                            console.log('passwordRequire exists')
                            resolve(true);
                        }
                        else {
                            console.log('passwordRequire does not exists')
                            resolve(false);
                        }
                    }
                })
            } catch (err) { reject(err); }
        })
    }

    //verifier le mot passe login
    static checkPassword(password, loggedUserEmail) {
        // console.log("Checking email of " + loggedUserEmail);
        // console.log(password);
        let body = { transaction: "check_passwordLogin", password: password, UserEMail: loggedUserEmail }
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "/password", body).then(res => {
                    console.log("checkPassword result form call to db: ")
                    console.log("res")
                    console.log(res)
                    if (res.data !== null) {
                        resolve(res.data);
                    } else {
                        resolve(false); }
                })

            } catch (err) { reject(err); }
        })
    }

    static async mailAddToAuth(loggedUserEmail,usrName) {
        let body = { transaction: "insert_userEmail", userEMail: loggedUserEmail, password: null, passwordRequire: 0, userName: usrName}
        return axios.post(url + "/checkAuth", body).then(res => {
            console.log("mailAddToAuth result from DB")
            console.log(res)
            if (res && res.data.affectedRows > 0) {
                console.log('mail a été ajouté')
                return true;
            }else { 
                console.log('non ajouté')
                return false;
            }
        })
    }

    
static getmodels(publiee,transaction) {

    return new Promise((resolve, reject) => {
      
            let body = { publie : publiee}
            console.log(body)
            return axios.post(url + "/models",body).then(res => {
                if (res !== null) {
                    console.log('retour liste models')
                    resolve(res);}
                else {console.log("ya pas de models")
                      resolve(false);}
    })})
}

static getAllmodels() {

    return new Promise((resolve, reject) => {
   
            return axios.get(url + "/allmodels").then(res => {
                if (res !== null) {
                    console.log('retour liste models')
                    resolve(res);}
                else {console.log("ya pas de models")
                      resolve(false);}
    })})
}

static search(recherche,transaction,recherchee) {
    return new Promise((resolve, reject) => {
        console.log(recherche,transaction)
        if(transaction == "recherche par titre"){
            let body = { recherche : recherche,transaction:transaction,recherchee:recherchee}
            console.log(body)
            return axios.post(url + "/search",body).then(res => {
                if (res !== null) {
                    console.log('retour liste models')
                    resolve(res);}
                else {console.log("ya pas de models")
                      resolve(false);}
        })}
        
        if(transaction == "recherche par auteur"){
            let body = { recherche : recherche ,transaction:transaction,recherchee:recherchee}
            console.log(body)
            return axios.post(url + "/search",body).then(res => {
                if (res !== null) {
                    console.log('retour liste models')
                    resolve(res);}
                else {console.log("ya pas de models")
                      resolve(false);}
        })}
    })
}

    /*static getmodelspublished() {
    return axios.get(url + "/publishedmodels")} */
static getusers(userRole,transaction) {
    return new Promise((resolve, reject) => {
    let body = {userRole:userRole,transaction : transaction}
    console.log(body)
       return axios.post(url + "/users",body).then(res => {
        if (res !== null) {
            console.log('retour users')
            console.log(res)
            resolve(res);}

        else {console.log("ya pas de users")
        console.log(res)
              resolve(false);}
        })
    } ) }


    static getMyModels(userEMail) {
        console.log(userEMail)
        return new Promise((resolve, reject) => {
        let body = {userEMail:userEMail}
        console.log(body)
           return axios.post(url + "/userModels",body).then(res => {
            if (res !== null) {
                console.log('retour Mes Models')
                console.log(res)
                resolve(res);}
    
            else {console.log("ya pas Mes Models ")
            console.log(res)
                  resolve(false);}
            })
        } ) }

static addAdmin(email) {
    return new Promise((resolve, reject) => {
    let body = { UserEMail : email}
    console.log(body)
    return axios.post(url + "/addAdmin",body).then(res => {
        if (res !== null) {
            console.log('user ajouter en admin')
            resolve(true);}
        else {console.log("user non ajouter en admin")
              resolve(false);}
})

    })
}  

static getShowModel(titre) {
    return new Promise((resolve, reject) => {
        console.log(titre)
            let body = { titre : titre}
            console.log(body)
            return axios.post(url + "/getShowModel",body).then(res => {
                if (res !== null) {
                    console.log('retour liste show models')
                    resolve(res);}
                else {console.log("ya pas de show models")
                      resolve(false);}})})}





}



export default CropDataServices;