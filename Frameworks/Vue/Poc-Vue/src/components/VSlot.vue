<template>
    <div>
        Hello <slot/>!
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator'

    @Component({components: {}})
    export default class VSlot extends Vue {

    }
</script>

<style scoped>

</style>
