

const initRouter = (app) => {

    require("./auth")(app);
    require("./user")(app);
    require("./insert")(app);
    require("./book")(app);
    
    
}
module.exports = initRouter


// import initRouter from 

// const initIndexRouter () => {
//     initRouter(app)
// }