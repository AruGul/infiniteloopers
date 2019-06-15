public class FilteredCommunityUserController {
   
    public static List<Community_Contact_Fields__mdt> communityMetadataList = 
        new List<Community_Contact_Fields__mdt>();

    @AuraEnabled
    public static List<Community_Contact_Fields__mdt> getContactFieldsFromMetadata(){
        communityMetadataList = [
            SELECT Id,
                    DeveloperName,
                    MasterLabel,
                    Data_Type__c,
                    Contact_field_Api_Name__c
              FROM Community_Contact_Fields__mdt
        ];
        
        return communityMetadataList;
    }

    @AuraEnabled
    public static String getFieldTypeValue(String fieldName){
        getContactFieldsFromMetadata();
         System.debug('fieldName : '+fieldName);
        String fieldDataTypeValue ='';
        /*Map<String, Schema.SObjectField> mapOfFields;
         mapOfFields = Schema.SObjectType.Contact.fields.getMap();
        Schema.SObjectField field = mapOfFields.get(fieldName);
        Schema.DisplayType FldType = field.getDescribe().getType();
        System.debug('FldType::::::::::::'+FldType); 
       
    return FldType;*/
        for(Community_Contact_Fields__mdt metadataRecord : communityMetadataList){
            System.debug('metadataRecord'+metadataRecord);
            if(fieldName == metadataRecord.Contact_field_Api_Name__c){
                fieldDataTypeValue = metadataRecord.Data_Type__c;
                System.debug('fieldDataTypeValueLLLLL'+metadataRecord.Data_Type__c);
            }
        }
    System.debug('fieldDataTypeValue'+fieldDataTypeValue);
    return fieldDataTypeValue;
    }
}