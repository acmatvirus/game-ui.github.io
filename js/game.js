let game = document.getElementById("game").getContext('2d');
let charater = document.getElementById("charater").getContext('2d');
let boss = document.getElementById("boss").getContext('2d');
let keyTime = true;
let arrayMapTile = ['x'];
let arrayImgTiles = ['x', 'floor', 'wall', 'door'];
let matrixMap = ['x',
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 1, 2, 1, 1, 1, 1, 1, 1, 2,
    2, 1, 2, 1, 1, 1, 1, 1, 1, 2,
    2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
    2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
    2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
    2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
    2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
    2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
];
let matrixBoss = ['x',
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
let matrixCharater = [];
matrixCharater['Barbarian-down'] = ['Barbarian-1', 'Barbarian-0', 'Barbarian-2'];
matrixCharater['Barbarian-up'] = ['Barbarian-1', 'Barbarian-3', 'Barbarian-4'];
matrixCharater['Barbarian-go'] = ['Barbarian-1', 'Barbarian-5', 'Barbarian-6'];
matrixCharater['Barbarian-back'] = ['Barbarian-1', 'Barbarian-7', 'Barbarian-8'];


let tile = (Object);
tile.w = 40;
tile.h = 40;

let I = (Object);
I.username = getCookie('username');
I.class = getCookie('nameCha');
I.img = getCookie('imageCha');
I.wi = 1;
I.hi = 1;








const GAME = {
    createArrayTileMap: function () {
        for (let y = 0;
            (y * tile.h) <= 360; y++) {
            for (let x = 0;
                (x * tile.w) <= 360; x++) {
                arrayMapTile.push({
                    y: x * tile.w,
                    x: y * tile.h,
                    img: arrayImgTiles[matrixMap[x * 10 + y+1]]
                });
            }
        }
        return arrayMapTile;
    },
    drawImage: function (img2, x, y) {
        var img = new Image();
        img.addEventListener('load', function () {
            game.drawImage(img, x, y);
        });
        img.src = "http://game-ui.test/media/tiles/" + img2 + ".gif";
    },
    drawBossImage: function (img2, x, y) {
        var img = new Image();
        img.addEventListener('load', function () {
            boss.drawImage(img, x, y, 40, 40);
        });
        img.src = "http://game-ui.test/media/boss/" + img2 + ".png";
    },
    drawCharaterImage: function (img2, x, y, go=0) {
        var img = new Image();
        img.addEventListener('load', function () {
            charater.drawImage(img, x, y, 40, 40);
        });
        img.src = "http://game-ui.test/media/charater/" + matrixCharater[img2][go] + ".png";
    },
    createTileMap: function () {
        let arrayMapTile = GAME.createArrayTileMap();
        for (let index = 1; index < 101; index++) {
            GAME.drawImage(arrayMapTile[index].img, arrayMapTile[index].x, arrayMapTile[index].y);
        }

    },
    createTileBossMap: function () {
        let arrayMapTile = GAME.createArrayTileMap();
        for (let index = 1; index < 101; index++) {
            if(matrixBoss[index] > 0) {
                GAME.drawBossImage(matrixBoss[index]+"-1", arrayMapTile[index].y, arrayMapTile[index].x);
            }
        }

    },
    createCharaterMap: function () {
        GAME.drawCharaterImage(I.class+"-down", I.wi * tile.w, I.hi * tile.h);
    },
    animateCharaterMap: function (type, newx, newy) {
        if(type == 'down') {
            let uigo = 0;
            let cp_y = I.hi * tile.h;
            let cp_newy = newy * tile.h;
            let go = setInterval(function () {
                uigo++;
                cp_y = cp_y + 4;
                if(uigo == 3) uigo =1;
                if(cp_y < cp_newy) {
                    charater.clearRect(0, 0, 400, 400);
                    GAME.drawCharaterImage(I.class+"-"+type, I.wi * tile.w, cp_y, uigo);
                }else {
                    clearInterval(go);
                    I.hi++;
                    charater.clearRect(0, 0, 400, 400);
                    GAME.drawCharaterImage(I.class+"-"+type, I.wi * tile.w, cp_y, 0);
                }
            }, 50);
        };
        if(type == 'up') {
            let uigo = 0;
            let cp_y = I.hi * tile.h;
            let cp_newy = newy * tile.h;
            let go = setInterval(function () {
                uigo++;
                cp_y = cp_y - 4;
                if(uigo == 3) uigo =1;
                if(cp_y > cp_newy) {
                    charater.clearRect(0, 0, 400, 400);
                    GAME.drawCharaterImage(I.class+"-"+type, I.wi * tile.w, cp_y, uigo);
                }else {
                    clearInterval(go);
                    I.hi--;
                    charater.clearRect(0, 0, 400, 400);
                    GAME.drawCharaterImage(I.class+"-"+type, I.wi * tile.w, cp_y, 0);
                }
            }, 50);
        };
        if(type == 'go') {
            let uigo = 0;
            let cp_x = I.wi * tile.w;
            let cp_newx = newx * tile.w;
            let go = setInterval(function () {
                uigo++;
                cp_x = cp_x + 4;
                if(uigo == 3) uigo =1;
                if(cp_x < cp_newx) {
                    charater.clearRect(0, 0, 400, 400);
                    GAME.drawCharaterImage(I.class+"-"+type, cp_x, I.hi * tile.h, uigo);
                }else {
                    clearInterval(go);
                    I.wi++;
                    charater.clearRect(0, 0, 400, 400);
                    GAME.drawCharaterImage(I.class+"-"+type, cp_x, I.hi * tile.h, 0);
                }
            }, 50);
        };
        if(type == 'back') {
            let uigo = 0;
            let cp_x = I.wi * tile.w;
            let cp_newx = newx * tile.w;
            let go = setInterval(function () {
                uigo++;
                cp_x = cp_x - 4;
                if(uigo == 3) uigo =1;
                if(cp_x > cp_newx) {
                    charater.clearRect(0, 0, 400, 400);
                    GAME.drawCharaterImage(I.class+"-"+type, cp_x, I.hi * tile.h, uigo);
                }else {
                    clearInterval(go);
                    I.wi--;
                    charater.clearRect(0, 0, 400, 400);
                    GAME.drawCharaterImage(I.class+"-"+type, cp_x, I.hi * tile.h, 0);
                }
            }, 50);
        };
    },
    init: function () {
        GAME.createTileMap();
        GAME.createTileBossMap();
        GAME.createCharaterMap();
    }
};
const CHARATER = {
    move: function () {
        window.addEventListener("keydown", function (e) {
            if(keyTime == true) {
                if (e.keyCode == 39) {
                    if (matrixMap[I.hi * 10 + I.wi+2] == 1 && matrixBoss[I.hi * 10 + I.wi+2] == 0) {
                        charater.clearRect(0, 0, 400, 400);
                        GAME.animateCharaterMap('go', I.wi+1, I.hi);
                    }else if(matrixBoss[I.hi * 10 + I.wi+2] > 0) {
                        CHARATER.attack(I.hi * 10 + I.wi+2);
                    };
                };
                if (e.keyCode == 37) {
                    if (matrixMap[I.hi * 10 + I.wi] == 1 && matrixBoss[I.hi * 10 + I.wi] == 0) {
                        charater.clearRect(0, 0, 400, 400);
                        GAME.animateCharaterMap('back', I.wi-1, I.hi);
                    }else if(matrixBoss[I.hi * 10 + I.wi] > 0) {
                        CHARATER.attack(I.hi * 10 + I.wi);
                    };
                };
                if (e.keyCode == 40) {
                    if (matrixMap[(I.hi * 10 + I.wi+1)+10] == 1 && matrixBoss[(I.hi * 10 + I.wi+1)+10] == 0) {
                        charater.clearRect(0, 0, 400, 400);
                        GAME.animateCharaterMap('down', I.wi, I.hi+1);
                    }else if(matrixBoss[(I.hi * 10 + I.wi+1)+10] > 0) {
                        CHARATER.attack((I.hi * 10 + I.wi+1)+10);
                    };
                };
                if (e.keyCode == 38) {
                    if (matrixMap[(I.hi * 10 + I.wi+1)-10] == 1 && matrixBoss[(I.hi * 10 + I.wi+1)-10] == 0) {
                        charater.clearRect(0, 0, 400, 400);
                        GAME.animateCharaterMap('up', I.wi, I.hi-1);
                    }else if(matrixBoss[(I.hi * 10 + I.wi+1)-10] > 0) {
                        CHARATER.attack((I.hi * 10 + I.wi+1)-10);
                    };
                };
                keyTime = false;
                setTimeout(function () {
                    keyTime = true;
                  }, 600);
            }
        });
    },
    attack: function (bossId, bx, by) {
        infoBoss = matrixBoss[bossId];
        $(".attack").removeClass('d-none');
        $(".attack").addClass('animate animate-fade-in');
        console.log(bossId);
    },
    init: function () {
        CHARATER.move();
    }
};
$(document).ready(function () {
    GAME.init();
    CHARATER.init();
});