import InscricaoDAO from "../Persistencia/inscricaoDAO.js";
export default class Pedido {
    #codigo;
    #dataInscricao;
    #horaInscricao;
    #candidato;
    #vag;

    constructor(codigo, dataInscricao, horaInscricao, candidato, vag) {
        this.#codigo = codigo;
        this.#dataInscricao = dataInscricao;
        this.#horaInscricao = horaInscricao;
        this.#candidato = candidato;
        this.#vag = vag;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }
    get dataInscricao() {
        return this.#dataInscricao;
    }

    set dataInscricao(novaDataInscricao) {
        this.#dataInscricao = novaDataInscricao;
    }
    get horaInscricao() {
        return this.#horaInscricao;
    }

    set horaInscricao(novoHoraInscricao) {
        this.#horaInscricao = novoHoraInscricao;
    }

    // Código do Cliente
    get candidato() {
        return this.#candidato;
    }

    set candidato(novoCandidato) {
        this.#candidato = novoCandidato;
        
    }
    get vag() {
        return this.#vag;
    }

    set vag(novoVag) {
        this.#vag = novoVag;
    }
    toJSON() {
        return {
            'codigo': this.#codigo,
            'dataInscricao': this.#dataInscricao,
            'horaInscricao': this.#horaInscricao,
            'candidato': this.#candidato,
            'vag': this.#vag,
           

        };
    }

    async gravar() {
        const inscricaoDAO = new InscricaoDAO();
        this.codigo = await inscricaoDAO.gravar(this);
    }

    async atualizar() {
        //const pedidoDAO = new PedidoDAO();
        //await pedidoDAO.alterar(this);
    }

    async apagar() {
        //const pedidoDAO = new PedidoDAO();
        //await pedidoDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const inscricaoDAO = new InscricaoDAO();
        const listaInscricao = await inscricaoDAO.consultar(termoBusca);
        return listaInscricao;
    }
    
}
