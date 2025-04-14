// Constantes
const http= require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));

// Sección 'Use'
app.use('/bootstrap',express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use('/html', express.static(path.join(__dirname,'/public/html')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// JSON's
let datos=JSON.parse(fs.readFileSync('datos.json','utf8'));
let productos=JSON.parse(fs.readFileSync('productos.json','utf8'));
let alumnos=JSON.parse(fs.readFileSync('alumnos.json','utf8'));


// GET's -- Prácticas
app.get('/',(req,res)=>{
    res.render('index',{titulo:"Todo el 8vo Cuatrimestre"});
})
app.get('/c2-index',(req,res)=>{
    res.render('c2-index',{titulo:"Listado de alumnos",listado:datos})
})
app.get('/p01',(req,res)=>{
    res.render('p01',{numero:""});

})
app.get('/p02',(req,res)=>{
    res.render('p02', { valor: "", pinicial: "", plazos: "" });
})
app.get('/p03',(req,res)=>{
    res.render('p03', { numero: "", nombre: "", puesto: "", nivel: "", dias: "" });
});
app.get('/Pre-Examen',(req,res)=>{
    res.render('Pre-Examen', { tipo: "", productos: "" });
});

// GET's -- Renderizados
app.get('/cotizacion',(req,res)=>{
    const params ={
        valor : req.query.valor,
        pinicial : req.query.pinicial,
        plazos : req.query.plazos,
    }
    res.render('p02',params);
})
app.get('/recibo', (req, res) => {
    const params ={
        numero : req.query.numero,
        nombre : req.query.nombre,
        puesto : req.query.puesto,
        nivel : req.query.nivel,
        dias : req.query.dias
        
    }
    res.render('p03',params);
});
app.get('/papeleria', (req, res) => {
    let productos = [];
    res.render('Pre-Examen', { tipo: '', productos: productos });
});

// POST's -- 
app.post('/multiplo',(req,res)=>{
    const params={

        numero:req.body.numero

    }
    res.render('p01', params)
})
app.post('/cotizacion',(req,res)=>{
    const params={
        valor:req.body.valor,
        pinicial:req.body.pinicial,
        plazos:req.body.plazos
    }
    res.render('p02', params)
});
app.post('/recibo', (req, res) => {
    const { numero, nombre, puesto, nivel, dias } = req.body;

    res.render('p03', { numero, nombre, puesto, nivel, dias });
});

app.post('/papeleria', (req, res) => {
    const tipoSeleccionado = req.body.tipo;

    let productosFiltrados = productos;
    
    if (tipoSeleccionado) {
        productosFiltrados = productos.filter(p => p.tipo == tipoSeleccionado);
    }
    res.render('Pre-Examen', { tipo: tipoSeleccionado, productos: productosFiltrados });
});


const puerto = 3000;
app.listen(puerto, ()=>{
    console.log('El puerto esta escuchando');
})
