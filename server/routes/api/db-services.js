const express = require('express');
const app = express();
const router = express.Router();
var bcrypt = require("bcryptjs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const db = require("../../models");
const dbConfig = require("../../config/db.config");
const User = db.user;
const Model = db.model;
const UserAuth = db.userAuth;
var generator = require('generate-password');
var mailer = require("nodemailer");


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Vous étes connecté a la base de donnée.");

    //verifier le mot de passe 
router.post('/password', function(req, res, next) {
        if (req.body.transaction === "check_passwordLogin") {
            console.log("req.body")
            console.log(req.body)
            User.findOne({email:req.body.UserEMail}).exec((err, response) => {
                  console.log(response)
                if (response) {
                    console.log(response.password)
                    var hashedPassword = response.password
                   bcrypt.compare(req.body.password,hashedPassword,(bErr, bResult) => {
                        if(bResult){
                        console.log('tu est connecter');
                        console.log(response.role);
                        res.send(response.role)        
                        }else{ console.log("mot de passe invalide");}})
        
                      }else{ 
                    res.end(JSON.stringify("email incorrect"));
                    console.log("Email  incorrect");}
                })
            }
 
        },

//enregistrer un nouveau user  
router.post('/register_user', function(req, res, next) {
        console.log("req.body")
        console.log(req.body)
        if (req.body.transaction === "register_user") {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {return res.status(500).send({msg: err});} 
              else {
                let hashedPassword = hash  
                console.log("hashedPassword: "+hashedPassword);
            
                const user = new User({
                      username: req.body.username,
                      email: req.body.userEMail,
                      role:req.body.role,
                      password: hashedPassword,
                      
                    });
                    user.save((err, user) => {
                      if (err) {
                        res.status(500).send({ message: err });
                      
                      }else{console.log("vous etes enregistrer")}
                })
     
            }})
          
          }}),


//enregistrer un nouveau model 
router.post('/register_model', function(req, res, next) {
        console.log("req.body")
        console.log(req.body)
          const model = new Model({
                      auteur: req.body.auteur,
                      titre: req.body.titre,
                      details:req.body.details,
                      pulie: req.body.publie,
                      mail:req.boby.mail
                      
                    });
                    model.save((err, user) => {
                      if (err) {
                        res.status(500).send({ message: err });
                      
                      }else{console.log("model enregistrer")}
                })
     
            }),
          
         

        
//Recuperation du mot de passe oublie
router.post('/resetpassword', function(req, res, next) {
  console.error(req.body.UserEMail);
    var date = new Date();       
    var passwordg = generator.generate({
        length: 10,
        numbers: true
    });
   
    bcrypt.hash(passwordg, 8, (err, hash) => {
        if (err) {return res.status(500).send({msg: err});} 
        else {
            let hashedPassword = hash 
            User.findOneAndUpdate({email:req.body.UserEMail},{$set:{password:passwordg}}, function (err, doc) {
              if(err){
                console.log("ya une erreur");}
              console.log(doc);}); 
              console.log("hashedPassword: "+hashedPassword);

        }            
    });
   
    var smtpTransport = mailer.createTransport("smtps://crop2ml%40gmail.com:"+encodeURIComponent('crop2ml2020') + "@smtp.gmail.com:465"); 
      var mail = {
       
        from: 'crop2ml@gmail.com',
        to: req.body.UserEMail,
        subject: 'Mot de passe oublié',
        // HTML body
        html: `<p><b>Bonjour   </b></p><br>
        <p> Votre mot de passe a bien été réinitialisé le `+date+`</p>
        <p> votre nouveau mot de passe est:<b>  `+passwordg+`</b></p><br>
        <p><b>IMPORTANT </b>: Ce mot de passe vous permet de vous connecter à l'application CROP2ML.
        Nous vous invitons à le personnaliser lors de votre prochaine connexion.</p><br>
        <p>Cordialement</p><br>
        <p><b>Merci de ne pas répondre à ce message qui est généré automatiquement.</b></p>`,}
      
      smtpTransport.sendMail(mail, function(error, response){
        if(error){
          console.log("Erreur lors de l'envoie du mail!");
          console.log(error);
        }else{
          console.log("Mail envoyé avec succès!")
        }
        smtpTransport.close();
      });

}),       
        
 //envoyer un mail (Contact)
router.post('/sendMail', function(req, res, next) {
  console.error(req.body);
    var date = new Date();
   
    var smtpTransport = mailer.createTransport("smtps://crop2ml%40gmail.com:"+encodeURIComponent('crop2ml2020') + "@smtp.gmail.com:465"); 
      var mail = {
       
        from: 'crop2ml@gmail.com',
        to: "ouailamin84@gmail.com",
        subject: "Contact Crop2ml",
        // HTML body
        
        html: `<p> Mail envoyé le `+date+`</p>
        
          <p><b>Bonjour Cyril   </b></p><br><br>
          <p> Nom du l'emetteur : `+req.body.emetteur +`</p>
          <p> Mail du l' emetteur : `+req.body.mailEmetteur +`</p>
          <p> Sujet : `+req.body.sujet +`</p><br><br>
        <p> `+req.body.contenuMail +`</p>
        
        <p>Cordialement.</p><br>
        
        
        CROP2ML.`,
      }
      
      smtpTransport.sendMail(mail, function(error, response){
        if(error){
          console.log("Erreur lors de l'envoie du mail!");
          console.log(error);
        }else{
          console.log("Mail envoyé avec succès!")
        }
        smtpTransport.close();
      });

}), 

//verification que l'utilisateur est dans la table users
router.post('/login', function(req, res, next) {
  if (req.body.transaction === "select_useremail"){
    User.findOne({email:req.body.UserEMail}).exec((err, response) => { 
     if(response){
      console.log(response);
      return res.json(res)

     }else {console.log("user n'existe pas")}

  })
}
}),


//recuperation touts les utilisateurs
router.post('/users',function(req, res, next) {
  console.log("generale: " + req.body.transaction + req.body.userRole)
  
  if(req.body.transaction === "users"){
    console.log("all: " + req.body.userRole)
    User.find({role:req.body.userRole}).exec((err, response) => {
      res.end(JSON.stringify(response));
      console.log("liste total"+response)
    });}
    
  else{
    console.log("admin: " +req.body.userRole)
    User.find({role:req.body.userRole}).exec((err, response) => {
      if(response){
        console.log("liste des admin :" + response);
        res.end(JSON.stringify(response));

      }
  })
}}),

//recuperation de touts les models
router.get('/allmodels',function(req, res, next) {
  try {
    Model.find((err,documents) => {
      res.end(JSON.stringify(documents));
    });
  }
  catch(e){
    console.log("Erreur sur /users: " + e);
    res.end(JSON.stringify([]));
  }
  
}),

//recuperation des  models validé ou non valide
router.post('/models',function(req, res, next) {

  console.log(req.body)
  try {
    Model.find({publie:req.body.publie}).exec((err, response) => { 
      console.log("req.body :"+ req.body.publie)
      console.log("response :"+ response)
      res.end(JSON.stringify(response));
    });
  }
  catch(e){
    console.log("Erreur sur /all models: " + e);
    res.end(JSON.stringify([]));
  }
  
}),
    
//recuperation des models valider(publier)
router.get('/publishedmodels',function(req, res, next) {
  try {
    Model.find({publie:true}).exec((err, response) => { 
      console.log(response)
      res.end(JSON.stringify(response));
    });
  }
  catch(e){
    console.log("Erreur sur /publishedmodels: " + e);
    res.end(JSON.stringify([]));
  }
  
}),   

//verification si le mail est dans la table auth + ajout
router.get('/checkAuth',function(req, res, next) {
  console.log("req.body:"+req.body)
  if (req.body.transaction = "select_passwordRequireAuth"){
    UserAuth.findOne({email:req.body.UserEMail}).exec((err, response) => { 
      if(response){
      console.log(response)
      res.end(JSON.stringify(response));}else{console.log("mail existe pas dans la table auth")}
    });}

  if (req.body.transaction = "insert_userEmail"){
    const userAuth = new UserAuth({
      username: req.body.username,
      email: req.body.userEMail,
      role:req.body.role,
      password: req.body.password,
      passwordRequire:req.body.passwordRequire,});
      
      userAuth.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      
      }else{console.log("mail enregistrer a auth")}
    })
 
}}),

//verification si le mot de passe est exigé
router.get('/checkpasswordRequire',function(req, res, next) {
  console.log("req.body:"+req.body)
  try {
    UserAuth.findOne({email:req.body.UserEMail}).exec((err, response) => { 
      if(response){
        console.log("checkpasswordRequire response:" +response)
        if(response.passwordRequire == 1){
          res.end(JSON.stringify(1));
        }
        if(response.passwordRequire == 0){
          res.end(JSON.stringify(0));}
      }else{console.log("mail n'éxiste pas dans la table auth")}
    });
  }
  catch(e){
    console.log("Erreur sur //checkAuth " + e);
   // res.end(JSON.stringify([]));
  }  
}),

//verification passwordRequire
router.get('/checkpasswordRequire',function(req, res, next) {
  console.log("req.body:"+req.body)
  try {
    UserAuth.findOne({email:req.body.UserEMail}).exec((err, response) => { 
      if(response){
        console.log("checkpasswordRequire response:" +response)
        if(response.passwordRequire == 1){
          res.end(JSON.stringify(1));
        }
        if(response.passwordRequire == 0){
          res.end(JSON.stringify(0));}
      }else{console.log("mail existe pas dans la table auth")}
    });
  }
  catch(e){
    console.log("Erreur sur //checkAuth " + e);
   // res.end(JSON.stringify([]));
  }  
}),

//recherche par titre /auteur
router.post('/search',function(req, res, next) {
  console.log("req.body:"+req.body.recherche)
  console.log("req.body:"+req.body.transaction)
  console.log("req.body:"+req.body.recherchee)
  if(req.body.transaction == "recherche par titre"){
    console.log("req.body titre:"+req.body.recherchee)
  try {
    Model.find({titre:req.body.recherchee}).exec((err, response) => { 
      if(response){
        console.log("search:" +response)
        res.end(JSON.stringify(response));
        
      }else{console.log("ce titre n'existe pas")}
    });
  }
  catch(e){
    console.log("Erreur sur //checkAuth " + e);
   // res.end(JSON.stringify([]));
  } }
  
  else{
    console.log("req.body auteur:"+req.body.recherchee)
    try {
      Model.find({auteur:req.body.recherchee}).exec((err, response) => { 
        if(response){
          console.log("search:" +response)
          res.end(JSON.stringify(response));
          
        }else{console.log("ce titre n'existe pas")}
      });
    }
    catch(e){
      console.log("Erreur sur //checkAuth " + e);
     // res.end(JSON.stringify([]));
    }
  }
}),


router.post('/addAdmin',function(req, res, next) {
  console.log("req.body:"+req.body.UserEMail)

  try {
    User.findOneAndUpdate({email:req.body.UserEMail},{$set:{role:"admin"}}, function (err, doc) {
      if(doc){
        console.log("search:" +doc)
        res.end(JSON.stringify(doc));
        
      }else{console.log("eru")}
    });
  }
  catch(e){
    console.log("Erreur sur //checkAuth " + e);
   // res.end(JSON.stringify([]));
  } }),
  
  //recuperation des models pour un user 
  router.post('/userModels',function(req, res, next) {
    console.log("req.body:"+req.body.userEMail)
  
    try {
      Model.find({email:req.body.userEMail}, function (err, doc) {
        if(doc){
          console.log("user models:" +doc)
          res.end(JSON.stringify(doc));
        }else{console.log("ya pas de models pour ce user")}
      });
    }
    catch(e){
      console.log("Erreur sur //checkAuth " + e);
     // res.end(JSON.stringify([]));
    } }),
        
  
router.post('/getShowModel',function(req, res, next) {

      console.log(req.body)
      try {
        Model.find({titre:req.body.titre}).exec((err, response) => { 
          console.log("req.body :"+ req.body.publie)
          console.log("response :"+ response)
          res.end(JSON.stringify(response));
        });
      }
      catch(e){
        console.log("Erreur sur /all models: " + e);
        res.end(JSON.stringify([]));
      }
      
    }),      
        
        
        
        
        
        )})
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports =router;