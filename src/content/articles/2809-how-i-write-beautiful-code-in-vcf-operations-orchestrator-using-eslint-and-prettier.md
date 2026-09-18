---
title: "How I Write Beautiful Code in VCF Operations Orchestrator using ESLint and Prettier"
description: "Configure ESLint and Prettier for Orchestrator JavaScript development, including command-line checks, VS Code formatting and performance tuning."
path: "/how-i-write-beautiful-code-in-vcf-operations-orchestrator-using-eslint-and-prettier/"
kind: "post"
published: "2025-07-17T16:36:53Z"
updated: "2026-09-18T16:22:41Z"
author: "SimplyGeek"
categories: ["Prettier","JavaScript","ESLint","Broadcom (VMware)","VMware Cloud Foundation","VCF Automation","VCF Operations Orchestrator"]
tags: ["Prettier","Visual Studio Code","ESLint","VCF Automation","VCF Operations Orchestrator"]
wordpressId: 2809
originalUrl: "https://simplygeek.co.uk/how-i-write-beautiful-code-in-vcf-operations-orchestrator-using-eslint-and-prettier/"
---


<p class="wp-block-paragraph">I use a consistent code style for VCF Operations Orchestrator development. It makes files easier to navigate, patterns easier to identify and code easier to read.</p>



<p class="wp-block-paragraph">Applying industry conventions and team preferences manually can be tedious. Configured tools automate formatting and keep the codebase consistent.</p>



<p class="wp-block-paragraph">I use two tools:</p>



<ul class="wp-block-list">
<li><strong>ESLint</strong> – A widely used JavaScript and TypeScript linter with customisable rules. It identifies code problems and can apply fixes automatically to improve quality and consistency.</li>



<li><strong>Prettier</strong> – A formatter that applies consistent style. It does not check logic or enforce coding best practices. Although ESLint can also format code, Prettier is increasingly favoured for its minimal configuration, speed and consistent output.</li>
</ul>



<p class="wp-block-paragraph">Together, these tools can detect issues such as:</p>



<ul class="wp-block-list">
<li>Missing JSDoc blocks for functions and classes</li>



<li>Incorrect or inconsistent indentation</li>



<li>Lines exceeding the maximum allowed length</li>



<li>Use of single quotes instead of preferred double quotes</li>



<li>Multiple consecutive empty lines</li>



<li>Missing spaces around unary operators</li>
</ul>



<p class="wp-block-paragraph">You can customise the rules to suit your preferences or team standards. <strong>Prettier</strong> deliberately offers fewer choices to keep formatting consistent with minimal configuration.</p>



<p class="wp-block-paragraph">The tools can also apply fixes automatically when you save a file. This reduces the time spent correcting formatting and syntax issues by hand.</p>



<p class="wp-block-paragraph">This example shows style issues the tools can detect and fix:</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-8.png"><img loading="lazy" decoding="async" width="617" height="326" src="/wp-content/uploads/2025/07/image-8.png" alt="" class="wp-image-2821" srcset="/wp-content/uploads/2025/07/image-8.png 617w, /wp-content/uploads/2025/07/image-8-300x159.png 300w" sizes="auto, (max-width: 617px) 100vw, 617px"></a></figure>



<p class="wp-block-paragraph">The screenshot shows three issues:</p>



<ol class="wp-block-list">
<li>The first <code>if</code> statement does not use strict inequality (<code>!==</code>).</li>



<li>There is no newline between the second and third <code>if</code> statements.</li>



<li>There are two consecutive newlines following the third <code>if</code> statement.</li>
</ol>



<p class="wp-block-paragraph">With the tools configured, saving the file corrects these issues automatically.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-9.png"><img loading="lazy" decoding="async" width="618" height="324" src="/wp-content/uploads/2025/07/image-9.png" alt="" class="wp-image-2822" srcset="/wp-content/uploads/2025/07/image-9.png 618w, /wp-content/uploads/2025/07/image-9-300x157.png 300w" sizes="auto, (max-width: 618px) 100vw, 618px"></a></figure>



<p class="wp-block-paragraph">These screenshots show Visual Studio Code, which I configure later in the post. You can get the same results from the command line, including in a CI pipeline or without an IDE.</p>



<h2 class="wp-block-heading">Configure the development environment for ESLint and Prettier</h2>



<p>This guide uses Windows and assumes you have:</p><ul><li>Your source code available locally.</li><li><a href="/series/build-tools-for-vmware-aria/" data-type="series" data-id="219" target="_blank" rel="noopener noreferrer">Build Tools for VMware Aria</a> to manage Orchestrator code in a local development environment.</li><li><a href="https://nodejs.org/" data-type="link" data-id="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a>, which should already be installed for Build Tools.</li></ul>



<p class="wp-block-paragraph">Open a command prompt in the project's root directory. Run this command to install the ESLint and Prettier dependencies:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="bash" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>npm install --save-dev eslint prettier jsdoc @eslint/js eslint-config-prettier eslint-plugin-prettier eslint-plugin-jsdoc</code></pre>



<p>Place both configuration files in the project root. These examples come from my project:</p><ul><li><a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/eslint.config.js" target="_blank" rel="noopener noreferrer">eslint.config.js</a> defines the ESLint rules.</li><li><a href="https://github.com/simplygeekuk/vcf-automation-maven/blob/main/.prettierrc" target="_blank" rel="noopener noreferrer">.prettierrc</a> configures Prettier.</li></ul>



<p class="wp-block-paragraph">After installing the dependencies and adding the configuration, run either tool from the command line. Both can check files without changing them or write automatic fixes. The following commands show these two modes.</p>



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



<p class="wp-block-paragraph">In check mode, Prettier identifies files that do not match its formatting rules.</p>



<figure class="wp-block-image size-full is-resized"><a href="/wp-content/uploads/2025/07/image-10.png"><img loading="lazy" decoding="async" width="765" height="204" src="/wp-content/uploads/2025/07/image-10.png" alt="" class="wp-image-2825" srcset="/wp-content/uploads/2025/07/image-10.png 765w, /wp-content/uploads/2025/07/image-10-300x80.png 300w" sizes="auto, (max-width: 765px) 100vw, 765px"></a></figure>



<p class="wp-block-paragraph">ESLint also reports the line number and rule for each issue.</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-11.png"><img loading="lazy" decoding="async" width="797" height="110" src="/wp-content/uploads/2025/07/image-11.png" alt="" class="wp-image-2828" srcset="/wp-content/uploads/2025/07/image-11.png 797w, /wp-content/uploads/2025/07/image-11-300x41.png 300w, /wp-content/uploads/2025/07/image-11-768x106.png 768w" sizes="auto, (max-width: 797px) 100vw, 797px"></a></figure>



<p class="wp-block-paragraph">Prettier handles formatting, but some ESLint rules also control style. The overlap can cause conflicting fixes and extra processing. Disable the conflicting ESLint rules to use the tools together. The example configuration already does this.</p>



<h2 class="wp-block-heading">Use ESLint and Prettier with Visual Studio Code</h2>



<p class="wp-block-paragraph">In Visual Studio Code, search the extensions marketplace for <strong>ESLint</strong> and <strong>Prettier – Code formatter</strong>.</p>



<p class="wp-block-paragraph">Add the following to your VS Code <strong>user</strong> or <strong>workspace </strong>settings:</p>



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



<p class="wp-block-paragraph">The configuration above requires manual Prettier formatting and displays ESLint issues in the editor. To apply automatic formatting and fixes when you save, add the following settings:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>    // Format on save:
    "editor.formatOnSave": true,

    // use ESLint to fix issues (including padding) on save:
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },</code></pre>



<p class="wp-block-paragraph">Prettier usually formats files almost instantly. ESLint can be slower on large files or with complex rules. If you notice delays, run this command against a file to inspect ESLint performance:</p>



<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group=""><code>set TIMING=1&amp;&amp; npx eslint src\main\resources\somefile.js</code></pre>



<p class="wp-block-paragraph">The command produces a report like this:</p>



<figure class="wp-block-image size-full"><a href="/wp-content/uploads/2025/07/image-12.png"><img loading="lazy" decoding="async" width="414" height="202" src="/wp-content/uploads/2025/07/image-12.png" alt="" class="wp-image-2834" srcset="/wp-content/uploads/2025/07/image-12.png 414w, /wp-content/uploads/2025/07/image-12-300x146.png 300w" sizes="auto, (max-width: 414px) 100vw, 414px"></a></figure>



<p class="wp-block-paragraph">I found JSDoc rules relatively slow, and most could not apply fixes automatically. I excluded them from processing on save. The following VS Code User or Workspace setting excludes specific rules from automatic runs:</p>



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



<p class="wp-block-paragraph">Automating formatting and style checks helps keep Orchestrator code consistent. The same approach also works for other JavaScript projects.</p>



<p class="wp-block-paragraph">If you use other tools or have suggestions for my configuration, I would like to hear them.</p>

