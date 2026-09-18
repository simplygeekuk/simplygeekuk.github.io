---
title: "Logger for better Logs in VCF Operations Orchestrator"
description: "VCF Automation Orchestrator has a limitation with console logging because there is no way to dynamically output the name of an action or sub-workflow. The statement this.workflow.name can be used to get the name of a top-level workflow,…"
path: "/logger-for-better-logs-in-vcf-operations-orchestrator/"
kind: "post"
published: "2025-06-24T15:04:26Z"
updated: "2025-07-03T21:32:12Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Operations Orchestrator"]
tags: ["VCF Operations Orchestrator"]
wordpressId: 2672
originalUrl: "https://simplygeek.co.uk/logger-for-better-logs-in-vcf-operations-orchestrator/"
thumbnail: "/wp-content/uploads/2025/06/petri-r-jEQ6bbVh5OQ-unsplash-150x150.jpg"
featuredImage: "/wp-content/uploads/2025/06/petri-r-jEQ6bbVh5OQ-unsplash-scaled.jpg"
---


<p class="wp-block-paragraph">VCF Automation Orchestrator has a limitation with console logging because there is no way to dynamically output the name of an action or sub-workflow. The statement <code>this.workflow.name</code> can be used to get the name of a top-level workflow, but the same value would be used for all sub-workflows and Actions.</p>



<p class="wp-block-paragraph">Several years ago, I wrote a post on my Simplygeek blog, demonstrating my solution to this problem. I still believe this is the best option available and will work without limitations.</p>



<p class="wp-block-paragraph">My solution was to create a Logger class that can be imported into every Action and Workflow. This method allows for a standardised logging experience.</p>



<p class="wp-block-paragraph"><strong>You can download my Logger module as a package <a href="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.logger.package" data-type="link" data-id="https://github.com/simplygeekuk/vcf-automation-native/raw/refs/heads/main/packages/com.simplygeek.logger.package" target="_blank" rel="noopener noreferrer">here </a>or as native JS <a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/vcf/orchestrator/logging/Logger.js" data-type="link" data-id="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/source/vro-actions/src/main/resources/com/simplygeek/vcf/orchestrator/logging/Logger.js" target="_blank" rel="noopener noreferrer">here</a>.</strong></p>



<p class="wp-block-paragraph">Below is an example of my Logger class being used on an Action called ‘<strong>addComputerToAD</strong>‘ that adds a computer object to Active Directory:</p>



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



<p class="wp-block-paragraph">In the example above, you can see multiple Actions sending log messages and the log type used (INFO, DEBUG and WARNING). These are additional Actions that are called from ‘addComputerToAD’. This makes the source of the log messages very clear and helps with troubleshooting.</p>



<p class="wp-block-paragraph">Using Logger in an Action or Workflow simply requires the following to import the module, which should be added at the very top of an Action or Workflow scriptable task.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>var log = new (System.getModule("com.simplygeek.vcf.orchestrator.logging").Logger())(
    "Action",
    "myTestAction"
);</code></pre>



<p class="wp-block-paragraph">You will need to set the two parameters as follows:</p>



<p class="wp-block-paragraph"><strong>Parameters:</strong></p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>logSource</td><td>string</td><td>The source of the log. Must be set to ‘Action’ or ‘Workflow’</td></tr><tr><td>logName</td><td>string</td><td>The name of the log message (the name of the Action or Workflow).</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">A new instance of the Logger class will be created and exposed by the variable ‘<strong>log</strong>‘ that can be used to send the log messages. Note that ‘<strong>log</strong>‘ can be changed to any value you require.</p>



<p class="wp-block-paragraph">The only downside is that the logName has to be manually set to the actual name of the Action (but this can easily be handled with a Jasmine unit test). If the Action was renamed, then the logMessage value would also need to be updated. For the 1000’s of Actions that I have written, this has been a very minor issue. Note that using <code>arguments.callee</code> to get the Action name dynamically causes problems with nested Actions.</p>



<p class="wp-block-paragraph">To send a log message to the console, choose from one of the available methods, as follows:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>log.info("my log test");
log.warn("my log test");
log.error("my log test");
log.debug("my log test");</code></pre>



<p class="wp-block-paragraph">The example above outputs the following:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<h2 class="wp-block-heading">Alternative Logging Methods</h2>



<p class="wp-block-paragraph">There is a logging alternative using the built-in <strong>setLogMarker </strong>method provided by the <strong>System </strong>class. LogMarker allows you to pass a string as a parameter to the <strong>setLogMarker </strong>method to set the prefix value for all log messages that follow.</p>



<p class="wp-block-paragraph">The problem with using LogMarker is that it can throw errors if the Action is executed from the UI or if Actions are nested (calling one Action from another) with more complex deployments. These are deal breakers for me, as this is how most of my code is structured.</p>



<p class="wp-block-paragraph">You can find the details of the <strong>setLogMarker </strong>method at <a href="https://www.vroapi.com/Method/Intrinsics/1.0.0/System/setLogMarker" data-type="link" data-id="https://www.vroapi.com/Method/Intrinsics/1.0.0/System/setLogMarker" target="_blank" rel="noopener noreferrer">vroapi</a>.</p>



<p class="wp-block-paragraph">You can also read more about its implementation at <a href="https://cloudblogger.co.in/2023/03/23/vro-logmarker-better-than-logger-action/" data-type="link" data-id="https://cloudblogger.co.in/2023/03/23/vro-logmarker-better-than-logger-action/" target="_blank" rel="noopener noreferrer">CloudBlogger</a>.</p>



<p class="wp-block-paragraph">Thanks for reading, and please let me know your thoughts or if you found this post useful.</p>

