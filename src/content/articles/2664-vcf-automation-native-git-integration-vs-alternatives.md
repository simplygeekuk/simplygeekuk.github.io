---
title: "VCF Automation – Native Git Integration vs Alternatives"
description: "Compare native Git integration, APIs, Terraform and Build Tools for managing VCF Automation infrastructure and content."
path: "/vcf-automation-native-git-integration-vs-alternatives/"
kind: "post"
published: "2025-06-24T14:46:19Z"
updated: "2026-09-18T16:22:40Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Development","Git"]
tags: ["VCF Automation","VCF Operations Orchestrator"]
wordpressId: 2664
originalUrl: "https://simplygeek.co.uk/vcf-automation-native-git-integration-vs-alternatives/"
thumbnail: "/wp-content/uploads/2025/06/gabriel-heinzer-EUzk9BIEq6M-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/06/gabriel-heinzer-EUzk9BIEq6M-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">Git integration with VCF Automation comes up regularly in conversations about GitHub and GitLab. Native integrations suit their intended uses, but misunderstandings about their scope can lead to disappointment.</p>



<p class="wp-block-paragraph">Before choosing an integration, establish which content it can manage from Git. This post explains the native options, their limitations and the alternatives you may need.</p>



<p class="wp-block-paragraph">VCF Automation relies on the bundled VCF Operations Orchestrator product for its full automation capabilities. Orchestrator is often overlooked because it is a separate product. The two products integrate with Git differently, so consider both.</p>



<p class="wp-block-paragraph">I divide the uses of Git into three categories:</p>



<ul class="wp-block-list">
<li><strong>Infrastructure</strong> – Configuration stored in Git that defines the platform's compute, storage and networking, whether physical or software-based. This is often called <strong>infrastructure as code</strong>, although the term is used more broadly.</li>



<li><strong>Content</strong> – Configuration, blueprints, workflows and other code developed for end users through a traditional development lifecycle. Content typically consumes the underlying infrastructure.</li>



<li><strong>Consumers</strong> – Users, processes and tools that access platform content through the API or GUI. They can choose how to consume it, so <strong>their approaches are outside this post's scope.</strong></li>
</ul>



<p class="wp-block-paragraph">Each category is likely to need different tools, methods and a different lifecycle.</p>



<p class="wp-block-paragraph">This post focuses on Git support rather than examining orchestration tools in detail.</p>



<h2 class="wp-block-heading">Native Git support in VCF Automation</h2>



<p class="wp-block-paragraph">The following tables list infrastructure configuration and content that could be stored in Git. They show which items the native integrations supported when I wrote this post.</p>



<p class="wp-block-paragraph">VCF Automation and VCF Operations Orchestrator have separate tables.</p>



<h3 class="wp-block-heading">Infrastructure configuration</h3>



<p class="wp-block-paragraph">These are the most common infrastructure configuration items:</p>



<p class="wp-block-paragraph"><strong>VCF Automation:</strong></p>



<figure class="wp-block-table">
<table class="has-fixed-layout">
<tbody>
<tr>
<td><strong>Item</strong></td>
<td><strong>Native Git Integration Support</strong></td>
</tr>
<tr>
<td>Cloud Accounts</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Cloud Zones</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Network Profiles</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Storage Profiles</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Image Mappings</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Flavor Mappings</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Projects</td>
<td>Not Supported</td>
</tr>
</tbody>
</table>
</figure>



<p class="wp-block-paragraph"><strong>VCF Operations Orchestrator:</strong></p>



<figure class="wp-block-table">
<table class="has-fixed-layout">
<tbody>
<tr>
<td><strong>Item</strong></td>
<td><strong>Native</strong> <strong>Git Integration Support</strong></td>
</tr>
<tr>
<td>Inventory / Plugin endpoints</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Policies</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Environments</td>
<td>Not Supported</td>
</tr>
</tbody>
</table>
</figure>



<h3 class="wp-block-heading">Content</h3>



<p class="wp-block-paragraph">The following content is consumed by end users or supports that consumption:</p>



<p class="wp-block-paragraph"><strong>VCF Automation:</strong></p>



<figure class="wp-block-table">
<table class="has-fixed-layout">
<tbody>
<tr>
<td><strong>Item</strong></td>
<td><strong>Native</strong> <strong>Git Integration Support</strong></td>
</tr>
<tr>
<td>Templates (blueprints)</td>
<td>Pull only. Pushing template changes requires extra work or workarounds. Import fails if the version number is not incremented for every commit, or if the template contains syntax errors.</td>
</tr>
<tr>
<td>Property Groups</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Custom Resources</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Resource Actions</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Subscriptions</td>
<td>Not Supported</td>
</tr>
<tr>
<td>ABX Actions</td>
<td>One way only. Content can only be pulled from a Git Repository and changes to an ABX Action cannot be pushed.</td>
</tr>
<tr>
<td>Content Sources</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Catalog Items</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Custom Forms</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Policy Definitions (Content Sharing, Approval, Deployment Limit, Resource Quota, Day 2 Actions, Lease)</td>
<td>Not Supported</td>
</tr>
</tbody>
</table>
</figure>



<p class="wp-block-paragraph"><strong>VCF Operations Orchestrator:</strong></p>



<figure class="wp-block-table">
<table class="has-fixed-layout">
<tbody>
<tr>
<td><strong>Item</strong></td>
<td><strong>Native</strong> <strong>Git Integration Support</strong></td>
</tr>
<tr>
<td>Workflows</td>
<td>Supported*</td>
</tr>
<tr>
<td>Actions</td>
<td>Supported*</td>
</tr>
<tr>
<td>Configurations</td>
<td>Supported*</td>
</tr>
<tr>
<td>Resources</td>
<td>Supported*</td>
</tr>
</tbody>
</table>
</figure>



<p class="wp-block-paragraph"><strong>*</strong> Orchestrator can present and activate only one branch at a time. A typical branching strategy does not handle environment-specific content, such as configurations, by itself. You need additional work to select the correct content for each environment.</p>



<h2 class="wp-block-heading">Alternatives to native Git integration</h2>



<h3 class="wp-block-heading">Use the APIs</h3>



<p class="wp-block-paragraph">All VCF Automation services expose APIs for managing infrastructure and content programmatically. You can build a custom solution that reads configuration from Git. For example, a PowerShell or Python script could process JSON documents describing the infrastructure.</p>



<p class="wp-block-paragraph">This provides the most flexibility, but requires more development and maintenance.</p>



<p class="wp-block-paragraph">The <a href="https://www.mgmt.cloud.vmware.com/automation-ui/api-docs/" target="_blank" rel="noopener noreferrer">VMware Aria Automation API Documentation</a> page provides details of each of the available APIs.</p>



<h3 class="wp-block-heading">Use orchestration tools such as Terraform</h3>



<p class="wp-block-paragraph">Terraform is often suggested among the available orchestration tools. It was designed to consume content from cloud providers such as AWS. Its providers also support infrastructure as code for VCF Automation infrastructure. I consider it a good fit for infrastructure configuration, with code and state held in a Git repository.</p>



<p class="wp-block-paragraph">I find Terraform less suited to content management. It can handle parts of the process, but was not designed for that purpose. I may cover its use for infrastructure configuration in a future post.</p>



<h3 class="wp-block-heading">Use Build Tools for VMware Aria</h3>



<p class="wp-block-paragraph">Build Tools for VMware Aria is a framework for developing VCF Automation and Orchestrator content. I cover it in my <a href="/series/build-tools-for-vmware-aria/" target="_blank" rel="noopener noreferrer">Build Tools for VMware Aria series</a>. I consider it the best option for managing content through a traditional development lifecycle. Its content is designed to live in Git, with Maven providing supporting project management capabilities.</p>



<p class="wp-block-paragraph">Build Tools has limited support for infrastructure configuration, covering items such as Flavor Mappings and Image Mappings. This makes it less suitable for managing the infrastructure itself.</p>



<h2 class="wp-block-heading">Conclusion</h2>



<p>Native Git integrations do not manage the infrastructure as code. Their support for Templates and ABX Actions is also limited. In my experience, two constraints make them frustrating to use:</p><ul><li>Every template change needs a version increment, however small the change. I used a Git hook to automate this after repeatedly forgetting it.</li><li>The integration pulls in one direction. You must export content and save it in Git manually.</li></ul>



<p class="wp-block-paragraph">Keep the Infrastructure, Content and Consumer categories distinct. Calling all three <strong>infrastructure as code</strong> makes requirements harder to discuss. Choose a solution for each need rather than expecting one tool to cover everything.</p>



<p class="wp-block-paragraph">Let consumers choose how they use the content. I have seen engineers try to design one solution for everyone, with every configuration stored in Git. Different people and teams have different needs and ways of consuming infrastructure.</p>



<p class="wp-block-paragraph">If you have any thoughts on this or other ways to approach these challenges, then please share.</p>

