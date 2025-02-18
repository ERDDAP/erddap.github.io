---
title: "Access to Private Datasets"
---
# Access to Private Datasets in ERDDAP™

Many ERDDAP™ installations don't have authentication enabled and thus don't provide any way for users to login, nor do they have any private datasets.

Some ERDDAP™ installations do have authentication enabled. Currently, ERDDAP™ only supports authentication via Google-managed email accounts, which includes email accounts at NOAA and many universities. If an ERDDAP™ has authentication enabled, anyone with a Google-managed email account can log in, but they will only have access to the private datasets that the ERDDAP™ administrator has explicitly authorized them to access.

## Updated instructions {#updated-instructions}

Some of the information below is out of date. Until this gets updated you can use [this blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) for recent steps on getting data from a private dataset with scripts.

## Humans With Browsers {#humans-with-browsers}

Human users of ERDDAP™ can log into ERDDAP™ in a browser in order to gain access to private datasets that they are authorized to access.

To log in:

1.  Click on the log in link in the upper left of any ERDDAP™ web page.  
    If there is no log in link, the ERDDAP™ installation doesn't have authentication enabled and there are no private datasets.  
     
2.  Click on the Sign in button to sign into your Google account.  
    The text of the button should change to "Signed in".  
     
3.  Click on the Log into ERDDAP button.  
    The web page should change to say You are logged in as *yourEmailAddress* .  
    If it doesn't, wait 5 seconds and click on the Log into ERDDAP button again.  
    In extreme cases, you may have to wait and then try again a few times.  
     
4.  Don't use your browser's Back button. Use the "ERDDAP" link at the top of the above, then use other links to go to ERDDAP™ pages you are interested in. If a cached web page says you aren't logged in, reload the page.  
     

## Scripts {#scripts}

\[This is slightly modified from information provided by Lynn DeWitt, who did the hard job of figuring this out. Lynn, thank you very much!  
If you have corrections or suggestions, please email erd.data @ noaa.gov .\]

It is also possible to log in to ERDDAP™ and access private datasets via a script. Here is an example which uses curl:

1.  These instructions assume you are using a gmail address where 2-factor authentication is not turned on. If your main gmail address has 2-factor authentication turned on, consider creating another gmail address with 2-factor authentication turned off.  
     
2.  Log in to ERDDAP™ manually with the gmail address you want use in your script and accept any permissions required, then log completely back out.  
     
3.  Open the browser Developer Tools, and go to the Network tab.  
     
4.  Click on the ERDDAP™ "log in" link, then the "Sign in" button and choose the appropriate email address if prompted.  
     
5.  After the "Sign in" button changes to "Signed in", the Developer Tools Network tab will show two entries that look like the following (example from Firefox):  
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
    Use the mouse right-click context menu to "copy as cURL" both of these urls and paste them into a plain text editor  
     
6.  Click on the "Log into ERDDAP" button and "copy as cURL" the link that looks like:  
```
    login.html  
```
    and paste this third curl command into the text file.  
     
7.  In the text file, you will now have 3 lines like the following, where you have logged into an ERDDAP™ server at '*https://host.somewhere.com/erddap*'. The first curl command gets your user profile in "login\_hint" and generates an "id\_token". The second uses the id\_token to log into Google, and the third then logs in to ERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\_type=token%20id\_token&scope=openid%20profile%20email&client\_id=ABCDEFG.apps.googleusercontent.com&login\_hint=XXXXXXXXXX&ss\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \*/\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \*/\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8.  The above 3 lines, when run sequentially from a command line, will log you into ERDDAP. In order to use these in a script you need to capture the id\_token from the first line, feed it to the second line, and write a cookie to be read by subsequent lines.  
     
9.  To develop a script, run the first ('https://accounts.google.com) curl line exactly as it was copied from the developer tools, and capture the response (you may get a curl error about the flag "--2.0" just remove it). In php it looks like the following:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\_type=token%20id\_token&scope=openid%20profile%20email&client\_id=ABCDEFG.apps.googleusercontent.com&login\_hint=XXXXXXXXXX&ss\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \*/\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\_decode($output\[0\],true); //the part you need is in "id\_token": $id\_token=$response\["id\_token"\];
```
    Log in to Google by executing the second line using $id\_token, first removing the "-H 'Cookie: stuff'" parameter and instead telling curl to write a cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \*/\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
    Log in to ERDDAP™, again removing the "-H 'Cookie: stuff'" parameter, and using the previously written cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
    You should now be able to request data from the server, using the same cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
