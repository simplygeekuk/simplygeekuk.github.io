---
title: "VCF Automation – Build Tools for VMware Aria – Overview of VCF Automation Projects"
description: "Compare TypeScript, JavaScript, XML, mixed and vRA projects in Build Tools for VMware Aria, with creation commands and project limitations."
path: "/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/"
kind: "post"
published: "2025-06-24T14:08:04Z"
updated: "2026-09-18T16:22:40Z"
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
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-1" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Project_Types">Project types</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-2" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRO_TypeScript-based_Project">vRO TypeScript-based project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-3" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRO_TypeScript-based_Project_Example">Create a vRO TypeScript-based project</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-4" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRO_JavaScript-based_Project">vRO JavaScript-based project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-5" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRO_JavaScript-based_Project_Example">Create a vRO JavaScript-based project</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-6" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRO_XML-based_Project">vRO XML-based project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-7" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRO_XML-based_Project_Example">Create a vRO XML-based project</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-8" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRO_Mixed_Project">vRO Mixed project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-9" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRO_Mixed_Project_Example">Create a vRO Mixed project</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-10" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#vRA_8x_Project">vRA 8.x project</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-11" href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/#Create_a_vRA_8x_Project_Example">Create a vRA 8.x project</a></li></ul></li></ul></li></ul></nav></div>


<p class="wp-block-paragraph">Build Tools for VMware Aria supports several project types. This post explains those used to manage VCF Automation and VCF Operations Orchestrator content, when to choose them and how to create them.</p>



<p class="wp-block-paragraph">The available project types are:</p>



<ul class="wp-block-list">
<li>vRO TypeScript-based</li>



<li>vRO JavaScript-based</li>



<li>vRO XML-based</li>



<li>vRO Mixed</li>



<li>vRA 8.x</li>
</ul>



<p class="wp-block-paragraph">The project names use the older product acronyms:<br>vRA = VCF Automation<br>vRO = VCF Operations Orchestrator.</p>



<p class="wp-block-paragraph">There are also two legacy project types, but I will not be covering these in this post.</p>



<ul class="wp-block-list">
<li>vRA 7.x</li>



<li>vRA 7.x and vRO</li>
</ul>




<h2 class="wp-block-heading"><span class="ez-toc-section" id="Project_Types"></span>Project types<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The examples use the Build Tools version available when I wrote this post, set by <strong>archetypeVersion</strong>. Check the <a href="https://github.com/vmware/build-tools-for-vmware-aria" target="_blank" rel="noopener noreferrer">GitHub project</a> for newer releases. I recommend using the latest version.</p>



<p class="wp-block-paragraph">Create a root folder for your projects. My examples use <strong>aria-automation</strong>.</p>



<h3 class="wp-block-heading" id="the-pasted-async"><span class="ez-toc-section" id="vRO_TypeScript-based_Project"></span>vRO TypeScript-based project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">This creates a <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a> project for Orchestrator content. It supports development features such as ECMAScript 6 syntax, module dependencies and class inheritance.</p>



<p class="wp-block-paragraph">The project manages workflows, actions, configurations and resources as native TypeScript .ts files. You can maintain all of this content in one place using the same language.</p>



<p class="wp-block-paragraph">This project type requires a good understanding of JavaScript and TypeScript. Consider these limitations:</p>



<ul class="wp-block-list">
<li>TypeScript is converted to JavaScript at build time. You cannot pull content from Orchestrator because there is no conversion back to TypeScript.</li>



<li>All development must happen locally in your development environment, such as an IDE. This follows from the conversion process and the way generated JavaScript is presented in Orchestrator.</li>



<li>Pushing code can take significant time because of the required Node dependencies.</li>



<li>Defining types and interfaces can substantially increase initial delivery time.</li>
</ul>



<p class="wp-block-paragraph">If you have TypeScript experience and can work within these constraints, this project type lets you manage Orchestrator content as an application.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRO_TypeScript-based_Project_Example"></span>Create a vRO TypeScript-based project<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-typescript-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vro-ts</code></pre>



<p class="wp-block-paragraph">Set ‘<strong>groupId</strong>‘ and ‘<strong>artifactId</strong>‘ to your values.</p>



<p class="wp-block-paragraph">The command creates a folder named after <strong>artifactId</strong>: vro-ts in this example.</p>



<p class="wp-block-paragraph">Inside it, <strong>src</strong> has the following structure:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-23.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="212" height="206" src="/wp-content/uploads/2024/01/image-23.png" alt="" class="wp-image-2497"></a></figure>



<p class="wp-block-paragraph">Additional folders can be created and referenced using the ‘<strong>Import</strong>‘ keyword within Actions and Workflows.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRO_JavaScript-based_Project"></span>vRO JavaScript-based project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Orchestrator stores all content, including actions, in XML. An action is a JavaScript function wrapped in XML, which makes native development cumbersome and limits the use of modern development tools.</p>



<p class="wp-block-paragraph">The JavaScript-based project lets you write actions as standard <code>.js</code> files. Build Tools converts them to the XML format Orchestrator requires, so you can develop in JavaScript while keeping platform compatibility.</p>



<p class="wp-block-paragraph">Note that only Orchestrator Actions are supported by this project type (Workflows, Configurations and Resources are not supported).</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRO_JavaScript-based_Project_Example"></span>Create a vRO JavaScript-based project<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-actions-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vro-js</code></pre>



<p class="wp-block-paragraph" id="the-pasted-async">Set ‘<strong>groupId</strong>‘ and ‘<strong>artifactId</strong>‘ to your values.</p>



<p class="wp-block-paragraph" id="the-pasted-async">The command creates a folder named after <strong>artifactId</strong>: vro-js in this example. It contains a sample function at <strong>src\main\resources\com\simplygeek\vro-js</strong>. The <strong>com\simplygeek\vro-js</strong> portion comes from <strong>groupId</strong> and <strong>artifactId</strong>.</p>



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



<p class="wp-block-paragraph">Use the sample folder to test pushing and pulling code. I recommend removing it after you create your own functions.</p>



<p class="wp-block-paragraph">Match each action's folder structure to its Orchestrator module path. For example, <strong>myFunction</strong> in <strong>com.simplygeek</strong> becomes <strong>myFunction.js</strong> inside <strong>com/simplygeek</strong>. Use the sample function as the starting template.</p>



<p class="wp-block-paragraph">Lines 1–6 contain the <a href="https://jsdoc.app/" target="_blank" rel="noopener noreferrer">JSDoc</a> block. Build Tools uses it to describe the action and define its inputs and return type. It ignores the parameters declared inside function() during this process.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRO_XML-based_Project"></span>vRO XML-based project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">This project manages workflows, configurations and resources in Orchestrator's native XML format. It also supports actions, but wraps them in XML. I recommend JavaScript-based projects for actions instead.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRO_XML-based_Project_Example"></span>Create a vRO XML-based project<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-xml-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vro-xml -DworkflowsPath=Simplygeek</code></pre>



<ol><li>Set <strong>groupId</strong> and <strong>artifactId</strong> to your values.</li><li>Set <strong>workflowsPath</strong> to the name or path of the root workflow folder. Do not use <strong>Library</strong>, which already exists.</li></ol><p>You can later rename the generated folder or create one or more new folders.</p>



<p class="wp-block-paragraph">The command creates a folder named after <strong>artifactId</strong>: vro-xml in this example. It includes a sample workflow at <strong>src\main\resources\Workflow\Simplygeek</strong>. The <strong>Simplygeek</strong> folder name comes from <strong>workflowsPath</strong>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRO_Mixed_Project"></span>vRO Mixed project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">The Mixed project is a <strong>virtual</strong> Maven project containing JavaScript-based and XML-based subprojects. One set of Maven commands or goals pushes and pulls both subprojects' content to and from Orchestrator.</p>



<p class="wp-block-paragraph">The Build Tools documentation recommends this project for initially importing existing Orchestrator code. Afterwards, move the code into its respective project types and manage it there.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRO_Mixed_Project_Example"></span>Create a vRO Mixed project<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-mixed-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vro-mixed -DworkflowsPath=Simplygeek</code></pre>



<ol><li>Set <strong>groupId</strong> and <strong>artifactId</strong> to your values.</li><li>Set <strong>workflowsPath</strong> to the name or path of the root workflow folder. Do not use <strong>Library</strong>, which already exists.</li></ol><p>You can later rename the generated folder or create one or more new folders.</p>



<p class="wp-block-paragraph">The command creates a folder named after <strong>artifactId</strong>: vro-mixed in this example. It contains <strong>actions</strong> and <strong>workflows</strong> subfolders. These are Maven projects based on <strong>package-actions-archetype</strong> and <strong>package-xml-archetype</strong>, respectively.</p>



<p class="wp-block-paragraph">Each subproject uses the folder structure described above for its project type.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRA_8x_Project"></span>vRA 8.x project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">The VCF Automation 8.x project type manages the following content:</p>



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



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_vRA_8x_Project_Example"></span>Create a vRA 8.x project<span class="ez-toc-section-end"></span></h4>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.vra-ng.archetypes -DarchetypeArtifactId=package-vra-ng-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=vra-content</code></pre>



<p class="wp-block-paragraph">Set ‘<strong>groupId</strong>‘ and ‘<strong>artifactId</strong>‘ to your values.</p>



<p class="wp-block-paragraph">The command creates a folder named after <strong>artifactId</strong>: vra-content in this example. Its <strong>src\main\resources</strong> directory has this structure:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/02/image-1.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="162" height="232" src="/wp-content/uploads/2024/02/image-1.png" alt="" class="wp-image-2515"></a></figure>



<p class="wp-block-paragraph">The project root contains <strong>content.yaml</strong> with the following content:</p>



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



<p>The lists in content.yaml select the items to push or pull, regardless of which content files exist in the project. To get started:</p><ol><li>Create the content in VCF Automation.</li><li>Add those items to content.yaml.</li><li>Pull the content into the project, where you can manage it locally.</li></ol>



<p class="wp-block-paragraph">These examples provide a starting point for each project type. Future posts will cover them in more detail.</p>





