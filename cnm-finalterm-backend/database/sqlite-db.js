const sqlite3 = require('sqlite3').verbose();
 
exports.load = sql => {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database('./database/bank-db.sqlite3');
        db.serialize(function() {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        db.close();
    });
}


 