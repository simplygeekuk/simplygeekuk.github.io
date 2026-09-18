---
title: "VCF Automation – Build Tools for VMware Aria – Overview of VCF Automation Projects"
description: "The Build Tools for VMware Aria support a variety of project types. In this post, I’ll focus on those relevant to managing VCF Automation and VCF Automation Orchestrator content. I’ll explain the purpose of each project type, offer…"
path: "/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/"
kind: "post"
published: "2025-06-24T14:08:04Z"
updated: "2025-07-02T09:00:19Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria","Development","Maven"]
tags: ["VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria"]
wordpressId: 2653
originalUrl: "https://simplygeek.co.uk/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/"
---

<div id="ez-toc-container" class="ez-toc-v2_0_88 ez-toc-wrap-left counter-hierarchy ez-toc-counter ez-toc-transparent ez-toc-container-direction">
<div class="ez-toc-title-container">
<p class="ez-toc-title">Page Contents</p>
<span class="ez-toc-title-toggle"></span></div>
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-1" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Project_Types">Project Types</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-2" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRO_TypeScript-based_Project">vRO TypeScript-based Project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-3" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRO_TypeScript-based_Project_Example">Create a vRO TypeScript-based Project Example</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-4" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRO_JavaScript-based_Project">vRO JavaScript-based Project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-5" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRO_JavaScript-based_Project_Example">Create a vRO JavaScript-based Project Example</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-6" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRO_XML-based_Project">vRO XML-based Project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-7" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRO_XML-based_Project_Example">Create a vRO XML-based Project Example</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-8" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRO_Mixed_Project">vRO Mixed Project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-9" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRO_Mixed_Project_Example">Create a vRO Mixed Project Example</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-10" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRA_8x_Project">vRA 8.x Project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-11" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRA_8x_Project_Example">Create a vRA 8.x Project Example</a></li></ul></li></ul></li></ul></nav></div>


<p class="wp-block-paragraph">The Build Tools for VMware Aria support a variety of project types. In this post, I’ll focus on those relevant to managing VCF Automation and VCF Automation Orchestrator content. I’ll explain the purpose of each project type, offer guidance on when to use each based on your use case, and provide example commands to help you create them.</p>



<p class="wp-block-paragraph">First, let’s take a look at the list of available project types:</p>



<ul class="wp-block-list">
<li>vRO TypeScript-based</li>



<li>vRO JavaScript-based</li>



<li>vRO XML-based</li>



<li>vRO Mixed</li>



<li>vRA 8.x</li>
</ul>



<p class="wp-block-paragraph">If you are not familiar with the old product acronyms:<br>vRA = VCF Automation<br>vRO = VCF Operations Orchestrator.</p>



<p class="wp-block-paragraph">There are also two legacy project types, but I will not be covering these in this post.</p>



<ul class="wp-block-list">
<li>vRA 7.x</li>



<li>vRA 7.x and vRO</li>
</ul>




<h2 class="wp-block-heading"><span class="ez-toc-section" id="Project_Types"></span>Project Types<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The following sections provide examples of the different project types that can be created. Please note that the ‘<strong>archetypeVersion</strong>‘ variable used in these examples was the version of the Build Tools at the time of writing. Please check the <a href="https://github.com/vmware/build-tools-for-vmware-aria" target="_blank" rel="noopener noreferrer">GitHub project</a> if a new version is available, as it’s recommended to use the latest.</p>



<p class="wp-block-paragraph">I recommend creating a root folder to store the project(s). In my examples, I use the root folder ‘<strong>aria-automation</strong>‘.</p>



<h3 class="wp-block-heading" id="the-pasted-async"><span class="ez-toc-section" id="vRO_TypeScript-based_Project"></span>vRO TypeScript-based Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">This will create a <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a> project that allows VCF Operations Orchestrator content to be developed and managed like a modern JavaScript project using many of the ECMAScript 6-supported features, module dependencies, class inheritance, and much more.</p>



<p class="wp-block-paragraph">Workflows, Actions, Configurations, and Resources can all be managed using this project and are developed as .ts files in the native TypeScript language. This has the advantage of managing all Orchestrator content in a single place using the same language.</p>



<p class="wp-block-paragraph">This project type requires a good level of JavaScript and TypeScript knowledge and has some important points to consider:</p>



<ul class="wp-block-list">
<li>Code written in TypeScript is converted back to JavaScript during build time. This means that content cannot be ‘pulled’ from the Orchestrator server as there is no mechanism to convert the native JavaScript code to TypeScript;</li>



<li>All development must be made in the user’s development environment (i.e. locally using an IDE). This is related to the previous point and also because of the way the JavaScript code is converted and presented on the Orchestrator server;</li>



<li>Pushing code to the Orchestrator server can be significant due to the node dependencies that are required;</li>



<li>Requires Types/Interfaces to be defined that could massively increase initial delivery times;</li>
</ul>



<p class="wp-block-paragraph">Despite these points, this is a great project type if you have TypeScript experience that allows you to truly manage Orchestrator content as an application.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRO_TypeScript-based_Project_Example"></span>Create a vRO TypeScript-based Project Example<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-typescript-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vro-ts</code></pre>



<p class="wp-block-paragraph">Set ‘<strong>groupId</strong>‘ and ‘<strong>artifactId</strong>‘ to your values.</p>



<p class="wp-block-paragraph">Once complete, you should see a new folder with the name of what <strong>artifactId</strong> was set to (vro-ts in my example).</p>



<p class="wp-block-paragraph">In the new folder, under ‘<strong>src</strong>‘, you should have a folder structure like the following:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-23.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="212" height="206" src="/wp-content/uploads/2024/01/image-23.png" alt="" class="wp-image-2497"></a></figure>



<p class="wp-block-paragraph">Additional folders can be created and referenced using the ‘<strong>Import</strong>‘ keyword within Actions and Workflows.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRO_JavaScript-based_Project"></span>vRO JavaScript-based Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">In Orchestrator, all content, including Actions, is stored in XML format. Actions themselves are simply JavaScript functions wrapped in XML, which makes native development cumbersome and limits the ability to leverage modern development tools.</p>



<p class="wp-block-paragraph">The JavaScript-based project type solves this by enabling you to write Orchestrator Actions in pure JavaScript, stored as standard <code>.js</code> files. The Build Tools handle the background conversion of these files into the XML format required by Orchestrator, allowing you to work entirely in JavaScript while maintaining full compatibility with the platform.</p>



<p class="wp-block-paragraph">Note that only Orchestrator Actions are supported by this project type (Workflows, Configurations and Resources are not supported).</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRO_JavaScript-based_Project_Example"></span>Create a vRO JavaScript-based Project Example<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-actions-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vro-js</code></pre>



<p class="wp-block-paragraph" id="the-pasted-async">Set ‘<strong>groupId</strong>‘ and ‘<strong>artifactId</strong>‘ to your values.</p>



<p class="wp-block-paragraph" id="the-pasted-async">Once complete, you should see a new folder named after the <strong>artifactId</strong> (vro-js in my example). Within this folder, there will be a sample function in the path ‘<strong>src\main\resources\com\simplygeek\vro-js</strong>‘ where ‘<strong>com\simplygeek\vro-js</strong>‘ is derived from the <strong>groupId</strong> and <strong>artifactId</strong> values.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-24.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="316" height="73" src="/wp-content/uploads/2024/01/image-24.png" alt="" class="wp-image-2502" srcset="/wp-content/uploads/2024/01/image-24.png 316w, /wp-content/uploads/2024/01/image-24-300x69.png 300w" sizes="auto, (max-width: 316px) 100vw, 316px"></a></figure>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>/**
 * Write a brief description of the purpose of the action.
 * @param {number} x - describe each parameter as in JSDoc format.
 * @param {number} y - you can use different vRO types.
 * @returns {number} - describe the return type as well
 */
(function (x, y) {
    return x + y;
});</code></pre>



<p class="wp-block-paragraph">I recommend removing this folder later once you have created new functions, but it can be useful for initial testing (pushing/pulling code).</p>



<p class="wp-block-paragraph">To create new functions (Actions), create a folder structure which is based on the module path in Orchestrator. As per my example, if there was an Action in Orchestrator called ‘<strong>myFunction</strong>‘ in the module ‘<strong>com.simplygeek</strong>‘, this would be represented as a folder structure ‘<strong>com/simplygeek</strong>‘ which contains a file called ‘<strong>myFunction.js</strong>‘. Use the sample function for the initial boilerplate for these functions.</p>



<p class="wp-block-paragraph">It is important to note lines 1-6, which are the <a href="https://jsdoc.app/" target="_blank" rel="noopener noreferrer">JSDoc</a> block used to describe the function. Build Tools uses this information when creating the Action in Orchestrator and for defining the inputs and return type (the parameters within the function() are ignored during this process).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRO_XML-based_Project"></span>vRO XML-based Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">This project will allow content in Orchestrator to be managed in its native XML format for the development of Workflows, Configurations and Resources (Actions are also supported but will be wrapped in XML and are therefore not recommended (use JavaScript-based projects for this!)).</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRO_XML-based_Project_Example"></span>Create a vRO XML-based Project Example<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-xml-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vro-xml -DworkflowsPath=Simplygeek</code></pre>



<p class="wp-block-paragraph">Set ‘<strong>groupId</strong>‘ and ‘<strong>artifactId</strong>‘ to your values. Set ‘<strong>workflowsPath</strong>‘ to the name (or path) of the root folder for the Orchestrator Workflows (do not use <strong>Library</strong> as this already exists). This can also be changed later by simply renaming the folder that is created or creating a new folder (or multiple folders if desired).</p>



<p class="wp-block-paragraph">Once complete, you should see a new folder with the name of what <strong>artifactId</strong> was set to (vro-xml in my example). Within this folder, there will be a sample Workflow in the path ‘<strong>src\main\resources\Workflow\Simplygeek</strong>‘ where ‘<strong>Simplygeek</strong>‘ is derived from the <strong>workflowsPath</strong> value.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRO_Mixed_Project"></span>vRO Mixed Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">The Mixed project is a ‘<strong>virtual</strong>‘ Maven project that contains two underlying projects, a JavaScript-based and an XML-based project. A virtual Maven project allows these to be managed as a single entity using a single set of Maven commands/goals to push/pull content to/from Orchestrator.</p>



<p class="wp-block-paragraph">As per the Build Tools documentation, this project is recommended for the initial onboarding of existing Orchestrator code into the solution. Later, the code should be moved and managed within their respective project types.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRO_Mixed_Project_Example"></span>Create a vRO Mixed Project Example<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-mixed-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vro-mixed -DworkflowsPath=Simplygeek</code></pre>



<p class="wp-block-paragraph" id="the-pasted-async">Set ‘<strong>groupId</strong>‘ and ‘<strong>artifactId</strong>‘ to your values. Set ‘<strong>workflowsPath</strong>‘ to the name (or path) of the root folder for the Orchestrator Workflows (do not use <strong>Library</strong> as this already exists). This can also be changed later by simply renaming the folder that is created or creating a new folder (or multiple folders if desired).</p>



<p class="wp-block-paragraph">Once complete, you should see a new folder with the name of what <strong>artifactId</strong> was set to (vro-mixed in my example). Within this folder, there will be two subfolders, ‘<strong>actions</strong>‘ and ‘<strong>workflows</strong>‘. These are Maven projects based on the ‘<strong>package-actions-archetype</strong>‘ and ‘<strong>package-xml-archetype</strong>‘ archetypes, respectively.</p>



<p class="wp-block-paragraph">These subprojects follow the same folder structure as per the examples above for the respective project type.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRA_8x_Project"></span>vRA 8.x Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">The VCF Automation 8.x project type allows the management of all VCF Automation content that includes:</p>



<ul class="wp-block-list">
<li>Cloud Templates (blueprints);</li>



<li>Custom Forms</li>



<li>Subscriptions</li>



<li>Catalog Items</li>



<li>Content Sources</li>



<li>Property Groups</li>



<li>Policies</li>



<li>Catalog Entitlements</li>



<li>Resource Actions</li>



<li>Image / Flavor Mappings</li>



<li>Storage Profiles</li>
</ul>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRA_8x_Project_Example"></span>Create a vRA 8.x Project Example<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.vra-ng.archetypes -DarchetypeArtifactId=package-vra-ng-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vra-content</code></pre>



<p class="wp-block-paragraph">Set ‘<strong>groupId</strong>‘ and ‘<strong>artifactId</strong>‘ to your values.</p>



<p class="wp-block-paragraph">Once complete, you should see a new folder named by the <strong>artifactId</strong> (vra-content in my example). Within this folder, there will be the following folder structure under ‘<strong>src\main\resources</strong>‘:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/02/image-1.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="162" height="232" src="/wp-content/uploads/2024/02/image-1.png" alt="" class="wp-image-2515"></a></figure>



<p class="wp-block-paragraph">At the root of the project, there will be a ‘<strong>content.yaml</strong>‘ file with the following content:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="yaml" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>blueprint:
  - Volume
subscription: []
flavor-mapping:
  - small
  - medium
image-mapping: []
storage-profile: []
region-mapping:
  cloud-account-tags:
    export-tag: "env:dev"
    import-tags: ["env:dev", "env:test"]
catalog-item: []
custom-resource: []
resource-action: []
catalog-entitlement: []

property-group: []
policy:
  content-sharing: []

content-source: []</code></pre>



<p class="wp-block-paragraph">These lists represent the content items that will be pushed or pulled from the VCF Automation platform, regardless of which content exists within the project. The best approach when starting is to populate content in VCF Automation and then update this file with the items. Then pull down the content, which can be managed within the project.</p>



<p class="wp-block-paragraph">Hopefully, this is enough to get started with the various project types available, and I will provide further content to cover these in more depth soon.</p>





