import Candidato from "../Modelo/candidato.js";

export default class CandidatoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            const email = dados.email;
            

            if (cpf && nome && telefone && endereco &&  email ){
                const candidato = new Candidato(cpf, nome, telefone, endereco, email);

                candidato.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "Candidato Gerado": candidato.cpf,
                        "mensagem": "Candidato incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do candidato segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um candidato!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            const email = dados.email;
            

            if (cpf && nome && telefone && endereco && email){
                const candidato = new Candidato(cpf, nome, telefone, endereco, email);
                
                candidato.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do candidato segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um candidato!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if (cpf) {
                const candidato = new Candidato(cpf);
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o candidato:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do candidato!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um candidato!"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "GET"){
            const candidato = new Candidato();
            candidato.consultar('').then((listaCandidatos)=>{
                    resposta.status(200).json(listaCandidatos);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }


    consultarPeloCPF(requisicao, resposta){
        resposta.type("application/json");
        
        const cpf = requisicao.params['cpf'];
        
        if(requisicao.method === "GET"){
            const candidato = new Candidato();
            candidato.consultarCPF(cpf).then((listaCandidatos)=>{
                    resposta.status(200).json(listaCandidatos);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }
}
