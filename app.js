const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const { result } = require("lodash");

// express app
// inoke express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://seunadetunji:Sa485791.@nodetuts.j4j6r.mongodb.net/node-tuts?retryWrites=true&w=majority";
// async task returns a promise
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // listen for requests 
// listens for port 3000 localhost
    .then( (result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// Middleware & static files

// Any files in the folder name public will be made available to front end
app.use(express.static("public"));
// takes all the url encoded data tand passes it inot an object we can use
// ... on request object
/*
    We can see our form values, it accepts form data
*/
app.use(express.urlencoded( { extended: true } ));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes

// app.get('/add-blog', (req, res) => {
//     // Creating instance of blog
//     const blog = new Blog({
//         title: "new blog2",
//         snippet: "About my new blog",
//         body: "More about my blog"
//     });

    // Save blog to DB
    /*
    As we used blog model, therfore i'll look for blog collection based 
    on name and take document you created and save it to blog collection
    then returns a promise
    */
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

// app.get("/single-blog", (req, res) => {
//     Blog.findById("5fe0e95cc961ea2ff00bc5a1")
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.get("/all-blogs", (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send((result));
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// Routes

 app.get("/", (req, res) => {
    // res.send("<p>Home page</p>");

/**  The root is from NODE and from there the ./views/index.html 
 can be a relative path **/

    // send index page to broweser
    // When we go to / (root file) we get back the index.html
    // res.sendFile("./views/index.html", { root: __dirname });

    /*
    express will look inside views folder and automatically find index file, 
    it'll use the ejs view engine to render file and send back
    to browser
    */

    res.redirect("/blogs");

    // res.render("index", { title: "Home", blogs: blogs }); 
});

app.get("/about", (req, res) => {
//     res.send("<p>About page</p>");

//    res.sendFile("./views/about.html", { root: __dirname });

   res.render("about", { title: "About" });
}); 

// Blog routes
// This is similar to how we use a middleware
// Scoping the blog route to only /blogs
app.use("/blogs",blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" }); 
 });
