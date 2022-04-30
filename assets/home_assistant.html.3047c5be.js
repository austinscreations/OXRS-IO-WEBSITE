import{d as s,o as l,c as i,a as e,e as r,F as o,f as a,g as n}from"./app.b38cdf7f.js";import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";const p={},c=a('<h1 id="oxrs-home-assistant-integrations" tabindex="-1"><a class="header-anchor" href="#oxrs-home-assistant-integrations" aria-hidden="true">#</a> OXRS Home Assistant integrations</h1><h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><p>This guide shows <code>automation</code> samples to be used in Home Assistant. They make use of the event structure that is sent by the StateMonitor via MQTT.</p><p>For details on <code>configuration</code> and <code>events</code> see the <a href="/docs/firmware/state-monitor-esp32">StateMonitor</a> documentation.</p><p>The following samples are using the config topic <code>conf/58391f</code> and the state topic <code>stat/58391f</code>. Those are the defaults as allocated by the FW using the MAC address of the device. Index numbers need to be replaced according to your set up.</p>',5),b=n("All samples are based on Home Assistant "),u={href:"https://www.home-assistant.io/docs/automation/trigger/#mqtt-trigger",target:"_blank",rel:"noopener noreferrer"},g=n("MQTT triggers"),m=n(" were a template filters the payload sent by the StateMonitor via "),h=e("code",null,"stat/..",-1),f=n(" for the desired "),x=e("code",null,"index",-1),y=n(" and "),_=e("code",null,"event",-1),v=n("."),q=a(`<h2 id="example-set-1-inputs-related-to-state-monitor-state-io-and-smoke-detector" tabindex="-1"><a class="header-anchor" href="#example-set-1-inputs-related-to-state-monitor-state-io-and-smoke-detector" aria-hidden="true">#</a> Example set 1 (inputs), related to State Monitor, State IO and Smoke Detector</h2><h3 id="example-1-1-use-a-switch-to-turn-light-on-and-off" tabindex="-1"><a class="header-anchor" href="#example-1-1-use-a-switch-to-turn-light-on-and-off" aria-hidden="true">#</a> Example 1.1: Use a <code>switch</code> to turn light on and off</h3><hr><h4 id="typical-use-case-standard-wall-switch" tabindex="-1"><a class="header-anchor" href="#typical-use-case-standard-wall-switch" aria-hidden="true">#</a> Typical use case : standard wall switch.</h4><p>To configure input <code>index: 5</code> as <code>switch</code> publish :</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> -t conf/58391f  -m &#39;{&quot;inputs&quot;: [{ &quot;index&quot;: 5 , &quot;type&quot;: &quot;switch&quot;}]}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>use configured switch to turn a light on / off.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>automation:
  - id: OX001
    alias: OXRS idx 5 on
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
    - condition: template
      value_template: &#39;{{trigger.payload_json.index == 5 and trigger.payload_json.event == &quot;on&quot;}}&#39;
    action:
    - service: light.turn_on
      target:
        entity_id: light.light_bulb
      
  - id: OX002
    alias: OXRS idx 5 off
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
    - condition: template
      value_template: &#39;{{trigger.payload_json.index == 5 and trigger.payload_json.event == &quot;off&quot;}}&#39;
    action:
    - service: light.turn_off
      target:
        entity_id: light.light_bulb
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="example-1-2-use-two-toggle-buttons-to-toggle-a-light-state-from-several-locations" tabindex="-1"><a class="header-anchor" href="#example-1-2-use-two-toggle-buttons-to-toggle-a-light-state-from-several-locations" aria-hidden="true">#</a> Example 1.2: Use two <code>toggle</code> buttons to toggle a light state from several locations</h3><hr><h4 id="typical-use-cases-hallway-lighting-or-bedroom-lighting" tabindex="-1"><a class="header-anchor" href="#typical-use-cases-hallway-lighting-or-bedroom-lighting" aria-hidden="true">#</a> Typical use cases: hallway lighting or bedroom lighting.</h4><p>To configure inputs <code>index: 1</code> and <code>index: 2</code> as <code>toggle</code> publish :</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> -t conf/58391f  -m &#39;{&quot;inputs&quot;: [{&quot;index&quot;: 2, &quot;type&quot;: &quot;toggle&quot;},{&quot;index&quot;: 1, &quot;type&quot;: &quot;toggle&quot; }]}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Use configured buttons to toggle connected light by any of the buttons.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>automation:
  - id: OX007
    alias: OXRS idx 1/2 toggle
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
      condition: or
      conditions:
      - condition: template
        value_template: &#39;{{trigger.payload_json.index == 1 and trigger.payload_json.event == &quot;toggle&quot;}}&#39;
      - condition: template
        value_template: &#39;{{trigger.payload_json.index == 2 and trigger.payload_json.event == &quot;toggle&quot;}}&#39;
    action:
    - service: light.toggle
      target:
        entity_id: light.light_bulb
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>Can be as many buttons as you like, just add more conditions:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  - condition: template
      value_template: &#39;{{trigger.payload_json.index == nnn and trigger.payload_json.event == &quot;toggle&quot;}}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></div><h3 id="example-1-3-use-two-buttons-to-control-brightness-and-state-of-a-light-bulb" tabindex="-1"><a class="header-anchor" href="#example-1-3-use-two-buttons-to-control-brightness-and-state-of-a-light-bulb" aria-hidden="true">#</a> Example 1.3: Use two <code>buttons</code> to control brightness and state of a light bulb</h3><hr><h4 id="typical-use-case-control-of-lights-with-variable-brightness-with-up-and-down-buttons" tabindex="-1"><a class="header-anchor" href="#typical-use-case-control-of-lights-with-variable-brightness-with-up-and-down-buttons" aria-hidden="true">#</a> Typical use case: control of lights with variable brightness with up and down buttons.</h4><p>To configure inputs <code>index: 1</code> and <code>index: 2</code> as <code>buttons</code> publish :</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> -t conf/58391f  -m &#39;{&quot;inputs&quot;: [{&quot;index&quot;: 2, &quot;type&quot;: &quot;button&quot;},{&quot;index&quot;: 1, &quot;type&quot;: &quot;button&quot; }]}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>This is a more complex automation. It uses the <code>single</code> and <code>hold</code> events from each of the 2 involved buttons. The <code>single</code> event is used to control the state of the light bulb and the <code>hold</code> event for brightness control.</p><table><thead><tr><th style="text-align:left;">index</th><th style="text-align:left;">event</th><th style="text-align:left;">function</th></tr></thead><tbody><tr><td style="text-align:left;">1</td><td style="text-align:left;">single</td><td style="text-align:left;">turn off</td></tr><tr><td style="text-align:left;">1</td><td style="text-align:left;">hold</td><td style="text-align:left;">decrease brightness</td></tr><tr><td style="text-align:left;">2</td><td style="text-align:left;">single</td><td style="text-align:left;">turn on</td></tr><tr><td style="text-align:left;">2</td><td style="text-align:left;">hold</td><td style="text-align:left;">increase brightness</td></tr></tbody></table><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># on / off automations

automation:
  - id: OX003
    alias: OXRS idx 1 single off
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
    - condition: template
      value_template: &#39;{{trigger.payload_json.index == 1 and trigger.payload_json.event == &quot;single&quot;}}&#39;
    action:
    - service: light.turn_off
      target:
        entity_id: light.light_bulb
        
  - id: OX004
    alias: OXRS idx 2 single on
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
    - condition: template
      value_template: &#39;{{trigger.payload_json.index == 2 and trigger.payload_json.event == &quot;single&quot;}}&#39;
    action:
    - service: light.turn_on
      target:
        entity_id: light.light_bulb

# brightness control

automation:
  - id: OX005
    alias: OXRS idx 1 hold
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
    - condition: template
      value_template: &#39;{{trigger.payload_json.index == 1 and trigger.payload_json.event == &quot;hold&quot;}}&#39;
    action:
    - service: light.turn_on
      target:
        entity_id: light.light_bulb
      data:
        brightness_step_pct: -5
        
  - id: OX006
    alias: OXRS idx 2 hold
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
    - condition: template
      value_template: &#39;{{trigger.payload_json.index == 2 and trigger.payload_json.event == &quot;hold&quot;}}&#39;
    action:
    - service: light.turn_on
      target:
        entity_id: light.light_bulb
      data:
        brightness_step_pct: 5     
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><h3 id="example-1-4-use-a-rotary-encoder-with-integrated-button-to-control-brightness-and-state-of-a-light-bulb" tabindex="-1"><a class="header-anchor" href="#example-1-4-use-a-rotary-encoder-with-integrated-button-to-control-brightness-and-state-of-a-light-bulb" aria-hidden="true">#</a> Example 1.4: Use a rotary encoder with integrated button to control brightness and state of a light bulb</h3><hr><h4 id="typical-use-case-single-knob-control-of-lights-with-variable-brightness-via-a-rotary-encoder" tabindex="-1"><a class="header-anchor" href="#typical-use-case-single-knob-control-of-lights-with-variable-brightness-via-a-rotary-encoder" aria-hidden="true">#</a> Typical use case: single knob control of lights with variable brightness via a rotary encoder.</h4><p>The outputs <code>A</code> and <code>B</code> of the <code>rotary encoder</code> are connected to <code>index: 1</code> and <code>index: 2</code> . The integrated <code>push button</code> of the <code>rotary encoder</code> is connected to <code>index: 3</code> .</p><p>To configure inputs <code>index: 1</code> and <code>index: 2</code> as <code>rotary</code> and <code>index:3</code> as <code>toggle</code> publish :</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> -t conf/58391f -m &#39;{&quot;inputs&quot;: [
    {&quot;index&quot;: 1, &quot;type&quot;: &quot;rotary&quot;},
    {&quot;index&quot;: 2, &quot;type&quot;: &quot;rotary&quot;},
    {&quot;index&quot;: 3, &quot;type&quot;: &quot;toggle&quot;}]}&#39;

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>This is another more complex automation. It uses the <code>up</code> and <code>down</code> events from the rotary encoder for brightness control. The <code>toggle</code> event of the integrated push button is used to control the state of the light bulb.</p><p>Turning the rotary encoder has no effect if the light is turned off.</p><table><thead><tr><th style="text-align:left;">index</th><th style="text-align:left;">event</th><th style="text-align:left;">function</th></tr></thead><tbody><tr><td style="text-align:left;">2</td><td style="text-align:left;">up</td><td style="text-align:left;">increase brightness</td></tr><tr><td style="text-align:left;">2</td><td style="text-align:left;">down</td><td style="text-align:left;">decrease brightness</td></tr><tr><td style="text-align:left;">3</td><td style="text-align:left;">toggle</td><td style="text-align:left;">turn on / off</td></tr></tbody></table><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>automation:

# brightness control up
  - id: OX010
    alias: OXRS idx 2 up
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
      condition: and
      conditions:
      - condition: state
        entity_id: light.light_bulb
        state: &#39;on&#39;
      - condition: template
        value_template: &#39;{{trigger.payload_json.index == 2 and trigger.payload_json.event == &quot;up&quot;}}&#39;
    action:
    - service: light.turn_on
      target:
        entity_id: light.light_bulb
      data:
        brightness_step: 10

# brightness control down
  - id: OX011
    alias: OXRS idx 2 down
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
      condition: and
      conditions:
      - condition: template
        value_template: &#39;{{ state_attr(&quot;light.light_bulb&quot;, &quot;brightness&quot;) &gt; 10 }}&#39;
      - condition: template
        value_template: &#39;{{trigger.payload_json.index == 2 and trigger.payload_json.event == &quot;down&quot;}}&#39;
    action:
    - service: light.turn_on
      target:
        entity_id: light.light_bulb
      data:
        brightness_step: -10

# toggle state (on / off)
  - id: OX012
    alias: OXRS idx 3 toggle
    trigger:
    - platform: mqtt
      topic: stat/58391f
    condition:
    - condition: template
      value_template: &#39;{{trigger.payload_json.index == 3 and trigger.payload_json.event == &quot;toggle&quot;}}&#39;
    action:
    - service: light.toggle
      target:
        entity_id: light.light_bulb
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><h2 id="example-set-2-outputs-related-to-state-controller-state-io-and-smoke-detector" tabindex="-1"><a class="header-anchor" href="#example-set-2-outputs-related-to-state-controller-state-io-and-smoke-detector" aria-hidden="true">#</a> Example set 2 (outputs), related to State Controller, State IO and Smoke Detector</h2><h3 id="example-2-1-turn-light-bulb-on-and-off" tabindex="-1"><a class="header-anchor" href="#example-2-1-turn-light-bulb-on-and-off" aria-hidden="true">#</a> Example 2.1: Turn light bulb on and off</h3><hr><h4 id="typical-use-case-standard-light-bulb-controlled-by-wall-switch" tabindex="-1"><a class="header-anchor" href="#typical-use-case-standard-light-bulb-controlled-by-wall-switch" aria-hidden="true">#</a> Typical use case : standard light bulb controlled by wall switch.</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
To Do

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,39);function w(T,j){const t=s("ExternalLinkIcon");return l(),i(o,null,[c,e("p",null,[b,e("a",u,[g,r(t)]),m,h,f,x,y,_,v]),q],64)}var X=d(p,[["render",w]]);export{X as default};
