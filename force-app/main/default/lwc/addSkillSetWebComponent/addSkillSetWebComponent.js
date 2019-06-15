import { LightningElement,track,wire,api } from 'lwc';
import getSkills from '@salesforce/apex/SkillSetController.getSkillSets';
import createContactSkillRecords from '@salesforce/apex/SkillSetController.createContactSkillRecords';
export default class AddSkillSetWebComponent extends LightningElement {
    @track message ='';
    @wire(getSkills)skillList
    /*wiredskillSets({error,data}){
        if(data ){ 
            this.skillList = data;
           // console.log('--------skillList',skillList);
        }
        else if (error) {
            this.error = error;
            this.skillList = undefined;
        }
    }*/
    //console.log('-------skillList',skillList);
    @api _selected = []; // this array tracks the seleted values

    // assigning none if you are not seleted any values
    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    // Handling the change event
     handleChange(event) { 
        this._selected = event.detail.value;
    }

    @track openmodel = true;
    /*openmodal() {
        this.openmodel = true
    }*/
    closeModal() {
        this.openmodel = false
    } 
   // @wire (createContactSkillRecords,{skillList : this._selected})
    //returnedResult;
    saveMethod() {

       // eslint-disable-next-line no-console
       console.log('save method invoked'+JSON.stringify(this._selected));
        // Create Contact Skill Set records.
        createContactSkillRecords({
            skillIdList : this._selected
        })
        .then(() => {
            //return refreshApex(this.opptiesOverAmount);
        })
        .catch((error) => {
            this.message = 'Error received: code' + error.errorCode + ', ' +
                'message ' + error.body.message;
        });
        // Dispatch event from child component on save of the method
        this.dispatchEvent(new CustomEvent('refreshpage'));

        // eslint-disable-next-line no-console
       console.log('--- this.message:::::::::',  this.message);
        this.closeModal();
    }
}