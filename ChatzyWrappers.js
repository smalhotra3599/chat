/*
    ---------------------
    Chatzy HTML Variables
    ---------------------
*/

var messageTable = "X2325";
var messageContainer = "X1506"
var popup = "X7376";
var messageTime = "X4177";
var messageButton = "X1602";
var PMTag = "X6200";
var textBox = "X5694";

/*
    -------------------
    Chatzy JS Variables
    -------------------
*/

var isCleared = "X1368"
var timeoutTimer = "X8987"

/*
    -----------------
    Wrapper Functions
    -----------------
*/

function elementByID(elementID) {
    return document.getElementById(elementID);
}

function elementsByClass(elementClass) {
    return document.getElementsByClassName(elementClass);
}

function leaveChat() {
    X2041("X2398");
}

function closePopup() {
    X3207();
}

function postMessage(message) {
    var HTMLTags = ["<b>", "</b>", "<i>", "</i>", "<s>", "</s>", "<u>", "</u>"];
    var ChatzyTags = ["[b]", "[/b]", "[i]", "[/i]", "[s]", "[/s]", "[u]", "[/u]"];
    for (var tag in HTMLTags) {
        message = message.replace(HTMLTags[tag],ChatzyTags[tag]);
    }
    X8532(message);
}

function closeChat() {
    postMessage("/close");
}

function openChat() {
    postMessage("/open");
}

function toggleChatLock() {
    if(X7759.X1874) { //Variable for whether the chat is locked, of course.
        postMessage("/open");
    } else {
        postMessage("/close");
    }
}

function searchMessages(term, poster) {
    postMessage("/find " + (poster?"{V:" + poster + "} ":"") + (term?term:""));
}

function privateMessage(name, message) {
    postMessage("/pm \"" + name + "\" " + message);
}

function globalMessage(message) { //Note, only sends the message to online users.
    var users = X8696.split("\n");
    for (var i = 1; i <= users[0]; i++) {
        user = users[i].split(" ");
        privateMessage(user[0], message);   //Replace the 0 with other numbers to grab different values. 2 is last leave/exit, 4 is status, 5 is location.
    }
}

function editRoomBoard(message, method, key) {  //Method is the style of editing to use. Options are: 0/default, overwrite. 1, append. 2, prepend. 3, replace.
    postMessage("/rb");
    setTimeout(function() {
        var BoardMessage = elementByID("X3755");
        switch (method) {
            case 1:
                BoardMessage.value = BoardMessage.value + "\n" + message;
                break;
            case 2:
                BoardMessage.value = message + "\n" + BoardMessage.value;
                break;
            case 3:
                if (BoardMessage.value.match(new RegExp(key, "g")).length > 1) {
                    BoardMessage.value = BoardMessage.value.replace(new RegExp(key + ".+?" + key, "g"), key + message + key);
                }
                break;
            default:
                BoardMessage.value = message;
        }
        X5999.onclick();
    }, 150);
}

//Requires Re-Init. Fix that?
function changeName(name) {
   X8234('X3489');

    setTimeout(function() {
        X7758.value = name;
        X6791.onsubmit();
    }, 1000);
}

function highlightTab(elIn, classIn, confusingBool) {
    var hasClass = new RegExp("\\b" + classIn + "\\b");
    if (!confusingBool != !elIn.className.match(hasClass)) { //This is just a XOR. Combined with the bellow if, it means that this is checking whether we are adding or removing a class, and if that is necessary.
        if (confusingBool) {
            elIn.className += (elIn.className ? " " : "") + classIn;
        } else {
            elIn.className = elIn.className.replace(hasClass, "").replace(/^\s/, "").replace(/\s$/, "");
        }
    }
}

function generateTab(picName, clickFunc, displayText, isChecked, isLocked) {
    return '<A href="#" onClick="' + clickFunc + 'return false;"' + (isLocked ? ' class="X6614"' : "") + '>' + (isChecked ? "<SPAN style='float:right;margin:0 4px 0 0;'>&nbsp;&#10003;</SPAN>" : "") + (picName ? '<IMG src="/elements/icon17/' + picName + '.png">' : "") + displayText + '</A>';
}