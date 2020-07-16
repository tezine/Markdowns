<template>
    <v-container>
        Ola
        {{hello}} {{eUser.firstName+' '+eUser.lastName}}
    </v-container>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import {EUser} from "@/entities/EUser";

    @Component
    export default class HelloWorld extends Vue {
        @Prop({ type: Object, required: true }) readonly eUser!: EUser
        // @Prop() readonly msg!: string
        // @Prop({default: 'John doe'}) readonly name: string
        // @Prop({required: true}) readonly age: number
        // @Prop(String) readonly address: string
        // @Prop({required: false, type: String, default: 'Developer'}) readonly job: string
        // Class properties in typescript is the same as component data in javascript
        hello:string="Hello world";

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

    // export default Vue.extend({
    //   name: 'HelloWorld',
    //
    //   data: () => ({
    //     ecosystem: [
    //       {
    //         text: 'vuetify-loader',
    //         href: 'https://github.com/vuetifyjs/vuetify-loader',
    //       },
    //       {
    //         text: 'github',
    //         href: 'https://github.com/vuetifyjs/vuetify',
    //       },
    //       {
    //         text: 'awesome-vuetify',
    //         href: 'https://github.com/vuetifyjs/awesome-vuetify',
    //       },
    //     ],
    //     importantLinks: [
    //       {
    //         text: 'Documentation',
    //         href: 'https://vuetifyjs.com',
    //       },
    //       {
    //         text: 'Chat',
    //         href: 'https://community.vuetifyjs.com',
    //       },
    //       {
    //         text: 'Made with Vuetify',
    //         href: 'https://madewithvuejs.com/vuetify',
    //       },
    //       {
    //         text: 'Twitter',
    //         href: 'https://twitter.com/vuetifyjs',
    //       },
    //       {
    //         text: 'Articles',
    //         href: 'https://medium.com/vuetify',
    //       },
    //     ],
    //     whatsNext: [
    //       {
    //         text: 'Explore components',
    //         href: 'https://vuetifyjs.com/components/api-explorer',
    //       },
    //       {
    //         text: 'Select a layout',
    //         href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
    //       },
    //       {
    //         text: 'Frequently Asked Questions',
    //         href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
    //       },
    //     ],
    //   }),
    // })
</script>
