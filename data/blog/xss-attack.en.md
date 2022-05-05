---
title: XSS Attack
slug: xss-attack
date_published: 2021-05-19T00:55:05.000Z
date_updated: 2021-05-19T00:55:05.000Z
---

### XSS definition

XSS, namely (Cross Site Scripting), occurs at the browser level of the target user. When the process of rendering the DOM tree into JS code that is not executed as expected, it occurs. XSS attack. The main way for most XSS attacks is to embed a piece of JS code on a remote or third-party domain. In fact, this JS code is executed under the scope of the target website.

### Group by effect

First, XSS reflection attack, the malicious code is not stored in the target website, and the attack is carried out by luring users to click a malicious link to the target website.

If the reflection type is not stored in the database, it is often expressed as putting the attack code in the request parameter of the url address, and if it is defensive, the httpOnly attribute is set for the cookie; the user's input is checked and special characters are filtered.

Second, XSS storage attack, malicious code is stored in the server of the target website, this kind of attack has strong stability and persistence, the more common scenarios are on social networking sites such as blogs and forums, but the OA system, and It can also be seen on the CRM system. For example, there is an XSS storage vulnerability in the customer complaint function of a CRM system. The hacker submits malicious attack code. When the system administrator views the complaint information, the malicious code is executed and the customer's information is stolen. , but the administrator does not know, this is a typical XSS storage type attack.

### General idea of ​​XSS defense

The general idea of ​​XSS defense is to filter the input (and URL parameters) and encode the output. That is to filter all the submitted content, filter the parameters in the url, and filter out the relevant content that will cause the script to be executed; and then html code the content dynamically output to the page, so that the script cannot be executed in the browser. Although input filtering can be bypassed, it still blocks a large portion of XSS attacks.
