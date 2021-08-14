// Importar Módulos
const http = require('http');
/* const fs = require('fs'); */
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

let lista_usuarios = [];
let i = 1;

http
    .createServer((req,res) => {

        
        
        if (req.url.includes('/registrar_usuario')) {
            
                axios
                    .get('https://randomuser.me/api/')
                    .then((data) => {
                        const nombre = data.data.results[0].name.first;
                        const apellido = data.data.results[0].name.last;
                        const id =  uuidv4().slice(0,6);
                        const fecha = moment().format('MMM Do YYYY, h:mm:ss a');
                    
                        /* fs.readFile('usuarios_registrados.txt','utf8',(err,data) => {
                            /* console.log(`Contenido del archivo:\n${data}`); 
                            
                            fs.writeFile('usuarios_registrados.txt',`${data}\nNombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${fecha}`,'utf8',
                            () => { console.log('Usuario registrado con éxito');})
                        }); */

                        lista_usuarios.push(`${i}. Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${fecha}`);
                        console.log('Usuario registrado con éxito');
                        i++;
                    })
                    .catch((e) => {
                        console.log(e);
                    })

                    res.end();
            }

            if (req.url.includes('/consultar_lista')) {
                console.log(chalk.blue.bgWhite(lista_usuarios));
                res.end();
            }
    })
    .listen(8080, () => {console.log('Escuchando en el puerto 8080')});


/* axios
    .get('https://randomuser.me/api/')
    .then((data) => {
        const nombre = data.data.results[0].name.first;
        const apellido = data.data.results[0].name.last;
        const id =  uuidv4().slice(0,6);
        const fecha = moment().format('MMM Do YYYY, h:mm:ss a');

        console.log(`Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${fecha}`);
    })
    .catch((e) => {
        console.log(e);
    }) */