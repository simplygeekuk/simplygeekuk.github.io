---
title: "VCF Operations Orchestrator: Why I Write Actions and Not Workflows (Mostly)"
description: "This might be a controversial stance, but if you’ve reviewed any of my VCF Operations Orchestrator code, you’ll notice that 99% of it is written as Actions. I take this approach because it enables me to write “pure” JavaScript code that is…"
path: "/vcf-operations-orchestrator-why-i-write-actions-and-not-workflows-mostly/"
kind: "post"
published: "2025-07-01T14:17:56Z"
updated: "2025-07-03T21:14:02Z"
author: "SimplyGeek"
categories: ["VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Development","JavaScript","Broadcom (VMware)"]
tags: ["VCF Automation","VCF Operations Orchestrator"]
wordpressId: 2693
originalUrl: "https://simplygeek.co.uk/vcf-operations-orchestrator-why-i-write-actions-and-not-workflows-mostly/"
thumbnail: "/wp-content/uploads/2025/07/jakub-zerdzicki-LMsSNDJ9Hvc-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/07/jakub-zerdzicki-LMsSNDJ9Hvc-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">This might be a controversial stance, but if you’ve reviewed any of my VCF Operations Orchestrator code, you’ll notice that 99% of it is written as Actions. I take this approach because it enables me to write “pure” JavaScript code that is easier to read, maintain, and integrate with modern development tools such as linters, unit testing frameworks, and code analysers.</p>



<p class="wp-block-paragraph">Workflows are a visual tool that provides a drag-and-drop interface used to develop automation flows without writing (much) code. It was originally intended for system administrators and infrastructure teams, who might not be traditional developers, to automate tasks on vCenter Server.</p>



<p class="wp-block-paragraph">Below is an example of a very simple Workflow with small script tasks, a for each loop and some error handling (red line).</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image.png"><img loading="lazy" decoding="async" width="637" height="537" src="/wp-content/uploads/2025/07/image.png" alt="" class="wp-image-2700" srcset="/wp-content/uploads/2025/07/image.png 637w, /wp-content/uploads/2025/07/image-300x253.png 300w" sizes="auto, (max-width: 637px) 100vw, 637px"></a></figure>



<p class="wp-block-paragraph">The challenge is that the landscape has evolved significantly since Orchestrator was first released in 2009. What began as a platform for simple scripts and automation flows has grown into a tool expected to support complex solutions, often requiring integration with dozens of disparate systems.</p>



<p class="wp-block-paragraph">This has led to a significant challenge: developers are still attempting to build automation using Orchestrator’s traditional workflow-based model. In my view, this approach is no longer suitable, as workflows have grown so large and complex that they’ve become increasingly difficult to maintain, understand, and troubleshoot.</p>



<p class="wp-block-paragraph">Let’s take a look at another Workflow example that is used to run a script on a virtual machine.</p>



<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2025/07/image-1.png"><img loading="lazy" decoding="async" width="1024" height="369" src="/wp-content/uploads/2025/07/image-1-1024x369.png" alt="" class="wp-image-2705" srcset="/wp-content/uploads/2025/07/image-1-1024x369.png 1024w, /wp-content/uploads/2025/07/image-1-300x108.png 300w, /wp-content/uploads/2025/07/image-1-768x277.png 768w, /wp-content/uploads/2025/07/image-1-1536x554.png 1536w, /wp-content/uploads/2025/07/image-1-2048x739.png 2048w, /wp-content/uploads/2025/07/image-1-640x231.png 640w" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>



<p class="wp-block-paragraph">While this is a relatively clean example (and I’ve seen far worse), it serves to illustrate what a large Workflow can look like. At first glance, it may appear manageable, but once you need to make changes, you’ll likely spend more time wrestling with the visual layout than making meaningful progress. The complexity of the visual interface quickly becomes a barrier to efficient development.</p>



<p class="wp-block-paragraph">There’s another significant issue: workflows are primarily stored as XML. When versioned in a Git repository, you’re essentially working with raw XML files. This makes development outside of the visual editor extremely cumbersome and complicates peer reviews as merge requests become difficult to read, understand, and evaluate effectively.</p>



<p class="wp-block-paragraph">Here is an example of a Workflow in XML format, which can often be several hundred, if not thousands, of lines long.</p>



<figure class="wp-block-image size-full is-resized"><a href="/wp-content/uploads/2025/07/image-2.png"><img loading="lazy" decoding="async" width="831" height="739" src="/wp-content/uploads/2025/07/image-2.png" alt="" class="wp-image-2709" srcset="/wp-content/uploads/2025/07/image-2.png 831w, /wp-content/uploads/2025/07/image-2-300x267.png 300w, /wp-content/uploads/2025/07/image-2-768x683.png 768w, /wp-content/uploads/2025/07/image-2-640x569.png 640w" sizes="auto, (max-width: 831px) 100vw, 831px"></a></figure>



<p class="wp-block-paragraph">In conclusion, Orchestrator’s traditional workflow-based development model no longer aligns with the demands of modern automation. As automation solutions grow in complexity and scale, the limitations of this approach become increasingly clear.</p>



<p class="wp-block-paragraph"><strong>My solution is simple: </strong>write Actions. By focusing on Actions, you gain the flexibility to write clean, modular JavaScript code that is easier to maintain, test, and integrate with modern development practices and tooling.</p>



<p class="wp-block-paragraph">Unfortunately, it’s not possible to eliminate Workflows entirely; for example, VCF Automation Extensibility Subscriptions require a workflow as the entry point. However, it’s entirely feasible to significantly reduce reliance on workflows by offloading most of the logic into reusable Actions.</p>



<p class="wp-block-paragraph">I address this limitation by placing only a single Action on the workflow palette. If you think of a workflow as a top-level function, then that role can just as effectively be filled by an Action. This Action can serve as the entry point, chaining together other Actions and consuming other services, while keeping the visual workflow minimal and maintainable.</p>



<p class="wp-block-paragraph">The resulting Workflow looks like this (all my workflows follow this pattern)</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-3.png"><img loading="lazy" decoding="async" width="335" height="137" src="/wp-content/uploads/2025/07/image-3.png" alt="" class="wp-image-2713" srcset="/wp-content/uploads/2025/07/image-3.png 335w, /wp-content/uploads/2025/07/image-3-300x123.png 300w" sizes="auto, (max-width: 335px) 100vw, 335px"></a></figure>



<p class="wp-block-paragraph">and the corresponding XML:</p>



<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2025/07/image-4.png"><img loading="lazy" decoding="async" width="1024" height="491" src="/wp-content/uploads/2025/07/image-4-1024x491.png" alt="" class="wp-image-2714" srcset="/wp-content/uploads/2025/07/image-4-1024x491.png 1024w, /wp-content/uploads/2025/07/image-4-300x144.png 300w, /wp-content/uploads/2025/07/image-4-768x368.png 768w, /wp-content/uploads/2025/07/image-4-640x307.png 640w, /wp-content/uploads/2025/07/image-4.png 1289w" sizes="auto, (max-width: 1024px) 100vw, 1024px"></a></figure>



<p class="wp-block-paragraph">This structure is largely static and easily templated if needed. The only elements that typically require modification are the input parameters, output parameters, and the referenced Action, everything else remains consistent.</p>



<p class="wp-block-paragraph">Another major advantage of writing Actions is the ability to leverage a broader development ecosystem. When using the <a href="/series/build-tools-for-vmware-aria/" data-type="page" data-id="2390" target="_blank" rel="noopener noreferrer">Build Tools for VMware Aria</a>, Actions become easy to develop and maintain, while also unlocking powerful capabilities such as unit testing, linting, static analysis, and full integration with your preferred IDE.</p>



<p class="wp-block-paragraph">If you’re an Orchestrator developer, I’d love to hear your perspective. What approaches have you taken to modernize your development practices on the platform?</p>



<p class="wp-block-paragraph">Let’s share ideas and learn from each other’s experiences!</p>





