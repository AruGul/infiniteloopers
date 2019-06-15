/**
 * @File Name          : GetRelatedContactSkillSets.cls
 * @Description        : 
 * @Author             : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Group              : 
 * @Last Modified By   : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Last Modified On   : 4/21/2019, 3:45:45 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    4/21/2019, 1:10:56 PM   ChangeMeIn@UserSettingsUnder.SFDoc     Initial Version
**/
public without sharing class GetRelatedContactSkillSets {
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
}