import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import rotaCandidato from "./Rotas/rotaCandidato.js"
import rotaVaga from "./Rotas/rotaVaga.js"
import rotaInscricao from "./Rotas/rotaInscricao.js"



const host='0.0.0.0';
const porta='4000';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use('/login',rotaLogin);
//verificarAcesso passa a ser middleware = camada do meio
app.use('/candidatos',rotaCandidato);
app.use('/vagas', rotaVaga);
app.use('/inscricoes', rotaInscricao);
app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
