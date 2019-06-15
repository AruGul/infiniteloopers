({
	getCommunityUserData : function(component, event,userIdParamValue) {
		
		var action = component.get('c.getCommunityUserInformation');
		
		action.setParams({
			userId :userIdParamValue
		});
		action.setCallback(this, function(response) {  
			var state = response.getState();
			console.log('state:::::::of display com data ',response.getReturnValue());
			console.log('state:::::::response.getState() ',response.getState());
            if (state === "SUCCESS") {
				component.set('v.communityUser', response.getReturnValue());
            }
			
			console.log('get the user info :::',component.get('v.communityUser'));
            var communityUserIdVar = component.get('v.communityUser').Contact.Id; 
			console.log('communityUserIdVar:::::::::::'+communityUserIdVar);
			component.set('v.communityUserId',communityUserIdVar);
			console.log('communityUserIdVar::::#######:::::::'+component.get('v.communityUserId'));
			
			// Get current logged in user Id
			var currentUserId = $A.get("$SObjectType.CurrentUser.Id");
			console.log('-----currentUserId---------',currentUserId);
			var communityContactUserId = component.get('v.communityUser').Id;
			if(currentUserId === communityContactUserId){
				//showEditButton = true;
				//console.log('-----showEditButton---------',showEditButton);
				component.set('v.showEditButton','true');
				component.set('v.showAddSkillsButton','true');
				
				console.log('-----showEditButton---------',component.get('v.showEditButton'));
			}
        });
		$A.enqueueAction(action);
		
	},
	getURLParameterValue: function() {
 
        var querystring = location.search.substr(1);
        var paramValue = {};
        querystring.split("&").forEach(function(part) {
            var param = part.split("=");
            paramValue[param[0]] = decodeURIComponent(param[1]);
        });
 
        console.log('paramValue-' + paramValue);
        return paramValue;
	},
	callrelatedList : function(component, event, helper){
		columns = [{
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

	var action = component.get('c.getAllContactSkillSets');
		
		action.setParams({
			ContactId :component.get('v.communityUserId')
		});
		action.setCallback(this, function(response) {  
			var state = response.getState();
			
            if (state === "SUCCESS") {
				component.set('v.skillList', response.getReturnValue());
            }
		});
		$A.enqueueAction(action);

	}
})