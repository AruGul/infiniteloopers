({
    getBooking : function(component, event, helper) {
        var action = component.get("c.fetchLectureBookings");
        action.setParams({ 
            lectureId : component.get("v.LectureTheatreId"),
            bookingDay : parseInt(component.get("v.Date")),
            bookingMon : parseInt(component.get("v.Month")) + 1,
            bookingYear : parseInt(component.get("v.Year"))
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var bookings = response.getReturnValue();
                for(var i=0; i< bookings.length; i++) {
                    bookings[i].dateString =
                        ((new Date(bookings[i].Start_Time__c)) + '').substring(16,21)
                        + ' : ' +
                        ((new Date(bookings[i].End_Time__c)) + '').substring(16,21)
                }
                component.set("v.Bookings", bookings);
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