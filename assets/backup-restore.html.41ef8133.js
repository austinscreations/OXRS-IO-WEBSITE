import{f as n}from"./app.b38cdf7f.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="oxrs-backup-restore" tabindex="-1"><a class="header-anchor" href="#oxrs-backup-restore" aria-hidden="true">#</a> OXRS Backup/Restore</h1><h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><p>This guide provides a set of Node-RED flows for taking automated daily backups of your OXRS device configuration and storing them on the file system where Node-RED is running. There is another flow for restoring your OXRS device configuration from the most recent backup.</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>This backup method uses the <code>/api/config</code> REST API (GET) on an OXRS device, which only returns configuration that was also provisioned by the REST API. The web based Admin UI uses the REST API so any configuration set via that <strong>would be included</strong>. It will <strong>not include</strong> any configuration set using MQTT (via <code>conf/&lt;deviceid&gt;</code>), whether retained or not.</p></div><p>This guide assumes you have Node-RED installed and have a reasonable understanding of how to install nodes and import flows.</p><h2 id="setup" tabindex="-1"><a class="header-anchor" href="#setup" aria-hidden="true">#</a> Setup</h2><p>You will need to setup an MQTT broker configuration for your own MQTT broker and update the MQTT node at the start of the backup flow to use this.</p><p>You can also (optionally) adjust the variables in the <code>BACKUP VARS</code> node (in both the backup and restore flows). These have sensible defaults and are pretty self-explanatory.</p><table><thead><tr><th style="text-align:left;">Variable</th><th style="text-align:left;">Description</th><th style="text-align:left;">Default</th></tr></thead><tbody><tr><td style="text-align:left;"><code>backupFolder</code></td><td style="text-align:left;">The absolute path (with trailing forward slash) where you want your backups to be written</td><td style="text-align:left;"><code>/data/oxrs/backups/</code></td></tr><tr><td style="text-align:left;"><code>backupCount</code></td><td style="text-align:left;">How many backups to keep (most recent), any others will be automatically deleted</td><td style="text-align:left;">10</td></tr></tbody></table><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>If you are running Node-RED in a docker container then it is recommended to ensure you are writing your backups to a volume that is mounted outside the container. Otherwise when the container restarts you will lose all your backups!</p></div><h2 id="backup" tabindex="-1"><a class="header-anchor" href="#backup" aria-hidden="true">#</a> Backup</h2><p>The backup flow will run at 1am every night by default. You can adjust this schedule by editing the injection node (named <code>stat/+/adopt</code>). You can also manually trigger a backup by clicking the button on that inject node.</p><p>The flow will automatically create a sub-folder under <code>backupFolder</code> for each device, using the device IP address as the sub-folder name. It will then create a backup with a filename in the form <code>config_&lt;YYYY-MM-DDTHH:mm:ss&gt;.json</code>.</p><p>So the full path for a backup will look something like this (assuming default <code>backupFolder</code>);</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/data/oxrs/backups/192.168.1.99/config_2022-01-01T12:34:56.json
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>The flow will automatically delete any backups (oldest first) when there are more than <code>backupCount</code> found.</p><h2 id="restore" tabindex="-1"><a class="header-anchor" href="#restore" aria-hidden="true">#</a> Restore</h2><p>The restore flow is manually triggered only. You need to set the IP address of the device you wish to restore in the node at the start of the flow (named <code>DEVICE IP</code>). Once set you can trigger the flow by clicking the button on that inject node.</p><p>This will check the device is online, retrieve the most recent configuration backup, and push that config to the device using the <code>/api/config</code> REST API (POST). There is no confirmation or feedback to indicate if it was successful or not (feel free to build upon and improve this if you want!).</p><h2 id="the-flow" tabindex="-1"><a class="header-anchor" href="#the-flow" aria-hidden="true">#</a> The Flow!</h2><p>Import the flow (below) into your Node-RED instance and give it a try!</p><details class="custom-container details"><summary>Click me to view the Node-RED flow!</summary><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fce939553f15dc79&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mqtt in&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;topic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;qos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;datatype&quot;</span><span class="token operator">:</span> <span class="token string">&quot;json&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;broker&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1480b452.05e9ac&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;nl&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rap&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rh&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inputs&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">130</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">900</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;cc23751093fa7e87&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;12c6c6cc42879632&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;69b501fa856af3ba&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;inject&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;subscribe&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;props&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;action&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;v&quot;</span><span class="token operator">:</span> <span class="token string">&quot;subscribe&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;vt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;repeat&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;crontab&quot;</span><span class="token operator">:</span> <span class="token string">&quot;00 01 * * *&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;once&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;onceDelay&quot;</span><span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;topic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">130</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">820</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;ecce5d52223e71bc&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;00147244902ff136&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http request&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;api/config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;method&quot;</span><span class="token operator">:</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ret&quot;</span><span class="token operator">:</span> <span class="token string">&quot;txt&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;paytoqs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ignore&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://{{ topic }}/api/config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;tls&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;persist&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;proxy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;authType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;senderr&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">560</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">820</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;910f2850b3b9718c&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;e70e470d434eb214&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;filename&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;appendNewline&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;createDir&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;overwriteFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;encoding&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">760</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">980</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;38657f615b11b12c&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cc23751093fa7e87&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get ip&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload.network.ip&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">350</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">820</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;4f8edc44858e327c&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;7d7010b6c7749b52&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;filename&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;filename&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;$.backupPath &amp; \\&quot;/config_\\&quot; &amp; $.backupDttm &amp; \\&quot;.json\\&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jsonata&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">760</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">940</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;e70e470d434eb214&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;38657f615b11b12c&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fs-ops-dir&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get old config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupPath&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;pathType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;config_*.json&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;filterType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;dir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;dirType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">990</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">820</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;454744722ac8f10d&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;454744722ac8f10d&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sort&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sort&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token string">&quot;descending&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;as_num&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;target&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;targetType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;msgKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;msgKeyType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;elem&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;seqKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;seqKeyType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">970</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">860</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;3bb36c43ed6bd4d9&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;910f2850b3b9718c&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;switch&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;api ok?&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;statusCode&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;propertyType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;v&quot;</span><span class="token operator">:</span> <span class="token string">&quot;200&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;vt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;num&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;checkall&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;repair&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outputs&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">560</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">860</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;0db41b5ec94cf901&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;4f8edc44858e327c&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ping&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Automatic&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;mode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;triggered&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ping&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;timer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inputs&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">350</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">860</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;1892633c9ccaf2a7&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1892633c9ccaf2a7&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;switch&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ping ok?&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;propertyType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;false&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;else&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;checkall&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;repair&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outputs&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">360</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">900</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;00147244902ff136&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0db41b5ec94cf901&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;json&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;json&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;pretty&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">550</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">900</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;b6a3e5d9af021021&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;7be663eaa364d51f&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backup path&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupPath&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;$.backupFolder &amp; $.topic&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jsonata&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;timestamp&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;date&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">770</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">860</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;5a3f8779d2f45553&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;5a3f8779d2f45553&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;moment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backup dttm&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;topic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;input&quot;</span><span class="token operator">:</span> <span class="token string">&quot;timestamp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inputType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inTz&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Pacific/Auckland&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;adjAmount&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;adjType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;days&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;adjDir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;add&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;YYYY-MM-DDTHH:mm:ss&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;locale&quot;</span><span class="token operator">:</span> <span class="token string">&quot;en-US&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;output&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupDttm&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outputType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outTz&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Pacific/Auckland&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">770</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">900</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;7d7010b6c7749b52&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3bb36c43ed6bd4d9&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;split&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;splt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\\\\n&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;spltType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;arraySplt&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;arraySpltType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;len&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;stream&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;addname&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">970</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">900</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;edda83c9ec6583b7&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;edda83c9ec6583b7&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;switch&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;is old backup?&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;parts.index&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;propertyType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;gte&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;v&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupCount&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;vt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;checkall&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;repair&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outputs&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">940</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;a71bd55291de40b2&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;a71bd55291de40b2&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fs-ops-delete&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupPath&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;pathType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;filename&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;filenameType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">970</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">980</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;adb515c44f5a6bfd&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backup oxrs config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">130</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">780</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;4e1aab146bdee027&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;device online?&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">370</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">780</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;aa2b06c40d2e8869&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get device config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">580</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">780</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;74dd8a36d220117e&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backup config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">770</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">780</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;a2c6ca2f8cb7ccf0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;delete old backups&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">1010</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">780</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;b6a3e5d9af021021&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;BACKUP VARS&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupFolder&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/data/oxrs/backups/&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupCount&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;10&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;num&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">780</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">820</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;7be663eaa364d51f&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node-red/cog.svg&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;6d4cc7c66695df98&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;inject&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;DEVICE IP&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;props&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;repeat&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;crontab&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;once&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;onceDelay&quot;</span><span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;topic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;payload&quot;</span><span class="token operator">:</span> <span class="token string">&quot;192.168.40.50&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;payloadType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">120</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1100</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;af6561e21c8b49af&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;f6977fbce689135d&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http request&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;api/config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;method&quot;</span><span class="token operator">:</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ret&quot;</span><span class="token operator">:</span> <span class="token string">&quot;txt&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;paytoqs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ignore&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://{{ topic }}/api/config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;tls&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;persist&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;proxy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;authType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;senderr&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">980</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1100</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;530cfc93f2729102&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fs-ops-dir&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get old config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupPath&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;pathType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;config_*.json&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;filterType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;dir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;dirType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">770</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1100</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;02acb5e523642677&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;02acb5e523642677&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sort&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sort&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token string">&quot;descending&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;as_num&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;target&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;targetType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;msgKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;msgKeyType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;elem&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;seqKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;seqKeyType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">750</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1140</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;9319428c5ed4571e&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;af6561e21c8b49af&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ping&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Automatic&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;mode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;triggered&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ping&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;timer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inputs&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">350</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1100</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;2d63a45ffe44b2be&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2d63a45ffe44b2be&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;switch&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ping ok?&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;payload&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;propertyType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;false&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;else&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;checkall&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;repair&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outputs&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">360</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1140</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;268f57024ffe9efb&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;e1c3be1bec9f22b5&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;restore oxrs config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">130</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1060</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2dff68ec5d4b3478&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;device online?&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">370</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1060</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;b87fd9ed4e414549&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;post device config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">1010</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1060</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;c42f4e2ec2e3a3f0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backup path&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupPath&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;$.backupFolder &amp; $.topic&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jsonata&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">570</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1140</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;530cfc93f2729102&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;da0e011c30df93e3&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backup config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">570</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1060</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;268f57024ffe9efb&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;BACKUP VARS&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;backupFolder&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/data/oxrs/backups/&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">580</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1100</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;c42f4e2ec2e3a3f0&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node-red/cog.svg&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;9319428c5ed4571e&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;filename&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;filename&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;$.backupPath &amp; \\&quot;/\\&quot; &amp; $.payload[0]&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jsonata&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">760</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1180</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;bfac555331543e30&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bfac555331543e30&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;file in&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;filename&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;utf8&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;chunk&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sendError&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;encoding&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;allProps&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">760</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1220</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;f6977fbce689135d&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fbe3d89aafa99e81&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;comment&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get latest config&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">780</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">1060</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;12c6c6cc42879632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;unsubscribe&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;action&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;unsubscribe&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">130</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">960</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;ecce5d52223e71bc&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ecce5d52223e71bc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;z&quot;</span><span class="token operator">:</span> <span class="token string">&quot;df151d7fdd900632&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stat/+/adopt&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;t&quot;</span><span class="token operator">:</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;p&quot;</span><span class="token operator">:</span> <span class="token string">&quot;topic&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;pt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stat/+/adopt&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tot&quot;</span><span class="token operator">:</span> <span class="token string">&quot;str&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;property&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reg&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;x&quot;</span><span class="token operator">:</span> <span class="token number">130</span><span class="token punctuation">,</span>
        <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token number">860</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wires&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token string">&quot;fce939553f15dc79&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1480b452.05e9ac&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mqtt-broker&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mosquitto&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;broker&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mqtt.home&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1883&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;clientid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nodered&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;autoConnect&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;usetls&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;compatmode&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;protocolVersion&quot;</span><span class="token operator">:</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;keepalive&quot;</span><span class="token operator">:</span> <span class="token string">&quot;60&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;cleansession&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;birthTopic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stat/nodered/lwt&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;birthQos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;birthRetain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;birthPayload&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{\\&quot;online\\&quot;:true}&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;birthMsg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;closeTopic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stat/nodered/lwt&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;closeQos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;closeRetain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;closePayload&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{\\&quot;online\\&quot;:false}&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;closeMsg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;willTopic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stat/nodered/lwt&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;willQos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;willRetain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;willPayload&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{\\&quot;online\\&quot;:false}&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;willMsg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sessionExpiry&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br><span class="line-number">324</span><br><span class="line-number">325</span><br><span class="line-number">326</span><br><span class="line-number">327</span><br><span class="line-number">328</span><br><span class="line-number">329</span><br><span class="line-number">330</span><br><span class="line-number">331</span><br><span class="line-number">332</span><br><span class="line-number">333</span><br><span class="line-number">334</span><br><span class="line-number">335</span><br><span class="line-number">336</span><br><span class="line-number">337</span><br><span class="line-number">338</span><br><span class="line-number">339</span><br><span class="line-number">340</span><br><span class="line-number">341</span><br><span class="line-number">342</span><br><span class="line-number">343</span><br><span class="line-number">344</span><br><span class="line-number">345</span><br><span class="line-number">346</span><br><span class="line-number">347</span><br><span class="line-number">348</span><br><span class="line-number">349</span><br><span class="line-number">350</span><br><span class="line-number">351</span><br><span class="line-number">352</span><br><span class="line-number">353</span><br><span class="line-number">354</span><br><span class="line-number">355</span><br><span class="line-number">356</span><br><span class="line-number">357</span><br><span class="line-number">358</span><br><span class="line-number">359</span><br><span class="line-number">360</span><br><span class="line-number">361</span><br><span class="line-number">362</span><br><span class="line-number">363</span><br><span class="line-number">364</span><br><span class="line-number">365</span><br><span class="line-number">366</span><br><span class="line-number">367</span><br><span class="line-number">368</span><br><span class="line-number">369</span><br><span class="line-number">370</span><br><span class="line-number">371</span><br><span class="line-number">372</span><br><span class="line-number">373</span><br><span class="line-number">374</span><br><span class="line-number">375</span><br><span class="line-number">376</span><br><span class="line-number">377</span><br><span class="line-number">378</span><br><span class="line-number">379</span><br><span class="line-number">380</span><br><span class="line-number">381</span><br><span class="line-number">382</span><br><span class="line-number">383</span><br><span class="line-number">384</span><br><span class="line-number">385</span><br><span class="line-number">386</span><br><span class="line-number">387</span><br><span class="line-number">388</span><br><span class="line-number">389</span><br><span class="line-number">390</span><br><span class="line-number">391</span><br><span class="line-number">392</span><br><span class="line-number">393</span><br><span class="line-number">394</span><br><span class="line-number">395</span><br><span class="line-number">396</span><br><span class="line-number">397</span><br><span class="line-number">398</span><br><span class="line-number">399</span><br><span class="line-number">400</span><br><span class="line-number">401</span><br><span class="line-number">402</span><br><span class="line-number">403</span><br><span class="line-number">404</span><br><span class="line-number">405</span><br><span class="line-number">406</span><br><span class="line-number">407</span><br><span class="line-number">408</span><br><span class="line-number">409</span><br><span class="line-number">410</span><br><span class="line-number">411</span><br><span class="line-number">412</span><br><span class="line-number">413</span><br><span class="line-number">414</span><br><span class="line-number">415</span><br><span class="line-number">416</span><br><span class="line-number">417</span><br><span class="line-number">418</span><br><span class="line-number">419</span><br><span class="line-number">420</span><br><span class="line-number">421</span><br><span class="line-number">422</span><br><span class="line-number">423</span><br><span class="line-number">424</span><br><span class="line-number">425</span><br><span class="line-number">426</span><br><span class="line-number">427</span><br><span class="line-number">428</span><br><span class="line-number">429</span><br><span class="line-number">430</span><br><span class="line-number">431</span><br><span class="line-number">432</span><br><span class="line-number">433</span><br><span class="line-number">434</span><br><span class="line-number">435</span><br><span class="line-number">436</span><br><span class="line-number">437</span><br><span class="line-number">438</span><br><span class="line-number">439</span><br><span class="line-number">440</span><br><span class="line-number">441</span><br><span class="line-number">442</span><br><span class="line-number">443</span><br><span class="line-number">444</span><br><span class="line-number">445</span><br><span class="line-number">446</span><br><span class="line-number">447</span><br><span class="line-number">448</span><br><span class="line-number">449</span><br><span class="line-number">450</span><br><span class="line-number">451</span><br><span class="line-number">452</span><br><span class="line-number">453</span><br><span class="line-number">454</span><br><span class="line-number">455</span><br><span class="line-number">456</span><br><span class="line-number">457</span><br><span class="line-number">458</span><br><span class="line-number">459</span><br><span class="line-number">460</span><br><span class="line-number">461</span><br><span class="line-number">462</span><br><span class="line-number">463</span><br><span class="line-number">464</span><br><span class="line-number">465</span><br><span class="line-number">466</span><br><span class="line-number">467</span><br><span class="line-number">468</span><br><span class="line-number">469</span><br><span class="line-number">470</span><br><span class="line-number">471</span><br><span class="line-number">472</span><br><span class="line-number">473</span><br><span class="line-number">474</span><br><span class="line-number">475</span><br><span class="line-number">476</span><br><span class="line-number">477</span><br><span class="line-number">478</span><br><span class="line-number">479</span><br><span class="line-number">480</span><br><span class="line-number">481</span><br><span class="line-number">482</span><br><span class="line-number">483</span><br><span class="line-number">484</span><br><span class="line-number">485</span><br><span class="line-number">486</span><br><span class="line-number">487</span><br><span class="line-number">488</span><br><span class="line-number">489</span><br><span class="line-number">490</span><br><span class="line-number">491</span><br><span class="line-number">492</span><br><span class="line-number">493</span><br><span class="line-number">494</span><br><span class="line-number">495</span><br><span class="line-number">496</span><br><span class="line-number">497</span><br><span class="line-number">498</span><br><span class="line-number">499</span><br><span class="line-number">500</span><br><span class="line-number">501</span><br><span class="line-number">502</span><br><span class="line-number">503</span><br><span class="line-number">504</span><br><span class="line-number">505</span><br><span class="line-number">506</span><br><span class="line-number">507</span><br><span class="line-number">508</span><br><span class="line-number">509</span><br><span class="line-number">510</span><br><span class="line-number">511</span><br><span class="line-number">512</span><br><span class="line-number">513</span><br><span class="line-number">514</span><br><span class="line-number">515</span><br><span class="line-number">516</span><br><span class="line-number">517</span><br><span class="line-number">518</span><br><span class="line-number">519</span><br><span class="line-number">520</span><br><span class="line-number">521</span><br><span class="line-number">522</span><br><span class="line-number">523</span><br><span class="line-number">524</span><br><span class="line-number">525</span><br><span class="line-number">526</span><br><span class="line-number">527</span><br><span class="line-number">528</span><br><span class="line-number">529</span><br><span class="line-number">530</span><br><span class="line-number">531</span><br><span class="line-number">532</span><br><span class="line-number">533</span><br><span class="line-number">534</span><br><span class="line-number">535</span><br><span class="line-number">536</span><br><span class="line-number">537</span><br><span class="line-number">538</span><br><span class="line-number">539</span><br><span class="line-number">540</span><br><span class="line-number">541</span><br><span class="line-number">542</span><br><span class="line-number">543</span><br><span class="line-number">544</span><br><span class="line-number">545</span><br><span class="line-number">546</span><br><span class="line-number">547</span><br><span class="line-number">548</span><br><span class="line-number">549</span><br><span class="line-number">550</span><br><span class="line-number">551</span><br><span class="line-number">552</span><br><span class="line-number">553</span><br><span class="line-number">554</span><br><span class="line-number">555</span><br><span class="line-number">556</span><br><span class="line-number">557</span><br><span class="line-number">558</span><br><span class="line-number">559</span><br><span class="line-number">560</span><br><span class="line-number">561</span><br><span class="line-number">562</span><br><span class="line-number">563</span><br><span class="line-number">564</span><br><span class="line-number">565</span><br><span class="line-number">566</span><br><span class="line-number">567</span><br><span class="line-number">568</span><br><span class="line-number">569</span><br><span class="line-number">570</span><br><span class="line-number">571</span><br><span class="line-number">572</span><br><span class="line-number">573</span><br><span class="line-number">574</span><br><span class="line-number">575</span><br><span class="line-number">576</span><br><span class="line-number">577</span><br><span class="line-number">578</span><br><span class="line-number">579</span><br><span class="line-number">580</span><br><span class="line-number">581</span><br><span class="line-number">582</span><br><span class="line-number">583</span><br><span class="line-number">584</span><br><span class="line-number">585</span><br><span class="line-number">586</span><br><span class="line-number">587</span><br><span class="line-number">588</span><br><span class="line-number">589</span><br><span class="line-number">590</span><br><span class="line-number">591</span><br><span class="line-number">592</span><br><span class="line-number">593</span><br><span class="line-number">594</span><br><span class="line-number">595</span><br><span class="line-number">596</span><br><span class="line-number">597</span><br><span class="line-number">598</span><br><span class="line-number">599</span><br><span class="line-number">600</span><br><span class="line-number">601</span><br><span class="line-number">602</span><br><span class="line-number">603</span><br><span class="line-number">604</span><br><span class="line-number">605</span><br><span class="line-number">606</span><br><span class="line-number">607</span><br><span class="line-number">608</span><br><span class="line-number">609</span><br><span class="line-number">610</span><br><span class="line-number">611</span><br><span class="line-number">612</span><br><span class="line-number">613</span><br><span class="line-number">614</span><br><span class="line-number">615</span><br><span class="line-number">616</span><br><span class="line-number">617</span><br><span class="line-number">618</span><br><span class="line-number">619</span><br><span class="line-number">620</span><br><span class="line-number">621</span><br><span class="line-number">622</span><br><span class="line-number">623</span><br><span class="line-number">624</span><br><span class="line-number">625</span><br><span class="line-number">626</span><br><span class="line-number">627</span><br><span class="line-number">628</span><br><span class="line-number">629</span><br><span class="line-number">630</span><br><span class="line-number">631</span><br><span class="line-number">632</span><br><span class="line-number">633</span><br><span class="line-number">634</span><br><span class="line-number">635</span><br><span class="line-number">636</span><br><span class="line-number">637</span><br><span class="line-number">638</span><br><span class="line-number">639</span><br><span class="line-number">640</span><br><span class="line-number">641</span><br><span class="line-number">642</span><br><span class="line-number">643</span><br><span class="line-number">644</span><br><span class="line-number">645</span><br><span class="line-number">646</span><br><span class="line-number">647</span><br><span class="line-number">648</span><br><span class="line-number">649</span><br><span class="line-number">650</span><br><span class="line-number">651</span><br><span class="line-number">652</span><br><span class="line-number">653</span><br><span class="line-number">654</span><br><span class="line-number">655</span><br><span class="line-number">656</span><br><span class="line-number">657</span><br><span class="line-number">658</span><br><span class="line-number">659</span><br><span class="line-number">660</span><br><span class="line-number">661</span><br><span class="line-number">662</span><br><span class="line-number">663</span><br><span class="line-number">664</span><br><span class="line-number">665</span><br><span class="line-number">666</span><br><span class="line-number">667</span><br><span class="line-number">668</span><br><span class="line-number">669</span><br><span class="line-number">670</span><br><span class="line-number">671</span><br><span class="line-number">672</span><br><span class="line-number">673</span><br><span class="line-number">674</span><br><span class="line-number">675</span><br><span class="line-number">676</span><br><span class="line-number">677</span><br><span class="line-number">678</span><br><span class="line-number">679</span><br><span class="line-number">680</span><br><span class="line-number">681</span><br><span class="line-number">682</span><br><span class="line-number">683</span><br><span class="line-number">684</span><br><span class="line-number">685</span><br><span class="line-number">686</span><br><span class="line-number">687</span><br><span class="line-number">688</span><br><span class="line-number">689</span><br><span class="line-number">690</span><br><span class="line-number">691</span><br><span class="line-number">692</span><br><span class="line-number">693</span><br><span class="line-number">694</span><br><span class="line-number">695</span><br><span class="line-number">696</span><br><span class="line-number">697</span><br><span class="line-number">698</span><br><span class="line-number">699</span><br><span class="line-number">700</span><br><span class="line-number">701</span><br><span class="line-number">702</span><br><span class="line-number">703</span><br><span class="line-number">704</span><br><span class="line-number">705</span><br><span class="line-number">706</span><br><span class="line-number">707</span><br><span class="line-number">708</span><br><span class="line-number">709</span><br><span class="line-number">710</span><br><span class="line-number">711</span><br><span class="line-number">712</span><br><span class="line-number">713</span><br><span class="line-number">714</span><br><span class="line-number">715</span><br><span class="line-number">716</span><br><span class="line-number">717</span><br><span class="line-number">718</span><br><span class="line-number">719</span><br><span class="line-number">720</span><br><span class="line-number">721</span><br><span class="line-number">722</span><br><span class="line-number">723</span><br><span class="line-number">724</span><br><span class="line-number">725</span><br><span class="line-number">726</span><br><span class="line-number">727</span><br><span class="line-number">728</span><br><span class="line-number">729</span><br><span class="line-number">730</span><br><span class="line-number">731</span><br><span class="line-number">732</span><br><span class="line-number">733</span><br><span class="line-number">734</span><br><span class="line-number">735</span><br><span class="line-number">736</span><br><span class="line-number">737</span><br><span class="line-number">738</span><br><span class="line-number">739</span><br><span class="line-number">740</span><br><span class="line-number">741</span><br><span class="line-number">742</span><br><span class="line-number">743</span><br><span class="line-number">744</span><br><span class="line-number">745</span><br><span class="line-number">746</span><br><span class="line-number">747</span><br><span class="line-number">748</span><br><span class="line-number">749</span><br><span class="line-number">750</span><br><span class="line-number">751</span><br><span class="line-number">752</span><br><span class="line-number">753</span><br><span class="line-number">754</span><br><span class="line-number">755</span><br><span class="line-number">756</span><br><span class="line-number">757</span><br><span class="line-number">758</span><br><span class="line-number">759</span><br><span class="line-number">760</span><br><span class="line-number">761</span><br><span class="line-number">762</span><br><span class="line-number">763</span><br><span class="line-number">764</span><br><span class="line-number">765</span><br><span class="line-number">766</span><br><span class="line-number">767</span><br><span class="line-number">768</span><br><span class="line-number">769</span><br><span class="line-number">770</span><br><span class="line-number">771</span><br><span class="line-number">772</span><br><span class="line-number">773</span><br><span class="line-number">774</span><br><span class="line-number">775</span><br><span class="line-number">776</span><br><span class="line-number">777</span><br><span class="line-number">778</span><br><span class="line-number">779</span><br><span class="line-number">780</span><br><span class="line-number">781</span><br><span class="line-number">782</span><br><span class="line-number">783</span><br><span class="line-number">784</span><br><span class="line-number">785</span><br><span class="line-number">786</span><br><span class="line-number">787</span><br><span class="line-number">788</span><br><span class="line-number">789</span><br><span class="line-number">790</span><br><span class="line-number">791</span><br><span class="line-number">792</span><br><span class="line-number">793</span><br><span class="line-number">794</span><br><span class="line-number">795</span><br><span class="line-number">796</span><br><span class="line-number">797</span><br><span class="line-number">798</span><br><span class="line-number">799</span><br><span class="line-number">800</span><br><span class="line-number">801</span><br><span class="line-number">802</span><br><span class="line-number">803</span><br><span class="line-number">804</span><br><span class="line-number">805</span><br><span class="line-number">806</span><br><span class="line-number">807</span><br><span class="line-number">808</span><br><span class="line-number">809</span><br><span class="line-number">810</span><br><span class="line-number">811</span><br><span class="line-number">812</span><br><span class="line-number">813</span><br><span class="line-number">814</span><br><span class="line-number">815</span><br><span class="line-number">816</span><br><span class="line-number">817</span><br><span class="line-number">818</span><br><span class="line-number">819</span><br><span class="line-number">820</span><br><span class="line-number">821</span><br><span class="line-number">822</span><br><span class="line-number">823</span><br><span class="line-number">824</span><br><span class="line-number">825</span><br><span class="line-number">826</span><br><span class="line-number">827</span><br><span class="line-number">828</span><br><span class="line-number">829</span><br><span class="line-number">830</span><br><span class="line-number">831</span><br><span class="line-number">832</span><br><span class="line-number">833</span><br><span class="line-number">834</span><br><span class="line-number">835</span><br><span class="line-number">836</span><br><span class="line-number">837</span><br></div></div></details>`,22);function t(o,e){return p}var c=s(a,[["render",t]]);export{c as default};
