<template>
      <div>
          
          <div>
              <hr>
              <h3 style="background-color:grey">Bonjour {{ $store.state.loggedUserEmail }}</h3>
              <hr>
          </div>

          <div>
              <h3>Recherche</h3><br>
              <form style="text-align:center;">
              <label >Par Titre<input type="radio"  checked="checked" name="radio" v-model="variable" value='titre'/><span class="checkmark"></span></label>
              <label >Par Auteur<input type="radio" name="radio" v-model="variable" value='auteur'><span class="checkmark" ></span></label><br>
             <center> <mdb-input  type="text" label="un auteur ou un titre" outline v-model="recherchee" style="width:40%;"/></center>
              <b-button size="sm" variant="secondary" @click="rechercheModels()" >recherche</b-button><br>
              </form>
          </div>

          <hr>
          <div>
              <h5><b>Liste des models</b></h5>
              <b-button size="sm" variant="secondary" @click="getModels()">Afficher</b-button>
              <h5><b>Ma Liste des models</b></h5>
              <b-button size="sm" variant="secondary" @click="getMyModels()">Ma liste des models</b-button>
          </div>
          <hr>
          <div v-if="this.models !== []" id="listModels">
              <mdb-container style="align:center" >
                  <div  class="row">
                    <div class="col-md-4">
                      <mdb-card  wide v-for="(model, index) in models" :key="index" style="margin:20px;" >
                        <mdb-view gradient="peach" cascade>
                          <h2 class="card-header-title mb-3">{{model.titre}}</h2>
                          <mdb-btn size="sm" @click="showDetails(model.titre)" gradient="blue" rounded><mdb-icon icon="angle-double-right" />Details</mdb-btn>
                        </mdb-view>
                      </mdb-card>
                    </div>
                    <div id="details" style="display:none;height:100%;width:100%;" class="col-md-8" >
                        <mdb-view gradient="peach" cascade  v-for="(modele, index) in showModels" :key="index"  class="text-center"  >
                          <mdb-card-text>
                           <h2 class="card-header-title mb-3">{{modele.titre}}</h2>
                          <p class="mb-0"> L'auteur : {{ modele.auteur }}</p>
                          <p class="mb-0"> Mail auteur : {{ modele.mail }}</p>
                          {{modele.details}} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, ex, recusandae. mdbIconcere modi sunt, quod quibusdam dignissimos neque rem nihil ratione est placeat vel, natus non quos laudantium veritatis sequi.Ut enim ad minima veniam, quis nostrum.</mdb-card-text>
                          <mdb-btn tag="a" gradient="blue" floating size="sm" @click="closeDetails">Fermer</mdb-btn>
                        </mdb-view>
                    </div>
                  </div><br>
              </mdb-container>
          </div>
          <hr>
      </div>
</template>

<script>

import CropDataServices from "../services/CropDataServices";
  import { mdbContainer,mdbInput, mdbRow, mdbCol, mdbCard, mdbCardImage, mdbCardHeader, mdbCardBody, mdbCardTitle, mdbCardText, mdbCardFooter, mdbCardUp, mdbCardAvatar, mdbCardGroup, mdbBtn, mdbView, mdbMask, mdbIcon } from 'mdbvue';
  export default {
    name: 'CardProPage',
		components: {
			mdbContainer,
			mdbRow,
			mdbCol,
			mdbCard,
			mdbCardImage,
			mdbCardHeader,
			mdbCardBody,
			mdbCardTitle,
			mdbCardText,
			mdbCardFooter,
			mdbCardUp,
			mdbCardAvatar,
			mdbCardGroup,
			mdbBtn,
			mdbView,
			mdbMask,
			mdbIcon,mdbInput,
    },
    data() {
      return {
        showModels: [],
        models: [],
         users: [],
         publie:"",
         variable:'',
         recherchee:'',
         message:''
         ,msg:"",userRole:"",
       
      }
    },

async created(){},
     
methods: {
  
 async getModels() {

    document.getElementById('listModels').style.display='block';
    
      CropDataServices.getAllmodels().then(response => {
        this.models= response.data;
        console.log(response.data);
        console.log(this.models);
        })
   
      },
  
 async getMyModels() {

var userEMail = this.$store.state.loggedUserEmail
console.log(userEMail)
    
    
      CropDataServices.getMyModels(userEMail).then(response => {
        this.models= response.data;
        console.log(response.data);
        console.log(this.models);
        })
   document.getElementById('listModels').style.display='block';
      },
  

 rechercheModels() {
   console.log(this.recherchee)
    console.log(this.variable)
  if(this.variable === ''){
        this.$bvToast.toast('il faut choisir ', {
          title: `Notification`,
          variant:this.variable,
          solid: true,})
     
  }else{
    var recherche = this.variable
    console.log(recherche)
    var recherchee = this.recherchee
    console.log(recherchee)
    if(this.variable === 'titre') {
        var transaction = "recherche par titre"
        var titre = this.recherchee
        CropDataServices.search(recherche,transaction,titre).then(response => {
           if(response.data.length > 0){
                this.models= response.data;
                console.log(response.data);
                console.log(this.models);}
          else{  
            console.log("elsetitre")
            this.$bvToast.toast('titre introuvable ', {
          title: `Notification`,
          variant:this.variable,
          solid: true,})}      
                
        })

    }else{
        var transaction = "recherche par auteur"
        var auteur = this.recherchee
        CropDataServices.search(recherche,transaction,auteur).then(response => {
          if(response.data.length > 0){
                this.models= response.data;
                console.log(response.data.length);
                console.log(this.models);}
          else{this.$bvToast.toast('Auteur introuvable ', {
          title: `Notification`,
          variant:this.variable,
          solid: true,})}
              })}
            
            }},

async showDetails(a){
  let titre = a
  console.log(a)
  document.getElementById('details').style.display='block';
  CropDataServices.getShowModel(titre).then(response => {
          this.showModels = response.data;
          console.log(response.data);
          console.log(this.models);
        })},
  
async closeDetails(){document.getElementById('details').style.display='none';},
async checkModels(){document.getElementById('listModels').style.display='none';},

 }
  }
 
</script>

<style scoped>

</style>>