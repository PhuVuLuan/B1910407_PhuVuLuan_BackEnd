const express = require("express");
const cors = require("cors");

const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const ContactService = require("./app/services/contact.service");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
  
app.use((error, req, res, next) => {
      res.status(error.statusCode || 500).json({
        error: {
          status: error.statusCode || 500,
          message: error.message || 'Internal Server Error',
        },
      });
    });
    
module.exports = app;