const vscode = require('vscode');
const { memoize } = require('./util');

function getSvgDecoration (svgUri, darkMode) {
    return vscode.window.createTextEditorDecorationType({
        color: "transparent",
        textDecoration: "none; display: inline-block; width: 0;",
        before: {
            contentIconPath: vscode.Uri.parse(svgUri),
            textDecoration: `none;${darkMode ? " filter: invert(1)" : ""}`,
        },
    });
}

const hideDecoration = vscode.window.createTextEditorDecorationType({
    color: "transparent",
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    textDecoration: "none; display: inline-block; width: 0;",
});

const transparentDecoration = vscode.window.createTextEditorDecorationType({
    color: "transparent",
});

const delDecoration = (state, decoration, currentLine) => {
    let decList = state.decorationRanges.get(decoration);
    // for (let i=0; i < decList.length; i++) {
    //     if (currentLine == decList[i].start.line) {
    //         decList.splice(i, 1);
    //         break;
    //     }
    // }
    // let currentLineStr = currentLine.toString();
    if (currentLine >= state.decorationTypeLineDecoration[decoration].length || state.decorationTypeLineDecoration[decoration][currentLine] == null) {
        return 0;
    }
    // console.log("iter ", state.decorationTypeLineDecoration[decoration][currentLine])
    for (let line of state.decorationTypeLineDecoration[decoration][currentLine]) {
        // if (currentLineStr.indexOf(" ") != -1) {
            // console.log ("has space in ", currentLineStr);
        // }
        let index = decList.indexOf(line);
        if (index != -1) {
            decList.splice(index, 1);
        } else {
            // console.log("lineRange: ", line, typeof(line), "decList: ", decList);
            // why always cannot find the Range?
            // console.log("type: ", typeof(currentLineStr), "keys: ", typeof(Object.keys(state.decorationTypeLineDecoration[decoration])[0]))
            // console.log("val: ", currentLineStr, " not in ",  Object.keys(state.decorationTypeLineDecoration[decoration]));
        }
    }
}

const getUrlDecoration = memoize((isImage) => vscode.window.createTextEditorDecorationType({
    color: "transparent",
    textDecoration: "none; display: inline-block; width: 0;",
    before: {
        contentText: isImage ? "🌄" : " 🔗",
        fontWeight: "bold",
        color: "cyan",
    },
}));
module.exports = { hideDecoration, transparentDecoration, getUrlDecoration, getSvgDecoration, delDecoration };