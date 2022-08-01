const provider3 = new ethers.providers.Web3Provider(window.ethereum, "homestead");

const knights = {
    address: "0x32a322c7c77840c383961b8ab503c9f45440c81f",
    abi: [
        "function balanceOf(address owner) public view virtual override returns (uint256)",
    ]
};

  
// Defining async function
async function getapi() {
      await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
    const api_url = 
      `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x32A322C7C77840c383961B8aB503c9f45440c81f&address=${userAddress}&page=1&offset=100&sort=asc&apikey=E3TFKV895Y9JQX6R4RVBAZDKSU2TVG4AB8`;
    
    // Storing response
    const response = await fetch(api_url);
    
    // Storing data in form of JSON
    const data = await response.json();
    console.log(data);
    
    const result = "OK"
  
     const hasValue = hasKnight(data,result);
     console.log(hasValue);
     
     if(hasValue == false){
      document.getElementById("Gate__Button").onclick = console.log("locked"); 
      document.getElementById("Gate__Button").innerHTML = "Gate is Locked"; 
      document.getElementById("no-knights").style.display = "flex";
     }
     
}

function hasKnight(json, findValue) {
    const values = Object.values(json);
    let hasValue = values.includes(findValue);
    values.forEach(function(value) {
        if (typeof value === "object") {
            hasValue = hasValue || hasKnight(value, findValue);
        }
    })
    return hasValue;
}



