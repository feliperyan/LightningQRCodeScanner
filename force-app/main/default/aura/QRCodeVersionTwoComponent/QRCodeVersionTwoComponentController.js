({
    scriptsLoaded : function(component, event, helper) {
        console.log('Scripts loaded.');
        
        _qrcode.callback = $A.getCallback(function(data) {
            //console.log(data);
            //helper.helperMethod(component, null, data);
            
            var appEvent = $A.get("e.c:CodeScanned");
            appEvent.setParam('data', data);
            appEvent.fire();
        });
    },

    handleCodeScannedEvent : function(cmp, event, helper) {
        console.log('Captured CodeScanned Event');
        var eventData = event.getParam('data');
        helper.helperMethod(cmp, null, eventData);
    },
    
    previewFile : function(cmp, event, helper) {        
        var the_image = new Image();
        var the_canvas = cmp.find('qr-canvas').getElement().getContext('2d');
        var file =       event.getSource().get('v.files')[0];
        var reader =     new FileReader();

        reader.addEventListener("load", function () {
            the_image.src = reader.result;
            _qrcode.decode(reader.result);
        }, false);

        the_image.onload = function(){
            console.log('Drawing');
            //the_canvas.canvas.height = the_image.height;
            //the_canvas.canvas.width = the_image.width;
            the_canvas.canvas.height = 300;
            the_canvas.canvas.width  = 300;
            the_canvas.drawImage(the_image, 0, 0, the_canvas.canvas.width, the_canvas.canvas.height);
            var canvas = cmp.find('qr-canvas');
            $A.util.removeClass(canvas, 'slds-hide');
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    },
    
    toggleSpinner : function(cmp, event, helper) {
        helper.toggleSpinner(cmp);
    }
})