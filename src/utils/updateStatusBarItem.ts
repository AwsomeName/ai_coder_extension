import * as vscode from "vscode";
var statusbartimer: NodeJS.Timeout;

export async function updateStatusBarItem(
    myStatusBarItem: vscode.StatusBarItem,
    g_isLoading: boolean,
    isLoading: boolean,
    info: string
): Promise<void> {
    myStatusBarItem.show();
    if (statusbartimer) {
        clearTimeout(statusbartimer);
    }
    if (isLoading) {
        g_isLoading = true;
        myStatusBarItem.text = `$(loading~spin)` + info;
    } else {
        g_isLoading = false;
        myStatusBarItem.text = `$(aicoder-dark)` + info;
        statusbartimer = setTimeout(() => {
            myStatusBarItem.text = `$(aicoder-dark)`;
        }, 30000);
    }
}
