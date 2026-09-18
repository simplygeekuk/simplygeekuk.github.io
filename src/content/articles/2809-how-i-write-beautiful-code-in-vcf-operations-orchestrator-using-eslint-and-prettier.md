---
title: "How I Write Beautiful Code in VCF Operations Orchestrator using ESLint and Prettier"
description: "When developing code for VCF Operations Orchestrator, I follow a strict and consistent style methodology. This approach significantly simplifies navigating multiple files, identifying patterns, and maintaining readability across the…"
path: "/how-i-write-beautiful-code-in-vcf-operations-orchestrator-using-eslint-and-prettier/"
kind: "post"
published: "2025-07-17T16:36:53Z"
updated: "2025-07-17T16:36:56Z"
author: "SimplyGeek"
categories: ["Prettier","JavaScript","ESLint","Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator"]
tags: ["Prettier","Visual Studio Code","ESLint","VCF Automation","VCF Operations Orchestrator"]
wordpressId: 2809
originalUrl: "https://simplygeek.co.uk/how-i-write-beautiful-code-in-vcf-operations-orchestrator-using-eslint-and-prettier/"
---


<p class="wp-block-paragraph">When developing code for VCF Operations Orchestrator, I follow a strict and consistent style methodology. This approach significantly simplifies navigating multiple files, identifying patterns, and maintaining readability across the codebase.</p>



<p class="wp-block-paragraph">Adhering to both industry-standard and custom styling conventions can be tedious, but fortunately, some tools make this process much simpler once properly configured. These tools help automate formatting and ensure consistency across the codebase with minimal manual effort.</p>



<p class="wp-block-paragraph">I use two different tools to achieve this:</p>



<ul class="wp-block-list">
<li><strong>ESLint</strong> – A widely used linting tool for JavaScript and TypeScript that helps identify and fix problems in your code. It supports customizable rules and can automatically apply fixes, making it a powerful tool for maintaining code quality and consistency.</li>



<li><strong>Prettier</strong> – A code formatting tool that enforces consistent stylistic rules across your codebase. Unlike ESLint, Prettier doesn’t check for logical errors or implement best practices. While ESLint can also handle formatting, Prettier is increasingly favoured for this purpose due to its “zero-config” simplicity, speed, and consistent output.</li>
</ul>



<p class="wp-block-paragraph">Here are just a few examples of the types of issues these tools can detect:</p>



<ul class="wp-block-list">
<li>Missing JSDoc blocks for functions and classes</li>



<li>Incorrect or inconsistent indentation</li>



<li>Lines exceeding the maximum allowed length</li>



<li>Use of single quotes instead of preferred double quotes</li>



<li>Multiple consecutive empty lines</li>



<li>Missing spaces around unary operators</li>
</ul>



<p class="wp-block-paragraph">While some of these rules may seem opinionated, the configuration is highly customizable to suit your preferences or team standards. That said, it’s worth noting that <strong>Prettier</strong> is intentionally opinionated, by design, to promote consistency with minimal configuration.</p>



<p class="wp-block-paragraph">What makes these tools even more powerful is their ability to fix syntax and styling issues automatically; No need to chase down red squiggly lines or manually correct formatting. With proper configuration, they can automatically apply fixes every time you save a file, allowing you to stay focused on writing code while ensuring consistency and clean formatting in the background.</p>



<p class="wp-block-paragraph">Below is an example of some of the style fixes that can be detected and fixed:</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-8.png"><img loading="lazy" decoding="async" width="617" height="326" src="/wp-content/uploads/2025/07/image-8.png" alt="" class="wp-image-2821" srcset="/wp-content/uploads/2025/07/image-8.png 617w, /wp-content/uploads/2025/07/image-8-300x159.png 300w" sizes="auto, (max-width: 617px) 100vw, 617px"></a></figure>



<p class="wp-block-paragraph">In the screenshot above, there are three identified issues:</p>



<ol class="wp-block-list">
<li>The first <code>if</code> statement does not use strict inequality (<code>!==</code>).</li>



<li>There is no newline between the second and third <code>if</code> statements.</li>



<li>There are two consecutive newlines following the third <code>if</code> statement.</li>
</ol>



<p class="wp-block-paragraph">When the file is saved, these issues are automatically corrected by the configured tooling, ensuring clean, consistent code with no manual intervention.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-9.png"><img loading="lazy" decoding="async" width="618" height="324" src="/wp-content/uploads/2025/07/image-9.png" alt="" class="wp-image-2822" srcset="/wp-content/uploads/2025/07/image-9.png 618w, /wp-content/uploads/2025/07/image-9-300x157.png 300w" sizes="auto, (max-width: 618px) 100vw, 618px"></a></figure>



<p class="wp-block-paragraph">The screenshots above demonstrate this functionality in Visual Studio Code (I’ll walk through how to set this up later in the post), but the same results can be achieved via the command line, making it easy to integrate into a CI pipeline or use in environments without an IDE.</p>



<h2 class="wp-block-heading">Configure Development Environment for ESLint and Prettier</h2>



<p class="wp-block-paragraph">The following steps assume that your source code is available locally on your workstation. This also assumes you’re using the <a href="/series/build-tools-for-vmware-aria/" data-type="series" data-id="219" target="_blank" rel="noopener noreferrer">Build Tools for VMware Aria</a>, which enable you to manage your Orchestrator code in a local development environment. Additionally, you’ll need <a href="https://nodejs.org/" data-type="link" data-id="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> installed, though this should already be available if you’re working with the Build Tools. I should also note that I am using Windows.</p>



<p class="wp-block-paragraph">Open a command prompt and enter into the top-level directory of your project. Run the following command to install all the dependencies that are required for ESLint and Prettier to function.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="bash" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>npm install --save-dev eslint prettier jsdoc @eslint/js eslint-config-prettier eslint-plugin-prettier eslint-plugin-jsdoc</code></pre>



<p class="wp-block-paragraph">Both ESLint and Prettier require configuration files to define their rules and behavior. For ESLint, you’ll need an <a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/eslint.config.js" target="_blank" rel="noopener noreferrer">eslint.config.js</a>  file, and for Prettier, a <a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/.prettierrc" target="_blank" rel="noopener noreferrer">.prettierrc</a> file. These should be placed in the root directory of your project. To help you get started, I’ve linked to the configuration files from my own project as examples.</p>



<p class="wp-block-paragraph">Once the dependencies are installed and configuration is in place, you can run each tool directly from the command line. It’s important to note that both ESLint and Prettier support two modes of operation: a <strong>check mode</strong>, which reports issues without making changes, and a <strong>write mode</strong>, which automatically applies fixes to the code.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code># ESLint
## Check Mode
npx eslint "src\main\resources\**\*.js"

## Write Mode
npx eslint "src\main\resources\**\*.js" --fix


# Prettier
## Check Mode
npx prettier --check "src\main\resources/**/*.js"

# Write Mode
npx prettier --write "src\main\resources/**/*.js"</code></pre>



<p class="wp-block-paragraph">In check mode, Prettier will simply warn which file is non-compliant.</p>



<figure class="wp-block-image size-full is-resized"><a href="/wp-content/uploads/2025/07/image-10.png"><img loading="lazy" decoding="async" width="765" height="204" src="/wp-content/uploads/2025/07/image-10.png" alt="" class="wp-image-2825" srcset="/wp-content/uploads/2025/07/image-10.png 765w, /wp-content/uploads/2025/07/image-10-300x80.png 300w" sizes="auto, (max-width: 765px) 100vw, 765px"></a></figure>



<p class="wp-block-paragraph">Whereas ESLint will do the same, but will go into a bit more detail, highlighting the exact line number where a rule was broken and specifying which rule was violated.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-11.png"><img loading="lazy" decoding="async" width="797" height="110" src="/wp-content/uploads/2025/07/image-11.png" alt="" class="wp-image-2828" srcset="/wp-content/uploads/2025/07/image-11.png 797w, /wp-content/uploads/2025/07/image-11-300x41.png 300w, /wp-content/uploads/2025/07/image-11-768x106.png 768w" sizes="auto, (max-width: 797px) 100vw, 797px"></a></figure>



<p class="wp-block-paragraph">It’s important to note that while Prettier is specifically designed to handle code formatting, ESLint also includes rules for styling. This overlap can lead to both tools attempting to fix the same issues, potentially causing conflicts or unnecessary performance overhead. To avoid this, Prettier can be integrated with ESLint by disabling any conflicting rules within the ESLint configuration. The configuration examples I’ve provided above already include this integration.</p>



<h2 class="wp-block-heading">Using ESLint and Prettier with Visual Studio Code</h2>



<p class="wp-block-paragraph">If you are using Visual Studio Code as your preferred IDE then extensions are available for ESLint and Prettier. Search the extensions marketplace for “<strong>ESLint</strong>” and “<strong>Prettier – Code formatter</strong>“. </p>



<p class="wp-block-paragraph">Edit your VSCode <strong>user</strong> or <strong>workspace </strong>settings and apply the following:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>{
    // Use the new ESLint flat config style
    "eslint.useFlatConfig": true,

    // Only format when you have a Prettier config in your project:
    "prettier.requireConfig": true,

    // Use Prettier for all supported languages:
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
}</code></pre>



<p class="wp-block-paragraph">The configuration above still requires you to manually format files with Prettier or rely on red squiggly lines to identify issues flagged by ESLint. If you’d prefer a fully automated experience, where formatting, styling, and syntax issues are resolved on save, you can enable this by adding the following additional configuration.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>    // Format on save:
    "editor.formatOnSave": true,

    // use ESLint to fix issues (including padding) on save:
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },</code></pre>



<p class="wp-block-paragraph">Prettier typically applies formatting almost instantly, but ESLint can occasionally be slower, especially on larger files or projects with complex rule sets. If you’re experiencing performance issues, ESLint provides a way to diagnose them. You can run the following command against a file to perform an ESLint performance test:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>set TIMING=1&amp;&amp; npx eslint src\main\resources\somefile.js</code></pre>



<p class="wp-block-paragraph">A report similar to the following will be displayed:</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-12.png"><img loading="lazy" decoding="async" width="414" height="202" src="/wp-content/uploads/2025/07/image-12.png" alt="" class="wp-image-2834" srcset="/wp-content/uploads/2025/07/image-12.png 414w, /wp-content/uploads/2025/07/image-12-300x146.png 300w" sizes="auto, (max-width: 414px) 100vw, 414px"></a></figure>



<p class="wp-block-paragraph">I found that JSDoc-related rules tend to be relatively slow and, in most cases, cannot be automatically fixed. As a result, I chose to exclude them from on-save processing. Fortunately, Visual Studio Code provides an option to configure this behavior in the User or Workspace settings, allowing you to exclude specific rules from being run automatically.</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>  "eslint.options": {
    "overrideConfig": {
      "rules": {
        // disable the slow rules in the editor on save
        "jsdoc/check-access": "off",
        "jsdoc/check-values": "off",
        "jsdoc/require-description": "off",
        "jsdoc/valid-types": "off",
        "jsdoc/no-undefined-types": "off",
        "jsdoc/check-alignment": "off",
        "jsdoc/check-param-names": "off",
        "jsdoc/check-tag-names": "off",
        "jsdoc/check-types": "off",
        "jsdoc/check-property-names": "off",
        "jsdoc/require-property-description": "off",
        "jsdoc/require-jsdoc": "off",
      }
    }
  },</code></pre>



<p class="wp-block-paragraph">I hope this post has provided useful insight into writing clean, consistent code for VCF Operations Orchestrator (or any JavaScript project). By automating formatting and enforcing industry-standard styles, you can maintain high-quality code without disrupting your primary focus: getting the job done efficiently.</p>



<p class="wp-block-paragraph">If you use other styling tools, techniques, or have suggestions to improve my configuration, I’d love to connect and collaborate, feel free to share your ideas!</p>

