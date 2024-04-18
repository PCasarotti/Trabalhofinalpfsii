import VagaDao from "../Persistencia/vagaDAO.js"
export default class Vaga {
    #codigo;
    #descricao;
    #cargo;
    #salario;
    #cidade;
    #quantidade;

    constructor(codigo = 0, descricao = '', cargo = '', salario ='', cidade='', quantidade='') {
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#cargo = cargo;
        this.#salario = salario;
        this.#cidade = cidade;
        this.#quantidade = quantidade;
    }

    
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDesc) {
        this.#descricao = novaDesc;
    }
    get cargo() {
        return this.#cargo;
    }

    set cargo(novoCargo) {
        this.#cargo = novoCargo;
    }
    get salario() {
        return this.#salario;
    }

    set salario(novoSalario) {
        this.#salario = novoSalario;
    }
    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }
    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }

    //override do método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao,
            cargo: this.#cargo,
            salario: this.#salario,
            cidade: this.#cidade,
            quantidade: this.#quantidade
        };
    }

    //camada de modelo acessa a camada de persistencia
    async gravar() {
        const vagaDAO = new VagaDao();
        await vagaDAO.gravar(this);
    }

    async excluir() {
        const vagaDAO = new VagaDao();
        await vagaDAO.excluir(this);
    }

    async atualizar() {
        const vagaDAO = new VagaDao();
        await vagaDAO.atualizar(this);
    }

    async consultar(parametro) {
        const vagaDAO = new VagaDao();
        return await vagaDAO.consultar(parametro);
    }
}
