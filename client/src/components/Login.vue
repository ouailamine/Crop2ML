<template>
<div>
  <mdb-modal>
          <mdb-model-body class="mx-4">
            <div class="text-center"> 
           
            <mdb-input label="Votre email" type="email" containerClass="mb-0"/>
            <mdb-input label="Mot de passe" type="password" containerClass="mb-0"/>
            <p class="font-small blue-text d-flex justify-content-end pb-3">Oublier <a href="#" class="blue-text ml-1"> Mot de passe?</a></p>
            <div class="text-center mb-3">
              <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a">Se connecter</mdb-btn>
            </div></div>
            <p class="font-small grey-text d-flex justify-content-end">Pas membre?</p> 
            <mdb-btn gradient="aqua" @click.native="showModal3 = true ,showModal2 = false" class="my-3" rounded>S'enregistrer</mdb-btn>
          </mdb-model-body>
    </mdb-modal>
  </div>
</template>
<script>
import {
  mdbInput,
     
      mdbBtn,
      mdbModal,
     
      
  } from "mdbvue";
import CropDataServices from "../services/CropDataServices";
export default {
  components: {
     mdbInput,
    
      mdbBtn,
      mdbModal,
      
     
    },
  data() {
    return {
     
      EMail: "",
      msg: "",
      message: "",
      password: "",
      activedNavbar: "",
      mailpresent: "",
      PasswordRequire: "",

      authorizedToContinue:false,
      userInfo: null
    };
  },

  methods: {
    async continueToNextStep() {
      if (this.EMail === "") {

        let loggedUserEmail = "visiteur.demo@apex-territoire.fr"; // baptiste.oger@supagro.fr visiteur.demo@apex-territoire.fr
        this.authorizedToContinue =true

        this.$store.commit("initDemoUserEmail", loggedUserEmail);
        await this.initLoggedUserIfNeeded(loggedUserEmail)
        await this.loadUserData(loggedUserEmail);

        console.log("Routing to map");
        this.$router.push("/map");
      
      } else {
        let loggedUserEmail = this.EMail;

        await this.initLoggedUserIfNeeded(loggedUserEmail)

        // userInfo ={
        //     userEMail:loggedUserEmail,
        //     userName:loggedUserEmail,
        //     userId: -1,
        //     userExistsInUserTable :false,
        //     userExistsInAuthTable: false,
        //     userRequiredPassword:false,
        // };

        if(this.userInfo.userExistsInAuthTable){

          if(!this.userInfo.userRequiredPassword){
            this.authorizedToContinue =true
            await this.loadUserData(loggedUserEmail);
            console.log("Routing to ApexMap");
            this.$router.push("/map");
          }else{
            // document.getElementById("div1").style.display = "none";
            // document.getElementById("p").style.display = "none";
            let PasswordRequire = "true";
            this.$store.commit(
              "initPasswordRequire",
              PasswordRequire
            );
          }
          
        }else{

          if(this.userInfo.userExistsInUserTable){

            // await this.loadUserData(loggedUserEmail)
            // document.getElementById("div1").style.display ="none";
            // document.getElementById("p").style.display = "none";
            let mailpresent = "true";
            this.$store.commit("initmailpresent", mailpresent);
            let mailad = await CropDataServices.mailAddToAuth(loggedUserEmail,this.userInfo.userName)
            if (mailad) {
              console.log(" mail added to authentification");
            } else {
              console.log("WARNING mail NOT added to authentification");
            }
         }else{
           this.msg = "mail inconnu, vérifier que le mail est enregistré dans ApeX Vignes";
         }
        }

      }
    },


    async initLoggedUserIfNeeded(loggedUserEmail){
      if(!this.$store.loggedUserEmail){
        this.$store.commit("initLoggedUserEmail", loggedUserEmail);
      }
      
      if(!this.userInfo){
        this.userInfo = await CropDataServices.getUserInfo(loggedUserEmail);
      }
      
    },

    async loadUserData(loggedUserEmail){

      console.log('loadUserData')

      await this.initLoggedUserIfNeeded(loggedUserEmail)

      console.log('this.userInfo')
      console.log(this.userInfo)

      let tmpUserDataObj = new CropDataServices.MonitoredUser(
        this.userInfo.userEMail,
        this.userInfo.userId,
        this.userInfo.userName
      );

      console.log('tmpUserDataObj after userInfo')
      console.log(tmpUserDataObj)

      await CropDataServices.addParcelObservations(tmpUserDataObj);


      console.log('tmpUserDataObj after addParcelObservations')
      console.log(tmpUserDataObj)

      await CropDataServices.addSharedParcelObservations(tmpUserDataObj);

      console.log('tmpUserDataObj after addSharedParcelObservations')
      console.log(tmpUserDataObj)


      await CropDataServices.addInitializedWeekMetrics(tmpUserDataObj);

      console.log('tmpUserDataObj after addInitializedWeekMetrics')
      console.log(tmpUserDataObj)


      CropDataServices.addWeeksToUserDataObj(tmpUserDataObj);
      CropDataServices.enforceConsistencyOfUserDataObj(tmpUserDataObj);
      CropDataServices.sortUserDataObjByYearByWeek(tmpUserDataObj);

      this.$store.commit("initUserDataObj", tmpUserDataObj);

      console.log("updated $store.state.userDataObj: ");
      console.log(this.$store.state.userDataObj);

      await this.$store.dispatch("initUserModifiedWeekMetrics")
      
      this.$store.commit("initActivedNavbar", "true");

    },

    

    async Non() {
      let loggedUserEmail = this.EMail;
      this.authorizedToContinue =true
      await this.loadUserData(loggedUserEmail)
      console.log("Routing to ApexMap");
      this.$router.push("/map");
      
    },

    async Oui() {
      let loggedUserEmail = this.EMail;
      this.authorizedToContinue =true
      await this.loadUserData(loggedUserEmail)
      console.log("Routing to addpsw");
      this.$router.push("/addpsw");
    },

    async login() {
      try {
        let password = this.password;
        let loggedUserEmail = this.EMail;
        this.message =""
        // console.log("password");
        // console.log(password);

        this.authorizedToContinue = await CropDataServices.checkPassword(password, loggedUserEmail)
        if (this.authorizedToContinue ) {
           this.message = "mot de passe valide";
          await this.loadUserData(loggedUserEmail)
          console.log("Routing to ApexMap");
          this.$router.push("/map");
          
        } else {
          console.log("mot de passe non valide");
          this.message = "mot de passe non valide";
        }
          
        
      } catch (error) {
        this.error = error.message;
      }
    },
  },
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
