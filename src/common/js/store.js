export function saveToLocal (id, key, val) {
  let userInfo = window.localStorage._doubanMovie_;
  if (!userInfo) {
    userInfo = {};
    userInfo[id] = {};
  } else {
    userInfo = JSON.parse(userInfo);
    if (!userInfo[id]) {
      userInfo[id] = {};
    }
  }
  userInfo[id][key] = val;
  window.localStorage._doubanMovie_ = JSON.stringify(userInfo);
};

export function loadFromLocal (id, key, def) {
  //TODO  获取用户信息待填写

   // let userInfo = window.localStorage._doubanMovie_;
  //let userInfo = [{id:"1"}];
  let userInfo = '{"buptsky":{"__wanted__":[{"id":"1"}],"__watched__":[{"id":"2"}]}}'
  if (!userInfo) {
    return def;
  }
  userInfo = JSON.parse(userInfo)[id];
  if (!userInfo) {
    return def;
  }
  let ret = userInfo[key];
  return ret || def;
};
