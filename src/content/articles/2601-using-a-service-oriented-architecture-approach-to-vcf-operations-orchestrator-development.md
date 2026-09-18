---
title: "Using a Service-Oriented Architecture Approach to VCF Operations Orchestrator Development"
description: "In this post, I will provide a brief overview of Service-Oriented Architecture (SOA) and explain how I apply it to all my VCF Operations Orchestrator development. Service-Oriented Architecture (SOA) is a widely adopted software development…"
path: "/using-a-service-oriented-architecture-approach-to-vcf-operations-orchestrator-development/"
kind: "post"
published: "2025-06-24T13:19:45Z"
updated: "2025-07-08T11:20:54Z"
author: "SimplyGeek"
categories: ["VCF Automation","VCF Operations Orchestrator","Broadcom (VMware)","VMware Cloud Foundation"]
tags: ["VCF","VCF Automation","VCF Operations Orchestrator","VMware Cloud Foundation"]
wordpressId: 2601
originalUrl: "https://simplygeek.co.uk/using-a-service-oriented-architecture-approach-to-vcf-operations-orchestrator-development/"
---


<p class="wp-block-paragraph">In this post, I will provide a brief overview of Service-Oriented Architecture (SOA) and explain how I apply it to all my VCF Operations Orchestrator development.</p>



<p class="wp-block-paragraph">Service-Oriented Architecture (SOA) is a widely adopted software development approach that emphasises the creation of loosely coupled, reusable services. These principles make SOA particularly well-suited for systems integration. For those familiar with Orchestrator, this alignment is clear; most development efforts centre around integrating with external systems, positioning Orchestrator as the “glue” or central coordination point within the automation ecosystem.</p>



<p class="wp-block-paragraph">Here are some key principles of SOA:</p>



<ul class="wp-block-list">
<li><strong>Modularity </strong>– Integrations are divided into smaller, self-contained services. A single service can also be broken down into smaller sub-services.</li>



<li><strong>Loose Coupling</strong> – Each Service is (mostly) independent, which helps to minimise dependencies. However, services can be composed of other services.</li>



<li><strong>Reusability </strong>– Services can be reused in other Services, Workflows or Actions.</li>



<li><strong>Scalability </strong>– New Services can be added easily.</li>



<li><strong>Mask Complexity</strong> – The inner workings of the Service can be hidden or abstracted.</li>
</ul>



<p class="wp-block-paragraph">Adhering to SOA principles helps minimise the need to redevelop or duplicate existing functionality, particularly Actions in the context of Orchestrator, by promoting reuse and modular design.</p>



<p class="wp-block-paragraph">SOA is particularly well-suited for developing integrations in Orchestrator, whether you’re working with built-in plugins or external systems via HTTP REST hosts.</p>



<h2 class="wp-block-heading">Traditional Orchestrator Approach</h2>



<p class="wp-block-paragraph">The following is a common example I frequently encounter, and admittedly have done myself in the past, of how code is typically developed in Orchestrator.</p>



<p class="wp-block-paragraph">Let’s consider a hypothetical API ‘MyAPI’ that we want to integrate with, which exposes 5 endpoints. We’re not worried about the complexities of making such calls, but just the high-level idea. We will call these endpoints ‘MyAPI/endpoint1’ through to ‘MyAPI/endpoint5’, all supporting the method GET.</p>



<p class="wp-block-paragraph">In Orchestrator, what I will often see developers create are 5 Actions (functions)</p>



<p class="wp-block-paragraph">getEndpoint1<br>getEndpoint2<br>…<br>getEndpoint5</p>



<p class="wp-block-paragraph">This is because you are almost encouraged to write multiple Actions, and many of the built-in Actions provided are also structured in this way.</p>



<p class="wp-block-paragraph">You would call each of these Actions using System.getModule().</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="eclipse" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var result = System.getModule("com.simplygeek.myapi").getEndpoint1(restHost);
...
var result = System.getModule("com.simplygeek.myapi").getEndpoint5(restHost);</code></pre>



<p class="wp-block-paragraph">But this appears to follow the SOA principles I mentioned earlier, right? Well, sort of…</p>



<p class="wp-block-paragraph">Let’s consider a hypothetical API called <strong>MyAPI</strong>, which exposes five endpoints. For this example, we’ll focus on the high-level concept rather than the technical details of making the calls. The endpoints are named <code>MyAPI/endpoint1</code> through <code>MyAPI/endpoint5</code>, and each supports the HTTP <code>GET</code> method.</p>



<p class="wp-block-paragraph">When dealing with multiple integrations involving dozens of endpoints, things can quickly become messy, making the solution difficult to manage, maintain, and scale effectively.</p>



<h2 class="wp-block-heading">An Approach Based on SOA Principles</h2>



<p class="wp-block-paragraph">A more scalable approach is to create a dedicated service for interacting with the <strong>MyAPI</strong> API. This can be accomplished using native JavaScript features such as classes and prototypal inheritance. The service itself can be implemented as a single Action within Orchestrator, encapsulating all logic related to the API in a clean, reusable structure.</p>



<p class="wp-block-paragraph">Consider the following example Action named <strong><code>MyApiService</code></strong>, which defines a service using a class-style function declaration and includes the necessary methods to interact with the API.</p>



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



<p class="wp-block-paragraph">The prototype allows us to define and attach additional methods to our “class,” enabling more efficient memory usage and consistent behaviour across all instances.</p>



<p class="wp-block-paragraph">In this example, we’ve defined methods to handle each of the five required <code>GET</code> endpoints, along with an additional internal method that manages the core logic of the <code>GET</code> request, such as handling parameters, collections, pagination, and other common concerns.</p>



<p class="wp-block-paragraph">To use the service, we create a new instance of the <code>MyApiService</code> class using the <code>new</code> keyword. This is typically done alongside a <code>System.getModule()</code> call to reference the Action where the class is defined.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var myApiService new (System.getModule("com.simplygeek.myapi").MyApiService())(restHost);
var result = myApiService.getEndpoint1;
...
var result = myApiService.getEndpoint5;</code></pre>



<p class="wp-block-paragraph">This approach not only results in cleaner, more readable code but also eliminates duplication. It makes it easy to add new methods as needed, while allowing multiple API calls to share the same underlying logic, improving maintainability and consistency.</p>



<p class="wp-block-paragraph">Now let’s take the previous example a step further by introducing prototypal inheritance. This approach allows us to split the <strong>MyApiService </strong>class into multiple, more focused classes, one responsible for the core backend logic, and another for the higher-level “frontend” API calls. This separation enhances modularity and promotes better code organisation.</p>



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



<p class="wp-block-paragraph">In these examples, we’ve refactored the original <code>MyApiService</code> class by introducing a separate <code>MyApiBackendService</code> class. We then extended <code>MyApiBackendService</code> to include additional methods, allowing <code>MyApiService</code> to focus on higher-level API interactions while reusing shared backend functionality.</p>



<p class="wp-block-paragraph">The key that brings these two classes together lies in the inheritance mechanism, enabling <code>MyApiService</code> to seamlessly build upon the foundation provided by <code>MyApiBackendService</code>.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>MyApiService.prototype = Object.create(
    MyApiBackendService.prototype
);
MyApiService.prototype.constructor = MyApiService;</code></pre>



<p class="wp-block-paragraph">In modern programming languages, this type of inheritance is typically achieved using the <code>extends</code> keyword. By applying the same concept in ECMAScript 5 through prototypal inheritance, we can build modular services that encapsulate complex backend logic and expose only the necessary functionality through a clean, front-end interface.</p>



<p class="wp-block-paragraph">This separation not only improves maintainability but also reduces the impact of future changes, as the backend logic remains stable and reusable. When dealing with dozens, or even hundreds, of API calls, they can be organised into distinct service modules that all share a common backend foundation.</p>



<p class="wp-block-paragraph">I hope you’ve found this overview insightful. If you’ve developed your own techniques or have alternative approaches, I’d love to hear about them. Feel free to share!</p>



