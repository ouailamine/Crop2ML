<template>
  <div>
    <mdb-navbar position="top" dark transparent scrolling>
      <mdb-navbar-brand href="#">CROP2ML</mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item href="#description" waves-fixed>Description</mdb-nav-item>
          <mdb-nav-item href="#contact" waves-fixed>contact</mdb-nav-item>
          <mdb-nav-item href="#" waves-fixed>lien1</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
  
    

    <div style="height: 100vh">
      <div class="view intro-2" style="height: 100vh">
        <div class="full-bg-img">
          <div class="mask rgba-purple-light">
            
             
                <h2 style="color:white;margin-top:150px;"> CROP2ML </h2>
                <p style="color:white;">
                  Description.....
                </p>
              
            <mdb-btn gradient="aqua" @click.native="showModal1 = true" class="my-3" rounded>Mode d'emploie</mdb-btn>
            <mdb-btn gradient="aqua" @click.native="showModal2 = true" class="my-3" rounded>Login</mdb-btn>
            <mdb-btn gradient="aqua" @click="continueToNextStep()" class="my-3" rounded>Visiteur</mdb-btn>
            
          </div>
        </div>
      </div></div>
<div id="description">
      <h2 class="h1-responsive font-weight-bold text-center my-5">Description</h2>
      <p class="m-5">
          L'application Crop2ml est à l'initiative de .. (porteur du projet).
          <b>Pour toute information contactez </b>.
          Cette aplication a bénéficié du développement de la cellule d'appui en informatique
          de l'institut de convergence <a href="https://www.hdigitag.fr/fr/" target="_blank"> #Digitag</a>. 
          L'application a été développée par Vincent Armant et Amine Ouail à la demande de .......
         </p>
      
    </div>
      <mdb-modal
      :show="showModal1"
      @close="showModal1 = false"
      scrollable
      removeBackdrop
    >
      <mdb-modal-header>
        <mdb-modal-title>Mode d'emploie</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body v-mdb-scroll-lock.y>
       <h5>Guide d'utilisation  </h5>

        
          
        <router-link to="/map" class="nav-link">Carte</router-link>
        <p>
          La carte permet de localiser par des icones à la fois : a) les parcelles observées par l'utilisateur 
          et b) les parcelles pour lesquelles l'utilisateur est destinataire d'un partage d'observations.<br/>
          <b> * Sélectionner une campagne, une semaine et une parcelle d'intéret </b> à l'aide des menus de controles situé en haut de pages pour  recentrer la carte sur . <br/>
          
          <b> * Accéder aux informations résumés sur la croissance des  </b>  en cliquant sur l'icone représentant la parcelle.
          Chaque icone localisée sur la carte prend une couleur du vert pale au vert foncé en fonction
          de son indice de croissance, ou grise si il n y a pas d observations.<br/>
          
          
          <b> * Comparer la croissance des  de la campagne précédente</b> en passant le curseur sur le bouton campagne précédente. <br/>
          
          <b> * Visualiser les indicateurs de croissance de la parcelle </b> pour la semaine et la campagne séletionnées, dans le panneau de droite.
          Ces indicateurs de croissance  proviennent de l'application  Vigne et sont instantannément recalculés en fonction des nouvelles données mises-à-jour par l'utilisateur.
        </p>

        <router-link  to="/edit" class="nav-link">Editer</router-link>

        <p>
          Cette fonctionnalité permet d'ajouter ou de <b> mettre à jour le résumé des observations  sur l'état des  </b>  collectées dans les parcelles.
          Les informations mises à jour peuvent concerner à la fois, les résumés d'observations collectées par l'utilisateur, ou encore
          les résumés d'observations reçus d'autres utilisateurs.
          Les mises à jour effectuées par un utilisateur sur les résumés d'observations collectés ou reçus restent locales à l'utilisateur.
          Ces mises à jour ne sont visibles que par l'utilisateur et ne suppriment, ni les observations collectées par l'utilisateur, ni les observations partagées par un autre utilisateur.
          En cliquant sur Réinitialiser, tout utilisateur a la posibilité d' <b> effacer ses mises à jour afin de retrouver les résumés d'observations initialement collectées </b>.
        </p>
        <router-link  to="/partage" class="nav-link">Partager</router-link>

        <p> 
          La fonctionnalité de partage permet de <b>  partager les observations collectées par un utilisateur sur une parcelle  avec un autre utilisateur </b> .
          Les observations partagées ne concernent que le résumé des observations collectées sur le terrain par l'utilisateur avec l'application  Vigne.
          Le partage ne concerne pas les mises à jour de résumés qui eux restent locales à la session d'un utilisateur.
          Afin de controler le partage d'observations entre utilisateurs, un utilisateur ne peut partager que les résumés des observations qu'il a lui meme collecté.
          Un utilisateur ne peut pas re-partager les résumés d'observations qu'il a reçu d'un autre utilisateur.
          Un utilisateur peut décider d'<b>arrêter le partage des informations sur une parcelle avec un autre utilisateur </b> en cliquant sur supprimer.
          
        </p>

        <router-link  to="/partage" class="nav-link">Exporter</router-link>
        
        <p>
          Cette fonctionalité permet d'exporter au format pdf ou csv les résumés d'observations collectés et reçus par l'utilisateur.
          <b>Les résumés d'observations se composent les indicateurs de croissances des  et de contraintes hydriques d'une campagne sélectionnée </b>.
          L'export de données présente en plus dans un tableau récapitulatif contenant la valeur de tous les indicateurs calculés pour chaque semain de la campagne.
        </p>
         
        <router-link  to="/profil" class="nav-link">Authentification</router-link>

        
        <p>
          Cette fonctionalité accompagne le partage des résumés d'observations collectées par les utilisateurs.
          Elle permet aux utilisateurs qui le souhaitent de <b>protéger l'accès à leurs données </b> par un mot de passe.
        </p>
        


        <h5>Contributeurs</h5>

        <p>
          L'application   est à l'initiative de   (porteur du projet).
          <b>Pour toute information contactez leo.pichon@supagro.fr</b>.
          Cette aplication a bénéficié du développement de la cellule d'appui en informatique
          de l'institut de convergence <a href="https://www.hdigitag.fr/fr/" target="_blank"> #Digitag</a>. 
          L'application a été développée par Vincent Armant et Amine Ouail à la demande de   et Guilhem Brunel.
         
        </p>
       
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="primary" @click.native="showModal1 = false"
          >Fermer</mdb-btn
        >
      </mdb-modal-footer>
    </mdb-modal>

    
    
    
    <mdb-modal
      :show="showModal2"
      @close="showModal2 = false"
      scrollable
      removeBackdrop
    >
      
  
        <mdb-modal-header>
        <mdb-modal-title ><mdb-icon icon="user" class="mr-1"/> Login</mdb-modal-title>
      </mdb-modal-header>
          <mdb-model-body class="mx-4">
            <div class="text-center"> 
           
            <mdb-input  v-model="EMail" label="Votre email" type="email" containerClass="mb-0"/>
            <mdb-input  v-model="password" label="Mot de passe" type="password" containerClass="mb-0"/>
            <p class="font-small blue-text d-flex justify-content-end pb-3"> <a href="#/resetp" class="blue-text ml-1"> Mot de passe oublier?</a></p>
            <div class="text-center mb-3">
              <mdb-btn type="button" @click="login" gradient="blue" rounded class="btn-block z-depth-1a">Se connecter</mdb-btn>
            </div></div>
            <h6>Pas membre? 
            <mdb-btn gradient="aqua" @click.native="showModal3 = true ,showModal2 = false" class="my-3" rounded>S'enregistrer</mdb-btn></h6>
          </mdb-model-body>
          <mdb-modal-footer>
            
          <mdb-btn color="primary" @click.native="showModal2 = false">Fermer</mdb-btn>
          </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal
      :show="showModal3"
      @close="showModal3 = false"
      style="margin-top:20px"
      scrollable
      removeBackdrop
    >
      
      <mdb-modal-header>
        <mdb-modal-title><mdb-icon icon="user-plus" class="mr-1"/> S'enregistrer</mdb-modal-title>
      </mdb-modal-header>
      <mdb-model-body class="mx-4">
        <form>
          <div class="grey-text">
           <mdb-input  v-model="username"  label="votre nom"  type="text"/> 
            <mdb-input v-model="EMail" label="votre email"  type="email"/>
            <!-- <mdb-input v-model="Role" label="" type="text"/> -->
            <mdb-input v-model="EMailConf" label="Confirmer votre email"  type="text"/>
            <mdb-input v-model="password" label="votre mot de passe"  type="password"/>
            <mdb-input v-model="passwordConf" label="Confirmer votre mot de passe"  type="password"/>
          </div>
        </form><br>
        <div>
            <mdb-btn color="primary" @click="register()"><mdb-icon icon="paper-plane" class="ml-1"/>Register</mdb-btn>
            <mdb-btn color="primary" @click.native="showModal3 = false">Fermer</mdb-btn>
        </div>
      </mdb-model-body>
      
    

      
    </mdb-modal>
  
  <mdb-container id="contact">
   <section class="my-5">
      <h2 class="h1-responsive font-weight-bold text-center my-5">Contact</h2>
      <p class="text-center w-responsive mx-auto pb-5">Nous répondrons dès que possible à toutes vos demandes.</p>
      <mdb-row>
        <mdb-col lg="5" class="lg-0 mb-4">
          <mdb-card>
            <mdb-card-body>
              <div class="form-header blue accent-1">
                <h3 class="mt-2"><mdb-icon icon="envelope" /> Contactez-nous</h3>
              </div>
              <div class="md-form">
                <mdb-input v-model="emetteur" icon="user" label=" Votre nom" iconClass="grey-text" type="text" id="form-name" />
              </div>
              <div class="md-form">
                <mdb-input v-model="mailEmetteur"  icon="envelope" label=" Votre email" iconClass="grey-text" type="text" id="form-email" />
              </div>
              <div class="md-form">
                <mdb-input v-model="sujet" icon="tag" label="Sujet" iconClass="grey-text" type="text" id="form-subject" />
              </div>
              <div class="md-form">
                <mdb-textarea v-model="contenuMail" icon="pencil" label="Votre message" iconClass="grey-text" id="form-text" />
              </div>
              <div class="text-center">
                <mdb-btn color="light-blue" @click="sendMail()">Envoyer</mdb-btn>
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col lg="5">
          <div id="map-container" class="rounded z-depth-1-half map-container" style="height: 390px;margin-top:10px;">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d76765.98321148289!2d-73.96694563267306!3d40.751663750099084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1525939514494" width="100%" height="100%" frameBorder="0" style="border: 0"></iframe>
          </div>
          <br/>
         </mdb-col>
          <mdb-col lg="2" class="text-center" style="margin-top:40px;">
          <ul class="list-unstyled mb-0">
            <li>
              <mdb-icon icon="map-marker" size="2x" class="blue-text"/>
              <p>Montpellier,France</p>
            </li>
            <li>
              <mdb-icon icon="phone" size="2x" class="blue-text mt-4"/>
              <p>+ 00 00 00 00 00</p>
            </li>
            <li>
              <mdb-icon icon="envelope" size="2x" class="blue-text mt-4"/>
              <p>contact@example.com</p>
            </li>
          </ul>
        </mdb-col>
        </mdb-row>
    </section>
  </mdb-container>
  

    <mdb-footer color="stylish-color-dark" class="page-footer font-small pt-4 mt-4">
    <mdb-container class="text-left">
      <mdb-row>
        <mdb-col md="3">
        <a href= "https://www.montpellier-supagro.fr/ " target="_blank" class="btn-floating btn-sm btn-fb mx-1" ><i><img style="max-width: 400%" src="images/logoLInstitutAgro-MontpellierSupAgro.png"></i></a>
        
        </mdb-col>
        <hr class="clearfix w-100 d-md-none" />
        <mdb-col md="3">
          <a href= "https://www.hdigitag.fr/fr/ " target="_blank" class="btn-floating btn-sm btn-fb mx-1" ><i><img src="images/logoDigitAg-reserve.png" ></i></a>
        
        </mdb-col>
        <hr class="clearfix w-100 d-md-none" />
        <mdb-col md="3">
         <a href="http://www.inrae.fr" target="_blank" class="btn-floating btn-sm btn-fb mx-1"><i><img src="images/Logo-INRAE_Transparent.png"  target="_blank"></i></a>
       
        </mdb-col>
        <hr class="clearfix w-100 d-md-none" />
        <mdb-col md="3">
           <a href= "https://muse.edu.umontpellier.fr/" target="_blank" class="btn-floating btn-sm btn-fb mx-1"><i><img src="images/Logo_MUSE.png"></i></a>
      
        </mdb-col>
      </mdb-row>
    </mdb-container>
    
    <hr />
    <div class="text-center">
      <ul class="list-unstyled list-inline">
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-fb mx-1"><i class="fab fa-facebook"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-tw mx-1"><i class="fab fa-twitter"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-gplus mx-1"><i class="fab fa-google-plus"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-li mx-1"><i class="fab fa-linkedin-in"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-dribbble mx-1"><i class="fab fa-dribbble"> </i></a></li>
      </ul>
    </div>
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid>
        Copyright &copy; 2020: <a href="https://inrae.fr" target="_blank">  www.inrae.fr </a> | <a href="https://www.hdigitag.fr/fr/" target="_blank"> www.hdigitag.fr</a> et <a  href="#/legalMentions" target="_blank">  Mentions Légales | Crédits | Confidentialité</a>
      </mdb-container>
    </div>
  </mdb-footer>
  </div>
</template>

<script>
import CropDataServices from "../services/CropDataServices";
  import {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbFooter,
      mdbContainer,
      mdbRow,
      mdbCol,
    mdbNavbarBrand,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbScrollLock,
    mdbIcon, mdbInput, mdbTextarea,mdbCard, mdbCardBody
      
  } from "mdbvue";
  export default {
    name: "NavigationPage",
    components: {
      mdbIcon, mdbInput, mdbTextarea, mdbCard, mdbCardBody,
      mdbBtn,
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbNavbar,
      mdbNavItem,
      mdbNavbarNav,
      mdbNavbarToggler,
       mdbFooter,
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbNavbarBrand
    },
    data() {
      return {
        Role:"",
        emetteur:"",
        mailEmetteur:"",
        sujet:"",
        contenuMail:"",
        EMailConf:"",
        passwordConf:"",
        username:"",
      EMail: "",
      msg: "",
      message: "",
      password: "",
      activedNavbar: "",
      mailpresent: "",
      PasswordRequire: "",
      authorizedToContinue:"",
      userInfo: null,
    
        showModal1: false
        ,showModal2: false
        ,showModal3: false
      };
    },
    directives: { mdbScrollLock },
    methods: {

      async login() {
      try {
        let password = this.password;
        let loggedUserEmail = this.EMail;
        await this.initLoggedUserIfNeeded(loggedUserEmail)
        this.message =""
         console.log("password");
        console.log(password);

        this.authorizedToContinue = await CropDataServices.checkPassword(password, loggedUserEmail)
       console.log(this.authorizedToContinue)
        if (this.authorizedToContinue == 'user') {
          console.log(this.authorizedToContinue)
          this.$bvToast.toast('mot de passe valide', {
          title: `Notification`,
          solid: true,})
          console.log("Routing to user");
          this.$router.push("/user");
          
        } 

        else if (this.authorizedToContinue == 'admin') {
          console.log(this.authorizedToContinue)
          this.$bvToast.toast('mot de passe valide', {
          title: `Notification`,
          solid: true,})
          console.log("Routing to admin");
          this.$router.push("/admin");
          
        } 

        else if (this.authorizedToContinue == 'developper') {
          console.log(this.authorizedToContinue)
          this.$bvToast.toast('mot de passe valide', {
          title: `Notification`,
          solid: true,})
          console.log("Routing to admin");
          this.$router.push("/admin");
          
        } 
        
        else {
          this.$bvToast.toast('mot de passe  non valide', {
          title: `Notification`,
          solid: true,})
          console.log("mot de passe non valide");
        } 
      } catch (error) {
        this.error = error.message;
      }
    },
 async initLoggedUserIfNeeded(loggedUserEmail){
     
        this.$store.commit("initLoggedUserEmail", loggedUserEmail);
      },
    async register() {

      if(this.EMail == this.EMailConf){
        if(this.password==this.passwordConf){
        
              let password = this.password;
              let loggedUserEmail = this.EMail;
              let username = this.username
              //let role =  this.Role
              this.message =""
              
              console.log("loggedUserEmail:",loggedUserEmail);
              console.log("username:",username);
              console.log("password:",password);

                this.authorizedToContinue = await CropDataServices.register_user(loggedUserEmail,username,password)
                if (this.authorizedToContinue ) {
                  this.message = "user enregistrer";
                  console.log("Routing to accueil");
                  this.$router.push("/");}
                else {
                  console.log("user nn enregistrer");
                  this.message = "user nn enregistrer";}}
        else{console.log("les deux mot de passe ne sont pas pareil")
             this.$bvToast.toast('les deux mot de passe ne sont pas pareil', {
             title: `Notification`,
             solid: true,})}}          
      else{console.log("les deux email ne sont pas pareil")
             this.$bvToast.toast('les deux email ne sont pas pareil', {
             title: `Notification`,
             solid: true,})}    
        
      }, 
    
async continueToNextStep() {
        console.log("Routing visiteur");
        this.$router.push("/visiteur");},

async sendMail() {
 
        let emetteur= this.emetteur;
        let mailEmetteur= this.mailEmetteur ;
        let sujet = this.sujet;
        let contenuMail= this.contenuMail 
      
console.log(emetteur,mailEmetteur,sujet,contenuMail)
       await CropDataServices.sendMail(emetteur,mailEmetteur,sujet,contenuMail)
       
          
    }},
        
        
        
        
        
        
        
        
        
        
        };
 
</script>

<style scoped>
  .view {
    background: url("https://cdn.pixabay.com/photo/2016/08/22/14/34/vineyard-1612092_960_720.jpg")
      no-repeat center center;
    background-size: cover;
    height: 100%;
  }

 

  img{width: 100px;}
img {
  border-radius: 5%;}


  .form-elegant .font-small {
    font-size: 0.8rem; }

  .form-elegant .z-depth-1a {
    -webkit-box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25);
    box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25); }

  .form-elegant .z-depth-1-half,
  .form-elegant .btn:hover {
    -webkit-box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15);
    box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15); }



  .navbar .dropdown-menu a:hover {
    color: inherit !important;}
  
  </style>