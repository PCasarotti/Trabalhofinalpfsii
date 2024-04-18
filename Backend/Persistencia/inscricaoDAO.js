import Vaga from "../Modelo/vaga.js";
import InscricaoCtrl from "../Controle/inscricaoCtrl.js";
import Inscricao from "../Modelo/inscricao.js"
import Candidato from "../Modelo/candidato.js";
import conectar from "./server.js";

export default class InscricaoDAO {
    async gravar(inscricao) {
        if (inscricao instanceof Inscricao) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql2 = 'INSERT INTO inscricao(data_inscricao, horario_inscricao, candi_cpf, vaga_codigo) VALUES(?,?,?,?)';
                if(Array.isArray(inscricao.vag)){
                for (const item of inscricao.vag) {
                    let parametros2 = [inscricao.dataInscricao, inscricao.horaInscricao, inscricao.candidato.cpf.cpf, item.codigo];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit(); 
            } else {
                console.error('Erro: inscricao.vag não é um array ou está indefinido');
                }
            }
            catch (error) {
                await conexao.rollback(); 
                throw error;
            }
        }

    }

    async consultar(termoBusca) {
        const listaInscricoes = [];
        if (!isNaN(termoBusca)) { 
            const conexao = await conectar();
            const sql = `SELECT
            i.codigo_inscricao,
            i.data_inscricao,
            i.horario_inscricao,
            i.candi_cpf,
            i.vaga_codigo,
            c.cand_cpf,
            c.cand_nome,
            c.cand_telefone,
            c.cand_endereco,
            c.cand_email,
            v.vaga_codigo,
            v.vaga_descricao,
            v.vaga_cargo,
            v.vaga_salario,
            v.vaga_cidade,
            v.vaga_quantidade
          FROM
            inscricao AS i
            INNER JOIN candidato AS c ON i.candi_cpf = c.cand_cpf
            INNER JOIN vaga AS v ON i.vaga_codigo = v.vaga_codigo
          WHERE
            v.vaga_codigo;`;
            const [registros, campos] = await conexao.execute(sql, [termoBusca]);

            if (registros.length > 0) {

               
                const candidato = new Candidato(registros[0].candidato_codigo, registros[0].nome, registros[0].telefone, registros[0].endereco);
                let listaVaga = [];
                for (const registro of registros) {
                    const vaga = new Vaga(registro.vaga_codigo, registro.vaga_descricao, registro.vaga_cargo, registro.vaga_salario, registro.vaga_cidade, registro.vaga_quantidade);
                    listaVaga.push(vaga);

                }
                const inscricao = new Inscricao(registros[0].codigo, candidato, registros[0].data_inscricao, registros[0].horario_inscricao, candidato, listaVaga);
                listaInscricoes.push(inscricao);
            }

        }

        return listaInscricoes;

    }
}