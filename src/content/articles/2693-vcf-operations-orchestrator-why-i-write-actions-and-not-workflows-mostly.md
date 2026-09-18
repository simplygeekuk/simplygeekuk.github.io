---
title: "VCF Operations Orchestrator: Why I Write Actions and Not Workflows (Mostly)"
description: "Why I move Orchestrator logic into reusable JavaScript actions, keep workflows small and use development tools for testing and code review."
path: "/vcf-operations-orchestrator-why-i-write-actions-and-not-workflows-mostly/"
kind: "post"
published: "2025-07-01T14:17:56Z"
updated: "2026-09-18T16:22:41Z"
author: "SimplyGeek"
categories: ["VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Development","JavaScript","Broadcom (VMware)"]
tags: ["VCF Automation","VCF Operations Orchestrator"]
wordpressId: 2693
originalUrl: "https://simplygeek.co.uk/vcf-operations-orchestrator-why-i-write-actions-and-not-workflows-mostly/"
thumbnail: "/wp-content/uploads/2025/07/jakub-zerdzicki-LMsSNDJ9Hvc-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/07/jakub-zerdzicki-LMsSNDJ9Hvc-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">99% of my VCF Operations Orchestrator code is written as actions. This lets me write pure JavaScript that is easier to read and maintain. It also works with linters, unit testing frameworks and code analysers.</p>



<h2 class="wp-block-heading">Why large workflows become difficult to maintain</h2>

<p class="wp-block-paragraph">Workflows provide a visual, drag-and-drop interface for automation with little code. They were originally intended to help system administrators and infrastructure teams automate vCenter Server tasks without needing a traditional development background.</p>



<p class="wp-block-paragraph">This simple workflow contains small script tasks, a for each loop and error handling, shown by the red line:</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image.png"><img loading="lazy" decoding="async" width="637" height="537" src="/wp-content/uploads/2025/07/image.png" alt="" class="wp-image-2700" srcset="/wp-content/uploads/2025/07/image.png 637w, /wp-content/uploads/2025/07/image-300x253.png 300w" sizes="auto, (max-width: 637px) 100vw, 637px"></a></figure>



<p class="wp-block-paragraph">Orchestrator's role has changed since its first release in 2009. A platform for simple scripts and automation flows now needs to support complex solutions that integrate dozens of systems.</p>



<p class="wp-block-paragraph">Developers still build these solutions with the traditional workflow model. In my view, that approach no longer fits: large, complex workflows are difficult to understand, maintain and troubleshoot.</p>



<p class="wp-block-paragraph">This larger workflow runs a script on a virtual machine:</p>



<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2025/07/image-1.png"><img loading="lazy" decoding="async" width="1024" height="369" src="/wp-content/uploads/2025/07/image-1-1024x369.png" alt="" class="wp-image-2705" srcset="/wp-content/uploads/2025/07/image-1-1024x369.png 1024w, /wp-content/uploads/2025/07/image-1-300x108.png 300w, /wp-content/uploads/2025/07/image-1-768x277.png 768w, /wp-content/uploads/2025/07/image-1-1536x554.png 1536w, /wp-content/uploads/2025/07/image-1-2048x739.png 2048w, /wp-content/uploads/2025/07/image-1-640x231.png 640w" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>



<p class="wp-block-paragraph">This is a relatively tidy example compared with others I have seen. Even so, changing a large workflow can mean spending more time rearranging the visual layout than developing the solution.</p>



<p class="wp-block-paragraph">Workflows also store their content primarily as XML. In Git, you work with those raw files, which makes development outside the visual editor cumbersome. Large XML diffs are difficult to read and assess during peer review.</p>



<p class="wp-block-paragraph">A workflow's XML can contain hundreds or thousands of lines. Here is an example:</p>



<figure class="wp-block-image size-full is-resized"><a href="/wp-content/uploads/2025/07/image-2.png"><img loading="lazy" decoding="async" width="831" height="739" src="/wp-content/uploads/2025/07/image-2.png" alt="" class="wp-image-2709" srcset="/wp-content/uploads/2025/07/image-2.png 831w, /wp-content/uploads/2025/07/image-2-300x267.png 300w, /wp-content/uploads/2025/07/image-2-768x683.png 768w, /wp-content/uploads/2025/07/image-2-640x569.png 640w" sizes="auto, (max-width: 831px) 100vw, 831px"></a></figure>



<p class="wp-block-paragraph">For these reasons, I do not consider the traditional workflow model suitable for increasingly complex automation.</p>



<h2 class="wp-block-heading">Move the logic into actions</h2>

<p class="wp-block-paragraph"><strong>My approach is to write actions.</strong> Modular JavaScript is easier to maintain and test, and integrates with modern development tools.</p>



<p class="wp-block-paragraph">Workflows remain necessary in some cases. VCF Automation Extensibility Subscriptions, for example, require a workflow entry point. Moving most of the logic into reusable actions reduces the workflow's role.</p>



<p class="wp-block-paragraph">I place a single action on the workflow palette. That action becomes the entry point for the logic, calling other actions and services. The visual workflow stays small and maintainable.</p>



<p class="wp-block-paragraph">All my workflows follow this pattern:</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-3.png"><img loading="lazy" decoding="async" width="335" height="137" src="/wp-content/uploads/2025/07/image-3.png" alt="" class="wp-image-2713" srcset="/wp-content/uploads/2025/07/image-3.png 335w, /wp-content/uploads/2025/07/image-3-300x123.png 300w" sizes="auto, (max-width: 335px) 100vw, 335px"></a></figure>



<p class="wp-block-paragraph">The corresponding XML is:</p>



<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2025/07/image-4.png"><img loading="lazy" decoding="async" width="1024" height="491" src="/wp-content/uploads/2025/07/image-4-1024x491.png" alt="" class="wp-image-2714" srcset="/wp-content/uploads/2025/07/image-4-1024x491.png 1024w, /wp-content/uploads/2025/07/image-4-300x144.png 300w, /wp-content/uploads/2025/07/image-4-768x368.png 768w, /wp-content/uploads/2025/07/image-4-640x307.png 640w, /wp-content/uploads/2025/07/image-4.png 1289w" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>



<p class="wp-block-paragraph">This structure stays largely unchanged and can be templated. Usually, only the input parameters, output parameters and referenced action need to change.</p>



<h2 class="wp-block-heading">Use development tools with actions</h2>

<p class="wp-block-paragraph">Actions also work with a broader development toolset. <a href="/series/build-tools-for-vmware-aria/" data-type="page" data-id="2390" target="_blank" rel="noopener noreferrer">Build Tools for VMware Aria</a> makes them easier to develop and maintain. It supports unit testing, linting, static analysis and integration with your preferred IDE.</p>



<p class="wp-block-paragraph">If you develop with Orchestrator, I would like to hear how you have modernised your development practices.</p>



<p class="wp-block-paragraph">Let’s share ideas and learn from each other’s experiences!</p>



