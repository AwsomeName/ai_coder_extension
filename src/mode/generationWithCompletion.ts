import * as vscode from "vscode";
import { apiKey, apiSecret } from "../localconfig";
import getDocumentLanguage from "../utils/getDocumentLanguage";
import { updateStatusBarItem } from "../utils/updateStatusBarItem";
import { getCodeCompletions } from "../utils/getCodeCompletions";


export async function generateWithCompletion(
    myStatusBarItem: vscode.StatusBarItem,
    g_isLoading: boolean,
    editor: vscode.TextEditor
) {
    var items: vscode.QuickPickItem[] = [];

    items.push({
        label: "continue generation",
        description: "continue generation line by line",
    });

    let prompt_input = "";
    let document = editor.document;
    let sel = editor.selections;
    for (var x = 0; x < sel.length; x++) {
        let txt: string = document.getText(
            new vscode.Range(sel[x].start, sel[x].end)
        );
        prompt_input += txt;
    }
    var selection = editor.selection;

    let prompt = prompt_input;
    let lang = "";
    let rs: any;
    try{
        console.log("about to request");
        lang = getDocumentLanguage(editor);
        updateStatusBarItem(myStatusBarItem, g_isLoading, true, "");
        rs = await getCodeCompletions(
            prompt,
            1,
            lang,
            apiKey,
            apiSecret,
            "completion"
        );
    } catch (err) {
        updateStatusBarItem(
            myStatusBarItem,
            g_isLoading,
            false,
            " API Failed"
        );

        return;
    }

    if (rs && rs.completions.length > 0) {
        editor.edit(function (edit: any) {
            let pos = selection.end;
            edit.insert(
                new vscode.Position(pos.line + 1, 0),
                `${rs.completions[0]}`
            );
        });
        updateStatusBarItem(myStatusBarItem, g_isLoading, false, " Done");
    } else {
        updateStatusBarItem(
            myStatusBarItem,
            g_isLoading,
            false,
            " No Suggestion"
        );
    }
}
