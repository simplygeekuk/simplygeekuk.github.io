---
title: "VCF Automation – Native Git Integration vs Alternatives"
description: "VCF Automation integration with a Git solution like GitHub or Gitlab is a conversation that has come up a lot over the years, and again recently. The suggestion is often to use the native integration options provided with the product,…"
path: "/vcf-automation-native-git-integration-vs-alternatives/"
kind: "post"
published: "2025-06-24T14:46:19Z"
updated: "2025-07-03T21:35:03Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Development","Git"]
tags: ["VCF Automation","VCF Operations Orchestrator"]
wordpressId: 2664
originalUrl: "https://simplygeek.co.uk/vcf-automation-native-git-integration-vs-alternatives/"
thumbnail: "/wp-content/uploads/2025/06/gabriel-heinzer-EUzk9BIEq6M-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/06/gabriel-heinzer-EUzk9BIEq6M-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">VCF Automation integration with a Git solution like GitHub or Gitlab is a conversation that has come up a lot over the years, and again recently. The suggestion is often to use the native integration options provided with the product, which are fine for their intended use case, but many misconceptions lead to disappointment.</p>



<p class="wp-block-paragraph">It’s important to understand what content can be managed from a Git repository using the native functionality before any decision-making takes place. I will address these in this post and help to understand what can be achieved and the available alternatives (and in many cases, necessities).</p>



<p class="wp-block-paragraph">VCF Automation uses VCF Operations Orchestrator, which is required to unlock the product’s full automation capabilities. Orchestrator is often overlooked as it is a separate product bundled with VCF Automation. These two products integrate with Git in different ways, and this is something that has to be taken into consideration.</p>



<p class="wp-block-paragraph">When investigating options for using Git, there are many different use cases for managing content. I break these down into 3 high-level categories:</p>



<ul class="wp-block-list">
<li><strong>Infrastructure</strong> – This is the configuration stored in Git that defines what the infrastructure for the platform should look like. This includes the configuration for compute, storage and networking, where the hardware is either physical or software-based. We often refer to this as ‘<strong>Infrastructure as Code</strong>‘, though this term is usually applied everywhere.</li>



<li><strong>Content</strong> – This is content developed and presented to the end users for consumption. Content includes configuration, blueprints, workflows and other code, which is managed in a more traditional development lifecycle. Content typically consumes the underlying infrastructure.</li>



<li><strong>Consumers</strong> – These are end users, processes, tools, etc, that consume content on the platform via the API or the GUI. As consumers are free to choose how they consume content, <strong>it is not something I will discuss in this post.</strong></li>
</ul>



<p class="wp-block-paragraph">Each category could and will almost certainly use a different set of tooling, methodologies and lifecycle.</p>



<p class="wp-block-paragraph">This post will not discuss orchestration tools in detail, as the aim is to look at this purely from a Git support perspective.</p>



<h2 class="wp-block-heading">VCF Automation Native Git Support</h2>



<p class="wp-block-paragraph">The following sections provide a list of infrastructure items and content that could be managed in a Git repository, and what the currently available ‘<strong>out of the box</strong>‘ integration supports.</p>



<p class="wp-block-paragraph">A separate section is provided for VCF Automation and VCF Operations Orchestrator.</p>



<h3 class="wp-block-heading">Infrastructure Configuration</h3>



<p class="wp-block-paragraph">Below is a list of the most common infrastructure-related configurations in VCF Automation and VCF Operations Orchestrator.</p>



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



<p class="wp-block-paragraph">Below is a list of content that can be managed in VCF Automation and VCF Operations Orchestrator. Content is generally consumed by end users (or supports that goal).</p>



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
<td>One way only. Content can only be pulled from a Git Repository and changes to a Template cannot be pushed (without additional effort and workarounds). Templates will fail to import if the version number is not incremented for every commit or any syntax errors are present.</td>
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



<p class="wp-block-paragraph"><strong>*</strong> Only a single branch can be presented to Orchestrator and made active at any time. In a typical branching strategy, there is no way to handle environment-specific content (I.e. Configurations). Additional effort would be required to ensure the correct content is selected for the respective environment.</p>



<h2 class="wp-block-heading">VCF Automation Alternative Git Support</h2>



<h3 class="wp-block-heading">Using the API’s</h3>



<p class="wp-block-paragraph">All of the VCF Automation services have an API that allows Infrastructure and content to be managed programmatically. This allows any ad-hoc solution to be used, and the configuration can be stored and read from a Git Repository. An example might be a set of JSON documents that describe the infrastructure, which can be processed in a script written in PowerShell or Python.</p>



<p class="wp-block-paragraph">This is the most flexible option available but requires more effort and maintenance to support.</p>



<p class="wp-block-paragraph">The <a href="https://www.mgmt.cloud.vmware.com/automation-ui/api-docs/" target="_blank" rel="noopener noreferrer">VMware Aria Automation API Documentation</a> page provides details of each of the available APIs.</p>



<h3 class="wp-block-heading">Using Orchestration Tools such as Terraform</h3>



<p class="wp-block-paragraph">There are many orchestration tools available, but Terraform is always the one which comes up in discussions. Whilst Terraform is a great tool, it was designed to consume content from big cloud providers like AWS. However, Terraform does include providers that can be used to facilitate an Infrastructure as Code approach to managing the VCF Automation Infrastructure. I believe Terraform would be a good use case for the Infrastructure Configuration, where the code and state can be held in a Git Repository.</p>



<p class="wp-block-paragraph">Terraform is going to struggle, however, when it comes to content. It can do parts of what is needed, but it isn’t designed for this purpose. I will likely cover the use of Terraform for infrastructure configuration in a future post.</p>



<h3 class="wp-block-heading">Using the Build Tools for VMware Aria</h3>



<p class="wp-block-paragraph">The Build Tools for VMware Aria (which I have covered in my <a href="/series/build-tools-for-vmware-aria/" target="_blank" rel="noopener noreferrer">Build Tools for VMware Aria series</a>) is a framework for developing content on the VCF Automation platform (inc VCF Operations Orchestrator). It is without a doubt the best option available when it comes to using the traditional development lifecycle approach to developing content. All content managed by the Build Tools is designed to be held in a Git repository, and the Maven project management tool also has a lot of built-in capabilities to support this.</p>



<p class="wp-block-paragraph">The Build Tools have very limited support for infrastructure configuration and only support items such as Flavor Mappings and Image Mappings, which do not make it well-suited for this purpose.</p>



<h2 class="wp-block-heading">Conclusion</h2>



<p class="wp-block-paragraph">The native Git integrations are not designed to allow for the infrastructure itself to be managed as code. There is some support for content on the VCF Automation platform for Templates and ABX Actions, but even these are quite limited and frustrating to use. I have used them in the past and found myself constantly forgetting to increment the version on a template every time I made any change, be it minor or major (I ended up using a Git hook to automate this). The one-way ‘pull’ is also a problem as it requires that content be exported and saved in the Git repository manually.</p>



<p class="wp-block-paragraph">Consideration also has to be given to the 3 categories I listed above (Infrastructure, Content, Consumer) as I so often see these being bundled together as ‘<strong>Infrastructure as Code</strong>‘, which makes the conversations confusing and difficult. Focus on one, and find the right solution, don’t expect a one-size-fits-all all for everything.</p>



<p class="wp-block-paragraph">When it comes to end users/consumers, my best advice would be to let them decide how they want to consume the content. I have been in many conversations with engineers who try and come up with a solution for everyone and have all the configurations stored in Git. This is novel, but every person and team is different, and they will each have their specific approach to consuming the infrastructure.</p>



<p class="wp-block-paragraph">If you have any thoughts on this or other ways to approach these challenges, then please share.</p>

