if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  window.ethereum.enable()
} else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
} else {
  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log (window.web3.currentProvider)
  

var contractAddress;// = '0xDF49440ab93e8143ea656d690e5dB939a66569E4';
var abi; //JSON.parse( '[{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"n1_cpf","type":"string"},{"name":"n1_json","type":"string"},{"name":"n2_cpf","type":"string"},{"name":"n2_json","type":"string"}],"name":"setProclama","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getProclamas","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getProclama","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"proclamaIsConcluded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listaDeProclamas","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]' );
var account; 

contract;// = new web3.eth.Contract(abi, contractAddress);

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Ocorreu um erro ao buscar suas contas.");
    return;
  }
  if (accounts.length == 0) {
    alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

function setProclama() {
  address = $("#set-address").val();
  n1_cpf = $("#set-n1_cpf").val();
  n1_json = $("#set-n1_json").val();
  n2_cpf = $("#set-n2_cpf").val();
  n2_json = $("#set-n2_json").val();

  contract.methods.setProclama(address, n1_cpf, n1_json, n2_cpf, n2_json).send({from:account}).then( function(tx) { 
    console.log("Transaction: ", tx); 
  });
}

function getProclame() {
  address = $("#show-address").val();
  //console.log("ADDR: ", address);
  contract.methods.getProclama(address).call({from:account}).then(function (resultado) {
    var date = new Date((parseInt(resultado[2] * 1000)));
    
    document.getElementById('show-n1_json').innerHTML = resultado[0];
    document.getElementById('show-n2_json').innerHTML = resultado[1];
    document.getElementById('show-timestamp').innerHTML = date.toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });    
  });   
}

function getStatus() {
  address = $("#check-address").val();
  contract.methods.proclamaIsConcluded(address).call({from:account}).then(function (resultado) {
    document.getElementById('check-proclameIsConcluded').innerHTML = (resultado) ? "Sim" : "Não";
  });    
}

function setContrato() {
  setConfig();
}

function setConfig(){
  contractAddress = $("#contract-address").val();
  if(contractAddress != null && contractAddress !== "" && abi != null && abi !== ""){
    contract = new web3.eth.Contract(abi, contractAddress);
  }else {
    alert("ERRO AO CONFIGURAR O CONTRATO!!");
  }
}