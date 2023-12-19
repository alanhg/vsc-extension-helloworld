// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MyTreeDataProvider } from './my-tree-data';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');


	const sidebarPanel = new MyTreeDataProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("my-package-depedencies", sidebarPanel)
	)


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('postmessage.test', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.env.asExternalUri(vscode.Uri.parse(vscode.env.uriScheme + ':/')).then(res => {
			vscode.window.showInformationMessage(res.toString());
		});
		// fetch("https://1991421.cn").then(res=>res.text()).then(res=>{
		// 	vscode.window.showInformationMessage(res);
		// });
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
