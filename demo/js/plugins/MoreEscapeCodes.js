//=============================================================================
// More Escape Codes
// by Shaz
// Last Update: 2015.10.07
//=============================================================================

/*:
 * @plugindesc Extends the number of escape codes in the Show Text command
 * @author Shaz
 *
 * @param Face ID Index
 * @desc Escape code for ID of actor and index for face graphic
 * @default f
 *
 * @help This plugin does not provide plugin commands.
 *
 * Hover the mouse over the text input box of the Show Text command to see
 * the default escape codes.  Do not use values that are already being used.
 *
 * ---Face Graphic---
 * if the Face ID Index value is 'f', use \f[1,2] in a Show Text command
 * to add the face at index 2 of Actor 1's face graphic.  Remember indexes
 * start at 0.  This escape code can be used multiple times within a
 * Show Text command to change expressions.
 *
 */

(function() {

  var parameters = PluginManager.parameters('MoreEscapeCodes');
  var reFace = String(parameters['Face ID Index'] || '');

  Window_Base.prototype.obtainMultiEscapeParams = function(textState) {
    var arr = /^\[(\d+,\d+)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[1].split(',');
    } else {
      return '';
    }
  };

  var _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case reFace.toUpperCase():
        this.changeFace(textState);
        break;
      default:
        _Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  Window_Message.prototype.changeFace = function(textState) {
    newFace = this.obtainMultiEscapeParams(textState);
    if (newFace) {
      $gameMessage.setFaceImage($gameActors.actor(newFace[0]).faceName(), newFace[1]);
      this.contents.clearRect(0, 0, Window_Base._faceWidth, Window_Base._faceHeight);
      this.loadMessageFace();
      this.drawMessageFace();
    }
  };

  var _Window_Message_newLineX = Window_Message.prototype.newLineX;
  Window_Message.prototype.newLineX = function() {
    var pattern = new RegExp('\\\\' + reFace + '\\[(\\d+,\\d+)\\]', 'i');
    if ($gameMessage.allText().match(pattern)) {
      return 168;
    } else {
      return _Window_Message_newLineX.call(this);
    }
  };
})();
