pragma solidity 0.5.4;

contract RegistroDeCasamentos {
    struct Conjuge {
        string cpf;
        string dataObject; //JSON -> Nome, DtNasc, Naturalidade, RegistroDeNascimento, Nacionalidade, NomeDoPai, NomeDaMae, tokenECpf
    }
    
    struct Casamento {
        Conjuge conjuge_1;
        Conjuge conjuge_2;
        string regimeDeBens;
        string alteracoesDeNome;
        uint256 dataDeRegistro;
    }
    
    mapping (address => Casamento) casamentos;
    address[] public listaDeCasamentos;
    
    function setCasamento(address _address,
                         string memory c1_cpf, 
                         string memory c1_json,
                         string memory c2_cpf, 
                         string memory c2_json, 
                         string memory regimeDeBens, 
                         string memory alteracoesDeNome) public {

        casamentos[_address].conjuge_1.cpf = c1_cpf;
        casamentos[_address].conjuge_1.dataObject = c1_json;
        
        casamentos[_address].conjuge_2.cpf = c2_cpf;
        casamentos[_address].conjuge_2.dataObject = c2_json;
        
        casamentos[_address].regimeDeBens = regimeDeBens;
        casamentos[_address].alteracoesDeNome = alteracoesDeNome;

        casamentos[_address].dataDeRegistro = now;
        
        listaDeCasamentos.push(_address);
    }
    
    function getCasamentos() view public returns(address[] memory) {
        return listaDeCasamentos;
    }
    
    function getCasamento(address _address) view public returns (string memory, string memory, string memory, string memory, uint256) {
        return (casamentos[_address].conjuge_1.dataObject, 
                casamentos[_address].conjuge_2.dataObject,
                casamentos[_address].regimeDeBens, 
                casamentos[_address].alteracoesDeNome, 
                casamentos[_address].dataDeRegistro);
    }
}
