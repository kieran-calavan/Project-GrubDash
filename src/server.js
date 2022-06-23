const { PORT = 5000 } = process.env;

const path = require("path");
const app = require(path.resolve(
  `${process.env.PORT || ""}`,
  "src/app"
));

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
