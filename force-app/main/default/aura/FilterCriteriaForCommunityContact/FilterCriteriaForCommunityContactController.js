({
	doInit : function(component, event, helper) {
		helper.getContactFields(component, event, helper); 
	},
	addFilterMethod : function(component, event, helper){
		console.log('Inside add filter');
		var exisitingFilters = component.get('v.listOfFilters');
		var filterCondition = {};
		filterCondition.numberOfFilter;
		filterCondition.selectedfield;
		filterCondition.selectedOperator;
		filterCondition.selectedFieldType;
		filterCondition.enteredInput;
		exisitingFilters.push(filterCondition);
		component.set('v.listOfFilters',exisitingFilters);
		console.log('Updated on add filter:', component.get('v.listOfFilters'));
	},
	sendSelectedFilterCriteria : function(component, event, helper){
		console.log('in search function :'+JSON.stringify(component.get('v.listOfFilters')));
		var filteredCondtionsArray = component.get('v.listOfFilters');

		//console.log('in search function serialized:'+JSON.serialize(component.get('v.listOfFilters')));
		var filteredConditionString = '';
		if(filteredCondtionsArray){
			
			filteredCondtionsArray.forEach(function(conditionVar){
				if(conditionVar.selectedOperator== 'LIKE'){
					filteredConditionString += conditionVar.selectedfield + ' '+conditionVar.selectedOperator + ' '+
											'\'%'+conditionVar.enteredInput+'%\''+ ' AND '; 
				}
				if(conditionVar.selectedOperator== '='){ 
					filteredConditionString += conditionVar.selectedfield + ' '+conditionVar.selectedOperator + ' '+
											'\''+conditionVar.enteredInput+'\''+ ' AND ';
				}
				
											
			});
			console.log('bf4 slice filteredConditionString:::::',filteredConditionString);
			//filteredConditionString = filteredConditionString.replace(' AND ',' ');
			console.log('filteredConditionString:::::',filteredConditionString);

			// Pass Filtered String using app event
			var appEvent = $A.get("e.c:PassCommunityFilterData");
			appEvent.setParams(
				{
					"filteredCrtieriaString":filteredConditionString
				}
			);
			appEvent.fire();
		}
	},
	resetFilterValues : function(component, event, helper){
		var resetValue = [];
		component.set('v.listOfFilters',resetValue);
	},

	getSelectedFieldType : function(component, event, helper){
		var selectedItem = event.getSource();
		console.log('-----#######----selectedItem--',selectedItem);
		var selectedContactField = event.getSource().get("v.value");
		var indexWrapp = event.getSource().get("v.name");
		console.log('---------selectedContactField--',selectedContactField);
		
		/*console.log('inside event',JSON.stringify(event));
		console.log('inside f',JSON.stringify(component.get('v.listOfFilters')));
		
		console.log('inside function'+JSON.stringify(component.find("contactField")));
		var val = component.find("contactField").get("v.value");
		console.log('inside function val ',val);*/
		var action = component.get('c.getFieldTypeValue'); 
		action.setParams( 
			{
				fieldName : selectedContactField
			}
		);
		action.setCallback(this, function(response) { 
			var contactFieldType=response.getReturnValue();
			console.log('contactFieldType::::::'+contactFieldType);
			console.log('indexWrapp::::::'+indexWrapp);
			
			var wrapLst = component.get('v.listOfFilters');
			wrapLst[indexWrapp].selectedFieldType = contactFieldType;
			//selectedFieldType = wrapLst
			component.set('v.listOfFilters',wrapLst);
		});
		$A.enqueueAction(action);
	},
	deleteFilter : function(component, event, helper){
		var wrapLst = component.get('v.listOfFilters');
		var selectedItem = event.currentTarget;
		var index = selectedItem.dataset.record;
		console.log(index);
		wrapLst.splice(index, 1);
        component.set("v.listOfFilters", wrapLst);
		
		
		/*//var self = this;  
		var slectedFilter = component.find('filterRow');
		console.log('slectedFilter::::::',JSON.stringify(slectedFilter));
		var selectedItem = event.getSource(); 
		// Get the target object
		console.log('selectedItem::::::',selectedItem);
		console.log('Id::::::',selectedItem.getLocalId());
		var index = selectedItem.getLocalId();
		console.log('index1111111111::::::',index);
		/*var selectedStore = component.get("v.stores")[index];
		console.log('selectedStore::::::'+selectedStore);*/
	//	helper.removeFilter(component,selectedItem);
	}

})