function Formulario(){
    return(
        <form>
            <div className='box'>
                <input type='text' placeholder='Data Inicio' className='form-control'/>
                <input type='text' placeholder='Data Fim' className='form-control'/>
                <input type='text' placeholder='Nome do Operador Transicionado' className='form-control'/>
            </div>

            <input type='button' value='cadastrar' className='btn btn-primary'/>
        </form>
    )
}

export default Formulario;