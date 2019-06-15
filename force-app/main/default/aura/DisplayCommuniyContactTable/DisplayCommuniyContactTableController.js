({
	doInit : function(component, event, helper) {
		helper.getContactData(component, event, helper);
	},
	fetchDataFromServer : function(component, event, helper){
		var filteredStringDataFromEvent = event.getParam("filteredCrtieriaString");
		console.log('`````````````filteredStringDataFromEvent:::::::::'+filteredStringDataFromEvent);
		var action = component.get("c.getFilteredCommunityUsersData");
		action.setParams({
			filterCriteria :filteredStringDataFromEvent
		});
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('state:::::::of display com data ',response.getReturnValue());
			console.log('state:::::::response.getState() ',response.getState());
            if (state === "SUCCESS") {
                component.set("v.contactList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);

	}
})