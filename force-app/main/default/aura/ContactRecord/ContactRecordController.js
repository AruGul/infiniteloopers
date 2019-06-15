({
    doInit: function (component, event, helper) {
		/*var jsonObject = {
                            firstName : "Jenny",
                            lastName : "Doe",
                            birthdate : "1990-12-01",
                            phone : "219-682-6308",
                            title : "System Executive",
                            photoUrl : "https://placeimg.com/640/480/any",
                            recordType : "Fellow",
                            fellowshipLocation : "Uganda",
                            fellowshipDuration : "2018-2019",
                            skype : "jenny.doe",
                            languagesSpoken : "English; French; Portuguese"
                           };
                component.set('v.formattedJSON',jsonObject);*/

        // Call a helper method to get the data from server side
        var userIdParamValue = helper.getURLParameterValue().ContactId;
        console.log('userIdParamValue  Id-', userIdParamValue);
        helper.getCommunityUserData(component, event, userIdParamValue);
        
      //  helper.callRelatedList(component, event, helper);

    },
    handleEdit: function (component, event, helper) {
        console.log('Inside handle Edit!!!', component.get('v.communityUserId'));
        var contactId = component.get('v.communityUserId');
        $A.createComponent("c:ContactEdit", {
            recordId: contactId
        }, function (content, status) {
            console.log('--status--', status);
            if (status == "SUCCESS") {
                component.find('overlayLib').showCustomModal({
                    header: "Community User Edit",
                    body: content,
                    showCloseButton: true,
                    cssClass: "mymodal",
                    closeCallback: function () {
                        // doInit(component, event, helper);
                    }
                })
            }
        }
        );
    },
    handleSkillSet : function(component, event, helper){
        component.set('v.openmodel','true');
        
    },
    refreshParent: function(component, event, helper){
        console.log('inside to refresh contact record page');
        $A.get('e.force:refreshView').fire();

    },
   
   
})