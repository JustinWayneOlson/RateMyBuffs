/**
 * Created by justin on 4/10/15.
 */

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';                            //import jquery
document.getElementsByTagName('head')[0].appendChild(script);
//var url = window.location.href; //get current url
var professorsOnPage = new Array();
var courseOnPage = new Array();
var i,r = 0;
var instructors= new Object();
function getIframe() {
    return $("#ptifrmtgtframe").contents();
}
//iframe = $("#ptifrmtgtframe").contents(); //creates a variable that references to the iframe
function grabProfessorsName(elem) {
    var elemjq = elem/*if this*/ ? $(elem)/*do this*/ : getIframe(); /*else do this */
    //if (url == "https://portal.prod.cu.edu/psp/epprod/UCB2/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART") { //check to make sure the user is on the correct page

    $.each(elemjq.find("span[id*=MTG_INSTR]"),
        function () {
            if ($(this).text() != "Staff") {
                professorsOnPage[i] = $(this).text();
                i++;
            }
        });
    //var instructorName = iframe.find("span[id*=MTG_INSTR");
    //for(var j = 0; j < professorsOnPage.length; j++) {
    //    professorsOnPage[j] = professorsOnPage[j].replace(" ", "-");//.toLowerCase();
    //    console.log(professorsOnPage[j]);
    //}
    return 0;
}
//function grabClassCode(elem) {
//    var elemjq = elem/*if this*/ ? $(elem)/*do this*/ : getIframe(); /*else do this */
//    //if (url == "https://portal.prod.cu.edu/psp/epprod/UCB2/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART") { //check to make sure the user is on the correct page
//
//    $.each(elemjq.find("span[id*=win0divSSR_CLSRSLT_WRK_GROUPBOX2GP]"),
//        function () {
//                courseOnPage[r] = $(this).text();
//                r++;
//
//        });
//    //var instructorName = iframe.find("span[id*=MTG_INSTR");
//    //for(var j = 0; j < professorsOnPage.length; j++) {
//    //    professorsOnPage[j] = professorsOnPage[j].replace(" ", "-");//.toLowerCase();
//    //    console.log(professorsOnPage[j]);
//    //}
//    return 0;
//}
function pullJSON() {
    var request = $.getJSON("https://52a7fe5a.ngrok.com/instructors.json", function(data) {
        console.log(data);
        instructors = data;
    })

    return instructors;
}
//grabProfessorsName();
$("iframe")[0].addEventListener("load", function () {
    iframe = getIframe();
    console.log("yoooooooo");
    iframe[0].addEventListener("DOMSubtreeModified", function (ev) {
        console.log("Iframe Subtree");

        if(iframe[0].getElementById("DERIVED_REGFRM1_TITLE1") == null) {
            console.log("not on the right page");
        }
        else if(iframe[0].getElementById("DERIVED_REGFRM1_TITLE1").innerHTML == "Search Results") {

            console.log("you are on the right page");
            if(!($(ev.target).find(".addedScores").length)){
                console.log(ev);
                yay = ev;
                console.log("Hey Im grabbing a professors name");
                //grabProfessorsName(ev.target);
                tableAppend(ev.target);
            }




        }
    }, false);
});
function tableAppend(elem){
    var elemjq = elem/*if this*/ ? $(elem)/*do this*/ : iframe; /*else do this */

    $.each(elemjq.find("[id*=win0divSSR_CLSRCH_MTG1]"), function() {
            if ($(this).find(".addedScores").length) {
                return false;
            }
            //$(document).ready(function(){
            whoa = this;
            var prof = $(this).find("span[id*=MTG_INSTR]").text();
            prof = normalize(prof);
            if(prof=="staff"){
                overScr = "N/A";
            }
            else{
                if(instructors[prof]) {
                    overScr = instructors[prof].average_overall.toFixed(1) + "/6.0";
                }
                else{
                    overScr = "No Data Found";
                }

            }
            $(this).find('th').eq(7).after('<th class="PSLEVEL1GRIDCOLUMNHDR InstructorScoreHeading addedScores">Instructor Score</th>');
            $(this).find('td').eq(7).after('<td class="PSLEVEL3GRIDROW InstructorScore addedScores">' + overScr + '</td>');
            $(this).find('th').eq(8).after('<th class="PSLEVEL1GRIDCOLUMNHDR ClassScoreHeading addedScores">Class Score</th>');
             $(this).find('td').eq(8).after('<td class="PSLEVEL3GRIDROW ClassScore addedScores">5.2/6.0</td>');

            professorsOnPage.push(prof);
    });
}
function normalize(prof){
        return prof.replace(" ", "-").toLowerCase();
}
//for(var i=0;i<professorsOnPage.length;i++){
//    console.log(professorsOnPage[i]);
//}
//add rows

//win0divSSR_CLSRSLT_WRK_GROUPBOX3$0"

//win0divSSR_CLSRSLT_WRK_GROUPBOX3$0"
pullJSON();