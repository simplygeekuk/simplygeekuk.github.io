---
title: "Empower VCF Operations Orchestrator API integration with HttpRestClient"
description: "VCF Operations Orchestrator allows you to define endpoints for API integration in the inventory as RestHosts using the HTTP-REST plugin. Once a RestHost is defined, it is then possible to authenticate and perform HTTP web requests on the…"
path: "/empower-vcf-operations-orchestrator-api-integration-with-httprestclient/"
kind: "post"
published: "2025-06-24T15:15:26Z"
updated: "2025-07-03T21:25:52Z"
author: "SimplyGeek"
categories: ["JavaScript","Broadcom (VMware)","VMware Cloud Foundation","VCF Operations Orchestrator","Development"]
tags: ["VCF Operations Orchestrator"]
wordpressId: 2675
originalUrl: "https://simplygeek.co.uk/empower-vcf-operations-orchestrator-api-integration-with-httprestclient/"
thumbnail: "/wp-content/uploads/2025/06/miguel-angel-padrinan-alba-kZNeA-R48tE-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/06/miguel-angel-padrinan-alba-kZNeA-R48tE-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">VCF Operations Orchestrator allows you to define endpoints for API integration in the inventory as RestHosts using the HTTP-REST plugin. Once a RestHost is defined, it is then possible to authenticate and perform HTTP web requests on the endpoint (GET, POST, etc).</p>



<p class="wp-block-paragraph">HttpRestClient is designed to enhance this experience by doing all the heavy lifting when performing these requests, such as handling of different content types, error handling and retry logic.</p>



<p class="wp-block-paragraph">Here are some of the benefits and features provided by the <strong>HttpRestClient</strong>:</p>



<ul class="wp-block-list">
<li>Provides support for the following HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD;</li>



<li>Retries a failed connection (default to 5 attempts) with a delay specified in seconds (defaults to 10 seconds);</li>



<li>Option to specify the expected response codes (defaults are set per method);</li>



<li>Option to retry on 500 status code (default enabled);</li>



<li>Automatic handling of “<strong>application/x-www-form-urlencoded</strong>” content;</li>



<li>Option to set Accept-Type header (defaults to application/json);</li>



<li>Option to set Content-Type header (defaults to Accept-Type);</li>



<li>Automatic URI and URI Component encoding (detects if existing encoding is present);</li>



<li>Obfuscates secrets in content from log output that match password/secret/refreshToken;</li>
</ul>



<p class="wp-block-paragraph">The HttpRestClient serves as the backbone for API integration between VCF Operations Orchestrator and the API endpoint and is designed to integrate with or extend any API service.</p>


<div class="wp-block-image">
<figure class="aligncenter size-full"><img decoding="async" src="/media/recovered/thecloudstop/HttpRestClient.jpg" alt="" class="wp-image-970" loading="lazy"></figure>
</div>


<p class="wp-block-paragraph"><strong>You can download my HttpRestClient module as a package <a href="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.httprestclient.package" data-type="link" data-id="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.httprestclient.package" target="_blank" rel="noopener noreferrer">here </a>or as native JS <a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/rest/HttpRestClient.js" data-type="link" data-id="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/rest/HttpRestClient.js" target="_blank" rel="noopener noreferrer">here</a>.</strong></p>



<h2 class="wp-block-heading">Using the HttpRestClient</h2>



<p class="wp-block-paragraph">Using the HttpRestClient in an Action or Workflow simply requires the following to import the module:</p>



<p class="wp-block-paragraph">As a variable:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);</code></pre>



<p class="wp-block-paragraph">As an object property:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>this.rest = new (System.getModule("com.simplygeek.rest").HttpRestClient())(restHost);</code></pre>



<p class="wp-block-paragraph">Or extend using classical inheritance</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>    var HttpRestClient = System.getModule(
        "com.simplygeek.rest"
    ).HttpRestClient();

    ApiService.prototype = Object.create(
        HttpRestClient.prototype
    );
    ApiService.prototype.constructor = ApiService;</code></pre>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>restHost</td><td>REST:RESTHost</td><td>The HTTP-REST RESTHost (either from the Inventory or transient)</td></tr><tr><td>retryMaxAttempts</td><td>Number</td><td>OPTIONAL – The max number of times to retry the connection (defaults to 5)</td></tr><tr><td>retryDelay</td><td>Number</td><td>OPTIONAL – The number of seconds between retries (defaults to 10)</td></tr><tr><td>retryOn500</td><td>Boolean</td><td>OPTIONAL – Whether to retry on a 500 status code (defaults to true)</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">A new instance of the HttpRestClient class will be created and exposed by the variable ‘<strong>rest</strong>‘ that can be used to perform the required API calls. Note that ‘<strong>rest</strong>‘ can be changed to any value you require.</p>



<h2 class="wp-block-heading">Supported Methods</h2>



<p class="wp-block-paragraph">To use HttpRestClient to perform an API call, use one of the following methods:</p>



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



<p class="wp-block-paragraph">Each method will return the <strong>RESTResponse</strong> object. I felt it would be easier to leave it to the developer to decide how to handle the response. This way, you can decide if you want the content in string format, retrieve headers, or both. Look at my examples to see how responses are handled.</p>



<h2 class="wp-block-heading">Examples</h2>



<p class="wp-block-paragraph">The following are some examples of using the HttpRestClient.</p>



<h3 class="wp-block-heading">GET Example</h3>



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



<h3 class="wp-block-heading">POST Example</h3>



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



<h3 class="wp-block-heading">DELETE Example</h3>



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





