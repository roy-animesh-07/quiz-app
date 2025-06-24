const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}
function delUser(id){
  sessionIdToUserMap.delete(id);
}

module.exports = {
  setUser,
  getUser,
  delUser,
};