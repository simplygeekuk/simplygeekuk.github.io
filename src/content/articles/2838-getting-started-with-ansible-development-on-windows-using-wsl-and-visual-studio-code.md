---
title: "Getting Started with Ansible Development on Windows Using WSL and Visual Studio Code"
description: "Set up Ansible development on Windows with WSL 2, AlmaLinux, a Python virtual environment and Visual Studio Code, including linting and code completion."
path: "/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/"
kind: "post"
published: "2025-07-23T13:19:08Z"
updated: "2026-09-18T14:18:35Z"
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
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-heading-level-2"><a class="ez-toc-link" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#prerequisites">Prerequisites</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-1" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Installing_Windows_Subsystem_for_Linux_WSL">Install Windows Subsystem for Linux</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-2" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Create_Environment_for_Ansible_Development">Create an environment for Ansible development</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-3" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Visual_Studio_Code_Setup">Set up Visual Studio Code</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-4" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Create_and_Configure_VS_Code_Workspace">Create and configure the workspace</a></li><li class="ez-toc-page-1 ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-5" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Add_projects_to_VS_Code_Workspace">Add projects and select the Python interpreter</a></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-6" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#Exploring_some_of_the_benefits_of_using_WSL_and_VS_Code">Verify the development environment</a></li><li class="ez-toc-heading-level-2"><a class="ez-toc-link" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#troubleshooting">Troubleshooting</a></li><li class="ez-toc-heading-level-2"><a class="ez-toc-link" href="/getting-started-with-ansible-development-on-windows-using-wsl-and-visual-studio-code/#references">References</a></li></ul></nav></div>

Windows Subsystem for Linux (WSL) lets you run Ansible and other Linux tools while working on a Windows desktop. Visual Studio Code (VS Code) connects to that Linux environment, so you can edit files, use Git and run commands from one editor.

This guide sets up AlmaLinux 10 in WSL 2, creates a Python virtual environment and connects it to the Ansible extension in VS Code. The result is a workspace with code completion, syntax highlighting, YAML validation and linting, plus access to the Ansible command-line tools.

WSL 2 runs a Linux kernel inside a lightweight virtual machine managed by Windows. You do not need to configure a separate virtual machine or dual-boot installation. See Microsoft's [comparison of WSL versions](https://learn.microsoft.com/en-us/windows/wsl/compare-versions) for the architectural differences.

The screenshots come from the original July 2025 article. They illustrate the setup, but current extension screens and settings can differ. Use the updated commands and configuration below when following the guide.

## Prerequisites

- Windows 11, with administrator access to install WSL. Microsoft's [WSL installation guide](https://learn.microsoft.com/en-us/windows/wsl/install) also covers Windows 10 version 2004, build 19041 and later.
- [Visual Studio Code](https://code.visualstudio.com/download) installed on Windows. The WSL extension installs the required server components inside Linux.
- Internet access from Windows and WSL to download the distribution, extensions and Python packages.
- Basic familiarity with a terminal and Ansible playbooks.

The examples use AlmaLinux 10 and its Python 3.12 packages. My preference remains AlmaLinux for its compatibility with Red Hat Enterprise Linux. Ubuntu is another option, but its package installation commands differ. You can install more than one WSL distribution.

Check Python compatibility when choosing another distribution. The current [ansible-dev-tools package metadata](https://pypi.org/project/ansible-dev-tools/) requires Python 3.11 or later, while individual tools can have stricter requirements. The [ansible-core support matrix](https://docs.ansible.com/projects/ansible/latest/reference_appendices/release_and_maintenance.html#ansible-core-support-matrix) lists supported controller Python versions. AlmaLinux 10 supplies [Python 3.12](https://wiki.almalinux.org/release-notes/10.0.html).

<a id="Installing_Windows_Subsystem_for_Linux_WSL"></a>

## Install Windows Subsystem for Linux

Run the commands in this section in **PowerShell on Windows**. The later Linux commands run inside AlmaLinux.

1. Open PowerShell as an administrator and list the available distributions:

   ```powershell
   wsl --list --online
   ```

   Distribution names change over time. Use the exact name returned by this command. If WSL is unavailable on an older Windows installation, follow Microsoft's [manual installation instructions](https://learn.microsoft.com/en-us/windows/wsl/install-manual).

2. Install AlmaLinux 10:

   ```powershell
   wsl --install -d AlmaLinux-10
   ```

   Restart Windows if prompted, then open AlmaLinux to finish its initial setup. Create a Linux username and password when asked. The Linux username does not need to match your Windows username.

3. Check that the distribution uses WSL 2:

   ```powershell
   wsl --list --verbose
   ```

   The `VERSION` column for `AlmaLinux-10` should show `2`. If it shows `1`, convert that distribution:

   ```powershell
   wsl --set-version AlmaLinux-10 2
   ```

4. Open the distribution explicitly:

   ```powershell
   wsl -d AlmaLinux-10
   ```

   This avoids opening a different distribution when another one is the default.

In the **AlmaLinux terminal**, update the packages and install Git, Python and pip:

```bash
sudo dnf update -y
sudo dnf install git python3 python3-pip -y
python3 --version
```

These package commands are for AlmaLinux. Follow your distribution's package instructions if you use Ubuntu or another Linux distribution.

<a id="Create_Environment_for_Ansible_Development"></a>

## Create an environment for Ansible development

A [Python virtual environment](https://docs.python.org/3/library/venv.html) gives this setup its own Python packages. It keeps the Ansible tools separate from the packages installed by the operating system.

Keep the environment and project files in the Linux file system, such as your Linux home directory. Microsoft recommends this for [performance when using Linux tools](https://learn.microsoft.com/en-us/windows/wsl/filesystems). Your starting directory depends on how you open WSL, so switch to your home directory first.

1. In the AlmaLinux terminal, create the environment:

   ```bash
   cd ~
   mkdir -p venv
   python3 -m venv venv/ansible-dev
   ```

2. Activate it:

   ```bash
   source ~/venv/ansible-dev/bin/activate
   ```

   The prompt usually gains an `(ansible-dev)` prefix. Check the interpreter directly if your shell theme does not show it:

   ```bash
   python -c "import sys; print(sys.executable)"
   ```

   The path should end in `/venv/ansible-dev/bin/python` beneath your Linux home directory.

3. Upgrade pip within the environment, then install the development tools:

   ```bash
   python -m pip install --upgrade pip
   python -m pip install ansible-dev-tools
   ```

   [Ansible Development Tools](https://docs.ansible.com/projects/dev-tools/installation/) packages tools for working with playbooks, roles, collections and plugins. Using `python -m pip` ties the installation to the active interpreter. Run these commands as your normal Linux user, without `sudo`.

4. Check the installed tools and their versions:

   ```bash
   adt --version
   ansible --version
   ansible-lint --version
   ```

   Keep the version information when troubleshooting. The available tool versions depend on the package release and Python interpreter you installed.

This guide uses the tools directly from the virtual environment. Running container-based tools or Ansible execution environments also requires a container engine, which is outside this setup.

<a id="Visual_Studio_Code_Setup"></a>

## Set up Visual Studio Code

A dedicated [VS Code profile](https://code.visualstudio.com/docs/configure/profiles) helps keep your Ansible extensions and settings together. It is optional, but useful when you work with several development environments.

1. Open the **Manage** menu using the cog icon, then select **Profiles**.

<figure class="wp-block-image size-full is-style-default"><a href="/wp-content/uploads/2025/07/image-13.png"><img loading="lazy" decoding="async" width="353" height="354" src="/wp-content/uploads/2025/07/image-13.png" alt="Profiles option in the VS Code Manage menu." class="wp-image-2867" srcset="/wp-content/uploads/2025/07/image-13.png 353w, /wp-content/uploads/2025/07/image-13-300x300.png 300w, /wp-content/uploads/2025/07/image-13-150x150.png 150w" sizes="auto, (max-width: 353px) 100vw, 353px"></a></figure>

2. Select **New Profile**.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-14.png"><img loading="lazy" decoding="async" width="241" height="27" src="/wp-content/uploads/2025/07/image-14.png" alt="New Profile button in VS Code." class="wp-image-2868"></a></figure>

3. Name the profile `Ansible`, select **Create**, and make sure the profile is active. Extensions and settings you add now belong to that profile, subject to any settings it shares with another profile.

4. Open **Extensions** and install the **WSL** extension from Microsoft on the Windows side.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-15.png"><img loading="lazy" decoding="async" width="771" height="302" src="/wp-content/uploads/2025/07/image-15.png" alt="Microsoft WSL extension in the VS Code marketplace." class="wp-image-2869" srcset="/wp-content/uploads/2025/07/image-15.png 771w, /wp-content/uploads/2025/07/image-15-300x118.png 300w, /wp-content/uploads/2025/07/image-15-768x301.png 768w" sizes="auto, (max-width: 771px) 100vw, 771px"></a></figure>

5. Press **Ctrl+Shift+P** or **F1** to open the Command Palette. Run **WSL: Connect to WSL using Distro**, then choose `AlmaLinux-10`.

   If AlmaLinux is already your default distribution, **WSL: Connect to WSL** also works. The original screenshot shows this default-distribution option.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-16.png"><img loading="lazy" decoding="async" width="591" height="160" src="/wp-content/uploads/2025/07/image-16.png" alt="Command Palette showing WSL: Connect to WSL." class="wp-image-2870" srcset="/wp-content/uploads/2025/07/image-16.png 591w, /wp-content/uploads/2025/07/image-16-300x81.png 300w" sizes="auto, (max-width: 591px) 100vw, 591px"></a></figure>

6. Wait for VS Code to install its server components. Check the WSL indicator in the status bar to confirm that the window is connected to AlmaLinux.

7. In that WSL window, install **Ansible** from Red Hat. Also check that the **Python** extension from Microsoft and **YAML** extension from Red Hat are installed in WSL. If VS Code offers **Install in WSL**, use it.

<figure class="wp-block-image size-full is-resized"><a href="/wp-content/uploads/2025/07/image-17.png"><img loading="lazy" decoding="async" width="767" height="589" src="/wp-content/uploads/2025/07/image-17.png" alt="Red Hat Ansible extension installed in WSL." class="wp-image-2871" srcset="/wp-content/uploads/2025/07/image-17.png 767w, /wp-content/uploads/2025/07/image-17-300x230.png 300w" sizes="auto, (max-width: 767px) 100vw, 767px"></a></figure>

The editor runs on Windows, while the tools and extensions that need Linux run inside WSL. Microsoft's [Developing in WSL guide](https://code.visualstudio.com/docs/remote/wsl) explains this arrangement, including terminals, Git and debugging.

<a id="Create_and_Configure_VS_Code_Workspace"></a>

### Create and configure the workspace

Save a workspace so you can reuse the configuration across your Ansible projects.

1. Select **File > Save Workspace As...** and save it as `ansible.code-workspace` in your Linux home directory.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-18.png"><img loading="lazy" decoding="async" width="602" height="176" src="/wp-content/uploads/2025/07/image-18.png" alt="Save Workspace As command in VS Code." class="wp-image-2873" srcset="/wp-content/uploads/2025/07/image-18.png 602w, /wp-content/uploads/2025/07/image-18-300x88.png 300w" sizes="auto, (max-width: 602px) 100vw, 602px"></a></figure>

2. Open the Command Palette and select **Preferences: Open Workspace Settings (JSON)**.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-19.png"><img loading="lazy" decoding="async" width="596" height="80" src="/wp-content/uploads/2025/07/image-19.png" alt="Command Palette showing workspace settings commands." class="wp-image-2874" srcset="/wp-content/uploads/2025/07/image-19.png 596w, /wp-content/uploads/2025/07/image-19-300x40.png 300w" sizes="auto, (max-width: 596px) 100vw, 596px"></a></figure>

3. Add the following properties inside the existing `settings` object. Preserve any existing workspace folders and other settings.

   Replace `stephensg` in **all four paths** with your Linux username. Use absolute Linux paths, not Windows paths or a literal `~`.

   ```json
   {
     "ansible.python.interpreterPath": "/home/stephensg/venv/ansible-dev/bin/python",
     "ansible.ansible.path": "/home/stephensg/venv/ansible-dev/bin/ansible",
     "ansible.validation.lint.enabled": true,
     "ansible.validation.lint.path": "/home/stephensg/venv/ansible-dev/bin/ansible-lint",
     "ansible.executionEnvironment.enabled": false,
     "python.defaultInterpreterPath": "/home/stephensg/venv/ansible-dev/bin/python",
     "python.terminal.activateEnvironment": true,
     "files.associations": {
       "*.yml": "ansible",
       "*.yaml": "ansible"
     }
   }
   ```

   The braces show the contents of the `settings` object. Do not nest a second object inside it. The following screenshot shows the older configuration, not the exact settings above.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-20.png"><img loading="lazy" decoding="async" width="792" height="350" src="/wp-content/uploads/2025/07/image-20.png" alt="Workspace settings from the original July 2025 setup." class="wp-image-2876" srcset="/wp-content/uploads/2025/07/image-20.png 792w, /wp-content/uploads/2025/07/image-20-300x133.png 300w, /wp-content/uploads/2025/07/image-20-768x339.png 768w" sizes="auto, (max-width: 792px) 100vw, 792px"></a></figure>

The [Ansible extension settings](https://docs.ansible.com/projects/vscode-ansible/configuration/) point Ansible, Python and `ansible-lint` at the same environment. Disabling execution environments makes this configuration use those local Linux tools.

The file associations apply Ansible language support to both `.yml` and `.yaml` files in this dedicated workspace. They do not make every YAML file an Ansible file. For a workspace containing other YAML formats, use narrower patterns or choose **Ansible** as the language mode for individual files. See the extension's [file association guidance](https://docs.ansible.com/projects/vscode-ansible/#without-file-inspection).

The original configuration passed `--parseable --offline` to `ansible-lint`. This setup leaves output formatting to the extension and does not force offline mode. Add `--offline` only when you intend to skip dependency installation and have prepared the project's dependencies. See the [Ansible Lint options](https://docs.ansible.com/projects/lint/usage/).

<a id="Add_projects_to_VS_Code_Workspace"></a>

### Add projects and select the Python interpreter

1. In WSL, place your projects in a directory such as `~/ansible-projects`. Copy an existing project, clone it with Git, or create a role with `ansible-galaxy`.

   The original example uses `ansible-role-vmware-avi` inside `ansible-projects`. You can use your own project instead.

2. In VS Code, select **File > Add Folder to Workspace...**, choose the project directory, then select **Add**.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-21.png"><img loading="lazy" decoding="async" width="604" height="110" src="/wp-content/uploads/2025/07/image-21.png" alt="Add Folder to Workspace command in VS Code." class="wp-image-2881" srcset="/wp-content/uploads/2025/07/image-21.png 604w, /wp-content/uploads/2025/07/image-21-300x55.png 300w" sizes="auto, (max-width: 604px) 100vw, 604px"></a></figure>

3. Run **Python: Select Interpreter** from the Command Palette. Select the interpreter at `/home/stephensg/venv/ansible-dev/bin/python`, substituting your username. If it is not listed, use **Enter interpreter path...**. Repeat for each project folder when VS Code asks which folder to configure.

   Setting `python.defaultInterpreterPath` does not replace an interpreter you previously selected. Microsoft's [Python settings reference](https://code.visualstudio.com/docs/python/settings-reference) documents this behaviour.

4. Open a new integrated terminal and check the active interpreter:

   ```bash
   python -c "import sys; print(sys.executable)"
   ```

   It should point to `ansible-dev`. If it does not, activate the environment in that terminal:

   ```bash
   source ~/venv/ansible-dev/bin/activate
   ```

The Python extension can activate the selected environment when you create a terminal. If you use the newer Python Environments extension, its `python-envs.terminal.autoActivationType` setting takes precedence. Set it to `command` if automatic activation is disabled. Reopen the terminal after changing the setting.

<a id="Exploring_some_of_the_benefits_of_using_WSL_and_VS_Code"></a>

## Verify the development environment

Check that the integrated terminal uses the expected virtual environment. The original terminal screenshot shows the `(ansible-dev)` prompt.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-25.png"><img loading="lazy" decoding="async" width="719" height="107" src="/wp-content/uploads/2025/07/image-25.png" alt="Integrated terminal with the ansible-dev environment active." class="wp-image-2897" srcset="/wp-content/uploads/2025/07/image-25.png 719w, /wp-content/uploads/2025/07/image-25-300x45.png 300w" sizes="auto, (max-width: 719px) 100vw, 719px"></a></figure>

From your project directory in that terminal, run:

```bash
ansible --version
ansible-lint --version
ansible-lint
```

The version commands should find the installed tools. The lint command checks your project and may report findings that need attention. A lint failure in an existing project does not, by itself, mean the environment is configured incorrectly.

Open an Ansible YAML file and check that its language mode is **Ansible**. Save the file and inspect the editor diagnostics and **Problems** panel.

I used an older project that predates Ansible collections to demonstrate the lint findings in the original screenshots.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-22.png"><img loading="lazy" decoding="async" width="780" height="478" src="/wp-content/uploads/2025/07/image-22.png" alt="Ansible lint diagnostics in a YAML file." class="wp-image-2882" srcset="/wp-content/uploads/2025/07/image-22.png 780w, /wp-content/uploads/2025/07/image-22-300x184.png 300w, /wp-content/uploads/2025/07/image-22-768x471.png 768w" sizes="auto, (max-width: 780px) 100vw, 780px"></a></figure>

The **Problems** panel lists the diagnostics for the file.

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-23.png"><img loading="lazy" decoding="async" width="639" height="142" src="/wp-content/uploads/2025/07/image-23.png" alt="Ansible diagnostics listed in the Problems panel." class="wp-image-2883" srcset="/wp-content/uploads/2025/07/image-23.png 639w, /wp-content/uploads/2025/07/image-23-300x67.png 300w" sizes="auto, (max-width: 639px) 100vw, 639px"></a></figure>

The next screenshot shows IntelliSense suggesting a fully qualified collection name (FQCN) for a module. An FQCN identifies the namespace, collection and module, such as `ansible.builtin.copy`. See the [Ansible Lint FQCN rule](https://docs.ansible.com/projects/lint/rules/fqcn/).

<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-24.png"><img loading="lazy" decoding="async" width="742" height="251" src="/wp-content/uploads/2025/07/image-24.png" alt="IntelliSense suggesting a fully qualified Ansible module name." class="wp-image-2884" srcset="/wp-content/uploads/2025/07/image-24.png 742w, /wp-content/uploads/2025/07/image-24-300x101.png 300w" sizes="auto, (max-width: 742px) 100vw, 742px"></a></figure>

Syntax highlighting helps distinguish the YAML structure, while completion and lint diagnostics help you find issues as you edit. You can extend this setup with other extensions, Python linting or project-specific `ansible-lint` configuration.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| VS Code opens the wrong Linux distribution | Use **WSL: Connect to WSL using Distro** and select `AlmaLinux-10`. |
| `python3` is missing | Run the AlmaLinux package installation command in the Linux terminal. |
| Package installation reports an unsupported Python version | Check `python3 --version` and the package requirements. Recreate the environment with a supported interpreter. |
| Ansible or `ansible-lint` is not found | Check the absolute paths in workspace settings and confirm that the tools are installed in `ansible-dev`. |
| A new terminal uses the wrong Python interpreter | Run **Python: Select Interpreter**, reopen the terminal and check automatic activation settings. |
| A YAML file has no Ansible completion or lint diagnostics | Check its language mode, the WSL extension installation and `ansible.validation.lint.enabled`. |
| Linting reports missing collections or roles | Install the project's declared dependencies in this environment. Offline mode skips dependency installation. |

## References

- [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
- [AlmaLinux on WSL](https://wiki.almalinux.org/documentation/wsl)
- [Python virtual environments](https://docs.python.org/3/library/venv.html)
- [Install Ansible Development Tools](https://docs.ansible.com/projects/dev-tools/installation/)
- [Ansible extension configuration](https://docs.ansible.com/projects/vscode-ansible/configuration/)
- [Python settings in VS Code](https://code.visualstudio.com/docs/python/settings-reference)
