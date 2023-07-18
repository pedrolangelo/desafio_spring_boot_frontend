import React, { useState, useEffect } from 'react';

function Tabela({vetor, itensPorPagina}){
    const [paginaAtual, setPaginaAtual] = useState(1);
    const totalPaginas = Math.ceil(vetor.length / itensPorPagina);
    const baseUrl = "http://localhost:8080/transferencias"
    const [saldoTotal, setSaldoTotal] = useState()
    const [saldoPeriodo, setSaldoPeriodo] = useState()

    useEffect(() => {
        fetch(baseUrl)
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
            const soma = retorno_convertido.reduce((acumulador, objeto) => acumulador + objeto.valor, 0);
            setSaldoTotal(soma.toFixed(2));
        })
    }, [])

    useEffect(() => {
        const soma = vetor.reduce((acumulador, objeto) => acumulador + objeto.valor, 0);
        setSaldoPeriodo(soma.toFixed(2));
    }, [vetor])

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const itensPaginaAtual = [];

    for (let i = indicePrimeiroItem; i < indiceUltimoItem && i < vetor.length; i++) {
      itensPaginaAtual.push(vetor[i]);
    }
  
    const alterarPagina = (numeroPagina) => {
      setPaginaAtual(numeroPagina);
    };

    return(
        <>
            <div className='saldo'>
                <p>Saldo Total: R$ {saldoTotal}</p>
                <p>Saldo no periodo: R$ {saldoPeriodo}</p>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Valencia</th>
                        <th>Tipo</th>
                        <th>Nome do operador transacionado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itensPaginaAtual.map((item, key) => (
                            <tr key={key}>
                                <td>{item.data}</td>
                                <td>{item.valor}</td>
                                <td>{item.tipo}</td>
                                <td>{item.nome}</td>
                            </tr>
                        ))
                    }  
                </tbody>
            </table>

            <ul className='pagination justify-content-center'>
            {Array.from({ length: totalPaginas }).map((_, index) => (
            <li className={`page-item${paginaAtual === index + 1 ? ' active' : ''}`} key={index + 1}>
                <button className='page-link' onClick={() => alterarPagina(index + 1)}>
                {index + 1}
                </button>
            </li>
            ))}
            </ul>
        </>
    )
}

export default Tabela;