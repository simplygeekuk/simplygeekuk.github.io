---
title: "VCF Automation – Build Tools for VMware Aria – Visual Studio Code Integration"
description: "Explore the vRealize Developer Tools extension for VS Code, including project creation, content browsing, action execution and its limitations."
path: "/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/"
kind: "post"
published: "2025-06-24T14:23:07Z"
updated: "2026-09-18T16:22:40Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria","Development","Visual Studio Code"]
tags: ["VCF Automation","VCF Operations Orchestrator","Build Tools for VMware Aria"]
wordpressId: 2657
originalUrl: "https://simplygeek.co.uk/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/"
---

<div id="ez-toc-container" class="ez-toc-v2_0_88 ez-toc-wrap-left counter-hierarchy ez-toc-counter ez-toc-transparent ez-toc-container-direction">
<div class="ez-toc-title-container">
<p class="ez-toc-title">Page Contents</p>
<span class="ez-toc-title-toggle"></span></div>
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-1" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Install_the_vRealize_Developer_Tools_extension_for_Visual_Studio_Code">Install the vRealize Developer Tools extension for Visual Studio Code</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-2" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Change_Active_Profile">Change the active profile</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-3" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Create_Projects">Create projects</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-4" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Intellisense_Support">IntelliSense support</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-5" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Browse_and_Fetch_Orchestrator_Content">Browse and fetch Orchestrator content</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-6" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Run_JavaScript_Actions">Run JavaScript actions</a></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-7" href="/vcf-automation-build-tools-for-vmware-aria-visual-studio-code-integration/#Other_commands">Other commands</a></li></ul></nav></div>


<p class="wp-block-paragraph">The Build Tools for VMware Aria project provides a Visual Studio Code extension. It adds the following features for developing VCF Automation content in the IDE:</p>



<ul class="wp-block-list">
<li>Change active profile (environment switching);</li>



<li>Create projects;</li>



<li>Intellisense support (<strong>caveats!</strong>);</li>



<li>Browse and fetch Orchestrator content;</li>



<li>Run JavaScript Actions (<strong>more caveats</strong>);</li>
</ul>



<p class="wp-block-paragraph">I encountered several issues with the extension and found its support limited. For me, the main benefit of Build Tools is already being able to manage the code in VS Code.</p>




<h2 class="wp-block-heading"><span class="ez-toc-section" id="Install_the_vRealize_Developer_Tools_extension_for_Visual_Studio_Code"></span>Install the vRealize Developer Tools extension for Visual Studio Code<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The vRealize Developer Tools extension for Visual Studio Code can be installed from the <a href="https://marketplace.visualstudio.com/items?itemName=vmware-pscoe.vrealize-developer-tools" data-type="link" data-id="https://marketplace.visualstudio.com/items?itemName=vmware-pscoe.vrealize-developer-tools" target="_blank" rel="noopener noreferrer">VS Marketplace</a>.</p>



<p class="wp-block-paragraph">Restart Visual Studio Code after installing the extension. I encountered issues when I skipped this step.</p>



<p class="wp-block-paragraph">Match the extension's Build Tools version to your projects. On its extension page, select the cog icon, then <strong>Extension Settings</strong>.</p>



<figure class="wp-block-image is-style-default"><a href="/wp-content/uploads/2024/01/image-19.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1074" height="567" src="/wp-content/uploads/2024/01/image-19.png" alt="" class="wp-image-2477" srcset="/wp-content/uploads/2024/01/image-19.png 1074w, /wp-content/uploads/2024/01/image-19-300x158.png 300w, /wp-content/uploads/2024/01/image-19-1024x541.png 1024w, /wp-content/uploads/2024/01/image-19-768x405.png 768w, /wp-content/uploads/2024/01/image-19-640x338.png 640w" sizes="auto, (max-width: 1074px) 100vw, 1074px"></a></figure>



<p class="wp-block-paragraph">Set <strong>Build Tools Default Version</strong> to the required version. I used 4.2.1, the latest version when I wrote this post.</p>



<figure class="wp-block-image size-full is-style-default"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Open the command palette and search for vrealize to see the extension's commands.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<h2 class="wp-block-heading has-text-align-left"><span class="ez-toc-section" id="Change_Active_Profile"></span>Change the active profile<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">Use <strong>vRealize: Change Active Profile</strong> to select the active connection to VCF Automation and VCF Operations Orchestrator.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Profiles are those that have been defined in the Maven <strong>settings.xml</strong> file.</p>



<p class="wp-block-paragraph">I find profile switching useful for viewing content from a specific environment. I have not found another use for it.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Create_Projects"></span>Create projects<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">Use <strong>vRealize: New Project</strong> to create a supported Build Tools project. Part 2 of this series describes the options: <a href="/vcf-automation-build-tools-for-vmware-aria-overview-of-vcf-automation-projects/" data-type="post" data-id="2653">VCF Automation – Build Tools for VMware Aria – Overview of VCF Automation Projects</a>.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Select a project type. This example uses <strong>vRO JavaScript-based</strong>.</p>



<p class="wp-block-paragraph">Enter the <strong>group ID</strong>. This example uses <strong>com.simplygeek</strong>.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-22.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="603" height="106" src="/wp-content/uploads/2024/01/image-22.png" alt="" class="wp-image-2482" srcset="/wp-content/uploads/2024/01/image-22.png 603w, /wp-content/uploads/2024/01/image-22-300x53.png 300w" sizes="auto, (max-width: 603px) 100vw, 603px"></a></figure>



<p class="wp-block-paragraph">Enter a project name. This example uses <strong>vro-javascript</strong>.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">When prompted, choose where to create the project. I use a root folder called vcf-automation.</p>



<p class="wp-block-paragraph">The project opens in a new VS Code window.</p>



<figure class="wp-block-image size-large"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">You can now create the JavaScript content in this new project.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Intellisense_Support"></span>IntelliSense support<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The vRDT extension's vRO Language Server provides IntelliSense for JavaScript actions. It supports only plain text username and password authentication in settings.xml. Code completion does not work with refresh tokens.</p>



<p class="wp-block-paragraph">Code completion detects Orchestrator plugins and built-in wrapper classes. In this example, <code>System.getModule</code> displays module paths from my environment.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Here is another example using the Active Directory plugin.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">However, no information is provided about the parameters required.</p>



<p class="wp-block-paragraph">I find this feature of limited use, particularly because it does not support refresh tokens. I will revisit this section if the vRO language server changes.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Browse_and_Fetch_Orchestrator_Content"></span>Browse and fetch Orchestrator content<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The content browser is the extension feature I find most useful. Select the vRealize Developer Tools icon in VS Code's left-hand panel to explore Orchestrator content and fetch remote files.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">This example displays a remote workflow in the IDE:</p>



<figure class="wp-block-image size-large is-style-default"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">This example displays a remote action:</p>



<figure class="wp-block-image size-large"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">The extension transpiles the action for display in the IDE, which I find useful.</p>



<p class="wp-block-paragraph">You can also browse the Orchestrator inventory:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Run_JavaScript_Actions"></span>Run JavaScript actions<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">In a <strong>vRO JavaScript-based</strong> project, open an action to run it from the IDE. The run control is a lightning bolt icon at the top right of the editor.</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">Actions with parameters are not supported. This was reportedly planned for a future vRDT release. Attempting to run one produces output like this:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">The action does not run or produce output because its parameters were not supplied.</p>



<p class="wp-block-paragraph">As a workaround, create a temporary JavaScript file that calls the action with its parameters. The target action must already exist on Orchestrator: push it from the local repository first.</p>



<p class="wp-block-paragraph">For this example, I created <strong>runActionWithParams</strong> in Orchestrator. It accepts x and y and prints them to the console. The following local JavaScript wrapper calls it:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">The wrapper produces this output:</p>



<figure class="wp-block-image size-full"><span class="missing-image" role="note">Screenshot unavailable. This image could not be recovered from the original blog.</span></figure>



<p class="wp-block-paragraph">I find this feature of limited use and prefer to run actions in the Orchestrator appliance.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Other_commands"></span>Other commands<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">I have omitted other vRDT commands because they did not work in my environment.</p>



<p class="wp-block-paragraph">I hope this has provided some insight into the vRealize Developer Tools extension. If you have had different experiences or if you feel there is something I have missed that you find useful, then please comment and share.</p>

