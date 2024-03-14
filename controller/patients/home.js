const pagelimit = require("../utils/pagelimit.js");

exports.Home = async (req, res) => {
  const locals = {
    title: "Patient Management",
    discription: "Patient Management",
  };

  const { page, limit, skip } = pagelimit(req);

  res.render("index", {
    locals,
  });
};
