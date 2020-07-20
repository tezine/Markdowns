<template>
    <v-container @click="emitClicked(1)">
        Ola
<!--        {{hello}} {{eUser.firstName+' '+eUser.lastName}}-->
    </v-container>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'vue-property-decorator'
    import {EUser} from "@/entities/EUser";

    @Component
    export default class HelloWorld extends Vue {
        //@Prop({ type: Object, required: true }) readonly eUser!: EUser
        // @Prop() readonly msg!: string
        // @Prop({default: 'John doe'}) readonly name: string
        // @Prop({required: true}) readonly age: number
        // @Prop(String) readonly address: string
        // @Prop({required: false, type: String, default: 'Developer'}) readonly job: string
        // Class properties in typescript is the same as component data in javascript
        hello:string="Hello world";

        @Emit()
        emitClicked(n: number) {
            console.log('emit clicked. add optional code here');
            //this.count += n
        }

        beforeCreate() {
            console.log('Nothing gets called before me!')
        }

        created(){
            console.log('created');
        }

        mounted() {
            //get rest here
            console.log('hello mounted');
        }
    }
</script>
