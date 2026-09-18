---
title: "VCF Automation – Build Tools for VMware Aria – Visual Studio Code Integration"
description: "The Build Tools for VMware Aria project has developed an Extension for Visual Studio Code that provides native integration directly in the IDE. Using VSCode with this extension will provide the following features when developing code for…"
path: "/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/"
kind: "post"
published: "2025-06-24T14:23:07Z"
updated: "2025-06-24T14:30:45Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria","Development","Visual Studio Code"]
tags: ["VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria"]
wordpressId: 2657
originalUrl: "https://simplygeek.co.uk/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/"
---


<p class="wp-block-paragraph">The Build Tools for VMware Aria project has developed an Extension for Visual Studio Code that provides native integration directly in the IDE. Using VSCode with this extension will provide the following features when developing code for your VCF Automation environment:</p>



<ul class="wp-block-list">
<li>Change active profile (environment switching);</li>



<li>Create projects;</li>



<li>Intellisense support (<strong>caveats!</strong>);</li>



<li>Browse and fetch Orchestrator content;</li>



<li>Run JavaScript Actions (<strong>more caveats</strong>);</li>
</ul>



<p class="wp-block-paragraph">I have had quite a few issues with the plugin and found that it provides limited support. The biggest benefit of using the Build Tools is that the code can be managed in VSCode to begin with.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_88 ez-toc-wrap-left counter-hierarchy ez-toc-counter ez-toc-transparent ez-toc-container-direction">
<div class="ez-toc-title-container">
<p class="ez-toc-title">Page Contents</p>
<span class="ez-toc-title-toggle"></span></div>
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-1" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Install_the_vRealize_Developer_Tools_extension_for_Visual_Studio_Code">Install the vRealize Developer Tools extension for Visual Studio Code</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-2" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Change_Active_Profile">Change Active Profile</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-3" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Create_Projects">Create Projects</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-4" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Intellisense_Support">Intellisense Support</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-5" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Browse_and_Fetch_Orchestrator_Content">Browse and Fetch Orchestrator Content</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-6" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Run_JavaScript_Actions">Run JavaScript Actions</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-7" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Other_commands">Other commands</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Install_the_vRealize_Developer_Tools_extension_for_Visual_Studio_Code"></span>Install the vRealize Developer Tools extension for Visual Studio Code<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The vRealize Developer Tools extension for Visual Studio Code can be installed from the <a href="https://marketplace.visualstudio.com/items?itemName=vmware-pscoe.vrealize-developer-tools" data-type="link" data-id="https://marketplace.visualstudio.com/items?itemName=vmware-pscoe.vrealize-developer-tools" target="_blank" rel="noopener noreferrer">VS Marketplace</a>.</p>



<p class="wp-block-paragraph">Restart Visual Studio Code after the extension has been installed, as I had issues when I didn’t do this.</p>



<p class="wp-block-paragraph">You will also need to ensure that the extension uses the same version as your projects. Click the cog icon on the vRealize Develop Tools extension page and select ‘<strong>Extension Settings</strong>‘.</p>



<figure class="wp-block-image is-style-default"><a href="/wp-content/uploads/2024/01/image-19.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1074" height="567" src="/wp-content/uploads/2024/01/image-19.png" alt="" class="wp-image-2477" srcset="/wp-content/uploads/2024/01/image-19.png 1074w, /wp-content/uploads/2024/01/image-19-300x158.png 300w, /wp-content/uploads/2024/01/image-19-1024x541.png 1024w, /wp-content/uploads/2024/01/image-19-768x405.png 768w, /wp-content/uploads/2024/01/image-19-640x338.png 640w" sizes="auto, (max-width: 1074px) 100vw, 1074px"></a></figure>



<p class="wp-block-paragraph">On the Extension Settings page, change the <strong>Build Tools Default Version</strong> to the desired version (or use the latest, in my case, 4.2.1).</p>



<figure class="wp-block-image size-full is-style-default"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">To access all of the available commands provided by the plugin, open the command palette and search for ‘vrealize’.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<h2 class="wp-block-heading has-text-align-left"><span class="ez-toc-section" id="Change_Active_Profile"></span>Change Active Profile<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The command ‘<strong>vRealize: Change Active Profile</strong>‘ can be used to change the active profile, i.e. the active connection to a VCF Automation and VCF Operations Orchestrator instance.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Profiles are those that have been defined in the Maven <strong>settings.xml</strong> file.</p>



<p class="wp-block-paragraph">If you need to view content from a specific environment, then changing the active profile is handy. Other than this, I don’t see any other use case.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Create_Projects"></span>Create Projects<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The command ‘<strong>vRealize: New Project</strong>‘ can be used to create new Build Tools-supported projects. The projects that you can create are covered in part 2 of this series, <a href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/" data-type="post" data-id="2653">VCF Automation – Build Tools for VMware Aria – Overview of VCF Automation Projects</a></p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Select the project that you are interested in. I have selected the <strong>vRO JavaScript-based</strong> in this example.</p>



<p class="wp-block-paragraph">Provide the <strong>group ID</strong> (<strong>com.simplygeek</strong> in my example)</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-22.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="603" height="106" src="/wp-content/uploads/2024/01/image-22.png" alt="" class="wp-image-2482" srcset="/wp-content/uploads/2024/01/image-22.png 603w, /wp-content/uploads/2024/01/image-22-300x53.png 300w" sizes="auto, (max-width: 603px) 100vw, 603px"></a></figure>



<p class="wp-block-paragraph">Provide a name for the project (<strong>vro-javascript</strong> in my example)</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">You will be prompted on where to create the new project. In my example, I have a root folder called ‘vcf-automation’ where this project will be created.</p>



<p class="wp-block-paragraph">A new VSCode window will open the new project.</p>



<figure class="wp-block-image size-large"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">You can now create the JavaScript content in this new project.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Intellisense_Support"></span>Intellisense Support<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">Intellisense support is provided for JavaScript actions via the vRO Language Server provided by the vRDT plugin. However, this has one major caveat: Only plain text username and password authentication is supported (in settings.xml). This means that if you use refresh tokens, this feature will not work.</p>



<p class="wp-block-paragraph">The code completion feature will allow any Orchestrator plugins or built-in wrapper classes to be detected within the IDE. In the example below, using <code>System.getModule</code>, you can see that module paths within my environment have been detected and displayed.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Here is another example using the Active Directory plugin.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">However, no information is provided about the parameters required.</p>



<p class="wp-block-paragraph">I don’t find this feature particularly useful, and not having support for refresh tokens is a deal-breaker. If the vRO language server is updated in the future, I will update this section.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Browse_and_Fetch_Orchestrator_Content"></span>Browse and Fetch Orchestrator Content<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">This feature of the extension is what I have found to be the most useful. On the left-hand panel of VSCode will be an icon for vRealize Developer Tools. This allows content on Orchestrator to be explored and also provides the capability to fetch remote content.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Below is an example of content being explored with a remote Workflow displayed in the IDE:</p>



<figure class="wp-block-image size-large is-style-default"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Below is another example of a remote Action being displayed in the IDE:</p>



<figure class="wp-block-image size-large"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">What I like about this example is that the Action is transpiled when it is displayed in the IDE.</p>



<p class="wp-block-paragraph">Finally, one more example displaying the Orchestrator inventory:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Run_JavaScript_Actions"></span>Run JavaScript Actions<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">For a <strong>vRO JavaScript-based</strong> project, it is possible to run Actions directly from the IDE. When an Action is opened, an icon is visible in the top right side of the editor that looks like a lightning bolt.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">But there is a catch: Actions with parameters are not supported (apparently, this will be coming in a future version of the vRDT extension). When running such an Action, the output similar to the below is displayed:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">There is no output, and the Action didn’t run because the parameters were not provided.</p>



<p class="wp-block-paragraph">A workaround for this would be to create a temporary JS file that acts as a wrapper for the Action you wish to run. This does have the limitation that the Action you want to run must already be present on Orchestrator (has been pushed from the local repository to the Orchestrator instance).</p>



<p class="wp-block-paragraph">To demonstrate this, I have created an Action called ‘<strong>runActionWithParams</strong>‘ in Orchestrator that accepts two parameters, x and y, and prints these to the console. I have created a wrapper JavaScript file locally to run this Action</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Which has the following output:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">This is another feature which I feel has limited need, and it’s easier to run the Actions within the Orchestrator appliance.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Other_commands"></span>Other commands<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">Any command made available with the vRDT extension that I have not covered in this post is because it did not work in my environment.</p>



<p class="wp-block-paragraph">I hope this has provided some insight into the vRealize Developer Tools extension. If you have had different experiences or if you feel there is something I have missed that you find useful, then please comment and share.</p>

