/**
 * Created by justin on 4/10/15.
 * for use on the University of Colorado's course registration page
 */
// 'use strict';

var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js';
script.type = 'text/javascript';                            //import jquery
document.getElementsByTagName('head')[0].appendChild(script);
//var url = window.location.href; //get current url
//var professorsOnPage = new Array();
//var courseOnPage = new Array();

//var instructors= new Object();

function getIframe() {
    return $("#ptifrmtgtframe").contents();
}

var courseData;
$.getJSON(chrome.extension.getURL('/courses.json'), function (courseDataLocal) {
    courseData = courseDataLocal
});


var instructorData;
$.getJSON(chrome.extension.getURL('/instructors.json'), function(instructorDataLocal) {
    instructorData = instructorDataLocal
});


$("iframe")[0].addEventListener("load", function () {
    iframe = getIframe();
    //console.log("yoooooooo");
    iframe[0].addEventListener("DOMSubtreeModified", function (ev) {
        //console.log("Iframe Subtree");

        if(iframe[0].getElementById("DERIVED_REGFRM1_TITLE1") == null) {
            //console.log("not on the right page");
        }
        else if(iframe[0].getElementById("DERIVED_REGFRM1_TITLE1").innerHTML == "Search Results") {

            //console.log("you are on the right page");
            if(!($(ev.target).find(".addedScores").length)){
                //console.log(ev + "ev");
                //console.log("Hey Im grabbing a professors name");
                //grabProfessorsName(ev.target);
                //console.log("ev target" + ev.target);
                appendTables(ev.target);

            }
        }
        return false;
    }, false);
});

function appendTables (elem) {
    var elemjq = elem/*if this*/ ? $(elem)/*do this*/ : iframe; /*else do this */
    if ($(elemjq).find(".addedScores").length) {
        return;
    }
    $.each(elemjq.find("[id*=win0divSSR_CLSRSLT_WRK_GROUPBOX2]:not([id*=GP])"), function() {


        var courseHtml = $(this).find("div[id*=win0divSSR_CLSRSLT_WRK_GROUPBOX2GP]").text();
        //console.log("coursehtml ", courseHtml);
        var course = courseHtml.match(/[A-Z]{4} [0-9]{4}/)[0];
        //console.log("course ", course);
        course = normalizeCourse(course);
        course = normalize(course);
        //console.log("normalizedCourse ", course);
        if(courseData[course]) {
            overCourseScr = courseData[course].average_overall.toFixed(1) + "/6.0";
        }
        else{
            overCourseScr = "No Data Found";
        }
        //console.log("overCourseScr ", overCourseScr);

        $(this).find("[id*=win0divSSR_CLSRCH_MTG1]").each(function () {
            var prof = $(this).find("span[id*=MTG_INSTR]").text();
            prof = normalize(prof);
            if (prof == "staff") {
                overInstScr = "N/A";
            }
            else {
                if (instructorData[prof]) {
                    overInstScr = instructorData[prof].average_overall.toFixed(1) + "/6.0";
                }
                else {
                    overInstScr = "No Data Found";
                }

            }
            //console.log(this);
            $(this).find('th').eq(7).after('<th class="PSLEVEL1GRIDCOLUMNHDR InstructorScoreHeading addedScores">Instructor Score</th>');
            $(this).find('td').eq(7).after('<td class="PSLEVEL3GRIDROW InstructorScore addedScores"><a class="instructorScoreLink"  href="http://cufcq.com/instructors/"' + prof + ' target="_blank">' + overInstScr + '</a></td>');
            //console.log(prof);
            $(this).find('th').eq(8).after('<th class="PSLEVEL1GRIDCOLUMNHDR ClassScoreHeading addedScores">Class Score</th>');
            $(this).find('td').eq(8).after('<td class="PSLEVEL3GRIDROW ClassScore addedScores"><a class="courseScoreLink" href="http://cufcq.com/courses/"' + course + 'target="_blank">' + overCourseScr + '</td>');
            //iframe.find(".instructorScoreLink").attr("href","http://cufcq.com/instructors/" + prof);
            //iframe.find(".classScoreLink").attr("href","http://cufcq.com/courses/" + course);
        });
    });
}

function normalize(prof){
    return prof.replace(" ", "-").toLowerCase();
}
function normalizeCourse(course) {
    return course.replace(/([A-Z]{4}) (\d{4}).+/, "$1-$2").toLowerCase();
}


