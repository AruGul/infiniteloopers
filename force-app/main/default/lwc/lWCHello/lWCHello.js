import { LightningElement,track } from 'lwc';

export default class LWCHello extends LightningElement {
    @track greeting = 'World';
    handleChange(){
        this.greeting = event.target.value;
    }
}