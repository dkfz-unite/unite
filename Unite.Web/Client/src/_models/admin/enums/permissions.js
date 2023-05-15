export default class Permissions {
  static values = {
    "Data.Read": "Data.Read",
    "Data.Write": "Data.Write",
    "Data.Edit": "Data.Edit",
    "Data.Delete": "Data.Delete",
    "Users.Read": "Users.Read",
    "Users.Write": "Users.Write",
    "Users.Edit": "Users.Edit",
    "Users.Delete": "Users.Delete"
  };

  static Data = {
    Read: this.values["Data.Read"],
    Write: this.values["Data.Write"],
    Edit: this.values["Data.Edit"],
    Delete: this.values["Data.Delete"]
  };

  static Users = {
    Read: this.values["Users.Read"],
    Write: this.values["Users.Write"],
    Edit: this.values["Users.Edit"],
    Delete: this.values["Users.Delete"]
  };

  static Admin = [
    this.Users.Read,
    this.Users.Write,
    this.Users.Edit,
    this.Users.Delete,
    this.Data.Read,
    this.Data.Write,
    this.Data.Edit,
    this.Data.Delete
  ];
}