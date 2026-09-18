---
title: "VCF Automation – Build Tools for VMware Aria – Up and Running"
description: "It’s been a while since I last covered the Build Tools that support development in VCF Automation, and a lot has changed since my original IaC for vRealize series. I’ve received quite a few requests for an update, and I finally found time…"
path: "/vcf-automation-build-tools-for-vmware-aria-up-and-running/"
kind: "post"
published: "2025-06-24T13:51:38Z"
updated: "2025-07-02T08:47:27Z"
author: "SimplyGeek"
categories: ["Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator","Development","Build Tools for VMware Aria","DevOps","Maven","Artifactory"]
tags: ["VCF Automation","VCF Operations Orchestrator"]
wordpressId: 2648
originalUrl: "https://simplygeek.co.uk/vcf-automation-build-tools-for-vmware-aria-up-and-running/"
---


<p class="wp-block-paragraph">It’s been a while since I last covered the Build Tools that support development in VCF Automation, and a lot has changed since my original <strong><em>IaC for vRealize</em> </strong>series. I’ve received quite a few requests for an update, and I finally found time to write one. This post covers the latest release of the Build Tools (version 4.7.0 at the time of writing) and is recommended for users running version 2.30.x or later. Earlier versions may not function as expected.</p>



<p class="wp-block-paragraph" id="the-pasted-async">A lot has changed—most notably the rebranding from <em><strong>vRealize Build Tools</strong></em> to <em><strong>Build Tools for VMware Aria</strong></em> (can we expect another rebranding?). What was once a VMware Fling is now an officially managed open-source project on GitHub. In addition to supporting Orchestrator, the tools now offer broader integration across the VCF suite. You can manage content for the following solutions:</p>



<ul class="wp-block-list">
<li>VCF Automation</li>



<li>VCF Operations Orchestrator</li>



<li>VCF Operations</li>



<li>VCF Operations (Logs)</li>



<li>VMware Cloud Director</li>
</ul>



<p class="wp-block-paragraph" id="the-pasted-async">The Build Tools for VMware Aria are now available in public Maven repositories, eliminating the need to manually upload artefacts or rely on a vRO 7.3 appliance. The only exception is the keystore (more on that later). With direct internet access, you can now create a project and begin using the Build Tools immediately. For enterprise environments, however, it’s still best practice to set up a supporting platform for greater control.</p>



<p class="wp-block-paragraph">I will not be covering the following in this post:</p>



<ul class="wp-block-list">
<li>Any form of Git integration</li>



<li>Continuous Integration</li>



<li>Multiple environments or multi-tenants</li>



<li>Visual Studio Code integration</li>



<li>Project structure / multiple or nested projects (apart from just the default ones created using the examples)</li>
</ul>



<p class="wp-block-paragraph">I feel these topics are best covered in dedicated posts and are not required to be up and running with the Build Tools.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_88 ez-toc-wrap-left counter-hierarchy ez-toc-counter ez-toc-transparent ez-toc-container-direction">
<div class="ez-toc-title-container">
<p class="ez-toc-title">Page Contents</p>
<span class="ez-toc-title-toggle"></span></div>
<nav><ul class="ez-toc-list ez-toc-list-level-1 "><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-1" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Deploy_and_Configure_Artifactory_Repository_Manager_optional">Deploy and Configure Artifactory Repository Manager (optional)</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-2" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Configure_Jfrog_Artifactory">Configure Jfrog Artifactory</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-3" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_a_Local_Repository_for_Aria">Create a Local Repository for Aria</a></li><li class="ez-toc-page-1 ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-4" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_a_User_for_Repository_Access">Create a User for Repository Access</a></li></ul></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-5" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_a_Certificate_for_Orchestrator_Package_Signing">Create a Certificate for Orchestrator Package Signing</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-6" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Signed_Certificate">Signed Certificate</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-7" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Self-Signed_Certificate">Self-Signed Certificate</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-8" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_Keystore_Artefact_optional">Create Keystore Artefact (optional)</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-9" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Upload_Keystore_Artefact_to_Artifactory">Upload Keystore Artefact to Artifactory</a></li></ul></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-10" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Configure_Developer_Workstation_Windows">Configure Developer Workstation (Windows)</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-11" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Install_Postman_optional">Install Postman (optional)</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-12" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Obtain_VCF_Automation_Refresh_Token">Obtain VCF Automation Refresh Token</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-13" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Install_Java_Development_Kit_JDK">Install Java Development Kit (JDK)</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-14" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Install_NodeJS">Install NodeJS</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-15" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Install_Apache_Maven">Install Apache Maven</a><ul class="ez-toc-list-level-3"><li class="ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-16" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_a_Master_Password">Create a Master Password</a></li><li class="ez-toc-page-1 ez-toc-heading-level-3"><a class="ez-toc-link ez-toc-heading-17" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Configure_Project_Settings_settingsxml">Configure Project Settings (settings.xml)</a></li></ul></li></ul></li><li class="ez-toc-page-1 ez-toc-heading-level-1"><a class="ez-toc-link ez-toc-heading-18" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Create_Your_First_Project_Actions-based">Create Your First Project (Actions-based)</a><ul class="ez-toc-list-level-2"><li class="ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-19" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Push_Actions">Push Actions</a></li><li class="ez-toc-page-1 ez-toc-heading-level-2"><a class="ez-toc-link ez-toc-heading-20" href="/vcf-automation-build-tools-for-vmware-aria-up-and-running/#Pull_Actions">Pull Actions</a></li></ul></li></ul></nav></div>
<h2 class="wp-block-heading" id="the-pasted-async"><span class="ez-toc-section" id="Deploy_and_Configure_Artifactory_Repository_Manager_optional"></span>Deploy and Configure Artifactory Repository Manager (optional)<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">It’s strongly recommended to deploy or have access to an artefact repository manager to store supporting artefacts and integrate them into your deployment targets and pipelines. There are many suitable options available, such as Artifactory, Nexus, or GitLab, and most enterprises already have solutions in place with established projects, repositories, and permission models. What I provide here is a basic setup intended purely for guidance and demonstration purposes.</p>



<p class="wp-block-paragraph">Given the wide variety of products and deployment options available, it wouldn’t be practical to cover the entire setup process here in detail. Instead, I chose to set up JFrog Artifactory using a containerised deployment managed by Podman on Rocky Linux 9, following <a href="https://unixcop.com/how-to-install-jfrog-artifactory-on-rhel-8-centos-8-rocky-linux-8/">this guide</a>. You’re welcome to follow the same guide or adapt the process to suit your own environment and tooling preferences.</p>



<h3 class="wp-block-heading" id="the-pasted-async"><span class="ez-toc-section" id="Configure_Jfrog_Artifactory"></span>Configure Jfrog Artifactory<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">If you’re installing Artifactory, it’s assumed that you’ve already completed the initial setup, changed the default password and successfully logged into the UI. This section will walk you through the steps required to configure Artifactory for use with the Build Tools for VMware Aria.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_Local_Repository_for_Aria"></span>Create a Local Repository for Aria<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">The first step is to create a new repository to store the keystore file. In earlier versions of the Build Tools, a Java Keystore was used, but this has since been replaced by a Maven package containing a certificate and key file. This new format is significantly easier to manage and simplifies distribution across environments.</p>



<p class="wp-block-paragraph">Select <strong>Administration</strong> -&gt; <strong>Repositories</strong> and select the <strong>Local</strong> tab. Click the ‘<strong>Add Repository</strong>‘ button (located at the top right for the version I am using) and select ‘<strong>Local Repository</strong>‘. Choose <strong>Maven</strong> as the package type. Enter a <strong>Repository Key</strong> (I used aria-local) and click ‘<strong>Create Local Repository</strong>‘.</p>



<p class="wp-block-paragraph">The new local repository will be visible in the list.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1288" height="454" src="/wp-content/uploads/2024/01/image.png" alt="" class="wp-image-2412" srcset="/wp-content/uploads/2024/01/image.png 1288w, /wp-content/uploads/2024/01/image-300x106.png 300w, /wp-content/uploads/2024/01/image-1024x361.png 1024w, /wp-content/uploads/2024/01/image-768x271.png 768w, /wp-content/uploads/2024/01/image-640x226.png 640w" sizes="auto, (max-width: 1288px) 100vw, 1288px"></a></figure>



<p class="wp-block-paragraph">The next step is to add this repository to the <strong>libs-release</strong> virtual repository. Select the <strong>Virtual</strong> tab and click on the repository name <strong>libs-release</strong>.&nbsp; On the <strong>Basic</strong> Configuration page, scroll to the bottom until you see <strong>Repositories</strong>. Drag or select and use the arrow button to move the repository across to the right (Selected).</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-1.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="804" height="390" src="/wp-content/uploads/2024/01/image-1.png" alt="" class="wp-image-2413" srcset="/wp-content/uploads/2024/01/image-1.png 804w, /wp-content/uploads/2024/01/image-1-300x146.png 300w, /wp-content/uploads/2024/01/image-1-768x373.png 768w, /wp-content/uploads/2024/01/image-1-640x310.png 640w" sizes="auto, (max-width: 804px) 100vw, 804px"></a></figure>



<p class="wp-block-paragraph">While on this screen, click the checkbox for ‘<strong>Force Authentication</strong>‘ located just above <strong>Repositories</strong>. This will force the requirement for an authenticated user to access the repository (anonymous access disabled).</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-3.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="418" height="241" src="/wp-content/uploads/2024/01/image-3.png" alt="" class="wp-image-2415" srcset="/wp-content/uploads/2024/01/image-3.png 418w, /wp-content/uploads/2024/01/image-3-300x173.png 300w" sizes="auto, (max-width: 418px) 100vw, 418px"></a></figure>



<p class="wp-block-paragraph">Click <strong>Save</strong>.</p>



<p class="wp-block-paragraph">Repeat the steps above to enable ‘<strong>Force Authentication</strong>‘ on the <strong>libs-snapshot</strong> virtual repository.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_User_for_Repository_Access"></span>Create a User for Repository Access<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">This section will detail the steps to create a local Artifactory user account that can be used to authenticate to the repository. You can also opt to use an LDAP/Active Directory account if you configure this integration.</p>



<p class="wp-block-paragraph">Select <strong>Administration</strong> -&gt; <strong>User Management</strong> and select <strong>Users</strong>. Click the ‘<strong>New User</strong>‘ button (located at the top right for the version I am using). Give this user a name that you find suitable (I called this user aria-ci) and set the password.&nbsp; You can optionally check ‘<strong>Disable UI Access</strong>‘, but you may want to leave this unchecked for testing.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-4.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="879" height="657" src="/wp-content/uploads/2024/01/image-4.png" alt="" class="wp-image-2416" srcset="/wp-content/uploads/2024/01/image-4.png 879w, /wp-content/uploads/2024/01/image-4-300x224.png 300w, /wp-content/uploads/2024/01/image-4-768x574.png 768w, /wp-content/uploads/2024/01/image-4-640x478.png 640w" sizes="auto, (max-width: 879px) 100vw, 879px"></a></figure>



<p class="wp-block-paragraph">Click <strong>Save</strong></p>



<p class="wp-block-paragraph">Next, select <strong>Permissions</strong> and click the ‘<strong>New Permission</strong>‘ button. Provide a suitable name for this permission (I called this aria-ci). Under <strong>Resources</strong>, click ‘<strong>Add Repositories</strong>‘ and check the 3 checkboxes at the top, ‘<strong>Any Local Repository</strong>‘, ‘<strong>Any Remote Repository</strong>‘, and ‘<strong>Any Distribution Repository</strong>‘.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-5.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1313" height="851" src="/wp-content/uploads/2024/01/image-5.png" alt="" class="wp-image-2417" srcset="/wp-content/uploads/2024/01/image-5.png 1313w, /wp-content/uploads/2024/01/image-5-300x194.png 300w, /wp-content/uploads/2024/01/image-5-1024x664.png 1024w, /wp-content/uploads/2024/01/image-5-768x498.png 768w, /wp-content/uploads/2024/01/image-5-640x415.png 640w" sizes="auto, (max-width: 1313px) 100vw, 1313px"></a></figure>



<p class="wp-block-paragraph">Click <strong>OK</strong>.</p>



<p class="wp-block-paragraph">Under <strong>Users</strong>, click the + icon next to <strong>Selected Users</strong>. Drag or select and use the arrow to move the user account to this permission.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-6.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="948" height="446" src="/wp-content/uploads/2024/01/image-6.png" alt="" class="wp-image-2418" srcset="/wp-content/uploads/2024/01/image-6.png 948w, /wp-content/uploads/2024/01/image-6-300x141.png 300w, /wp-content/uploads/2024/01/image-6-768x361.png 768w, /wp-content/uploads/2024/01/image-6-640x301.png 640w" sizes="auto, (max-width: 948px) 100vw, 948px"></a></figure>



<p class="wp-block-paragraph">Click <strong>OK</strong> and finally click <strong>Create</strong>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_Certificate_for_Orchestrator_Package_Signing"></span>Create a Certificate for Orchestrator Package Signing<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">A certificate is required to sign packages for VCF Operations Orchestrator (import/export). In earlier versions of the Build Tools, the requirement was to create a Java Keystore file that contained all the certificates. This wasn’t easy to manage and was difficult to distribute across teams. This has now been replaced with a Maven artefact that contains the certificate and private key and can be distributed using an artefact repository manager.</p>



<p class="wp-block-paragraph">OpenSSL is required to generate the certificates. I am using 3.0.x (LTS) Light release for Windows, which can be downloaded from <a href="https://slproweb.com/products/Win32OpenSSL.html" target="_blank" rel="noopener noreferrer">here</a>.</p>



<p class="wp-block-paragraph">I like to create a configuration file for certificate information, which I keep in Git. Create a configuration file ‘<strong>keystore.cfg</strong>‘ with the following:</p>



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



<p class="wp-block-paragraph">Replace all values with <strong>##</strong>xyz<strong>##</strong> with your own.</p>



<p class="wp-block-paragraph">From the command shell, run the following OpenSSL commands to create the certificate to your requirements (signed or unsigned).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Signed_Certificate"></span>Signed Certificate<span class="ez-toc-section-end"></span></h3>



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



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Self-Signed_Certificate"></span>Self-Signed Certificate<span class="ez-toc-section-end"></span></h3>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code># Create Private Key with password.
openssl genrsa -passout pass:VMware1! -out private_key.key 2048

# Create Self-Signed Certificate.
openssl req -new --x509 -sha256 -days 3650 -key private_key.key -out cert.crt -config keystore.cfg

# Convert Certificate and Private Key to PKCS #12 format.
openssl pkcs12 -export -name "_dunesrsaalias_" -out cert.pfx -inkey private_key.key -in cert.crt
openssl pkcs12 -in cert.pfx -nocerts -out private_key.pem
openssl pkcs12 -in cert.pfx -nokeys -clcerts -out cert.pem</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Create_Keystore_Artefact_optional"></span>Create Keystore Artefact (optional)<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">This section is only required if you plan to use an artefact repository manager.</p>



<p class="wp-block-paragraph">Create a folder called ‘<strong>archetype.keystore-1.0.0</strong>‘. Move the following files into this folder:</p>



<ul class="wp-block-list">
<li>private_key.pem</li>



<li>cert.pem</li>
</ul>



<p class="wp-block-paragraph">Compress this folder using ZIP format and create a file called ‘<strong>archetype.keystore-1.0.0.zip</strong>‘ (the zip file should include the folder called archetype.keystore-1.0.0).</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Upload_Keystore_Artefact_to_Artifactory"></span>Upload Keystore Artefact to Artifactory<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">Log in to the Artifactory UI, select <strong>Application</strong>-&gt; <strong>Artifactory,</strong> and select <strong>Artifacts</strong>. In the repositories list on the left, select the ‘<strong>aria-local</strong>‘ (or the local repository you created earlier) repository.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-7.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1193" height="399" src="/wp-content/uploads/2024/01/image-7.png" alt="" class="wp-image-2437" srcset="/wp-content/uploads/2024/01/image-7.png 1193w, /wp-content/uploads/2024/01/image-7-300x100.png 300w, /wp-content/uploads/2024/01/image-7-1024x342.png 1024w, /wp-content/uploads/2024/01/image-7-768x257.png 768w, /wp-content/uploads/2024/01/image-7-640x214.png 640w" sizes="auto, (max-width: 1193px) 100vw, 1193px"></a></figure>



<p class="wp-block-paragraph">Click the ‘<strong>Deploy</strong>‘ button (located at the top right for the version I am using). Make sure that ‘<strong>Single Deploy</strong>‘ is selected and add the ‘<strong>archetype.keystore-1.0.0.zip</strong>‘ file. Set the <strong>Target Path</strong> to ‘com/vmware/pscoe/build/archetype.keystore/1.0.0/archetype.keystore-1.0.0.zip’ and then click <strong>Deploy</strong>.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-8.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="587" height="696" src="/wp-content/uploads/2024/01/image-8.png" alt="" class="wp-image-2438" srcset="/wp-content/uploads/2024/01/image-8.png 587w, /wp-content/uploads/2024/01/image-8-253x300.png 253w" sizes="auto, (max-width: 587px) 100vw, 587px"></a></figure>



<p class="wp-block-paragraph">If the upload is successful, the repository will include a path to the file and its contents.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-9.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="534" height="493" src="/wp-content/uploads/2024/01/image-9.png" alt="" class="wp-image-2439" srcset="/wp-content/uploads/2024/01/image-9.png 534w, /wp-content/uploads/2024/01/image-9-300x277.png 300w" sizes="auto, (max-width: 534px) 100vw, 534px"></a></figure>



<h2 class="wp-block-heading" id="the-pasted-async"><span class="ez-toc-section" id="Configure_Developer_Workstation_Windows"></span>Configure Developer Workstation (Windows)<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">The developer workstation will need some prerequisite software installed and Maven configured to start using the Build Tools. This guide focuses specifically on Windows.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_Postman_optional"></span>Install Postman (optional)<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Postman is a great tool for testing API calls on the Windows desktop and has a nice graphical interface for managing environments, variables, and API collections. This is optional, but I will provide some steps to use Postman to obtain the VCF Automation API Refresh Token, which is needed for the build tools to access the infrastructure. Download it <a href="https://www.postman.com/downloads/" target="_blank" rel="noopener noreferrer">here</a>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Obtain_VCF_Automation_Refresh_Token"></span>Obtain VCF Automation Refresh Token<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">An API refresh token is required to obtain an access (bearer) token when making API calls to VCF Automation. For the Build Tools, only the refresh token is required (as the build tools will internally request bearer tokens when needed). To request the refresh token, make a POST request to ‘https://<strong>{{vra_host}}</strong>/csp/gateway/am/api/login?access_token’, where {{vra_host}} is the hostname of your VCF Automation environment.</p>



<p class="wp-block-paragraph">The POST request must include a JSON body as follows:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="json" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>{
    "username": "{{username}}",
    "password": "{{password}}",
    "domain": "{{domain}}"
}</code></pre>



<p class="wp-block-paragraph">Substituting <strong>{{username}}</strong>, <strong>{{password}}</strong> and <strong>{{domain}}</strong> with your own values. If you are using a local account, then set the domain to ‘<strong>System Domain</strong>‘, otherwise, use the domain name of the directory that has been integrated (i.e. Active Directory domain).</p>



<p class="wp-block-paragraph">Here is an example of this in POSTMAN (I am using a POSTMAN environment with these variables set):</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-13.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="768" height="306" src="/wp-content/uploads/2024/01/image-13.png" alt="" class="wp-image-2445" srcset="/wp-content/uploads/2024/01/image-13.png 768w, /wp-content/uploads/2024/01/image-13-300x120.png 300w, /wp-content/uploads/2024/01/image-13-640x255.png 640w" sizes="auto, (max-width: 768px) 100vw, 768px"></a></figure>



<p class="wp-block-paragraph" id="the-pasted-async">When pressing <strong>Send</strong>, a refresh token is received:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-14.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="751" height="172" src="/wp-content/uploads/2024/01/image-14.png" alt="" class="wp-image-2446" srcset="/wp-content/uploads/2024/01/image-14.png 751w, /wp-content/uploads/2024/01/image-14-300x69.png 300w, /wp-content/uploads/2024/01/image-14-640x147.png 640w" sizes="auto, (max-width: 751px) 100vw, 751px"></a></figure>



<p class="wp-block-paragraph">Make a note of the refresh token, as this will be needed later.</p>



<p class="wp-block-paragraph"><strong>Note that the refresh token is only valid for 90 days.</strong></p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_Java_Development_Kit_JDK"></span>Install Java Development Kit (JDK)<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Java JDK is required to use Maven, and the Build Tools officially support JDK version 21 (LTS release). I use the Adoptium build of JDK, which can be downloaded here: <a href="https://adoptium.net/en-GB/download/" target="_blank" rel="noopener noreferrer">https://adoptium.net/en-GB/download/</a>. Please make sure you download the JDK (not JRE). I also recommend the ‘<strong>Installer</strong>‘ which can set the Path and JAVA_HOME variables for you.</p>



<p class="wp-block-paragraph">Run the installer and change the option to set the <strong>JAVA_HOME</strong> variable.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-10.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="490" height="386" src="/wp-content/uploads/2024/01/image-10.png" alt="" class="wp-image-2440" srcset="/wp-content/uploads/2024/01/image-10.png 490w, /wp-content/uploads/2024/01/image-10-300x236.png 300w" sizes="auto, (max-width: 490px) 100vw, 490px"></a></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_NodeJS"></span>Install NodeJS<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">NodeJS is required for the Build Tools to download any dependencies via NPM. The Build Tools support version 22.x, which can be downloaded from the NodeJS website <a href="https://nodejs.org/download/release/latest-v22.x" target="_blank" rel="noopener noreferrer">here</a>. I recommend the x64 MSI package as it’s the easiest option that also sets the environment PATH.</p>



<p class="wp-block-paragraph">Open a command prompt and type <strong><code>node --version</code></strong> to verify that NodeJS is working. You should see output similar to the below:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>node --version
v22.14.0

npm --version
10.9.2</code></pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_Apache_Maven"></span>Install Apache Maven<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Apache Maven is used for managing and building projects based on the Project Object Model (POM). Download the Maven binary package from <a href="https://maven.apache.org/download.cgi" target="_blank" rel="noopener noreferrer">https://maven.apache.org/download.cgi</a>. Build Tools supports version 3.9.x.</p>



<p class="wp-block-paragraph">The binary package does not include an installer, so extract it to a directory that does not include any spaces. (I have mine located in ‘%USERPROFILE%\AppData\Local\apache-maven-3.9.9’).</p>



<p class="wp-block-paragraph">Add the Maven bin directory to the environment path. I had previously provided examples of using the ‘<strong>setx</strong>‘ command, but have since found this can be quite unreliable. Instead, do this manually by adding the path to the <strong>PATH</strong> environment variable under ‘<strong>Edit environment variables for your account</strong>‘ in the Start menu.</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-11.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="899" height="492" src="/wp-content/uploads/2024/01/image-11.png" alt="" class="wp-image-2442" srcset="/wp-content/uploads/2024/01/image-11.png 899w, /wp-content/uploads/2024/01/image-11-300x164.png 300w, /wp-content/uploads/2024/01/image-11-768x420.png 768w, /wp-content/uploads/2024/01/image-11-640x350.png 640w" sizes="auto, (max-width: 899px) 100vw, 899px"></a></figure>



<p class="wp-block-paragraph">Open a command prompt and type<strong> <code>mvn --version</code></strong> to verify that Maven is working. You should see output similar to the below:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn --version
Apache Maven 3.9.9 (bc0240f3c744dd6b6ec2920b3cd08dcc295161ae)
Maven home: C:\Users\gavin\AppData\Local\apache-maven-3.9.6
Java version: 21.0.6, vendor: Eclipse Adoptium, runtime: C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot
Default locale: en_GB, platform encoding: Cp1252
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"</code></pre>



<p class="wp-block-paragraph">If this doesn’t work, go back and check the paths where Maven and JDK have been installed and ensure that these have been correctly set in the environment variables.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_Master_Password"></span>Create a Master Password<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">Maven allows encrypted server passwords to be stored in the settings.xml file. Before Maven can do this, a master password must first be set. This is achieved using the <strong><code>mvn --encrypt-master-password</code></strong> command, which will prompt you to enter the master password that will be encrypted:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn --encrypt-master-password</code></pre>



<figure class="wp-block-image"><img loading="lazy" decoding="async" width="387" height="54" src="/wp-content/uploads/2024/01/image-12.png" alt="" class="wp-image-2443" srcset="/wp-content/uploads/2024/01/image-12.png 387w, /wp-content/uploads/2024/01/image-12-300x42.png 300w" sizes="auto, (max-width: 387px) 100vw, 387px"></figure>



<p class="wp-block-paragraph">Store this encrypted string in the <strong>settings-security.xml</strong> located in the ‘<strong>%USERPROFILE%\.m2\</strong>‘ folder. If this does not already exist, then create it with the following content:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="xml" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>&lt;settingsSecurity&gt;
&lt;master&gt;{sMFA/2y5+qAHjPPmlxkFj1tcWbU6CGKwm3t1dA1eGSo=}&lt;/master&gt;
&lt;/settingsSecurity&gt;</code></pre>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Configure_Project_Settings_settingsxml"></span>Configure Project Settings (settings.xml)<span class="ez-toc-section-end"></span></h4>



<p class="wp-block-paragraph">The following sections provide example <strong>settings.xml</strong> files that allow the Build Tools to be used with or without an artefact repository manager. I felt it would be useful for those who simply want to test-drive the Build Tools without having to invest in deploying a dedicated platform.</p>



<p class="wp-block-paragraph">The settings.xml file should be created in the ‘<strong>%USERPROFILE%\.m2\</strong>‘ folder.</p>



<h5 class="wp-block-heading" id="the-pasted-async">Settings.xml (using Artifactory Repository)</h5>



<p class="wp-block-paragraph">Use the following <strong>Settings.xml</strong> example to use Build Tools with Artifactory Repository Manager. All artefacts are retrieved from this repository. If you followed my setup, then requests to Maven Central will be proxied through Artifactory, and the keystore file will be downloaded from the <strong>aria-local</strong> repository.</p>



<p class="wp-block-paragraph" id="the-pasted-async">Replace all values with <strong>{{ }} </strong>with your own.</p>



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



<p class="wp-block-paragraph">Replace all values with {{ }} with your own.</p>



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



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Create_Your_First_Project_Actions-based"></span>Create Your First Project (Actions-based)<span class="ez-toc-section-end"></span></h2>



<p class="wp-block-paragraph">In this example, I will show you how to create a JavaScript Actions-based project and how to push and pull code. If you wish to try out other project types, then use the official docs for guidance&nbsp;<a href="https://github.com/vmware/build-tools-for-vmware-aria/tree/v2.36.0/docs/archive/doc/markdown" target="_blank" rel="noopener noreferrer">https://github.com/vmware/build-tools-for-vmware-aria/tree/v2.36.0/docs/archive/doc/markdown</a>.</p>



<p class="wp-block-paragraph">I recommend creating a single new root folder to store your projects. Open a command prompt and enter this folder location. Run the following command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=com.vmware.pscoe.o11n.archetypes -DarchetypeArtifactId=package-actions-archetype -DarchetypeVersion=4.7.0 -DgroupId=com.simplygeek -DartifactId=js-actions</code></pre>



<p class="wp-block-paragraph">Replace <strong>‘com.simplygeek</strong>‘ with your own value if you wish!</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-16.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1577" height="649" src="/wp-content/uploads/2024/01/image-16.png" alt="" class="wp-image-2456" srcset="/wp-content/uploads/2024/01/image-16.png 1577w, /wp-content/uploads/2024/01/image-16-300x123.png 300w, /wp-content/uploads/2024/01/image-16-1024x421.png 1024w, /wp-content/uploads/2024/01/image-16-768x316.png 768w, /wp-content/uploads/2024/01/image-16-1536x632.png 1536w, /wp-content/uploads/2024/01/image-16-640x263.png 640w" sizes="auto, (max-width: 1577px) 100vw, 1577px"></a></figure>



<p class="wp-block-paragraph">A new folder is created called ‘<strong>js-actions</strong>‘ and will include a <strong>sample.js</strong> function/action.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Push_Actions"></span>Push Actions<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Push this new project to the Orchestrator server with the following command:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn clean package vrealize:push -DincludeDependencies=true -DskipTests -Paria -f "js-actions"</code></pre>



<p class="wp-block-paragraph">If this is successful, you will see that the package now exists under the Packages section in Orchestrator:</p>



<figure class="wp-block-image"><a href="/wp-content/uploads/2024/01/image-17.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" width="1439" height="341" src="/wp-content/uploads/2024/01/image-17.png" alt="" class="wp-image-2457" srcset="/wp-content/uploads/2024/01/image-17.png 1439w, /wp-content/uploads/2024/01/image-17-300x71.png 300w, /wp-content/uploads/2024/01/image-17-1024x243.png 1024w, /wp-content/uploads/2024/01/image-17-768x182.png 768w, /wp-content/uploads/2024/01/image-17-640x152.png 640w" sizes="auto, (max-width: 1439px) 100vw, 1439px"></a></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Pull_Actions"></span>Pull Actions<span class="ez-toc-section-end"></span></h3>



<p class="wp-block-paragraph">Pull this project from the Orchestrator server with the following command:</p>



<p class="wp-block-paragraph"><strong>Tip:</strong> You can add additional server-side Actions to the package that was pushed, and it will also be pulled down.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>mvn clean package vro:pull -DincludeDependencies=true -DskipTests -Paria -f "js-actions"</code></pre>



<p class="wp-block-paragraph">If you’ve made it this far and everything is working, well done! In future posts, I’ll dive deeper into the various project types you can create and explore strategies for managing them effectively in a Git repository.</p>



<p class="wp-block-paragraph">I’ve done my best to test all the steps and solutions outlined here, but if you run into any issues, feel free to leave a comment, and I’ll do my best to help you out.</p>





