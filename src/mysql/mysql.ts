
import mysql = require('mysql');


export default class MySQL{

    private static _instance: MySQL;

    cnn: mysql.Connection;
    conected: boolean = false;

    constructor(){

        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        
        this.connectDB();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    static exeQuery (query: string, callback: Function){
        this.instance.cnn.query(query, (err, results: Object[], fields)=>{

            if (err){
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            
            if (results.length === 0) {
                callback('No se han encontrado resultados');
            } else {
                callback(null, results);
            }
        })
    }

    private connectDB(){
        this.cnn.connect((err: mysql.MysqlError)=>{

            if (err){
                console.log(err.message);
                return;
            }

            this.conected = true;
            console.log('Base de datos online');

        });
    }



} 