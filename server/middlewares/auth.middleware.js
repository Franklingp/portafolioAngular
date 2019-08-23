'use strict'

	//Middleware de autenticacion que retorna un error 401 o 403 en caso de que no este autenticado
	//asi se protegen las rutas privadas que requieren autenticacion

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "Mi clave secreta";

function isAuth(req, res, next){
	if(!req.headers.authorization) return res.status(403).send({message: 'No tiene autorizacion'});

	let token = req.headers.authorization.split(' ')[1]; 		//porque la cabecera trae es: 'beare: token...s'
	const payload = jwt.decode(token, secret);

	if(payload.exp <= moment().unix()) return res.status(401).send({message: 'El token ha expirado'});

	req.user = payload.sub;
	next();
};

module.exports = isAuth;