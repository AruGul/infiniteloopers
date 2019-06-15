({
	getContactFields : function(component, event, helper) {
		var action = component.get('c.getContactFieldsFromMetadata'); 
		action.setCallback(this, function(response) { 
			var contactFieldsMetadataList = response.getReturnValue();
			console.log('contactFieldsMetadataList:::###:::',contactFieldsMetadataList);
			component.set("v.contactFields",contactFieldsMetadataList); 
			console.log('index:::::::1');
			var arrayOfFilterCondition = [];
			var count= 2;
			for(var index=0; index<count; index++){
				console.log('index::::::::::',index);
				var filterCondition = {};
				filterCondition.numberOfFilter;
				filterCondition.selectedfield;
				filterCondition.selectedOperator;
				filterCondition.selectedFieldType;
				filterCondition.enteredInput;
				arrayOfFilterCondition.push(filterCondition);
			}
			console.log('arrayOfFilterCondition::::::::',arrayOfFilterCondition);
			component.set('v.listOfFilters',arrayOfFilterCondition);
		
			
        });
		$A.enqueueAction(action);
	},
	removeFilter : function(component,index){
		var filtersList = component.get('v.listOfFilters');
		console.log('filtersList::::::',filtersList);
		filtersList.slice(index,1);
		console.log('filtersList::::3########::',filtersList);

		component.set('v.listOfFilters',filtersList);
	}
})