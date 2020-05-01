const db = require('./dbConfig');
// 
// 
async function showData() {
    try {
        let req = 'SELECT * FROM admin',
            cnx = await db.connect(),
            res = await cnx.query(req, []);
        cnx.release();
        console.log(res[0]);
        // return res[0];
    } catch (err) {
        console.error('error :', err);
    }
}
// 
showData();