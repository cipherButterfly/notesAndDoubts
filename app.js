//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let allPosts = [];
let allQuestions = [];
let allAnswersForQuestion = [];
let helement = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home",{posts: allPosts});
});

app.get("/contact", function(req,res){
    res.render("contact",{contactContentE: contactContent});
});

app.get("/notes", function(req,res){
    res.render("note", {});
});

app.get("/post", function(req,res){
    console.log("Successfully Loaded");
});

app.get("/answerHere/:postName", function(req, res){
    const requestedTitle = _.lowerCase(req.params.postName);
  
    allPosts.forEach(function(post){
      const storedTitle = _.lowerCase(post.postTitle);
  
      if (storedTitle === requestedTitle) {
        res.render("answerHere", {
          postTitle: post.postTitle,
          postContent: post.postContent,
          postName: post.postName
        });
      }
    });
  
  });

  app.get("/ask", function(req, res){
    res.render("ask",{});
  });

  app.get("/questions", function(req, res){
    res.render("questions",{questions: allQuestions, allAnswers: allAnswersForQuestion});
  });

  app.get("/answerPartQuestion/:questionHere", function(req, res){
    const requestedQuestion = _.lowerCase(req.params.questionHere);

    allQuestions.forEach(function(question){
      const storedQuestion = _.lowerCase(question.questionHere);

      if(storedQuestion === requestedQuestion){
        res.render("partAnswer",{
          questionAsked: question.questionHere
        });
        helement = question.questionHere;
      }
    });
    
  });

  app.get("/allAnswersWithQuestions", function(req, res){
    res.render("allanswers", {answers: allAnswersForQuestion});
  });

  /* app.get("/allAnswers/:questionHere",function(req, res){
    const requestedQuestion = _.lowerCase(req.params.questionHere);
    let questionPointed = [];
    allQuestions.forEach(function(question){
      const storedQuestion = _.lowerCase(question.questionHere);

      if(storedQuestion == requestedQuestion){
        questionPointed[0] = storedQuestion;
      }
    });
    allAnswersForQuestion.forEach(function(answerCombined){
      const storedQuestionInAnswer = _.lowerCase(answerCombined.questionAnswered);
      const storedNameWhoAnswered = _.lowerCase(answerCombined.nameWhoAnswered);
      const storedAnswerFinal = _.lowerCase(answerCombined.answerFinal);
      const storedAnswerCombined = _.lowerCase(answerCombined);
      if(questionPointed[0] == storedQuestionInAnswer){
        res.render("allanswers",{
          questionAnswered: storedQuestionInAnswer,
          nameWhoAnswered: storedNameWhoAnswered,
          answerFinal: storedAnswerFinal,
          answerCombined: storedAnswerCombined
        });
      }
    });
  }); **/

app.post("/answerPartQuestion/:questionHere", function(req, res){
  let questionAnswered = helement;
  let nameWhoAnswered = req.body.newNameAnsQ;
  let answerFinal = req.body.newAnswerForQ;

  let answerCombined = {
    questionAnswered: questionAnswered,
    nameWhoAnswered: nameWhoAnswered,
    answerFinal: answerFinal
  }

    allAnswersForQuestion.push(answerCombined);
    console.log(answerCombined);
    res.redirect("/questions");
});

app.post("/ask", function(req,res){
  let nameAsk = req.body.newNameAsk;
  let questionAsked = req.body.newAsk;

  let question = {
    nameAsk: nameAsk,
    questionHere: questionAsked
  };

  allQuestions.push(question);
  res.redirect("/questions");
});

app.post("/notes", function(req,res){
    let title = req.body.newTitle;
    let post = req.body.newPost;
    let name = req.body.newName;
    let totalPost = {
        postTitle: title,
        postContent: post,
        postName: name
    };
    allPosts.push(totalPost);
    console.log(allPosts);
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
