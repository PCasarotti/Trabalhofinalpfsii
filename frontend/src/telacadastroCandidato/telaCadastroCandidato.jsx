import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CaixaSelecao from '../Componentes/CaixaSelecao';

export default function TelaCadastroCandidato() {
    const [candidato, setCandidato] = useState({
        cpf: '',
        nome: '',
        telefone: '',
        endereco: '',
        email: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setCandidato(prevCandidato => ({
            ...prevCandidato,
            [name]: value
        }));
    }

    function gravarCandidato() {
        fetch('http://localhost:4000/candidatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidato)
        })
            .then(resposta => resposta.json())
            .then(dados => {
                alert(dados.mensagem);
            })
            .catch(erro => alert(erro.message));
    }

    return (
        <Form>
            <Row className="mb-3">
                <Col md={3}>
                    <Form.Group controlId="formCPF">
                        <Form.Label>CPF:</Form.Label>
                        <Form.Control type="text" name="cpf" value={candidato.cpf} onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" name="nome" value={candidato.nome} onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group controlId="formTelefone">
                        <Form.Label>Telefone:</Form.Label>
                        <Form.Control type="text" name="telefone" value={candidato.telefone} onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={8}>
                    <Form.Group controlId="formEndereco">
                        <Form.Label>Endereço:</Form.Label>
                        <Form.Control type="text" name="endereco" value={candidato.endereco} onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" name="email" value={candidato.email} onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="button" onClick={gravarCandidato}>
                Cadastrar Candidato
            </Button>
        </Form>
    );
}
