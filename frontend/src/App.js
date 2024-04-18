import './App.css'
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import CadCandidato from "./Formularios/CadCandidato";
import TelaCadastroCandidato from "./telacadastroCandidato/telaCadastroCandidato";

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="cadCandidato" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="telaCadastro" title="Cadastro de Candidato">
          <TelaCadastroCandidato />
        </Tab>
        <Tab eventKey="cadCandidato" title="Inscrição de Vagas">
          <CadCandidato />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
