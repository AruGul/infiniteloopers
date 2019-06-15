({
	getContactData : function(component, event, helper) {
		component.set('v.columnList',[
			{label:'Community Contact Name',fieldName:'Name',type:'text'},
			{label:'Primary Affiliations',fieldName:'Contact.Primary_Affiliations__c',type:'text'},
			{label:'Fellowship Location',fieldName:'Contact.Fellowship_Location__c',type:'text'},
			{label:'Languages',fieldName:'Contact.Languages__c',type:'text'},
			{label:'Skype',fieldName:'Contact.Skype__c',type:'text'}
		]);
		
	}
})