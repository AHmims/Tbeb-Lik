const db = require('./dbConfig');
const classes = require('./classes');
// 
// 
//#region 
// ONLY ACCEPT A CLASS AS INPUT
async function insertData(data) {
    let {
        tableName,
        fieldsNames,
        fieldsPlaceHolders,
        values
    } = getClassValues(data);
    try {
        let req = `INSERT INTO ${tableName}(${fieldsNames}) VALUES (${fieldsPlaceHolders})`,
            cnx = await db.connect(),
            res = await cnx.query(req, values);
        cnx.release();
        return res[0].affectedRows;
    } catch (err) {
        console.error('error :', err);
    }
}
// 
async function getDataAll(className) {
    try {
        let req = `SELECT * FROM ${className}`,
            cnx = await db.connect(),
            res = await cnx.query(req);
        cnx.release();
        // 
        return res[0];
    } catch (err) {
        console.error('error :', err);
    }
}
// GET appUSER data by id
async function getAppUserDataById(id) {
    try {
        let req = `SELECT * FROM appUser where userId = ? LIMIT 1`,
            cnx = await db.connect(),
            res = await cnx.query(req, [id]);
        cnx.release();
        // 
        if (res[0].length > 0)
            return res[0][0];
        else if (res[0].length == 0)
            return null;
    } catch (err) {
        console.error('error :', err);
    }
}
// GET WANTED DATA FROM appUser : keys = ["key1","key2"]
async function getAppUserCustomData(keys, id) {
    let slctdKeys = '';
    keys.forEach(key => {
        slctdKeys += `appUser.${key},`;
    });
    slctdKeys = removeLastChar(slctdKeys);

    try {
        let req = `SELECT ${slctdKeys} FROM appUser where userId = ? LIMIT 1`,
            cnx = await db.connect(),
            res = await cnx.query(req, [id]);
        cnx.release();
        // 
        return res[0][0];
    } catch (err) {
        console.error('error :', err);
    }
}
// GET USERS BY MEDECIN ID
async function getAppUserPatientsByMedecinId(id) {
    try {
        let req = `SELECT a.*,p.NOM_PAT,p.Prenom_PAT FROM appUser AS a,patients AS p WHERE a.linkedMedecinMatricule = ? AND a.userId = p.MATRICULE_PAT`,
            cnx = await db.connect(),
            res = await cnx.query(req, [id]);
        cnx.release();
        // 
        return res[0];
    } catch (err) {
        console.error('error :', err);
    }
}
// 
async function getAppUserCustomDataBySocket(keys, socketId) {
    let slctdKeys = '';
    keys.forEach(key => {
        slctdKeys += `appUser.${key},`;
    });
    slctdKeys = removeLastChar(slctdKeys);

    try {
        let req = `SELECT ${slctdKeys} FROM appUser where appUser.socket = ? LIMIT 1`,
            cnx = await db.connect(),
            res = await cnx.query(req, [socketId]);
        cnx.release();
        // 
        if (res[0].length > 0)
            return res[0][0];
        else if (res[0].length == 0)
            return null;
    } catch (err) {
        console.error('error :', err);
    }
}
// GET NOTIFICATION ID BY PATIENT ID
async function getNotificationDataByPatientId(id, accepted) {
    try {
        let req = `SELECT * FROM preconsultation WHERE MATRICULE_PAT = ? AND accepted = ?`,
            cnx = await db.connect(),
            res = await cnx.query(req, [id, accepted]);
        cnx.release();
        // 
        return res[0];
    } catch (err) {
        console.error('error :', err);
    }
}
// EXAMPLE OF KEY {online : false,socket : 'ssss'} | params = {table : "ss",id : "userId"}
async function customDataUpdate(keyANDvalue, id, params) {
    keyANDvalue = getObjectKeysWithValues(keyANDvalue);
    let strSection = '';
    keyANDvalue[0].forEach(key => {
        strSection += `${key} = ?,`
    });
    strSection = removeLastChar(strSection);
    keyANDvalue[1].push(id);
    // 
    try {
        let req = `UPDATE ${params.table} SET ${strSection} WHERE ${params.id} = ?`,
            cnx = await db.connect(),
            res = await cnx.query(req, keyANDvalue[1]);
        cnx.release();
        // 
        return res[0].affectedRows;
    } catch (err) {
        console.error('error :', err);
    }
}
// 
async function getRoomId(key, id) {
    try {
        let req = `SELECT roomId FROM room WHERE ${key} = ?`,
            cnx = await db.connect(),
            res = await cnx.query(req, [id]);
        cnx.release();
        // 
        if (res[0].length > 0)
            return res[0][0];
        else if (res[0].length == 0)
            return null;
    } catch (err) {
        console.error('error :', err);
    }
}
// 
async function getRoomIdByNotifId(notifId) {
    try {
        let req = `SELECT p.accepted r.roomId FROM preConsultation AS p,room AS r WHERE p.MATRICULE_PAT = r.userPatientMatricule AND p.idPreCons = ?`,
            cnx = await db.connect(),
            res = await cnx.query(req, [notifId]);
        cnx.release();
        // 
        if (res[0].length > 0)
            return res[0][0];
        else if (res[0].length == 0)
            return null;
    } catch (err) {
        console.error('error :', err);
    }
}
// 
//#endregion
// 
//#region HELPER FUNCTIONS
function getClassValues(data) {
    let tableName, fieldsNames, fieldsPlaceHolders = '',
        values;
    // GET CLASS NAME FROM OBJECT
    tableName = data.constructor.name;
    // GET FIELD NAMES
    fieldsNames = Object.keys(data).join(',');
    // GET THE NUMBER OF '?' TO PLACE
    Object.keys(data).forEach(key => {
        fieldsPlaceHolders += '?,';
    });
    //REMOVE THE LAST CHAR ','
    fieldsPlaceHolders = removeLastChar(fieldsPlaceHolders);
    // GET THE VALUES
    values = Object.values(data);
    // 
    return {
        tableName,
        fieldsNames,
        fieldsPlaceHolders,
        values
    }
}

function getObjectKeysWithValues(data) {
    return [
        Object.keys(data),
        Object.values(data)
    ]
}

function removeLastChar(str) {
    return str.substring(0, str.length - 1);
}
//#endregion
module.exports = {
    insertData,
    getDataAll,
    getAppUserDataById,
    getAppUserCustomData,
    getAppUserPatientsByMedecinId,
    getAppUserCustomDataBySocket,
    getNotificationDataByPatientId,
    customDataUpdate,
    getRoomId,
    getRoomIdByNotifId
}
// 