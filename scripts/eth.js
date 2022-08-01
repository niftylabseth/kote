const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const fief = {
    address: "0x32A322C7C77840c383961B8aB503c9f45440c81f",
    abi: [
        "function balanceOf(address account) external view returns (uint256)",
        "function transfer(address recipient, uint256 amount) public virtual override returns (bool)"
    ]
};

const squire = {
    address: "0xF7fBE8EEc9063AA518D11639565B018468bB4AbB",
    abi: [
        "function balanceOf(address owner) public view virtual override returns (uint256)",
        "function buySquire() public payable",
        "function tokenOfOwnerByIndex(address owner, uint256 index) public view override returns (uint256 tokenId)",
        "function tokensOfOwner(address owner) public view returns (uint256[] memory)",
        "function faithByTokenId(uint256 tokenId) external view returns (uint)",
        "function wisdomByTokenId(uint256 tokenId) external view returns (uint)",
        "function luckByTokenId(uint256 tokenId) external view returns (uint)",
        "function genesisByTokenId(uint256 tokenId) external view returns (uint)",
        "function strengthByTokenId(uint256 tokenId) external view returns (uint)",
        "function squireTypeByTokenId(uint256 tokenId) external view returns (uint)",
        "function setApprovalForAll(address operator, bool _approved) external",
        "function isApprovedForAll(address owner, address operator) external view returns (bool)"
    ]
};

const forest = {
    address: "0x1C478220c520a20924295E2325D0cE96ff64dCA6",
    abi: [
        "function finishForestQuest(uint256[] calldata tokenIds, uint256[] calldata seeds, bytes memory signature, bool restart, uint256 boost) external",
        "function questForest(uint256[] calldata squireIds) external",
        "function checkSquires(address owner) public view returns (uint256[] memory)",
        "function squiresQuestingForest(address account) external view returns (uint256[] memory)",
        "function squireToAmountClaimed(uint256) public view returns (uint256)",
        "function lastUpgrade(uint256) public view returns (uint)",
        "function lastUpgradeType(uint256) public view returns (string)",
        "function tokenTimer(uint256) public view returns (uint256)",
         "function checkIfSquireCanLeave(uint256 squireId) public view returns (bool)"
    ]
};

const cavern = {
    address: "0x011afB2FD1f67E7FD8f2A7d926245019ED93a900",
    abi: [
        "function finishCavernQuest(uint256[] calldata tokenIds, uint256[] calldata seeds, bytes memory signature, bool restart, uint256 boost) external",
        "function questCavern(uint256[] calldata squireIds) external",
        "function checkSquires(address owner) public view returns (uint256[] memory)",
        "function squiresQuestingCavern(address account) external view returns (uint256[] memory)",
        "function squireToAmountClaimed(uint256) public view returns (uint256)",
        "function lastUpgrade(uint256) public view returns (uint)",
        "function lastUpgradeType(uint256) public view returns (string)",
        "function tokenTimer(uint256) public view returns (uint256)",
         "function checkIfSquireCanLeave(uint256 squireId) public view returns (bool)"
    ]
};

const mountain = {
    address: "0xEE6F650593766d9114236986609ae52252c58d1a",
    abi: [
        "function finishMountainQuest(uint256[] calldata tokenIds, uint256[] calldata seeds, bytes memory signature, bool restart, uint256 boost) external",
        "function questMountain(uint256[] calldata squireIds) external",
        "function checkSquires(address owner) public view returns (uint256[] memory)",
        "function squiresQuestingMountain(address account) external view returns (uint256[] memory)",
        "function squireToAmountClaimed(uint256) public view returns (uint256)",
        "function lastUpgrade(uint256) public view returns (uint)",
        "function lastUpgradeType(uint256) public view returns (string)",
        "function tokenTimer(uint256) public view returns (uint256)",
         "function checkIfSquireCanLeave(uint256 squireId) public view returns (bool)"
    ]
};

const temple = {
    address: "0xb90bA69211Da5Aa32FaFB95619D9C26f0521F371",
    abi: [
        "function finishTempleQuest(uint256[] calldata tokenIds, uint256[] calldata seeds, bytes memory signature, bool restart, uint256 boost) external",
        "function questTemple(uint256[] calldata squireIds) external",
        "function checkSquires(address owner) public view returns (uint256[] memory)",
        "function squiresQuestingTemple(address account) external view returns (uint256[] memory)",
        "function squireToAmountClaimed(uint256) public view returns (uint256)",
        "function lastUpgrade(uint256) public view returns (uint)",
        "function lastUpgradeType(uint256) public view returns (string)",
        "function tokenTimer(uint256) public view returns (uint256)",
         "function checkIfSquireCanLeave(uint256 squireId) public view returns (bool)",
         "function canWorship() public view returns (bool)"
    ]
};

const ring = {
    address: "0x37865Fe8A9c839F330f35104EeD08d4E8136c339",
    abi: [
        "function balanceOf(address account, uint256 id) external view returns (uint256)"
    ]
};

const potion = {
    address: "0x6F2aA70c70625E45424652aEd968E3971020F205",
    abi: [
        "function balanceOf(address account, uint256 id) external view returns (uint256)"
    ]
};

const trinket = {
    address: "0x9f0cc315caE0826005b94462B5400849b3d39d91",
    abi: [
        "function balanceOf(address account, uint256 id) external view returns (uint256)"
    ]
};

var latestTx;

const forestold = {
    address: "0x3f3b52f104ace42a5c0c68d0d365933fb3fee344",
    abi: [
        "function leaveForest(uint256[] calldata tokenIds) external",
        "function questForest(uint256[] calldata squireIds) external",
        "function checkSquires(address owner) public view returns (uint256[] memory)",
        "function squiresQuestingForest(address account) external  view  returns (uint256[] memory)",
        "function squireToAmountClaimed(uint256) public view returns (uint256)",
        "function lastUpgrade(uint256) public view returns (uint)",
        "function lastUpgradeType(uint256) public view returns (string)",
        "function checkTimer(uint256 squireId) public view returns (uint)",
        "function checkIfSquireCanLeave(uint256 squireId) public view returns (bool)"
    ]
};

async function awaitSubgraph(hash){
    let onGraph = false;
    let txHash = hash;
    
        while (!onGraph) {
            const results = await axios.post(
                `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`, {
                    query: `
                    {
                        transactions(where:{id:"${txHash}"}){
                          id
                        }
                      }`
        
                }
            );

            if(results.data.data.transactions.length >= 1)
                onGraph = true;

        }
}

async function getUpgrades(hash){
    let onGraph = false;
    let txHash = hash;
    
            const resultsUpgrades = await axios.post(
                `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`, {
                    query: `
                      {
                          skillUpgrades(where:{hash:"${txHash}"}){
                        doubleupgraded
                        hash
                        id
                        newvalue
                        squireid
                        upgraded
                        double
                        doublenewvalue
                          }
                        }`
                }
            );
            

            return resultsUpgrades.data.data.skillUpgrades;
}

async function getItems(hash){
    let onGraph = false;
    let txHash = hash;


            const resultsItems = await axios.post(
                `https://api.thegraph.com/subgraphs/name/0x-g/kote-live`, {
                    query: `
                    {
                      itemRewardDatas(where:{hash:"${txHash}"}){
                        itemid
                        itemname
                        itemtype
                        itemclass
                        itemlevel
                        itemrarity
                        image
                        id
                        hash
                      }
                    }`
                }
            );
                        return resultsItems.data.data.itemRewardDatas;

}


function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


async function forestCallback(value,restart){

    document.getElementById("Forest-Description-Return").innerHTML = `Returning Squires`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            
    let callback = JSON.parse(value);
    let isRestart = restart;
    

    let squires = callback.squires;
    let seeds = callback.seeds;
    let signature = callback.signedMessage.toString();
    let boost = callback.boost;

    
     await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(forest.address, forest.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

        if(isRestart === 0){
          finishForestQuest(squires,seeds,signature,false,boost); 
                     const hash = new ethers.Contract(forest.address, forest.abi, signer);
            const tx = await hash.finishForestQuest(squires,seeds,signature,false,boost);
            
                document.getElementById("Forest-Return-Some").style.display ="none"; //button
            document.getElementById("Forest-Return-All").style.display ="none";
            document.getElementById("Forest-Return-All-Restart").style.display ="none";
                            document.getElementById("Forest-quest").style.display = "none";
            document.getElementById("Forest-message").style.display = "none";
            document.getElementById("refresh-quest-forest").style.display = "none";
            document.getElementById("Forest-Console").style.display = "none";
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingForest").innerHTML = "";
            document.getElementById("squiresQuestingForest").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsFQ").innerHTML = "";
            document.getElementById("Forest-Description-Return").style.display="none";
            document.getElementById("Forest-Description-Return").innerHTML = `Gathering Rewards`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

            document.getElementById("Forest-Description-Returning").style.display="inline";
            
            latestTx = tx.hash;


        let fiefSum = 0;
        let upgradeSum = 0;
        
        await awaitSubgraph(tx.hash);
        
        var pullUpgrades = await getUpgrades(tx.hash);
        var pullItems = await getItems(tx.hash);
        
         const upgrades = new Array(pullUpgrades);
         const items = new Array(pullItems);
        
                    document.getElementById("Forest-Description-Returning").style.display="none";

                    document.getElementById("Forest-quest").classList.remove("menu-active");
                  document.getElementById("Forest-Menu__Return").classList.remove("menu-active");
            document.getElementById("Forest-Menu__Loot").classList.add("menu-active");  
            
                       var pullGraph = await graph();
        
        const squireOuput = new Array(pullGraph);



        for (var y = 0; y < squires.length; y++) {
            

 

        let newARR = squireOuput[0].map(a => a.id).map(Number);
            

        let index = newARR.indexOf(squires[y]);



              let totalFiefForest = squireOuput[0][index].lastfief;
              let lastUpgradeTypeForest = upgrades[0][y].upgraded;
              
            let check = squireOuput[0][index].type;
            let sf = squireOuput[0][index].strength;
            let lf = squireOuput[0][index].luck;
            let ff = squireOuput[0][index].faith;
            let wf = squireOuput[0][index].wisdom;
            let gF = squireOuput[0][index].genesis;
            let tf = squireOuput[0][index].typename;
            let image = squireOuput[0][index].image;

            let itemId = items[0][y].itemid;
            let itemType = items[0][y].itemtype;
            let itemName = items[0][y].itemname;
            let itemLevel = items[0][y].itemrarity;
            let itemClass = items[0][y].itemclass;
            let itemImage = items[0][y].image;
            
           
              
            let f = round(totalFiefForest/1000000000000000000,1);
            let ut = lastUpgradeTypeForest;
            document.getElementById("Forest-Squires").innerHTML = squires.length;
            
            // document.getElementById("Forest-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            if(ut == "None"){
            // document.getElementById("Forest-Stats").innerHTML += 
            
            //          `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: None</span></button>` +
            //     `</div>` +
            //     `</div>`;
                
            
            
            }
            else{
            document.getElementById("Forest-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${ut}</span></button>` +
                `</div>` +
                `</div>`;
                
                upgradeSum += 1;
            
            }

            
            fiefSum += f;
            document.getElementById("fief-total").innerHTML = "Counting: " + fiefSum;
        }
        
      document.getElementById("Close-quest-Loot-Forest").style.display = "inline";
        document.getElementById("fief-total").innerHTML = round(fiefSum,1);
        document.getElementById("upgrade-total").innerHTML = upgradeSum  + `/` + squires.length;
            
    
        }
        
        else{
            
              finishForestQuest(squires,seeds,signature,true,boost); 
                     const hash = new ethers.Contract(forest.address, forest.abi, signer);
            const tx = await hash.finishForestQuest(squires,seeds,signature,true,boost);
            
                document.getElementById("Forest-Return-Some").style.display ="none"; //button
            document.getElementById("Forest-Return-All").style.display ="none";
            document.getElementById("Forest-Return-All-Restart").style.display ="none";
                        document.getElementById("Forest-quest").style.display = "none";
            document.getElementById("Forest-message").style.display = "none";
            document.getElementById("refresh-quest-forest").style.display = "none";
            document.getElementById("Forest-Console").style.display = "none";
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingForest").innerHTML = "";
            document.getElementById("squiresQuestingForest").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsFQ").innerHTML = "";
            document.getElementById("Forest-Description-Return").style.display="none";
            document.getElementById("Forest-Description-Return").innerHTML = `Returning Squires and Gathering Rewards`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            document.getElementById("Forest-Description-Returning").style.display = "inline";
            
            latestTx = tx.hash;

        let fiefSum = 0;
        let upgradeSum = 0;
        
         await awaitSubgraph(tx.hash);
        
          var pullUpgrades = await getUpgrades(tx.hash);
        var pullItems = await getItems(tx.hash);
        
         const upgrades = new Array(pullUpgrades);
         const items = new Array(pullItems);
      
        
                    document.getElementById("Forest-Description-Returning").style.display = "none";

                    document.getElementById("Forest-quest").classList.remove("menu-active");
                  document.getElementById("Forest-Menu__Return").classList.remove("menu-active");
            document.getElementById("Forest-Menu__Loot").classList.add("menu-active");  
            
                       var pullGraph = await graph();
        
        const squireOuput = new Array(pullGraph);



        for (var y = 0; y < squires.length; y++) {
            

 

        let newARR = squireOuput[0].map(a => a.id).map(Number);
            

        let index = newARR.indexOf(squires[y]);



              let totalFiefForest = squireOuput[0][index].lastfief;
              let lastUpgradeTypeForest = upgrades[0][y].upgraded;
           let check = squireOuput[0][index].type;
            let sf = squireOuput[0][index].strength;
            let lf = squireOuput[0][index].luck;
            let ff = squireOuput[0][index].faith;
            let wf = squireOuput[0][index].wisdom;
            let gF = squireOuput[0][index].genesis;
            let tf = squireOuput[0][index].typename;
            let image = squireOuput[0][index].image;

            let itemId = items[0][y].itemid;
            let itemType = items[0][y].itemtype;
            let itemName = items[0][y].itemname;
            let itemLevel = items[0][y].itemrarity;
            let itemClass = items[0][y].itemclass;
            let itemImage = items[0][y].image;
            
            let f = round(totalFiefForest/1000000000000000000,1);
            let ut = lastUpgradeTypeForest;
            document.getElementById("Forest-Squires").innerHTML = squires.length;
            
            // document.getElementById("Forest-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            if(ut == "None"){
            // document.getElementById("Forest-Stats").innerHTML += 
            
            //          `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: None</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            }
            else{
            document.getElementById("Forest-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${ut}</span></button>` +
                `</div>` +
                `</div>`;
                
                upgradeSum += 1;
            
            }

            
            fiefSum += f;
            document.getElementById("fief-total").innerHTML = "Counting: " + fiefSum;
        }
            document.getElementById("restartedForest").style.display = "inline";
 
      document.getElementById("Close-quest-Loot-Forest").style.display = "inline";

        document.getElementById("fief-total").innerHTML = round(fiefSum,1);
        document.getElementById("upgrade-total").innerHTML = upgradeSum + `/` + squires.length;
            
        }
                    document.getElementById("Forest-message").style.display = "inline";
            document.getElementById("refresh-quest-forest").style.display = "inline";
                    document.getElementById("Forest-Console").style.display = "inline";
            document.getElementById("Forest-Return-All").style.display ="inline";
            document.getElementById("Forest-Return-Some").style.display ="inline";
            document.getElementById("Forest-Return-All-Restart").style.display ="inline";
            document.getElementById("Forest-Description-Return").style.display="inline";

   }
   
   
 async function templeCallback(value,restart){

    document.getElementById("Temple-Description-Return").innerHTML = `Returning Squires`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            
    let callback = JSON.parse(value);
    let isRestart = restart;
    

    let squires = callback.squires;
    let seeds = callback.seeds;
    let signature = callback.signedMessage.toString();
    let boost = callback.boost;
    
   
     await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

        if(isRestart === 0){
          finishTempleQuest(squires,seeds,signature,false,boost); 
                     const hash = new ethers.Contract(temple.address, temple.abi, signer);
            const tx = await hash.finishTempleQuest(squires,seeds,signature,false,boost);

                document.getElementById("Temple-Return-Some").style.display ="none"; //button
            document.getElementById("Temple-Return-All").style.display ="none";
            document.getElementById("Temple-Return-All-Restart").style.display ="none";
                            document.getElementById("Temple-quest").style.display = "none";
            document.getElementById("Temple-message").style.display = "none";
            document.getElementById("refresh-quest-temple").style.display = "none";
            document.getElementById("Temple-Console").style.display = "none";
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingTemple").innerHTML = "";
            document.getElementById("squiresQuestingTemple").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsTQ").innerHTML = "";
            document.getElementById("Temple-Description-Return").style.display="none";
            document.getElementById("Temple-Description-Return").innerHTML = `Gathering Rewards`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

            document.getElementById("Temple-Description-Returning").style.display="inline";
            
            latestTx = tx.hash;


        let fiefSum = 0;
        let upgradeSum = 0;
        
              await awaitSubgraph(tx.hash);
        
          var pullUpgrades = await getUpgrades(tx.hash);
        var pullItems = await getItems(tx.hash);
        
         const upgrades = new Array(pullUpgrades);
         const items = new Array(pullItems);
         

                    document.getElementById("Temple-Description-Returning").style.display="none";

                    document.getElementById("Temple-quest").classList.remove("menu-active");
                  document.getElementById("Temple-Menu__Return").classList.remove("menu-active");
            document.getElementById("Temple-Menu__Loot").classList.add("menu-active");  
            
                       var pullGraph = await graph();
        
        const squireOuput = new Array(pullGraph);



        for (var y = 0; y < squires.length; y++) {
            

 

        let newARR = squireOuput[0].map(a => a.id).map(Number);
            

        let index = newARR.indexOf(squires[y]);


              let totalFiefTemple = squireOuput[0][index].lastfief;
              let lastUpgradeTypeTemple = upgrades[0][y].upgraded;
              let lastUpgradeTypeTempleDouble = upgrades[0][y].doubleupgraded;
              let double = upgrades[0][y].double;
              
            let check = squireOuput[0][index].type;
            let sf = squireOuput[0][index].strength;
            let lf = squireOuput[0][index].luck;
            let ff = squireOuput[0][index].faith;
            let wf = squireOuput[0][index].wisdom;
            let gF = squireOuput[0][index].genesis;
            let tf = squireOuput[0][index].typename;
            let image = squireOuput[0][index].image;

            let itemId = items[0][y].itemid;
            let itemType = items[0][y].itemtype;
            let itemName = items[0][y].itemname;
            let itemLevel = items[0][y].itemrarity;
            let itemClass = items[0][y].itemclass;
            let itemImage = items[0][y].image;
            
           
              
            let f = round(totalFiefTemple/1000000000000000000,1);
            let ut = lastUpgradeTypeTemple; 
            
            
            document.getElementById("Temple-Squires").innerHTML = squires.length;
            
            // document.getElementById("Temple-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            if(ut == "None"){
            // document.getElementById("Temple-Stats").innerHTML += 
            
            //          `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: None</span></button>` +
            //     `</div>` +
            //     `</div>`;
                
            
            
            }
            else{
                     
               if(double == true){
       
                
            document.getElementById("Temple-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${lastUpgradeTypeTempleDouble} & ${lastUpgradeTypeTemple}</span></button>` +
                `</div>` +
                `</div>`;
                
                
                
                  }
                  else{
                      
                     document.getElementById("Temple-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${lastUpgradeTypeTemple}</span></button>` +
                `</div>` +
                `</div>`;
                
                
                      
                      
                  }
                  upgradeSum += 1; 
            
            }

            
            fiefSum += f;
            document.getElementById("fief-total-temple").innerHTML = "Counting: " + fiefSum;
        }
        
      document.getElementById("Close-quest-Loot-Temple").style.display = "inline";
        document.getElementById("fief-total-temple").innerHTML = round(fiefSum,1);
        document.getElementById("upgrade-total-temple").innerHTML = upgradeSum  + `/` + squires.length;
            
    
        }
        
        else{
            
              finishTempleQuest(squires,seeds,signature,true,boost); 
                     const hash = new ethers.Contract(temple.address, temple.abi, signer);
            const tx = await hash.finishTempleQuest(squires,seeds,signature,true,boost);
            
                document.getElementById("Temple-Return-Some").style.display ="none"; //button
            document.getElementById("Temple-Return-All").style.display ="none";
            document.getElementById("Temple-Return-All-Restart").style.display ="none";
                        document.getElementById("Temple-quest").style.display = "none";
            document.getElementById("Temple-message").style.display = "none";
            document.getElementById("refresh-quest-temple").style.display = "none";
            document.getElementById("Temple-Console").style.display = "none";
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingTemple").innerHTML = "";
            document.getElementById("squiresQuestingTemple").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsTQ").innerHTML = "";
            document.getElementById("Temple-Description-Return").style.display="none";
            document.getElementById("Temple-Description-Return").innerHTML = `Returning Squires and Gathering Rewards`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            document.getElementById("Temple-Description-Returning").style.display = "inline";
            
            latestTx = tx.hash;

        let fiefSum = 0;
        let upgradeSum = 0;
        
         await awaitSubgraph(tx.hash);
        
          var pullUpgrades = await getUpgrades(tx.hash);
        var pullItems = await getItems(tx.hash);
        
         const upgrades = new Array(pullUpgrades);
         const items = new Array(pullItems);
         

          
      
        
                    document.getElementById("Temple-Description-Returning").style.display = "none";

                    document.getElementById("Temple-quest").classList.remove("menu-active");
                  document.getElementById("Temple-Menu__Return").classList.remove("menu-active");
            document.getElementById("Temple-Menu__Loot").classList.add("menu-active");  
            
                       var pullGraph = await graph();
        
        const squireOuput = new Array(pullGraph);



        for (var y = 0; y < squires.length; y++) {
            

 

        let newARR = squireOuput[0].map(a => a.id).map(Number);
            

        let index = newARR.indexOf(squires[y]);



               let totalFiefTemple = squireOuput[0][index].lastfief;
              let lastUpgradeTypeTemple = upgrades[0][y].upgraded;
              let lastUpgradeTypeTempleDouble = upgrades[0][y].doubleupgraded;
              let double = upgrades[0][y].double;
              
            let check = squireOuput[0][index].type;
            let sf = squireOuput[0][index].strength;
            let lf = squireOuput[0][index].luck;
            let ff = squireOuput[0][index].faith;
            let wf = squireOuput[0][index].wisdom;
            let gF = squireOuput[0][index].genesis;
            let tf = squireOuput[0][index].typename;
            let image = squireOuput[0][index].image;

           let itemId = items[0][y].itemid;
            let itemType = items[0][y].itemtype;
            let itemName = items[0][y].itemname;
            let itemLevel = items[0][y].itemrarity;
            let itemClass = items[0][y].itemclass;
            let itemImage = items[0][y].image;
            
           let ut = lastUpgradeTypeTempleDouble;
              
            let f = round(totalFiefTemple/1000000000000000000,1);
            
    
            
            document.getElementById("Temple-Squires").innerHTML = squires.length;
            
            // document.getElementById("Temple-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            if(ut == "None"){
            // document.getElementById("Temple-Stats").innerHTML += 
            
            //          `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: None</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            }
            else{
                
                  if(double == true){
       
                
            document.getElementById("Temple-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${lastUpgradeTypeTempleDouble} & ${lastUpgradeTypeTemple}</span></button>` +
                `</div>` +
                `</div>`;
                

                
                  }
                  else{
                      
                     document.getElementById("Temple-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${lastUpgradeTypeTemple}</span></button>` +
                `</div>` +
                `</div>`;
                
                     
                      
                      
                  }
                  upgradeSum += 1; 
            
            }

            
            fiefSum += f;
            document.getElementById("fief-total-temple").innerHTML = "Counting: " + fiefSum;
        }
            document.getElementById("restartedTemple").style.display = "inline";
 
      document.getElementById("Close-quest-Loot-Temple").style.display = "inline";

        document.getElementById("fief-total-temple").innerHTML = round(fiefSum,1);
        document.getElementById("upgrade-total-temple").innerHTML = upgradeSum + `/` + squires.length;
            
        }
                    document.getElementById("Temple-message").style.display = "inline";
            document.getElementById("refresh-quest-temple").style.display = "inline";
                    document.getElementById("Temple-Console").style.display = "inline";
            document.getElementById("Temple-Return-All").style.display ="inline";
            document.getElementById("Temple-Return-Some").style.display ="inline";
            document.getElementById("Temple-Return-All-Restart").style.display ="inline";
            document.getElementById("Temple-Description-Return").style.display="inline";

   }
   
async function cavernCallback(value,restart){

    document.getElementById("Cavern-Description-Return").innerHTML = `Returning Squires`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            
    let callback = JSON.parse(value);
    let isRestart = restart;
    

    let squires = callback.squires;
    let seeds = callback.seeds;
    let signature = callback.signedMessage.toString();
    let boost = callback.boost;
    
     await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(cavern.address, cavern.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

        if(isRestart === 0){
          finishCavernQuest(squires,seeds,signature,false,boost); 
                     const hash = new ethers.Contract(cavern.address, cavern.abi, signer);
            const tx = await hash.finishCavernQuest(squires,seeds,signature,false,boost);
            
                document.getElementById("Cavern-Return-Some").style.display ="none"; //button
            document.getElementById("Cavern-Return-All").style.display ="none";
            document.getElementById("Cavern-Return-All-Restart").style.display ="none";
                            document.getElementById("Cavern-quest").style.display = "none";
            document.getElementById("Cavern-message").style.display = "none";
            document.getElementById("refresh-quest-cavern").style.display = "none";
            document.getElementById("Cavern-Console").style.display = "none";
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingCavern").innerHTML = "";
            document.getElementById("squiresQuestingCavern").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsCQ").innerHTML = "";
                    document.getElementById("Cavern-Description-Return").style.display="none";
            document.getElementById("Cavern-Description-Return").innerHTML = `Returning Squires and Gathering Rewards`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            document.getElementById("Cavern-Description-Returning").style.display = "inline";
            
            latestTx = tx.hash;


        let fiefSum = 0;
        let upgradeSum = 0;
        let rewardSum = 0;


        await awaitSubgraph(tx.hash);
          
        var pullUpgrades = await getUpgrades(tx.hash);
        var pullItems = await getItems(tx.hash);
        
         const upgrades = new Array(pullUpgrades);
         const items = new Array(pullItems);

        
                  document.getElementById("Cavern-Description-Returning").style.display = "none";
  
                    document.getElementById("Cavern-quest").classList.remove("menu-active");
                  document.getElementById("Cavern-Menu__Return").classList.remove("menu-active");
            document.getElementById("Cavern-Menu__Loot").classList.add("menu-active");  
            
                       var pullGraph = await graph();
        
        const squireOuput = new Array(pullGraph);



        for (var y = 0; y < squires.length; y++) {
            

 

        let newARR = squireOuput[0].map(a => a.id).map(Number);
            

        let index = newARR.indexOf(squires[y]);

            


            let totalFiefCavern = squireOuput[0][index].lastfief;
            let lastUpgradeTypeCavern = upgrades[0][y].upgraded;
              
            let check = squireOuput[0][index].type;
            let sf = squireOuput[0][index].strength;
            let lf = squireOuput[0][index].luck;
            let ff = squireOuput[0][index].faith;
            let wf = squireOuput[0][index].wisdom;
            let gF = squireOuput[0][index].genesis;
            let tf = squireOuput[0][index].typename;
            let image = squireOuput[0][index].image;

            let itemId = items[0][y].itemid;
            let itemType = items[0][y].itemtype;
            let itemName = items[0][y].itemname;
            let itemLevel = items[0][y].itemrarity;
            let itemClass = items[0][y].itemclass;
            let itemImage = items[0][y].image;
              
            let f = round(totalFiefCavern/1000000000000000000,1);
            let ut = lastUpgradeTypeCavern;
    
                let gotItem = itemType;
    
            document.getElementById("Cavern-Squires").innerHTML = squires.length;
            
            // document.getElementById("Cavern-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
                        
            if(ut == "None"){
            // document.getElementById("Cavern-Stats").innerHTML += 
            
            //          `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: None</span></button>` +
            //     `</div>` +
            //     `</div>`;
                
            
            
            }
            else{
            document.getElementById("Cavern-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${ut}</span></button>` +
                `</div>` +
                `</div>`;
                
                upgradeSum += 1;
            
            }
            
                        if(gotItem == ""){
            
            }
            else{
            
            if(itemType == "Ring"){
            document.getElementById("Cavern-Rewards").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + itemLevel + `</div>` +
                `<img src=` + itemImage + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat">Type: <span class="stat-value">` + itemType + `</span></li>` +
                `<li class="stat">Class: <span class="stat-value">` + itemClass + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">` + itemName + `</span></button>` +
                `</div>` +
                `</div>`;
                                rewardSum += 1;
            }
            else{
          document.getElementById("Cavern-Rewards").innerHTML +=
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + itemLevel + `</div>` +
                `<img src=` + itemImage + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat">Type: <span class="stat-value">` + itemType + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">` + itemName + `</span></button>` +
                `</div>` +
                `</div>`;
                                rewardSum += 1;  
            }
            }

            
            fiefSum += f;
            document.getElementById("fief-total-cavern").innerHTML = "Counting: " + fiefSum;
    
        }
        
      document.getElementById("Close-quest-Loot-Cavern").style.display = "inline";
        document.getElementById("fief-total-cavern").innerHTML = round(fiefSum,1);
        document.getElementById("upgrade-total-cavern").innerHTML = upgradeSum  + `/` + squires.length;
        document.getElementById("reward-total-cavern").innerHTML = rewardSum  + `/` + squires.length;
            
    
        }
        
        else{
            
              finishCavernQuest(squires,seeds,signature,true,boost); 
                     const hash = new ethers.Contract(cavern.address, cavern.abi, signer);
            const tx = await hash.finishCavernQuest(squires,seeds,signature,true,boost);
            
                document.getElementById("Cavern-Return-Some").style.display ="none"; //button
            document.getElementById("Cavern-Return-All").style.display ="none";
            document.getElementById("Cavern-Return-All-Restart").style.display ="none";
                        document.getElementById("Cavern-quest").style.display = "none";
            document.getElementById("Cavern-message").style.display = "none";
            document.getElementById("refresh-quest-cavern").style.display = "none";
            document.getElementById("Cavern-Console").style.display = "none";
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingCavern").innerHTML = "";
            document.getElementById("squiresQuestingCavern").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsCQ").innerHTML = "";
                       document.getElementById("Cavern-Description-Return").style.display="none";
            document.getElementById("Cavern-Description-Return").innerHTML = `Returning Squires and Gathering Rewards`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            document.getElementById("Cavern-Description-Returning").style.display = "inline";
            
            latestTx = tx.hash;

        let fiefSum = 0;
        let upgradeSum = 0;
        let rewardSum = 0;
        
        await awaitSubgraph(tx.hash);
        
          var pullUpgrades = await getUpgrades(tx.hash);
        var pullItems = await getItems(tx.hash);
        
         const upgrades = new Array(pullUpgrades);
         const items = new Array(pullItems);

        
                    document.getElementById("Cavern-Description-Returning").style.display = "none";
                    document.getElementById("Cavern-quest").classList.remove("menu-active");
                  document.getElementById("Cavern-Menu__Return").classList.remove("menu-active");
            document.getElementById("Cavern-Menu__Loot").classList.add("menu-active");  
            
                       var pullGraph = await graph();
        
        const squireOuput = new Array(pullGraph);

    
        

        for (var y = 0; y < squires.length; y++) {
                   
 

        let newARR = squireOuput[0].map(a => a.id).map(Number);
            
         
            
        let index = newARR.indexOf(squires[y]);


            let totalFiefCavern = squireOuput[0][index].lastfief;
            let lastUpgradeTypeCavern = upgrades[0][y].upgraded;
              
            let check = squireOuput[0][index].type;
            let sf = squireOuput[0][index].strength;
            let lf = squireOuput[0][index].luck;
            let ff = squireOuput[0][index].faith;
            let wf = squireOuput[0][index].wisdom;
            let gF = squireOuput[0][index].genesis;
            let tf = squireOuput[0][index].typename;
            let image = squireOuput[0][index].image;

            let itemId = items[0][y].itemid;
            let itemType = items[0][y].itemtype;
            let itemName = items[0][y].itemname;
            let itemLevel = items[0][y].itemrarity;
            let itemClass = items[0][y].itemclass;
            let itemImage = items[0][y].image;

              
            let f = round(totalFiefCavern/1000000000000000000,1);
            let ut = lastUpgradeTypeCavern;
            
            
                            let gotItem = itemType;

            document.getElementById("Cavern-Squires").innerHTML = squires.length;
            
            // document.getElementById("Cavern-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            if(ut == "None"){
            // document.getElementById("Cavern-Stats").innerHTML += 
            
            //          `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: None</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            }
            else{
            document.getElementById("Cavern-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${ut}</span></button>` +
                `</div>` +
                `</div>`;
                
                upgradeSum += 1;
            
            }
            
            
                        if(gotItem == ""){
            
            }
            else{
             if(itemType == "Ring"){
            document.getElementById("Cavern-Rewards").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + itemLevel + `</div>` +
                `<img src=` + itemImage + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat">Type: <span class="stat-value">` + itemType + `</span></li>` +
                `<li class="stat">Class: <span class="stat-value">` + itemClass + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">` + itemName + `</span></button>` +
                `</div>` +
                `</div>`;
                                rewardSum += 1;
            }
            else{
          document.getElementById("Cavern-Rewards").innerHTML +=
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + itemLevel + `</div>` +
                `<img src=` + itemImage + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat">Type: <span class="stat-value">` + itemType + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">` + itemName + `</span></button>` +
                `</div>` +
                `</div>`;
                                rewardSum += 1;  
            }
            }


            
            fiefSum += f;
            document.getElementById("fief-total-cavern").innerHTML = "Counting: " + fiefSum;
        }
            document.getElementById("restartedCavern").style.display = "inline";
 
      document.getElementById("Close-quest-Loot-Cavern").style.display = "inline";

        document.getElementById("fief-total-cavern").innerHTML = round(fiefSum,1);
        document.getElementById("upgrade-total-cavern").innerHTML = upgradeSum + `/` + squires.length;
            document.getElementById("reward-total-cavern").innerHTML = rewardSum  + `/` + squires.length;

        }
                    document.getElementById("Cavern-message").style.display = "inline";
            document.getElementById("refresh-quest-cavern").style.display = "inline";
                    document.getElementById("Cavern-Console").style.display = "inline";
            document.getElementById("Cavern-Return-All").style.display ="inline";
            document.getElementById("Cavern-Return-Some").style.display ="inline";
            document.getElementById("Cavern-Return-All-Restart").style.display ="inline";
                    document.getElementById("Cavern-Description-Return").style.display="inline";

   }   
   
   
   async function mountainCallback(value,restart){

    document.getElementById("Mountain-Description-Return").innerHTML = `Returning Squires`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            
    let callback = JSON.parse(value);
    let isRestart = restart;
    

    let squires = callback.squires;
    let seeds = callback.seeds;
    let signature = callback.signedMessage.toString();
    let boost = callback.boost;
    
     await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(mountain.address, mountain.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

        if(isRestart === 0){
          finishMountainQuest(squires,seeds,signature,false,boost); 
                     const hash = new ethers.Contract(mountain.address, mountain.abi, signer);
            const tx = await hash.finishMountainQuest(squires,seeds,signature,false,boost);
            
                document.getElementById("Mountain-Return-Some").style.display ="none"; //button
            document.getElementById("Mountain-Return-All").style.display ="none";
            document.getElementById("Mountain-Return-All-Restart").style.display ="none";
                            document.getElementById("Mountain-quest").style.display = "none";
            document.getElementById("Mountain-message").style.display = "none";
            document.getElementById("refresh-quest-mountain").style.display = "none";
            document.getElementById("Mountain-Console").style.display = "none";
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingMountain").innerHTML = "";
            document.getElementById("squiresQuestingMountain").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsMQ").innerHTML = "";
                       document.getElementById("Mountain-Description-Return").style.display="none";
            document.getElementById("Mountain-Description-Return").innerHTML = `Returning Squires and Gathering Rewards`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
                       document.getElementById("Mountain-Description-Returning").style.display="inline";
                       
                       latestTx = tx.hash;


        let fiefSum = 0;
        let upgradeSum = 0;
        let rewardSum = 0;


           await awaitSubgraph(tx.hash);
        
          var pullUpgrades = await getUpgrades(tx.hash);
        var pullItems = await getItems(tx.hash);
        
         const upgrades = new Array(pullUpgrades);
         const items = new Array(pullItems);
        
                               document.getElementById("Mountain-Description-Returning").style.display="none";

                    document.getElementById("Mountain-quest").classList.remove("menu-active");
                  document.getElementById("Mountain-Menu__Return").classList.remove("menu-active");
            document.getElementById("Mountain-Menu__Loot").classList.add("menu-active");  
            
                       var pullGraph = await graph();
        
        const squireOuput = new Array(pullGraph);

        

        for (var y = 0; y < squires.length; y++) {
            
 

        let newARR = squireOuput[0].map(a => a.id).map(Number);
            
       
            
        let index = newARR.indexOf(squires[y]);



              let totalFiefMountain = squireOuput[0][index].lastfief;
              let lastUpgradeTypeMountain = upgrades[0][y].upgraded;
              
           let check = squireOuput[0][index].type;
            let sf = squireOuput[0][index].strength;
            let lf = squireOuput[0][index].luck;
            let ff = squireOuput[0][index].faith;
            let wf = squireOuput[0][index].wisdom;
            let gF = squireOuput[0][index].genesis;
            let tf = squireOuput[0][index].typename;
            let image = squireOuput[0][index].image;

            let itemId = items[0][y].itemid;
            let itemType = items[0][y].itemtype;
            let itemName = items[0][y].itemname;
            let itemLevel = items[0][y].itemrarity;
            let itemClass = items[0][y].itemclass;
            let itemImage = items[0][y].image;
              
            let f = round(totalFiefMountain/1000000000000000000,1);
            let ut = lastUpgradeTypeMountain;
    
                let gotItem = itemType;
    
            document.getElementById("Mountain-Squires").innerHTML = squires.length;
            
            // document.getElementById("Mountain-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
                        
            if(ut == "None"){
            // document.getElementById("Mountain-Stats").innerHTML += 
            
            //          `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: None</span></button>` +
            //     `</div>` +
            //     `</div>`;
                
            
            
            }
            else{
            document.getElementById("Mountain-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${ut}</span></button>` +
                `</div>` +
                `</div>`;
                
                upgradeSum += 1;
            
            }
            
                        if(gotItem == ""){
            
            }
            else{
            if(itemType == "Ring"){
            document.getElementById("Mountain-Rewards").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + itemLevel + `</div>` +
                `<img src=` + itemImage + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat">Type: <span class="stat-value">` + itemType + `</span></li>` +
                `<li class="stat">Class: <span class="stat-value">` + itemClass + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">` + itemName + `</span></button>` +
                `</div>` +
                `</div>`;
                                rewardSum += 1;
            }
            else{
          document.getElementById("Mountain-Rewards").innerHTML +=
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + itemLevel + `</div>` +
                `<img src=` + itemImage + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat">Type: <span class="stat-value">` + itemType + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">` + itemName + `</span></button>` +
                `</div>` +
                `</div>`;
                                rewardSum += 1;  
            }
            }

            
            fiefSum += f;
            document.getElementById("fief-total-mountain").innerHTML = "Counting: " + fiefSum;
    
        }
        
      document.getElementById("Close-quest-Loot-Mountain").style.display = "inline";
        document.getElementById("fief-total-mountain").innerHTML = round(fiefSum,1);
        document.getElementById("upgrade-total-mountain").innerHTML = upgradeSum  + `/` + squires.length;
        document.getElementById("reward-total-mountain").innerHTML = rewardSum  + `/` + squires.length;
            
    
        }
        
        else{
            
              finishMountainQuest(squires,seeds,signature,true,boost); 
                     const hash = new ethers.Contract(mountain.address, mountain.abi, signer);
            const tx = await hash.finishMountainQuest(squires,seeds,signature,true,boost);
            
                document.getElementById("Mountain-Return-Some").style.display ="none"; //button
            document.getElementById("Mountain-Return-All").style.display ="none";
            document.getElementById("Mountain-Return-All-Restart").style.display ="none";
                        document.getElementById("Mountain-quest").style.display = "none";
            document.getElementById("Mountain-message").style.display = "none";
            document.getElementById("refresh-quest-mountain").style.display = "none";
            document.getElementById("Mountain-Console").style.display = "none";
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingMountain").innerHTML = "";
            document.getElementById("squiresQuestingMountain").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsCQ").innerHTML = "";
            document.getElementById("Mountain-Description-Return").style.display = "none";
            document.getElementById("Mountain-Description-Return").innerHTML = `Returning Squires and Gathering Rewards`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            document.getElementById("Mountain-Description-Returning").style.display = "inline";
            
            
            latestTx = tx.hash;
            
            let fiefSum = 0;
            let upgradeSum = 0;
            let rewardSum = 0;
            
              await awaitSubgraph(tx.hash);
        
          var pullUpgrades = await getUpgrades(tx.hash);
        var pullItems = await getItems(tx.hash);
        
         const upgrades = new Array(pullUpgrades);
         const items = new Array(pullItems);
            
                    document.getElementById("Mountain-Description-Returning").style.display = "none";

                    document.getElementById("Mountain-quest").classList.remove("menu-active");
                  document.getElementById("Mountain-Menu__Return").classList.remove("menu-active");
            document.getElementById("Mountain-Menu__Loot").classList.add("menu-active");  
            
                       var pullGraph = await graph();
        
        const squireOuput = new Array(pullGraph);

       

        for (var y = 0; y < squires.length; y++) {
            

 

        let newARR = squireOuput[0].map(a => a.id).map(Number);
     
            
        let index = newARR.indexOf(squires[y]);
      


                  let totalFiefMountain = squireOuput[0][index].lastfief;
              let lastUpgradeTypeMountain = upgrades[0][y].upgraded;
         
            let check = squireOuput[0][index].type;
            let sf = squireOuput[0][index].strength;
            let lf = squireOuput[0][index].luck;
            let ff = squireOuput[0][index].faith;
            let wf = squireOuput[0][index].wisdom;
            let gF = squireOuput[0][index].genesis;
            let tf = squireOuput[0][index].typename;
            let image = squireOuput[0][index].image;

            let itemId = items[0][y].itemid;
            let itemType = items[0][y].itemtype;
            let itemName = items[0][y].itemname;
            let itemLevel = items[0][y].itemrarity;
            let itemClass = items[0][y].itemclass;
            let itemImage = items[0][y].image;

              
            let f = round(totalFiefMountain/1000000000000000000,1);
            let ut = lastUpgradeTypeMountain;
            
                            let gotItem = itemType;

            document.getElementById("Mountain-Squires").innerHTML = squires.length;
            
            // document.getElementById("Mountain-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            if(ut == "None"){
            // document.getElementById("Mountain-Stats").innerHTML += 
            
            //          `<div class="item token" id="squireSelected" >` +
            //     `<div class="token-image">` +
            //     `<div class="menu-label">` + tf + `</div>` +
            //     `<img src=` + image + `>` +
            //     `</div>` +
            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[y]}: None</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            }
            else{
            document.getElementById("Mountain-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[y]}: +1 ${ut}</span></button>` +
                `</div>` +
                `</div>`;
                
                upgradeSum += 1;
            
            }
            
                   if(gotItem == ""){
            
            }
            else{
            if(itemType == "Ring"){
            document.getElementById("Mountain-Rewards").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + itemLevel + `</div>` +
                `<img src=` + itemImage + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat">Type: <span class="stat-value">` + itemType + `</span></li>` +
                `<li class="stat">Class: <span class="stat-value">` + itemClass + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">` + itemName + `</span></button>` +
                `</div>` +
                `</div>`;
                                rewardSum += 1;
            }
            else{
          document.getElementById("Mountain-Rewards").innerHTML +=
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + itemLevel + `</div>` +
                `<img src=` + itemImage + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat">Type: <span class="stat-value">` + itemType + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">` + itemName + `</span></button>` +
                `</div>` +
                `</div>`;
                                rewardSum += 1;  
            }
            }

            
            fiefSum += f;
            document.getElementById("fief-total-mountain").innerHTML = "Counting: " + fiefSum;
        }
            document.getElementById("restartedMountain").style.display = "inline";
 
      document.getElementById("Close-quest-Loot-Mountain").style.display = "inline";

        document.getElementById("fief-total-mountain").innerHTML = round(fiefSum,1);
        document.getElementById("upgrade-total-mountain").innerHTML = upgradeSum + `/` + squires.length;
            document.getElementById("reward-total-mountain").innerHTML = rewardSum  + `/` + squires.length;

        }
                    document.getElementById("Mountain-message").style.display = "inline";
            document.getElementById("refresh-quest-mountain").style.display = "inline";
                    document.getElementById("Mountain-Console").style.display = "inline";
            document.getElementById("Mountain-Return-All").style.display ="inline";
            document.getElementById("Mountain-Return-Some").style.display ="inline";
            document.getElementById("Mountain-Return-All-Restart").style.display ="inline";
            document.getElementById("Mountain-Description-Return").style.display = "inline";

   } 
   
 
   

async function setApprovalForAll() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}

async function questForest() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}

async function finishForestQuest() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}

async function questCavern() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}

async function finishCavernQuest() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}

async function questTemple() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}

async function finishTempleQuest() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}

async function questMountain() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}

async function finishMountainQuest() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}


async function leaveForest() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
}


async function checkWorship() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);
        
        const check =  await CONTRACT_ADDRESS.canWorship();
        if(check === false){
            document.getElementById("Temple-Label").innerHTML = "Temple";
            document.getElementById("Temple-Label").classList.remove("quest");
            document.getElementById("refresh-return-temple").style.display="none";
            // document.getElementById("Temple-return").style.display="none";
            document.getElementById("Temple-Console-Send").style.display="none";
            document.getElementById("Temple-Description-Send").style.display="none";
            document.getElementById("restart-temple-closed").style.display="none";
            document.getElementById("Temple-Closed").style.display="inline"
            document.getElementById("Temple-Closed").style.display="inline"
            
        
            
        }
    }


async function checkApproveForest() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(squire.address, squire.abi, provider);
        
        const check =  await CONTRACT_ADDRESS.isApprovedForAll(signer.getAddress(),forest.address);
        if(check === false){
            document.getElementById("Forest-Menu__Approve").classList.add("menu-active");
        }
    }

async function checkApproveCavern() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(squire.address, squire.abi, provider);
        
        const check =  await CONTRACT_ADDRESS.isApprovedForAll(signer.getAddress(),cavern.address);
        if(check === false){
            document.getElementById("Cavern-Menu__Approve").classList.add("menu-active");
        }
    }

async function checkApproveMountain() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(squire.address, squire.abi, provider);
        
        const check =  await CONTRACT_ADDRESS.isApprovedForAll(signer.getAddress(),mountain.address);
        if(check === false){
            document.getElementById("Mountain-Menu__Approve").classList.add("menu-active");
        }
    }
    

async function checkApproveTemple() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(squire.address, squire.abi, provider);
        
        const check =  await CONTRACT_ADDRESS.isApprovedForAll(signer.getAddress(),temple.address);
        
      
        
        if(check === false){
            document.getElementById("Temple-Menu__Approve").classList.add("menu-active");
        }
        if(check === true){
            runTowntemple();
            runQuestingtemple();
              $("#Inventory-Fief").removeClass("menu-active");
              $("#Inventory-Gear").removeClass("menu-active");
              $("#Inventory-Trinket").removeClass("menu-active");
              $("#Inventory-Potion").removeClass("menu-active");
              $("#Inventory-Ring").removeClass("menu-active");
             $("#Inventory-Squires").removeClass("menu-active");
              $(site).removeClass("no-fog no-menus");
              $("#Temple-Menu__Send").addClass("menu-active");
              $("#Forest-Menu__Loot").removeClass("menu-active");
              $("#Temple-Menu__Loot").removeClass("menu-active");
              $("#Cavern-Menu__Loot").removeClass("menu-active");
              $("#Mountain-Menu__Loot").removeClass("menu-active");
        }
    }



async function fiefTotal() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(fief.address, fief.abi, provider);


    const total = await CONTRACT_ADDRESS.balanceOf(signer.getAddress());

    if(total == 0){
        document.getElementById("fiefTotal").innerHTML = 0;
        document.getElementById("fief-total-inventory").innerHTML = 0;
    }
    else{
    let totalR = parseInt(total) / 1000000000000000000;
    try{
    let left = BigInt(totalR);
    document.getElementById("fiefTotal").innerHTML = left;
         document.getElementById("fief-total-inventory").innerHTML = left;
    }
    catch(err){
    let left = Math.round(totalR);    
    document.getElementById("fiefTotal").innerHTML = left;
         document.getElementById("fief-total-inventory").innerHTML = left;
    }
    }
}

async function resetFunction(){
  
            if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
    
    fiefTotal();
    squireTotal();
   potionTotal();
   ringTotal();
   trinketTotal();
   squireTotalCheck();
   squiresInventory();
runTownforest();
runTowncavern();
runTownmountain();
runTowntemple();
runQuestingforest();
runQuestingcavern();
runQuestingmountain();
runQuestingtemple();
}

async function ringTotal() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(ring.address, ring.abi, provider);
    
    let t1 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),100));
    let t2 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),101));
    let t3 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),102));
    let t4 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),103));
    let t5 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),104));
    let t6 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),105));
    let t7 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),106));
    let t8 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),107));
    let t9 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),108));
    let t10 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),109));
    let t11 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),110));
    let t12 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),111));
    let t13 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),112));
    let t14 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),113));
    let t15 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),114));
    let t16 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),115));
    let t17 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),116));
    let t18 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),117));
    let t19 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),118));
    let t20 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),119));
    let t21 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),120));
    let t22 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),121));
    let t23 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),122));
    let t24 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),123));
    let t25 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),124));

    document.getElementById("r1").innerHTML = t1;
    document.getElementById("r2").innerHTML = t2;
    document.getElementById("r3").innerHTML = t3;
    document.getElementById("r4").innerHTML = t4;
    document.getElementById("r5").innerHTML = t5;
    document.getElementById("r6").innerHTML = t6;
    document.getElementById("r7").innerHTML = t7;
    document.getElementById("r8").innerHTML = t8;
    document.getElementById("r9").innerHTML = t9;
    document.getElementById("r10").innerHTML = t10;
    document.getElementById("r11").innerHTML = t11;
    document.getElementById("r12").innerHTML = t12;
    document.getElementById("r13").innerHTML = t13;
    document.getElementById("r14").innerHTML = t14;
    document.getElementById("r15").innerHTML = t15;
    document.getElementById("r16").innerHTML = t16;
    document.getElementById("r17").innerHTML = t17;
    document.getElementById("r18").innerHTML = t18;
    document.getElementById("r19").innerHTML = t19;
    document.getElementById("r20").innerHTML = t20;
    document.getElementById("r21").innerHTML = t21;
    document.getElementById("r22").innerHTML = t22;
    document.getElementById("r23").innerHTML = t23;
    document.getElementById("r24").innerHTML = t24;
    document.getElementById("r25").innerHTML = t25;

    let sum = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9 + t10 + t11 + t12 + t13 + t14 + t15 + t16 + t17 + t18 + t19 + t20 + t21 + t22 + t23 + t24 + t25;
    document.getElementById("ringTotal").innerHTML = sum;
        document.getElementById("ringTotal-inventory").innerHTML = sum;

}

async function potionTotal() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(potion.address, potion.abi, provider);
    
    let t1 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),100));
    let t2 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),101));
    let t3 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),102));
    let t4 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),103));
    let t5 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),104));
    let t6 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),105));
    let t7 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),106));
    let t8 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),107));
    let t9 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),108));
    let t10 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),109));
    let t11 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),110));
    let t12 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),111));
    let t13 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),112));
    let t14 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),113));
    let t15 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),114));
    let t16 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),115));
    let t17 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),116));
    let t18 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),117));
    let t19 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),118));
    let t20 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),119));
    let t21 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),120));
    let t22 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),121));
    let t23 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),122));
    let t24 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),123));
    let t25 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),124));
    
    document.getElementById("p1").innerHTML = t1;
    document.getElementById("p2").innerHTML = t2;
    document.getElementById("p3").innerHTML = t3;
    document.getElementById("p4").innerHTML = t4;
    document.getElementById("p5").innerHTML = t5;
    document.getElementById("p6").innerHTML = t6;
    document.getElementById("p7").innerHTML = t7;
    document.getElementById("p8").innerHTML = t8;
    document.getElementById("p9").innerHTML = t9;
    document.getElementById("p10").innerHTML = t10;
    document.getElementById("p11").innerHTML = t11;
    document.getElementById("p12").innerHTML = t12;
    document.getElementById("p13").innerHTML = t13;
    document.getElementById("p14").innerHTML = t14;
    document.getElementById("p15").innerHTML = t15;
    document.getElementById("p16").innerHTML = t16;
    document.getElementById("p17").innerHTML = t17;
    document.getElementById("p18").innerHTML = t18;
    document.getElementById("p19").innerHTML = t19;
    document.getElementById("p20").innerHTML = t20;
    document.getElementById("p21").innerHTML = t21;
    document.getElementById("p22").innerHTML = t22;
    document.getElementById("p23").innerHTML = t23;
    document.getElementById("p24").innerHTML = t24;
    document.getElementById("p25").innerHTML = t25;
    
let sum = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9 + t10 + t11 + t12 + t13 + t14 + t15 + t16 + t17 + t18 + t19 + t20 + t21 + t22 + t23 + t24 + t25;
    document.getElementById("potionTotal").innerHTML = sum;
    document.getElementById("potionTotal-inventory").innerHTML = sum;
    
}

async function trinketTotal() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(trinket.address, trinket.abi, provider);
    
    let t1 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),100));
    let t2 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),101));
    let t3 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),102));
    let t4 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),103));
    let t5 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),104));
    let t6 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),105));
    let t7 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),106));
    let t8 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),107));
    let t9 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),108));
    let t10 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),109));
    let t11 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),110));
    let t12 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),111));
    let t13 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),112));
    let t14 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),113));
    let t15 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),114));
    let t16 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),115));
    let t17 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),116));
    let t18 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),117));
    let t19 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),118));
    let t20 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),119));
    let t21 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),120));
    let t22 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),121));
    let t23 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),122));
    let t24 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),123));
    let t25 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),124));
    let t26 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),125));
    let t27 =parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress(),126));

    document.getElementById("t1").innerHTML = t1;
    document.getElementById("t2").innerHTML = t2;
    document.getElementById("t3").innerHTML = t3;
    document.getElementById("t4").innerHTML = t4;
    document.getElementById("t5").innerHTML = t5;
    document.getElementById("t6").innerHTML = t6;
    document.getElementById("t7").innerHTML = t7;
    document.getElementById("t8").innerHTML = t8;
    document.getElementById("t9").innerHTML = t9;
    document.getElementById("t10").innerHTML = t10;
    document.getElementById("t11").innerHTML = t11;
    document.getElementById("t12").innerHTML = t12;
    document.getElementById("t13").innerHTML = t13;
    document.getElementById("t14").innerHTML = t14;
    document.getElementById("t15").innerHTML = t15;
    document.getElementById("t16").innerHTML = t16;
    document.getElementById("t17").innerHTML = t17;
    document.getElementById("t18").innerHTML = t18;
    document.getElementById("t19").innerHTML = t19;
    document.getElementById("t20").innerHTML = t20;
    document.getElementById("t21").innerHTML = t21;
    document.getElementById("t22").innerHTML = t22;
    document.getElementById("t23").innerHTML = t23;
    document.getElementById("t24").innerHTML = t24;
    document.getElementById("t25").innerHTML = t25;
    document.getElementById("t26").innerHTML = t26;
    document.getElementById("t27").innerHTML = t27;
    
    let sum = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9 + t10 + t11 + t12 + t13 + t14 + t15 + t16 + t17 + t18 + t19 + t20 + t21 + t22 + t23 + t24 + t25 + t26 + t27;
    document.getElementById("trinketTotal").innerHTML = sum;
        document.getElementById("trinketTotal-inventory").innerHTML = sum;

}


async function squireTotal() {
  var pullGraph = await graph();
        
        const squires = new Array(pullGraph);
     

    document.getElementById("squireTotal").innerHTML = squires[0].length;
    document.getElementById("squires-total-inventory").innerHTML = squires[0].length;
    
    var questForest = 0;
    var town = 0;
    for(var y=0; y<squires[0].length; y++){
        if(squires[0][y].questing == true){
            questForest += 1;
        }
        else{
        town += 1;
        }
    }
            document.getElementById("squires-total-questing").innerHTML = questForest;
          document.getElementById("squires-total-town").innerHTML = town;
}

async function squireTotalCheck() {
    var pullGraph = await graph();
        
        const squires = new Array(pullGraph);
    
//     if(squires[0].length < 1 ){
//       document.getElementById("Gate__Button").innerHTML = "Gate is Locked"; 
//       document.getElementById("no-squires").style.display = "flex";
//   }
    
}

// forest

var arrF = [];

function pushQuestingF(inputCB) {
    if (arrF.indexOf(inputCB.id) === -1) {
    arrF.push(inputCB.id);
}
    document.getElementById("Forest-Send-Some").style.display= "inline";
    document.getElementById("questorsF").innerHTML = "Send Squire(s) # " + arrF;
    document.getElementById(inputCB.id).removeAttribute("onclick");
    document.getElementById(inputCB.id).classList.add('Selected');
}

async function squiresWaitingForest() {
    document.getElementById("questorsF").innerHTML = "";
    document.getElementById("Forest-Send-Some").style.display= "none";
    arrF = [];
        
        var pullGraph = await graphNQ();

        const squires = new Array(pullGraph);
        
        if(squires[0].length == 0){
                    document.getElementById("Forest-Description-Send").innerHTML = "All squires are currently questing!";
        }
        else{
        
        
    for (var i = 0; i < squires[0].length; i++) {

         let token = squires[0][i].id;
        
            let check = squires[0][i].type;
            let sf = squires[0][i].strength;
            let lf = squires[0][i].luck;
            let ff = squires[0][i].faith;
            let wf = squires[0][i].wisdom;
            let gF = squires[0][i].genesis;
            let tf = squires[0][i].typename;
            let image = squires[0][i].image;
          
                  document.getElementById("squiresWaitingForest").innerHTML +=
                `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires" onclick="pushQuestingF(this)">Select <span class="token-number">#` + token + `</span></button>` +
                `</div>` +
                `</div>`;

            var ab = document.getElementById("squires");
            ab.setAttribute("id", token)
    }
    
    document.getElementById("Forest-Description-Send").innerHTML = "Select the squires you would like to send off questing";
    
    }
}

var arrQF = [];

async function pushQuestingFQ(inputCB) {
        if (arrQF.indexOf(inputCB.id) === -1) {
    arrQF.push(inputCB.id);
}
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(forest.address, forest.abi, provider);
    document.getElementById("Forest-Return-Some").style.display= "inline";
    document.getElementById("questorsFQ").innerHTML = "Return Squire(s) # " + arrQF;
    document.getElementById(inputCB.id).removeAttribute("onclick");
    document.getElementById(inputCB.id).classList.add('Selected');
}

async function pushQuestingFQx() {
         document.getElementById("Forest-Description-Return").innerHTML = "This squire is still questing!";
         await delay(3);
         document.getElementById("Forest-Description-Return").innerHTML = "Select the squires you would like to return from questing";
}

async function clearQF(){
    arrQF = [];
}

async function clearF(){
    arrF = [];
}

async function squiresQuestingForest() {
    
     await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(forest.address, forest.abi, provider);
    const CONTRACT_ADDRESS_SQUIRE = new ethers.Contract(squire.address, squire.abi, provider);


    // try{


    document.getElementById("questorsFQ").innerHTML = "";
    document.getElementById("Forest-Return-Some").style.display= "none";
       document.getElementById("squiresQuestingForest").innerHTML= "";

          var pullGraph = await graphQF();
        
        const squires = new Array(pullGraph);

        if(squires[0].length == 0){
                document.getElementById("Forest-Description-Return").innerHTML = "No squires are currently questing!";
        }
        else{
            

    for (var xx = 0; xx < squires[0].length; xx++) {
        

            let check = squires[0][xx].type;
            let sf = squires[0][xx].strength;
            let lf = squires[0][xx].luck;
            let ff = squires[0][xx].faith;
            let wf = squires[0][xx].wisdom;
            let gF = squires[0][xx].genesis;
            let tf = squires[0][xx].typename;
            let image = squires[0][xx].image;
            
    let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;
    let canleave = squires[0][xx].finish - timestamp;
           
        
        if(canleave > 0){
                let time = canleave;
                let timer = new Date(time * 1000).toISOString().substr(11, 8);


            document.getElementById("squiresQuestingForest").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest"  onclick="pushQuestingFQx()"><span class="token-number">#` + squires[0][xx].id + " is still questing: " + `<span id="timerQF">` + timer + `</span>` + `</span></button>` +
                `</div>` +
                `</div>`;

    }    
    else{
        

        
                    document.getElementById("squiresQuestingForest").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squiresQuesting" onclick="pushQuestingFQ(this)"><span class="token-number">#` + squires[0][xx].id + " is ready to return" + `</span></button>` +
                `</div>` +
                `</div>`;

            
            var ab = document.getElementById("squiresQuesting");
            ab.setAttribute("id", squires[0][xx].id)
        
             }
             

        }
        
}

}

  async function runQuestingforest(){
    document.getElementById("Forest-Description-Return").innerHTML = `Loading Questing Squires in Forest` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        document.getElementById("squiresQuestingForest").innerHTML = "";
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphQF();   
         document.getElementById("Forest-Description-Return").innerHTML = "Select the squires you would like to return from questing";
        squiresQuestingForest();
}

   async function runQuestingforestOld(){
    document.getElementById("Forest-Description-Return-Old").innerHTML = `Loading Questing Squires From Old Contract` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        document.getElementById("squiresQuestingForestOld").innerHTML = "";
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphQOld();   
         document.getElementById("Forest-Description-Return-Old").innerHTML = "Select Return All to return all squires from old contract";
        squiresQuestingForestOld();
}

    async function runTownforest(){
        document.getElementById("Forest-Send-All").style.display ="inline";
        document.getElementById("squiresWaitingForest").innerHTML = "";
     document.getElementById("Forest-Description-Send").innerHTML = `Loading Squires ` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphNQ();
        squiresWaitingForest();
}

// temple

var arrT = [];

function pushQuestingT(inputCB) {
    if (arrT.indexOf(inputCB.id) === -1) {
    arrT.push(inputCB.id);
}
    document.getElementById("Temple-Send-Some").style.display= "inline";
    document.getElementById("questorsT").innerHTML = "Send Squire(s) # " + arrT;
    document.getElementById(inputCB.id).removeAttribute("onclick");
    document.getElementById(inputCB.id).classList.add('Selected');
}

async function squiresWaitingTemple() {
    document.getElementById("questorsT").innerHTML = "";
    document.getElementById("Temple-Send-Some").style.display= "none";
    arrT = [];
        
        var pullGraph = await graphNQ();

        const squires = new Array(pullGraph);
        
        if(squires[0].length == 0){
                    document.getElementById("Temple-Description-Send").innerHTML = "All squires are currently questing!";
        }
        else{
        
        
    for (var i = 0; i < squires[0].length; i++) {

         let token = squires[0][i].id;
        
            let check = squires[0][i].type;
            let sf = squires[0][i].strength;
            let lf = squires[0][i].luck;
            let ff = squires[0][i].faith;
            let wf = squires[0][i].wisdom;
            let gF = squires[0][i].genesis;
            let tf = squires[0][i].typename;
            let image = squires[0][i].image;
          
                  document.getElementById("squiresWaitingTemple").innerHTML +=
                `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires" onclick="pushQuestingT(this)">Select <span class="token-number">#` + token + `</span></button>` +
                `</div>` +
                `</div>`;

            var ab = document.getElementById("squires");
            ab.setAttribute("id", token)
    }
    
    document.getElementById("Temple-Description-Send").innerHTML = "Select the squires you would like to send off questing";
    
    }
}

var arrQT = [];

async function pushQuestingTQ(inputCB) {
        if (arrQT.indexOf(inputCB.id) === -1) {
    arrQT.push(inputCB.id);
}
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);
    document.getElementById("Temple-Return-Some").style.display= "inline";
    document.getElementById("questorsTQ").innerHTML = "Return Squire(s) # " + arrQT;
    document.getElementById(inputCB.id).removeAttribute("onclick");
    document.getElementById(inputCB.id).classList.add('Selected');
}

async function pushQuestingTQx() {
         document.getElementById("Temple-Description-Return").innerHTML = "This squire is still questing!";
         await delay(3);
         document.getElementById("Temple-Description-Return").innerHTML = "Select the squires you would like to return from questing";
}

async function clearQT(){
    arrQT = [];
}

async function clearT(){
    arrT = [];
}

async function squiresQuestingTemple() {
    
     await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);
    const CONTRACT_ADDRESS_SQUIRE = new ethers.Contract(squire.address, squire.abi, provider);


    // try{


    document.getElementById("questorsTQ").innerHTML = "";
    document.getElementById("Temple-Return-Some").style.display= "none";
       document.getElementById("squiresQuestingTemple").innerHTML= "";

          var pullGraph = await graphQT();
        
        const squires = new Array(pullGraph);

        if(squires[0].length == 0){
                document.getElementById("Temple-Description-Return").innerHTML = "No squires are currently questing!";
        }
        else{
            

    for (var xx = 0; xx < squires[0].length; xx++) {
        

            let check = squires[0][xx].type;
            let sf = squires[0][xx].strength;
            let lf = squires[0][xx].luck;
            let ff = squires[0][xx].faith;
            let wf = squires[0][xx].wisdom;
            let gF = squires[0][xx].genesis;
            let tf = squires[0][xx].typename;
            let image = squires[0][xx].image;
            
    let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;
    let canleave = squires[0][xx].finish - timestamp;
           
        
        if(canleave > 0){
                let time = canleave;
                let timer = new Date(time * 1000).toISOString().substr(11, 8);


            document.getElementById("squiresQuestingTemple").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest"  onclick="pushQuestingTQx()"><span class="token-number">#` + squires[0][xx].id + " is still questing: " + `<span id="timerQF">` + timer + `</span>` + `</span></button>` +
                `</div>` +
                `</div>`;

    }    
    else{
        

        
                    document.getElementById("squiresQuestingTemple").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squiresQuesting" onclick="pushQuestingTQ(this)"><span class="token-number">#` + squires[0][xx].id + " is ready to return" + `</span></button>` +
                `</div>` +
                `</div>`;

            
            var ab = document.getElementById("squiresQuesting");
            ab.setAttribute("id", squires[0][xx].id)
        
             }
             

        }
        
}

}

  async function runQuestingtemple(){
    document.getElementById("Temple-Description-Return").innerHTML = `Loading Questing Squires in Temple` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        document.getElementById("squiresQuestingTemple").innerHTML = "";
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphQT();   
         document.getElementById("Temple-Description-Return").innerHTML = "Select the squires you would like to return from questing";
        squiresQuestingTemple();
}

    async function runTowntemple(){
        document.getElementById("Temple-Send-All").style.display ="inline";
        document.getElementById("squiresWaitingTemple").innerHTML = "";
     document.getElementById("Temple-Description-Send").innerHTML = `Loading Squires ` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphNQ();
        squiresWaitingTemple();
}

// cavern


var arrC = [];

function pushQuestingC(inputCB) {
    if (arrC.indexOf(inputCB.id) === -1) {
    arrC.push(inputCB.id);
}
    document.getElementById("Cavern-Send-Some").style.display= "inline";
    document.getElementById("questorsC").innerHTML = "Send Squire(s) # " + arrC;
    document.getElementById(inputCB.id).removeAttribute("onclick");
    document.getElementById(inputCB.id).classList.add('Selected');
}

async function squiresWaitingCavern() {
    document.getElementById("questorsC").innerHTML = "";
    document.getElementById("Cavern-Send-Some").style.display= "none";
    arrC = [];
        
        var pullGraph = await graphNQ();

        const squires = new Array(pullGraph);
        
        if(squires[0].length == 0){
                    document.getElementById("Cavern-Description-Send").innerHTML = "All squires are currently questing!";
        }
        else{
        
        
    for (var i = 0; i < squires[0].length; i++) {

         let token = squires[0][i].id;
        
            let check = squires[0][i].type;
            let sf = squires[0][i].strength;
            let lf = squires[0][i].luck;
            let ff = squires[0][i].faith;
            let wf = squires[0][i].wisdom;
            let gF = squires[0][i].genesis;
            let tf = squires[0][i].typename;
            let image = squires[0][i].image;
          
                  document.getElementById("squiresWaitingCavern").innerHTML +=
                `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires" onclick="pushQuestingC(this)">Select <span class="token-number">#` + token + `</span></button>` +
                `</div>` +
                `</div>`;

            var ab = document.getElementById("squires");
            ab.setAttribute("id", token)
    }
    
    document.getElementById("Cavern-Description-Send").innerHTML = "Select the squires you would like to send off questing";
    
    }
}

var arrQC = [];

async function pushQuestingCQ(inputCB) {
        if (arrQC.indexOf(inputCB.id) === -1) {
    arrQC.push(inputCB.id);
}
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(cavern.address, cavern.abi, provider);
    document.getElementById("Cavern-Return-Some").style.display= "inline";
    document.getElementById("questorsCQ").innerHTML = "Return Squire(s) # " + arrQC;
    document.getElementById(inputCB.id).removeAttribute("onclick");
    document.getElementById(inputCB.id).classList.add('Selected');
}

async function pushQuestingCQx() {
         document.getElementById("Cavern-Description-Return").innerHTML = "This squire is still questing!";
         await delay(3);
         document.getElementById("Cavern-Description-Return").innerHTML = "Select the squires you would like to return from questing";
}

async function clearQC(){
    arrQC = [];
}

async function clearC(){
    arrC = [];
}

async function squiresQuestingCavern() {
    
     await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(cavern.address, cavern.abi, provider);
    const CONTRACT_ADDRESS_SQUIRE = new ethers.Contract(squire.address, squire.abi, provider);


    document.getElementById("questorsCQ").innerHTML = "";
    document.getElementById("Cavern-Return-Some").style.display= "none";
       document.getElementById("squiresQuestingCavern").innerHTML= "";

          var pullGraph = await graphQC();
        
        const squires = new Array(pullGraph);

        if(squires[0].length == 0){
                document.getElementById("Cavern-Description-Return").innerHTML = "No squires are currently questing!";
        }
        else{
            

    for (var xx = 0; xx < squires[0].length; xx++) {
        

            let check = squires[0][xx].type;
            let sf = squires[0][xx].strength;
            let lf = squires[0][xx].luck;
            let ff = squires[0][xx].faith;
            let wf = squires[0][xx].wisdom;
            let gF = squires[0][xx].genesis;
            let tf = squires[0][xx].typename;
            let image = squires[0][xx].image;
            
    let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;
    let canleave = squires[0][xx].finish - timestamp;
           
        
        if(canleave > 0){
                let time = canleave;
                let timer = new Date(time * 1000).toISOString().substr(11, 8);


            document.getElementById("squiresQuestingCavern").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest"  onclick="pushQuestingCQx()"><span class="token-number">#` + squires[0][xx].id + " is still questing: " + `<span id="timerQC">` + timer + `</span>` + `</span></button>` +
                `</div>` +
                `</div>`;

    }    
    else{
        

        
                    document.getElementById("squiresQuestingCavern").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squiresQuesting" onclick="pushQuestingCQ(this)"><span class="token-number">#` + squires[0][xx].id + " is ready to return" + `</span></button>` +
                `</div>` +
                `</div>`;

            
            var ab = document.getElementById("squiresQuesting");
            ab.setAttribute("id", squires[0][xx].id)
        
             }
             

        }
        
}

}

  async function runQuestingcavern(){
    document.getElementById("Cavern-Description-Return").innerHTML = `Loading Questing Squires in Cavern` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        document.getElementById("squiresQuestingCavern").innerHTML = "";
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphQC();   
         document.getElementById("Cavern-Description-Return").innerHTML = "Select the squires you would like to return from questing";
        squiresQuestingCavern();
}

    async function runTowncavern(){
            document.getElementById("Cavern-Send-All").style.display ="inline";
        document.getElementById("squiresWaitingCavern").innerHTML = "";
     document.getElementById("Cavern-Description-Send").innerHTML = `Loading Squires ` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphNQ();
        squiresWaitingCavern();
}

// mountain


var arrM = [];

function pushQuestingM(inputCB) {
    if (arrM.indexOf(inputCB.id) === -1) {
    arrM.push(inputCB.id);
}
    document.getElementById("Mountain-Send-Some").style.display= "inline";
    document.getElementById("questorsM").innerHTML = "Send Squire(s) # " + arrM;
    document.getElementById(inputCB.id).removeAttribute("onclick");
    document.getElementById(inputCB.id).classList.add('Selected');
}

async function squiresWaitingMountain() {
    document.getElementById("questorsM").innerHTML = "";
    document.getElementById("Mountain-Send-Some").style.display= "none";
    arrM = [];
        
        var pullGraph = await graphNQ();

        const squires = new Array(pullGraph);
        
        if(squires[0].length == 0){
                    document.getElementById("Mountain-Description-Send").innerHTML = "All squires are currently questing!";
        }
        else{
        
        
    for (var i = 0; i < squires[0].length; i++) {

         let token = squires[0][i].id;
        
            let check = squires[0][i].type;
            let sf = squires[0][i].strength;
            let lf = squires[0][i].luck;
            let ff = squires[0][i].faith;
            let wf = squires[0][i].wisdom;
            let gF = squires[0][i].genesis;
            let tf = squires[0][i].typename;
            let image = squires[0][i].image;
          
                  document.getElementById("squiresWaitingMountain").innerHTML +=
                `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires" onclick="pushQuestingM(this)">Select <span class="token-number">#` + token + `</span></button>` +
                `</div>` +
                `</div>`;

            var ab = document.getElementById("squires");
            ab.setAttribute("id", token)
    }
    
    document.getElementById("Mountain-Description-Send").innerHTML = "Select the squires you would like to send off questing";
    
    }
}

var arrQM = [];

async function pushQuestingMQ(inputCB) {
        if (arrQM.indexOf(inputCB.id) === -1) {
    arrQM.push(inputCB.id);
}
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(mountain.address, mountain.abi, provider);
    document.getElementById("Cavern-Return-Some").style.display= "inline";
    document.getElementById("questorsMQ").innerHTML = "Return Squire(s) # " + arrQM;
    document.getElementById(inputCB.id).removeAttribute("onclick");
    document.getElementById(inputCB.id).classList.add('Selected');
}

async function pushQuestingMQx() {
         document.getElementById("Mountain-Description-Return").innerHTML = "This squire is still questing!";
         await delay(3);
         document.getElementById("Mountain-Description-Return").innerHTML = "Select the squires you would like to return from questing";
}

async function clearQM(){
    arrQM = [];
}

async function clearM(){
    arrM = [];
}

async function squiresQuestingMountain() {
    
     await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(mountain.address, mountain.abi, provider);
    const CONTRACT_ADDRESS_SQUIRE = new ethers.Contract(squire.address, squire.abi, provider);


    document.getElementById("questorsMQ").innerHTML = "";
    document.getElementById("Mountain-Return-Some").style.display= "none";
       document.getElementById("squiresQuestingMountain").innerHTML= "";

          var pullGraph = await graphQM();
        
        const squires = new Array(pullGraph);

        if(squires[0].length == 0){
                document.getElementById("Mountain-Description-Return").innerHTML = "No squires are currently questing!";
        }
        else{
            

    for (var xx = 0; xx < squires[0].length; xx++) {
        

            let check = squires[0][xx].type;
            let sf = squires[0][xx].strength;
            let lf = squires[0][xx].luck;
            let ff = squires[0][xx].faith;
            let wf = squires[0][xx].wisdom;
            let gF = squires[0][xx].genesis;
            let tf = squires[0][xx].typename;
            let image = squires[0][xx].image;
            
    let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;
    let canleave = squires[0][xx].finish - timestamp;
           
        
        if(canleave > 0){
                let time = canleave;
                let timer = new Date(time * 1000).toISOString().substr(11, 8);


            document.getElementById("squiresQuestingMountain").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest"  onclick="pushQuestingCQx()"><span class="token-number">#` + squires[0][xx].id + " is still questing: " + `<span id="timerQM">` + timer + `</span>` + `</span></button>` +
                `</div>` +
                `</div>`;

    }    
    else{
        

        
                    document.getElementById("squiresQuestingMountain").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squiresQuesting" onclick="pushQuestingMQ(this)"><span class="token-number">#` + squires[0][xx].id + " is ready to return" + `</span></button>` +
                `</div>` +
                `</div>`;

            
            var ab = document.getElementById("squiresQuesting");
            ab.setAttribute("id", squires[0][xx].id)
        
             }
             

        }
        
}

}

  async function runQuestingmountain(){
    document.getElementById("Mountain-Description-Return").innerHTML = `Loading Questing Squires in Mountain` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        document.getElementById("squiresQuestingMountain").innerHTML = "";
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphQM();   
         document.getElementById("Mountain-Description-Return").innerHTML = "Select the squires you would like to return from questing";
        squiresQuestingMountain();
}

    async function runTownmountain(){
        document.getElementById("Mountain-Send-All").style.display ="inline";
        document.getElementById("squiresWaitingMountain").innerHTML = "";
     document.getElementById("Mountain-Description-Send").innerHTML = `Loading Squires ` + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
         graphNQ();
        squiresWaitingMountain();
}


   async function squiresInventory() {
    
     await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS_SQUIRE = new ethers.Contract(squire.address, squire.abi, provider);

    document.getElementById("squiresInventory").innerHTML = "";
    
          var pullGraph = await graph();
        
        const squires = new Array(pullGraph);

                  squireTotal();

    for (var xx = 0; xx < squires[0].length; xx++) {
        

            let check = squires[0][xx].type;
            let sf = squires[0][xx].strength;
            let lf = squires[0][xx].luck;
            let ff = squires[0][xx].faith;
            let wf = squires[0][xx].wisdom;
            let gF = squires[0][xx].genesis;
            let tf = squires[0][xx].typename;
            let image = squires[0][xx].image;
            
      

            if(squires[0][xx].questtype == "forest" && squires[0][xx].questing == true){
            
            document.getElementById("squiresInventory").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" ><span class="token-number">#` + squires[0][xx].id + ` questing Forest` + `</span></button>` +
                `</div>` +
                `</div>`;
            }
                        if(squires[0][xx].questtype == "cavern" && squires[0][xx].questing == true){
            
            document.getElementById("squiresInventory").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" ><span class="token-number">#` + squires[0][xx].id + ` questing Cavern` + `</span></button>` +
                `</div>` +
                `</div>`;
            }
                        if(squires[0][xx].questtype == "mountain" && squires[0][xx].questing == true){
            
            document.getElementById("squiresInventory").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" ><span class="token-number">#` + squires[0][xx].id + ` questing Mountain` + `</span></button>` +
                `</div>` +
                `</div>`;
            }
                        if(squires[0][xx].questtype == "temple" && squires[0][xx].questing == true){
            
            document.getElementById("squiresInventory").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" ><span class="token-number">#` + squires[0][xx].id + ` questing Temple` + `</span></button>` +
                `</div>` +
                `</div>`;
            }
            if(squires[0][xx].questing == false){
                
                 document.getElementById("squiresInventory").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" ><span class="token-number">#` + squires[0][xx].id + ` is in town` +  `</span></button>` +
                `</div>` +
                `</div>`;  
                
                
            }


        }
        

}


    async function squiresQuestingForestOld() {
    
     await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(forestold.address, forestold.abi, provider);
    const CONTRACT_ADDRESS_SQUIRE = new ethers.Contract(squire.address, squire.abi, provider);


    // try{


    document.getElementById("questorsFQ").innerHTML = "";
    document.getElementById("Forest-Return-Some").style.display= "none";
    
          var pullGraph = await graphQOld();
        
        const squires = new Array(pullGraph);

        if(squires[0].length == 0){
                document.getElementById("Forest-Description-Return-Old").innerHTML = "No squires are currently questing!";
        }
        else{
            

    for (var xx = 0; xx < squires[0].length; xx++) {
        

            let check = squires[0][xx].type;
            let sf = squires[0][xx].strength;
            let lf = squires[0][xx].luck;
            let ff = squires[0][xx].faith;
            let wf = squires[0][xx].wisdom;
            let gF = squires[0][xx].genesis;
           
           if (check == 1 && gF === 0) {
                var tf = "Strength";
                var image = "https://knightsoftheether.com/squires/images/strength.png";
            }
            if (check == 2 && gF === 0) {
                var tf = "Wisdom";
                var image = "https://knightsoftheether.com/squires/images/wisdom.png";
            }
            if (check == 3 && gF === 0) {
                var tf = "Luck";
                var image = "https://knightsoftheether.com/squires/images/luck.png";
            }
            if (check == 4 && gF === 0) {
                var tf = "Faith";
                var image = "https://knightsoftheether.com/squires/images/faith.png";
            }
            if (check == 1 && gF == 1) {
                var tf = "Genesis Strength";
                var image = "https://knightsoftheether.com/squires/images/strengthG.png";
            }
            if (check == 2 && gF == 1) {
                var tf = "Genesis Wisdom";
                var image = "https://knightsoftheether.com/squires/images/wisdomG.png";
            }
            if (check == 3 && gF == 1) {
                var tf = "Genesis Luck";
                var image = "https://knightsoftheether.com/squires/images/luckG.png";
            }
            if (check == 4 && gF == 1) {
                var tf = "Genesis Faith";
                var image = "https://knightsoftheether.com/squires/images/faithG.png";
            }
          


            let checkTime = await CONTRACT_ADDRESS.checkIfSquireCanLeave(squires[0][xx].id);
            


            
        if(checkTime === false){
               let time = await CONTRACT_ADDRESS.checkTimer(squires[0][xx].id);
                let timer = new Date(time * 1000).toISOString().substr(11, 8);


            document.getElementById("squiresQuestingForestOld").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest"  onclick="pushQuestingFQx()"><span class="token-number">#` + squires[0][xx].id + " is still questing: " + `<span id="timerQF">` + timer + `</span>` + `</span></button>` +
                `</div>` +
                `</div>`;

    }    
    else{
        

        
                    document.getElementById("squiresQuestingForestOld").innerHTML +=
                `<div class="item token" id="squireSelectedQuesting" >` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squiresQuesting" onclick="pushQuestingFQ(this)"><span class="token-number">#` + squires[0][xx].id + " is ready to return" + `</span></button>` +
                `</div>` +
                `</div>`;

            
            var ab = document.getElementById("squiresQuesting");
            ab.setAttribute("id", squires[0][xx].id)
        
             }
             

        }
        
document.getElementById("Forest-Description-Return-Old").innerHTML = "Select Return All to return all squires from old contract";

}

}


  async function connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
}

  async function delay(n) {
    return new Promise(function(resolve) {
        setTimeout(resolve, n * 500);
    });
}

 function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isFulfilled) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v;
        },
        function(e) {
            v
            isRejected = true;
            isPending = false;
            throw e;
        }
    );

    result.isFulfilled = function() {
        return isFulfilled;
    };
    result.isPending = function() {
        return isPending;
    };
    result.isRejected = function() {
        return isRejected;
    };
    return result;
}

class sign {
    constructor(contractAddress, chainId, signer) {
        this.contractAddress = contractAddress;
        this.chainId = chainId;
        this.signer = signer;
    }

//forest questing
    static async questForestAll() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(forest.address, forest.abi, provider);

        document.getElementById("Forest-Description-Send").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

   var pullGraph = await graphNQ();
        
        const squires = new Array(pullGraph);
        
             document.getElementById("Forest-Description-Send").innerHTML = `Sending all squires to the Forest`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

        if(squires[0].length == 0){
                 document.getElementById("Forest-Description-Send").innerHTML = "All squires are currently questing!";
        
        }
        else{


        var toSend = [];
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
        }


            questForest(toSend);
            const hash = new ethers.Contract(forest.address, forest.abi, signer);
            const tx = await hash.questForest(toSend);

             document.getElementById("Forest-Send-Some").style.display ="none";
                document.getElementById("Forest-Send-All").style.display ="none";
            const receipt = await tx.wait();
            document.getElementById("Forest-Description-Send").innerHTML = "Squires are now questing the Forest!";
             document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingForest").innerHTML = "";
            document.getElementById("squiresQuestingForest").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsF").innerHTML = "";;
            document.getElementById("Forest-Description-Send").innerHTML = "All Squires Sent to the Forest!";
             document.getElementById("squiresWaitingForest").innerHTML = "";
             
             latestTx = tx.hash;
             
    }
}

    static async questForestFew() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(forest.address, forest.abi, provider);;

        document.getElementById("Forest-Description-Send").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        

            questForest(arrF);
            

            const hash = new ethers.Contract(forest.address, forest.abi, signer);
            const tx = await hash.questForest(arrF);
             document.getElementById("Forest-Description-Send").innerHTML = `Sending Squires #${arrF} to the Forest`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            
             document.getElementById("Forest-Send-Some").style.display ="none";
                document.getElementById("Forest-Send-All").style.display ="none";
            document.getElementById("Forest-return").style.display ="none";
            const receipt = await tx.wait();
                     document.getElementById("Forest-Description-Send").innerHTML = `Squires #${arrF} are now questing the Forest!`;
             document.getElementById("squireTotal").innerHTML = "";
            document.getElementById("squiresWaitingForest").innerHTML = "";
            document.getElementById("squiresQuestingForest").innerHTML = "";
             document.getElementById("fiefTotal").innerHTML = "";
            resetFunction();
            document.getElementById("questorsF").innerHTML = "";
            arrF = []
            document.getElementById("Forest-Send-All").style.display ="inline";
            document.getElementById("Forest-return").style.display ="inline";
            document.getElementById("Forest-Description-Send").innerHTML = `Squires Sent to the Forest. Loading Squires`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`

            latestTx = tx.hash;

        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
        
            runTownforest();
            

    }

   static async leaveForestSome() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(forest.address, forest.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);


                document.getElementById("Forest-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

        const toSend = '[' + arrQF.toString() + ']';

        leaveTheForest(toSend,0);
}

   static async leaveForestAll() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(forest.address, forest.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

         var pullGraph = await graphQF();
        
        const squires = new Array(pullGraph);
        
         let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;

        var toSend = [];
        var blockSend;
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
          blockSend =+ squires[0][i].finish - timestamp;
        }
        
        const sendAll = '[' + toSend.toString() + ']';
        
        if(blockSend > 0){
          document.getElementById("Forest-Description-Return").innerHTML = `Not all squires are ready to return!`;
          await delay(3);
          document.getElementById("Forest-Description-Return").innerHTML = `Select the squires you would like to send off questing`;
        }
        else{
        document.getElementById("Forest-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        leaveTheForest(sendAll,0);
        }
}

   static async leaveForestAllRestart() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(forest.address, forest.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

         var pullGraph = await graphQF();
        
        const squires = new Array(pullGraph);
        
                 let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;

        var toSend = [];
                var blockSendFR;

        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
              blockSendFR =+ squires[0][i].finish - timestamp;
        }

        const sendAll = '[' + toSend.toString() + ']';
        if(blockSendFR > 0){
          document.getElementById("Forest-Description-Return").innerHTML = `Not all squires are ready to return!`;
          await delay(3);
          document.getElementById("Forest-Description-Return").innerHTML = `Select the squires you would like to send off questing`;
        }
        else{
                    document.getElementById("Forest-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        leaveTheForest(sendAll,1);
        }
}

//temple questing

    static async questTempleAll() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);

        document.getElementById("Temple-Description-Send").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

   var pullGraph = await graphNQ();
        
        const squires = new Array(pullGraph);
        
             document.getElementById("Temple-Description-Send").innerHTML = `Sending all squires to the Temple`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

        if(squires[0].length == 0){
                 document.getElementById("Temple-Description-Send").innerHTML = "All squires are currently questing!";
        
        }
        else{


        var toSend = [];
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
        }


            questTemple(toSend);
            const hash = new ethers.Contract(temple.address, temple.abi, signer);
            const tx = await hash.questTemple(toSend);

             document.getElementById("Temple-Send-Some").style.display ="none";
                document.getElementById("Temple-Send-All").style.display ="none";
            const receipt = await tx.wait();
            document.getElementById("Temple-Description-Send").innerHTML = "Squires are now questing the Temple!";
             document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingTemple").innerHTML = "";
            document.getElementById("squiresQuestingTemple").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsT").innerHTML = "";;
            document.getElementById("Temple-Description-Send").innerHTML = "All Squires Sent to the Temple!";
             document.getElementById("squiresWaitingTemple").innerHTML = "";
             
                         latestTx = tx.hash;

    }
}

    static async questTempleFew() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);

        document.getElementById("Temple-Description-Send").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        

            questTemple(arrT);
            

            const hash = new ethers.Contract(temple.address, temple.abi, signer);
            const tx = await hash.questTemple(arrT);
             document.getElementById("Temple-Description-Send").innerHTML = `Sending Squires #${arrT} to the Temple`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            
             document.getElementById("Temple-Send-Some").style.display ="none";
                document.getElementById("Temple-Send-All").style.display ="none";
            document.getElementById("Temple-return").style.display ="none";
            const receipt = await tx.wait();
                     document.getElementById("Temple-Description-Send").innerHTML = `Squires #${arrT} are now questing the Temple!`;
             document.getElementById("squireTotal").innerHTML = "";
            document.getElementById("squiresWaitingTemple").innerHTML = "";
            document.getElementById("squiresQuestingTemple").innerHTML = "";
             document.getElementById("fiefTotal").innerHTML = "";
            resetFunction();
            document.getElementById("questorsT").innerHTML = "";
            arrT = []
            document.getElementById("Temple-Send-All").style.display ="inline";
            document.getElementById("Temple-return").style.display ="inline";
            document.getElementById("Temple-Description-Send").innerHTML = `Squires Sent to the Temple. Loading Squires`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`
       
                   latestTx = tx.hash;
       
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
        
            runTowntemple();
    }

   static async leaveTempleSome() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

        document.getElementById("Temple-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

        const toSend = '[' + arrQT.toString() + ']';

        leaveTheTemple(toSend,0);
}

   static async leaveTempleAll() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

         var pullGraph = await graphQT();
        
        const squires = new Array(pullGraph);
        
         let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;

        var toSend = [];
        var blockSend;
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
          blockSend =+ squires[0][i].finish - timestamp;
        }
        
        const sendAll = '[' + toSend.toString() + ']';
        
        if(blockSend > 0){
          document.getElementById("Temple-Description-Return").innerHTML = `Not all squires are ready to return!`;
          await delay(3);
          document.getElementById("Temple-Description-Return").innerHTML = `Select the squires you would like to send off questing`;
        }
        else{
        document.getElementById("Temple-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        leaveTheTemple(sendAll,0);
        }
}

   static async leaveTempleAllRestart() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(temple.address, temple.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

         var pullGraph = await graphQT();
        
        const squires = new Array(pullGraph);
        
                 let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;

        var toSend = [];
                var blockSendFR;

        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
              blockSendFR =+ squires[0][i].finish - timestamp;
        }

        const sendAll = '[' + toSend.toString() + ']';
        if(blockSendFR > 0){
          document.getElementById("Temple-Description-Return").innerHTML = `Not all squires are ready to return!`;
          await delay(3);
          document.getElementById("Temple-Description-Return").innerHTML = `Select the squires you would like to send off questing`;
        }
        else{
                    document.getElementById("Temple-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        leaveTheTemple(sendAll,1);
        }
}



 
 
 //cavern questing
    static async questCavernAll() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(cavern.address, cavern.abi, provider);

        document.getElementById("Cavern-Description-Send").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

   var pullGraph = await graphNQ();
        
        const squires = new Array(pullGraph);
        
             document.getElementById("Cavern-Description-Send").innerHTML = `Sending all squires to the Cavern`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

        if(squires[0].length == 0){
                 document.getElementById("Cavern-Description-Send").innerHTML = "All squires are currently questing!";
        
        }
        else{


        var toSend = [];
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
        }


            questCavern(toSend);
            const hash = new ethers.Contract(cavern.address, cavern.abi, signer);
            const tx = await hash.questCavern(toSend);

             document.getElementById("Cavern-Send-Some").style.display ="none";
                document.getElementById("Cavern-Send-All").style.display ="none";
            const receipt = await tx.wait();
            document.getElementById("Cavern-Description-Send").innerHTML = "Squires are now questing the Cavern!";
             document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingCavern").innerHTML = "";
            document.getElementById("squiresQuestingCavern").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsC").innerHTML = "";;
            document.getElementById("Cavern-Description-Send").innerHTML = "All Squires Sent to the Cavern!";
             document.getElementById("squiresWaitingCavern").innerHTML = "";
   
               latestTx = tx.hash;

   
    }
}

    static async questCavernFew() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(cavern.address, cavern.abi, provider);;

        document.getElementById("Cavern-Description-Send").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        

            questCavern(arrC);
            

            const hash = new ethers.Contract(cavern.address, cavern.abi, signer);
            const tx = await hash.questCavern(arrC);
             document.getElementById("Cavern-Description-Send").innerHTML = `Sending Squires #${arrC} to the Cavern`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            
             document.getElementById("Cavern-Send-Some").style.display ="none";
                document.getElementById("Cavern-Send-All").style.display ="none";
            document.getElementById("Cavern-return").style.display ="none";
            const receipt = await tx.wait();
                     document.getElementById("Cavern-Description-Send").innerHTML = `Squires #${arrC} are now questing the Cavern!`;
             document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingCavern").innerHTML = "";
            document.getElementById("squiresQuestingCavern").innerHTML = "";
             document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsC").innerHTML = "";
            arrC = []
            document.getElementById("Cavern-Send-All").style.display ="inline";
            document.getElementById("Cavern-return").style.display ="inline";
            document.getElementById("Cavern-Description-Send").innerHTML = `Squires Sent to the Cavern. Loading Squires`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`
      
                  latestTx = tx.hash;

      
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
        
            runTowncavern();
    }

   static async leaveCavernSome() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(cavern.address, cavern.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);


                document.getElementById("Cavern-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

        const toSend = '[' + arrQC.toString() + ']';

        leaveTheCavern(toSend,0);
}

   static async leaveCavernAll() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(cavern.address, cavern.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

         var pullGraph = await graphQC();
        
        const squires = new Array(pullGraph);
        
         let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;

        var toSend = [];
        var blockSendC;
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
          blockSendC =+ squires[0][i].finish - timestamp;
        }
        
        const sendAll = '[' + toSend.toString() + ']';
        
        if(blockSendC > 0){
          document.getElementById("Cavern-Description-Return").innerHTML = `Not all squires are ready to return!`;
          await delay(3);
          document.getElementById("Cavern-Description-Return").innerHTML = `Select the squires you would like to send off questing`;
        }
        else{
        document.getElementById("Cavern-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        leaveTheCavern(sendAll,0);
        }
}

   static async leaveCavernAllRestart() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(cavern.address, cavern.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

         var pullGraph = await graphQC();
        
        const squires = new Array(pullGraph);
        
                 let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;

        var toSend = [];
                var blockSendCR;
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
              blockSendCR =+ squires[0][i].finish - timestamp;
        }

        const sendAll = '[' + toSend.toString() + ']';
        if(blockSendCR > 0){
          document.getElementById("Cavern-Description-Return").innerHTML = `Not all squires are ready to return!`;
          await delay(3);
          document.getElementById("Cavern-Description-Return").innerHTML = `Select the squires you would like to send off questing`;
        }
        else{
                    document.getElementById("Cavern-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        leaveTheCavern(sendAll,1);
        }
}
 
  //mountain questing
    static async questMountainAll() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(mountain.address, mountain.abi, provider);

        document.getElementById("Mountain-Description-Send").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

   var pullGraph = await graphNQ();
        
        const squires = new Array(pullGraph);
        
             document.getElementById("Mountain-Description-Send").innerHTML = `Sending all squires to the Mountain`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

        if(squires[0].length == 0){
                 document.getElementById("Mountain-Description-Send").innerHTML = "All squires are currently questing!";
        
        }
        else{


        var toSend = [];
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
        }


            questMountain(toSend);
            const hash = new ethers.Contract(mountain.address, mountain.abi, signer);
            const tx = await hash.questMountain(toSend);

             document.getElementById("Mountain-Send-Some").style.display ="none";
                document.getElementById("Mountain-Send-All").style.display ="none";
            const receipt = await tx.wait();
            document.getElementById("Mountain-Description-Send").innerHTML = "Squires are now questing the Mountain!";
             document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingMountain").innerHTML = "";
            document.getElementById("squiresQuestingMountain").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsM").innerHTML = "";;
            document.getElementById("Mountain-Description-Send").innerHTML = "All Squires Sent to the Mountain!";
             document.getElementById("squiresWaitingMountain").innerHTML = "";
  
              latestTx = tx.hash;

  
    }
}

    static async questMountainFew() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(mountain.address, mountain.abi, provider);;

        document.getElementById("Mountain-Description-Send").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        

            questMountain(arrM);
            

            const hash = new ethers.Contract(mountain.address, mountain.abi, signer);
            const tx = await hash.questMountain(arrM);
             document.getElementById("Mountain-Description-Send").innerHTML = `Sending Squires #${arrM} to the Mountain`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
            
             document.getElementById("Mountain-Send-Some").style.display ="none";
                document.getElementById("Mountain-Send-All").style.display ="none";
            document.getElementById("Mountain-return").style.display ="none";
            const receipt = await tx.wait();
                     document.getElementById("Mountain-Description-Send").innerHTML = `Squires #${arrM} are now questing the Mountain!`;
             document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingMountain").innerHTML = "";
            document.getElementById("squiresQuestingMountain").innerHTML = "";
             document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsM").innerHTML = "";
            arrM = []
            document.getElementById("Mountain-Send-All").style.display ="inline";
            document.getElementById("Mountain-return").style.display ="inline";
            document.getElementById("Mountain-Description-Send").innerHTML = `Squires Sent to the Mountain. Loading Squires`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`
    
                latestTx = tx.hash;
    
        if(latestTx != undefined){
        await awaitSubgraph(latestTx);
        }
        
            runTownmountain();
    }

   static async leaveMountainSome() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(mountain.address, mountain.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);


                document.getElementById("Mountain-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;

        const toSend = '[' + arrQM.toString() + ']';

        leaveTheMountain(toSend,0);
}

   static async leaveMountainAll() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(mountain.address, mountain.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

         var pullGraph = await graphQM();
        
        const squires = new Array(pullGraph);
        
         let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;

        var toSend = [];
        var blockSendM;
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
          blockSendM =+ squires[0][i].finish - timestamp;
        }
        
        const sendAll = '[' + toSend.toString() + ']';
        
        if(blockSendM > 0){
          document.getElementById("Mountain-Description-Return").innerHTML = `Not all squires are ready to return!`;
          await delay(3);
          document.getElementById("Mountain-Description-Return").innerHTML = `Select the squires you would like to send off questing`;
        }
        else{
        document.getElementById("Mountain-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        leaveTheMountain(sendAll,0);
        }
}

   static async leaveMountainAllRestart() {
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(mountain.address, mountain.abi, provider);
        const CONTRACT_ADDRESS_S = new ethers.Contract(squire.address, squire.abi, provider);

         var pullGraph = await graphQM();
        
        const squires = new Array(pullGraph);
        
                 let blockn = await provider.getBlockNumber();
    let block = await provider.getBlock(blockn);
    let timestamp = block.timestamp;

        var toSend = [];
                var blockSendMR;
        
        for (var i=0; i< squires[0].length; i++){
          toSend.push(squires[0][i].id++);  
              blockSendMR =+ squires[0][i].finish - timestamp;
        }

        const sendAll = '[' + toSend.toString() + ']';
        if(blockSendMR > 0){
          document.getElementById("Mountain-Description-Return").innerHTML = `Not all squires are ready to return!`;
          await delay(3);
          document.getElementById("Mountain-Description-Return").innerHTML = `Select the squires you would like to send off questing`;
        }
        else{
                    document.getElementById("Mountain-Description-Return").innerHTML = `Gathering Squires and Prompting Metamask`  + `<br>` + `<img class="menu-description" style="width:25%; display: block;margin-left: auto;margin-right: auto;" src="https://knightsoftheether.com/tnet/images/loading.gif">`;
        leaveTheMountain(sendAll,1);
        }
}
 
 
   static async leaveForestAllOld() {
        
        
        try{
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(forestold.address, forestold.abi, provider);
        
        document.getElementById("Forest-Description-Return-Old").innerHTML = "Gathering Squires and Prompting Metamask...";

        var pullGraph = await graphQOld();
        
        const squires = new Array(pullGraph);
        

            document.getElementById("Forest-Description-Return-Old").innerHTML = `Returning All Squires from the Forest...`;
            

        if(squires[0].length == 0){
              document.getElementById("Forest-Description-Return-Old").innerHTML = `No Squires are Questing the Forest!`;
          
        }
        else{
            
           document.getElementById("Forest-Return-All-Old").style.display = "none";
        
        var toReturn = [];
        var checkTimer = [];
        for (var i=0; i< squires[0].length; i++){
          toReturn.push(squires[0][i].id++);  
        }
        
            leaveForest(toReturn);
            const hash = new ethers.Contract(forestold.address, forestold.abi, signer);
            const tx = await hash.leaveForest(toReturn);
            document.getElementById("Forest-Return-All-Old").style.display ="none";
            document.getElementById("Forest-quest-Old").classList.remove("menu-active");
            const receipt = await tx.wait();
            document.getElementById("squireTotal").innerHTML = "";
            resetFunction();
            document.getElementById("squiresWaitingForest").innerHTML = "";
            document.getElementById("squiresQuestingForestOld").innerHTML = "";
            document.getElementById("fiefTotal").innerHTML = "";
            document.getElementById("questorsFQ").innerHTML = "";
            document.getElementById("Forest-Menu__Return-Old").classList.remove("menu-active");
            document.getElementById("Forest-Menu__Loot").classList.add("menu-active");
                    
                    let fiefSum = 0;
        
        
                    latestTx = tx.hash;

                    
        for (var y = 0; y < squires[0].length; y++) {


              let totalFiefForest = await CONTRACT_ADDRESS.squireToAmountClaimed(squires[0][y].id);
              let lastUpgradeForest = await CONTRACT_ADDRESS.lastUpgrade(squires[0][y].id);
              let lastUpgradeTypeForest = await CONTRACT_ADDRESS.lastUpgradeType(squires[0][y].id);

            let check = squires[0][y].type;
            let sf = squires[0][y].strength;
            let lf = squires[0][y].luck;
            let ff = squires[0][y].faith;
            let wf = squires[0][y].wisdom;
            let gF = squires[0][y].genesis;

          
              
            let f = totalFiefForest/1000000000000000000;
            let ut = lastUpgradeTypeForest.toString();
            document.getElementById("Forest-Squires").innerHTML = squires[0].length;
            
            // document.getElementById("Forest-Fief").innerHTML +=
            
            //           `<div class="item token" id="squireSelected" >` +

            //     `<div class="token-stats">` +
            //     `<ul>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
            //     `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
            //     `</ul>` +
            //     `<button class="btn quest" id="squires" >Squire #${squires[0][y].id}: +${f} FIEF</span></button>` +
            //     `</div>` +
            //     `</div>`;
            
            
            if(ut == "None"){
            document.getElementById("Forest-Stats").innerHTML += 
            
                     `<div class="item token" id="squireSelected" >` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires" >Squire #${squires[0][y].id}: ${ut}</span></button>` +
                `</div>` +
                `</div>`;
            
            
            }
            else{
            document.getElementById("Forest-Stats").innerHTML +=
            
                    `<div class="item token" id="squireSelected" >` +
                `<div class="token-image">` +
                `<div class="menu-label">` + tf + `</div>` +
                `<img src=` + image + `>` +
                `</div>` +
                `<div class="token-stats">` +
                `<ul>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-axe.png"></i>Strength: <span class="stat-value">` + sf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-jewel.png"></i>Luck: <span class="stat-value">` + lf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-sparkle.png"></i>Wisdom: <span class="stat-value">` + wf + `</span></li>` +
                `<li class="stat"><i class="stat-icon"><img src="https://knightsoftheether.com/beta/i/kote-icon-staff.png"></i>Faith: <span class="stat-value">` + ff + `</span></li>` +
                `</ul>` +
                `<button class="btn quest" id="squires">Squire #${squires[0][y].id}: +1 ${ut}</span></button>` +
                `</div>` +
                `</div>`;
            
            }

            
            fiefSum += f;
            document.getElementById("fief-total").innerHTML = "Counting: " + fiefSum;
        }
        document.getElementById("Close-quest-Loot-Forest").style.display = "inline";
        document.getElementById("fief-total").innerHTML = fiefSum;
            }
        }
        catch(error){
                    document.getElementById("Forest-Description-Return-Old").innerHTML = "Not all squires are ready to return!";
        }
}
    
    static async approveForest() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(squire.address, squire.abi, provider);
        
        setApprovalForAll(forest.address,true);
        const hash = new ethers.Contract(squire.address, squire.abi, signer);
        const tx = await hash.setApprovalForAll(forest.address,true);
        const receipt = await tx.wait();
        document.getElementById("Forest-Menu__Approve").classList.remove("menu-active");
    }

    static async approveTemple() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(squire.address, squire.abi, provider);
        
        setApprovalForAll(temple.address,true);
        const hash = new ethers.Contract(squire.address, squire.abi, signer);
        const tx = await hash.setApprovalForAll(temple.address,true);
        const receipt = await tx.wait();
        document.getElementById("Temple-Menu__Approve").classList.remove("menu-active");
    }

    static async approveCavern() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(squire.address, squire.abi, provider);
        
        setApprovalForAll(cavern.address,true);
        const hash = new ethers.Contract(squire.address, squire.abi, signer);
        const tx = await hash.setApprovalForAll(cavern.address,true);
        const receipt = await tx.wait();
        document.getElementById("Cavern-Menu__Approve").classList.remove("menu-active");
    }

    static async approveMountain() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(squire.address, squire.abi, provider);
        
        setApprovalForAll(mountain.address,true);
        const hash = new ethers.Contract(squire.address, squire.abi, signer);
        const tx = await hash.setApprovalForAll(mountain.address,true);
        const receipt = await tx.wait();
        document.getElementById("Mountain-Menu__Approve").classList.remove("menu-active");
    }
    
    
    static async sendfief() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(fief.address, fief.abi, provider);
        
            const total = parseInt(await CONTRACT_ADDRESS.balanceOf(signer.getAddress()))/1000000000000000000;

        var toSendAmount = document.getElementById("fief-input-amount").value;
        var toSendto = document.getElementById("fief-input-address").value;
        
            var setTokens = BigInt(toSendAmount);
          var setMultiplier = BigInt("1000000000000000000");
                const toSend = setTokens * setMultiplier;

        // try{
                if(toSendAmount <= 0){
                   document.getElementById("fief-input-amount-text").innerHTML = "Enter more than 0 $FIEF";
                   document.getElementById("fief-input-amount-text").style.color="red";
           await delay(5);
                   document.getElementById("fief-input-amount-text").style.color="white";
            document.getElementById("fief-input-amount-text").innerHTML = "Input Amount of $FIEF to Send:";     
                }
                else{
        
        if(toSendAmount > total){
             document.getElementById("fief-input-amount-text").innerHTML = "You entered more $FIEF than is in your inventory.";
                   document.getElementById("fief-input-amount-text").style.color="red";
           await delay(5);
                   document.getElementById("fief-input-amount-text").style.color="white";
            document.getElementById("fief-input-amount-text").innerHTML = "Input Amount of $FIEF to Send:";  
        }
        else{
        if(toSendto.length < 42 || toSendto.length > 42){
            document.getElementById("fief-input-address-text").innerHTML = "Invalid Address, Please Enter a valid 42 character address.";
            document.getElementById("fief-input-address-text").style.color="red";
            await delay(5);
            document.getElementById("fief-input-address-text").style.color="white";
            document.getElementById("fief-input-address-text").innerHTML = "Input Address to Send to:";
        }
        else{

        const hash = new ethers.Contract(fief.address, fief.abi, signer);
        
        const tx = await hash.transfer(toSendto,toSend);
                    document.getElementById("fief-input-amount").style.backgroundColor = "#CCCCCC";
                    document.getElementById("fief-input-address").style.backgroundColor = "#CCCCCC";
                    document.getElementById("fief-input-amount").setAttribute("readonly", "true");
                    document.getElementById("fief-input-address").setAttribute("readonly", "true");
                    document.getElementById("send-fief-button").style.display="none"
        const receipt = await tx.wait();
                fiefTotal();
                    document.getElementById("fief-input-amount").style.backgroundColor = "white";
                    document.getElementById("fief-input-address").style.backgroundColor = "white";
                    document.getElementById("fief-input-amount").removeAttribute('readonly');
                    document.getElementById("fief-input-address").removeAttribute('readonly');
                           document.getElementById("send-fief-button").style.display="inline"
        }
        }
                }
        // }
        // catch(err){
        //     document.getElementById("fief-input-address-text").innerHTML = "Invalid Address, Please Enter a valid 42 character address.";
        //     document.getElementById("fief-input-address-text").style.color="red";
        //     await delay(5);
        //     document.getElementById("fief-input-address-text").style.color="white";
        //     document.getElementById("fief-input-address-text").innerHTML = "Input Address to Send to:";
        // }
    }
    

 


    async _signingDomain() {
        if (this._domain != null) {
            return this._domain;
        }
        const chainId = await this.chainId;
        this._domain = {
            name: SIGNING_DOMAIN_NAME,
            version: SIGNING_DOMAIN_VERSION,
            verifyingContract: this.contractAddress,
            chainId
        };
        return this._domain;
    }



}