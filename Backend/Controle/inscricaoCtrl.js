import Candidato from "../Modelo/candidato.js";
import Vaga from "../Modelo/vaga.js";
import Inscricao from "../Modelo/inscricao.js"

export default class InscricaoCtrl {
    gravar(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const dataInscricao = dados.dataInscricao;
            const horaInscricao = dados.horaInscricao;
            const candidato = dados.candidato;
            const vagasTotal = dados.vag;
            

            let vag =[];
            for(const vagas of vagasTotal){
                const vaga = new Vaga(vagas.codigo);
                vag.push(vaga);
            }
            const inscricao = new Inscricao(0,dataInscricao, horaInscricao, vag);
            inscricao.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Inscrição registrado com sucesso!",
                    "codigo": inscricao.codigo
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar Inscrição: " + erro.message
                });
            });
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }

    }
    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'GET'){ 
            let termo = requisicao.params.termo;
            if (!isNaN(termo)){
                const inscricao = new Inscricao(0);
                inscricao.consultar(termo).then((listaInscricao)=>{
                    resposta.status(200).json({
                        "status": true,
                        "listaInscricao": listaInscricao
                    })
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar a inscrição: " + erro.message
                    });
                })
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe um códido de inscrição válido!"
                });
            }
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        } 
    }
    excluir(requisicao, resposta){
        resposta.type('application/json');
    }
    atualizar(requisicao, resposta){
        resposta.type('application/json');
    }
}