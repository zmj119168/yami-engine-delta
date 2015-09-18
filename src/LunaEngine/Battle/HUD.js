/* globals LunaEngine: false */

(function() {
    var Config  = LunaEngine.Battle.Config.HUD,
        GUIConfig = LunaEngine.Battle.Config.GUISprites,
        GUIBase = LunaEngine.Battle.GUIBase;

    var HUD = function() {
        this.initialize.apply(this, arguments);
    };

    HUD.prototype = Object.create(Sprite.prototype);
    HUD.prototype.constructor = HUD;

    HUD.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);

        this._guiSpritesets = [];
        this.setupGUI();
    };

    HUD.prototype.setupGUI = function() {
        var battlers = $gameParty.battleMembers(),
            guiBase;

        for (var i = 0; i < battlers.length; i++) {
            guiBase = new GUIBase();

            guiBase.x = this._getGUIX(i);
            guiBase.y = this._getGUIY(i);

            guiBase.actor = battlers[i];
            guiBase.config = this._getGUIConfig();

            this._guiSpritesets.push(guiBase);
            this.addChild(guiBase);
        }
    };

    HUD.prototype.update = function() {
        Sprite.prototype.update.call(this);

        this.updateActors();
        this.updatePosition();
    };

    HUD.prototype.updateActors = function() {
        var battlers = $gameParty.battleMembers(),
            spriteset;

        for (var i = 0; i < this._guiSpritesets.length; i++) {
            spriteset = this._guiSpritesets[i];

            if (!battlers[i]) {
                this.removeChild(spriteset);
            }

            spriteset.actor = battlers[i];
        }
    };

    HUD.prototype.updateActors = function() {
        var spriteset;

        for (var i = 0; i < this._guiSpritesets.length; i++) {
            spriteset = this._guiSpritesets[i];

            spriteset.x = this._getGUIX(i);
            spriteset.y = this._getGUIY(i);
        }
    };

    HUD.prototype._getX = function() {
        return Config.x || 0;
    };

    HUD.prototype._getY = function() {
        return Config.y || 0;
    };

    HUD.prototype._getGUIX = function(index) {
        if (Config.direction === 'horizontal') {
            return Math.round(Config.width / Config.grid * index);
        }

        return 0;
    };

    HUD.prototype._getGUIY = function(index) {
        if (Config.direction === 'vertical') {
            return Math.round(Config.height / Config.grid * index);
        }

        return 0;
    };

    HUD.prototype._getGUIConfig = function() {
        return GUIConfig;
    };

    LunaEngine.Battle.HUD = HUD;
}());