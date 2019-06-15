<aura:application extends="force:slds">

    <aura:attribute name="LectureTheatreId" type="String" default="" />
    <aura:attribute name="month" type="Integer" default="5" />
    <aura:attribute name="year" type="Integer" default="2019" />
    <aura:attribute name="days" type="List" />

    <aura:handler name="init" action="{!c.init}" value="{!this}" />

    <table class="tableClass slds-table slds-table_cell-buffer slds-table_bordered slds-table_col-bordered"
        style="table-layout:fixed;">
        <thead>
            <tr class="slds-line-height_reset slds-theme--inverse">
                <td>Mon</td>
                <td>Tues</td>
                <td>Wed</td>
                <td>Thurs</td>
                <td>Fri</td>
                <td>Sat</td>
                <td>Sun</td>
            </tr>
        </thead>
        <tbody>
            <aura:iteration items="{!v.days}" var="week">
                <tr class="slds-hint-parent">
                    <aura:iteration items="{!week}" var="date">
                        <td class="" scope="col">
                            <div class="date">
                                {!date}
                            </div>
                            <div class="slds-scrollable booking">
                                <div class="slds-text-longform">
                                    <c:Bookings
                                        LectureTheatreId="{!v.LectureTheatreId}"
                                        Date="{!date}"
                                        Month="{!v.month}"
                                        Year="{!v.year}"
                                    />
                                </div>
                            </div>
                        </td>
                    </aura:iteration>
                </tr>
            </aura:iteration>
        </tbody>
    </table>
</aura:application>