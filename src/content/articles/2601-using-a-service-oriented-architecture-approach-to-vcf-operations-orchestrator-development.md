---
title: "Using a Service-Oriented Architecture Approach to VCF Operations Orchestrator Development"
description: "Apply service-oriented architecture to Orchestrator integrations with reusable actions, constructor functions and prototypal inheritance."
path: "/using-a-service-oriented-architecture-approach-to-vcf-operations-orchestrator-development/"
kind: "post"
published: "2025-06-24T13:19:45Z"
updated: "2026-09-18T16:22:40Z"
author: "SimplyGeek"
categories: ["VCF Automation","VCF Operations Orchestrator","Broadcom (VMware)","VMware Cloud Foundation"]
tags: ["VCF","VCF Automation","VCF Operations Orchestrator","VMware Cloud Foundation"]
wordpressId: 2601
originalUrl: "https://simplygeek.co.uk/using-a-service-oriented-architecture-approach-to-vcf-operations-orchestrator-development/"
---


<p class="wp-block-paragraph">This post introduces service-oriented architecture (SOA) and explains how I apply it to my VCF Operations Orchestrator development.</p>



<p class="wp-block-paragraph">Service-oriented architecture (SOA) is a widely adopted approach to building loosely coupled, reusable services. These principles suit systems integration. Much of Orchestrator development involves integrating external systems, with Orchestrator coordinating the automation between them.</p>



<p class="wp-block-paragraph">Here are some key principles of SOA:</p>



<ul class="wp-block-list">
<li><strong>Modularity</strong> – Divide integrations into self-contained services. A service can contain smaller sub-services.</li>



<li><strong>Loose coupling</strong> – Keep services mostly independent to reduce dependencies. Services can still be composed of other services.</li>



<li><strong>Reusability</strong> – Reuse services in other services, workflows or actions.</li>



<li><strong>Scalability</strong> – Add new services easily.</li>



<li><strong>Mask complexity</strong> – Hide or abstract a service's internal logic.</li>
</ul>



<p class="wp-block-paragraph">SOA promotes reuse and modular design. In Orchestrator, this reduces the need to duplicate functionality across actions.</p>



<p class="wp-block-paragraph">SOA is particularly well-suited for developing integrations in Orchestrator, whether you’re working with built-in plugins or external systems via HTTP REST hosts.</p>



<h2 class="wp-block-heading">Traditional Orchestrator approach</h2>



<p class="wp-block-paragraph">I often encounter the following approach in Orchestrator development. I have used it myself.</p>



<p class="wp-block-paragraph">Consider a hypothetical API called <strong>MyAPI</strong> with five endpoints: <code>MyAPI/endpoint1</code> through <code>MyAPI/endpoint5</code>. Each supports the HTTP <code>GET</code> method. This example focuses on the structure of the integration rather than the details of making requests.</p>



<p class="wp-block-paragraph">Developers often create five separate actions (functions):</p>



<p class="wp-block-paragraph">getEndpoint1<br>getEndpoint2<br>…<br>getEndpoint5</p>



<p class="wp-block-paragraph">Orchestrator encourages this approach, and many built-in actions follow the same structure.</p>



<p class="wp-block-paragraph">You call each action using System.getModule().</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="eclipse" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var result = System.getModule("com.simplygeek.myapi").getEndpoint1(restHost);
...
var result = System.getModule("com.simplygeek.myapi").getEndpoint5(restHost);</code></pre>



<p class="wp-block-paragraph">Separate actions provide some reuse, but this approach has limits.</p>







<p class="wp-block-paragraph">With multiple integrations and dozens of endpoints, these actions can become difficult to manage, maintain and scale.</p>



<h2 class="wp-block-heading">An approach based on SOA principles</h2>



<p class="wp-block-paragraph">Instead, create a dedicated service for <strong>MyAPI</strong> using JavaScript class-style functions and prototypal inheritance. A single Orchestrator action can contain the service and its API logic, making it reusable.</p>



<p class="wp-block-paragraph">The following action, <strong><code>MyApiService</code></strong>, defines a service using a class-style function declaration. It includes the methods needed to interact with the API.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>function MyApiService(restHost) {
    this.restHost = restHost;
    this.baseUri = "https://myapi.local/api/";
}

MyApiService.prototype.getEndpoint1 = function () {
   // Perform a GET on endpoint1
   var uri = this.baseUri + "/endpoint1";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.getEndpoint2 = function () {
    // Perform a GET on endpoint2
   var uri = this.baseUri + "/endpoint2";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.getEndpoint3 = function () {
    // Perform a GET on endpoint3
   var uri = this.baseUri + "/endpoint3";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.getEndpoint4 = function () {
    // Perform a GET on endpoint4
   var uri = this.baseUri + "/endpoint14";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.getEndpoint5 = function () {
    // Perform a GET on endpoint5
   var uri = this.baseUri + "/endpoint5";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.get = function () {
    // Backend code to handle GET call (handle params, pagination, etc)
};

return MyApiService;</code></pre>



<p class="wp-block-paragraph">Since VCF Operations Orchestrator uses ECMAScript 5, the <code>class</code> keyword is not supported. Instead, constructor functions are used to define classes, following the classical function-based approach.</p>



<p class="wp-block-paragraph">The prototype lets us attach methods to the class. Instances share these methods, improving memory usage and keeping behaviour consistent.</p>



<p class="wp-block-paragraph">This example defines methods for each of the five <code>GET</code> endpoints. An additional internal method handles shared <code>GET</code> request logic, including parameters, collections and pagination.</p>



<p class="wp-block-paragraph">To use the service, we create a new instance of the <code>MyApiService</code> class using the <code>new</code> keyword. This is typically done alongside a <code>System.getModule()</code> call to reference the Action where the class is defined.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var myApiService new (System.getModule("com.simplygeek.myapi").MyApiService())(restHost);
var result = myApiService.getEndpoint1;
...
var result = myApiService.getEndpoint5;</code></pre>



<p class="wp-block-paragraph">Multiple API calls now share the same underlying logic. This reduces duplication, makes the code easier to read and maintain, and lets us add methods without repeating that logic.</p>



<p class="wp-block-paragraph">Prototypal inheritance lets us split <strong>MyApiService </strong>into two focused classes: one for core backend logic and another for higher-level API calls. This separates their responsibilities and improves code organisation.</p>



<p class="wp-block-paragraph">Example Action: <strong>MyApiBackendService</strong></p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>function MyApiBackendService(restHost) {
    this.baseUri = "https://myapi.local/api/";
    this.mediaType = "application/json";
    this.restHost = restHost;
}

MyApiBackendService.prototype.get = function () {
    // Backend code to handle GET call (handle params, pagination, etc)
};

MyApiBackendService.prototype.post = function () {
    // Backend code to handle POST call
};

MyApiBackendService.prototype.delete = function () {
    // Backend code to handle DELETE call
};

return MyApiBackendService;</code></pre>



<p class="wp-block-paragraph">Example Action: <strong>MyApiService</strong></p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>function MyApiService(restHost) {
    // Import Properties defined on MyApiBackendService.
    MyApiBackendService.call(this, restHost);
}

// MyApiService will inherit methods from MyApiBackendService.
var MyApiBackendService = System.getModule(
	"com.simplygeek.myapi"
).MyApiBackendService();

MyApiService.prototype = Object.create(
    MyApiBackendService.prototype
);
MyApiService.prototype.constructor = MyApiService;

// Add additional methods to MyApiService
MyApiService.prototype.getEndpoint1 = function () {
   // Perform a GET on endpoint1
   var uri = this.baseUri + "/endpoint1";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.getEndpoint2 = function () {
    // Perform a GET on endpoint2
   var uri = this.baseUri + "/endpoint2";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.getEndpoint3 = function () {
    // Perform a GET on endpoint3
   var uri = this.baseUri + "/endpoint3";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.getEndpoint4 = function () {
    // Perform a GET on endpoint4
   var uri = this.baseUri + "/endpoint14";
   var results = this.get(uri);
   
   return results;
};

MyApiService.prototype.getEndpoint5 = function () {
    // Perform a GET on endpoint5
   var uri = this.baseUri + "/endpoint5";
   var results = this.get(uri);
   
   return results;
};

return MyApiService;</code></pre>



<p class="wp-block-paragraph">These examples move the shared backend logic into <code>MyApiBackendService</code>. The <code>MyApiService</code> class extends it with higher-level API methods, reusing the backend functionality.</p>



<p class="wp-block-paragraph">Inheritance connects <code>MyApiService</code> to <code>MyApiBackendService</code>.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>MyApiService.prototype = Object.create(
    MyApiBackendService.prototype
);
MyApiService.prototype.constructor = MyApiService;</code></pre>



<p class="wp-block-paragraph">Modern programming languages typically use <code>extends</code> for this relationship. In ECMAScript 5, prototypal inheritance serves the same purpose. It lets us keep complex backend logic inside modular services and expose only the functionality callers need.</p>



<p class="wp-block-paragraph">This separation improves maintainability and limits the impact of future changes by keeping shared backend logic stable and reusable. Dozens or hundreds of API calls can use distinct service modules built on the same backend.</p>



<p class="wp-block-paragraph">I hope you’ve found this overview insightful. If you’ve developed your own techniques or have alternative approaches, I’d love to hear about them. Feel free to share!</p>



