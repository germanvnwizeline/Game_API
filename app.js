const express = require("express");
const fs = require("fs");
const lineReader = require("line-reader");
const utils = require("./utils.js");
const app = express();

//JSON.parse() receive from API /JSON.stringigy send from API/

rock_game_options = [
  { option: "rock" },
  { option: "paper" },
  { option: "scissors" },
];

app.get("/rock_game/cpu/get", (req, res) => {
  let number = Math.floor(Math.random() * (3 - 0)) + 0;
  let option = rock_game_options[number];

  res.send(JSON.stringify(option));
});

app.get("/dice/6sides/get", (req, res) => {
  let number = Math.floor(Math.random() * (7 - 1)) + 1;

  res.send({ number: JSON.stringify(number) });
});

app.get("/words/random/", (req, res) => {
  let random_number = Math.floor(Math.random() * (999 - 1)) + 1;
  let word_num = 1;
  lineReader.eachLine("./words.txt", function (line) {
    if (word_num == random_number) {
      res.send({ word: line });
    }

    word_num = word_num + 1;
  });
});

app.get("/words/random/:letter", (req, res) => {
  let word_list = [];

  if (utils.validateParameter(req.params.letter)) {
    lineReader.eachLine("./words.txt", function (line) {
      if (req.params.letter === line.charAt(0)) {
        word_list.push(line);
      }

      if (line.includes("done")) {
        res.send({ word: word_list[utils.returnRandom(word_list.length, 0)] });
        return false;
      }
    });
  } else {
    res
      .status(400)
      .send(`${req.params.letter} is an incorrect paramater: Expected [a-z]`);
  }
});

app.get("/games/consoles/", (req, res) => {
  res.send(JSON.stringify(utils.videogames_object));
});

app.get("/words/list/random/", (req, res) => {
  let random_number = utils.returnRandom(wordslist.length, 0);
  res.send({ word: wordslist[random_number] });
});

app.get("/words/list/random/:letter", (req, res) => {
  let word_list = [];

  if (utils.validateParameter(req.params.letter)) {
    let element = utils.returnElement(utils.wordslist, req.params.letter);
    res.send({ word: element });
  } else {
    res
      .status(400)
      .send(`${req.params.letter} is an incorrect paramater: Expected [a-z]`);
  }
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
