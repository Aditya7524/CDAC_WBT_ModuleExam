const express = require('express');
const app = express();

const mysql = require('mysql2');

app.use(express.static("sf"));

app.listen(8081);

app.get("/getDetails", (req, resp) => {

    console.log("ajax function called");

    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'CNBmgt#15',
        database: 'WBT',
        port: 3306
    });

    let output = {status:false,detal:{bookId:0,bookName:"",price:0}}
    let bookId = req.query.bookId;
    
    console.log(bookId);

    conn.query('select bookId, bookName from book where bookId = ?', [bookId],
        (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                if (rows.length > 0) {
                    output.status = true;
                    output.details = rows[0];
                }
                else {
                    console.log("No Bookname with this bookId");
                }
            }
            console.log(output);
            resp.send(output);
        });

});

app.get('/updatDetails', (req, resp) => {
    console.log("ajax function called");

    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'CNBmgt#15',
        database: 'WBT',
        port: 3306
    });

    let output = {status:false,detal:{bookId:0,bookName:"",price:0}}
    let bookId = req.query.bookId;
    let bookName = req.query.bookName;
    console.log(bookId);
    conn.query('update book set bookName=? where bookId = ?', [bookName, bookId],
        (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                if (rows.affectedRows > 0) {
                    output.status = true;
                }
                else {
                    console.log("Did not update");
                }
            }
            console.log(output);
            resp.send(output);
        });

})