({
    getLectureTheatres : function(component, event, helper) {
        console.log('inside getLectureTheatres::');
            
        var action = component.get("c.fetchLectureTheatres");
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state::',state);
            if (state === "SUCCESS") {
                component.set("v.options", response.getReturnValue());
                console.log('option list :',JSON.stringify(component.get("v.options")));
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }
})