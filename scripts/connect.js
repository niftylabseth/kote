
 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider2;


// Address of the selected account
let selectedAccount;

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*500);
    });
}

/**
 * Setup the orchestra
 */
function init() {
fetchAccountData();
 


  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "e49a1638d7a84eff8c8558e734337661",
      }
    }
  };
  
  

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    theme: "dark",
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

}

/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {
    
  const web3 = new Web3(provider2);
  const chainId = await web3.eth.getChainId();
  
    if(chainId != "42161"){
       document.getElementById("WrongNetwork").style.display = "flex"
       document.getElementById("WrongNetwork").style.zindex = "99999999999999999999"
      document.getElementById("Gate__Button").onclick = console.log("locked"); 
      document.getElementById("Gate__Button").innerHTML = "Gate is Locked"; 
      document.getElementById("wrong-network").style.display = "flex";
      play();
      window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0xa4b1",
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
        chainName: "Arbitrum One",
        nativeCurrency: {
            name: "AETH",
            symbol: "AETH",
            decimals: 18
        },
        blockExplorerUrls: ["https://arbiscan.io"]
    }]
    
});

  }
  else{
        document.getElementById("WrongNetwork").style.display = "none";
        document.getElementById("wrong-network").style.display = "none";
       document.querySelector("#Inventory").style.display = "inline";
          document.getElementById("Gate__Button").onclick = enterGate(); 
      document.getElementById("Gate__Button").innerHTML = "Enter The Gates"; 
     play();

  const accounts = await web3.eth.getAccounts();
  selectedAccount = accounts[0];
  
              document.getElementById("squireTotal").innerHTML = "";
        document.getElementById("fiefTotal").innerHTML = "";
        document.getElementById("potionTotal").innerHTML = "";
        document.getElementById("ringTotal").innerHTML = "";
        document.getElementById("trinketTotal").innerHTML = "";

      document.getElementById("squiresInventory").innerHTML = "";

        document.getElementById("squiresWaitingForest").innerHTML = "";
        document.getElementById("squiresQuestingForest").innerHTML = "";
         document.getElementById("questorsF").innerHTML = "";
         document.getElementById("questorsFQ").innerHTML = "";
  
        document.getElementById("squiresWaitingCavern").innerHTML = "";
        document.getElementById("squiresQuestingCavern").innerHTML = "";
         document.getElementById("questorsC").innerHTML = "";
         document.getElementById("questorsCQ").innerHTML = "";
    
            document.getElementById("squiresWaitingTemple").innerHTML = "";
        document.getElementById("squiresQuestingTemple").innerHTML = "";
         document.getElementById("questorsT").innerHTML = "";
         document.getElementById("questorsTQ").innerHTML = "";
    
                document.getElementById("squiresWaitingMountain").innerHTML = "";
        document.getElementById("squiresQuestingMountain").innerHTML = "";
         document.getElementById("questorsM").innerHTML = "";
         document.getElementById("questorsMQ").innerHTML = "";

  
   graphNQ();
   graphQF();
   graphQC();
   graphQM();
    graphQT();
    fiefTotal();
   graphQOld();
   graph();
   squireTotal();
   potionTotal();
   ringTotal();
   trinketTotal();
   squireTotalCheck();
   squiresInventory();
  squiresWaitingForest();
  squiresWaitingCavern();
  squiresWaitingMountain();
   squiresWaitingTemple();
   

  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address);
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    // Fill in the templated row and put in the document
  });

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  document.querySelector("#prepare").style.display = "none";
  document.querySelector("#Gate").style.display = "flex";
  }
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
 
  document.querySelector("#prepare").style.display = "none";
  document.querySelector("#Gate").style.display = "flex";
  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.

  await fetchAccountData(provider2);
 
 

}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {


  try {
    provider2 = await web3Modal.connect();
  } catch(e) {
    return;
  }

  // Subscribe to accounts change
  provider2.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider2.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider2.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
    
}

async function graphNQ() {
    

let account = selectedAccount.toLowerCase();

        const results = await axios.post(
     `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`,
     {
         query: `
{
  squires (
  where: {
  owner: "${account}"
  questing: false
      }
  )

  {
    id
    faith
    luck
    strength
    wisdom
    genesis
    type
    questing
    owner
    finish
    lastfief
    lastupgrade
    image
    typename
  }
}`
         
     }
    );
    return results.data.data.squires;
}

async function graphQOld() {
    

let account = selectedAccount.toLowerCase();

        const results = await axios.post(
     `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`,
     {
         query: `
{
  squires (
  where: {owner: "${account}"
  questing: true
      }
  )

  {
    id
    faith
    luck
    strength
    type
    wisdom
    genesis
    owner
    questing
  }
}`
         
     }
    );
    return results.data.data.squires;
}

async function graphQF() {
    

let account = selectedAccount.toLowerCase();

        const results = await axios.post(
     `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`,
     {
         query: `
{
  squires (
  where: {
  owner: "${account}"
  questing: true
  questtype: "forest"
      }
  )

  {
    id
    faith
    luck
    strength
    wisdom
    genesis
    type
    questing
    owner
    finish
    lastfief
    lastupgrade
    image
    typename
  }
}`
         
     }
    );
    return results.data.data.squires;
}

async function graphQC() {
    

let account = selectedAccount.toLowerCase();

        const results = await axios.post(
     `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`,
     {
         query: `
{
  squires (
  where: {
  owner: "${account}"
  questing: true
  questtype: "cavern"
      }
  )

  {
    id
    faith
    luck
    strength
    wisdom
    genesis
    type
    questing
    owner
    finish
    lastfief
    lastupgrade
    image
    typename
  }
}`
         
     }
    );
    return results.data.data.squires;
}

async function graphQM() {
    

let account = selectedAccount.toLowerCase();

        const results = await axios.post(
     `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`,
     {
         query: `
{
  squires (
  where: {
  owner: "${account}"
  questing: true
  questtype: "mountain"
      }
  )

  {
    id
    faith
    luck
    strength
    wisdom
    genesis
    type
    questing
    owner
    finish
    lastfief
    lastupgrade
    image
    typename
  }
}`
         
     }
    );
    return results.data.data.squires;
}

async function graphQT() {
    

let account = selectedAccount.toLowerCase();

        const results = await axios.post(
     `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`,
     {
         query: `
{
  squires (
  where: {
  owner: "${account}"
  questing: true
  questtype: "temple"
      }
  )

  {
    id
    faith
    luck
    strength
    wisdom
    genesis
    type
    questing
    owner
    finish
    lastfief
    lastupgrade
    image
    typename
  }
}`
         
     }
    );
    return results.data.data.squires;
}

async function graph() {
    
let account = selectedAccount.toLowerCase();

        const results = await axios.post(
     `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`,
     {
         query: `
{
  squires (
  where: {
  owner: "${account}"
      }
  )

  {
    id
    faith
    luck
    strength
    wisdom
    genesis
    type
    questing
    questtype
    owner
    finish
    lastfief
    lastupgrade
    image
    typename
    lastitemid
    lastitemtype
    lastitemname
    lastitemlevel
    lastitemclass
    lastitemimage
    lastitemrarity
  }
}`
         
     }
    );
    return results.data.data.squires;
}

async function leaveTheForest(arr,restart) {
    
    let squireArray = arr;
    let account = selectedAccount.toLowerCase();
    
    var url = "https://kote-quest-bot.herokuapp.com/requestSig";
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
       
          let output = JSON.parse(xhr.responseText);
          forestCallback(xhr.responseText,restart); //Callback function
       }};
    
    var data = `{
      "wallet": "${account}",
      "squires": ${arr},
      "quest": "forest"
    }`;
    
    xhr.send(data);
}

async function leaveTheCavern(arr,restart) {
    
    let squireArray = arr;
    let account = selectedAccount.toLowerCase();
    
    var url = "https://kote-quest-bot.herokuapp.com/requestSig";
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
       
          let output = JSON.parse(xhr.responseText);
          cavernCallback(xhr.responseText,restart); //Callback function
       }};
    
    var data = `{
      "wallet": "${account}",
      "squires": ${arr},
      "quest": "cavern"
    }`;
    
    xhr.send(data);
}

async function leaveTheMountain(arr,restart) {
    
    let squireArray = arr;
    let account = selectedAccount.toLowerCase();
    
    var url = "https://kote-quest-bot.herokuapp.com/requestSig";
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
      
          let output = JSON.parse(xhr.responseText);
          mountainCallback(xhr.responseText,restart); //Callback function
       }};
    
    var data = `{
      "wallet": "${account}",
      "squires": ${arr},
      "quest": "mountain"
    }`;
    
    xhr.send(data);
}

async function leaveTheTemple(arr,restart) {
    
    let squireArray = arr;
    let account = selectedAccount.toLowerCase();
    
    var url = "https://kote-quest-bot.herokuapp.com/requestSig";
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
    
          let output = JSON.parse(xhr.responseText);
          templeCallback(xhr.responseText,restart); //Callback function
       }};
    
    var data = `{
      "wallet": "${account}",
      "squires": ${arr},
      "quest": "temple"
    }`;
    
    xhr.send(data);
}



window.addEventListener('load', async () => {
document.getElementById("loading").style.display = "inline"; 
document.getElementById("logo-loading").style.display = "inline"; 
  init();

  fiefTotal();
  ringTotal();
  potionTotal();
  trinketTotal();
  fetchAccountData();
  checkApproveForest();
  checkApproveCavern();
  checkApproveMountain();
   checkWorship();
  try {
          await ethereum.enable();
      } catch (error) {}
     document.getElementById("logo-loading").style.display = "none"; 
   document.getElementById("loading").style.display = "none"; 
   document.getElementById("image").style.display = "inline";
  document.getElementById("connectb").style.display = "inline";
  document.getElementById("tutorialb").style.display = "inline";
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
});