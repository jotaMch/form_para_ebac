import React from "react";
import styled from 'styled-components';
import { BiSolidXCircle } from 'react-icons/bi';



const StyledSubmitButton = styled.button`
    background-color: #08000f;
    box-shadow: 0 0 6px #a047ed;
    color: white;
    padding: 4px 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const StyledResetButton = styled.button`
    background-color: #c90036;
    color: white;
    padding: 4px 8px;
    height: 40px;              
    margin: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;


const StyledDetalhesButton = styled.button`
    background-color: #260019;
    color: white;
    padding: 4px 8px;
    height: 40px;     
    margin: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const TextError = styled.p `
    color: red;
    font-size: 12px;
    `;

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: {
                value: "",
                isError: false,
                isValid: false
            },
            idade: {
                value: "",
                isError: false,
                isValid: false
            },   
            cpf: {
                value: "cpf",
            },
            genero: {
                value: "",
            },
            estadoCivil: {
                value: "",
            },
            tipoDocumento: {
                value: "rg", // valor padrão para o tipo de documento
            },
            detalhesVisiveis: {},


            loadingVisible: false,
            formularioEnviado: false,
            dadosFormulariosEnviados: [], // Array para armazenar os dados de todos os formulários enviados
            modalVisible: false,
            modal: false,
        }
    }

    toggleDetalhes = (index) => {
        this.setState((prevState) => ({
            detalhesVisiveis: {
                ...prevState.detalhesVisiveis,
                [index]: !prevState.detalhesVisiveis[index],
            },
        }));
    };


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: {
                value,
            },
        });
    };

    handleChangeGender = (event) => {
        const { value } = event.target;
        this.setState({
            genero: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        // acessar os valores dos campos no estado do componente
        const { nome, idade, genero, estadoCivil, tipoDocumento } = this.state;
        const dadosFormulario = {
            nome: nome.value,
            idade: idade.value,
            genero: genero,
            estadoCivil: estadoCivil.value,
            tipoDocumento: tipoDocumento.value,
        };
        if (nome.value === "") {
            this.setState({
                nome: {
                    ...nome,
                    isError: true
                },
                idade: {
                    ...idade,
                    isError: true
                }
            });
            return; 
        }
        this.setState({ loadingVisible: true });
        setTimeout(() => {
            this.setState((prevState) => ({
                dadosFormulariosEnviados: [...prevState.dadosFormulariosEnviados, dadosFormulario],
    
                loadingVisible: false,
                formularioEnviado: true,
                dadosFormulario,
    
                nome: { value: "" },
                idade: { value: "" },
                genero: "", 
                estadoCivil: { value: "" },
                tipoDocumento: { value: "rg" },
            }));
            
    }, 2000);
    };

    handleReset = (index) => {
        const newDadosFormularios = this.state.dadosFormulariosEnviados.slice();
        newDadosFormularios.splice(index, 1);
        
        this.setState({
            dadosFormulariosEnviados: newDadosFormularios
        });
    }


    render() {
        return(
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                <h3>Dados</h3>
                    <label>Nome <span className="req">*</span></label>
                    <input type="text" value={this.state.nome.value} name="nome" 
                    onChange={this.handleChange}/>
                    {this.state.nome.isError &&
                    <TextError>O nome é obrigatório</TextError>}
                    {/* {this.state.nome.isError &&
                    <TextError>O nome está incompleto</TextError>} */}

                    <label>Idade <span className="req">*</span></label>
                    <input type="number" value={this.state.idade.value} name="idade"
                    onChange={this.handleChange}/>
                {this.state.idade.isError && <TextError>Este campo é requerido</TextError>}


                    <label>Gênero:</label>   
                    
                        <div>
                            <input 
                            type="radio"    name="genero"
                            value="Masculino"    id="masculino" 
                            onChange={this.handleChangeGender}
                            />
                            <label>masculino</label>
                        </div> 

                        <div>
                            <input 
                            type="radio"    name="genero" 
                            value="feminino"     id="feminino"
                            onChange={this.handleChangeGender}

                            />
                            <label>feminino</label>
                        </div> 

                        <div>
                            <input 
                            type="radio"  name="genero" 
                            value="outro"  id="outro"
                            onChange={this.handleChangeGender}

                            />
                            <label>outro</label>
                        </div> 


                    <label htmlFor="estadoCivil">Estado Civil:</label>

                    <select 
                    name="estadoCivil" value={this.state.estadoCivil.value}
                    id="estadoCivil"  onChange={this.handleChange}
                    >


                        <option>Selecione</option>
                        <option value="solteiro">solteiro(a)</option>
                        <option value="casado">casado(a)</option>
                        <option value="divorciado">divorciado(a)</option>
                        <option value="viuvo">viúvo(a)</option>  


                    </select>        


                    <div>
                        
                        <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                        
                        <select
                        value={this.state.tipoDocumento.value}
                        onChange={this.handleChange}
                        name="tipoDocumento" 
                        id="tipoDocumento">
                            <option value="rg">RG</option>
                            <option value="cpf">CPF</option>
                            <option value="passaporte">CNPJ</option>
                        </select>
                    </div>
                    <StyledSubmitButton type="submit">Enviar</StyledSubmitButton>
                </form>

                {this.state.loadingVisible && <div className="loading"></div>}
                {this.state.dadosFormulariosEnviados.length > 0 && (
                <table className="table-div">
                    <div className="thead-div">
                        <h2>Lista de dados</h2>
                    </div>

                    <div className="tbody-div">
                        {this.state.dadosFormulariosEnviados.map((formulario, index) => (
                            <ol
                                key={`${formulario.nome}-${formulario.idade}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: "column",
                                }}
                            >

                                <li style={{ color: '#fff'}}>

                                    <ul className="resposta"  style={{ display: 'flex', alignItems: 'center', listStyle: 'none', padding: 10 }}>
                                        <li style={{ padding: '0 8px' }}>{formulario.nome} </li>
                                        <span style={{ color: "#a047ed" }}>  -  </span>
                                        <li style={{ padding: '0 8px' }}>{formulario.idade} anos </li>
                                        <span style={{ color: "#a047ed" }}>  -  </span>
                                        <li style={{ padding: '0 8px' }}>Genêro {formulario.genero} </li>
                                        <span style={{ color: "#a047ed" }}>  -  </span>
                                        <li style={{ padding: '0 8px' }}>Estado cívil {formulario.estadoCivil} </li>
                                        <span style={{ color: "#a047ed" }}>  -  </span>
                                        <li style={{ padding: '0 8px' }}>{formulario.tipoDocumento} </li>
                                        <StyledResetButton onClick={() => this.handleReset(index)}>Reset</StyledResetButton>
                                        <StyledDetalhesButton onClick={() => this.toggleDetalhes(index)}>
                                            {this.state.detalhesVisiveis[index] ? "Fechar" : "Detalhes"}
                                        </StyledDetalhesButton>
                                    </ul>
                                </li>
                                
                                    {this.state.detalhesVisiveis[index] && (
                                        <nav  style={{ color: "#fff"}}>
                                            
                                            <ul style={{ padding: 0 }}>
                                                <li style={{ listStyle: 'none', padding: '4px', textAlign: 'start' }}>Nome : {formulario.nome} </li>
                                                <li style={{ listStyle: 'none', padding: '4px', textAlign: 'start' }}>Idade : {formulario.idade} anos </li>
                                                <li style={{ listStyle: 'none', padding: '4px', textAlign: 'start' }}>Genêro : {formulario.genero} </li>
                                                <li style={{ listStyle: 'none', padding: '4px', textAlign: 'start' }}>Estado cívil : {formulario.estadoCivil} </li>
                                                <li style={{ listStyle: 'none', padding: '4px', textAlign: 'start' }}>Tipo de documento : {formulario.tipoDocumento} </li>
                                                <span>
                                                <BiSolidXCircle onClick={() => this.toggleDetalhes(index)} />
                                                </span>
                                            </ul>
                                        </nav>
                                    )}
                                

                                

                            </ol>
                        
                        ))}
                </div>
            </table>
            )}
        </div>
        );
    }
}

export default Form;