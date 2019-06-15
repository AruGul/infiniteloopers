({
    init : function(component, event, helper) {
        helper.getLectureTheatres(component, event, helper);
    },

    leactureTheatreSelected : function(component, event, helper) {
        var selectedValue= component.find("ltSelectList").get("v.value");
        console.log('component get ::',selectedValue);
        var cmpEvent = component.getEvent("SelectedLectureTheatreEvent");
        cmpEvent.setParams({
            "SelectedLectureTheatreId" :selectedValue
        });
        cmpEvent.fire();
    }
})