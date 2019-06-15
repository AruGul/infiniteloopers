({
    init : function(component, event, helper) {
        var year = component.get("v.year");
        var month = component.get("v.month");

        var lastDate = new Date( year, month + 1, 0); 
        var firstDate = new Date( year, month, 1); 
        var days = lastDate.getDate();
        var startDate = firstDate.getDay();
        var month = [];
        var tempStartDate = 1;
        var tempDays = 1;

        console.log(month + ' ' + year);

        for(;;) {
            var week = [];
            for(var i = 0; i < 7; i++) {
                if(tempStartDate < startDate) {
                    week.push('');
                    tempStartDate++;
                } else if(tempDays <= days) {
                    week.push(tempDays);
                    tempDays++;
                } else {
                    week.push('');
                }
            }
            month.push(week);
            if(tempDays > days) {
                break;
            }
        }
        component.set("v.days", month);
    }
})