---
title: "VCF Operations Orchestrator: Auto-Document Your Actions with Ease"
description: "Generate Markdown documentation from Orchestrator actions, class wrappers and JSDoc comments in a Build Tools JavaScript project."
path: "/vcf-operations-orchestrator-auto-document-your-actions-with-ease/"
kind: "post"
published: "2025-07-03T08:40:52Z"
updated: "2026-09-18T16:22:41Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator"]
tags: ["VCF Operations Orchestrator","VCF Automation"]
wordpressId: 2723
originalUrl: "https://simplygeek.co.uk/vcf-operations-orchestrator-auto-document-your-actions-with-ease/"
thumbnail: "/wp-content/uploads/2025/07/vincenzo-marotta-afG2ZF8h1OQ-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/07/vincenzo-marotta-afG2ZF8h1OQ-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">I spend much of my time developing VCF Operations Orchestrator code. Even with a structured development process, documentation can fall behind frequent code changes.</p>



<p class="wp-block-paragraph">I created a script to automate the documentation. It needed to meet these requirements:</p>



<ul class="wp-block-list">
<li>Generate Markdown (.md) files compatible with GitLab, GitHub and Azure DevOps Wiki.</li>



<li>Extend Build Tools for VMware Aria.</li>



<li>Use NodeJS, which is already required by Build Tools for VMware Aria.</li>



<li>Require few or no dependencies.</li>



<li>Read and process checked-out source code.</li>



<li>Handle standard actions, class wrapper actions, prototypes and inline methods.</li>



<li>Support JSDoc tags.</li>



<li>Use the code's module hierarchy for the documentation.</li>
</ul>



<p class="wp-block-paragraph">The <a href="https://github.com/simplygeekuk/vcf-operations-orchestrator-doc-generator" target="_blank" rel="noopener noreferrer">vcf-operations-orchestrator-doc-generator repository</a> contains the tool and usage instructions. <strong>It requires code managed with Build Tools for VMware Aria in a JS-Based Actions-Only Project.</strong></p>



<p class="wp-block-paragraph">The documentation tool provides the following features:</p>



<ul class="wp-block-list">
<li>Documents actions used as class wrappers.</li>



<li>Groups standard actions into one document per parent directory.</li>



<li>Includes the module path.</li>



<li>Detects class inheritance (extends).</li>



<li>Documents prototype-based and inline functions.</li>



<li>Documents all parameters and returns.</li>



<li>Preserves examples with JavaScript syntax highlighting.</li>



<li>Produces Markdown (md) files.</li>



<li>Creates a root-level README linking to all sub-pages.</li>



<li>Matches the documentation folder structure to the code hierarchy.</li>



<li>Integrates with a pipeline to publish to systems such as Azure DevOps Wiki.</li>
</ul>



<p class="wp-block-paragraph">If you’re not using the Build Tools, Mayank Goyal has created a tool called <a href="https://cloudblogger.co.in/2025/04/29/vrodoc/" data-type="link" data-id="https://cloudblogger.co.in/2025/04/29/vrodoc/" target="_blank" rel="noopener noreferrer">VRODoc </a>that can connect to Orchestrator and document Actions in a package.</p>



<p class="wp-block-paragraph">If you want to document your Workflows, Josh Broadway also has a tool, <a href="https://broad-automation.com/vcf-automation-orchestrator-automated-workflow-documentation/?i=1" target="_blank" rel="noopener noreferrer">vcf-automation-orchestrator-automated-workflow-documentation</a>.</p>



<h3 class="wp-block-heading">Example documents</h3>



<h4 class="wp-block-heading">Class document</h4>



<p class="wp-block-paragraph">ActiveDirectoryService.md documents a class and all its methods in one file.</p>



<figure class="wp-block-image size-large is-resized"><a href="/wp-content/uploads/2025/07/image-5.png"><img loading="lazy" decoding="async" width="855" height="1024" src="/wp-content/uploads/2025/07/image-5-855x1024.png" alt="" class="wp-image-2733" srcset="/wp-content/uploads/2025/07/image-5-855x1024.png 855w, /wp-content/uploads/2025/07/image-5-250x300.png 250w, /wp-content/uploads/2025/07/image-5-768x920.png 768w, /wp-content/uploads/2025/07/image-5-640x767.png 640w, /wp-content/uploads/2025/07/image-5.png 885w" sizes="auto, (max-width: 855px) 100vw, 855px"></a></figure>



<h4 class="wp-block-heading">Standard action document</h4>



<p class="wp-block-paragraph">vm.md documents the com.simplygeek.vcenter.vm module. It presents each action in that module as a function.</p>



<figure class="wp-block-image size-large is-resized"><a href="/wp-content/uploads/2025/07/image-6.png"><img loading="lazy" decoding="async" width="741" height="1024" src="/wp-content/uploads/2025/07/image-6-741x1024.png" alt="" class="wp-image-2734" srcset="/wp-content/uploads/2025/07/image-6-741x1024.png 741w, /wp-content/uploads/2025/07/image-6-217x300.png 217w, /wp-content/uploads/2025/07/image-6-640x884.png 640w, /wp-content/uploads/2025/07/image-6.png 765w" sizes="auto, (max-width: 741px) 100vw, 741px"></a></figure>



<h4 class="wp-block-heading">Top-level README (table of contents)</h4>



<p class="wp-block-paragraph">README.md provides a top-level table of contents for all generated files.</p>



<figure class="wp-block-image size-large is-resized"><a href="/wp-content/uploads/2025/07/image-7.png"><img loading="lazy" decoding="async" width="540" height="1024" src="/wp-content/uploads/2025/07/image-7-540x1024.png" alt="" class="wp-image-2735" srcset="/wp-content/uploads/2025/07/image-7-540x1024.png 540w, /wp-content/uploads/2025/07/image-7-158x300.png 158w, /wp-content/uploads/2025/07/image-7.png 560w" sizes="auto, (max-width: 540px) 100vw, 540px"></a></figure>



<p class="wp-block-paragraph">The script generates documentation automatically. I can integrate it into my pipeline and publish the output to my preferred wiki.</p>



<p class="wp-block-paragraph">I hope this helps you automate your documentation. This is the initial release, so there may be issues. I welcome feedback and will help where I can.</p>



<p class="wp-block-paragraph">Please feel free to reach out with any questions or suggestions.</p>





