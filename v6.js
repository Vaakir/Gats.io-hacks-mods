// ==UserScript==
// @name         VaakirHackpack V 5.0
// @namespace    http://tampermonkey.net/
// @version      6
// @description  try to take over the world!
// @author       You
// @match        https://gats.io/
// @grant        none
// ==/UserScript==

class GUI {
    constructor(parent) {
        this.parent = parent;
        this.init();
    }
    init() {
        this.gui = GUI.createCustomElement('div', this.parent, '', '', '', 'myFUNNYGUY');
        this.guiHead = GUI.createCustomElement('div', this.gui, 'Vaakir Hack pack V4.0', '', 'headDiv', '');
            

        // Drag functionality on (gui head div)
        let offsetX, offsetY, isDragging = false, gui = this.gui;
        this.guiHead.addEventListener('mousedown', function(event) {
            isDragging = true;
            offsetX = event.clientX - gui.getBoundingClientRect().left;
            offsetY = event.clientY - gui.getBoundingClientRect().top;
        });
        document.addEventListener('mousemove', function(event) {
            if (isDragging) {
                const newLeft = event.clientX - offsetX;
                const newTop = event.clientY - offsetY;
                gui.style.left = newLeft + 'px';
                gui.style.top = newTop + 'px';
            }
        });
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        let styleSheet = document.createElement('style');
        let css = `
        .myFUNNYGUY {
            --name-width: 100px;
            --gui-width: 245px;
            --row-height: 30px;
            --elm-height: 20px;
            --inp-width: 80px;
            --bg-color: rgba(85, 85, 85, 0.5);

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
             -khtml-user-select: none; /* Konqueror HTML */
               -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
            
            background-color: var(--bg-color);
            position: fixed;
            top: 25vh;
            z-index: 9999;
            width: 245px;
            padding-bottom: 10px;

            font-size: var(--elm-height);
            font-weight: bold;
            font-family: Orbitron;
            color: white;
        }
        .myFUNNYGUY #headDiv {
            cursor: grab;
            text-align: center;
            height: var(--row-height);
        }
        .myFUNNNYGUY .myBox {
            width: var(--gui-width);
            padding: 0px;
            margin: 0;
        }
        .myFUNNYGUY .title {
            display: inline-block;
            cursor: pointer;
            transition: max-height 0.3s ease-in-out;
            width: 100%;
            max-height: 2em;
            border-bottom: 1px solid black;
        }

        .myFUNNYGUY .title:before {
            content: '▾';
            display: inline-block;
            transition: transform 0.3s ease-in-out;
        }
        .myFUNNYGUY .title.closed:before {
            content: '▸';
        }

        .myFUNNYGUY .row {
            display: flex;
            flex-direction: row;
            align-items: center;

            margin-left: 10px;
            height: var(--elm-height);
        }
        .myFUNNYGUY .label {
            width: var(--name-width);
            line-height: var(--elm-height);
            text-overflow: clip;
            text-align: left;

            margin-right: 10px;
            padding: 0;
            margin: 0;
            font-size: large;
        }
        .myFUNNYGUY .subOptionOpen {
            vertical-align: top;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
        }
        .myFUNNYGUY .subOptionClosed {
            vertical-align: top;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
        }

        .myFUNNYGUY input {
            margin-top: auto;
            margin-bottom: auto;
        }
        .myFUNNYGUY .select,
        .myFUNNYGUY .button,
        .myFUNNYGUY input {
            color: black;
        }

        .myFUNNYGUY input[type=checkbox] { margin: 0; outline: none; height: var(--elm-height); width: var(--elm-height);}
        .myFUNNYGUY input:hover { cursor: pointer;}
        .myFUNNYGUY input:focus { box-shadow: 0 0 10px #9ecaed;}
        .myFUNNYGUY input[type=radio] { border-top: auto; height: 20px;}
        .myFUNNYGUY input[type=color] { width: 50px;}
        .myFUNNYGUY .checked {
            height: var(--elm-height);
            width: var(--elm-height);
            box-shadow: -1px -2px 5px gray;
            border: 3px solid gray;
            background-color: green;
            margin-top: auto;
            margin-bottom: auto;
            box-shadow: 2 2 2px #a0a0a0;
        }
        .subOptionOpen .input,
        .subOptionOpen .inputText,
        .subOptionOpen .select {
            width: var(--inp-width);
            height: var(--elm-height);
        }
        .myFUNNYGUY .select {
            font-size: calc(var(--elm-height) * 0.75);
        }
        .myFUNNYGUY .colGreen {
            background-color: green;
        }
        .myFUNNYGUY .colRed {
            background-color: red;
        }
        .myFUNNYGUY .button {
            width: var(--elm-height);
            height: var(--elm-height);
            padding: 0;
            margin: 0;
            font-size: small;
        }

        `;
        styleSheet.innerText = css;
        document.head.appendChild(styleSheet);
    }
    addMainFolder(name, id = '', className = '') {
        return new Folder(this.gui, name, id, className);
    }
    static createCustomElement(HTMLTag, parent, innerTxt, type, id, className) {
        let htmlTag = document.createElement(HTMLTag);
        parent.appendChild(htmlTag);

        
        if (innerTxt && type != "select")   htmlTag.innerText   = innerTxt;
        if (type && type != "select")       htmlTag.type        = type;
        if (id)         htmlTag.id          = id;
        if (className)  htmlTag.className   = className;

        if (type == "number") {
            htmlTag.value = innerTxt;
        } else if (type == "select") {

            // innerTxt in this example is : ["a","b", ..]
            for (let o of innerTxt) {
                // console.log(o);
                GUI.createCustomElement("option", htmlTag, o, "", "", "option")
            }
        }

        return htmlTag;
    }
}

class Folder {
    constructor(parent, name, id, className, guiInstance) {
        this.parent = parent;
        this.name = name;
        this.id = id;
        this.className = className;
        this.gui = guiInstance;
        this.init();
    }
    init() {
        let _this = this;
        let container   = GUI.createCustomElement('div', this.parent, '', '', '', 'myBox');
        let button      = GUI.createCustomElement('div', container, this.name, '', this.id, this.className);
        let subOptions  = GUI.createCustomElement('div', container, '', '', '', 'subOptionOpen');
        this.subOptions = subOptions;

        button.onclick = function() {
            if      (subOptions.className === 'subOptionOpen')   { subOptions.className = 'subOptionClosed'; button.className = _this.className + ' closed'} 
            else if (subOptions.className === 'subOptionClosed') { subOptions.className = 'subOptionOpen'; button.className = _this.className + ' open'}
        }
        return subOptions;
    }
    addFolder(name, id = '', className = '', guiInstance) {
        return new Folder(this.subOptions, name, id, className, guiInstance);
    }
    add(options, name, type = "checkbox", val = 32) {
        // Each GUI row has a label and an input
        let row     = GUI.createCustomElement('div', this.subOptions, '', '', '', 'row');
        let label   = GUI.createCustomElement('label', row, name, '', '', 'label');
        let input; 
        if (type == "checkbox") {
            input   = GUI.createCustomElement('input', row, '', type, '', 'input');

            const updateCheckboxState = () => { input.checked = options[name]; };
            const updateOptionsState = () => { options[name] = input.checked; };
            updateCheckboxState();

            input.addEventListener('change', () => { updateOptionsState(); opts.saveOptions(); });
            options[name] = input.checked;

            // Watch for changes in the options object and update the checkbox accordingly
            Object.defineProperty(options, name, {
                set(value) {
                    input.checked = value;
                },
                get() {
                    return input.checked;
                },
            });
        }
        else if (type == "number") {
            input = GUI.createCustomElement('input', row, val, type, '', 'input');

            const updateCheckboxState = () => { input.value = options[name]; };
            const updateOptionsState = () => { options[name] = parseInt(input.value) || 32; };
            updateCheckboxState();

            input.addEventListener('change', () => {updateOptionsState(); opts.saveOptions();});
            options[name] = parseInt(input.value) || 32;

            // Watch for changes in the options object and update the checkbox accordingly
            Object.defineProperty(options, name, {
                set(value) {
                    input.value = value;
                },
                get() {
                    return parseInt(input.value) || 32;
                },
            });
        } else if (type == "select") {
            input = GUI.createCustomElement('select', row, val, type, '', 'select');

            const updateCheckboxState = () => { input.value = options[name]; };
            const updateOptionsState = () => { options[name] = input.value; };
            updateCheckboxState();

            input.addEventListener('change', () => { updateOptionsState(); opts.saveOptions();});
            options[name] = input.value;

            // Watch for changes in the options object and update the checkbox accordingly
            
            Object.defineProperty(options, name, {
                set(value) {
                    input.value = value;
                },
                get() {
                    return name=="allies" ? input : input.value;
                },
            });

            if (name == "allies") {
                let buttonAdd = GUI.createCustomElement('button', row, '+', '', '', 'button');
                let buttonRemove = GUI.createCustomElement('button', row, '-', '', '', 'button');
                buttonAdd.onclick = function() {
                    options.alliesList.push(input.value);
                }
                buttonRemove.onclick = function() {
                    options.alliesList = options.alliesList.filter(item => item !== input.value);
                }
            }

        } else if (type == "input") {
            input = GUI.createCustomElement('input', row, val, type, '', 'inputText');
            let buttonAdd = GUI.createCustomElement('button', row, '+', '', '', 'button');
            let buttonRemove = GUI.createCustomElement('button', row, '-', '', '', 'button');

            // input.onfocus = function() {
            //     if (typeof j46 !== 'undefined') {
            //         j46 = true; // disables movement in the game until other game input is recieved
            //     }
            // }
            // input.onblur = function() {
            //     if (typeof j46 !== 'undefined') {
            //         j46 = false; // disables movement in the game until other game input is recieved
            //     }
            // }
            buttonAdd.onclick = function() {
                options.alliesList.push(input.value);
            }
            buttonRemove.onclick = function() {
                options.alliesList = options.alliesList.filter(item => item !== input.value);
            }
        }
    }
}

const options = new class OptionsMenu {
    aimbot = {
        active: false,
        alwaysAim: false,
        calibrate: 30,
        sortFrequency: 10,
        autoShoot: true,
        espLine: true,
        espCollisions: true,
        allies: "",
        alliesList: ["[1337] PureVaakir","PureVaakir","Hacker0","VaakTradeBot"]
    }
    esp = {
        active: true,
        playerLine: false,
        shootRange: true,
        walls: false,
        showAllies: false
    }
    pathFinding = {
        active: false
    }
    autoUpgrade = {
        active: true,
        perk1: "longRange",
        perk2: "dash",
        perk3: "thickSkin"
    }
    misc = {
        zoom: true,
        antiSilencer: true,
        anitCamo: true,
        anitMines: true,
    }
    chatScroller = {
        active: false,
        message: "Vaakir hax",
    }
    options = {
        textWidth: 20
    }

    // these need only to be gathered every now and then, not for every animation frame #tick, therefore I am saving them here
    walls = [];

    constructor() {
        this.init();
    }
    init() {
        this.loadOptions();

        this.gui = new GUI(document.body);

        const hackpack = this.gui.addMainFolder('Hacks', '', 'title');
        const aimbot = hackpack.addFolder('Aimbot', '', 'title', this.gui);
        aimbot.add(this.aimbot, 'active');
        aimbot.add(this.aimbot, 'alwaysAim');
        aimbot.add(this.aimbot, 'calibrate', 'number', this.aimbot.calibrate);
        aimbot.add(this.aimbot, 'sortFrequency', 'number', this.aimbot.sortFrequency);
        aimbot.add(this.aimbot, 'allies', 'select','');
        aimbot.add(this.aimbot, 'autoShoot');
        aimbot.add(this.aimbot, 'espLine');
        aimbot.add(this.aimbot, 'espCollisions');

        const esp = hackpack.addFolder('Esp', '', 'title');
        esp.add(this.esp, 'active');
        esp.add(this.esp, 'playerLine');
        esp.add(this.esp, 'shootRange');
        esp.add(this.esp, 'showAllies');
        esp.add(this.esp, 'walls');

        const autoUpgrade = hackpack.addFolder('AutoUpgrade', '', 'title');
        autoUpgrade.add(this.autoUpgrade, 'active');
        autoUpgrade.add(this.autoUpgrade, 'perk1', 'select', "bipod optics thermal armorPiercing extended grip silencer lightweight longRange thickSkin".split(" "));
        autoUpgrade.add(this.autoUpgrade, 'perk2', 'select', "shield firstAid grenade knife engineer ghillie dash gasGrenade landMine fragGrenade".split(" "));
        autoUpgrade.add(this.autoUpgrade, 'perk3', 'select', "bipod optics thermal armorPiercing extended grip silencer lightweight longRange thickSkin".split(" "));

        const misc = hackpack.addFolder('Misc', '', 'title');
        misc.add(this.misc, 'zoom');
        misc.add(this.misc, 'antiSilencer');
        misc.add(this.misc, 'anitCamo');
        misc.add(this.misc, 'anitMines');

        const future = hackpack.addFolder('FutureUpdates', '', 'title');
        future.add(this.pathFinding, 'pathfinding');
        future.add(this.pathFinding, 'autoCalibrate');
        future.add(this.pathFinding, 'scrollingChat');
        future.add(this.pathFinding, 'multiboxing');
        future.add(this.pathFinding, 'knifebot');
        future.add(this.pathFinding, 'shieldbot');
        future.add(this.pathFinding, 'colormod');
        future.add(this.pathFinding, 'customstuff');

        // const pathFinding = hackpack.addFolder('Pathfinding', '', 'title');
        // pathFinding.add(this.pathFinding, 'comingSoonTM');

        // const chatScroller = hackpack.addFolder('ChatScroller', '', 'title');
        // chatScroller.add(this.chatScroller, 'comingSoon');
        // chatScroller.add(this.chatScroller, 'message', 'input','ok?');

        //const options = hackpack.addFolder('Options', '', 'title');
        // options.add(this.options, 'textWidth', 'number', this.options.textWidth);
    
    }
    loadOptions() {
        try {
            const savedOptions = JSON.parse(localStorage.getItem('options'));
            if (savedOptions) {
                Object.assign(this, savedOptions);
                this.aimbot.active = false;
            }
        } catch (error) {
            console.error('Error loading options from localStorage:', error);
        }
    }
    saveOptions() {
        try {
            let saveData = JSON.stringify(this);
            localStorage.setItem('options', saveData);
        } catch (error) {
            console.error('Error saving options to localStorage:', error);
        }
    }
}
window.opts = options;

class calc {
    static distance(coor1, coor2) {
        return Math.hypot(coor2.x - coor1.x, coor2.y - coor1.y);
    };
    static distanceSquared(coor1, coor2) {
        // I was told sqrt is slow okay
        return (coor2.x - coor1.x)**2 + (coor2.y - coor1.y)**2;
    };
    static entitiesDistance(entities, point) {
        entities.forEach(e => {
            e.distance = calc.distance(e, point)
        });
    }
    static sortByDistance(entities, point) {
        calc.entitiesDistance(entities, point);
        entities.sort((a, b) => a.distance - b.distance);
    };
    static sortByDistanceFaster(entities, point, maxDistance) {
        // I think it is faster, :eyes: laze, with e okay, just deal with it
        entities.forEach(e => {
            e.distanceSquared = calc.distanceSquared(e, point)
        });
        entities.sort((a, b) => a.distanceSquared - b.distanceSquared);    
        return entities;
    }
    static sortByDistanceFilter(entities, point, maxDistance) {
        const filteredEntities = entities.filter((entity) => {
            entity.distanceSquared = calc.distanceSquared(entity, point);
            return entity.distanceSquared <= maxDistance * maxDistance;
        });
        filteredEntities.sort((a, b) => a.distanceSquared - b.distanceSquared);
        return filteredEntities;
    }
    static collisionCoord(a,b) {

        // let a = {x:2,y:6,dx:3,dy:-4}; // let a = {x:2,y:6,dx:3,dy:-4};
        // let b = {x:0,y:-3,dx:2,dy:2}; // let b = {x:0,y:-3,dx:1,dy:1};

        if (b.dx ==0) { b.dx = 0.0001; }
        const s1 = (a.x-b.x)/b.dx;
        const s2 = a.dx/b.dx;
        const t = (a.y-b.y-b.dy*s1)/(-a.dy+b.dy*s2);
        const s = (a.x+a.dx*t-b.x)/b.dx;

        const x = a.x+a.dx*t;
        const y = a.y+a.dy*t;

        if (0 < s && s < 1 && 0 < t && t < 1) return {x: x, y: y};
        return false;
    }
}
class Draw {
    static line(ctx, start, end, color="black", lineWidth=1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);         
        ctx.stroke();
    }
    static triangle(ctx,x,y,size,color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x-size/2, y);
        ctx.lineTo(x, y-size);
        ctx.lineTo(x+size/2, y);
        ctx.closePath();
        ctx.fill();
    }
    static circle(ctx, x, y, radius, color="red", lineWidth=1) {
        ctx.fillStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class GameInterface {
    static get localPlayerId() {
        return +(window.c3 ?? '-1')
    }
  
    static get camera() {
        return window.c2
    }
  
    static get playerPool() {
        return window.RD?.pool || {}
    }
  
    static get grenadePool() {
        return window.RA?.pool || {}
    }
  
    static get wallPool() {
        return window.RB?.pool || {}
    }
  
    static get projectilePool() {
        return window.RC?.pool || {}
    }
  
    static get scaleX() {
        return window.j6
    }
  
    static get scaleY() {
        return window.j5
    }
  
    static get upgrades() {
        return window.o3
    }
}

class Game {
    constructor() {}
  
    get isIngame() {
        return GameInterface.localPlayerId > -1
    }
  
    get localPlayer() {
        return GameInterface.playerPool[GameInterface.localPlayerId]
    }
  
    get gunLength() {
        return {
            pistol: 60,
            smg: 60,
            shotgun: 80,
            assault: 80,
            'bolt-action-rifle': 100,
            'machine-gun': 85
        }[this.localPlayer?.class] || 0
    }

    get gunRange() {
        const hasLongRange = Object.values(GameInterface.upgrades).indexOf('longRange') > -1
        const range = {
            pistol: 400,
            smg: 280,
            shotgun: 235,
            assault: 370,
            'bolt-action-rifle': 620,
            'machine-gun': 365
        }[this.localPlayer?.class] || 0
        const rangeBonus = hasLongRange ? range * (window.fact ?? 0.5) : 0
        return range + rangeBonus
    }
  
    get gunOffset() {
        return {
            pistol: 10,
            smg: 10,
            shotgun: 12,
            assault: 12,
            'bolt-action-rifle': 16,
            'machine-gun': 14
        }[this.localPlayer?.class] || 0
    }
  
    getPlayers(includeMe=true, includeMates=true, includeEnemies=true) {
        if (!this.isIngame) return []
        const { id, teamCode } = this.localPlayer
    
        return Object.values(GameInterface.playerPool)
            .filter(player => {
                if (!player.activated) return false
                if (player.hp <= 0) return false
                if (!includeMe && player.id === id) return false
                if (!includeMates && ((player.teamCode !== 0 && player.teamCode === teamCode) || options.aimbot.alliesList.includes(player.username))) return false
                if (!includeEnemies && ((player.teamCode === 0 || player.teamCode !== teamCode) && !options.aimbot.alliesList.includes(player.username))) return false
                return true
            })
    }

    getEnemies() {
        return this.getPlayers(false, false, true)
    }

    getMates() {
        return this.getPlayers(false, true, false)
    }
  
    getGrenades() {
        return Object.values(GameInterface.grenadePool).filter(grenade => {
            if (!grenade.activated) return false
            return true
        })
    }

    getWalls() {
        return Object.values(GameInterface.wallPool)
            .filter(wall => {
                if (!wall.activated) return false
                return true
            })
            .map(wall => {
                const fixedWall = { ...wall }
                const size = wall.model[0][0][0][0]
                fixedWall.width = size * 2
                fixedWall.height = size * 2
        
                if (wall.type === 'longCrate') {
                    if (wall.angle / 90 % 2 === 0) fixedWall.width /= 2
                    else fixedWall.height /= 2
                }

                fixedWall.x1 = fixedWall.x - fixedWall.width / 2
                fixedWall.x2 = fixedWall.x + fixedWall.width / 2
                fixedWall.y1 = fixedWall.y - fixedWall.height / 2
                fixedWall.y2 = fixedWall.y + fixedWall.height / 2
        
                return fixedWall
            })
    }

    getProjectiles() {
        return Object.values(GameInterface.projectilePool).filter(projectile => {
            if (!projectile.activated) return false
            return true
        })
    }

    getScreenPos(pos) {
        return GameInterface.camera?.getRelPos(pos) || { x: 0, y: 0 }
    }

    resizeCamera(width, height) {
        if (!this.isIngame) return
        window.width = width;
        window.height = width / (16 / 9);
    
        window.a1({
            width: width,
            height: typeof height !== 'undefined' ? height : width / (16 / 9)
        });
    }

    /*setMouse(x, y) {
      if (!document.onmousemove) return
      const clientX = x * GameInterface.scaleX
      const clientY = y * GameInterface.scaleY
      document.onmousemove(new MouseEvent('mousemove', { clientX, clientY }))
    }*/
}
const game = new Game()
window.game = game

class Hack {
    #canvas = document.querySelector('canvas');
    #ctx = this.#canvas.getContext('2d');
    #aimbot = { active: false, target: null, x: 0, y: 0 }
    iter = 1;
    iterMax = 50;
    alliesWalls = [];
    anemies = [];

    constructor() {
        this.#initRender();
        this.#initAimbot();
        //this.#hookMouse()
    }

    /*fixConsole() {
        let _this = this
        setTimeout(() => {
            const iframe = document.createElement('iframe')
            iframe.style.display = 'block'
            document.body.appendChild(iframe)
            window.console = iframe.contentWindow.console
            _this.er = iframe
        })
    }*/

    #initRender() {
        this.#ctx.oclearRect = this.#ctx.oclearRect || this.#ctx.clearRect
        this.#ctx.clearRect = (...args) => {
            this.#ctx.oclearRect(...args)
            requestAnimationFrame(() => {
                if (game.isIngame) this.#tick()
            })
        }
    }

    #initAimbot() {
        const mouseMoveHook = evt => {
            if (!mouseMoveHook.original) return

            const clientX = (options.aimbot.active && this.#aimbot.active && this.#aimbot.target) ? this.#aimbot.x * GameInterface.scaleX : evt.clientX;
            const clientY = (options.aimbot.active && this.#aimbot.active && this.#aimbot.target) ? this.#aimbot.y * GameInterface.scaleY : evt.clientY;

            return mouseMoveHook.original(
              new MouseEvent('mousemove', {
                view: evt.view,
                bubbles: evt.bubbles,
                cancelable: evt.cancelable,
                clientX: clientX,
                clientY: clientY
              })
            );
        }

        mouseMoveHook.original = document.onmousemove;
        document.onmousemove = mouseMoveHook;

        Object.defineProperty(document, 'onmousemove', {
            set: val => {
                mouseMoveHook.original = val;
            }
        })

        let interval;
        window.onmousedown = ({ button, clientX, clientY }) => {
            if (button == 2) {
                options.aimbot.active = !options.aimbot.active;
                this.#aimbot.active = true;
                interval = setInterval(() => {

                    if (options.aimbot.active && this.#aimbot.active && game.localPlayer.hp > 0) {
                        if (this.#aimbot.target) {
                            if (this.#aimbot.target.activated && this.#aimbot.target.hp > 0) {
                                const clientX = this.#aimbot.x * GameInterface.scaleX;
                                const clientY = this.#aimbot.y * GameInterface.scaleY;
                                
                                if (options.aimbot.alwaysAim || this.#aimbot.target.visible) {
                                    mouseMoveHook.original(new MouseEvent('mousemove', { clientX, clientY }));
                                }
                                if (this.#aimbot.target.visible && options.aimbot.autoShoot) {
                                    document.onmousedown?.(new MouseEvent('mousedown', { clientX, clientY }));
                                }
                                setTimeout(() => document.onmouseup?.(new MouseEvent('mouseup', { clientX, clientY })), 15);
                            } 
                            else {
                                this.#aimbot.target = null;
                            }
                        }
                        
                    }
                }, 1);
            }
        }

        window.onmouseup = ({ button, clientX, clientY }) => {
            if (button === 2 && !options.aimbot.active) {
                clearInterval(interval)
                this.#aimbot.active = false;
                this.#aimbot.target = null;
                // options.aimbot.active = !options.aimbot.active;
                // options.aimbot.active = false;
            }
        }
    }

    #tick() {
        const me = game.localPlayer;
        const enemies = game.getEnemies();
        // this.enemies;

        const mates = game.getMates(); // mates :) best word usage
        // Remove enemies which are too close
        /*.filter(enemy => {
            if (enemy.x > me.x + 50) return true
            if (enemy.x < me.x - 50) return true
            if (enemy.y > me.y + 50) return true
            if (enemy.y < me.y - 50) return true
            return false
        })*/
        const myScreenPos = game.getScreenPos(me);
        const myAngle = me.playerAngle * (Math.PI / 180);
        let walls = options.walls; // game.getWalls();

        calc.sortByDistance(enemies, me);

        // Gun range helper
        if (options.esp.active && options.esp.shootRange) {
            const gunStart = {
                x: me.x + Math.cos(myAngle - Math.PI / game.gunOffset) * game.gunLength,
                y: me.y + Math.sin(myAngle - Math.PI / game.gunOffset) * game.gunLength
            }
            const gunEnd = {
                x: gunStart.x + Math.cos(myAngle) * game.gunRange,
                y: gunStart.y + Math.sin(myAngle) * game.gunRange
            }
            const gunStartScreenPos = game.getScreenPos(gunStart);
            const gunEndScreenPos = game.getScreenPos(gunEnd);

            const fakeEnemy = {fake: true, x: gunEnd.x, y: gunEnd.y, spdX: 0, spdY: 0, distance: game.gunRange}
            enemies.unshift(fakeEnemy);
            
            // Draw.line(this.#ctx, gunStartScreenPos, gunEndScreenPos, "black", 1);
        }
        
        // (alwaysAim)
        // used for aiming at the closest enemy, even at wall collisions
        // this gives a small time advantage, at the cost of no surprise
        let fallBack = {dist: Infinity, x: undefined, newX: undefined, y: undefined, newY: undefined, visible: false}
        let visibleEnemies = [];

        // we do not want to shoot our allies.. so we pretend that they are moving square walls :>
        if (options.aimbot.alliesList.length > 0) {
            walls = walls.filter(item => !this.alliesWalls.includes(item));

            this.alliesWalls = [];
            for (const a of mates) {
                const dist = calc.distance(a, me);
                const aX = a.x + a.spdX * dist / (window.fac ?? options.aimbot.calibrate);
                const aY = a.y + a.spdY * dist / (window.fac ?? options.aimbot.calibrate);

                const newWallMove = {
                    x1: aX - 40, x2: aX + 40,
                    y1: aY - 40, y2: aY + 40,
                    width: 80, height: 80
                }
                const newWallPos = {
                    x1: a.x - 25, x2: a.x + 25,
                    y1: a.y - 25, y2: a.y + 25,
                    width: 50, height: 50
                }
                walls.push(newWallMove);
                walls.push(newWallPos);
                this.alliesWalls.push(newWallMove);
                this.alliesWalls.push(newWallPos);
                
                // enemy block esp
                if (options.esp.active && options.esp.showAllies) {
                    const topLeft0 = game.getScreenPos({x: newWallMove.x1, y: newWallMove.y1});
                    const topLeft1 = game.getScreenPos({x: newWallPos.x1, y: newWallPos.y1});

                    this.#ctx.strokeStyle = 'red';
                    this.#ctx.lineWidth = 1;
                    this.#ctx.strokeRect(topLeft0.x, topLeft0.y, newWallMove.width, newWallMove.height);
                    this.#ctx.strokeRect(topLeft1.x, topLeft1.y, newWallPos.width, newWallPos.height);
                }
            }
        }
        
        // Wall esp
        if (options.esp.active && options.esp.walls) {
            for (const w of walls) {
                const topLeft = game.getScreenPos({x: w.x1, y: w.y1});
                const bottomRight = game.getScreenPos({x: w.x2, y: w.y2});
        
                this.#ctx.strokeStyle = 'red';
                this.#ctx.lineWidth = 1;
                this.#ctx.strokeRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            }
        }

        for (const enemy of enemies) {
            const enemyScreenPos = game.getScreenPos(enemy);
        
            const meX = me.x; // + me.spdX///2 // player speed doesn't matter, cus the game doesn't physics*
            const meY = me.y; // + me.spdY///2 // player speed doesn't matter, cus the game doesn't physics*
        
            const dist = enemy.distance - game.gunLength; // Math.hypot(enemy.x - meX, enemy.y - meY) - game.gunLength;
            
            if (dist < game.gunRange) {

                const endX = enemy.x + enemy.spdX * dist / (window.fac ?? options.aimbot.calibrate); // [calibrate] a fictional value, depends on bullet
                const endY = enemy.y + enemy.spdY * dist / (window.fac ?? options.aimbot.calibrate); // speed and player lag (latency), could've been auto calculated
            
                const angle = Math.atan2(meY - endY, meX - endX) + Math.PI; // 0 - 6
                const deltaX = Math.cos(angle - Math.PI / game.gunOffset);
                const deltaY = Math.sin(angle - Math.PI / game.gunOffset);
            
                const startX = meX + deltaX * game.gunLength;
                const startY = meY + deltaY * game.gunLength;
                const startScreenPos = game.getScreenPos({ x: startX, y: startY });
                const endScreenPos = game.getScreenPos({ x: endX, y: endY });
                
                let visible = true;

                // Visibility check + no need to calculate the line collisions for the other enemies
                if (visibleEnemies.length == 0) {

                    // We do not want to shoot at walls.. so we check if our hypothetical gun line crosses each corner of every wall (close by)
                    const gunLine = {x: startX, y: startY, dx: endX - startX, dy: endY - startY}
                    let i = 0;
                    while (visible && i < walls.length) {
                        const w = walls[i];
                        let wallTop = {x: w.x1, y: w.y1, dx: w.width, dy: 0}
                        let wallBot = {x: w.x1, y: w.y2, dx: w.width, dy: 0}
                        let wallLef = {x: w.x1, y: w.y1, dx: 0, dy: w.height}
                        let wallRig = {x: w.x2, y: w.y1, dx: 0, dy: w.height}

                        let col1 = calc.collisionCoord(gunLine, wallTop);
                        let col2 = calc.collisionCoord(gunLine, wallBot);
                        let col3 = calc.collisionCoord(gunLine, wallLef);
                        let col4 = calc.collisionCoord(gunLine, wallRig);
                        
                        if (col1 || col2 || col3 || col4) {
                            visible = false;

                            // Aimbot espCollisions
                            if (options.esp.active && options.aimbot.espCollisions) {
                                if (col1) { col1 = game.getScreenPos(col1); Draw.circle(this.#ctx, col1.x, col1.y, 5, "red"); }
                                if (col2) { col2 = game.getScreenPos(col2); Draw.circle(this.#ctx, col2.x, col2.y, 5, "red"); }
                                if (col3) { col3 = game.getScreenPos(col3); Draw.circle(this.#ctx, col3.x, col3.y, 5, "red"); }
                                if (col4) { col4 = game.getScreenPos(col4); Draw.circle(this.#ctx, col4.x, col4.y, 5, "red"); }
                            }
                        }
                        i++;
                    }
                }

                // ESP playerLine
                if (options.esp.active && options.esp.playerLine && !enemy.fake) {
                    Draw.line(this.#ctx, myScreenPos, enemyScreenPos, enemy.color.a, 2);
                }
            
                // Aim target logic
                if (this.#aimbot.active && !enemy.fake) {
                    enemy.newX = endScreenPos.x;
                    enemy.newY = endScreenPos.y;
                    enemy.visible = visible;

                    if (visible) {
                        visibleEnemies.push(enemy);
                    } else if (fallBack.dist > dist) {
                        fallBack = enemy;
                    }
                }
            
                // Aimbot espLine
                if (options.aimbot.espLine) {
                    Draw.line(this.#ctx, startScreenPos, endScreenPos, visible ? 'green' : "red", 2);
                }
            }

            // Anti silencer bullet
            if (options.misc.antiSilencer) {
                if (enemy.ghillie && !enemy.fake) {
                    enemy.ghillie = 0;
                    enemy.invincible = 1;
                }
            }

            // Anti camo
            if (options.misc.anitCamo && !enemy.fake) {
                enemy.silenced = 0;
            }
        }

        // Aim target logic
        if (visibleEnemies.length == 0) {
            if (options.aimbot.alwaysAim && enemies.length > 0 && fallBack.newX !== undefined) {
                this.#aimbot.target = fallBack;
                this.#aimbot.target.visible = fallBack.visible;
                this.#aimbot.x = fallBack.newX;
                this.#aimbot.y = fallBack.newY;
            } else {
                this.#aimbot.target = null;
            }
        } else {
            // enemies are already sorted, select the closest
            const enemy = visibleEnemies[0];
            this.#aimbot.target = enemy;
            this.#aimbot.target.visible = enemy.visible;
            this.#aimbot.x = enemy.newX;
            this.#aimbot.y = enemy.newY;
        }

        this.iter++;
        if ((this.iter % options.aimbot.sortFrequency) == 0) {
            this.#tickLessOften0();
        }
        if (this.iter > this.iterMax) {
            this.iter = 0;
            this.#tickLessOften();
        }
    }
    #tickLessOften0() {
        const me = game.localPlayer;
        const enemies = game.getEnemies();
        calc.sortByDistance(enemies, me);
        this.enemies = enemies;
    }
    #tickLessOften() {
        // Performance boost? not all things should be calculated upon request animationframe like I am currently doing
        // upgrades would include not !! "sorting by distance" , "aimbot wallcollision check" for every single tick, use memory, right?
        // I am honestly too lazy to check the time usage of this, intuition works alright, feel free to improve this.. or expand this
        
        const marginOfSafety = 1.2;
        const me = game.localPlayer;
        const walls = game.getWalls();
        calc.sortByDistanceFilter(walls, me, me.gunRange * marginOfSafety); 

        options.walls = walls;


        // zoom hack
        if (options.misc.zoom) {
            if (me.hp > 0) {
                if (window.width !== 2000) game.resizeCamera(2000);
            } else {
                if (window.width !== window.c2.width) game.resizeCamera(window.c2.width, window.c2.height);
            }
        } else if (window.width !== window.c2.width) {
            game.resizeCamera(window.c2.width, window.c2.height);
        }

        // shows landmines
        if (options.misc.anitMines) {
            landMine[0].forEach((a,i)=>{landMine[0][i][1][3]="#000000"})
        }

        // show silenced bullets
        // if (options.misc.antiSilencer) {
        //     // laze :eyes:
        //     Object.keys(RC.pool).forEach((a,i)=>{
        //         if(RC.pool[i].silenced){RC.pool[i].silenced=0}
        //     })
        // }

        // Auto upgrade logic
        if (options.autoUpgrade.active && me.hp > 0) {
            if (GameInterface.upgrades[1] == "" && me.score >= 100) {
                // deobfuscated packet code: return 'u,' + _0xab86d4.upgrade + ',' + _0xab86d4.upgradeLevel + '\x00';

                GameInterface.upgrades[1] = options.autoUpgrade.perk1;
                RF['list'][0]['send'](a59('upgrade', {'upgrade': options.autoUpgrade.perk1,'upgradeLevel': 1}));
            }
            if (GameInterface.upgrades[2] == "" && me.score >= 300) {
                GameInterface.upgrades[2] = options.autoUpgrade.perk2;
                RF['list'][0]['send'](a59('upgrade', {'upgrade': options.autoUpgrade.perk2,'upgradeLevel': 2}));
            }
            if (GameInterface.upgrades[3] == "" && me.score >= 600) {
                GameInterface.upgrades[3] = options.autoUpgrade.perk3;
                RF['list'][0]['send'](a59('upgrade', {'upgrade': options.autoUpgrade.perk3,'upgradeLevel': 3}));
            }
        }

        // Update allies list from those entities nearby in view.
        const currentName = options.aimbot.allies.value;
        options.aimbot.allies.innerHTML = `<option class="option">${currentName}</option>`;;

        for (const e of game.getMates()) {
            options.aimbot.allies.innerHTML += `<option class="option colGreen">${e.username}</option>`;
        }
        for (const e of game.getEnemies()) {
            options.aimbot.allies.innerHTML += `<option class="option colRed">${e.username}</option>`;
        }
        const VIP = ["[1337] PureVaakir","PureVaakir","Hacker0","VaakTradeBot"]; // do you really want to kill me with my own hacks? yikes
        const alliesList = options.aimbot.alliesList.filter(item => !VIP.includes(item));
        for (const e of alliesList) {
            options.aimbot.allies.innerHTML += `<option class="option colGreen">${e}</option>`;
        }
    }

}

window.hack = new Hack();
