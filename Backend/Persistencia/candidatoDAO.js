import Candidato from '../Modelo/candidato.js';
import Vaga from '../Modelo/vaga.js';
import conectar from './server.js';

export default class CandidatoDAO {

    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const sql = `INSERT INTO candidato(cand_cpf, cand_nome, cand_telefone, cand_endereco, cand_email)
                VALUES(?,?,?,?,?)`;
            const parametros = [candidato.cpf, 
                candidato.nome, 
                candidato.telefone, 
                candidato.endereco,
                candidato.email,
                ];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            candidato.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(candidato) {
        if (candidato instanceof Candidato) {
            const sql = 
            `UPDATE candidato 
            SET cand_cpf = ?,
            cand_nome = ?, 
            cand_telefone = ?, 
            cand_endereco = ?,  
            cand_email = ?,
            WHERE cand_cpf = ?
            `;
            const parametros = [candidato.cpf, candidato.nome, 
                candidato.telefone, 
                candidato.endereco,  
                candidato.email,
                ];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const sql = `DELETE FROM candidato WHERE cand_cpf = ?`;
            const parametros = [candidato.cpf];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo) {
            termo = "";
        }
        const conexao = await conectar();
        let listaCandidatos = [];
    
        if (!isNaN(parseInt(termo))) {
            const sql = `SELECT c.cand_cpf, c.cand_nome, c.cand_telefone,
                c.cand_endereco, c.cand_email
                FROM candidato c 
                WHERE c.cand_cpf = ?
                ORDER BY c.cand_nome              
            `;
            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);
    
            for (const registro of registros) {
                const vaga = new Vaga(registro.vaga_codigo, registro.vaga_descricao);
                const candidato = new Candidato(registro.cand_cpf, registro.cand_nome, registro.cand_telefone,
                    registro.cand_endereco, registro.cand_email , vaga
                );
                listaCandidatos.push(candidato);
            }
        } else {
            const sql = `SELECT c.cand_cpf, c.cand_nome, c.cand_telefone,
                c.cand_endereco, c.cand_email
                FROM candidato c 
                WHERE c.cand_nome LIKE ?
                ORDER BY c.cand_nome
            `;
            const parametros = ['%' + termo + '%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
    
            for (const registro of registros) {
                const vaga = new Vaga(registro.vaga_codigo, registro.vaga_descricao);
                const candidato = new Candidato(
                    registro.cand_cpf,
                    registro.cand_nome,
                    registro.cand_telefone,
                    registro.cand_endereco,
                    registro.cand_email,
                );
                listaCandidatos.push(candidato);
            }
        }
    
        return listaCandidatos;
    }
    
} 
