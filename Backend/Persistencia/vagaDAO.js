import conectar from "./server.js";
import Vaga from "../Modelo/vaga.js";

export default class VagaDao {
    async gravar(vaga) {
        if (vaga instanceof Vaga) {
            const sql = "INSERT INTO vaga(vaga_descricao, vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade) VALUES(?,?,?,?,?)";
            const parametros = [
                                vaga.descricao,
                                vaga.cargo,
                                vaga.salario,
                                vaga.cidade,
                                vaga.quantidade
                            ];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            vaga.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(vaga) {
        if (vaga instanceof Vaga) {
            const sql = "UPDATE vaga SET vaga_descricao = ? WHERE vaga_codigo = ?";
            const parametros = [vaga.descricao, vaga.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(vaga) {
        if (vaga instanceof Vaga) {
            const sql = "DELETE FROM vaga WHERE vaga_codigo = ?";
            const parametros = [vaga.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let listaVagas = [];
        let sql, parametros;

        if (parseInt(termo)) {
            sql = `SELECT vaga_codigo, vaga_descricao, vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade 
                   FROM vaga 
                   WHERE vaga_codigo = ? 
                   ORDER BY vaga_codigo`;
            parametros = [termo];
        } else {
            sql = `SELECT vaga_codigo, vaga_descricao, vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade 
                   FROM vaga 
                   WHERE vaga_descricao LIKE ? 
                   ORDER BY vaga_descricao`;
            parametros = [`%${termo}%`];
        }

        const [registros] = await conexao.execute(sql, parametros);
        for (const registro of registros) {
            const vaga = new Vaga(
                registro.vaga_codigo,
                registro.vaga_descricao,
                registro.vaga_cargo,
                registro.vaga_salario,
                registro.vaga_cidade,
                registro.vaga_quantidade
            );
            listaVagas.push(vaga);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaVagas;
    }
}
