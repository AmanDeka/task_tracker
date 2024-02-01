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
    id?:string;
    username?:string;
    email?:string;
    passwordhash?:string;
}

const TABLE_NAME = 'users'

export const insertUser = async (user:User) =>{
    const qry_str = `INSERT INTO ${TABLE_NAME} VALUES ('${user.id}','${user.username}','${user.email}','${user.passwordhash}')`;

    try{
        await client.query(qry_str,);
        console.log('Inserted user');
    }catch(err){
        throw err;
    }
}

export const getUserById = async (userId:string) =>{
    const qry_str = `SELECT * from ${TABLE_NAME} WHERE id = '${userId}'`;
    let user:null|User = null;
    try{
        const res = await client.query(qry_str);
        user = res.rows[0];
    }catch(err){
        console.log('There was an error getting the user');
        throw err;
    }
    return user;  
}

export const getUserByEmail = async (email:string) =>{
    const qry_str = `SELECT * from ${TABLE_NAME} WHERE email = '${email}'`;
    let user:User|null = null;
    try{
        const res = await client.query(qry_str);
        user =  res.rows[0];
    }catch(err){
        console.log('There was an error getting the user');
        throw err;
    }
    return user;  
}

  


