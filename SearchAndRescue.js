/**
 * Created by justin on 4/10/15.
 */
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';                            //import jquery
document.getElementsByTagName('head')[0].appendChild(script);
//var url = window.location.href; //get current url
var professorsOnPage = new Array();
var i = 0;
function grabProfessorsName() {
    //if (url == "https://portal.prod.cu.edu/psp/epprod/UCB2/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART") { //check to make sure the user is on the correct page
        iframe = $("#ptifrmtgtframe").contents(); //creates a variable that references to the iframe
        $.each(iframe.find("span[id*=MTG_INSTR]"),
            function() {
                if($(this.text) != "Staff"){
                    professorsOnPage[i] = $(this).text;
                    i++;
                }

                //store in array
                //modify fist last to first-last
                //append to url "cufcq/instructors/"
        } )

        //var instructorName = iframe.find("span[id*=MTG_INSTR");
        for(j=0;j<professorsOnPage.length;j++){
            for(k=0;k<(professorsOnPage[j].length-1);k++){
                if((professorsOnPage[j])[k] == " "){
                    (professorsOnPage[j])[k] = "-"
                }
            }
            console.log(professorsOnPage[j]);
        }
}
//grabProfessorsName();