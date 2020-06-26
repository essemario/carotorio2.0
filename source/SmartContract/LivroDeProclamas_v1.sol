pragma solidity 0.5.4;

contract LivroDeProclamas {
    struct Nubente {
        string cpf;
        string dataObject; //JSON -> Nome, EstadoCivil, DtNasc, NomeDoPai, NomeDaMae, Naturalidade, Domicilio, tokenECpf
    }
    
    struct Proclama {
        Nubente nubente_1;
        Nubente nubente_2;
        uint256 dataPublicacao;
    }
    
    mapping (address => Proclama) proclamas;
    address[] public listaDeProclamas;
    
    function setProclama(address _address,
                         string memory n1_cpf, 
                         string memory n1_json,
                         string memory n2_cpf, 
                         string memory n2_json) public {

        proclamas[_address].nubente_1.cpf = n1_cpf;
        proclamas[_address].nubente_1.dataObject = n1_json;
        
        proclamas[_address].nubente_2.cpf = n2_cpf;
        proclamas[_address].nubente_2.dataObject = n2_json;

        proclamas[_address].dataPublicacao = now;
        
        listaDeProclamas.push(_address);
    }
    
    function getProclamas() view public returns(address[] memory) {
        return listaDeProclamas;
    }
    
    function getProclama(address _address) view public returns (string memory, string memory, uint256) {
        return (proclamas[_address].nubente_1.dataObject, proclamas[_address].nubente_2.dataObject, proclamas[_address].dataPublicacao);
    }
    
    function proclamaIsConcluded(address _address) public view returns (bool) {
        return (now - proclamas[_address].dataPublicacao >= 1590481925);
    }
}
