({
    
    showSelectedLectureTheatre : function(cmp, event) {
        console.log('Inside show selected lectrure theatre listener');
        //Get the event message attribute
        var selectedLectureTheatreVar = event.getParam("SelectedLectureTheatreId"); 
        console.log('selectedLectureTheatreVar:::'+selectedLectureTheatreVar);
        //Set the handler attributes based on event data 
        cmp.set("v.selectedLT", selectedLectureTheatreVar);  
        

    },
    showSelectedMonthOfLecutre : function(cmp, event) {
        console.log('Inside show selected lectrure theatre listener');
        //Get the event message attribute
        var selectedMonthVar = event.getParam("SelectedMonth"); 
        console.log('selectedMonthVar:::'+selectedMonthVar);
        //Set the handler attributes based on event data 
        cmp.set("v.selectedMonth", selectedMonthVar);  
        

    },
     showSelectedYearOfLecutre : function(cmp, event) {
        console.log('Inside show selected lectrure theatre listener');
        //Get the event message attribute
        var selectedYearVar = event.getParam("SelectedYear"); 
        console.log('selectedYearVar:::'+selectedYearVar);
        //Set the handler attributes based on event data 
        cmp.set("v.selectedYear", selectedYearVar);  
        

    },

})