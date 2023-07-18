import Tabela from './tabela';
import React, { useState, useEffect } from 'react';

function Formulario(){
    const [transferencia, setTransferencia] = useState([]);
    const baseUrl = "http://localhost:8080/transferencias"
    const queryParams = new URLSearchParams();

    const filtros = {
        dataInicial : null,
        dataFinal : null,
        nome : null
    }

    const [objFiltro, setFiltro] = useState(filtros);

    const digitar = (e) => {
        setFiltro({... objFiltro, [e.target.name]:e.target.value})
    };

    const pesquisarTransferencias = () => {
        if (objFiltro.dataInicial) {
          console.log(objFiltro.dataInicial)
          queryParams.append("dataInicial", objFiltro.dataInicial);
        }
        
        if (objFiltro.dataFinal) {
            console.log(objFiltro.dataFinal)
            queryParams.append("dataFinal", objFiltro.dataFinal);
        }
           
          if (objFiltro.nome) {
            queryParams.append("nome", objFiltro.nome);
        }
        const url = `${baseUrl}?${queryParams}`;
        console.log(url)
        fetch(url)
        .then(retorno => retorno.json())
        .then(retorno_convertido => setTransferencia(retorno_convertido));
    }

    return(
        <>
            <form>
                <div className='box'>
                    <input type='text' onChange={digitar} name="dataInicial" placeholder='Data Inicio' className='form-control'/>
                    <input type='text' onChange={digitar} name="dataFinal" placeholder='Data Fim' className='form-control'/>
                    <input type='text' onChange={digitar} name="nome" placeholder='Nome do Operador Transicionado' className='form-control'/>
                </div>

                <input type='button' onClick={pesquisarTransferencias} value='Pesquisar' className='btn btn-primary'/>
            </form>
            <Tabela vetor={transferencia} itensPorPagina={4}/>

        </>
    )
}

export default Formulario;