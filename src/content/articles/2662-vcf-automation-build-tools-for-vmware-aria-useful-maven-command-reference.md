---
title: "VCF Automation – Build Tools for VMware Aria – Useful Maven Command Reference"
description: "A Maven command reference for Build Tools for VMware Aria: create projects, push and pull content, and clean up Orchestrator packages."
path: "/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/"
kind: "post"
published: "2025-06-24T14:39:14Z"
updated: "2026-09-18T16:22:40Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria","Development","Maven"]
tags: ["VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria"]
wordpressId: 2662
originalUrl: "https://simplygeek.co.uk/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/"
---

<div id="ez-toc-container" class="ez-toc-v2_0_88 ez-toc-wrap-left counter-hierarchy ez-toc-counter ez-toc-transparent ez-toc-container-direction">
<div class="ez-toc-title-container">
<p class="ez-toc-title">Page Contents</p>
<span class="ez-toc-title-toggle"></span></div>
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-1" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Creating_Projects">Create projects</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-2" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#TypeScript_Project">TypeScript project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-3" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#JavaScript_Project">JavaScript project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-4" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#XML_Project">XML project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-5" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Mixed_Project">Mixed project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-6" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#ABX_Project">ABX project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-7" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#vRA_8x_Project">vRA 8.x project</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-8" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Push_Content">Push content</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-9" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Pull_Content">Pull content</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-10" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Clean_Orchestrator_Packages">Clean up Orchestrator packages</a></li></ul></nav></div>


<p class="wp-block-paragraph">Earlier posts covered Build Tools setup and basic projects. This reference collects the Maven commands for creating projects, pushing and pulling content, and cleaning up packages, together with their parameters.</p>




<h2 class="wp-block-heading"><span class="ez-toc-section" id="Creating_Projects"></span>Create projects<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">In each example, replace <strong>groupId </strong>and <strong>artifactId </strong>with your values. Set <strong>archetypeVersion </strong>to the required Build Tools version. For new projects, use the latest available release.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="TypeScript_Project"></span>TypeScript project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">A TypeScript-based project manages all Orchestrator content: workflows, actions, resources and configurations. Create one with this command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-typescript-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vro-ts</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="JavaScript_Project"></span>JavaScript project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">A JavaScript-based project manages only Orchestrator actions. It does not support workflows, resources or configurations. Create one with this command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-actions-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vro-actions</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="XML_Project"></span>XML project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">An XML-based project manages workflows, resources and configurations in Orchestrator's native XML format. It also supports actions, but I recommend a JavaScript-based project to avoid wrapping them in XML. Create an XML-based project with this command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-xml-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vro-xml -DworkflowsPath=Simplygeek</code></pre>



<p class="wp-block-paragraph">Set <strong>workflowsPath </strong>to the top-level Orchestrator folder for the workflows. You can add more folders later.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Mixed_Project"></span>Mixed project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">This Maven multi-module project contains JavaScript-based and XML-based subprojects. The Build Tools documentation recommends it for initial onboarding. I prefer creating the two projects separately and do not recommend this type. To create a mixed project, use this command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-mixed-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vro-mixed -DworkflowsPath=Simplygeek</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="ABX_Project"></span>ABX project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">An ABX project manages a VCF Automation ABX action. ABX provides an alternative orchestration runtime to Orchestrator. Each action needs its own project, which adds management overhead. Create one with this command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.polyglot.archetypes -DarchetypeArtifactId=package-polyglot-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=abx -Druntime=nodejs -Dtype=abx</code></pre>



<p class="wp-block-paragraph">The <strong>runtime </strong>parameter can be one of <strong>nodejs</strong>, <strong>python </strong>or <strong>powershell</strong>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRA_8x_Project"></span>vRA 8.x project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">A vRA 8.x project manages VCF Automation content such as Templates (blueprints), Custom Forms, Content Sources and Policies. Use this type for content outside ABX and Orchestrator. Create one with this command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.vra-ng.archetypes -DarchetypeArtifactId=package-vra-ng-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vra-content</code></pre>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Push_Content"></span>Push content<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">Use <code>vrealize:push</code> to push local content to VCF Automation:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn package vrealize:push -Pprofile_name</code></pre>



<p class="wp-block-paragraph">Replace <strong>profile_name </strong>with your VCF Automation environment's profile name from Maven <strong>settings.xml</strong>.</p>



<p class="wp-block-paragraph">The command accepts these additional parameters:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td>includeDependencies=&lt;true/false&gt;</td><td>For projects with dependencies on other projects, controls whether the push includes those dependencies. Set to <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>skipInstallNodeDeps=&lt;true/false&gt;</td><td>Skips installation of required Node dependencies when pushing. Installation can add approximately 30 seconds to 5 minutes, so skipping it can save time during frequent pushes. Set to <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>skipTests=&lt;true/false&gt;</td><td>This can be used to skip running any unit tests that have been defined. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>license.skip</td><td>Ignores missing licence headers or files that could otherwise cause the push to fail. Use this when you do not require that information. No value is needed.</td></tr><tr><td>license.skipAddThirdParty=&lt;true/false&gt;</td><td>Same as <strong>license.skip</strong> but supports the values <strong>true </strong>or <strong>false</strong>.</td></tr><tr><td>vro.packageImportConfigurationAttributeValues=&lt;true/false&gt;</td><td>Controls whether configuration attribute values are imported. Applies only to Orchestrator XML-based projects containing configurations. Set to <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>vro.packageImportConfigSecureStringAttributeValues=&lt;true/false&gt;</td><td>Same as <strong>vro.packageImportConfigurationAttributeValues</strong> but for SecureString attributes. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>vrealize.ssl.ignore.certificate</td><td>Ignore SSL certificate errors by passing this parameter. No values need to be passed.</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Additional parameters are passed using the <code>-D</code> flag.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Pull_Content"></span>Pull content<span class="ez-toc-section-end"></span></h2>



<p>Build Tools provides two commands to pull content into the local environment:</p><ul><li><code>vro:pull</code> retrieves VCF Operations Orchestrator content.</li><li><code>vra-ng:pull</code> retrieves VCF Automation content.</li></ul><p>Pulling ABX content is not supported. The following examples show both commands.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn vro:pull -Pprofile_name
mvn vra-ng:pull -Pprofile_name</code></pre>



<p class="wp-block-paragraph">Replace <strong>profile_name </strong>with your VCF Automation environment's profile name from Maven <strong>settings.xml</strong>.</p>



<p class="wp-block-paragraph">The commands accept these additional parameters:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td>packageName=&lt;package name&gt;</td><td>Can be used to pull the content of another package into your project.</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Additional parameters are passed using the <code>-D</code> flag.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Clean_Orchestrator_Packages"></span>Clean up Orchestrator packages<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">Deleting Orchestrator content locally does not remove it from the server. Stale items can accumulate. Use <code>vrealize:clean</code> to clean up server packages instead of removing them manually.</p>



<p class="wp-block-paragraph">You can include <code>vrealize:clean</code> in your release process.</p>



<p class="wp-block-paragraph">Use exactly one of the following parameters:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td>cleanUpLastVersion=&lt;true/false&gt;</td><td>Clean up the last version of the deployed package from the server. Mutually exclusive with <strong>cleanUpOldVersions</strong>. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>cleanUpOldVersions=&lt;true/false&gt;</td><td>Clean up old package versions from the server. Mutually exclusive with <strong>cleanUpLastVersion</strong>. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>includeDependencies=&lt;true/false&gt;</td><td>Whether dependencies should also be cleaned up. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Use the following command to clean up the current package version from the server:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn vrealize:clean -DcleanUpLastVersion=true -DcleanUpOldVersions=false -DincludeDependencies=false -Pprofile_name</code></pre>



<p class="wp-block-paragraph">Use the following command to clean up the current package version from the server and its dependencies:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn vrealize:clean -DcleanUpLastVersion=true -DcleanUpOldVersions=false -DincludeDependencies=true -Pprofile_name</code></pre>



<p class="wp-block-paragraph">Use the following command to clean up old package versions and dependencies from the server:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn vrealize:clean -DcleanUpLastVersion=false -DcleanUpOldVersions=true -DincludeDependencies=true -Pprofile_name</code></pre>



<p class="wp-block-paragraph">Replace <strong>profile_name </strong>with your VCF Automation environment's profile name from Maven <strong>settings.xml</strong>.</p>



<p class="wp-block-paragraph">I hope this post has been helpful and acts as a useful reference to the Build Tools commands available. If you have any additional commands or parameters that I missed, please comment and share!</p>

