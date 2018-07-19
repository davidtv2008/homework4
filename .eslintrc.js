module.exports = {
"env": {
"browser": true
},
"extends": "eslint:recommended",
"rules": {
"indent": [
"error",
2
],
"linebreak-style": [
"error",
"unix"
// change to “unix” if on Mac OSX or on Linux
],
"quotes": [
1,
"single"
],
"semi": [
"error",
"always"
],
}
};

module.exports = {
    rules: {
        'no-console': 'off', 
    },
};
