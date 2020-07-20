<template>
  <div class="topContainer">
      <div class="container">
          <div class="row">
              <v-text-field id="txtEmail" class="col-md-12" label="E-mail" v-model="email"></v-text-field>
          </div>
          <div class="row">
              <v-text-field id="txtPassword" class="col-md-12" label="Password"></v-text-field>
          </div>
          <div class="row">
              <v-btn small color="primary" class="ml-auto mr-3" @click="onBtnEnterClicked">Enter</v-btn>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class Login extends Vue {

        email='';

        @Watch('email',{immediate: true, deep: true})
        emailChanged(value: string, oldValue: string) {
            console.log('email alterado',value);
            this.email = value;
        }

        async onBtnEnterClicked(){
            await this.$router.push('/home');
        }
    }
</script>

<style scoped>
.topContainer{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    min-height: 100vh;
}

.container{
    width: 400px !important;
}
</style>
