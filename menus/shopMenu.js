"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopSellMenu = exports.shopMenu = void 0;
var inquirer = require('inquirer');
var player_1 = require("../player");
var playMenu_1 = require("./playMenu");
var confirmMenu_1 = require("./confirmMenu");
var utils_1 = require("../helpers/utils");
var area_1 = require("../locations/area");
var logs_1 = require("../helpers/logs");
var shopMenu = function (player) {
    return inquirer
        .prompt([
        {
            type: 'list',
            message: 'Welcome to the Shop!\n',
            name: 'choice',
            choices: ['Buy', 'Sell', 'Help', 'Exit'],
        },
    ])
        .then(function (answers) {
        switch (answers.choice) {
            case 'Buy':
                utils_1.cls();
                shopBuyMenu(player);
                break;
            case 'Sell':
                exports.shopSellMenu(player);
                break;
            case 'Help':
                utils_1.cls();
                player_1.locationInfo(player);
                break;
            case 'Exit':
                utils_1.cls();
                player.location = area_1.Area.CITY;
                playMenu_1.playMenu(player);
                break;
        }
    });
};
exports.shopMenu = shopMenu;
var shopCatalog = utils_1.randomsFromArr(player_1.allItems, 5);
var _choices = shopCatalog.map(function (x) { return x.name; });
_choices.push('Back');
var shopBuyMenu = function (player) {
    return inquirer
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: "Please select the item to buy! You have " + player.coins + " coins.",
            choices: _choices,
        },
    ])
        .then(function (answers) {
        switch (answers.choice) {
            case 'Back':
                utils_1.cls();
                exports.shopMenu(player);
                break;
            case shopCatalog[0].name:
                utils_1.cls();
                if (player.coins >= shopCatalog[0].value) {
                    player.coins -= shopCatalog[0].value;
                    player.inventory.push(shopCatalog[0]);
                    logs_1.infoShopLog();
                    console.log("You successfully bought " + shopCatalog[0].name);
                    logs_1.infoLogEnd();
                }
                else {
                    console.log("You don't have enough money(" + player.coins + ")");
                }
                shopBuyMenu(player);
                break;
            case shopCatalog[1].name:
                utils_1.cls();
                if (player.coins >= shopCatalog[1].value) {
                    player.coins -= shopCatalog[1].value;
                    player.inventory.push(shopCatalog[1]);
                    logs_1.infoShopLog();
                    console.log("You successfully bought " + shopCatalog[1].name);
                    logs_1.infoLogEnd();
                }
                else {
                    console.log("You don't have enough money(" + player.coins + ")");
                }
                shopBuyMenu(player);
                break;
            case shopCatalog[2].name:
                utils_1.cls();
                if (player.coins >= shopCatalog[2].value) {
                    player.coins -= shopCatalog[2].value;
                    player.inventory.push(shopCatalog[2]);
                    logs_1.infoShopLog();
                    console.log("You successfully bought " + shopCatalog[2].name);
                    logs_1.infoLogEnd();
                }
                else {
                    console.log("You don't have enough money(" + player.coins + ")");
                }
                shopBuyMenu(player);
                break;
            case shopCatalog[3].name:
                utils_1.cls();
                if (player.coins >= shopCatalog[3].value) {
                    player.coins -= shopCatalog[3].value;
                    player.inventory.push(shopCatalog[3]);
                    logs_1.infoShopLog();
                    console.log("You successfully bought " + shopCatalog[3].name);
                    logs_1.infoLogEnd();
                }
                else {
                    console.log("You don't have enough money(" + player.coins + ")");
                }
                shopBuyMenu(player);
                break;
            case shopCatalog[4].name:
                utils_1.cls();
                if (player.coins >= shopCatalog[4].value) {
                    player.coins -= shopCatalog[4].value;
                    player.inventory.push(shopCatalog[4]);
                    logs_1.infoShopLog();
                    console.log("You successfully bought " + shopCatalog[4].name);
                    logs_1.infoLogEnd();
                }
                else {
                    console.log("You don't have enough money(" + player.coins + ")");
                }
                shopBuyMenu(player);
                break;
        }
    });
};
var shopSellMenu = function (player) {
    utils_1.cls();
    var _choices = [];
    for (var i = 0; i < player.inventory.length; i++) {
        _choices.push(player.inventory[i].name);
    }
    _choices.push('Back');
    return inquirer
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please select the item you want to sell!',
            choices: _choices,
        },
    ])
        .then(function (answers) { return __awaiter(void 0, void 0, void 0, function () {
        var i, _a, confirmation;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    i = _choices.indexOf(answers.choice);
                    _a = answers.choice;
                    switch (_a) {
                        case 'Back': return [3 /*break*/, 1];
                        case player.inventory[i].name: return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 1:
                    utils_1.cls();
                    exports.shopMenu(player);
                    return [3 /*break*/, 4];
                case 2:
                    utils_1.cls();
                    return [4 /*yield*/, confirmMenu_1.confirmMenu('sell this item')];
                case 3:
                    confirmation = _b.sent();
                    if (confirmation) {
                        player.coins += Math.ceil(player.inventory[i].value / 1.5);
                        player.inventory.splice(i, 1);
                        logs_1.infoLog();
                        console.log("You successfully sold your " + player.inventory[i].name + ".");
                        logs_1.infoLogEnd();
                        exports.shopSellMenu(player);
                    }
                    else {
                        logs_1.infoLog();
                        console.log('You canceled this action');
                        logs_1.infoLogEnd();
                        exports.shopSellMenu(player);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
exports.shopSellMenu = shopSellMenu;
