const axios = require("axios");
const { base64encode, base64decode } = require("nodejs-base64");

var fs = require("fs");

const start = async () => {
  try {
    const fileContent = fs.readFileSync("src.cpp").toString("base64");

    const stdinContent1 = base64encode(3);

    const stdoutContent1 = base64encode("odd");

    const stdinContent2 = base64encode(4);

    const stdoutContent2 = base64encode("even");

    // console.log("fileContent", fileContent);
    // console.log("stdinContent", stdinContent);
    // console.log("stdoutContent", stdoutContent);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "89a1501fbcmsh6f8badd412f4baep16aff1jsnaa6cd7f09e27",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        submissions: [
          {
            language_id: 54,
            source_code: fileContent,
            stdin: stdinContent1,
            expected_output: stdoutContent1,
          },
          {
            language_id: 54,
            source_code: fileContent,
            stdin: stdinContent2,
            expected_output: stdoutContent2,
          },
        ],
      },
    };

    const response = await axios.request(options);

    const tokenArray = response.data;

    console.log(tokenArray);

    setTimeout(() => {
      getBatchSubmissionStatus(tokenArray);
      //   for (let i = 0; i < tokenArray.length; i++)
      //     getSubmissionStatus(tokenArray[i].token);
      // console.log(tokenArray[i].token);
    }, 2000);
  } catch (error) {
    console.error(error);
  }
};

const getBatchSubmissionStatus = async (tokenArray) => {
  let tokens = tokenArray.map((_item) => _item.token).join(",");
  console.log(tokens);
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: tokens,
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": "89a1501fbcmsh6f8badd412f4baep16aff1jsnaa6cd7f09e27",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    for (let i = 0; i < response.data.submissions.length; i++)
      console.log(response.data.submissions[i].status);
  } catch (error) {
    console.error(error);
  }
};

const getSubmissionStatus = async (token) => {
  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": "89a1501fbcmsh6f8badd412f4baep16aff1jsnaa6cd7f09e27",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    console.log(base64decode(response.data.stdout));

    console.log("-------------------------------------------------");
    console.log("-------------------------------------------------");
    console.log("-------------------------------------------------");
    console.log("-------------------------------------------------");
    console.log("-------------------------------------------------");
    console.log("-------------------------------------------------");
    console.log("-------------------------------------------------");
  } catch (error) {
    console.error(error);
  }
};

start();

// const axios = require("axios");

// const options = {
//   method: "GET",
//   url: "https://judge0-ce.p.rapidapi.com/languages",
//   headers: {
//     "X-RapidAPI-Key": "89a1501fbcmsh6f8badd412f4baep16aff1jsnaa6cd7f09e27",
//     "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//   },
// };

// const start = async () => {
//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// start();
