import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import BarraBusca from "../Componentes/BarraBusca";
import CaixaSelecao from "../Componentes/CaixaSelecao";
import TabelaVagas from "../Tabela/tabelaVagas"



export default function CadCandidato(props) {
    const [validado, setValidado] = useState(false);
    const [listaCandidatos, setListaCandidatos] = useState([]);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
    const [vagaSelecionado, setVagaSelecionado] = useState({});
    const [qtdItem, setQtdItem] = useState(0);
    


    const [vaga, setVaga] = useState({
        codigo: 0,
        dataInscricao:"",
        horaInscricao:"",
        candidato: {
           codigo: candidatoSelecionado.cpf
        },
        vag: []
    });


    useEffect(() => {
        fetch('http://localhost:4000/candidatos', { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            })
            .then((listaCandidatos) => {
                setListaCandidatos(listaCandidatos);
            })
            .catch((erro) => {
               
                alert("Não foi possível recuperar os candidatos do backend.");
            });
    }, []); 

    function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {
            
            setVaga({ ...vaga, [alvo]: e.target.checked });
        }
        else {
           
            setVaga({ ...vaga, [alvo]: e.target.value });
        }
    }

    function gravarInscricoes() {
        fetch('http://localhost:4000/inscricoes',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                codigo: vaga.codigo,
                dataInscricao: vaga.dataInscricao,
                horaInscricao: vaga.horaInscricao,
                candidato: candidatoSelecionado,
                vag:vaga.vag
            })
        })
        .then((resposta) => {
            return resposta.json()
        })
        .then((dados)=>{
            if(dados.status){
                setVaga({...vaga, codigo: dados.codigo})
            }
            alert(dados.mensagem);
        })
        .catch(erro => alert(erro.message));
    }

    const manipulaSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidado(false);
            gravarInscricoes();
        }
        else {
            setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();


    };

    return (
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="idVenda">
                    <Form.Label>Inscrição nº</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0"
                        defaultValue="0"
                        name="id"
                        value={vaga.codigo}
                        onChange={manipularMudanca}
                        disabled
                    />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="datainscricao">
                    <Form.Label>Data de Inscrição</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="dd/mm/aaaa"
                        defaultValue="0"
                        name="dataInscricao"
                        value={vaga.dataInscricao}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="desconto">
                    <Form.Label>Horario de Inscrição</Form.Label>
                    <Form.Control
                        type="time"
                        placeholder="00:00"
                        value={vaga.horaInscricao}
                        name="horaInscricao"
                        onChange={manipularMudanca}
                        required
                        />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o horario da Inscrição
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="12" controlId="valorTotalTributos">
                    <Form.Label>Candidato:</Form.Label>
                    <BarraBusca campoBusca={"nome"}
                        campoChave={"cpf"}
                        dados={listaCandidatos}
                        funcaoSelecao={setCandidatoSelecionado}
                        placeHolder={"Selecione um nome"}
                        required
                        valor={""} />
                </Form.Group>
            </Row>
            <Row>
                {
                
                }
                <Container className="m-3 border">
                    <Row className="m-3">
                        <Col md={2}>
                            <Form.Label>Selecione uma vaga</Form.Label>
                        </Col>
                        <Col>
                            <CaixaSelecao enderecoFonteDados={"http://localhost:4000/vagas"}
                                campoChave={"codigo"}
                                campoExibicao={"descricao"}
                                funcaoSelecao={setVagaSelecionado}
                                localLista={'listaVagas'} 
                                required/>
                        </Col>
                    </Row>
                    <Row>
                        {
                            
                        }
                        <Col md={10}>
                            <Row>
                                <Col md={1}>
                                    <Form.Group>
                                        <Form.Label>Código:</Form.Label>
                                        <Form.Control type="text" value={vagaSelecionado?.codigo} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Descrição:</Form.Label>
                                        <Form.Control type="text" value={vagaSelecionado?.descricao} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Cargo:</Form.Label>
                                        <Form.Control type="text" value={vagaSelecionado?.cargo} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Salario:</Form.Label>
                                        <Form.Control type="text" value={vagaSelecionado?.salario} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Cidade:</Form.Label>
                                        <Form.Control type="text" value={vagaSelecionado?.cidade} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                <Form.Group>
                                        <Form.Label>Quantidade</Form.Label>
                                        <Form.Control type="number"
                                            min={1}
                                            value={qtdItem}
                                            onChange={(e) => {
                                               
                                                const qtdInformada = e.currentTarget.value;
                                                if (!isNaN(qtdInformada)) {
                                                    setQtdItem(qtdInformada);
                                                }
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={1} className="middle">
                                    <Form.Group>
                                        <Form.Label>Adicionar</Form.Label>
                                        <Button onClick={() => {
                                            if (qtdItem > 0) {
                                                const novaVaga = {
                                                    codigo: vagaSelecionado?.codigo,
                                                    descricao: vagaSelecionado?.descricao,
                                                    cargo: vagaSelecionado?.cargo,
                                                    salario: vagaSelecionado?.salario,
                                                    cidade: vagaSelecionado?.cidade,
                                                    quantidade: qtdItem
                                                };
                                                setVaga(prevState => ({
                                                    ...prevState,
                                                    vag: [...prevState.vag, novaVaga]
                                                }));
                                            }
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                            </svg>
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <p><strong>Lista de vagas selecionadas</strong></p>
                        <TabelaVagas
                            listaVagas={vaga.vag}
                            setVaga={setVaga}
                            dadosVaga={vaga} />
                    </Row>
                </Container>
            </Row>
            <Button type="submit">Confirmar a Inscrição</Button>
        </Form>
    );
}