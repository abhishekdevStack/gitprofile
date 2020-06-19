const axios = require("axios");

const getUsers = async (reqObj, resObj) => {
  console.log("In express layer");
  let auth = "abhishekdevStack" + "aa@9790776212";
  let finalAuth = auth.toString("base64");
  try {
    const response = await axios.get(
      `https://api.github.com/users?page=${reqObj.params.page}&per_page=${reqObj.params.per}`,
      {
        headers: {
          Authorization: "token " + "1088ebba059315140b9ee81498ad4bab8d5a0512",
        },
      }
    );
    let resData = response.data;
    let urlArray = [];
    resData.forEach((data) => {
      urlArray.push(
        axios.get(data.url, {
          headers: {
            Authorization:
              "token " + "1088ebba059315140b9ee81498ad4bab8d5a0512",
          },
        })
      );
    });
    Promise.all(urlArray).then((finalResponse) => {
      let initialData = response.data;
      initialData.map((data, i) => {
        data = Object.assign(data, finalResponse[i].data);
        // data = { ...data, ...finalResponse[i].data };
        return data;
      });
      console.log(initialData);
      return resObj.json(initialData);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getUsers = getUsers;
