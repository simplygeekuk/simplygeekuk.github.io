---
title: "Logger for better Logs in VCF Operations Orchestrator"
description: "Use a reusable Logger class to identify Orchestrator actions and workflows in console logs, with examples and a comparison to setLogMarker."
path: "/logger-for-better-logs-in-vcf-operations-orchestrator/"
kind: "post"
published: "2025-06-24T15:04:26Z"
updated: "2026-09-18T16:22:40Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Operations Orchestrator"]
tags: ["VCF Operations Orchestrator"]
wordpressId: 2672
originalUrl: "https://simplygeek.co.uk/logger-for-better-logs-in-vcf-operations-orchestrator/"
thumbnail: "/wp-content/uploads/2025/06/petri-r-jEQ6bbVh5OQ-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/06/petri-r-jEQ6bbVh5OQ-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">VCF Operations Orchestrator cannot dynamically include an action or sub-workflow name in console logs. The expression <code>this.workflow.name</code> returns the top-level workflow name, even inside sub-workflows and actions.</p>



<p class="wp-block-paragraph">I described my solution on SimplyGeek several years ago. I still consider it the best option and believe it avoids these logging limitations.</p>



<p class="wp-block-paragraph">My Logger class provides consistent logging across actions and workflows. Import it wherever you need to identify the source of a message.</p>



<p class="wp-block-paragraph"><strong>You can download my Logger module as a package <a href="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.logger.package" data-type="link" data-id="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.logger.package" target="_blank" rel="noopener noreferrer">here </a>or as native JS <a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/vcf/orchestrator/logging/Logger.js" data-type="link" data-id="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/vcf/orchestrator/logging/Logger.js" target="_blank" rel="noopener noreferrer">here</a>.</strong></p>



<p class="wp-block-paragraph">This example uses Logger in <strong>addComputerToAD</strong>, an action that adds a computer object to Active Directory:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="false" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>+00:00 INFO [Action: WindowsConfigService] Get activeDirectoryDomainName
+00:00 INFO [Action: WindowsConfigService] Found activeDirectoryDomainName: FREELANCERCOLO
+00:00 INFO [Action: WindowsConfigService] Get activeDirectoryServerOUDN
+00:00 INFO [Action: WindowsConfigService] Found activeDirectoryServerOUDN: OU=Windows,OU=flc-servers,DC=freelancercolo,DC=local
+00:00 INFO [Action: addComputerToAD] activeDirectoryDomainName: FREELANCERCOLO
+00:00 INFO [Action: addComputerToAD] activeDirectoryServerOUDN: OU=Windows,OU=flc-servers,DC=freelancercolo,DC=local
+00:00 INFO [Action: addComputerToAD] activeDirectoryServerOUName: Windows
+00:00 INFO [Action: addComputerToAD] Creating Active Directory computer account 'flcgs10' in OU path 'OU=Windows,OU=flc-servers,DC=freelancercolo,DC=local'
+00:00 DEBUG [Action: ActiveDirectoryService] Get Active Directory Host with name 'FREELANCERCOLO'
+00:00 DEBUG [Action: ActiveDirectoryService] Found Active Directory host 'FREELANCERCOLO'
+00:00 DEBUG [Action: ActiveDirectoryService] Finding Active Directory object with name 'Windows' of type 'OrganizationalUnit'
+00:00 DEBUG [Action: ActiveDirectoryService] Extending search using Distinguished Name 'OU=Windows,OU=flc-servers,DC=freelancercolo,DC=local'
+00:00 DEBUG [Action: ActiveDirectoryService] Finding Active Directory object with name 'flcgs10' of type 'ComputerAD'
+00:00 WARNING [Action: ActiveDirectoryService] No Active Directory object found for 'flcgs10' of type 'ComputerAD'
+00:00 DEBUG [Action: ActiveDirectoryService] Finding Active Directory object with name 'flcgs10' of type 'ComputerAD'
+00:00 DEBUG [Action: ActiveDirectoryService] Found Active Directory object: flcgs10
+00:00 INFO [Action: addComputerToAD] Successfully created Active Directory computer account.</code></pre>



<p class="wp-block-paragraph">The output identifies messages from addComputerToAD and the actions it calls, with INFO, DEBUG and WARNING log types. This makes each message's source clear and helps with troubleshooting.</p>



<p class="wp-block-paragraph">To import Logger, add the following code at the top of the action or workflow scriptable task:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
    "Action",
    "myTestAction"
);</code></pre>



<p class="wp-block-paragraph">Set these two parameters:</p>



<p class="wp-block-paragraph"><strong>Parameters:</strong></p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>logSource</td><td>string</td><td>The source of the log. Must be set to ‘Action’ or ‘Workflow’</td></tr><tr><td>logName</td><td>string</td><td>The name of the log message (the name of the Action or Workflow).</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">The code creates a Logger instance in <strong>log</strong>. Use that variable to send messages, or rename it if needed.</p>



<p class="wp-block-paragraph">Set logName manually to the action's name. A Jasmine unit test can check this. If you rename the action, you also need to update logMessage. Across the thousands of actions I have written, this has been a minor issue.</p>

<p class="wp-block-paragraph">Using <code>arguments.callee</code> to retrieve the action name dynamically causes problems with nested actions.</p>



<p class="wp-block-paragraph">Use one of the following methods to send a console message:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>log.info("my log test");
log.warn("my log test");
log.error("my log test");
log.debug("my log test");</code></pre>



<p class="wp-block-paragraph">The example above outputs the following:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<h2 class="wp-block-heading">Alternative logging methods</h2>



<p class="wp-block-paragraph">The <strong>System </strong>class also provides <strong>setLogMarker </strong>. Pass a string to <strong>setLogMarker </strong>to set the prefix for subsequent log messages.</p>



<p class="wp-block-paragraph">In more complex deployments, LogMarker can throw errors when an action runs from the UI or calls nested actions. These limitations rule it out for me because most of my code uses that structure.</p>



<p class="wp-block-paragraph">You can find the details of the <strong>setLogMarker </strong>method at <a href="https://www.vroapi.com/Method/Intrinsics/1.0.0/System/setLogMarker" data-type="link" data-id="https://www.vroapi.com/Method/Intrinsics/1.0.0/System/setLogMarker" target="_blank" rel="noopener noreferrer">vroapi</a>.</p>



<p class="wp-block-paragraph">You can also read more about its implementation at <a href="https://cloudblogger.co.in/2023/03/23/vro-logmarker-better-than-logger-action/" data-type="link" data-id="https://cloudblogger.co.in/2023/03/23/vro-logmarker-better-than-logger-action/" target="_blank" rel="noopener noreferrer">CloudBlogger</a>.</p>



<p class="wp-block-paragraph">Thanks for reading, and please let me know your thoughts or if you found this post useful.</p>
