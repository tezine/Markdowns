<template>
    <VSlot>world!</VSlot>
</template>

<script>
    import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator'
    import VSlot from '../components/VSlot.vue';

    @Component({components: {VSlot}})
    export default class Slots extends Vue {
    }
</script>

