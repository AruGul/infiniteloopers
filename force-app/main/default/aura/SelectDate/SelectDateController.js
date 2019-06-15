({
    init : function(component, event, helper) {
        console.log('Inside add month hanlder');
		var monthList = [
            { name: "Jan", value: 0},
            { name: "Feb", value: 1},
            { name: "Mar", value: 2},
            { name: "Apr", value: 3},
            { name: "May", value: 4},
            { name: "June", value: 5},
            { name: "Jul", value: 6},
            { name: "Aug", value: 7},
            { name: "Sep", value: 8},
            { name: "Oct", value: 9},
            { name: "Nov", value: 10},
            { name: "Dec", value: 11},
        ];
        component.set("v.options",monthList);
        var yearList = [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
        component.set("v.yearOptions",yearList);
		
		
    },
    leactureMonthSelected : function(component, event, helper) {
        var selectedValue= component.find("ltMonthSelectList").get("v.value");
        console.log('component get month::',selectedValue);
        var cmpEvent = component.getEvent("SelectedMonthEvent");
        cmpEvent.setParams({
            "SelectedMonth" :selectedValue
        });
        cmpEvent.fire();
    },
    leactureYearSelected : function(component, event, helper) {
        var selectedValue= component.find("ltSelectList").get("v.value");
        console.log('component get ::',selectedValue);
        var cmpEvent = component.getEvent("SelectedYearEvent");
        cmpEvent.setParams({
            "SelectedYear" :selectedValue
        });
        cmpEvent.fire();
    }
})