public class CommunityContactController{

    @AuraEnabled
    public static User getCommunityUserInformation(String userId){
        User communityUsers = [SELECT Id, 
                                      Name, 
                                      Contact.Id,
                                      Contact.Name,
                                      Contact.Birthdate,
                                      Contact.Co_Follow__r.Name,
                                      Contact.Co_Follow__c,
                                      Contact.Emergency_Contact_1__c,
                                      Contact.Emergency_Contact_1__r.Name,
                                      Contact.Emergency_Contact_2__c, 
                                      Contact.Facebook__c,
                                      Contact.Relationship_to_Contact_1__c,
                                      Contact.Relationship_to_Contact_2__c,
                                      Contact.Fellowship_Duration__c,
                                      Contact.Fellowship_Location__c,
                                      Contact.Fellowship_Position__c,
                                      Contact.Languages__c,
                                      Contact.Level__c,
                                      Contact.LinkedIn__c,
                                      Contact.Placement_Org__c,
                                      Contact.Skype__c,
                                      Contact.Twitter__c,
                                      Contact.MailingStreet,
                                      Contact.MailingCity,
                                      Contact.MailingState,
                                      Contact.MailingCountry,
                                      Contact.MailingPostalCode,
                                      Contact.OtherStreet,
                                      Contact.OtherCity,
                                      Contact.OtherState,
                                      Contact.OtherCountry,
                                      Contact.OtherPostalCode,
                                      Contact.Phone,
                                      Contact.Email,
                                      Contact.Title,
                                      Contact.Primary_Affiliations__c
                                 FROM User 
                                WHERE Id= :userId
                                 LIMIT 1];
        return communityUsers;

    }
    @AuraEnabled
    public static List<User> getFilteredCommunityUsersData(String filterCriteria){
        System.debug('filterCriteria::::::::::::in apex:'+filterCriteria);
        filterCriteria += filterCriteria.removeEnd(' AND ');
        String filteredCommunityUsersQueryString = 'SELECT '+
                                                    'Id, '+
                                                    'Name, '+
                                                    'Contact.Id, '+
                                                    'Contact.Name, '+
                                                    'Contact.Birthdate, '+
                                                    'Contact.Co_Follow__r.Name, '+
                                                    'Contact.Co_Follow__c, '+
                                                    'Contact.Emergency_Contact_1__c, '+
                                                    'Contact.Emergency_Contact_1__r.Name, '+
                                                    'Contact.Emergency_Contact_2__c, ' +
                                                    'Contact.Facebook__c, ' +
                                                    'Contact.Relationship_to_Contact_1__c, '+
                                                    'Contact.Relationship_to_Contact_2__c,' +
                                                    'Contact.Fellowship_Duration__c,'+
                                                    'Contact.Fellowship_Location__c,'+
                                                    'Contact.Fellowship_Position__c,'+
                                                    'Contact.Languages__c,'+
                                                    'Contact.Level__c,'+
                                                    'Contact.LinkedIn__c,'+
                                                    'Contact.Placement_Org__c,'+
                                                    'Contact.Skype__c,'+
                                                    'Contact.Twitter__c,'+
                                                    'Contact.MailingStreet,'+
                                                    'Contact.MailingCity,'+
                                                    'Contact.MailingState,'+
                                                    'Contact.MailingCountry,'+
                                                    'Contact.MailingPostalCode,'+
                                                    'Contact.OtherStreet,'+
                                                    'Contact.OtherCity,'+
                                                    'Contact.OtherState,'+
                                                    'Contact.OtherCountry,'+
                                                    'Contact.OtherPostalCode,'+
                                                    'Contact.Phone,'+
                                                    'Contact.Email,'+
                                                    'Contact.Title,'+
                                                    'Contact.Primary_Affiliations__c '+
                                                    '  FROM User '+ 
                                                   // '  WHERE Id=\''+UserInfo.getUserId()+'\'' ;
                                                   ' WHERE '+ filterCriteria;
         system.debug('filteredCommunityUsersQueryString:::::::::'+filteredCommunityUsersQueryString);
        List<User> filteredUsers = Database.query(filteredCommunityUsersQueryString);
        system.debug('filteredUsers:::::::::'+filteredUsers);
        return filteredUsers; 

    }
}