---
sidebar_position: 3
---
# ERDDAP™ Release Process
* Make sure image comparison files are available (this might mean running `mvn verify`, if you want to speed that up restrict to just the ImageComparison group though note that still requires running Jetty tests)
* Update dependencies
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Update plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Run tests to make sure dependency updates didn’t break anything for all major configurations (datasets parsing in particular, though any other significant settings as well). Note that the external test suite can be very flaky. The slowAWS test suite can take a very long time.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Use TranslateMessages.translate() to update translations if needed
* EDStatic.java set developmentMode to false, change the version number and specify the release date.
* Do the build
```
mvn clean
mvn compile
mvn package
```
## Canary
Send the war file for distribution on the Coastwatch server or some other server that uses most of the dataset types and receives a lot of traffic.
We want to try to find errors before wider distribution of the build.

Include message when telling about a new release.

The standard procedure is:
* Upload the .war file to coastwatch \[tomcat\]/content/erddap/
* As user=tomcat:
  * In \[tomcat\]/bin/ :
        ./shutdown.sh   //use "ps -fu tomcat" to ensure it has stopped
  * In \[tomcat\]/webapps/ :
        rm -rf erddap
        rm erddap.war
        cp ../content/erddap/erddap2.22.war erddap.war   //or whatever the number is
  * In \[tomcat\]/bin/ :
        ./startup.sh
  * After the ERDDAP has returned a web page, in \[tomcat\]/webapps/ :
        chgrp -R erddap erddap
        chmod -R g+rw erddap
        chmod -R o-rwx erddap

## GitHub Release
Draft the GitHub release, include erddap.war and erddapContent.zip (no version numbers)

title: The official v2.25 version
describe: See the changes list at
      https://erddap.github.io/changes#version-225

## Documentation Update
* Update the version number in the docusaurus.config.ts file (in the footer section).
* Edit the documentation pages (deploy-install.md and deploy-update.md).
  * Search for \[erddap.war\] 
  * Copy the existing information (slightly reformatted) to the list of previous installations 2.
  * Change the current release information for erddap.war at \[erddap.war\]
* Run the translations for the documentation site.
* Make a pull request and merge the changes.
* Deploy the documentation site (see readme).

## Ensure other repos are up to date as needed
Mainly this means ErddapContent and ErddapTest, but they should be kept up to date during development changes.

## Notify Users
First notify any users that requested changes (or whose bugs were fixed). Give them time to verify changes and/or raise issues.

ERDDAP version 2.25 is now available!

You can read about the changes at
https://erddap.github.io/changes#version-225

Some of the changes are changes that you suggested. Thank you very much for your suggestions. Search for your name in the list of changes to see the details. It would be great if you could try out the new features soon, before I announce this new version to a wider audience.

If you are an ERDDAP administrator, the instructions for upgrading are at
https://erddap.github.io/docs/server-admin/deploy-update

If you have any problems, questions, suggestions, please email me.

Thank you for using ERDDAP.

### Announce release
Send an announcement to the Announcements Mailing list.
