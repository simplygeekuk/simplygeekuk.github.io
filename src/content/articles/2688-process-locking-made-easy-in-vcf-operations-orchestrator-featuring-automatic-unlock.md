---
title: "Process locking made easy in VCF Operations Orchestrator, featuring automatic unlock"
description: "VCF Operations Orchestrator has a built-in locking semaphore provided by the LockingSystem class. When a lock is created, the workflow is placed into a waiting state, and any additional executions of the workflow will be placed in a queue…"
path: "/process-locking-made-easy-in-vcf-operations-orchestrator-featuring-automatic-unlock/"
kind: "post"
published: "2025-06-24T15:31:14Z"
updated: "2025-07-03T21:17:10Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VCF Operations Orchestrator"]
tags: ["VCF Operations Orchestrator"]
wordpressId: 2688
originalUrl: "https://simplygeek.co.uk/process-locking-made-easy-in-vcf-operations-orchestrator-featuring-automatic-unlock/"
thumbnail: "/wp-content/uploads/2025/06/flyd-zAhAUSdRLJ8-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/06/flyd-zAhAUSdRLJ8-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">VCF Operations Orchestrator has a built-in locking semaphore provided by the <strong>LockingSystem </strong>class. When a lock is created, the workflow is placed into a waiting state, and any additional executions of the workflow will be placed in a queue until the lock is released.</p>



<p class="wp-block-paragraph">Locking is a useful technique that can help protect the consistency of data or prevent multiple processes from updating a resource at the same time. This is especially important when workflows run concurrently and update the same resources.</p>



<p class="wp-block-paragraph"><strong>LockingSystem </strong>provides the method <strong>‘lock</strong>‘ that will attempt to acquire a lock for a given lockId and owner. If a lock is successfully acquired, the boolean true is returned; otherwise, the return value is false.</p>



<p class="wp-block-paragraph">Another function that could have been used is ‘<strong>LockAndWait</strong>‘; however, this will wait indefinitely if the lock cannot be acquired. Using the ‘<strong>lock</strong>‘ function provides more control and allows implementing a timeout feature or taking other corrective measures. Subsequently, a lock can be released using the ‘<strong>unlock</strong>‘ method.</p>



<p class="wp-block-paragraph">I have created a <strong>LockingService </strong>that extends <strong>LockingSystem </strong>to provide additional features:</p>



<ul class="wp-block-list">
<li>Re-attempt a failed lock (default 5 attempts) with a delay specified in seconds (default 60 seconds). This will allow the amount of time to wait for a lock to be configured independently for every use case;</li>



<li>Option to automatically remove an existing lock once the max attempts have been reached. This can be useful if a previous workflow run has failed, leaving behind a stale lock.</li>
</ul>



<p class="wp-block-paragraph"><strong>You can download my LockingService module as a package&nbsp;<a href="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.locking.package" target="_blank" rel="noopener noreferrer">here&nbsp;</a>or as native JS&nbsp;<a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/vcf/orchestrator/locking/LockingService.js" target="_blank" rel="noopener noreferrer">here</a>.</strong></p>



<h2 class="wp-block-heading">Using the LockingService</h2>



<p class="wp-block-paragraph">Using the LockingService in an Action or Workflow simply requires the following to import the module:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>    var locking = new (System.getModule("com.simplygeek.vcf.orchestrator.locking").LockingService());</code></pre>



<p class="wp-block-paragraph">A new instance of the <strong>LockingService</strong> class will be created and exposed by the variable ‘<strong>locking</strong>, which can be used to create and remove locks. Note that ‘<strong>locking</strong>‘ can be changed to any value you require.</p>



<h3 class="wp-block-heading">Available Methods</h3>



<p class="wp-block-paragraph">To use <strong>LockingService </strong>to create and remove locks, use one of the following methods:</p>



<h4 class="wp-block-heading">createLock</h4>



<p class="wp-block-paragraph">locking.<strong>createLock</strong>(lockOwner, lockId, retryMaxAttempts, retryDelay, autoRemoveLock) → {Boolean}</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>lockOwner</td><td>String</td><td>The lock owner</td></tr><tr><td>lockId</td><td>String</td><td>The unique (per lock) id</td></tr><tr><td>retryMaxAttempts</td><td>Number</td><td>OPTIONAL – The maximum number of attempts to retry lock (default 5)</td></tr><tr><td>retryDelay</td><td>Number</td><td>The delay between retry attempts (default 60 seconds)</td></tr><tr><td>autoRemoveLock</td><td>Boolean</td><td>Automatically remove the lock if one is already present and the max retry attempts have been reached. A new lock is created (default true)</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Returns a boolean</p>



<h4 class="wp-block-heading">removeLock</h4>



<p class="wp-block-paragraph">locking.<strong>removeLock</strong>(lockOwner, lockId)</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>lockOwner</td><td>String</td><td>The lock owner</td></tr><tr><td>lockId</td><td>String</td><td>The unique (per lock) id</td></tr></tbody></table></figure>



<h2 class="wp-block-heading">Example using default values</h2>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var locking = new (System.getModule("com.simplygeek.vcf.orchestrator.locking").LockingService());

locking.createLock("IPAM", subnetId);
// Update operation
locking.removeLock("IPAM", subnetId);</code></pre>



<h2 class="wp-block-heading">Example using custom values</h2>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var locking = new (System.getModule("com.simplygeek.vcf.orchestrator.locking").LockingService());
var retryMaxAttempts = 20;
var retryDelay = 60;
var autoRemoveLock = false;

locking.createLock("IPAM", subnetId, retryMaxAttempts, retryDelay, autoRemoveLock);
// Update operation
locking.removeLock("IPAM", subnetId);</code></pre>



<p class="wp-block-paragraph">Thanks for reading, and please let me know if you have any suggestions for improving this service.</p>

