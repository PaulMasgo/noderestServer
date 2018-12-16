//----------
// Puerto
process.env.PORT = process.env.PORT || 3000;

//---------------
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//--------------------
//BaseDatos

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://coffe-user:123masgo456@ds125479.mlab.com:25479/cafe';
}

process.env.URLDB = urlDB;