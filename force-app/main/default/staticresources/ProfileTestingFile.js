// It include 6 Spec with respective functionalities.
// This spec 1 is  used to rendering of profile component.
describe('Spec 1: ContactRecord',function(){
    it('verify component rendering',function(done){
        $T.createComponent('c:ContactRecord',{},true)
        .then(function(component){
           // expect(component.find("v.communityUserId")).NottoBe(true);
            done();

        }).catch(function(e){
            done.fail(e);
        });
    });
	
	//Edit mode of profile
	it('Spec 2:  Test ContactRecord Cmp', function(done) {
        console.log("Enter in Spec");
        $T.createComponent('c:ContactRecord', {}, false)
            .then(function(component) {
				//This expect checks whether the component renders as expected.
				expect(component.get("v.showEditButton")).toBe(false);
                done();
            }).catch(function(e) {
                done.fail(e);
            });
    });
	
	// This spec is used to test Application Event fire by FilterCriteriaForCommunityContact component.
    it('Spec 5:  Test Application Event', function(done) {
        console.log("Enter in Spec");
        const att = 'Event Fired';
        $T.createComponent('c:FilterCriteriaForCommunityContact', {}, false)
            .then(function(component) {
                console.log("Loaded Component");
                $T.fireApplicationEvent("c:PassCommunityFilterData", {
                    "filteredCrtieriaString": "Name LIKE %Dicya%"
                  
                });
				//This expect checks whether the application event is fired or not.
                expect(att).toBe('Event Fired');
                done();
            }).catch(function(e) {
                done.fail(e);
            });
    });
	//
    /*it('spec 6: Test ContactRecord server Method', function(done) {
        console.log("Enter in Spec");
		//Here we are setting Mock Responce for server method callback.
                var mockResponse = {
                    getState: function() {
                        return "SUCCESS";
                    },
                    getReturnValue: function() {
                        return {
							communityUser : {
								'Name' : 'Divya BarrLast'
							}
							};
                    }
                };
				//Here we are spying on server side method and processing mock responce.
                spyOn($A, "enqueueAction").and.callFake(function(action) {
                    var cb = action.getCallback("SUCCESS");
                    cb.fn.apply(cb.s, [mockResponse]);
                });
        $T.createComponent('c:ContactRecord', {}, false)
            .then(function(component) {
				
				//This expect checks records retrival.
			//	expect(component.get("v.communityUser").length).toBe(0);
			//	$T.run(component.doInit);
				//This expect checks whether the component renders as expected.
				expect(component.get("v.showEditButton")).toBe(true);
				expect(component.get("v.communityUser").length).toBe(1);
                done();
            }).catch(function(e) {
                done.fail(e);
            });
    });*/
	
	// This spec is used to test rendering of DisplayCommuniyContactTable component and server method invokation to fetch data.
    it('Spec 3:  Test DisplayCommuniyContactTable Cmp', function(done) {
        console.log("Enter in Spec");
        $T.createComponent('c:DisplayCommuniyContactTable', {}, false)
            .then(function(component) {
				//Here we are setting Mock Responce for server method callback.
                var mockResponse = {
                    getState: function() {
                        return "SUCCESS";
                    },
                    getReturnValue: function() {
                        return {
                            "Name": "Divya BarrLast",
                            "Id": "0050o00000XVFxgAAH"
                        };
                    }
                };
                console.log("Loaded Component");
				//Here we are spying on server side method and processing mock responce.
                spyOn($A, "enqueueAction").and.callFake(function(action) {
                    var cb = action.getCallback("SUCCESS");
                    cb.fn.apply(cb.s, [mockResponse]);
                });		
				//This expect checks attribute has expected value before spying server method.				
                expect(component.get("v.contactList").length).toBe(0);
                $T.fireApplicationEvent("c:PassCommunityFilterData", {
                     "filteredCrtieriaString": "Name LIKE %Dicya%",
                  
                });
				//This expect checks whether the server side method returs expected responce after spying.
                expect(component.get("v.contactList").length).toBe(1);
                done();
            }).catch(function(e) {
                done.fail(e);
            });
    });
	it('Spec 4:  to test input to search cmp', function(done) {
        console.log("Enter in Spec");
		 var mockResponse = {
                    getState: function() {
                        return "SUCCESS";
                    },
                    getReturnValue: function() {
                        return {
							"contactFields" : "ABC"
						};
                    }
                };
				//Here we are spying on server side method and processing mock responce.
                spyOn($A, "enqueueAction").and.callFake(function(action) {
                    var cb = action.getCallback("SUCCESS");
                    cb.fn.apply(cb.s, [mockResponse]);
                });
        $T.createComponent('c:FilterCriteriaForCommunityContact', {
                
                
            }, false)
            .then(function(component) {
                console.log("Loaded Component");
				 expect(component.get("v.contactFields").length).toBe(1);
                done();
            }).catch(function(e) {
                done.fail(e);
            });
    });
});
