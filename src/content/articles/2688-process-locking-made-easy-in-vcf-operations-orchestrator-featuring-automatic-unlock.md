---
title: "Process locking made easy in VCF Operations Orchestrator, featuring automatic unlock"
description: "Use LockingService to create and remove Orchestrator locks, configure retries and optionally remove stale locks after the retry limit."
path: "/process-locking-made-easy-in-vcf-operations-orchestrator-featuring-automatic-unlock/"
kind: "post"
published: "2025-06-24T15:31:14Z"
updated: "2026-09-18T16:22:41Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VCF Operations Orchestrator"]
tags: ["VCF Operations Orchestrator"]
wordpressId: 2688
originalUrl: "https://simplygeek.co.uk/process-locking-made-easy-in-vcf-operations-orchestrator-featuring-automatic-unlock/"
thumbnail: "/wp-content/uploads/2025/06/flyd-zAhAUSdRLJ8-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/06/flyd-zAhAUSdRLJ8-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">VCF Operations Orchestrator has a built-in locking semaphore provided by the <strong>LockingSystem </strong>class. When a lock is created, the workflow is placed into a waiting state, and any additional executions of the workflow will be placed in a queue until the lock is released.</p>



<p class="wp-block-paragraph">Locking protects data consistency by preventing multiple processes from updating the same resource at once. This matters when concurrent workflows share resources.</p>



<p class="wp-block-paragraph">The <strong>LockingSystem </strong>method <strong>lock</strong> attempts to acquire a lock for a given lockId and owner. It returns true if successful, or false otherwise.</p>



<p class="wp-block-paragraph"><strong>LockAndWait</strong> waits indefinitely if it cannot acquire a lock. I use <strong>lock</strong> instead because it allows a timeout or other corrective handling. Release an acquired lock with <strong>unlock</strong>.</p>



<p class="wp-block-paragraph">My <strong>LockingService </strong>extends <strong>LockingSystem </strong>with these features:</p>



<ul class="wp-block-list">
<li>Retries failed lock attempts with a configurable delay in seconds. The defaults are 5 attempts and 60 seconds. Configure the wait time independently for each use case.</li>



<li>Can remove an existing lock automatically after the maximum attempts. This helps when a failed workflow run leaves a stale lock.</li>
</ul>



<p class="wp-block-paragraph"><strong>You can download my LockingService module as a package&nbsp;<a href="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.locking.package" target="_blank" rel="noopener noreferrer">here&nbsp;</a>or as native JS&nbsp;<a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/vcf/orchestrator/locking/LockingService.js" target="_blank" rel="noopener noreferrer">here</a>.</strong></p>



<h2 class="wp-block-heading">Use LockingService</h2>



<p class="wp-block-paragraph">Import LockingService into an action or workflow with the following code:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>    var locking = new (System.getModule("com.simplygeek.vcf.orchestrator.locking").LockingService());</code></pre>



<p class="wp-block-paragraph">The code creates a <strong>LockingService</strong> instance in <strong>locking</strong>. Use that variable to create and remove locks, or rename it if needed.</p>



<h3 class="wp-block-heading">Available methods</h3>



<p class="wp-block-paragraph">Use these <strong>LockingService </strong>methods to create and remove locks:</p>



<h4 class="wp-block-heading">createLock</h4>



<p class="wp-block-paragraph">locking.<strong>createLock</strong>(lockOwner, lockId, retryMaxAttempts, retryDelay, autoRemoveLock) → {Boolean}</p>



<p class="wp-block-paragraph"><strong>Parameters</strong>:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>lockOwner</td><td>String</td><td>The lock owner</td></tr><tr><td>lockId</td><td>String</td><td>The unique (per lock) id</td></tr><tr><td>retryMaxAttempts</td><td>Number</td><td>OPTIONAL – The maximum number of attempts to retry lock (default 5)</td></tr><tr><td>retryDelay</td><td>Number</td><td>The delay between retry attempts (default 60 seconds)</td></tr><tr><td>autoRemoveLock</td><td>Boolean</td><td>Automatically remove the lock if one is already present and the max retry attempts have been reached. A new lock is created (default true)</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Returns a boolean.</p>



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

