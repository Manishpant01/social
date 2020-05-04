const UserSchema = require("../model/user");
const PostSchema = require("../model/post");
const jwt = require("jsonwebtoken");
const key = require("../key");

function signup(req, res) {
  let name = req.body.name;
  console.log(name);
  let email = req.body.email;
  console.log(email);
  let password = req.body.password;
  console.log(password);
  if (!name || !email || !password) {
    return res.json({ error: "please enter full details" });
  }
  UserSchema.findOne({ email: email }, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data == null) {
      console.log(">>>>>>>>>>>>>>", data);
      let userdata = new UserSchema({
        name: name,
        email: email,
        password: password,
      });
      userdata.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("result:::", data);
          return res.json("signup sucessfully");
        }
      });
    } else {
      return res.json("you allready registered");
    }
  });
}

function signin(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  console.log(password);
  if (!email || !password) {
    return res.json({ error: "please enter all details" });
  }
  UserSchema.findOne({ email: email }, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data == null) {
      console.log("result:::::>>>", data);
      return res.json("You are not signup please signup and try again");
    } else {
      data.comparePassword(password, function (err, isMatch) {
        if (err) throw err;
        else {
          console.log("Password:", isMatch);
          if (isMatch == false) {
            return res.json("Entered Password & email does not match");
          } else {
            let O_id = data.id;
            console.log(O_id);
            jwt.sign(
              { id: O_id },
              key.secretkey,
              { expiresIn: "60m" },
              (err, token) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Token::>>>>>>>>>", token);
                  res.json({ token });
                }
              }
            );
            return res.json("you have been logedin");
          }
        }
      });
    }
  });
}

function createPost(req, res) {
  let title = req.body.title;
  console.log("titel ::: >>", title);
  let body = req.body.body;
  console.log("body ::: >>>", body);
  req.user.password = undefined;
  let postedUserData = req.user;
  console.log("postedUserData ::: >>>", postedUserData);

  if (!title || !body) {
    return res.json({ error: "please add all the fielda" });
  }
  let postdata = new PostSchema({
    title: title,
    body: body,
    postedby: postedUserData,
  });
  postdata.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      return res.json({ postedUserData: result });
    }
  });
}

function mypost(req,res){
   let O_id = req.user._id;
   console.log("obj id ::::>>>>>",O_id);
   PostSchema.find({'postedby' : O_id}).populate("postedby","_id name").exec(function(err, data){
     if(err){
       console.log(err);
     }else{
       console.log(data);
       res.json({mypost : data});
     }
   })
}

module.exports = {
  signup,
  signin,
  createPost,
  mypost
};
