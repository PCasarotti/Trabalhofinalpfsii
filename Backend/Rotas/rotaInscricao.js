import { Router } from "express";
import InscricaoCTRL from "../Controle/inscricaoCtrl.js";

const inscricaoCTRL = new InscricaoCTRL();
const rotaInscricao = new Router();

rotaInscricao
    .get('/', inscricaoCTRL.consultar)
    .get ('/:termo', inscricaoCTRL.consultar)
    .post('/', inscricaoCTRL.gravar)
    //.patch('/', inscricaoCTRL.atualizar)
    //.put('/', inscricaoCTRL.atualizar)
    //.delete('/', inscricaoCTRL.excluir);

export default rotaInscricao;
