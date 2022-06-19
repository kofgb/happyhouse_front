import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

function registerMember(member, success, fail) {
  api.post(`/user`, JSON.stringify(member)).then(success).catch(fail);
}

function modifyMember(member, success, fail) {
  api.put(`/user/modify`, JSON.stringify(member)).then(success).catch(fail);
}

function deleteMember(member, success, fail) {
  var userid = member.userid;
  console.log(userid);
  api.delete(`/user/deleteMember/${userid}`).then(success).catch(fail);
}

function checkId(userid, success, fail) {
  api.get(`/user/${userid}`).then(success).catch(fail);
}

// function logout(success, fail)

export { login, findById, registerMember, modifyMember, deleteMember, checkId };
