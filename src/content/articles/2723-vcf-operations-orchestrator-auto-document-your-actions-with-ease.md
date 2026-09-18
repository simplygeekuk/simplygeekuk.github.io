---
title: "VCF Operations Orchestrator: Auto-Document Your Actions with Ease"
description: "I spend a significant amount of time developing code for VCF Operations Orchestrator, and while I follow a strict and structured development process, documentation often falls behind. Keeping documentation up to date is an ongoing…"
path: "/vcf-operations-orchestrator-auto-document-your-actions-with-ease/"
kind: "post"
published: "2025-07-03T08:40:52Z"
updated: "2025-07-03T22:17:32Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator"]
tags: ["VCF Operations Orchestrator","VCF Automation"]
wordpressId: 2723
originalUrl: "https://simplygeek.co.uk/vcf-operations-orchestrator-auto-document-your-actions-with-ease/"
thumbnail: "/wp-content/uploads/2025/07/vincenzo-marotta-afG2ZF8h1OQ-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/07/vincenzo-marotta-afG2ZF8h1OQ-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">I spend a significant amount of time developing code for VCF Operations Orchestrator, and while I follow a strict and structured development process, documentation often falls behind. Keeping documentation up to date is an ongoing challenge as it’s difficult to maintain and keep up with frequent code changes.</p>



<p class="wp-block-paragraph">To solve this, I decided it was time to automate the documentation process and created a script to achieve this. When I set out to build this solution, I had a clear set of requirements I wanted it to meet:</p>



<ul class="wp-block-list">
<li>Generate markdown (.md) files that are compatible with GitLab/GitHub/Azure Devops Wiki</li>



<li>Act as an extension to the Build Tools for VMware Aria;</li>



<li>Use NodeJS, as this would already be available when using Build Tools for VMware Aria;</li>



<li>Require little or no dependencies;</li>



<li>Able to read and process checked-out source code;</li>



<li>Handle standard Actions, Class wrapper Actions, prototypes and inline methods;</li>



<li>Support JSDoc tags;</li>



<li>Honours the module hierarchy (use the same hierarchy for documents);</li>
</ul>



<p class="wp-block-paragraph">You can find my documentation tool here: <a href="https://github.com/simplygeekuk/vcf-operations-orchestrator-doc-generator" target="_blank" rel="noopener noreferrer">vcf-operations-orchestrator-doc-generator</a>, along with instructions on how to use the script. <strong>Please note that you must be managing your code using the Build Tools for VMware Aria using a JS-Based Actions-Only Project</strong>.</p>



<p class="wp-block-paragraph">The documentation tool provides the following features:</p>



<ul class="wp-block-list">
<li>Documents Actions that are used as Class wrappers</li>



<li>Documents standard Actions and creates a single document based on the parent directory</li>



<li>Adds the module path</li>



<li>For Classes, detects inheritance (extends)</li>



<li>Documents all functions (prototype-based and inline)</li>



<li>Documents all parameters and returns</li>



<li>Preserves examples and displays them in JavaScript highlighting</li>



<li>Outputs in Markdown (md) files</li>



<li>Creates a root-level README linking to all sub-pages</li>



<li>Documentation folder structure honours the code hierarchy</li>



<li>Easily integrated into a pipeline and pushed to supporting systems such as Azure DevOps Wiki</li>
</ul>



<p class="wp-block-paragraph">If you’re not using the Build Tools, Mayank Goyal has created a tool called <a href="https://cloudblogger.co.in/2025/04/29/vrodoc/" data-type="link" data-id="https://cloudblogger.co.in/2025/04/29/vrodoc/" target="_blank" rel="noopener noreferrer">VRODoc </a>that can connect to Orchestrator and document Actions in a package.</p>



<p class="wp-block-paragraph">If you want to document your Workflows, Josh Broadway also has a tool, <a href="https://broad-automation.com/vcf-automation-orchestrator-automated-workflow-documentation/?i=1" target="_blank" rel="noopener noreferrer">vcf-automation-orchestrator-automated-workflow-documentation</a>.</p>



<h3 class="wp-block-heading">Example documents that are created:</h3>



<h4 class="wp-block-heading">Class Document</h4>



<p class="wp-block-paragraph">ActiveDirectoryService.md – A single file that documents a class and all methods.</p>



<figure class="wp-block-image size-large is-resized"><a href="/wp-content/uploads/2025/07/image-5.png"><img loading="lazy" decoding="async" width="855" height="1024" src="/wp-content/uploads/2025/07/image-5-855x1024.png" alt="" class="wp-image-2733" srcset="/wp-content/uploads/2025/07/image-5-855x1024.png 855w, /wp-content/uploads/2025/07/image-5-250x300.png 250w, /wp-content/uploads/2025/07/image-5-768x920.png 768w, /wp-content/uploads/2025/07/image-5-640x767.png 640w, /wp-content/uploads/2025/07/image-5.png 885w" sizes="auto, (max-width: 855px) 100vw, 855px"></a></figure>



<h4 class="wp-block-heading">Standard Action Document</h4>



<p class="wp-block-paragraph">vm.md – A single file to represent the module path “com.simplygeek.vcenter.vm” where all Actions within the module are presented as documented “functions”.</p>



<figure class="wp-block-image size-large is-resized"><a href="/wp-content/uploads/2025/07/image-6.png"><img loading="lazy" decoding="async" width="741" height="1024" src="/wp-content/uploads/2025/07/image-6-741x1024.png" alt="" class="wp-image-2734" srcset="/wp-content/uploads/2025/07/image-6-741x1024.png 741w, /wp-content/uploads/2025/07/image-6-217x300.png 217w, /wp-content/uploads/2025/07/image-6-640x884.png 640w, /wp-content/uploads/2025/07/image-6.png 765w" sizes="auto, (max-width: 741px) 100vw, 741px"></a></figure>



<h4 class="wp-block-heading">Top-Level README (TOC):</h4>



<p class="wp-block-paragraph">README.md – Top-level file that acts as a table of contents for all the produced files.</p>



<figure class="wp-block-image size-large is-resized"><a href="/wp-content/uploads/2025/07/image-7.png"><img loading="lazy" decoding="async" width="540" height="1024" src="/wp-content/uploads/2025/07/image-7-540x1024.png" alt="" class="wp-image-2735" srcset="/wp-content/uploads/2025/07/image-7-540x1024.png 540w, /wp-content/uploads/2025/07/image-7-158x300.png 158w, /wp-content/uploads/2025/07/image-7.png 560w" sizes="auto, (max-width: 540px) 100vw, 540px"></a></figure>



<p class="wp-block-paragraph">After many sleep-deprived nights, I now have a solution that generates documentation automatically, that I can seamlessly integrate into my pipeline and publish directly to my preferred wiki.</p>



<p class="wp-block-paragraph">I hope that by sharing this solution, I can help others automate their documentation. As this is the initial release, there may be some issues, but I welcome your feedback and will do my best to support.</p>



<p class="wp-block-paragraph">Please feel free to reach out with any questions or suggestions.</p>





