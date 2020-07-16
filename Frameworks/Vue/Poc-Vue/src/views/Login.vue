<template>

    <section id="cover" class="min-vh-100">
        <div id="cover-caption">
            <div class="container">
                <div class="row text-white">
                    <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                        <h3 class="display-4 py-2 text-truncate">Login</h3>
                        <div class="px-2">
                            <form action="" class="justify-content-center">
                                <div class="form-group">
                                    <v-text-field
                                            class="col-md-12"
                                            label="E-mail"
                                            v-model="email"
                                    ></v-text-field>
                                </div>
                                <div class="form-group">
                                    <v-text-field
                                            class="col-md-12"
                                            label="Password"
                                    ></v-text-field>
                                </div>
                                <v-btn small color="primary" class="ml-auto mr-3" @click="onBtnEnterClicked">Enter
                                </v-btn>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--    <div class="container" id="topContainer">-->
    <!--        <div class="row">-->

    <!--        </div>-->
    <!--        <div class="row">-->

    <!--        </div>-->
    <!--        <div class="row">-->
    <!--            <v-btn small color="primary" class="ml-auto mr-3" @click="onBtnEnterClicked" >Enter</v-btn>-->
    <!--        </div>-->
    <!--    </div>-->
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class Login extends Vue {

        email = '';

        @Watch('email', {immediate: true, deep: true})
        emailChanged(value: string, oldValue: string) {
            console.log('email alterado', value);
            this.email = value;
        }

        async onBtnEnterClicked() {
            await this.$router.push('/users');
        }
    }
</script>

<style scoped>
    h3{
        color:white;
    }
    #cover {
        background: #222 url('https://unsplash.it/1920/1080/?random') center center no-repeat;
        background-size: cover;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        position: relative;
    }

    #cover-caption {
        width: 100%;
        position: relative;
        z-index: 1;
    }

    /* only used for background overlay not needed for centering */
    form:before {
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: -1;
        border-radius: 10px;
    }
</style>
