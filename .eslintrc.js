  
module.exports = {
    "extends": [
      "airbnb-base",
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "node": true,
      "jest": true,
    },
    "rules": {
      "no-param-reassign": 0,
      "linebreak-style": 0
    }
  };