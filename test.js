/*
Here's a small problem that a client once asked us to solve as part of a larger project. The client has an existing web-based 
system for delivering a test containing multiple choice questions to a learner (the relevant parts of which are included on this page).
The client asked us to modify this code so that the test questions are delivered in a random order every time a learner attempts 
the test. Furthermore, the order in which the answers to the questions are presented should also be randomized.

The existing framework for creating and displaying a test has been provided for you below. Your task is to comprehend the client's 
code and data structure then implement the RandomizeTest function to perform the randomization of the question and answer order.
Please explain your work and thought process.

Some background on the project from the client that may affect your solution:

-There are over 600 of these tests deployed to hundreds of thousands of users
-There are never more then 20 questions or so per test, each with no more than 6 answers but the code should be able to handle an
 arbitrary number or both questions and answers
-This code is maintained by several developers in different organizations
-The code is only required to work in all modern browsers

When submitting your response, please rename this file to include your name.

If you have any questions, please do not hesitate to ask.
*/


/***************************************************************/
//***Your code to randomize questions and answers goes here***//
/**************************************************************/

/*
RandomizeTest accepts and returns a Test object. The questions in the returned object should be in a random order.
The order of the choices within each question should also be randomized.
*/
function RandomizeTest(tstObject){
    
    for (i=0; i < tstObject.questions.length; i++) {
        var question = tstObject.questions[i]
        randomizeArray(tstObject.questions[i].choices);
    }

    randomizeArray(tstObject.questions);

    // return value extraneous...
    return tstObject;
}

function randomizeArray(arry) {

    var i = arry.length;
    while (0 != i) {
        var rand = Math.floor(Math.random() * i);
        i-=1;

        var tmp    = arry[i];
        arry[i]    = arry[rand];
        arry[rand] = tmp;
    }
    return arry;
}


/**********************************************************/
//***End randomization code section***//
/**********************************************************/


//definition of the test object
function Test(questions){
    this.questions = questions;
}



//displays the sample test in the browser with the correct answer highlighted
function WriteTest() {

    var tst = CreateSampleTest();
    
    tst = RandomizeTest(tst);
    
    document.write("<table border=0 cellspacing=3 cellpadding=3><form name=test id=test>");
    
    for (i=0; i < tst.questions.length; i++) {
    
        var question = tst.questions[i]

        document.write("<tr><td valign=top>&nbsp;</td>")

        document.write("<td><p>" + (i+1) + ".&nbsp;" + question.text);
        
        var correctcount = 0;
        for (j=0; j < question.choices.length; j++) {
            if (question.choices[j].correct) {
                correctcount++;
            }
        }

        for (j=0; j < question.choices.length; j++) {
            var choice = question.choices[j];
            
            var choiceClass = "";
            
            if (choice.correct) {
                choiceClass="class=correct"
            }
            
            if (correctcount == 1) {
                document.write("<br><input type=radio name=check"+i+" value="+j+" onclick='return false;'>");
                document.write("<span "+choiceClass+">"+choice.answer+"</span>");
            } 
            
            else {
                document.write("<br><input type=checkbox name=check"+i+" value="+j+" onclick='return false;'>");
                document.write("<span "+choiceClass+">"+choice.answer+"</span>");
            }
        }
        
        document.write("</td></tr><tr><td colspan=2><br></td></tr>");
    }
    document.write('</form></table>');
}



function CreateSampleTest(){
    // TODO externalize this
    var questions = [
        {
            text: "What can you find in Rustici Software's office?",
            choices: [
                { answer: "Dart Board",                 correct: true },
                { answer: "Ping Pong Table",            correct: true },
                { answer: "Cubicles",                   correct: false },
                { answer: "Laptops with dual monitors", correct: true },
                { answer: "TPS reports, ummm yeah",     correct: false }
            ]
        },
        {
            text: "All of Rustici Software employees are expected to work no more than ____ hours per week.",
            choices: [
                { answer: "80", correct: false },
                { answer: "40", correct: true },
                { answer: "50", correct: false },
                { answer: "60", correct: false }
            ]
        },
        {
            text: "The end users of Rustici Software's products number in the _________",
            choices: [
                { answer: "Tens",      correct: false },
                { answer: "Hundreds",  correct: false },
                { answer: "Thousands", correct: false },
                { answer: "Millions",  correct: true },
                { answer: "Billions",  correct: false }
            ]
        },
        {
            text: "Rustici Software is a (choose all that apply):",
            choices: [
                { answer: "Great place to work",                           correct: true },
                { answer: "Respected leader in its field",                 correct: true },
                { answer: "Place where people don't matter, just results", correct: false }
            ]
        },
        {
            text: "Tim likes to wear:",
            choices: [
                { answer: "Capri pants",        correct: false },
                { answer: "Goth attire",        correct: false },
                { answer: "Sport coat",         correct: false },
                { answer: "T-shirt and shorts", correct: true }
            ]
        }
    ];

    return new Test(questions);
}
