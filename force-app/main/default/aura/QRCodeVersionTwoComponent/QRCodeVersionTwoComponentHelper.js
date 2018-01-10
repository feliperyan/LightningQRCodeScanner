({
    helperMethod : function(cmp, obj, data) {
        cmp.set('v.status', data)
        console.log(data);        
    },
    toggleSpinner : function(cmp) {
        var spinner = cmp.find('mySpinner');
        $A.util.toggleClass(spinner, 'slds-hide');
    }
})