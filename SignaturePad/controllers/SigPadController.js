class SigPadController {
    constructor($log,$element,$window){
        this.$log = $log;
        this.element = $element;
        this.signaturePad = null;
        this.window = $window;
    }
    //lifecycle
    $postLink(){
        let wrapper = this.element[0].querySelector("#signature-pad"),
            clearButton = wrapper.querySelector("[data-action=clear]"),
            savePNGButton = wrapper.querySelector("[data-action=save-png]"),
            saveSVGButton = wrapper.querySelector("[data-action=save-svg]"),
            canvas = wrapper.querySelector("canvas");


        function resizeCanvas() {
            // When zoomed out to less than 100%, for some very strange reason,
            // some browsers report devicePixelRatio as less than 1
            // and only part of the canvas is cleared then.
            var ratio =  Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
        }

        this.window.onresize = resizeCanvas;
        resizeCanvas();

        this.signaturePad =new SignaturePad(canvas,{
                  minWidth: 2,
                    maxWidth: 3,
                    penColor: "rgb(66, 133, 244)"
        });

        //let that = this;

        clearButton.addEventListener("click",  (event)=> {
            this.signaturePad.clear();
        });

        savePNGButton.addEventListener("click",  (event)=> {
            if (this.signaturePad.isEmpty()) {
                alert("Please provide signature first.");
            } else {
               this.onCapture({signature:this.signaturePad.toDataURL()});
            }
        });

        saveSVGButton.addEventListener("click",  (event)=> {
            if (this.signaturePad.isEmpty()) {
                alert("Please provide signature first.");
            } else {
                this.onCapture({signature:this.signaturePad.toDataURL('image/svg+xml')});
            }
        });
                            

    }

    $onDestroy(){
        this.$log.info("Component destroyed");
        this.element.unbind();

    }




}