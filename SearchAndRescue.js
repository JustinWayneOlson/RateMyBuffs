/**
 * Created by justin on 4/10/15.
 * for use on the University of Colorado's course registration page
 */

var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js';
script.type = 'text/javascript';                            //import jquery
document.getElementsByTagName('head')[0].appendChild(script);

function getIframe() {
    return $("#ptifrmtgtframe").contents();
}

//load course data from included json into an object in global scope
var courseData;
$.getJSON(chrome.extension.getURL('/courses.json'), function (courseDataLocal) {
    courseData = courseDataLocal
});

//load course data from included json into an object in global scope
var instructorData;
$.getJSON(chrome.extension.getURL('/instructors.json'), function(instructorDataLocal) {
    instructorData = instructorDataLocal
});

//everything lives inside iframe, get the internal html code
$("iframe")[0].addEventListener("load", function () {
    iframe = getIframe();
    //add an event listener to know when the user loads more courses into the page
    iframe[0].addEventListener("DOMSubtreeModified", function (ev) {
        //check the table location, if its not the right one keep listening
        if(iframe[0].getElementById("DERIVED_REGFRM1_TITLE1") == null) {
        }
        //look for keyword "search results" in the page to know this is the right place
        else if(iframe[0].getElementById("DERIVED_REGFRM1_TITLE1").innerHTML == "Search Results") {
            //if we have not appended data to the page yet, do so now
            if(!($(ev.target).find(".addedScores").length)){
                appendTables(ev.target);

            }
        }
        return false;
    }, false);
});

function appendTables (elem) {
    //get elem out of the iframe as a jquery object
    var elemjq = elem/*if this*/ ? $(elem)/*do this*/ : iframe; /*else do this */
    if ($(elemjq).find(".addedScores").length) {
        return;
    }
    //for each course in the table
    $.each(elemjq.find("[id*=win0divSSR_CLSRSLT_WRK_GROUPBOX2]:not([id*=GP])"), function() {
        //get the line of html that contains the target course
        var courseHtml = $(this).find("div[id*=win0divSSR_CLSRSLT_WRK_GROUPBOX2GP]").text();
        //parse the line for the course code so we know what information to grab
        var course = courseHtml.match(/[A-Z]{4} [0-9]{4}/)[0];
        //normalize the format of the course to all lowercase, hyphenated
        course = normalizeCourse(course);
        course = normalize(course);
        //check to make sure we have data for the course
        if(courseData[course]) {
            overCourseScr = courseData[course].average_overall.toFixed(1) + "/6.0";
        }
        else{
            overCourseScr = "No Data Found";
        }
        //for each instructor in the table
        $(this).find("[id*=win0divSSR_CLSRCH_MTG1]").each(function () {
            //get professors name out of the table
            var prof = $(this).find("span[id*=MTG_INSTR]").text();
            //normalize to lowecase and hyphenated
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
            //added instructor label cell
            $(this).find('th').eq(7).after('<th class="PSLEVEL1GRIDCOLUMNHDR InstructorScoreHeading addedScores">Instructor Score</th>');
            //add instructor score cell, with link to cufcq.com page
            if(instructorData[prof] && prof!= "staff"){
                $(this).find('td').eq(7).after('<td class="PSLEVEL3GRIDROW InstructorScore addedScores"><a class="instructorScoreLink"  href="http://cufcq.com/instructors/' + prof + '" target="_blank">' + overInstScr + '</a></td>');
            }
            else{
                $(this).find('td').eq(7).after('<td class="PSLEVEL3GRIDROW InstructorScore addedScores">' + overInstScr + '</td>');
            }
            //add course label cell
            $(this).find('th').eq(8).after('<th class="PSLEVEL1GRIDCOLUMNHDR ClassScoreHeading addedScores">Class Score</th>');
            //add course score cell, with link to cufcq.com page
            $(this).find('td').eq(8).after('<td class="PSLEVEL3GRIDROW ClassScore addedScores"><a class="courseScoreLink" href="http://cufcq.com/courses/' + course +'" target="_blank">' + overCourseScr + '</a></td>');

        });
    });
}

function normalize(prof){
   //make all lower case, with hypen instead of space between names
    return prof.replace(" ", "-").toLowerCase();
}
function normalizeCourse(course){
    //turn "ABCD 1233" to "abcd-1234"
    return course.replace(/([A-Z]{4}) (\d{4}).+/,"$1-$2").toLowerCase();
}


