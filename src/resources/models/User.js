// Example model that we can simply call like creating a new instance of a class.
// This will guarantee that all User Objects will look the same across our whole application.
// Ex:
// import User from "../resources/models/User";
// let user = User(1, "name", "email", "url");
export default function User(uid = null, name = null, email = null, photoURL = null) {
  return {
    uid: uid,
    name: name,
    email: email,
    photoURL: photoURL,
  };
}
