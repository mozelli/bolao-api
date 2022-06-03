module.exports = {
  cleanTeamValues(value) {
    let result = value.replace(/[^a-zA-Zãâáêéíõôú 0-9]+/g, "");
    return result;
  },
};
