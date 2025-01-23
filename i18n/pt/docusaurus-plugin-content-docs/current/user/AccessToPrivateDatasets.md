---
title: "Access to Private Datasets"
---
# Acesso a Dados Privados emERDDAP™

MuitosERDDAP™instalações não têm autenticação ativada e, portanto, não fornecem nenhuma maneira para os usuários para login, nem eles têm quaisquer conjuntos de dados privados.

AlgunsERDDAP™instalações têm autenticação ativada. Atualmente,ERDDAP™somente suporta autenticação através de contas de e-mail gerenciadas pelo Google, que inclui contas de e-mail emNOAAe muitas universidades. Se umERDDAP™tem autenticação ativada, qualquer pessoa com uma conta de e-mail gerenciada pelo Google pode fazer login, mas só terá acesso aos conjuntos de dados privados queERDDAP™O administrador autorizou explicitamente o acesso.

## Instruções atualizadas{#updated-instructions} 

Algumas das informações abaixo estão desatualizadas. Até que isso seja atualizado, você pode usar[este blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)para etapas recentes sobre como obter dados de um conjunto de dados privado com scripts.

## Humanos com navegadores{#humans-with-browsers} 

Usuários humanos deERDDAP™pode fazer loginERDDAP™em um navegador para obter acesso a conjuntos de dados privados que eles estão autorizados a acessar.

Para fazer login:

1. Clique no link de log no canto superior esquerdo de qualquerERDDAP™página web.
Se não houver registro no link, oERDDAP™instalação não tem autenticação ativada e não há conjuntos de dados privados.
     
2. Clique no botão Iniciar sessão para entrar na sua conta do Google.
O texto do botão deve mudar para "Alinhado".
     
3. Clique no loginERDDAPBotão.
A página web deve mudar para dizer Você está conectado como *Tu és Endereço de email* .
Se não o fizer, aguarde 5 segundos e clique no Log inERDDAPbotão outra vez.
Em casos extremos, você pode ter que esperar e depois tentar novamente algumas vezes.
     
4. Não use o botão Voltar do seu navegador. Use o "ERDDAP" link no topo do acima, em seguida, use outros links para ir paraERDDAP™páginas em que você está interessado. Se uma página web em cache diz que você não está conectado, recarregue a página.
     

## Scripts{#scripts} 

\\[Isso é ligeiramente modificado a partir de informações fornecidas por Lynn DeWitt, que fez o trabalho difícil de descobrir isso. Lynn, muito obrigado&#33;
Se você tiver correções ou sugestões, por favor envie um erd.data @ noaa.gov .\\]

Também é possível fazer loginERDDAP™e acessar conjuntos de dados privados através de um script. Aqui está um exemplo que usacurl:

1. Essas instruções assumem que você está usando um endereço de gmail onde a autenticação de 2 fatores não está ativada. Se o seu endereço de gmail principal tiver autenticação de 2 fatores ativados, considere criar outro endereço de gmail com autenticação de 2 fatores desligado.
     
2. Entrar paraERDDAP™manualmente com o endereço de gmail que você deseja usar em seu script e aceitar quaisquer permissões necessárias, em seguida, faça o login completamente.
     
3. Abra o navegador Developer Tools e vá para a guia Rede.
     
4. Clique no botãoERDDAP™"log in" link, então o "Sign in" botão e escolher o endereço de e-mail apropriado, se solicitado.
     
5. Depois que o botão "Sign in" muda para "Signed in", a aba Developer Tools Network mostrará duas entradas que se parecem com as seguintes (exemplo do Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Use o menu de contexto do mouse com o botão direito do mouse para "copy as cURL" ambas as urls e cole-as em um editor de texto simples
     
6. Clique em "Log intoERDDAP" botão e "cópia como cURL" o link que parece:
```
    login.html  
```
e colar este terceirocurlcomando no arquivo de texto.
     
7. No arquivo de texto, você agora terá 3 linhas como o seguinte, onde você logou em umERDDAP™servidor em ' * https://host.somewhere.com/erddap * '. O primeirocurlO comando obtém seu perfil de usuário em "login\\_hint" e gera um "id\\_token". O segundo usa o id\\_token para logar no Google, e o terceiro logon paraERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. As 3 linhas acima, quando executar sequencialmente de uma linha de comando, irá logá-lo emERDDAP. Para usá-los em um script você precisa capturar o id\\_token da primeira linha, alimentá-lo para a segunda linha e escrever um cookie para ser lido por linhas subseqüentes.
     
9. Para desenvolver um script, execute o primeiro (' https://accounts.google.com )  curllinha exatamente como foi copiado das ferramentas do desenvolvedor e capturar a resposta (você pode obter umcurlerro sobre a bandeira "--2.0" basta removê-lo) . Em php parece o seguinte:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Faça login no Google executando a segunda linha usando $id\\_token, primeiro removendo o parâmetro "-H 'Cookie: stuff'" e, em vez disso, contandocurlpara escrever um cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Entrar paraERDDAP™, novamente removendo o parâmetro "-H 'Cookie: stuff'" e usando o cookie previamente escrito:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Agora você deve ser capaz de solicitar dados do servidor, usando o mesmo cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
