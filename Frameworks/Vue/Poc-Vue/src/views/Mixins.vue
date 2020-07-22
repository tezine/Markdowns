<template>
    <div>
        <h2>Working as multiple inheritance:</h2>
        {{result}}
        <h2>Merging content:</h2>
        {{message}}
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {mixins} from "vue-class-component";
    import {HelloMixin} from "@/mixins/HelloMixin";
    import {WorldMixin} from "@/mixins/WorldMixin";

    @Component({
        components: {},
    })
    export default class Mixins  extends mixins(HelloMixin, WorldMixin) {
        result:string='';
        message:string='From Mixins, not from HelloMixin'

        created () {
            this.result=this.hello + ' ' + this.world + '!';//-> Hello World!
        }
    }
</script>

