var gate = document.getElementById("Gate");
var gateBtn = document.getElementById("Gate__Button");
var world = document.getElementById("World");
var worldMap = document.getElementById("World__Map");
var alchemistLabel = document.getElementById("Alchemist-Label");
var alchemistBuilding = document.getElementById("Alchemist");
var templeLabel = document.getElementById("Temple-Label");
var templeBuilding = document.getElementById("Temple");
var blacksmithLabel = document.getElementById("Blacksmith-Label");
var blacksmithBuilding = document.getElementById("Blacksmith");
var cavernLabel = document.getElementById("Cavern-Label");
var cavernBuilding = document.getElementById("Cavern");
var forestLabel = document.getElementById("Forest-Label");
var forestBuilding = document.getElementById("Forest");
var jewelerLabel = document.getElementById("Jeweler-Label");
var jewelerBuilding = document.getElementById("Jeweler");
var mountainLabel = document.getElementById("Mountain-Label");
var mountainBuilding = document.getElementById("Mountain");
var townLabel = document.getElementById("Town-Label");
var townBuilding = document.getElementById("Town");
var inventoryMenu = document.getElementById("Inventory");
var inventoryHeader = document.getElementById("Inventory__Header");
var site = document.getElementById("Site");
var inventoryItem = document.getElementsByClassName("inventory-item");
var closeMenu = document.getElementsByClassName("close-menu");

//questing
var mountainReturn = document.getElementById("Mountain-return");
var mountainQuest = document.getElementById("Mountain-quest");
var forestReturn = document.getElementById("Forest-return");
var forestQuest = document.getElementById("Forest-quest");
var cavernReturn = document.getElementById("Cavern-return");
var cavernQuest = document.getElementById("Cavern-quest");
var templeReturn = document.getElementById("Temple-return");
var templeQuest = document.getElementById("Temple-quest");

//arrovals
var forestApproval = document.getElementById("Forest-Approval");
var mountainApproval = document.getElementById("Mountain-Approval");
var templeApproval = document.getElementById("Temple-Approval");
var cavernApproval = document.getElementById("Cavern-Approval");

//looting
var closeForestQuestLoot = document.getElementById("Close-quest-Loot-Forest");
var closeTempleQuestLoot = document.getElementById("Close-quest-Loot-Temple");
var closeMountainQuestLoot = document.getElementById("Close-quest-Loot-Mountain");
var closeCavernQuestLoot = document.getElementById("Close-quest-Loot-Cavern");

//inventory
var squiresInventory = document.getElementById("Inventory-Squires-Trigger");
var closesquiresInventory = document.getElementById("Close-Inventory-Squires");
var fiefInventory = document.getElementById("Inventory-Fief-Trigger");
var closefiefInventory = document.getElementById("Close-Inventory-Fief");
var ringInventory = document.getElementById("Inventory-Ring-Trigger");
var closeringInventory = document.getElementById("Close-Inventory-Ring");
var potionInventory = document.getElementById("Inventory-Potion-Trigger");
var closepotionInventory = document.getElementById("Close-Inventory-Potion");
var trinketInventory = document.getElementById("Inventory-Trinket-Trigger");
var closetrinketInventory = document.getElementById("Close-Inventory-Trinket");
var gearInventory = document.getElementById("Inventory-Gear-Trigger");
var closegearInventory = document.getElementById("Close-Inventory-Gear");

//closing
var closeMountainSend = document.getElementById("Close-Mountain-Send");
var closeMountainReturn = document.getElementById("Close-Mountain-Return");
var closeForestSend = document.getElementById("Close-Forest-Send");
var closeForestReturn = document.getElementById("Close-Forest-Return");
var closeTempleSend = document.getElementById("Close-Temple-Send");
var closeTempleReturn = document.getElementById("Close-Temple-Return");
var closeCavernSend = document.getElementById("Close-Cavern-Send");
var closeCavernReturn = document.getElementById("Close-Cavern-Return");

var closeTown = document.getElementById("Close-Town");
var closeJeweler = document.getElementById("Close-Jeweler");
var closeBlacksmith = document.getElementById("Close-Blacksmith");
var closeAlchemist = document.getElementById("Close-Alchemist");

$(closeMenu).click(function () {
  $(site).addClass("no-menus no-fog");
});


$(forestLabel).click(function () {
    runTownforest();
    runQuestingforest();
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Forest-Menu__Send").addClass("menu-active");
  $("#Forest-Menu__Loot").removeClass("menu-active");
  $("#Temple-Menu__Loot").removeClass("menu-active");
  $("#Cavern-Menu__Loot").removeClass("menu-active");
  $("#Mountain-Menu__Loot").removeClass("menu-active");
});

$(forestReturn).click(function () {
  $(site).removeClass("no-fog no-menus");
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Forest-Menu__Return").addClass("menu-active");
  $("#Forest-Menu__Send").removeClass("menu-active");
});

$(forestQuest).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Forest-Menu__Return").removeClass("menu-active");
  $("#Forest-Menu__Send").addClass("menu-active");
});

$(templeLabel).click(function () {
checkApproveTemple();
});

$(templeReturn).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Temple-Menu__Return").addClass("menu-active");
  $("#Temple-Menu__Send").removeClass("menu-active");
});

$(templeQuest).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Temple-Menu__Return").removeClass("menu-active");
  $("#Temple-Menu__Send").addClass("menu-active");
});

$(mountainLabel).click(function () {
        runTownmountain();
    runQuestingmountain();
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Mountain-Menu__Send").addClass("menu-active");
  $("#Mountain-Menu__Loot").removeClass("menu-active");
  $("#Forest-Menu__Loot").removeClass("menu-active");
  $("#Temple-Menu__Loot").removeClass("menu-active");
  $("#Cavern-Menu__Loot").removeClass("menu-active");
  $("#Mountain-Menu__Loot").removeClass("menu-active");
});

$(mountainReturn).click(function () {
  $(site).removeClass("no-fog no-menus");
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Mountain-Menu__Return").addClass("menu-active");
  $("#Mountain-Menu__Send").removeClass("menu-active");
});

$(mountainQuest).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Mountain-Menu__Return").removeClass("menu-active");
  $("#Mountain-Menu__Send").addClass("menu-active");
});

$(cavernLabel).click(function () {
    runTowncavern();
    runQuestingcavern();
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Cavern-Menu__Send").addClass("menu-active");
  $("#Forest-Menu__Loot").removeClass("menu-active");
  $("#Temple-Menu__Loot").removeClass("menu-active");
  $("#Cavern-Menu__Loot").removeClass("menu-active");
  $("#Mountain-Menu__Loot").removeClass("menu-active");
});

$(cavernReturn).click(function () {
  $(site).removeClass("no-fog no-menus");
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Cavern-Menu__Return").addClass("menu-active");
  $("#Cavern-Menu__Send").removeClass("menu-active");
});

$(cavernQuest).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Cavern-Menu__Return").removeClass("menu-active");
  $("#Cavern-Menu__Send").addClass("menu-active");
});





$(townLabel).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Town-Menu__Send").addClass("menu-active");
});

$(jewelerLabel).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Jeweler-Menu__Send").addClass("menu-active");
});

$(blacksmithLabel).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Blacksmith-Menu__Send").addClass("menu-active");
});

$(alchemistLabel).click(function () {
  $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Alchemist-Menu__Send").addClass("menu-active");
});


//inventory

$(squiresInventory).click(function () {
  $(site).removeClass("no-fog no-menus");
  $("#Inventory-Squires").addClass("menu-active");
});

$(closesquiresInventory).click(function () {
  $("#Inventory-Squires").removeClass("menu-active");
   $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});

$(ringInventory).click(function () {
  $(site).removeClass("no-fog no-menus");
   $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Inventory-Ring").addClass("menu-active");
});

$(closeringInventory).click(function () {
  $("#Inventory-Ring").removeClass("menu-active");
   $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});

$(potionInventory).click(function () {
  $(site).removeClass("no-fog no-menus");
   $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Inventory-Potion").addClass("menu-active");
});

$(closepotionInventory).click(function () {
     $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});

$(trinketInventory).click(function () {
     $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Inventory-Trinket").addClass("menu-active");
});

$(closetrinketInventory).click(function () {
     $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});

$(gearInventory).click(function () {
     $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Inventory-Gear").addClass("menu-active");
});

$(closegearInventory).click(function () {
     $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});

$(fiefInventory).click(function () {
     $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $(site).removeClass("no-fog no-menus");
  $("#Inventory-Fief").addClass("menu-active");
});

$(closefiefInventory).click(function () {
     $("#Inventory-Fief").removeClass("menu-active");
  $("#Inventory-Gear").removeClass("menu-active");
  $("#Inventory-Trinket").removeClass("menu-active");
  $("#Inventory-Potion").removeClass("menu-active");
  $("#Inventory-Ring").removeClass("menu-active");
 $("#Inventory-Squires").removeClass("menu-active");
  $("#Inventory-Fief").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});



//closing buttons
$(closeMountainSend).click(function () {
  $("#Mountain-Menu__Send").removeClass("menu-active");
  $("#Mountain-Menu__Return").removeClass("menu-active");
});
$(closeMountainReturn).click(function () {
  $("#Mountain-Menu__Send").removeClass("menu-active");
  $("#Mountain-Menu__Return").removeClass("menu-active");
});

$(closeTempleSend).click(function () {
  $("#Temple-Menu__Send").removeClass("menu-active");
  $("#Temple-Menu__Return").removeClass("menu-active");
});
$(closeTempleReturn).click(function () {
  $("#Temple-Menu__Send").removeClass("menu-active");
  $("#Temple-Menu__Return").removeClass("menu-active");
});

$(closeForestSend).click(function () {
  $("#Forest-Menu__Send").removeClass("menu-active");
  $("#Forest-Menu__Return").removeClass("menu-active");
});
$(closeForestReturn).click(function () {
  $("#Forest-Menu__Send").removeClass("menu-active");
  $("#Forest-Menu__Return").removeClass("menu-active");
});

$(closeCavernSend).click(function () {
  $("#Cavern-Menu__Send").removeClass("menu-active");
  $("#Cavern-Menu__Return").removeClass("menu-active");
});
$(closeCavernReturn).click(function () {
  $("#Cavern-Menu__Send").removeClass("menu-active");
  $("#Cavern-Menu__Return").removeClass("menu-active");
});

$(closeTown).click(function () {
  $("#Town-Menu__Send").removeClass("menu-active");
});
$(closeJeweler).click(function () {
  $("#Jeweler-Menu__Send").removeClass("menu-active");
});
$(closeBlacksmith).click(function () {
  $("#Blacksmith-Menu__Send").removeClass("menu-active");
});
$(closeAlchemist).click(function () {
  $("#Alchemist-Menu__Send").removeClass("menu-active");
});


//Looting
$(closeForestQuestLoot).click(function () {
  $("#Forest-Menu__Loot").removeClass("menu-active");
 $("#Forest-Menu__Send").removeClass("menu-active");
  $("#Forest-Menu__Return").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});

$(closeTempleQuestLoot).click(function () {
  $("#Temple-Menu__Loot").removeClass("menu-active");
 $("#Temple-Menu__Send").removeClass("menu-active");
  $("#Temple-Menu__Return").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});

$(closeMountainQuestLoot).click(function () {
  $("#Mountain-Menu__Loot").removeClass("menu-active");
 $("#Mountain-Menu__Send").removeClass("menu-active");
  $("#Mountain-Menu__Return").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});

$(closeCavernQuestLoot).click(function () {
  $("#Cavern-Menu__Loot").removeClass("menu-active");
 $("#Cavern-Menu__Send").removeClass("menu-active");
  $("#Cavern-Menu__Return").removeClass("menu-active");
   $(site).addClass("no-fog no-menus");
});


$(inventoryItem).click(function () {
  $(this).toggleClass("active").siblings().removeClass("active");
});

gateBtn.addEventListener("mouseenter", () => {
  gate.classList.add("hovered");
});
gateBtn.addEventListener("mouseleave", () => {
  gate.classList.remove("hovered");
});
alchemistLabel.addEventListener("mouseenter", () => {
  alchemistBuilding.classList.add("active");
  worldMap.classList.add("iso");
});
alchemistLabel.addEventListener("mouseleave", () => {
  alchemistBuilding.classList.remove("active");
  worldMap.classList.remove("iso");
});
blacksmithLabel.addEventListener("mouseenter", () => {
  blacksmithBuilding.classList.add("active");
  worldMap.classList.add("iso");
});
blacksmithLabel.addEventListener("mouseleave", () => {
  blacksmithBuilding.classList.remove("active");
  worldMap.classList.remove("iso");
});
templeLabel.addEventListener("mouseenter", () => {
  templeBuilding.classList.add("active");
  worldMap.classList.add("iso");
});
templeLabel.addEventListener("mouseleave", () => {
  templeBuilding.classList.remove("active");
  worldMap.classList.remove("iso");
});
cavernLabel.addEventListener("mouseenter", () => {
  cavernBuilding.classList.add("active");
  worldMap.classList.add("iso");
});
cavernLabel.addEventListener("mouseleave", () => {
  cavernBuilding.classList.remove("active");
  worldMap.classList.remove("iso");
});
forestLabel.addEventListener("mouseenter", () => {
  forestBuilding.classList.add("active");
  worldMap.classList.add("iso");
});
forestLabel.addEventListener("mouseleave", () => {
  forestBuilding.classList.remove("active");
  worldMap.classList.remove("iso");
});
jewelerLabel.addEventListener("mouseenter", () => {
  jewelerBuilding.classList.add("active");
  worldMap.classList.add("iso");
});
jewelerLabel.addEventListener("mouseleave", () => {
  jewelerBuilding.classList.remove("active");
  worldMap.classList.remove("iso");
});
mountainLabel.addEventListener("mouseenter", () => {
  mountainBuilding.classList.add("active");
  worldMap.classList.add("iso");
});
mountainLabel.addEventListener("mouseleave", () => {
  mountainBuilding.classList.remove("active");
  worldMap.classList.remove("iso");
});
townLabel.addEventListener("mouseenter", () => {
  townBuilding.classList.add("active");
  worldMap.classList.add("iso");
});
townLabel.addEventListener("mouseleave", () => {
  townBuilding.classList.remove("active");
  worldMap.classList.remove("iso");
});


function enterGate() {
  gate.classList.add("entered");
  world.classList.add("discovered");
  site.classList.add("no-fog");
  checkApproveForest();
  setTimeout(function () {
    gateBtn.remove();
  }, 500);
  setTimeout(function () {
    gate.remove();
    inventoryMenu.classList.add("ready");
  }, 2000);
}

function toggleInventory() {
  inventoryMenu.classList.toggle("active");
}

inventoryHeader.onclick = toggleInventory;