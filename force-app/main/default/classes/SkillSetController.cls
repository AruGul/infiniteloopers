/**
 * @File Name          : SkillSetController.cls
 * @Description        : 
 * @Author             : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Group              : 
 * @Last Modified By   : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Last Modified On   : 4/20/2019, 11:19:50 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    4/20/2019, 9:22:49 PM   ChangeMeIn@UserSettingsUnder.SFDoc     Initial Version
**/
public without sharing class SkillSetController {
    public static Map<String,Id> skillNameToIdMap = new Map<String,Id>();

    @AuraEnabled(cacheable=true)
    public static List<SkillSetWrapper> getSkillSets(){
        List<SkillSetWrapper> skillWrapList = new List<SkillSetWrapper>();
      //  Map<String,Id> skillNameToIdMap = new Map<String,Id>();
        List<Skill_Set__c> skillList = [
            SELECT
                Id,
                Name
            FROM
                Skill_Set__c
        ];
        for(Skill_Set__c skills : skillList) {
            SkillSetWrapper wrappObj = new SkillSetWrapper(skills.Id,skills.Name );
            skillWrapList.add(
                wrappObj
            );
            //skillStrList.add(skills.Name);
            //skillNameToIdMap.put(skills.Name,skills.Id);
        }
    return skillWrapList;
    }

     @AuraEnabled
    public static List<Contact_Skill_Set__c> createContactSkillRecords(List<String> skillIdList){
       // getSkillSets();
        List<Contact_Skill_Set__c>contactSkillList = new List<Contact_Skill_Set__c>();
        System.debug('Inside skillIdList::::::::'+skillIdList);
        
        // get current Logged in Contact Id
        User loggedInUser = getUsersContactId();

       for(String selectedSkillId : skillIdList){
            // Create Junction Record
            Contact_Skill_Set__c contactSkill = new Contact_Skill_Set__c(
                Name = loggedInUser.Contact.Name+selectedSkillId,
                Contact__c = loggedInUser.Contact.Id,
                Skill_Set__c = selectedSkillId
            );
            contactSkillList.add(contactSkill);
        }
        system.debug('contactSkillList::::::::::'+contactSkillList);
        if(!contactSkillList.isEmpty()){
            try{
                    system.debug('--inside try----');
            
                insert contactSkillList;
            }
            catch(Exception e){
                system.debug('-----catch-'+ e.getMessage());
            }
        
        }
        return contactSkillList;
    }
    @AuraEnabled
    public static user getUsersContactId(){
        return [
            SELECT Id,
                    Name,
                    Contact.Id,
                    Contact.Name
                FROM User
                WHERE Id = :UserInfo.getUserId()
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact_Skill_Set__c> getAllContactSkillSets(String ContactId){
        System.debug('ContactId::::::::::::::::'+ContactId);
        return [
            SELECT 
                Id,
                Name,
                Contact__c,
                Contact__r.Name,
                Skill_Set__c,
                Skill_Set__r.Name
            FROM
                Contact_Skill_Set__c
            WHERE 
                Contact__c = :ContactId
        ];
    }
    public class SkillSetWrapper{
        @AuraEnabled
        public String value;
        @AuraEnabled
        public String label;
        SkillSetWrapper(String valueW,String labelW){
            this.value = valueW;
            this.label =labelW;
        }
    }
}