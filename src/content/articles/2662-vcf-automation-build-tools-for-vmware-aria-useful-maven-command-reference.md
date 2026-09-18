---
title: "VCF Automation – Build Tools for VMware Aria – Useful Maven Command Reference"
description: "This series has focused on getting up and running with the Build Tools and creating basic projects. In this post, I will demonstrate all the available Maven commands and some additional parameters that can be used. This page can also be…"
path: "/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/"
kind: "post"
published: "2025-06-24T14:39:14Z"
updated: "2025-06-24T14:47:35Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria","Development","Maven"]
tags: ["VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria"]
wordpressId: 2662
originalUrl: "https://simplygeek.co.uk/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/"
---


<p class="wp-block-paragraph">This series has focused on getting up and running with the Build Tools and creating basic projects. In this post, I will demonstrate all the available Maven commands and some additional parameters that can be used. This page can also be used as a useful Maven command reference.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_88 ez-toc-wrap-left counter-hierarchy ez-toc-counter ez-toc-transparent ez-toc-container-direction">
<div class="ez-toc-title-container">
<p class="ez-toc-title">Page Contents</p>
<span class="ez-toc-title-toggle"></span></div>
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-1" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Creating_Projects">Creating Projects</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-2" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#TypeScript_Project">TypeScript Project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-3" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#JavaScript_Project">JavaScript Project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-4" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#XML_Project">XML Project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-5" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Mixed_Project">Mixed Project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-6" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#ABX_Project">ABX Project</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-7" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#vRA_8x_Project">vRA 8.x Project</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-8" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Push_Content">Push Content</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-9" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Pull_Content">Pull Content</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-10" href="/vcf-automation-build-tools-for-vmware-aria-useful-maven-command-reference/#Clean_Orchestrator_Packages">Clean Orchestrator Packages</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Creating_Projects"></span>Creating Projects<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The following sections provide all the commands for creating the various project types. In all of the examples, you can substitute <strong>groupId </strong>and <strong>artifactId </strong>with your own values. The <strong>archetypeVersion </strong>is the desired version of the Build Tools (if these are new projects, use the latest available).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="TypeScript_Project"></span>TypeScript Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">A TypeScript-based project can manage all VCF Operations Orchestrator content, including Workflows, Actions, Resources and Configurations. The following command can be used to create a TypeScript-based project.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-typescript-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vro-ts</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="JavaScript_Project"></span>JavaScript Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">A JavaScript-based project can be used to manage VCF Operations Orchestrator Actions. It’s not possible to manage other content such as Workflows, Resources or Configurations. The following command can be used to create a JavaScript-based project.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-actions-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vro-actions</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="XML_Project"></span>XML Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">An XML-based project can manage VCF Operations Orchestrator Workflows, Resources and Configurations in the platform’s native XML format. It is also possible to manage Actions, but not recommended as they will be wrapped in XML (use the JavaScript-based project for these instead). The following command can be used to create an XML-based project.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-xml-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vro-xml -DworkflowsPath=Simplygeek</code></pre>



<p class="wp-block-paragraph">The <strong>workflowsPath </strong>parameter will be the top-level workflow path within Orchestrator where all workflows will reside (note that additional folders can easily be added later).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Mixed_Project"></span>Mixed Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">This is not a real project but a Maven multi-module project that contains both a JavaScript-based and an XML-based project as submodules. According to the Built Tools documentation, this project is designed for initial onboarding. I do not recommend using this project type at all, as it’s easier to create the two projects separately. The following command can be used to create a mixed project.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-mixed-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vro-mixed -DworkflowsPath=Simplygeek</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="ABX_Project"></span>ABX Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">An ABX project can manage VCF Automation ABX Actions. ABX Actions are an alternative orchestration runtime to those provided by VCF Operations Orchestrator. Each ABX Action is considered its own project, which makes them a little more complicated to manage. The following command can be used to create an ABX project.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.polyglot.archetypes -DarchetypeArtifactId=package-polyglot-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=abx -Druntime=nodejs -Dtype=abx</code></pre>



<p class="wp-block-paragraph">The <strong>runtime </strong>parameter can be one of <strong>nodejs</strong>, <strong>python </strong>or <strong>powershell</strong>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="vRA_8x_Project"></span>vRA 8.x Project<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">A vRA 8.x project can manage VCF Automation content such as Templates (blueprints), Custom Forms, Content Sources and Policies. This project type is required to manage content that is not ABX or VCF Operations Orchestrator. The following command can be used to create a vRA 8.x project.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.vra-ng.archetypes -DarchetypeArtifactId=package-vra-ng-archetype -DarchetypeVersion=4.2.1 -DgroupId=com.simplygeek -DartifactId=vra-content</code></pre>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Push_Content"></span>Push Content<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The Build Tools provide the command <code>vrealize:push</code> to push content from the local environment to VCF Automation. The following command can be used to push content.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn package vrealize:push -Pprofile_name</code></pre>



<p class="wp-block-paragraph">The <strong>profile_name </strong>should be substituted with the name of a profile for your VCF Automation environment as defined in the Maven <strong>settings.xml</strong> file.</p>



<p class="wp-block-paragraph">The following additional parameters can also be used:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td>includeDependencies=&lt;true/false&gt;</td><td>If you have multiple projects to manage content that has dependencies defined between those projects, you can use this to control if those should be included in the push. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>skipInstallNodeDeps=&lt;true/false&gt;</td><td>When content is pushed, the required node dependencies will be installed first. This can add considerable time to the push process (from approx 30 seconds to 5 minutes). When developing and pushing frequently, turning this off can save a lot of time. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>skipTests=&lt;true/false&gt;</td><td>This can be used to skip running any unit tests that have been defined. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>license.skip</td><td>If you are not concerned about license headers or files being present, which could cause the push to fail, then specify this parameter to ignore missing license information. No values need to be passed.</td></tr><tr><td>license.skipAddThirdParty=&lt;true/false&gt;</td><td>Same as <strong>license.skip</strong> but supports the values <strong>true </strong>or <strong>false</strong>.</td></tr><tr><td>vro.packageImportConfigurationAttributeValues=&lt;true/false&gt;</td><td>This is specific to VCF Operations Orchestrator content only with an XML-based project that contains Configurations. Whether or not to import Configuration Attribute values. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>vro.packageImportConfigSecureStringAttributeValues=&lt;true/false&gt;</td><td>Same as <strong>vro.packageImportConfigurationAttributeValues</strong> but for SecureString attributes. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>vrealize.ssl.ignore.certificate</td><td>Ignore SSL certificate errors by passing this parameter. No values need to be passed.</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Additional parameters are passed using the <code>-D</code> flag.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Pull_Content"></span>Pull Content<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The Build Tools provide two commands for pulling content from VCF Automation to the local environment. The command <code>vro:pull</code> can be used to pull VCF Operations Orchestrator content. The command <code>vra-ng:pull</code> can be used to pull VCF Automation content. Note that pulling ABX content is not supported. The following are example commands for pulling content.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn vro:pull -Pprofile_name
mvn vra-ng:pull -Pprofile_name</code></pre>



<p class="wp-block-paragraph">The <strong>profile_name </strong>should be substituted with the name of a profile for your VCF Automation environment as defined in the Maven <strong>settings.xml</strong> file.</p>



<p class="wp-block-paragraph">The following additional parameters can also be used:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td>packageName=&lt;package name&gt;</td><td>Can be used to pull the content of another package into your project.</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Additional parameters are passed using the <code>-D</code> flag.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Clean_Orchestrator_Packages"></span>Clean Orchestrator Packages<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The Build Tools provide the command <code>vrealize:clean</code> to clean up Orchestrator packages from the server. When deleting Orchestrator content locally, this is not realized on the server side and over time, many stale items will remain and need to be cleaned up manually.</p>



<p class="wp-block-paragraph">The <code>vrealize:clean</code> command can help solve this problem and can be used as part of a release process.</p>



<p class="wp-block-paragraph">One of the following additional parameters must also be used:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td>cleanUpLastVersion=&lt;true/false&gt;</td><td>Clean up the last version of the deployed package from the server. Mutually exclusive with <strong>cleanUpOldVersions</strong>. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>cleanUpOldVersions=&lt;true/false&gt;</td><td>Clean up old package versions from the server. Mutually exclusive with <strong>cleanUpLastVersion</strong>. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr><tr><td>includeDependencies=&lt;true/false&gt;</td><td>Whether dependencies should also be cleaned up. Values should be <strong>true</strong> or <strong>false</strong>.</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Use the following command to clean up the current package version from the server:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn vrealize:clean -DcleanUpLastVersion=true -DcleanUpOldVersions=false -DincludeDependencies=false -Pprofile_name</code></pre>



<p class="wp-block-paragraph">Use the following command to clean up the current package version from the server and its dependencies:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn vrealize:clean -DcleanUpLastVersion=true -DcleanUpOldVersions=false -DincludeDependencies=true -Pprofile_name</code></pre>



<p class="wp-block-paragraph">Use the following command to clean up old package versions and dependencies from the server:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn vrealize:clean -DcleanUpLastVersion=false -DcleanUpOldVersions=true -DincludeDependencies=true -Pprofile_name</code></pre>



<p class="wp-block-paragraph">The <strong>profile_name </strong>should be substituted with the name of a profile for your VCF Automation environment as defined in the Maven <strong>settings.xml</strong> file.</p>



<p class="wp-block-paragraph">I hope this post has been helpful and acts as a useful reference to the Build Tools commands available. If you have any additional commands or parameters that I missed, please comment and share!</p>

