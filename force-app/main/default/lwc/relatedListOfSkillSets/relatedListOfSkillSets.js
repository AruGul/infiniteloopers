import { LightningElement, track,wire,api } from 'lwc';
import getAllContactSkillSets from '@salesforce/apex/GetRelatedContactSkillSets.getAllContactSkillSets';
export default class RelatedListOfSkillSets extends LightningElement {
    @track columns = [{
        label:'Contact Skill Set Name',
        fieldName : 'Name',
        type : 'text',
        sortable:true

    },
    {
        label:'Contact Name',
        fieldName : 'contactName',
        type : 'text',
        sortable:true
    },
    {
        label:'Skill Name',
        fieldName : 'skillName',
        type : 'text',
        sortable:true
    },
];
@track error;
@track data;
@track querystring;
@track paramValue;
@track param;
@api contactIdParam;
renderedCallback(){
    //this.dispatchEvent(new CustomEvent('refreshpage'));
     // eslint-disable-next-line no-console
    console.log(this.contactIdParam,'31 web comp');
    getAllContactSkillSets({ContactId:this.contactIdParam}).then(rs=>{
         // eslint-disable-next-line no-console
        console.log(rs,'rs');
      //  this.dispatchEvent(new CustomEvent('recordChange'));
        this.data=rs;
    }).catch((error)=>
     // eslint-disable-next-line no-console
    console.log('error',error));
    
}
//0030o00002b19ct
 /*this.querystring = window.location.search.substring(1);
     this.paramValue = {};
    this.querystring.split("&").forEach(function(part) {
         this.param = part.split("=");
        this.paramValue[param[0]] = decodeURIComponent(param[1]);
    });
    this.contactIdParam = this.paramValue;*/

/*wiredskillsets({
    error,
    data
}){
    if(data){
        this.data=data;
       // data.contactName = data.Contact__r.Name;
        // eslint-disable-next-line no-console
        console.log('dta from apex:'+data);
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(data, null, '\t'));

    }else if (error) {
        this.error = error;
    }
}*/
/*getURLParameterValue() {
 
    var querystring = location.search.substr(1);
    var paramValue = {};
    querystring.split("&").forEach(function(part) {
        var param = part.split("=");
        paramValue[param[0]] = decodeURIComponent(param[1]);
    });
    this.contactIdParam = paramValue;
    // eslint-disable-next-line no-console
    console.log('paramValue-' + paramValue);
    return paramValue;
}*/
}