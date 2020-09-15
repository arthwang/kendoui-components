# Kendo UI Components

This package provides web component wrappers for [Kendo UI for jQuery](https://www.telerik.com/kendo-jquery-ui) widgets. All functionalities of Kendo UI for jQuery except AngularJS are supported.

> __Important Note__
This package is NOT published by Progress Software Corporation, the owner of Kendo UI frameworks, so no supports are provided from the company. To use this package, you have to buy the commercial library or download free trial from Progress Software Corporation.
<!-- TOC -->

- [Kendo UI Components](#kendo-ui-components)
  - [Features](#features)
  - [Usage](#usage)
    - [Installation and Resource references](#installations-and-resource-references)
    - [Naming conventions](#naming-conventions)
    - [Methods of widget iniatializations](#methods-of-widget-iniatializations)
    - [Attribute value assignments](#attribute-value-assignments)
    - [Widgets in templates](#widgets-in-templates)
    - [Dynamical widgets](#dynamical-widgets)
  - [Demos](#demos)
  - [Some tips](#some-tips)
  - [Issues known](#issues-known)
  - [Change log](#change-log)
  - [License](#license)

<!-- /TOC -->
## Features

* Using this package you can more intuitively and declaratively use Kendo UI through iniatiating widgets in html element attributes. What's more, if you are a Visual Studio Code user, coding effeciency can be tremendously promoted thanks to Intellisense of VSCode if you install an extension -- [VSC-Kendo-Components](https://github.com/arthwang/vsc-kenco-components) authored by me. The animation below demonstrates that:
![demo](assets/demo.gif)

* This web component wrappers implemented just serve in widget initializations, that is, it does not modify anything of Kendo UI. In fact, the wrapper layers are unwrapped after configuration. So the hierarchical relationship of Kendo UI remains and its css style sheets rules work as usual.

* Besides initializing in normal DOM elements, the component wrappers can be configurated in templates as well.

* The package overrides `$.fn.appendTo, $.fn.prependTo, $.fn.insertBefore` and `$.fn.insertAfter`, so you can conveniently create Kendo widgets dynamically.

## Usage

### Installation and Resource references

* Installed by 'npm i --save kendoui-components'. Place this library file after css and js files of Kendo UI, shown as the snippet below.
* If you use VS Code editor, search and install 'vsc-kendo-components' in its extension viewlet.
* Recommend to use cdn approach for references to css and js files of Kendo UI.
e.g. In VSCode editor vsc-kendo-components completes the skeleton snippet when you type 'html5:kendoui' in a empty html page.
~~~
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta http-equiv='X-UA-Compatible' content='ie=edge'>
  <title></title>
  <link rel='stylesheet' href='http://kendo.cdn.telerik.com/{vresion}/styles/kendo.common.min.css'/>
  <link rel='stylesheet' href='http://kendo.cdn.telerik.com/{vresion}/styles/kendo.default.min.css'/>
  <link rel='stylesheet' href='http://kendo.cdn.telerik.com/{vresion}/styles/kendo.mobile.all.min.css'/>
  <script src='http://kendo.cdn.telerik.com/{vresion}/js/jquery.min.js'></script>
  <script src='http://kendo.cdn.telerik.com/{vresion}/js/kendo.ui.min.js'></script>
  <script src='/node_modules/kendoui-components/dist/kendo-components.min.js'></script>
</head>
<body>
  
</body>
</html>
~~~
{version} in the snippet will be replaced by consistent version number from which vsc-kendo-components is built. Current version is __2020.2.617__.

### Naming conventions

* Tag names are dash-separated counterpart of official widget names prefixed by 'km-' for mobile widgets and 'k-' for others. 
e.g.
~~~
          AutoComplete    => k-auto-complete
          Dialog          => k-dialog
          MobileSplitView => km-split-view
          MobilePane      => km-pane
~~~

* Attribute names are dash-separated counterpart of the keys of widget options objects.
  e.g. `filter`, `data-text-field`, `data-value-field`, `no-data-template`, `data-source`, and `change` correspond respectivley to `filter`, `dataTextField`, `dataValueField`, `noDataTemplate`, `dataSource`, and `change` properties and methods(listeners) of an object of AutoCompleteOptions.
  ~~~
      <k-drop-down-list id="products"
                        style="width: 100%;"
                        filter="startswith"
                        data-text-field="ProductName"
                        data-value-field="ProductID"
                        no-data-template="noDataTemplate"
                        data-source="dataSource"
                        change=onChange></k-drop-down-list>
  ~~~
### Methods of widget iniatializations
Kendo UI provides three approaches to initialize widgets:
* Approach1: jquery plugin function `$('selector').kendoWidgetName(options:WidgetNameOptions)` for individual widgets
* Approach2: `kendo.bind()` for MVVM and data-* attribute scenarios
* Approach3: `new kendo.mobile.Application()` for Hybrid UI
Approach2 and 3 do not handle individual widgets and sometimes need more arguments to configurate. So you have to manually call them.
Hybrid UI example:
~~~html
    <km-split-view id='main'>
      <km-pane id='side-pane'>
        <km-view>
          <km-button href="#bar"
                    data-target="main-pane">
            Bar (main pane)
          </km-button>
          <km-button href="#baz"
                    data-target="_top">
            Baz (application)
          </km-button>
        </km-view>
      </km-pane>

      <km-pane id='main-pane'>
        <km-view id='foo'>
          Foo
        </km-view>
        <km-view id='bar'>
          Bar
        </km-view>
      </km-pane>
    </km-split-view>

    <km-view id='baz'>
      <km-button href="#main">
        Go back to splitview
      </km-button>
    </km-view>

    <script>
      new kendo.mobile.Application();
    </script>
~~~
MVVM example:
~~~html
    <k-date-picker data-bind="visible: isVisible,
                            enabled: isEnabled,
                            value: selectedDate,
                            events: { change: onChange }"
                            style="width: 100%"></k-date-picker>
    ... ...

    <script>
      var viewModel = kendo.observable({
        selectedDate: null,
        isEnabled: true,
        isVisible: true,
        onChange: function () {
          kendoConsole.log("event :: change (" + kendo.toString(this.get("selectedDate"), "D") + ")");
        }
      });
      $(function (){
        kendo.bind($("#example"), viewModel);
      });
    </script>
~~~
> Note
> * Follow the specification for MVVM of Kendo UI when you set values of data-bind.
> * data-role attribute is optional. It will be added if you do not specify it.
> * All attribute names come from properties of widget options object and are converted to dash-separated versions, that is, no data-'s are prefixed if they don't have data-'s. Prefix data-'s is inserted for you if needed. If you use VSCode, just select from VSC-Kendo-Components completion suggestions.
> * Call `new kendo.mobile.Application()` and `kendo.bind()` in `$(function(){})` to waite for widget elements ready.

Approach1, however, handles individual widget, so all properties and methods(listeners) of configuration can be passed through element attributes. This package automatically calls the jquery plugin function `$.fn.kendoWidgetName(options:WidgetNameOptions)` for you.
e.g. See a page demo below where even there are no js codes. Source codes in page
~~~html
... ...
<body>
  <div id='example'>
    <div class='demo-section k-content'>
      <h4>Find a Customer</h4>
      <k-auto-complete id="customers"
                       data-text-field="ContactName"
                       data-source='{
                         type:"odata",
                         transport:{
                           read:"https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"},
                           group:{field:"Country"}
                          }'
                       heigth="400"
                       style="width:100%"></k-auto-complete>
      <div class="demo-hint">Hint: type "an"</div>
    </div>
  </div>
</body>
</html>
~~~
is transpiled to
~~~
  <input id='customers' style='width:100%' />
~~~
in page and initialization
~~~javascript
  $('#customers').kendoAutoComplete({
    height: 400,
    dataTextField: 'ContactName',
    dataSource:{
      type: "odata",
      transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"},
          group: {field:"Country"}
      }
    }
  });
~~~
is executed automatically for you.


### Attribute value assignments
As shown in above snippets, configuration of a Kendo widget is fulfiled in attributes of the component. Some attributes (e.g. id, style) belong to the html element a widget attached while others are properties of the configuration options object. For example, height, data-source, data-value-field, etc. are properties of kendo.ui.AutoCompleteOptions object.
All values of configuration properties will be evaluated and then assigned to the properties. The evaluation carrys out in following order:

* __If it's an id of some element, evaluate it to the string of innerHTML of the element__
 This is used to assign all kinds of template attributes by the id of the script element.
e.g. "tmpl" as the value of template attribute in snippet below is the id name of the template element.
~~~html
      <k-combo-box id="customers"
                    ... ...
                   template="tmpl"
                    ... ...
                   style="width:100%"></k-combo-box>
                  
    <script id="tmpl"
            type="text/x-kendo-template">
        <span class="k-state-default" 
              style="background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/#:data.CustomerID#.jpg\)">
        </span>
        <span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>
    </script>
~~~
> __Important__
> If you DO refer to an id but the innerHTML string, you have to put the id name in duplicate quotes like "'theId'" or '"theId"' to ensure it is evaluated to a string.
 e.g. 'vertical' is an id and it also an string value of attribute orientation, quoted as '"vertical"'.
~~~html
    <k-splitter id="vertical"
            orientation='"vertical"'
            panes='[
                { collapsible: false },
                { collapsible: false, size: "100px" },
                { collapsible: false, resizable: false, size:
                "100px" }
                ]'>
... ...
~~~

* __If it's a js variable in GLOBAL scope, evaluate to its value__
e.g. In snippet below, data and onChange are evaluated to array and function respectively.
~~~html
      <k-drop-down-list id="color"
                        ... ...
                        data-source="data"
                        change="onChange"></k-drop-down-list>
                    
    <script>
      var data = [
        { text: "Black", value: "1" },
        { text: "Orange", value: "2" },
        { text: "Grey", value: "3" }
      ];

      var onChange = function () {
        var value = $("#color").val();
        $("#cap")
          .toggleClass("black-cap", value == 1)
          .toggleClass("orange-cap", value == 2)
          .toggleClass("grey-cap", value == 3);
      };
    </script>
      ... ...
~~~
> Note:
> * quotes around "data" and "onChange" are optional
> * GLOBAL matters much. A non-global variable in attribute values results in a TypeError exception thrown. Sometimes, a variable must be assigned a value in a closure, then you have to make it global if you need it in attribute values. You can select one of the following three methods to make a variable global:
>    * Use 'var variableName' to declare in top level, like 'var initial' in snippet below. 'initial' is a widget object variable that is refered in change listener in the component with id='culture'.
>    * No 'var' keyword before variable assignment.  In snippet below, you can remove 'var initial' line at all.
>    * Use a function return the value of a variable. like: 
>       `function theWidget(){return $('#initial').data('kendoMaskedTextBox');}`
>     
~~~html
          <k-drop-down-list id="culture"
                            change='function onChange() {
                                  kendo.culture(this.value());
                                  initial.setOptions(initial.options);
                                }'></k-drop-down-list>
          ... ...
          <k-masked-text-box id="initial"
                             value="1234.56"
                             style="width: 100%;"
                             mask="0,000.00 $"></k-masked-text-box>
         ... ...
    <script>
      var initial;
      $(function () {
        initial = $('#initial').data('kendoMaskedTextBox');
      });
    </script>
~~~
* __Try to evaluate to js object__
e.g. You can put listener literal string directly in an attribute value.
~~~html
      <k-auto-complete id="states"
                       open='function() {
                                if ("kendoConsole" in window) {
                                    kendoConsole.log("event :: open");
                                }
                              }'
                       ... ...
                       style='width:100%'></k-auto-complete>
~~~
* __Finally, it is evaluated to its literal string__
e.g.
~~~js
    placeholder='Select a value...'
~~~
> __Important__
> Because all attribute values are evaluated, 
> * __Do make value assignments under your control to avoid script attacks.__
> * Avoid to use javscript global function names as attributes values, such as 'window', 'top', 'escape', etc. Put them in duplicate quotes '"window"' or "'window'" if you have to do so.
> * Avoid to escape quotes in values. Just use global js variables if you face such complex values.
> * Do not include dash('-') in an id name if you use the id name as a template value. For instance, `footer-template='footer-tmpl'`(`'footer-tmpl'` as the id name of a template script), would not produce the intended innerHTML.

### Widgets in templates
You can configurate Kendo widgets in templates in script or attribute value literals.
~~~html
      <k-tool-bar items=items
                  ... ...
                  resizable=false></k-tool-bar>
      ... ...

  <script>
      var items = [
        { template: `<label>SHAPE:</label>
        <k-drop-down-list id='shape' 
                          data-text-field='text'
                          data-value-field='value'
                          data-source=dataShape 
                          change=onShapeChange></k-drop-down-list>` },
      ... ...
  </script>
~~~
### Dynamical widgets
The package overrides `$.fn.appendTo, $.fn.prependTo, $.fn.insertBefore`, and `$.fn.insertAfter`, you can use them to create widgets dynamically.
e.g. Listener below change a menu orientation by re-building it(see menu demos for details). (setOptions() seems not working)
~~~js
      $(".options input").change(function () {
        $('#openAnimation').prop('hidden', !$('#open')[0].checked);
        $('#closeAnimation').prop('hidden', !$('#close')[0].checked);
        $('k-menu').remove();
        $(`<k-menu id="menu" 
                   data-source=data 
                   animation=getAnimation()></k-menu>`).appendTo(`#menuContainer`);
      });
~~~
## Demos
In order to test validation of this package, I've rewritten most demos for Kendo UI (except AngularJS) from demos.telerik.com. You can clone the repository and run a http server (e.g. live-server) at the root directory and check the results in browsers.
## Some tips
* RangeSlider: no need to include 2 `<input />`, the package does it for you already.
* Don't access widgets using component tag names as selectors, since they are discarded after initialization. `$('k-auto-complete')[0]` return `undefined` even if you do have defined a component of `<k-auto-complete></k-auto-complete>` in a page.
* Set 'inline' attribute for inline editing of k-editor widget.
* Maybe you need enable 'Allow-Control-Origin' to run demos locally, since there are ajax calls to demos.telerik.com. You can disable web security to open Chrome, for example.
* If an attribute name and its value have equal spells by 'dash-case' to 'camel-case', e.g. 'select=select' and 'data-source=dataSource', you can just specify the attribute name, like 'select' without '=select', 'data-source' without '=dataSource'.

## Issues known
* When initialized from table, 'k-grid' has to contain whole table element.
e.g.
~~~html
    <k-grid id="grid"
            height='550'
            sortable='true'>
      <table>
        <thead>
          <tr>
            <th data-field="make">Car Make</th>
            <th data-field="model">Car Model</th>
            <th data-field="year">Year</th>
            <th data-field="category">Category</th>
            <th data-field="airconditioner">Air
              Conditioner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Volvo</td>
            <td>S60</td>
            <td>2010</td>
            <td>Saloon</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Audi</td>
            <td>A4</td>
            <td>2002</td>
            <td>Saloon</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>BMW</td>
            <td>535d</td>
            <td>2006</td>
            <td>Saloon</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </k-grid>
~~~

## Change log
[Change log](CHANGELOG.md)
## License
[Apache License, version 2](http://www.apache.org/licenses/LICENSE-2.0)