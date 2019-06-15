/* 
* Description :This Controller class Provides data to LectureTheaterManagement app
*/
public with sharing class LectureTheatreManagement {

    /*
     * Description : This method fetch All lecture Theaters
     * Parameter : 
     * Result : return list of All lecture theater 
    */
    @AuraEnabled
    public static List<Lecture_Theatre__c> fetchLectureTheatres() {
        List<Lecture_Theatre__c> lectureTheaters = [
            SELECT 
                Id,
                Name
            FROM 
                Lecture_Theatre__c
            ORDER BY Name];
        return lectureTheaters;
    } 

    /*
     * Description : This method fetch Booked lecture Theater based on Start Date
     * Parameter : String - Selected Lecture Id (Default = '') 
     *           : Integer - Day
     *           : Integer - Month
     *           : Integer - Year
     * Result : return list of Booked lecture theater 
    */
    @AuraEnabled
    public static List<Lecture_Booking__c> fetchLectureBookings(
        String lectureId, 
        Integer bookingDay,
        Integer bookingMon,
        Integer bookingYear
    ) {
        List<Lecture_Booking__c> bookedLectures = new List<Lecture_Booking__c> ();
        if(  bookingDay != null
            &&  bookingMon != null
            &&  bookingYear != null
        ) {
            // Construct the date for passed day, mon, year param
            date startDate = date.newinstance(bookingYear, bookingMon, bookingDay);
            String queryStr = ' SELECT Id'
                                    +', Start_Time__c'
                                    +', End_Time__c'
                                    +', Booking_Date__c'
                                    +', Lecture__r.Name'
                                +' FROM Lecture_Booking__c'
                                +' WHERE '
                                +' Booking_Date__c =: startDate';
                                
            // if Lecture Id is Blank in that it will fetch data for all Lecturee
            if(String.isNotBlank(lectureId) && lectureId.equalsIgnoreCase('All') == false) {
                queryStr += ' AND Lecture_Theatre__c =: lectureId';
            }
            // By Default Query will return data in booked Start time ascending order
            queryStr += ' ORDER BY Start_Time__c';
            bookedLectures = Database.query(queryStr);
        }
        return bookedLectures;    
    }
}