
import {Vue, Component} from 'vue-property-decorator'

// You can declare mixins as the same style as components.
@Component
export class HelloMixin extends Vue {
    hello = 'Hello'
    message= 'hello';
}
