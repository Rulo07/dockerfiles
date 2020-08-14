require('dotenv').config();
const { SYSTEM_LIFT, SYSTEM_DATABASE } = process.env;
var constants = require ("../../constants/constants");

class CodeSession {
    constructor(user, token) {
        this.user = user;
        this.token = token;
    }

    getAddCode() {
        let sql = `INSERT INTO code_session(user, token) \
                   VALUES('${this.user}', '${this.token}')`;
        return sql;
    }

    static getToken(user) {
        let sql = `SELECT * FROM code_session WHERE user = '${user}'`;
        return sql;
    }

    static checkToken(token) {
        let sql = `SELECT * FROM code_session WHERE token = '${token}'`;
        return sql;
    }

    static deleteToken(token) {
        let sql = `DELETE FROM code_session WHERE token = '${token}'`;
        return sql;
    }

    static getAllCodeByUser(user) {
        let sql = `SELECT token FROM code_session WHERE user = ${user}`;
        return sql;
    }

    static getValuePreviousTableIALiftbd(){
      console.log("** START Value table ** Database / Lift **")
      console.log(SYSTEM_DATABASE + " / " + SYSTEM_LIFT)
      let sql = `SELECT SecondsWait, StartFloorNumber, EndFloorNumber, StartStateId FROM ${SYSTEM_DATABASE}.tStatisticsElevatorCalls
      WHERE MachineId = '${SYSTEM_LIFT}' AND CallType = 'H' AND StartDate < NOW()
      ORDER BY StartDate DESC LIMIT 1`;
      return sql;
    }

    static getLastMinutes(){
      console.log("** START calls ** Database / Lift **")
      console.log(SYSTEM_DATABASE + " / " + SYSTEM_LIFT)
      let sql = `SELECT COUNT(1) AS numberCall from ${SYSTEM_DATABASE}.tStatisticsElevatorCalls
      WHERE MachineId = '${SYSTEM_LIFT}' AND CallType = 'H'
      AND StartDate < NOW()
      AND StartDate > date_sub(NOW(), INTERVAL 3 MINUTE)
      AND EndFloorNumber = 0
      UNION ALL SELECT COUNT(1) AS numberCall from ${SYSTEM_DATABASE}.tStatisticsElevatorCalls
      WHERE MachineId = '${SYSTEM_LIFT}' AND CallType = 'H'
      AND StartDate < NOW()
      AND StartDate > date_sub(NOW(), INTERVAL 3 MINUTE)
      AND EndFloorNumber = 2
      UNION ALL SELECT COUNT(1) AS numberCall from ${SYSTEM_DATABASE}.tStatisticsElevatorCalls
      WHERE MachineId = '${SYSTEM_LIFT}' AND CallType = 'H'
      AND StartDate < NOW()
      AND StartDate > date_sub(NOW(), INTERVAL 3 MINUTE)
      AND EndFloorNumber = 3
      UNION ALL SELECT COUNT(1) AS numberCall from ${SYSTEM_DATABASE}.tStatisticsElevatorCalls
      WHERE MachineId = '${SYSTEM_LIFT}' AND CallType = 'H'
      AND StartDate < NOW()
      AND StartDate > date_sub(NOW(), INTERVAL 1 HOUR)
      AND EndFloorNumber = 2
      UNION ALL SELECT COUNT(1) AS numberCall from ${SYSTEM_DATABASE}.tStatisticsElevatorCalls
      WHERE MachineId = '${SYSTEM_LIFT}' AND CallType = 'H'
      AND StartDate < NOW()
      AND StartDate > date_sub(NOW(), INTERVAL 1 MINUTE)
      AND EndFloorNumber = 3`;
      return sql;
    }
}
module.exports = CodeSession;
