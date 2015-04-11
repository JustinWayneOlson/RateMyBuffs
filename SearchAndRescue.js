/**
 * Created by justin on 4/10/15.
 */

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';                            //import jquery
document.getElementsByTagName('head')[0].appendChild(script);
//var url = window.location.href; //get current url
var professorsOnPage = new Array();
var i = 0;
function getIframe () {
    return $("#ptifrmtgtframe").contents();
}
//iframe = $("#ptifrmtgtframe").contents(); //creates a variable that references to the iframe
function grabProfessorsName() {
    var iframe = getIframe();
    //if (url == "https://portal.prod.cu.edu/psp/epprod/UCB2/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART") { //check to make sure the user is on the correct page

        $.each(iframe.find("span[id*=MTG_INSTR]"),
            function() {
                if($(this).text() != "Staff"){
                    professorsOnPage[i] = $(this).text();
                    i++;
                }
        } )


        //var instructorName = iframe.find("span[id*=MTG_INSTR");
        for(j=0;j<professorsOnPage.length;j++){
            professorsOnPage[j] = professorsOnPage[j].replace(" ", "-");
            //for(k=0;k<(professorsOnPage[j].length-1);k++){
            //    if((professorsOnPage[j])[k] == " "){
            //       (professorsOnPage[j])[k] = "-"
            //    }
            //}
            console.log(professorsOnPage[j]);
        }
return 0;

}
function pullJSON(){

}
//grabProfessorsName();
$("iframe")[0].addEventListener("load", function () {
    iframe = getIframe();
    console.log("yoooooooo");
    iframe[0].addEventListener("DOMSubtreeModified", function (ev) {
        //console.log("Iframe Subtree");
        if(iframe[0].getElementById("DERIVED_REGFRM1_TITLE1").innerHTML == null) {
            console.log("not on the right page");
        }
        else if(iframe[0].getElementById("DERIVED_REGFRM1_TITLE1").innerHTML == "Search Results") {
            grabProfessorsName();
            console.log("you are on the right page");
        }
    }, false);
});

//win0divSSR_CLSRSLT_WRK_GROUPBOX3$0"