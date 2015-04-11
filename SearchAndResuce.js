/**
 * Created by justin on 4/10/15.
 */
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';                            //import jquery
document.getElementsByTagName('head')[0].appendChild(script);
var url = window.location.href; //get current url

if(url == "https://portal.prod.cu.edu/psp/epprod/UCB2/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART"){ //check to make sure the user is on the correct page
    iframe = $("#ptifrmtgframe").contents() //creates a variable that references to the iframe

}