CREATE TABLE vaga (
    vaga_codigo INT NOT NULL AUTO_INCREMENT, 
    vaga_descricao VARCHAR(255) NOT NULL,
    vaga_cargo VARCHAR(255) NOT NULL,
    vaga_salario VARCHAR(255) NOT NULL,
    vaga_cidade VARCHAR(255) NOT NULL,
    vaga_quantidade VARCHAR(255) NOT NULL,
    CONSTRAINT pk_vaga PRIMARY KEY (vaga_codigo)
);

CREATE TABLE candidato (
    cand_cpf VARCHAR(255) NOT NULL,
    cand_nome VARCHAR(255) NOT NULL,
    cand_telefone VARCHAR(15) NOT NULL,
    cand_endereco VARCHAR(255) NOT NULL,
    cand_email VARCHAR(255) NOT NULL,
    CONSTRAINT pk_candidato PRIMARY KEY (cand_cpf),
);

CREATE TABLE inscricao (
    codigo_inscricao INT AUTO_INCREMENT,
    data_inscricao DATE NOT NULL,
    horario_inscricao TIME NOT NULL,
    candi_cpf VARCHAR(255) NOT NULL,
    vaga_codigo INT NOT NULL,
    PRIMARY KEY (codigo_inscricao, candi_cpf, vaga_codigo),
    FOREIGN KEY (candi_cpf) REFERENCES candidato(cand_cpf),
    FOREIGN KEY (vaga_codigo) REFERENCES vaga(vaga_codigo)
);