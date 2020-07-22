<template>
  <div class="global">
    
      <hr />
      <h4 class="title" style="background-color:grey">
        Bonjour {{ $store.getters.getDisplayedUserName }}
      </h4>
      <hr />
      
      <!-- User Demo Guide-->
      <div >
        
        <h5>Guide d'utilisation .....</h5>

        
        
          
        <router-link to="/consultation" class="nav-link"><b>Consultation</b></router-link>
        <p style="text-align:center"> A remplir
         </p>

        <router-link  to="/edit" class="nav-link">Creé</router-link>

        <p style="text-align:center"> A remplir
         </p>

        <router-link  to="/modification<" class="nav-link">Modification</router-link>

        <p style="text-align:center"> A remplir
         </p>
        

      </div> 

 
    </div>

</template>

<script>
export default {
  
  name: "Guide",
  

  created() {
   
  },

  mounted() {
   
  },

  methods: {},
};
</script>
<style scoped>
.global{padding: 5px;width: auto;height: auto;}
 .title {
    grid-area: tl;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    
    
  }

p{
  text-align: justify;padding-left: 40px;padding-right: 40px;
}
.nav-link{
  text-align: center;
}

</style>
