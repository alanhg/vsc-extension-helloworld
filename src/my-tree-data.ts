import * as vscode from 'vscode';
/**
 * 自定义webview
 */
export class MyTreeDataProvider implements vscode.WebviewViewProvider {
    _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;
    
    webviewView.webview.options = {
      // 在 webview 允许脚本
      enableScripts: true,
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    return `<!DOCTYPE html>
		<html lang="en">
		<head>

		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
.command-list{
  color:red;
}

</style>


                </head>
              <body>
              <div class="command-list" onclick=handleClick(event)>
                  <div>
                  say hello
                  </div>
                  <div>
                  say hi
                  </div>
                  </div>
              </body>
              <script>
                function handleClick(e){
                  e.target.innerText=Math.random();
                  fetch('/code-server/s/123',{
                    method:'POST',
                    headers:{
                      'content-type':'application/json'
                    },
                    body:JSON.stringify({type:'init'})
                  });

                    // 向宿主发送消息
                    window.parent.postMessage({type:'init',message:e.target.innerText});
                }
              </script>
	</html>`;
  }
}
