import pg from 'pg';

const client = new pg.Client({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'amanjyotideka',
    database:'postgres'
});

client.connect();

export interface User{
    id:string;
    name:string;
    email:string;
    password:string;
}

const TABLE_NAME = 'test_table'

export const insertUser = (user:User) =>{
    const qry_str = `INSERT INTO ${TABLE_NAME} VALUES ('${user.id}','${user.name}','${user.email}','${user.password}')`;

    client.query(qry_str,(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Inserted row");
        }
    })
}

export const getUserById = (userId:string) =>{
    const qry_str = `SELECT * from ${TABLE_NAME} WHERE id = '${userId}'`;
    let user:null|User = null;
    client.query(qry_str,(err,res)=>{
        if(!err){
            user = res.rows[0];
        }
        else{
            console.log(err);
        }
    })
    return user;  
}

  


