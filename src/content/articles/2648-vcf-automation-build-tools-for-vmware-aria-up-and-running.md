---
title: "VCF Automation – Build Tools for VMware Aria – Up and Running"
description: "Set up Build Tools for VMware Aria on Windows, configure Maven and an optional Artifactory repository, then push and pull Orchestrator actions."
path: "/vcf-automation-build-tools-for-vmware-aria-up-and-running/"
kind: "post"
published: "2025-06-24T13:51:38Z"
updated: "2026-09-18T16:22:40Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Development","Build Tools for VMware Aria","DevOps","Maven","Artifactory"]
tags: ["VCF Automation","VCF Operations Orchestrator"]
wordpressId: 2648
originalUrl: "https://simplygeek.co.uk/vcf-automation-build-tools-for-vmware-aria-up-and-running/"
---

<div id="ez-toc-container" class="ez-toc-v2_0_88 ez-toc-wrap-left counter-hierarchy ez-toc-counter ez-toc-transparent ez-toc-container-direction">
<div class="ez-toc-title-container">
<p class="ez-toc-title">Page Contents</p>
<span class="ez-toc-title-toggle"></span></div>
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-1" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Deploy_and_Configure_Artifactory_Repository_Manager_optional">Deploy and configure Artifactory Repository Manager (optional)</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-2" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Configure_Jfrog_Artifactory">Configure JFrog Artifactory</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-3" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_a_Local_Repository_for_Aria">Create a local repository for Aria</a></li><li class="ez-toc-page-1 ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-4" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_a_User_for_Repository_Access">Create a user for repository access</a></li></ul></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-5" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_a_Certificate_for_Orchestrator_Package_Signing">Create a certificate for Orchestrator package signing</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-6" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Signed_Certificate">Signed certificate</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-7" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Self-Signed_Certificate">Self-signed certificate</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-8" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_Keystore_Artefact_optional">Create the keystore artefact (optional)</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-9" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Upload_Keystore_Artefact_to_Artifactory">Upload the keystore artefact to Artifactory</a></li></ul></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-10" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Configure_Developer_Workstation_Windows">Configure the developer workstation (Windows)</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-11" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Install_Postman_optional">Install Postman (optional)</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-12" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Obtain_VCF_Automation_Refresh_Token">Obtain a VCF Automation refresh token</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-13" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Install_Java_Development_Kit_JDK">Install Java Development Kit (JDK)</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-14" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Install_NodeJS">Install NodeJS</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-15" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Install_Apache_Maven">Install Apache Maven</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-16" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_a_Master_Password">Create a master password</a></li><li class="ez-toc-page-1 ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-17" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Configure_Project_Settings_settingsxml">Configure project settings (settings.xml)</a></li></ul></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-18" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_Your_First_Project_Actions-based">Create your first project (actions-based)</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-19" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Push_Actions">Push actions</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-20" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Pull_Actions">Pull actions</a></li></ul></li></ul></nav></div>


<p class="wp-block-paragraph">This post updates my <strong><em>IaC for vRealize</em> </strong>series with Build Tools version 4.7.0, the latest release when I wrote it. The guidance is intended for version 2.30.x or later. Earlier versions may not work as described.</p>



<p class="wp-block-paragraph" id="the-pasted-async"><em><strong>vRealize Build Tools</strong></em> was renamed <em><strong>Build Tools for VMware Aria</strong></em>. The former VMware Fling is now an officially managed open-source project on GitHub. Its integrations extend beyond Orchestrator to manage content for these VCF solutions:</p>



<ul class="wp-block-list">
<li>VCF Automation</li>



<li>VCF Operations Orchestrator</li>



<li>VCF Operations</li>



<li>VCF Operations (Logs)</li>



<li>VMware Cloud Director</li>
</ul>



<p class="wp-block-paragraph" id="the-pasted-async">Build Tools for VMware Aria is available in public Maven repositories. Except for the keystore, you no longer need to upload artefacts manually or use a vRO 7.3 appliance. With direct internet access, you can create a project and start using the tools. For enterprise environments, I recommend a supporting platform to provide greater control.</p>



<p class="wp-block-paragraph">I will not be covering the following in this post:</p>



<ul class="wp-block-list">
<li>Any form of Git integration</li>



<li>Continuous Integration</li>



<li>Multiple environments or multi-tenants</li>



<li>Visual Studio Code integration</li>



<li>Project structure / multiple or nested projects (apart from just the default ones created using the examples)</li>
</ul>



<p class="wp-block-paragraph">These topics need dedicated posts and are not prerequisites for this setup.</p>




<h2 class="wp-block-heading" id="the-pasted-async"><span class="ez-toc-section" id="Deploy_and_Configure_Artifactory_Repository_Manager_optional"></span>Deploy and configure Artifactory Repository Manager (optional)<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">I strongly recommend an artefact repository manager to store supporting artefacts and integrate them with deployment targets and pipelines. Options include Artifactory, Nexus and GitLab. Many enterprises already have repositories, projects and permissions in place. The basic setup below is for guidance and demonstration.</p>



<p class="wp-block-paragraph">This guide does not cover every product or deployment option. I deployed JFrog Artifactory in a container managed by Podman on Rocky Linux 9, following <a href="https://unixcop.com/how-to-install-jfrog-artifactory-on-rhel-8-centos-8-rocky-linux-8/">this guide</a>. You can follow the same guide or adapt the deployment to your environment.</p>



<h3 class="wp-block-heading" id="the-pasted-async"><span class="ez-toc-section" id="Configure_Jfrog_Artifactory"></span>Configure JFrog Artifactory<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Before continuing, complete the initial Artifactory setup, change the default password and sign in to the UI. The following steps configure Artifactory for Build Tools for VMware Aria.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_Local_Repository_for_Aria"></span>Create a local repository for Aria<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">First, create a repository for the keystore file. Earlier Build Tools versions used a Java Keystore. Its replacement is a Maven package containing a certificate and key file, which is easier to manage and distribute.</p>



<ol><li>Select <strong>Administration</strong> &gt; <strong>Repositories</strong> &gt; <strong>Local</strong>.</li><li>Select <strong>Add Repository</strong> &gt; <strong>Local Repository</strong>. In the version shown, the button is at the top right.</li><li>Select <strong>Maven</strong> as the package type.</li><li>Enter a <strong>Repository Key</strong>. I used aria-local.</li><li>Select <strong>Create Local Repository</strong>.</li></ol>



<p class="wp-block-paragraph">The new local repository will be visible in the list.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1288" height="454" src="/wp-content/uploads/2024/01/image.png" alt="" class="wp-image-2412" srcset="/wp-content/uploads/2024/01/image.png 1288w, /wp-content/uploads/2024/01/image-300x106.png 300w, /wp-content/uploads/2024/01/image-1024x361.png 1024w, /wp-content/uploads/2024/01/image-768x271.png 768w, /wp-content/uploads/2024/01/image-640x226.png 640w" sizes="auto, (max-width: 1288px) 100vw, 1288px"></a></figure>



<p>Add the local repository to the <strong>libs-release</strong> virtual repository:</p><ol><li>Select the <strong>Virtual</strong> tab.</li><li>Select <strong>libs-release</strong>.</li><li>On the <strong>Basic</strong> Configuration page, scroll down to <strong>Repositories</strong>.</li><li>Move your local repository to the right-hand list (Selected), either by dragging it or using the arrow button.</li></ol>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-1.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="804" height="390" src="/wp-content/uploads/2024/01/image-1.png" alt="" class="wp-image-2413" srcset="/wp-content/uploads/2024/01/image-1.png 804w, /wp-content/uploads/2024/01/image-1-300x146.png 300w, /wp-content/uploads/2024/01/image-1-768x373.png 768w, /wp-content/uploads/2024/01/image-1-640x310.png 640w" sizes="auto, (max-width: 804px) 100vw, 804px"></a></figure>



<p class="wp-block-paragraph">Select <strong>Force Authentication</strong>, just above <strong>Repositories</strong>. This requires users to authenticate and disables anonymous access.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-3.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="418" height="241" src="/wp-content/uploads/2024/01/image-3.png" alt="" class="wp-image-2415" srcset="/wp-content/uploads/2024/01/image-3.png 418w, /wp-content/uploads/2024/01/image-3-300x173.png 300w" sizes="auto, (max-width: 418px) 100vw, 418px"></a></figure>



<p class="wp-block-paragraph">Click <strong>Save</strong>.</p>



<p class="wp-block-paragraph">Repeat the steps above to enable ‘<strong>Force Authentication</strong>‘ on the <strong>libs-snapshot</strong> virtual repository.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_User_for_Repository_Access"></span>Create a user for repository access<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">Create a local Artifactory account for repository access. If you configure LDAP/Active Directory integration, you can use a directory account instead.</p>



<ol><li>Select <strong>Administration</strong> &gt; <strong>User Management</strong> &gt; <strong>Users</strong>.</li><li>Select <strong>New User</strong>. In the version shown, the button is at the top right.</li><li>Enter a username and password. I used aria-ci.</li></ol><p>You can select <strong>Disable UI Access</strong>, but leave it unchecked if you need UI access for testing.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-4.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="879" height="657" src="/wp-content/uploads/2024/01/image-4.png" alt="" class="wp-image-2416" srcset="/wp-content/uploads/2024/01/image-4.png 879w, /wp-content/uploads/2024/01/image-4-300x224.png 300w, /wp-content/uploads/2024/01/image-4-768x574.png 768w, /wp-content/uploads/2024/01/image-4-640x478.png 640w" sizes="auto, (max-width: 879px) 100vw, 879px"></a></figure>



<p class="wp-block-paragraph">Select <strong>Save</strong>.</p>



<ol><li>Select <strong>Permissions</strong> &gt; <strong>New Permission</strong>.</li><li>Enter a permission name. I used aria-ci.</li><li>Under <strong>Resources</strong>, select <strong>Add Repositories</strong>.</li><li>Select the three checkboxes: <strong>Any Local Repository</strong>, <strong>Any Remote Repository</strong> and <strong>Any Distribution Repository</strong>.</li></ol>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-5.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1313" height="851" src="/wp-content/uploads/2024/01/image-5.png" alt="" class="wp-image-2417" srcset="/wp-content/uploads/2024/01/image-5.png 1313w, /wp-content/uploads/2024/01/image-5-300x194.png 300w, /wp-content/uploads/2024/01/image-5-1024x664.png 1024w, /wp-content/uploads/2024/01/image-5-768x498.png 768w, /wp-content/uploads/2024/01/image-5-640x415.png 640w" sizes="auto, (max-width: 1313px) 100vw, 1313px"></a></figure>



<p class="wp-block-paragraph">Click <strong>OK</strong>.</p>



<p class="wp-block-paragraph">Under <strong>Users</strong>, select the + icon next to <strong>Selected Users</strong>. Move the user account into this permission by dragging it or using the arrow button.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-6.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="948" height="446" src="/wp-content/uploads/2024/01/image-6.png" alt="" class="wp-image-2418" srcset="/wp-content/uploads/2024/01/image-6.png 948w, /wp-content/uploads/2024/01/image-6-300x141.png 300w, /wp-content/uploads/2024/01/image-6-768x361.png 768w, /wp-content/uploads/2024/01/image-6-640x301.png 640w" sizes="auto, (max-width: 948px) 100vw, 948px"></a></figure>



<p class="wp-block-paragraph">Click <strong>OK</strong> and finally click <strong>Create</strong>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_Certificate_for_Orchestrator_Package_Signing"></span>Create a certificate for Orchestrator package signing<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">VCF Operations Orchestrator requires a certificate to sign packages for import and export. Earlier Build Tools versions stored certificates in a Java Keystore, which was difficult to manage and share. The replacement Maven artefact contains the certificate and private key. An artefact repository manager can distribute it across the team.</p>



<p class="wp-block-paragraph">Use OpenSSL to generate the certificates. I use the 3.0.x (LTS) Light release for Windows, available from the <a href="https://slproweb.com/products/Win32OpenSSL.html" target="_blank" rel="noopener noreferrer">OpenSSL download page</a>.</p>



<p class="wp-block-paragraph">I keep the certificate configuration in Git. Create <strong>keystore.cfg</strong> with the following content:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="raw" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>[ req ]
default_bits = 2048
default_keyfile = private_key.pem
distinguished_name = req_distinguished_name
encrypt_key = no
prompt = no
string_mask = nombstr
req_extensions = v3_req

[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = digitalSignature, keyEncipherment, dataEncipherment, nonRepudiation
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = @alternate_names

[ req_distinguished_name ]
countryName = ##Country##
stateOrProvinceName = ##State##
localityName = ##Locality##
0.organizationName = ##OrgName
organizationalUnitName = ##OrgUnitName##
commonName = ##domain.local##

[ alternate_names ]
DNS.1 = ##domain.local##</code></pre>



<p class="wp-block-paragraph">Replace each <strong>##</strong>xyz<strong>##</strong> placeholder with your own value.</p>



<p class="wp-block-paragraph">From the command shell, run the following OpenSSL commands to create the certificate to your requirements (signed or unsigned).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Signed_Certificate"></span>Signed certificate<span class="ez-toc-section-end"></span></h3>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code># Create Private Key with password.
openssl genrsa -passout pass:VMware1! -out key.pem 2048

# Create Certificate Signing Request.
openssl req -new -outform PEM -out cert.csr -inform PEM -key key.pem -config keystore.cfg

# Sign Certificate with CA (I am using Active Directory CA with a Certificate Template called 'VMwarevSphere'.
certreq -attrib "CertificateTemplate:VMwarevSphere" -submit cert.csr
&lt;Save as cert.crt&gt;

# Convert Certificate and Private Key to PKCS #12 format.
openssl pkcs12 -export -name "_dunesrsaalias_" -out cert.pfx -inkey key.pem -in cert.crt
openssl pkcs12 -in cert.pfx -nocerts -out private_key.pem
openssl pkcs12 -in cert.pfx -nokeys -clcerts -out cert.pem</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Self-Signed_Certificate"></span>Self-signed certificate<span class="ez-toc-section-end"></span></h3>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code># Create Private Key with password.
openssl genrsa -passout pass:VMware1! -out private_key.key 2048

# Create Self-Signed Certificate.
openssl req -new --x509 -sha256 -days 3650 -key private_key.key -out cert.crt -config keystore.cfg

# Convert Certificate and Private Key to PKCS #12 format.
openssl pkcs12 -export -name "_dunesrsaalias_" -out cert.pfx -inkey private_key.key -in cert.crt
openssl pkcs12 -in cert.pfx -nocerts -out private_key.pem
openssl pkcs12 -in cert.pfx -nokeys -clcerts -out cert.pem</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Create_Keystore_Artefact_optional"></span>Create the keystore artefact (optional)<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">This section is only required if you plan to use an artefact repository manager.</p>



<p class="wp-block-paragraph">Create a folder called ‘<strong>archetype.keystore-1.0.0</strong>‘. Move the following files into this folder:</p>



<ul class="wp-block-list">
<li>private_key.pem</li>



<li>cert.pem</li>
</ul>



<p class="wp-block-paragraph">Create <strong>archetype.keystore-1.0.0.zip</strong> from the folder. The ZIP file must contain the archetype.keystore-1.0.0 folder itself, not just its contents.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Upload_Keystore_Artefact_to_Artifactory"></span>Upload the keystore artefact to Artifactory<span class="ez-toc-section-end"></span></h4>



<ol><li>Sign in to the Artifactory UI.</li><li>Select <strong>Application</strong> &gt; <strong>Artifactory</strong> &gt; <strong>Artifacts</strong>.</li><li>In the left-hand list, select <strong>aria-local</strong> or the local repository you created earlier.</li></ol>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-7.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1193" height="399" src="/wp-content/uploads/2024/01/image-7.png" alt="" class="wp-image-2437" srcset="/wp-content/uploads/2024/01/image-7.png 1193w, /wp-content/uploads/2024/01/image-7-300x100.png 300w, /wp-content/uploads/2024/01/image-7-1024x342.png 1024w, /wp-content/uploads/2024/01/image-7-768x257.png 768w, /wp-content/uploads/2024/01/image-7-640x214.png 640w" sizes="auto, (max-width: 1193px) 100vw, 1193px"></a></figure>



<ol><li>Select <strong>Deploy</strong>. In the version shown, the button is at the top right.</li><li>Select <strong>Single Deploy</strong>.</li><li>Add <strong>archetype.keystore-1.0.0.zip</strong>.</li><li>Set <strong>Target Path</strong> to com/vmware/pscoe/build/archetype.keystore/1.0.0/archetype.keystore-1.0.0.zip.</li><li>Select <strong>Deploy</strong>.</li></ol>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-8.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="587" height="696" src="/wp-content/uploads/2024/01/image-8.png" alt="" class="wp-image-2438" srcset="/wp-content/uploads/2024/01/image-8.png 587w, /wp-content/uploads/2024/01/image-8-253x300.png 253w" sizes="auto, (max-width: 587px) 100vw, 587px"></a></figure>



<p class="wp-block-paragraph">If the upload is successful, the repository will include a path to the file and its contents.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-9.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="534" height="493" src="/wp-content/uploads/2024/01/image-9.png" alt="" class="wp-image-2439" srcset="/wp-content/uploads/2024/01/image-9.png 534w, /wp-content/uploads/2024/01/image-9-300x277.png 300w" sizes="auto, (max-width: 534px) 100vw, 534px"></a></figure>



<h2 class="wp-block-heading" id="the-pasted-async"><span class="ez-toc-section" id="Configure_Developer_Workstation_Windows"></span>Configure the developer workstation (Windows)<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The developer workstation needs prerequisite software and Maven configuration. This section covers Windows.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_Postman_optional"></span>Install Postman (optional)<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Postman provides a graphical interface for API calls, environments, variables and collections on Windows. It is optional. The example below uses it to obtain the VCF Automation API refresh token needed by the Build Tools. <a href="https://www.postman.com/downloads/" target="_blank" rel="noopener noreferrer">Download Postman</a> to follow that example.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Obtain_VCF_Automation_Refresh_Token"></span>Obtain a VCF Automation refresh token<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">A refresh token is needed to obtain an access token (bearer token) for VCF Automation API calls. Supply only the refresh token to the Build Tools; they request bearer tokens internally. To obtain the refresh token, send a POST request to https://<strong>{{vra_host}}</strong>/csp/gateway/am/api/login?access_token. Replace {{vra_host}} with your VCF Automation hostname.</p>



<p class="wp-block-paragraph">The POST request must include a JSON body as follows:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="json" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>{
    "username": "{{username}}",
    "password": "{{password}}",
    "domain": "{{domain}}"
}</code></pre>



<p class="wp-block-paragraph">Replace <strong>{{username}}</strong>, <strong>{{password}}</strong> and <strong>{{domain}}</strong> with your values. For a local account, use <strong>System Domain</strong>. Otherwise, use the integrated directory's domain name, such as your Active Directory domain.</p>



<p class="wp-block-paragraph">This Postman example uses an environment with those variables set:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-13.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="768" height="306" src="/wp-content/uploads/2024/01/image-13.png" alt="" class="wp-image-2445" srcset="/wp-content/uploads/2024/01/image-13.png 768w, /wp-content/uploads/2024/01/image-13-300x120.png 300w, /wp-content/uploads/2024/01/image-13-640x255.png 640w" sizes="auto, (max-width: 768px) 100vw, 768px"></a></figure>



<p class="wp-block-paragraph" id="the-pasted-async">Select <strong>Send</strong> to receive the refresh token:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-14.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="751" height="172" src="/wp-content/uploads/2024/01/image-14.png" alt="" class="wp-image-2446" srcset="/wp-content/uploads/2024/01/image-14.png 751w, /wp-content/uploads/2024/01/image-14-300x69.png 300w, /wp-content/uploads/2024/01/image-14-640x147.png 640w" sizes="auto, (max-width: 751px) 100vw, 751px"></a></figure>



<p class="wp-block-paragraph">Make a note of the refresh token, as this will be needed later.</p>



<p class="wp-block-paragraph"><strong>Note that the refresh token is only valid for 90 days.</strong></p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_Java_Development_Kit_JDK"></span>Install Java Development Kit (JDK)<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Maven requires a Java JDK. The Build Tools officially support JDK 21 (LTS). I use the <a href="https://adoptium.net/en-GB/download/" target="_blank" rel="noopener noreferrer">Adoptium build</a>. Download the JDK, not the JRE. I recommend the <strong>Installer</strong>, which can set Path and JAVA_HOME.</p>



<p class="wp-block-paragraph">Run the installer and change the option to set the <strong>JAVA_HOME</strong> variable.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-10.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="490" height="386" src="/wp-content/uploads/2024/01/image-10.png" alt="" class="wp-image-2440" srcset="/wp-content/uploads/2024/01/image-10.png 490w, /wp-content/uploads/2024/01/image-10-300x236.png 300w" sizes="auto, (max-width: 490px) 100vw, 490px"></a></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_NodeJS"></span>Install NodeJS<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">The Build Tools use NodeJS to download dependencies through NPM and support version 22.x. Download it from the <a href="https://nodejs.org/download/release/latest-v22.x" target="_blank" rel="noopener noreferrer">NodeJS website</a>. I recommend the x64 MSI package, which also sets the environment PATH.</p>



<p class="wp-block-paragraph">Open a command prompt and type <strong><code>node --version</code></strong> to verify that NodeJS is working. You should see output similar to the below:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>node --version
v22.14.0

npm --version
10.9.2</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_Apache_Maven"></span>Install Apache Maven<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Apache Maven is used for managing and building projects based on the Project Object Model (POM). Download the Maven binary package from <a href="https://maven.apache.org/download.cgi" target="_blank" rel="noopener noreferrer">https://maven.apache.org/download.cgi</a>. Build Tools supports version 3.9.x.</p>



<p class="wp-block-paragraph">The binary package does not include an installer, so extract it to a directory that does not include any spaces. (I have mine located in ‘%USERPROFILE%\AppData\Local\apache-maven-3.9.9’).</p>



<p class="wp-block-paragraph">Add the Maven bin directory to <strong>PATH</strong>. Open <strong>Edit environment variables for your account</strong> from the Start menu and add the path manually. I previously suggested <strong>setx</strong>, but found it unreliable.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-11.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="899" height="492" src="/wp-content/uploads/2024/01/image-11.png" alt="" class="wp-image-2442" srcset="/wp-content/uploads/2024/01/image-11.png 899w, /wp-content/uploads/2024/01/image-11-300x164.png 300w, /wp-content/uploads/2024/01/image-11-768x420.png 768w, /wp-content/uploads/2024/01/image-11-640x350.png 640w" sizes="auto, (max-width: 899px) 100vw, 899px"></a></figure>



<p class="wp-block-paragraph">Open a command prompt and type<strong> <code>mvn --version</code></strong> to verify that Maven is working. You should see output similar to the below:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn --version
Apache Maven 3.9.9 (bc0240f3c744dd6b6ec2920b3cd08dcc295161ae)
Maven home: C:\Users\gavin\AppData\Local\apache-maven-3.9.6
Java version: 21.0.6, vendor: Eclipse Adoptium, runtime: C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot
Default locale: en_GB, platform encoding: Cp1252
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"</code></pre>



<p class="wp-block-paragraph">If the command fails, check the Maven and JDK installation paths and their environment variables.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_Master_Password"></span>Create a master password<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">Maven can store encrypted server passwords in settings.xml. First, set a master password with <strong><code>mvn --encrypt-master-password</code></strong>. The command prompts for a password and returns its encrypted form:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn --encrypt-master-password</code></pre>



<figure class="wp-block-image"><img loading="lazy" decoding="async" width="387" height="54" src="/wp-content/uploads/2024/01/image-12.png" alt="" class="wp-image-2443" srcset="/wp-content/uploads/2024/01/image-12.png 387w, /wp-content/uploads/2024/01/image-12-300x42.png 300w" sizes="auto, (max-width: 387px) 100vw, 387px"></figure>



<p class="wp-block-paragraph">Store the encrypted string in <strong>settings-security.xml</strong>, in <strong>%USERPROFILE%\.m2\</strong>. If the file does not exist, create it with this content:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="xml" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>&lt;settingsSecurity&gt;
&lt;master&gt;{sMFA/2y5+qAHjPPmlxkFj1tcWbU6CGKwm3t1dA1eGSo=}&lt;/master&gt;
&lt;/settingsSecurity&gt;</code></pre>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Configure_Project_Settings_settingsxml"></span>Configure project settings (settings.xml)<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">The following <strong>settings.xml</strong> examples support setups with and without an artefact repository manager. You can use the second example to try the Build Tools without deploying a dedicated platform.</p>



<p class="wp-block-paragraph">The settings.xml file should be created in the ‘<strong>%USERPROFILE%\.m2\</strong>‘ folder.</p>



<h5 class="wp-block-heading" id="the-pasted-async">Settings.xml (using Artifactory Repository)</h5>



<p class="wp-block-paragraph">Use the following <strong>Settings.xml</strong> example to use Build Tools with Artifactory Repository Manager. All artefacts are retrieved from this repository. If you followed my setup, then requests to Maven Central will be proxied through Artifactory, and the keystore file will be downloaded from the <strong>aria-local</strong> repository.</p>



<p class="wp-block-paragraph" id="the-pasted-async">Replace each <strong>{{ }} </strong>placeholder with your own value.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="xml" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"&gt;
    &lt;servers&gt;
        &lt;server&gt;
            &lt;id&gt;aria-release&lt;/id&gt;
            &lt;username&gt;aria-ci&lt;/username&gt;
            &lt;password&gt;{{encrypted_password}}&lt;/password&gt;
        &lt;/server&gt;
        &lt;server&gt;
            &lt;id&gt;aria-snapshots&lt;/id&gt;
            &lt;username&gt;aria-ci&lt;/username&gt;
            &lt;password&gt;{{encrypted_password}}&lt;/password&gt;
        &lt;/server&gt;
    &lt;/servers&gt;

    &lt;profiles&gt;
        &lt;profile&gt;
            &lt;id&gt;artifactory&lt;/id&gt;
            &lt;repositories&gt;
                &lt;repository&gt;
                    &lt;snapshots&gt;&lt;enabled&gt;false&lt;/enabled&gt;&lt;/snapshots&gt;
                    &lt;id&gt;aria-release&lt;/id&gt;
                    &lt;name&gt;aria-release&lt;/name&gt;
                    &lt;url&gt;http://{{artifactory_fqdn}}:8082/artifactory/libs-release&lt;/url&gt;
                &lt;/repository&gt;
                &lt;repository&gt;
                    &lt;snapshots&gt;&lt;enabled&gt;true&lt;/enabled&gt;&lt;/snapshots&gt;
                    &lt;id&gt;aria-snapshots&lt;/id&gt;
                    &lt;name&gt;aria-snapshots&lt;/name&gt;
                    &lt;url&gt;http://{{artifactory_fqdn}}:8082/artifactory/libs-snapshot&lt;/url&gt;
                &lt;/repository&gt;
            &lt;/repositories&gt;
            &lt;pluginRepositories&gt;
                &lt;pluginRepository&gt;
                    &lt;snapshots&gt;&lt;enabled&gt;false&lt;/enabled&gt;&lt;/snapshots&gt;
                    &lt;id&gt;aria-release&lt;/id&gt;
                    &lt;name&gt;aria-release&lt;/name&gt;
                    &lt;url&gt;http://{{artifactory_fqdn}}:8082/artifactory/libs-release&lt;/url&gt;
                &lt;/pluginRepository&gt;
                &lt;pluginRepository&gt;
                    &lt;snapshots&gt;&lt;enabled&gt;true&lt;/enabled&gt;&lt;/snapshots&gt;
                    &lt;id&gt;aria-snapshots&lt;/id&gt;
                    &lt;name&gt;aria-snapshots&lt;/name&gt;
                    &lt;url&gt;http://{{artifactory_fqdn}}:8082/artifactory/libs-snapshot&lt;/url&gt;
                &lt;/pluginRepository&gt;
            &lt;/pluginRepositories&gt;
            &lt;properties&gt;
                &lt;releaseRepositoryUrl&gt;http://{{artifactory_fqdn}}:8082/artifactory/libs-release&lt;/releaseRepositoryUrl&gt;
                &lt;snapshotRepositoryUrl&gt;http://{{artifactory_fqdn}}:8082/artifactory/libs-snapshot&lt;/snapshotRepositoryUrl&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
        &lt;profile&gt;
            &lt;id&gt;packaging&lt;/id&gt;
            &lt;properties&gt;
                &lt;keystoreGroupId&gt;com.vmware.pscoe.build&lt;/keystoreGroupId&gt;
                &lt;keystoreArtifactId&gt;archetype.keystore&lt;/keystoreArtifactId&gt;
                &lt;keystoreVersion&gt;1.0.0&lt;/keystoreVersion&gt;
                &lt;vroPrivateKeyPem&gt;target/${keystoreArtifactId}-${keystoreVersion}/private_key.pem&lt;/vroPrivateKeyPem&gt;
                &lt;vroCertificatePem&gt;target/${keystoreArtifactId}-${keystoreVersion}/cert.pem&lt;/vroCertificatePem&gt;
                &lt;vroKeyPass&gt;VMware1!&lt;/vroKeyPass&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
        &lt;profile&gt;
            &lt;id&gt;aria&lt;/id&gt;
            &lt;properties&gt;
                &lt;!-- VCF Automation Connection --&gt;
                &lt;vrang.host&gt;{{vra_fqdn}}&lt;/vrang.host&gt;
                &lt;vrang.port&gt;443&lt;/vrang.port&gt;
                &lt;vrang.org.name&gt;{{vra_org_name}}&lt;/vrang.org.name&gt;
                &lt;vrang.project.name&gt;{{vra_project_name}}&lt;/vrang.project.name&gt;
                &lt;vrang.refresh.token&gt;{{vra_refresh_token}}&lt;/vrang.refresh.token&gt;
                &lt;vrang.vro.integration&gt;{{vro_integration_name}}&lt;/vrang.vro.integration&gt;
                &lt;vrang.bp.release&gt;true&lt;/vrang.bp.release&gt;
                &lt;!-- VCF Automation Orchestrator Connection --&gt;
                &lt;vro.host&gt;{{vro_fqdn}}&lt;/vro.host&gt;
                &lt;vro.port&gt;443&lt;/vro.port&gt;
                &lt;vro.auth&gt;vra&lt;/vro.auth&gt;
                &lt;vro.authHost&gt;{{vra_fqdn}}&lt;/vro.authHost&gt; &lt;!-- Required for external vro instances when vra auth is used --&gt;
                &lt;vro.authPort&gt;443&lt;/vro.authPort&gt; &lt;!-- Required for external vro instances when vra auth is used --&gt;
                &lt;vro.refresh.token&gt;{{vra_refresh_token}}&lt;/vro.refresh.token&gt;
                &lt;!--&lt;vrealize.ssl.ignore.hostname&gt;true&lt;/vrealize.ssl.ignore.hostname&gt; --&gt;
                &lt;!--&lt;vrealize.ssl.ignore.certificate&gt;true&lt;/vrealize.ssl.ignore.certificate&gt; --&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
    &lt;/profiles&gt;

    &lt;mirrors&gt;
        &lt;mirror&gt;
            &lt;id&gt;maven-default-http-blocker&lt;/id&gt;
            &lt;mirrorOf&gt;external:dummy:*&lt;/mirrorOf&gt;
            &lt;name&gt;Pseudo repository to mirror external repositories initially using HTTP.&lt;/name&gt;
            &lt;url&gt;http://0.0.0.0/&lt;/url&gt;
            &lt;blocked&gt;true&lt;/blocked&gt;
        &lt;/mirror&gt;
        &lt;mirror&gt;
            &lt;id&gt;aria-release&lt;/id&gt;
            &lt;name&gt;Artifactory proxy for Maven Central&lt;/name&gt;
            &lt;url&gt;http://{{artifactory_fqdn}}:8082/artifactory/libs-release&lt;/url&gt;
            &lt;mirrorOf&gt;central&lt;/mirrorOf&gt;
        &lt;/mirror&gt;
    &lt;/mirrors&gt;
    
    &lt;activeProfiles&gt;
        &lt;activeProfile&gt;artifactory&lt;/activeProfile&gt;
        &lt;activeProfile&gt;packaging&lt;/activeProfile&gt;
    &lt;/activeProfiles&gt;
&lt;/settings&gt;</code></pre>



<p class="wp-block-paragraph">The ‘<strong>{{encrypted_password}}</strong>‘ is the encrypted password generated using the ‘<strong>mvn –encrypt-password</strong>‘ command. This is the encrypted password for the user account that was created in the ‘<strong>Create a User for Repository Access</strong>‘ section.</p>



<h5 class="wp-block-heading">Settings.xml (local / no artefact repository)</h5>



<p class="wp-block-paragraph">Use the following <strong>Settings.xml</strong> example to use Build Tools where no artefact repository is available. In this scenario, you are getting artefacts directly from Maven Central and sourcing the keystore certificate and private key files locally.</p>



<p class="wp-block-paragraph">Replace each {{ }} placeholder with your own value.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="xml" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"&gt;
    &lt;profiles&gt;
        &lt;profile&gt;
            &lt;id&gt;packaging&lt;/id&gt;
            &lt;properties&gt;
                &lt;vroPrivateKeyPem&gt;C:/path/to/keystore/private_key.pem&lt;/vroPrivateKeyPem&gt;
                &lt;vroCertificatePem&gt;C:/path/to/keystore/cert.pem&lt;/vroCertificatePem&gt;
                &lt;vroKeyPass&gt;VMware1!&lt;/vroKeyPass&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
        &lt;profile&gt;
            &lt;id&gt;aria&lt;/id&gt;
            &lt;properties&gt;
                &lt;!-- VCF Automation Connection --&gt;
                &lt;vrang.host&gt;{{vra_fqdn}}&lt;/vrang.host&gt;
                &lt;vrang.port&gt;443&lt;/vrang.port&gt;
                &lt;vrang.org.name&gt;{{vra_org_name}}&lt;/vrang.org.name&gt;
                &lt;vrang.project.name&gt;{{vra_project_name}}&lt;/vrang.project.name&gt;
                &lt;vrang.refresh.token&gt;{{vra_refresh_token}}&lt;/vrang.refresh.token&gt;
                &lt;vrang.vro.integration&gt;{{vro_integration_name}}&lt;/vrang.vro.integration&gt;
                &lt;vrang.bp.release&gt;true&lt;/vrang.bp.release&gt;
                &lt;!-- VCF Automation Orchestrator Connection --&gt;
                &lt;vro.host&gt;{{vro_fqdn}}&lt;/vro.host&gt;
                &lt;vro.port&gt;443&lt;/vro.port&gt;
                &lt;vro.auth&gt;vra&lt;/vro.auth&gt;
                &lt;vro.authHost&gt;{{vra_fqdn}}&lt;/vro.authHost&gt; &lt;!-- Required for external vro instances when vra auth is used --&gt;
                &lt;vro.authPort&gt;443&lt;/vro.authPort&gt; &lt;!-- Required for external vro instances when vra auth is used --&gt;
                &lt;vro.refresh.token&gt;{{vra_refresh_token}}&lt;/vro.refresh.token&gt;
                &lt;!--&lt;vrealize.ssl.ignore.hostname&gt;true&lt;/vrealize.ssl.ignore.hostname&gt; --&gt;
                &lt;!--&lt;vrealize.ssl.ignore.certificate&gt;true&lt;/vrealize.ssl.ignore.certificate&gt; --&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
    &lt;/profiles&gt;
   
    &lt;activeProfiles&gt;
        &lt;activeProfile&gt;packaging&lt;/activeProfile&gt;
    &lt;/activeProfiles&gt;
&lt;/settings&gt;</code></pre>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Create_Your_First_Project_Actions-based"></span>Create your first project (actions-based)<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">This example creates a JavaScript Actions-based project and shows how to push and pull its code. For other project types, see the <a href="https://github.com/vmware/build-tools-for-vmware-aria/tree/v2.36.0/docs/archive/doc/markdown" target="_blank" rel="noopener noreferrer">official documentation</a>.</p>



<ol><li>Create a root folder for your projects.</li><li>Open a command prompt in that folder.</li><li>Run the following command.</li></ol>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-actions-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=js-actions</code></pre>



<p class="wp-block-paragraph">You can replace <strong>com.simplygeek</strong> with your own value.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-16.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1577" height="649" src="/wp-content/uploads/2024/01/image-16.png" alt="" class="wp-image-2456" srcset="/wp-content/uploads/2024/01/image-16.png 1577w, /wp-content/uploads/2024/01/image-16-300x123.png 300w, /wp-content/uploads/2024/01/image-16-1024x421.png 1024w, /wp-content/uploads/2024/01/image-16-768x316.png 768w, /wp-content/uploads/2024/01/image-16-1536x632.png 1536w, /wp-content/uploads/2024/01/image-16-640x263.png 640w" sizes="auto, (max-width: 1577px) 100vw, 1577px"></a></figure>



<p class="wp-block-paragraph">A new folder is created called ‘<strong>js-actions</strong>‘ and will include a <strong>sample.js</strong> function/action.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Push_Actions"></span>Push actions<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Push this new project to the Orchestrator server with the following command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn clean package vrealize:push -DincludeDependencies=true -DskipTests -Paria -f "js-actions"</code></pre>



<p class="wp-block-paragraph">If this is successful, you will see that the package now exists under the Packages section in Orchestrator:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-17.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1439" height="341" src="/wp-content/uploads/2024/01/image-17.png" alt="" class="wp-image-2457" srcset="/wp-content/uploads/2024/01/image-17.png 1439w, /wp-content/uploads/2024/01/image-17-300x71.png 300w, /wp-content/uploads/2024/01/image-17-1024x243.png 1024w, /wp-content/uploads/2024/01/image-17-768x182.png 768w, /wp-content/uploads/2024/01/image-17-640x152.png 640w" sizes="auto, (max-width: 1439px) 100vw, 1439px"></a></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Pull_Actions"></span>Pull actions<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Pull this project from the Orchestrator server with the following command:</p>



<p class="wp-block-paragraph"><strong>Tip:</strong> Add server-side actions to the package you pushed to include them in the next pull.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn clean package vro:pull -DincludeDependencies=true -DskipTests -Paria -f "js-actions"</code></pre>



<p class="wp-block-paragraph">You now have a working Build Tools setup. Future posts cover the project types and ways to manage them in Git.</p>



<p class="wp-block-paragraph">I have tested the steps and solutions in this guide as thoroughly as I can. If you encounter issues, share them and I will help where I can.</p>




