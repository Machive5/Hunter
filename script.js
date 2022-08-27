const header = document.getElementsByTagName('header')[0];
const menu = document.querySelector('.btnWraper');
const cnsl = document.getElementById('console');
const left = document.getElementById('left');
const right = document.getElementById('right');
const shblock = right.querySelector('.shop').querySelectorAll('.block');
const equipment = left.querySelector('.equipment').querySelectorAll('.item');
const btnLeft = document.querySelector('.btnWraperL');
const btnRight = document.querySelector('.btnWraperR');
const toDungeonbtn = document.querySelector('.toDungeon');
const escapeBtn = document.querySelector('.escape');
const exploreBtn = document.querySelector('.explore');
const atkBtn = document.querySelector('.attack');
const runBtn = document.querySelector('.run');
const game = document.querySelector('.game');

//----------------------------------item data-------------------------------
const obj = [
    {
        "name": "Primary Sword",
        "desc": "Primary sword helps you defeat enemies more easily.",
        "atk": 50,
        "cls": "primarySword",
        "imgPth": "images/icon/primarySword.png",
        "type": "sword",
        "sellPrice": 5
    },
    {
        "name": "Iron Sword",
        "desc": "Iron sword helps you defeat enemies more easily. Increasing your attack by 100 points",
        "atk": 100,
        "cls": "ironSword",
        "imgPth": "images/icon/ironSword.png",
        "type": "sword",
        "sellPrice": 10
    },
    {
        "name": "Iron Helmet",
        "desc": "Iron helmet to protecting your head. Increasing your defense by 10 points.",
        "def": 10,
        "cls": "ironHelmet",
        "imgPth": "images/icon/ironHelmet.png",
        "type": "helmet",
        "sellPrice": 10
    },
    {
        "name": "Iron Chestplate",
        "desc": "Iron Chestplate to protecting your body. Increasing your defense by 50 points.",
        "def": 50,
        "cls": "ironChestplate",
        "imgPth": "images/icon/ironChestplate.png",
        "type": "chestplate",
        "sellPrice": 20
    },
    {
        "name": "Iron Gloves",
        "desc": "Iron gloves to protect your hand. Increasing your defense by 10 points",
        "def": 10,
        "cls": "ironGloves",
        "imgPth": "images/icon/ironGlove.png",
        "type": "gloves",
        "sellPrice": 5
    },
    {
        "name": "Iron Boots",
        "desc": "Iron boots to protect your feet. Increasing your defense by 10 points",
        "def": 10,
        "cls": "ironBoots",
        "imgPth": "images/icon/ironBoots.png",
        "type": "boots",
        "sellPrice": 5
    },
    {
        "name": "Healing Potion",
        "desc": "This potion can heals your HP by 100 points",
        "hpPlus": 100,
        "cls": "healtPotion",
        "imgPth": "images/icon/healPotion.png",
        "type": "heal",
        "sellPrice": 5
    },
    {
        "name": "Escape Potion",
        "desc": "This Potion can teleport you back in your house",
        "cls": "escapePotion",
        "imgPth": "images/icon/escapePotion.png",
        "type": "escape",
        "sellPrice": 5
    }
];

//----------------------------------player data-------------------------------
const player = {
    name: "player",
    atk: 100,
    def: 10,
    HP: 500,
    gold: 0,
    inventory: [],
    weapon: "Primary Weapon",
    head: "none",
    body: "none",
    gloves: "none",
    boots: "none"
};

const enemy = [
    {
        //percentage system is actualy choosing a random number between 1-10 
        'name':'bat eye',
        'image':'eye.png',
        'atk': 50,
        'def': 5,
        'HP' : 300,
        //percentage
        'attacking': 2, //this mean attacking will choose if the rand number is between 1 to 3
        'deffending': 4,
        'spelling':9
    },
    {
        'name':'goblin',
        'image':'goblin.png',
        'atk': 70,
        'def': 10,
        'HP' : 500,
        //percentage
        'attacking': 5,
        'deffending': 8,
        'spelling': 9
    },
    {
        'name':'mushroom',
        'image':'mushroom.png',
        'atk': 50,
        'def': 5,
        'HP' : 300,
        //percentage
        'attacking': 3,
        'deffending': 6,
        'spelling': 9
    },
    {
        'name':'skeleton',
        'image':'skeleton.png',
        'atk': 70,
        'def': 10,
        'HP' : 200,
        //percentage
        'attacking': 3,
        'deffending': 7,
        'spelling': 9
    }
]
//----------------------------------------decreasing element---------------------------------------
function decreaseElement(itm,elm,amount)
{
    let indx = player.inventory.findIndex(function(item){
        if (item[0] == itm.name)
        {
            return item;
        }
    });
    if(player.inventory[indx][1] - amount >= 0)
    {
        if (player.inventory[indx][1] - amount >= 1)
        {
            player.inventory[indx][1] -= amount;
            elm.getElementsByTagName('span')[0].innerHTML = player.inventory[indx][1] + "x";
        }
        else
        {   
            player.inventory.splice(indx,1);
            elm.remove();
        }
    }
    else{
        alert("You don't have enough item");
    }
}

//---------------------------use function----------------------------------

function use(itm,elm)
{
    const helmet = left.querySelector('.equipment').querySelector('.head');
    const chestplate = left.querySelector('.equipment').querySelector('.body');
    const gloves = left.querySelector('.equipment').querySelector('.gloves');
    const boots = left.querySelector('.equipment').querySelector('.boots');
    const weapon = left.querySelector('.equipment').querySelector('.weapon');
    if (itm.type === "helmet")
    {
        unequip(helmet);
        helmet.setAttribute('src',itm.imgPth);
        player.head = itm.imgPth;
        decreaseElement(itm,elm,1);
    }
    if (itm.type === "chestplate")
    {
        unequip(chestplate);
        chestplate.setAttribute('src',itm.imgPth);
        player.body = itm.imgPth;
        decreaseElement(itm,elm,1);
    }
    if (itm.type === "gloves")
    {
        unequip(gloves);
        gloves.setAttribute('src',itm.imgPth);
        player.gloves = itm.imgPth;
        decreaseElement(itm,elm,1);
    }
    if (itm.type === "boots")
    {
        unequip(boots);
        boots.setAttribute('src',itm.imgPth);
        player.boots = itm.imgPth;
        decreaseElement(itm,elm,1);
    }
    if (itm.type === "sword")
    {
        unequip(weapon);
        weapon.setAttribute('src',itm.imgPth);
        player.weapon = itm.imgPth;
        decreaseElement(itm,elm,1);
    }
    if (itm.type === "heal")
    {
        console.log("healing");
        decreaseElement(itm,elm,1);
    }
    if (itm.type === "escape")
    {
        console.log("escaping");
        decreaseElement(itm,elm,1);
    }
}

function unequip(elm)
{
    let itm = obj.find(function(a){
        if(a.imgPth === elm.getAttribute("src")){
            return a;
        }
    });

    if(itm != undefined)
    {
        elm.setAttribute('src','images/icon/none.png');
        addItems(itm.name,1);
    }
    
}

//---------------function to adding item on player inventory data-------------------
function addItems(name, amount)
{
    if(amount == 0)
    {
        return;
    }
    let itm = player.inventory.findIndex(function(item){
        if (item[0] === name)
        {
            return item;
        }
    });
    let block;
    if (itm < 0)
    {
        player.inventory.push([name,amount]);
        createElementInventory(name,amount);
    }
    else{

        block = right.querySelector('.inventory').querySelectorAll('.block')[itm].getElementsByTagName('span')[0];
        player.inventory[itm][1] += amount;
        block.innerHTML = player.inventory[itm][1] + "x";
    }
}

//---------------------funtion to create element inventory---------------------
function createElementInventory(name,amount) {
    let itm = obj.find(function(item){
        if (item.name === name)
        {
            return item;
        }
    });

    const invent = right.querySelector('.inventory');
    const wrp1 = document.createElement('div');
    const wrp2 = document.createElement('div');
    const block = document.createElement('div');
    const img = document.createElement('img');
    const desc = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const btn3 = document.createElement('button');

    wrp1.setAttribute('class','wrp1');
    wrp2.setAttribute('class','wrp2');
    desc.setAttribute('class','desc');
    img.setAttribute('src', itm.imgPth);
    block.setAttribute('class', 'block '+ itm.cls);
    h3.innerHTML = itm.name;
    p.innerHTML = itm.desc;
    span.innerHTML = amount + 'x';
    btn1.innerHTML = 'use';
    btn2.innerHTML = 'sell';
    btn3.innerHTML = 'X';

    desc.appendChild(h3);
    desc.appendChild(p);
    wrp1.appendChild(img);
    wrp1.appendChild(desc);
    wrp1.appendChild(span);
    wrp2.appendChild(btn1);
    wrp2.appendChild(btn2);
    wrp2.appendChild(btn3);
    block.appendChild(wrp1);
    block.appendChild(wrp2);

    //-------------adding sell and use system on each item in inventory---------------
    block.addEventListener('click',function(a){
        block.querySelector('.wrp2').style.display = 'flex';
        if (a.target.innerHTML === 'sell')
        {
            let x;
            while(true)
            {
                x = prompt("how much you wanna sell?");
                
                if(x == null)
                {
                    x = 0;
                    alert('transaction cancelled');
                    break;
                }
                else
                {
                    x = parseInt(x);
                    if (!isNaN(x))
                    {
                        break;
                    }
                    else
                    {
                        window.alert("please write number only!");
                    }
                }
            }

            decreaseElement(itm,block,x);
            player.gold += x * itm.sellPrice;
        }
        else if(a.target.innerHTML === 'use')
        {
            use(itm,block);
        }
        else if(a.target.innerHTML === 'X'){
            block.querySelector('.wrp2').style.display = 'none';
        }
    });
    
    invent.appendChild(block);
}

//----------------adding eventlister on menu button----------------------

menu.addEventListener('click',function(a){
    function clear()
    {
        const btn = document.querySelector('.btnWraper').querySelectorAll('.btn');
        for (let i=0; i<btn.length; i++)
        {
            btn[i].style.backgroundColor = "black";
        }    
    }
    if(a.target.classList[0] === 'nav'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "NAVIGATION";
        a.target.parentElement.style.backgroundColor = "white";
        right.style.display = 'none';
        cnsl.style.display = 'none';
        left.style.display = 'block';
        left.getElementsByTagName('nav')[0].style.display = 'block';
        left.querySelector('.equipment').style.display = 'none';
    }
    else if(a.target.classList[0] === 'equipment'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "EQUIPMENT";
        a.target.parentElement.style.backgroundColor = "white";
        right.style.display = 'none';
        cnsl.style.display = 'none';
        left.style.display = 'block';
        left.getElementsByTagName('nav')[0].style.display = 'none';
        left.querySelector('.equipment').style.display = 'flex';
    }
    else if(a.target.classList[0] === 'console'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "CONSOLE";
        a.target.parentElement.style.backgroundColor = "white";
        right.style.display = 'none';
        cnsl.style.display = 'block';
        left.style.display = 'none';
    }
    else if(a.target.classList[0] === 'shop'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "SHOP";
        a.target.parentElement.style.backgroundColor = "white";
        right.style.display = 'block';
        cnsl.style.display = 'none';
        left.style.display = 'none';
        right.querySelector('.shop').style.display = 'flex';
        right.querySelector('.inventory').style.display = 'none';
    }
    else if(a.target.classList[0] === 'inventory'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "INVENTORY";
        a.target.parentElement.style.backgroundColor = "white";
        right.style.display = 'block';
        cnsl.style.display = 'none';
        left.style.display = 'none';
        right.querySelector('.shop').style.display = 'none';
        right.querySelector('.inventory').style.display = 'flex';
    }
});

btnLeft.addEventListener('click',function(a){
    function clear()
    {
        const btn = document.querySelector('.btnWraperL').querySelectorAll('.btn');
        for (let i=0; i<btn.length; i++)
        {
            btn[i].style.backgroundColor = "black";
        }    
    }
    if(a.target.classList[0] === 'nav'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "NAVIGATION";
        a.target.parentElement.style.backgroundColor = "white";
        left.getElementsByTagName('nav')[0].style.display = 'block';
        left.querySelector('.equipment').style.display = 'none';
    }
    if(a.target.classList[0] === 'equipment'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "EQUIPMENT";
        a.target.parentElement.style.backgroundColor = "white";
        left.querySelector('.equipment').style.display = 'flex';
        left.getElementsByTagName('nav')[0].style.display = 'none';
    }
});

btnRight.addEventListener('click',function(a){
    function clear()
    {
        const btn = document.querySelector('.btnWraperR').querySelectorAll('.btn');
        for (let i=0; i<btn.length; i++)
        {
            btn[i].style.backgroundColor = "black";
        }    
    }
    if(a.target.classList[0] === 'shop'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "SHOP";
        a.target.parentElement.style.backgroundColor = "white";
        right.querySelector('.shop').style.display = 'flex';
        right.querySelector('.inventory').style.display = 'none';
    }
    if(a.target.classList[0] === 'inventory'){
        clear();
        header.getElementsByTagName('h1')[0].innerHTML = "INVENTORY";
        a.target.parentElement.style.backgroundColor = "white";
        right.querySelector('.inventory').style.display = 'flex';
        right.querySelector('.shop').style.display = 'none';
    }
});

//-----------------adding eventlistener on each item on shop-----------------
shblock.forEach(function(a){
    a.addEventListener('click',function()
    {
        //------------------------shopping system-----------------------
        let amount;
        while(true)
        {
            amount = prompt("how much you wanna buy?");
            console.log(amount);
            
            if(amount == null)
            {
                amount = 0;
                alert('transaction cancelled');
                break;
            }
            else
            {
                amount = parseInt(amount);
                if (!isNaN(amount))
                {
                    break;
                }
                else
                {
                    window.alert("please write number only!");
                }
            }
        }

        let item = a.getElementsByTagName('h3')[0].innerHTML;
        addItems(item,amount);
    });
});

// ------------------adding eventlistener to equipment so you can unequip the item-------------------

equipment.forEach(function(elm) {
    elm.addEventListener('click',function() {
        if (elm.getAttribute("src") != "images/icon/none.png")
        {
            if(confirm("Unonequip this item?"))
            {
                unequip(elm);
            }
        }
    });
});

// ------------------------------- dungeon system -------------------------------


//to dungeon
toDungeonbtn.addEventListener('click', function(){
    game.querySelector('.display').setAttribute('src', 'images/background/dungeon.jpg');
    escapeBtn.parentElement.style.display = 'block'
    toDungeonbtn.parentElement.style.display = 'none';
    document.querySelector('.game').querySelectorAll('.shop').forEach(function(shp){
        shp.style.display = 'none';
        shp.parentElement.style.display = 'none';
        shp.parentElement.style.backgroundColor = 'black';
        right.querySelector('.shop').style.display = 'none';
    });
});

//escape option
escapeBtn.addEventListener('click', function() {
    game.querySelector('.display').setAttribute('src', 'images/background/house.jpg');
    toDungeonbtn.parentElement.style.display = 'flex';
    escapeBtn.parentElement.style.display = 'none';
    game.querySelector('.enemy').style.display = 'none';
    document.querySelector('.game').querySelectorAll('.shop').forEach(function(shp){
        shp.style.display = 'block';
        shp.parentElement.style.display = 'block';
    });
});


//explore
var enemyCode;
exploreBtn.addEventListener('click', function(){
    enemyCode = Math.floor(Math.random()*5);
    if ( 0 <= enemyCode && enemyCode < 4)
    {
        game.querySelector('.enemy').style.display = 'flex';
        cnsl.querySelector('.dungeon').getElementsByTagName('p')[2].innerHTML = 'the ' + enemy[enemyCode].name + ' is aproaching';
        game.querySelector('.enemy').querySelector('.monster').setAttribute('src', 'images/monster/' + enemy[enemyCode].image);
        escapeBtn.style.display = 'none';
        exploreBtn.style.display = 'none';
        atkBtn.style.display = 'block';
        runBtn.style.display = 'block';
    }
    else{
        game.querySelector('.enemy').style.display = 'none';
        cnsl.querySelector('.dungeon').getElementsByTagName('p')[2].innerHTML = 'you found nothing';
    }
});


//run option
var canEscape = Math.floor(Math.random()*5);
runBtn.addEventListener('click', function(){
    console.log(canEscape);
    if (canEscape < 2)
    {
        game.querySelector('.enemy').style.display = 'none';
        cnsl.querySelector('.dungeon').getElementsByTagName('p')[2].innerHTML = 'you run away from the battle';
        escapeBtn.style.display = 'block';
        exploreBtn.style.display = 'block';
        atkBtn.style.display = 'none';
        runBtn.style.display = 'none';
        canEscape = Math.floor(Math.random()*5);
    }
    else
    {
        cnsl.querySelector('.dungeon').getElementsByTagName('p')[2].innerHTML = 'the enemy wont let you escape';
    }
});

//atk option
atkBtn.addEventListener('click',function(){
    cnsl.querySelector('.dungeon').getElementsByTagName('p')[2].innerHTML = 'Battle begin';
    atkBtn.style.display = 'none';
    runBtn.style.display = 'none';
    cnsl.querySelector('.dungeon').querySelector('.healthBar').style.display = 'flex';
    cnsl.querySelector('.dungeon').querySelector('.RPS').style.display = 'flex';
});
//battle mechanic


function enemyMoveMechanics(){
    var rand = Math.floor(Math.random()*9);
    if (rand <= enemy[enemyCode].attacking)
    {
        return "attacking";
    }
    if (rand <= enemy[enemyCode].deffending && rand > enemy[enemyCode].attacking)
    {
        return "defending";
    }
    if (rand > enemy[enemyCode].deffending)
    {
        return "spelling";
    }
}

function judging(enemy,player){
    if (enemy == player)
    {
        console.log("draw");
    }
    else if (enemy == "attacking" && player == "defending")
    {
        console.log("player win");
    }
    else if (enemy == "defending" && player == "spelling")
    {
        console.log("player win");
    }
    else if (enemy == "spelling" && player == "attacking")
    {
        console.log("player win");
    }
    else if (player == "attacking" && enemy == "defending")
    {
        console.log("enemy win");
    }
    else if (player == "defending" && enemy == "spelling")
    {
        console.log("enemy win");
    }
    else if (player == "spelling" && enemy == "attacking")
    {
        console.log("enemy win");
    }
}

cnsl.querySelector('.dungeon').querySelector('.RPS').querySelector('.attacking').addEventListener('click',function(){
    judging(enemyMoveMechanics(),"attacking");
});
cnsl.querySelector('.dungeon').querySelector('.RPS').querySelector('.defending').addEventListener('click',function(){
    judging(enemyMoveMechanics(),"defending");
});
cnsl.querySelector('.dungeon').querySelector('.RPS').querySelector('.spelling').addEventListener('click',function(){
    judging(enemyMoveMechanics(),"spelling");
});



