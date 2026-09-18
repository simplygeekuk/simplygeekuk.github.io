---
title: "Getting Started with Ansible Development on Windows Using WSL and Visual Studio Code"
description: "Windows Subsystem for Linux (WSL) is a compatibility layer that allows you to run a Linux environment directly on Windows, without the need for a virtual machine or dual-boot setup. It provides native access to a full Linux command-line…"
path: "/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/"
kind: "post"
published: "2025-07-23T13:19:08Z"
updated: "2025-07-23T13:19:10Z"
author: "SimplyGeek"
categories: ["WSL","Development","DevOps","Ansible","Visual Studio Code","Automation"]
tags: ["WSL","Automation","Ansible","Visual Studio Code","Ansible-Lint"]
wordpressId: 2838
originalUrl: "https://simplygeek.co.uk/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/"
---

<div id="ez-toc-container" class="ez-toc-v2_0_88 ez-toc-wrap-left counter-hierarchy ez-toc-counter ez-toc-transparent ez-toc-container-direction">
<div class="ez-toc-title-container">
<p class="ez-toc-title">Page Contents</p>
<span class="ez-toc-title-toggle"></span></div>
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-1" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Installing_Windows_Subsystem_for_Linux_WSL">Installing Windows Subsystem for Linux (WSL)</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-2" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Create_Environment_for_Ansible_Development">Create Environment for Ansible Development</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-3" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Visual_Studio_Code_Setup">Visual Studio Code Setup</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-4" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Create_and_Configure_VS_Code_Workspace">Create and Configure VS Code Workspace</a></li><li class="ez-toc-page-1 ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-5" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Add_projects_to_VS_Code_Workspace">Add projects to VS Code Workspace</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-6" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Exploring_some_of_the_benefits_of_using_WSL_and_VS_Code">Exploring some of the benefits of using WSL and VS Code</a></li></ul></nav></div>


<p class="wp-block-paragraph"><strong>Windows Subsystem for Linux (WSL)</strong> is a compatibility layer that allows you to run a Linux environment directly on Windows, without the need for a virtual machine or dual-boot setup. It provides native access to a full Linux command-line experience, enabling developers to use Linux-based tools like Ansible, Git, and Python seamlessly alongside their Windows workflows. WSL is especially beneficial for Ansible development, as it provides a native-like environment for testing and executing playbooks, while still leveraging the convenience of the Windows desktop.</p>



<p class="wp-block-paragraph"><strong>Visual Studio Code (VS Code)</strong> is a lightweight, open-source code editor developed by Microsoft. It supports a wide range of programming languages and comes with powerful features such as IntelliSense, debugging, Git integration, and an extensive marketplace of extensions. For Ansible development, VS Code offers extensions for YAML syntax highlighting, linting, and integration with WSL, making it an ideal environment for writing, testing, and managing playbooks.</p>



<p class="wp-block-paragraph">The combination of WSL and Visual Studio Code provides a powerful and streamlined environment for developing and testing Ansible playbooks, all without the need to switch between different systems. It brings the best of both worlds: the flexibility of a Linux-based CLI and the productivity of a modern Windows-based editor.</p>



<p class="wp-block-paragraph">The following benefits can be achieved:</p>



<ul class="wp-block-list">
<li>Full Intellisense for Ansible code.</li>



<li>Syntax highlighting.</li>



<li>Linting to ensure code consistency.</li>



<li>YAML syntax validation.</li>



<li>Full access to Ansible CLI tools and easily run playbooks, test roles, and use ansible-galaxy to create, install, or manage collections.</li>



<li>VS Code Remote – WSL integration allowing you to edit and execute Ansible content inside WSL while using the full power of the VS Code interface, including integrated terminal, Git tools, and debugging.</li>



<li>Access to Python virtual environments to easily isolate Ansible and dependency versions using <code data-enlighter-language="bat" class="EnlighterJSRAW">venv </code>or <code data-enlighter-language="bat" class="EnlighterJSRAW">pip</code>.</li>
</ul>




<h2 class="wp-block-heading"><span class="ez-toc-section" id="Installing_Windows_Subsystem_for_Linux_WSL"></span><strong>Installing Windows Subsystem for Linux (WSL)</strong><span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">This section assumes that you have the WSL command line available, but if you are not running Windows 11 or using an older version of Windows 10, then check the Microsoft page on <a href="https://learn.microsoft.com/en-us/windows/wsl/install-manual" data-type="link" data-id="https://learn.microsoft.com/en-us/windows/wsl/install-manual" target="_blank" rel="noopener noreferrer">Manual installation steps for older versions of WSL</a>.</p>



<p class="wp-block-paragraph">Open a command prompt and run the wsl command. You should see output similar to the following:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="bat" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>&gt;wsl
Windows Subsystem for Linux has no installed distributions.
You can resolve this by installing a distribution with the instructions below:

Use 'wsl.exe --list --online' to list available distributions
and 'wsl.exe --install &lt;Distro&gt;' to install.</code></pre>



<p class="wp-block-paragraph">The command <code data-enlighter-language="bat" class="EnlighterJSRAW">wsl --list --online</code> will display a list of available Linux distributions that can be installed. At the time of writing, the following are available:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="bat" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="false" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>&gt;wsl --list --online
The following is a list of valid distributions that can be installed.
Install using 'wsl.exe --install &lt;Distro&gt;'.

NAME                            FRIENDLY NAME
AlmaLinux-8                     AlmaLinux OS 8
AlmaLinux-9                     AlmaLinux OS 9
AlmaLinux-Kitten-10             AlmaLinux OS Kitten 10
AlmaLinux-10                    AlmaLinux OS 10
Debian                          Debian GNU/Linux
FedoraLinux-42                  Fedora Linux 42
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
SUSE-Linux-Enterprise-15-SP7    SUSE Linux Enterprise 15 SP7
Ubuntu                          Ubuntu
Ubuntu-24.04                    Ubuntu 24.04 LTS
archlinux                       Arch Linux
kali-linux                      Kali Linux Rolling
openSUSE-Tumbleweed             openSUSE Tumbleweed
openSUSE-Leap-15.6              openSUSE Leap 15.6
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_10                Oracle Linux 8.10
OracleLinux_9_5                 Oracle Linux 9.5</code></pre>



<p class="wp-block-paragraph">My personal preference is <strong>AlmaLinux</strong>, as it delivers a stable and reliable Red Hat Enterprise Linux experience, very much like using CentOS in the past. It’s a great choice for anyone looking for RHEL compatibility, and I highly recommend it for development and automation workloads.</p>



<p class="wp-block-paragraph">That said, <strong>Ubuntu</strong> is also a great alternative, especially if you’re more familiar with its ecosystem. Both distributions provide access to modern toolchains and come with Python 3.10 or later, making them ideal for Ansible development. It’s also possible to install both at the same time.</p>



<p class="wp-block-paragraph">The following will be based on <strong>AlmaLinux</strong>. Run the following command to install <strong>AlmaLinux-10</strong> (or the latest version available):</p>



<p class="wp-block-paragraph"><code data-enlighter-language="bat" class="EnlighterJSRAW">wsl --install --AlmaLinux-10</code></p>



<p class="wp-block-paragraph">WSL will proceed to download and install the selected distribution. Set your username and password when prompted.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="bat" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="false" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>&gt;wsl --install AlmaLinux-10
Downloading: AlmaLinux OS 10
Installing: AlmaLinux OS 10
Distribution successfully installed. It can be launched via 'wsl.exe -d AlmaLinux-10'
Launching AlmaLinux-10...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: stephensg
New password:</code></pre>



<p class="wp-block-paragraph">I recommend updating the system as the first task.</p>



<p class="wp-block-paragraph"><code data-enlighter-language="bat" class="EnlighterJSRAW">sudo dnf update -y</code></p>



<p class="wp-block-paragraph">Next, install the <strong>git </strong>client and <strong>Python pip</strong>.</p>



<p class="wp-block-paragraph"><code data-enlighter-language="bat" class="EnlighterJSRAW">sudo dnf install git python3-pip -y</code></p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Create_Environment_for_Ansible_Development"></span>Create Environment for Ansible Development<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The next step is to create a Python virtual environment dedicated to Ansible development. This environment will isolate all required packages, ensuring a clean and controlled setup. Once the environment is configured, we’ll connect it to Visual Studio Code so that your Ansible tools and dependencies are available directly within the editor.</p>



<p class="wp-block-paragraph">When you enter WSL for the first time, the current working directory will be your Windows user profile. I recommend switching to the Linux home directory to avoid annoying permission issues.</p>



<p class="wp-block-paragraph"><code data-enlighter-language="bat" class="EnlighterJSRAW">cd ~</code></p>



<p class="wp-block-paragraph">Next, create a folder that will be used for the virtual environments (I use venv, but choose what suits you best)</p>



<p class="wp-block-paragraph"><code data-enlighter-language="bat" class="EnlighterJSRAW">mkdir venv</code></p>



<p class="wp-block-paragraph">Create a new Python virtual environment used for Ansible development.</p>



<p class="wp-block-paragraph"><code data-enlighter-language="bat" class="EnlighterJSRAW">python -m venv venv/ansible-dev</code></p>



<p class="wp-block-paragraph">This will result in a new directory being created under venv.</p>



<p class="wp-block-paragraph">Activate the virtual environment:</p>



<p class="wp-block-paragraph"><code data-enlighter-language="bat" class="EnlighterJSRAW">source venv/ansible-dev/bin/activate</code></p>



<p class="wp-block-paragraph">The prompt will change and display the virtual environment in parentheses:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="bat" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="false" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>[stephensg@Mandark ~]$ source venv/ansible-dev/bin/activate
(ansible-dev) [stephensg@Mandark ~]$</code></pre>



<p class="wp-block-paragraph">It’s also a good idea to ensure that <code data-enlighter-language="generic" class="EnlighterJSRAW">pip</code> is updated to the latest version before installing any packages. This helps avoid compatibility issues and ensures access to the most recent features and improvements. You can update it with the following command:</p>



<p class="wp-block-paragraph"><code data-enlighter-language="bat" class="EnlighterJSRAW">pip install --upgrade pip</code></p>



<p class="wp-block-paragraph">Now that we’re inside the <code data-enlighter-language="bat" class="EnlighterJSRAW">ansible-dev</code> virtual environment, we can install the necessary packages for Ansible development. Thankfully, this process has been greatly simplified with the<a href="https://github.com/ansible/ansible-dev-tools" data-type="link" data-id="https://github.com/ansible/ansible-dev-tools" target="_blank" rel="noopener noreferrer"> ansible-dev-tools</a> package, which bundles everything you need for developing across all aspects of Ansible, including playbooks, roles, collections, and plugins.</p>



<p class="wp-block-paragraph">Install the<code data-enlighter-language="bat" class="EnlighterJSRAW"> ansible-dev-tools</code> package as follows:</p>



<p class="wp-block-paragraph"><code data-enlighter-language="generic" class="EnlighterJSRAW">pip install ansible-dev-tools</code></p>



<p class="wp-block-paragraph">Once the installation is complete, you’ll notice that a variety of Ansible-related commands are now available.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="bat" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>(ansible-dev) [stephensg@Mandark ~]$ ansible
ansible            ansible-console    ansible-galaxy     ansible-navigator  ansible-runner     ansible-vault
ansible-builder    ansible-creator    ansible-inventory  ansible-playbook   ansible-sign
ansible-config     ansible-doc        ansible-lint       ansible-pull       ansible-test</code></pre>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Visual_Studio_Code_Setup"></span>Visual Studio Code Setup<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">This section assumes that Visual Studio Code is already installed. If it’s not, you can <a href="https://code.visualstudio.com/download" data-type="link" data-id="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer">download</a> it from the official website before continuing.</p>



<p class="wp-block-paragraph">Next, you’ll need to install a few extensions. I recommend creating a dedicated profile in Visual Studio Code first. This lets you manage multiple profiles with different sets of extensions, making it easy to switch contexts based on the development environment you’re working in.</p>



<p class="wp-block-paragraph">Click on the cog icon in the bottom left corner and select <code data-enlighter-language="bat" class="EnlighterJSRAW">Profiles</code>.</p>



<figure class="wp-block-image size-full is-style-default"><a href="/wp-content/uploads/2025/07/image-13.png"><img loading="lazy" decoding="async" width="353" height="354" src="/wp-content/uploads/2025/07/image-13.png" alt="" class="wp-image-2867" srcset="/wp-content/uploads/2025/07/image-13.png 353w, /wp-content/uploads/2025/07/image-13-300x300.png 300w, /wp-content/uploads/2025/07/image-13-150x150.png 150w" sizes="auto, (max-width: 353px) 100vw, 353px"></a></figure>



<p class="wp-block-paragraph">Click the <code data-enlighter-language="bat" class="EnlighterJSRAW">New Profile</code> button at the top.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-14.png"><img loading="lazy" decoding="async" width="241" height="27" src="/wp-content/uploads/2025/07/image-14.png" alt="" class="wp-image-2868"></a></figure>



<p class="wp-block-paragraph">Give this profile a name (I simply called it Ansible) and click <code data-enlighter-language="bat" class="EnlighterJSRAW">Create</code>.</p>



<p class="wp-block-paragraph">When extensions are installed, they will be in the context of this profile.</p>



<p class="wp-block-paragraph">Click on the <code data-enlighter-language="bat" class="EnlighterJSRAW">Extensions</code> button in the left panel and search for <code data-enlighter-language="bat" class="EnlighterJSRAW">WSL</code>.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-15.png"><img loading="lazy" decoding="async" width="771" height="302" src="/wp-content/uploads/2025/07/image-15.png" alt="" class="wp-image-2869" srcset="/wp-content/uploads/2025/07/image-15.png 771w, /wp-content/uploads/2025/07/image-15-300x118.png 300w, /wp-content/uploads/2025/07/image-15-768x301.png 768w" sizes="auto, (max-width: 771px) 100vw, 771px"></a></figure>



<p class="wp-block-paragraph">Click <code data-enlighter-language="generic" class="EnlighterJSRAW">Install </code>to install the extension. Once installed, press F1 or CTRL+SHIFT+P to bring up the command palette and type <code data-enlighter-language="generic" class="EnlighterJSRAW">WSL</code>. Select <code data-enlighter-language="bat" class="EnlighterJSRAW">WSL: Connect to WSL</code>.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-16.png"><img loading="lazy" decoding="async" width="591" height="160" src="/wp-content/uploads/2025/07/image-16.png" alt="" class="wp-image-2870" srcset="/wp-content/uploads/2025/07/image-16.png 591w, /wp-content/uploads/2025/07/image-16-300x81.png 300w" sizes="auto, (max-width: 591px) 100vw, 591px"></a></figure>



<p class="wp-block-paragraph">This will refresh the VS Code window and install the required server components on the WSL instance.</p>



<p class="wp-block-paragraph">Install the <code data-enlighter-language="bat" class="EnlighterJSRAW">Ansible</code> extension from the marketplace. This extension will be installed on the WSL instance along with any other dependencies (such as Python, YAML, etc).</p>



<figure class="wp-block-image size-full is-resized"><a href="/wp-content/uploads/2025/07/image-17.png"><img loading="lazy" decoding="async" width="767" height="589" src="/wp-content/uploads/2025/07/image-17.png" alt="" class="wp-image-2871" srcset="/wp-content/uploads/2025/07/image-17.png 767w, /wp-content/uploads/2025/07/image-17-300x230.png 300w" sizes="auto, (max-width: 767px) 100vw, 767px"></a></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Create_and_Configure_VS_Code_Workspace"></span>Create and Configure VS Code Workspace<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">At this stage, I recommend saving the project as a Workspace. This will allow a single workspace (including settings) to be used for all types of Ansible development (playbooks, roles, plugins).</p>



<p class="wp-block-paragraph">Select <code data-enlighter-language="bat" class="EnlighterJSRAW">File -&gt; Save Workspace As</code> and give the workspace an appropriate name (I used ansible.code-workspace for my example).</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-18.png"><img loading="lazy" decoding="async" width="602" height="176" src="/wp-content/uploads/2025/07/image-18.png" alt="" class="wp-image-2873" srcset="/wp-content/uploads/2025/07/image-18.png 602w, /wp-content/uploads/2025/07/image-18-300x88.png 300w" sizes="auto, (max-width: 602px) 100vw, 602px"></a></figure>



<p class="wp-block-paragraph">Now we need to add some configuration to the workspace to ensure the Ansible extensions function correctly, including support for tools like Ansible Lint. Press CTRL+SHIFT+P and search for <code data-enlighter-language="generic" class="EnlighterJSRAW">Workspace Settings</code>. Select the option which includes <code data-enlighter-language="generic" class="EnlighterJSRAW">JSON</code>.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-19.png"><img loading="lazy" decoding="async" width="596" height="80" src="/wp-content/uploads/2025/07/image-19.png" alt="" class="wp-image-2874" srcset="/wp-content/uploads/2025/07/image-19.png 596w, /wp-content/uploads/2025/07/image-19-300x40.png 300w" sizes="auto, (max-width: 596px) 100vw, 596px"></a></figure>



<p class="wp-block-paragraph">Add the following settings in the settings {} block, using the full path to your virtual environment (I found that ~ does not work well here).</p>



<pre class="EnlighterJSRAW" data-enlighter-language="json" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>"ansible.python.interpreterPath": "/home/stephensg/venv/ansible-dev/bin/python",
"ansible.validation.lint.enabled": true,
"ansible.validation.lint.path": "/home/stephensg//venv/ansible-dev/bin/ansible-lint",
"ansible.validation.lint.arguments": "--parseable --offline",
"python.defaultInterpreterPath": "/home/stephensg/venv/ansible-dev/bin/python",
"python.terminal.activateEnvironment": true,
"python.terminal.activateEnvInCurrentTerminal": true,
"files.associations": {
    "*.yml": "ansible"
},</code></pre>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-20.png"><img loading="lazy" decoding="async" width="792" height="350" src="/wp-content/uploads/2025/07/image-20.png" alt="" class="wp-image-2876" srcset="/wp-content/uploads/2025/07/image-20.png 792w, /wp-content/uploads/2025/07/image-20-300x133.png 300w, /wp-content/uploads/2025/07/image-20-768x339.png 768w" sizes="auto, (max-width: 792px) 100vw, 792px"></a></figure>



<p class="wp-block-paragraph">These settings ensure that the Ansible extension and <code data-enlighter-language="generic" class="EnlighterJSRAW">ansible-lint</code> correctly parse all <code data-enlighter-language="generic" class="EnlighterJSRAW">.yml</code> files, not just <code data-enlighter-language="generic" class="EnlighterJSRAW">main.yml</code>. Additionally, they automatically activate the virtual environment in the VS Code terminal, so you won’t need to do it manually each time you open the project.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Add_projects_to_VS_Code_Workspace"></span>Add projects to VS Code Workspace<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Now that VS Code is fully configured, it’s time to add your Ansible projects to the workspace. On the WSL instance, you can add your existing Ansible projects (copy them directly or checkout from Git) or create a new empty project (using ansible-galaxy from the terminal)</p>



<p class="wp-block-paragraph">For my example, I have added my existing project <code data-enlighter-language="bat" class="EnlighterJSRAW">ansible-role-vmware-avi</code>, which I have placed in a directory called <code data-enlighter-language="bat" class="EnlighterJSRAW">ansible-projects</code> in my home directory.</p>



<p class="wp-block-paragraph">Within VS Code, select <code data-enlighter-language="generic" class="EnlighterJSRAW">File -&gt; Add Folder to Workspace...</code> and browse to and select the Ansible project.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-21.png"><img loading="lazy" decoding="async" width="604" height="110" src="/wp-content/uploads/2025/07/image-21.png" alt="" class="wp-image-2881" srcset="/wp-content/uploads/2025/07/image-21.png 604w, /wp-content/uploads/2025/07/image-21-300x55.png 300w" sizes="auto, (max-width: 604px) 100vw, 604px"></a></figure>



<p class="wp-block-paragraph">After clicking <code data-enlighter-language="bat" class="EnlighterJSRAW">Add</code>, the project will now be visible within the workspace on the left.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Exploring_some_of_the_benefits_of_using_WSL_and_VS_Code"></span>Exploring some of the benefits of using WSL and VS Code<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The first thing to demonstrate is that upon opening VS Code or the project, the terminal immediately activates the virtual environment that I specified in the workspace settings.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-25.png"><img loading="lazy" decoding="async" width="719" height="107" src="/wp-content/uploads/2025/07/image-25.png" alt="" class="wp-image-2897" srcset="/wp-content/uploads/2025/07/image-25.png 719w, /wp-content/uploads/2025/07/image-25-300x45.png 300w" sizes="auto, (max-width: 719px) 100vw, 719px"></a></figure>



<p class="wp-block-paragraph">I deliberately picked the project in the previous step, as it’s old and pre-dates the introduction of Ansible Collections, so I knew there would be a few issues flagged for demonstration. In the screenshot below, you can see a number of issues that have been flagged in my YML file (picked up by <code data-enlighter-language="bat" class="EnlighterJSRAW">ansible-lint</code>).</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-22.png"><img loading="lazy" decoding="async" width="780" height="478" src="/wp-content/uploads/2025/07/image-22.png" alt="" class="wp-image-2882" srcset="/wp-content/uploads/2025/07/image-22.png 780w, /wp-content/uploads/2025/07/image-22-300x184.png 300w, /wp-content/uploads/2025/07/image-22-768x471.png 768w" sizes="auto, (max-width: 780px) 100vw, 780px"></a></figure>



<p class="wp-block-paragraph">Also, a list of all issues found in this file is listed under <code data-enlighter-language="bat" class="EnlighterJSRAW">Problems</code>.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-23.png"><img loading="lazy" decoding="async" width="639" height="142" src="/wp-content/uploads/2025/07/image-23.png" alt="" class="wp-image-2883" srcset="/wp-content/uploads/2025/07/image-23.png 639w, /wp-content/uploads/2025/07/image-23-300x67.png 300w" sizes="auto, (max-width: 639px) 100vw, 639px"></a></figure>



<p class="wp-block-paragraph">The screenshot below demonstrates the correction of a fully qualified collection name (FQCN) error, where IntelliSense is used to automatically suggest and apply the correct command.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-24.png"><img loading="lazy" decoding="async" width="742" height="251" src="/wp-content/uploads/2025/07/image-24.png" alt="" class="wp-image-2884" srcset="/wp-content/uploads/2025/07/image-24.png 742w, /wp-content/uploads/2025/07/image-24-300x101.png 300w" sizes="auto, (max-width: 742px) 100vw, 742px"></a></figure>



<p class="wp-block-paragraph">You’ll also notice the syntax highlighting applied to the file, which greatly improves readability and makes it easier to identify errors at a glance.</p>



<p class="wp-block-paragraph">This setup adds significant value to Ansible development and can be extended even further through additional extensions, Python linting integration, or by customising <code data-enlighter-language="generic" class="EnlighterJSRAW">ansible-lint</code> to suit your specific needs.</p>



<p class="wp-block-paragraph">I hope you found this post helpful. If you’re using WSL for Ansible development and have any tips, tools, or cool workflows to share, feel free to drop a comment. I’d love to hear about it!</p>

