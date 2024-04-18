import CandidatoDAO from "../Persistencia/candidatoDAO.js";

export default class Candidato {
    #cpf;
    #nome;
    #telefone;
    #endereco;
    #email;
    

    constructor(cpf = 0, nome = "", telefone = "", endereco = "", email = "") {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#email = email;
       
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get telefone() {
        return this.#telefone;
    }
    
    set telefone(novoTel) {
        this.#telefone = novoTel;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEnd) {
        this.#endereco = novoEnd;
    }

    get email() {
        return this.#email;
    }

    set email(novaEmail) {
        this.#email = novaEmail;
    }
    

    toJSON() {
        return {
            cpf: this.#cpf,
            nome: this.#nome,
            telefone: this.#telefone,
            endereco: this.#endereco,
            email: this.#email,
           
        }
    }
    async gravar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.gravar(this);
    }

    async excluir() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.excluir(this);
    }

    async atualizar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.atualizar(this);
    }

    async consultar(termo) {
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.consultar(termo);
    }
}
