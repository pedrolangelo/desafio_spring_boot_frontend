import Tabela from './tabela';
import React, { useState, useEffect } from 'react';

function Formulario(){
    const [transferencia, setTransferencia] = useState([]);
    const baseUrl = "http://localhost:8080/transferencias"
    const queryParams = new URLSearchParams();
    const [errorMessage, setErrorMessage] = useState('');

    const filtros = {
        dataInicial : null,
        dataFinal : null,
        nome : null
    }

    const [objFiltro, setFiltro] = useState(filtros);

    const digitar = (e) => {
        setFiltro({... objFiltro, [e.target.name]:e.target.value})
    };

    const validarFormulario = () => {

        if (objFiltro.dataInicial && !objFiltro.dataFinal) {
          setErrorMessage('Por favor, preencha a Data Final');
          return false;
        }
    
        if (!objFiltro.dataInicial && objFiltro.dataFinal) {
          setErrorMessage('Por favor, preencha a Data Inicial');
          return false;
        }
    
        return true;
      };

    const pesquisarTransferencias = () => {
        if(validarFormulario()){
            setErrorMessage("")
            if (objFiltro.dataInicial) {
                queryParams.append("dataInicial", objFiltro.dataInicial);
            }
            
            if (objFiltro.dataFinal) {
                queryParams.append("dataFinal", objFiltro.dataFinal);
            }
               
              if (objFiltro.nome) {
                queryParams.append("nome", objFiltro.nome);
            }
            const url = `${baseUrl}?${queryParams}`;
            fetch(url)
            .then(retorno => retorno.json())
            .then(retorno_convertido => setTransferencia(retorno_convertido))
            .catch(error => {
                setErrorMessage(error.message);
            });
        }
    }

    return(
        <>
            <form>
                <div className='box'>
                    <input type='date' onChange={digitar} name="dataInicial" placeholder='Data Inicio' 
                        className={`form-control ${!objFiltro.dataInicial && objFiltro.dataFinal ? 'is-invalid' : ''}`}
                    />
                    <input type='date' onChange={digitar} name="dataFinal" placeholder='Data Fim' 
                        className={`form-control ${objFiltro.dataInicial && !objFiltro.dataFinal ? 'is-invalid' : ''}`}
                    />
                    <input type='text' onChange={digitar} name="nome" placeholder='Nome do Operador Transicionado' className='form-control'/>
                </div>
                
                {errorMessage && <p>{errorMessage}</p>} {/* Mostrar a mensagem de erro se existir */}
                <input type='button' onClick={pesquisarTransferencias} value='Pesquisar' className='btn btn-primary'/>
            </form>
            <Tabela vetor={transferencia} itensPorPagina={4}/>

        </>
    )
}

export default Formulario;