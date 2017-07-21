(function(angular){
    'use strict'
    
    let app = angular.module("SignaturePadModule",[]);
    const SIG_PAD = "sigPad";

    app.component(SIG_PAD,{
        bindings:{
            onCapture:'&'

        },
        template:`
             <div id="signature-pad" class="m-signature-pad">
                <div class="m-signature-pad--body">
                <canvas></canvas>
                </div>
                <div class="m-signature-pad--footer">
                <div class="description">Sign above</div>
                <div class="left">
                    <button type="button" class="button clear" data-action="clear">Clear</button>
                </div>
                <div class="right">
                    <button type="button" class="button save" data-action="save-png">Save as PNG</button>
                    <button type="button" class="button save" data-action="save-svg">Save as SVG</button>
                </div>
                </div>
            </div>
        `,

        controller:['$log','$element','$window',SigPadController]


    });


})(angular);