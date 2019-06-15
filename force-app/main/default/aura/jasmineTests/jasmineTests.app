<aura:application >

    <c:lts_jasmineRunner testFiles="{!join(',', 
    	
        $Resource.ProfileTestingFile
                           
    )}" />

</aura:application>