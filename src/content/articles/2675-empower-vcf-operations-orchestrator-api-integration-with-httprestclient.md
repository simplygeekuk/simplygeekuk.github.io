---
title: "Empower VCF Operations Orchestrator API integration with HttpRestClient"
description: "Use HttpRestClient for Orchestrator API integrations, with shared retry handling, request configuration and examples for supported HTTP methods."
path: "/empower-vcf-operations-orchestrator-api-integration-with-httprestclient/"
kind: "post"
published: "2025-06-24T15:15:26Z"
updated: "2026-09-18T16:22:40Z"
author: "SimplyGeek"
categories: ["JavaScript","Broadcom (VMware)","VMware Cloud Foundation","VCF Operations Orchestrator","Development"]
tags: ["VCF Operations Orchestrator"]
wordpressId: 2675
originalUrl: "https://simplygeek.co.uk/empower-vcf-operations-orchestrator-api-integration-with-httprestclient/"
thumbnail: "/wp-content/uploads/2025/06/miguel-angel-padrinan-alba-kZNeA-R48tE-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/06/miguel-angel-padrinan-alba-kZNeA-R48tE-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">The HTTP-REST plugin in VCF Operations Orchestrator represents API endpoints as RestHosts in the inventory. After defining a RestHost, you can authenticate and send HTTP requests such as GET and POST to its endpoint.</p>



<p class="wp-block-paragraph">HttpRestClient handles common request tasks, including content types, errors and retries.</p>



<p class="wp-block-paragraph"><strong>HttpRestClient</strong> provides these features:</p>



<ul class="wp-block-list">
<li>Supports GET, POST, PUT, PATCH, DELETE and HEAD.</li>



<li>Retries failed connections with a configurable delay. Defaults are 5 attempts and 10 seconds between attempts.</li>



<li>Accepts expected response codes, with defaults for each method.</li>



<li>Can retry on a 500 status code. This is enabled by default.</li>



<li>Handles <strong>application/x-www-form-urlencoded</strong> content automatically.</li>



<li>Accepts an Accept-Type header, which defaults to application/json.</li>



<li>Accepts a Content-Type header, which defaults to Accept-Type.</li>



<li>Encodes URIs and URI components automatically, detecting existing encoding.</li>



<li>Obfuscates secrets in logged content when they match password/secret/refreshToken.</li>
</ul>



<p class="wp-block-paragraph">HttpRestClient provides shared request handling between Orchestrator and API endpoints. It is designed to integrate with or extend any API service.</p>


<div class="wp-block-image">
<figure class="aligncenter size-full"><img decoding="async" src="/media/recovered/thecloudstop/HttpRestClient.jpg" alt="" class="wp-image-970" loading="lazy"></figure>
</div>


<p class="wp-block-paragraph"><strong>You can download my HttpRestClient module as a package <a href="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.httprestclient.package" data-type="link" data-id="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.httprestclient.package" target="_blank" rel="noopener noreferrer">here </a>or as native JS <a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/rest/HttpRestClient.js" data-type="link" data-id="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/rest/HttpRestClient.js" target="_blank" rel="noopener noreferrer">here</a>.</strong></p>



<h2 class="wp-block-heading">Use HttpRestClient</h2>



<p class="wp-block-paragraph">Import HttpRestClient into an action or workflow using one of these approaches:</p>



<p class="wp-block-paragraph">As a variable:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);</code></pre>



<p class="wp-block-paragraph">As an object property:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);</code></pre>



<p class="wp-block-paragraph">Alternatively, extend the class using classical inheritance:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>    var HttpRestClient = System.getModule(
        "com.simplygeek.rest"
    ).HttpRestClient();

    ApiService.prototype = Object.create(
        HttpRestClient.prototype
    );
    ApiService.prototype.constructor = ApiService;</code></pre>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>restHost</td><td>REST:RESTHost</td><td>The HTTP-REST RESTHost (either from the Inventory or transient)</td></tr><tr><td>retryMaxAttempts</td><td>Number</td><td>OPTIONAL – The max number of times to retry the connection (defaults to 5)</td></tr><tr><td>retryDelay</td><td>Number</td><td>OPTIONAL – The number of seconds between retries (defaults to 10)</td></tr><tr><td>retryOn500</td><td>Boolean</td><td>OPTIONAL – Whether to retry on a 500 status code (defaults to true)</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">The code creates an HttpRestClient instance in <strong>rest</strong>. Use this variable for API calls, or rename it if needed.</p>



<h2 class="wp-block-heading">Supported methods</h2>



<p class="wp-block-paragraph">Use one of the following methods to make an API call:</p>



<h3 class="wp-block-heading">GET</h3>



<p class="wp-block-paragraph">rest.<strong>httpGet</strong>(uri, acceptType, expectedResponseCodes, headers) → {*}</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>uri</td><td>String</td><td>The request uri</td></tr><tr><td>acceptType</td><td>String</td><td>OPTIONAL – The Accept-Type media type (defaults to application/json)</td></tr><tr><td>expectedResponseCodes</td><td>Array/Number</td><td>OPTIONAL – A list of expected response codes (defaults to [200, 201, 204])</td></tr><tr><td>headers</td><td>Array/String</td><td>OPTIONAL – A key/value set of headers to include in the request</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Returns the request response object.</p>



<h3 class="wp-block-heading">POST</h3>



<p class="wp-block-paragraph">rest.<strong>httpPost</strong>(uri, acceptType, content, contentType, expectedResponseCodes, headers) → {*}</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>uri</td><td>String</td><td>The request uri</td></tr><tr><td>acceptType</td><td>String</td><td>OPTIONAL – The Accept-Type media type (defaults to application/json)</td></tr><tr><td>content</td><td>Object</td><td>OPTIONAL – The request content (stringifies the payload when sent, defaults to {})</td></tr><tr><td>contentType</td><td>String</td><td>OPTIONAL – The Content-Type media type (defaults to application/json)</td></tr><tr><td>expectedResponseCodes</td><td>Array/Number</td><td>OPTIONAL – A list of expected response codes (defaults to [200, 201, 204])</td></tr><tr><td>headers</td><td>Array/String</td><td>OPTIONAL – A key/value set of headers to include in the request</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Returns the request response object.</p>



<h3 class="wp-block-heading">PUT</h3>



<p class="wp-block-paragraph">rest.<strong>httpPut</strong>(uri, acceptType, content, contentType, expectedResponseCodes, headers) → {*}</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>uri</td><td>String</td><td>The request uri</td></tr><tr><td>acceptType</td><td>String</td><td>OPTIONAL – The Accept-Type media type (defaults to application/json)</td></tr><tr><td>content</td><td>Object</td><td>The request content (stringifies the payload when sent)</td></tr><tr><td>contentType</td><td>String</td><td>OPTIONAL – The Content-Type media type (defaults to application/json)</td></tr><tr><td>expectedResponseCodes</td><td>Array/Number</td><td>OPTIONAL – A list of expected response codes (defaults to [200, 201, 204])</td></tr><tr><td>headers</td><td>Array/String</td><td>OPTIONAL – A key/value set of headers to include in the request</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Returns the request response object.</p>



<h3 class="wp-block-heading">PATCH</h3>



<p class="wp-block-paragraph">rest.<strong>httpPatch</strong>(uri, acceptType, content, contentType, expectedResponseCodes, headers) → {*}</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>uri</td><td>String</td><td>The request uri</td></tr><tr><td>acceptType</td><td>String</td><td>OPTIONAL – The Accept-Type media type (defaults to application/json)</td></tr><tr><td>content</td><td>Object</td><td>The request content (stringifies the payload when sent)</td></tr><tr><td>contentType</td><td>String</td><td>OPTIONAL – The Content-Type media type (defaults to application/json)</td></tr><tr><td>expectedResponseCodes</td><td>Array/Number</td><td>OPTIONAL – A list of expected response codes (defaults to [200, 201, 204])</td></tr><tr><td>headers</td><td>Array/String</td><td>OPTIONAL – A key/value set of headers to include in the request</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Returns the request response object.</p>



<h3 class="wp-block-heading">DELETE</h3>



<p class="wp-block-paragraph">rest.<strong>httpDelete</strong>(uri, acceptType, expectedResponseCodes, headers) → {*}</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>uri</td><td>String</td><td>The request uri</td></tr><tr><td>acceptType</td><td>String</td><td>OPTIONAL – The Accept-Type media type (defaults to application/json)</td></tr><tr><td>expectedResponseCodes</td><td>Array/Number</td><td>OPTIONAL – A list of expected response codes (defaults to [200, 201, 204])</td></tr><tr><td>headers</td><td>Array/String</td><td>OPTIONAL – A key/value set of headers to include in the request</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Returns the request response object.</p>



<h3 class="wp-block-heading">HEAD</h3>



<p class="wp-block-paragraph">rest.<strong>httpHead</strong>(uri, acceptType, expectedResponseCodes, headers) → {*}</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>uri</td><td>String</td><td>The request uri</td></tr><tr><td>acceptType</td><td>String</td><td>OPTIONAL – The Accept-Type media type (defaults to application/json)</td></tr><tr><td>expectedResponseCodes</td><td>Array/Number</td><td>OPTIONAL – A list of expected response codes (defaults to [200, 201, 204])</td></tr><tr><td>headers</td><td>Array/String</td><td>OPTIONAL – A key/value set of headers to include in the request</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Returns the request response object.</p>



<h3 class="wp-block-heading">Responses</h3>



<p class="wp-block-paragraph">Each method returns a <strong>RESTResponse</strong> object. The caller decides how to process it: retrieve the content as a string, inspect the headers or do both. The examples below show how to handle responses.</p>



<h2 class="wp-block-heading">Examples</h2>



<p class="wp-block-paragraph">These examples demonstrate HttpRestClient usage.</p>



<h3 class="wp-block-heading">GET example</h3>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
var mediaType = "application/json";
var uri = "/api/v2/tokens/";
var expectedResponseCodes = [200];

var response = rest.httpGet(
    uri,
    mediaType,
    expectedResponseCodes
);
var responseContent = JSON.parse(response.contentAsString);</code></pre>



<h3 class="wp-block-heading">POST example</h3>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
var mediaType = "application/json";
var uri = "/api/v2/tokens/";
var expectedResponseCodes = [201];
var content = {
    application: applicationId,
    scope: scope
};

var response = rest.httpPost(
    uri,
    mediaType,
    content,
    mediaType,
    expectedResponseCodes
);
var responseContent = JSON.parse(response.contentAsString);</code></pre>



<h3 class="wp-block-heading">DELETE example</h3>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);
var mediaType = "application/json";
var sessionId = "abcde";
var uri = "/api/v2/tokens/" + sessionId + "/";
var expectedResponseCodes = [204];

rest.httpDelete(
    uri,
    mediaType,
    expectedResponseCodes
);</code></pre>



<p class="wp-block-paragraph">Thanks for reading, and please let me know if you have any suggestions for improving this service.</p>





