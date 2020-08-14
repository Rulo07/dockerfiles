class User {
    constructor(user, password, admin) {
        this.user = user;
        this.password = password;
        // this.admin = admin;
    }

    getAddUser() {
        let sql = `INSERT INTO users(user, password, admin) \
                   VALUES('${this.user}', '${this.password}', '0')`;
        return sql;
    }

    getAddAdmin() {
        let sql = `REPLACE INTO users(user, password, admin) \
                   VALUES('${this.user}', '${this.password}', '1')`;
        return sql;
    }

    static isAdmin(user){
      let sql = `SELECT admin FROM users WHERE user = '${user}'`;
      return sql;
    }

    static getUser(user) {
        let sql = `SELECT * FROM users WHERE user = '${user}'`;
        return sql;
    }

    static deleteUser(usr_id) {
        let sql = `DELETE FROM users WHERE usr_id = ${usr_id}`;
        return sql;
    }

    static getAllUsers() {
        let sql = `SELECT * FROM users`;
        return sql;
    }
}

module.exports = User;
