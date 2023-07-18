import React, { useState } from 'react';

function Tabela({vetor, itensPorPagina}){
    const [paginaAtual, setPaginaAtual] = useState(1);
    const totalPaginas = Math.ceil(vetor.length / itensPorPagina);
  
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