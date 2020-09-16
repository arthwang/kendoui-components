#!/usr/bin/env ts-node -O {"type":"module","module":"commonjs","target":"es2016","experimental-modules":true}
"use strict";
/// <reference types='jquery' />
/// <reference types="kendo-ui" />
exports.__esModule = true;
var fs = require("fs");
var balanced = require('balanced-match');
var components = {
    // editors
    Alert: { attachTag: 'div', isPro: false },
    AutoComplete: { attachTag: 'input', isPro: false },
    ColorPalette: { attachTag: 'div', isPro: false },
    ColorPicker: { attachTag: 'input', isPro: false },
    ComboBox: { attachTag: 'dynamic', isPro: false },
    Confirm: { attachTag: 'div', isPro: false },
    ContextMenu: { attachTag: 'div', isPro: false },
    DateInput: { attachTag: 'input', isPro: false },
    DatePicker: { attachTag: 'input', isPro: false },
    DateTimePicker: { attachTag: 'input', isPro: false },
    DropDownList: { attachTag: 'dynamic', isPro: false },
    DropDownTree: { attachTag: 'input', isPro: true },
    Editor: { attachTag: 'textarea', isPro: true },
    FilterMenu: { attachTag: 'div', isPro: false },
    FlatColorPicker: { attachTag: 'div', isPro: false },
    ListBox: { attachTag: 'select', isPro: false },
    MaskedTextBox: { attachTag: 'input', isPro: false },
    MultiColumnComboBox: { attachTag: 'input', isPro: true },
    MultiSelect: { attachTag: 'select', isPro: false },
    NumericTextBox: { attachTag: 'input', isPro: false },
    Slider: { attachTag: 'input', isPro: false },
    TimePicker: { attachTag: 'input', isPro: false },
    Upload: { attachTag: 'input', isPro: true },
    Validator: { attachTag: 'form', isPro: false },
    Switch: { attachTag: 'input', isPro: false },
    Touch: { attachTag: 'div', isPro: false },
    // navigation:
    Button: { attachTag: 'a', isPro: false },
    ButtonGroup: { attachTag: 'div', isPro: true },
    Menu: { attachTag: 'ul', isPro: false },
    PanelBar: { attachTag: 'div', isPro: false },
    Pager: { attachTag: 'div', isPro: false },
    Prompt: { attachTag: 'div', isPro: false },
    RangeSlider: { attachTag: 'div', isPro: false },
    TabStrip: { attachTag: 'div', isPro: false },
    ToolBar: { attachTag: 'div', isPro: false },
    TreeView: { attachTag: 'dynamic', isPro: true },
    // scheduling
    Calendar: { attachTag: 'div', isPro: false },
    Gantt: { attachTag: 'div', isPro: true },
    Scheduler: { attachTag: 'div', isPro: true },
    // layout
    Dialog: { attachTag: 'div', isPro: false },
    Notification: { attachTag: 'span', isPro: false },
    Popup: { attachTag: 'div', isPro: false },
    ResponsivePanel: { attachTag: 'nav', isPro: false },
    Splitter: { attachTag: 'div', isPro: false },
    Tooltip: { attachTag: 'dynamic', isPro: false },
    Window: { attachTag: 'div', isPro: false },
    // data management
    Grid: { attachTag: 'dynamic', isPro: true },
    Spreadsheet: { attachTag: 'div', isPro: true },
    ListView: { attachTag: 'dynamic', isPro: false },
    PivotConfigurator: { attachTag: 'div', isPro: true },
    PivotGrid: { attachTag: 'div', isPro: true },
    TreeList: { attachTag: 'div', isPro: true },
    // media
    MediaPlayer: { attachTag: 'div', isPro: true },
    // interactivity & ux
    Draggable: { attachTag: 'div', isPro: false },
    DropTarget: { attachTag: 'div', isPro: false },
    DropTargetArea: { attachTag: 'div', isPro: false },
    ProgressBar: { attachTag: 'div', isPro: false },
    Sortable: { attachTag: 'div', isPro: false },
    // conversational ui
    Chat: { attachTag: 'div', isPro: false },
    // charts
    Chart: { attachTag: 'div', isPro: true },
    StockChart: { attachTag: 'div', isPro: true },
    TreeMap: { attachTag: 'div', isPro: true },
    // codes
    Barcode: { attachTag: 'span', isPro: true },
    QRCode: { attachTag: 'div', isPro: true },
    // gauges
    LinearGauge: { attachTag: 'div', isPro: true },
    RadialGauge: { attachTag: 'div', isPro: true },
    // diagrams & maps
    Diagram: { attachTag: 'div', isPro: true },
    Map: { attachTag: 'div', isPro: true },
    Sparkline: { attachTag: 'div', isPro: true },
    // mobiles
    MobileActionSheet: { attachTag: 'ul', isPro: false },
    MobileBackButton: { attachTag: 'a', isPro: false },
    MobileButton: { attachTag: 'a', isPro: false },
    MobileButtonGroup: { attachTag: 'ul', isPro: false },
    MobileCollapsible: { attachTag: 'div', isPro: false },
    MobileDetailButton: { attachTag: 'a', isPro: false },
    MobileDrawer: { attachTag: 'div', isPro: false },
    MobileLayout: { attachTag: 'div', isPro: false },
    MobileListView: { attachTag: 'ul', isPro: false },
    MobileModalView: { attachTag: 'div', isPro: false },
    MobileNavBar: { attachTag: 'div', isPro: false },
    MobilePane: { attachTag: 'div', isPro: false },
    MobilePopOver: { attachTag: 'div', isPro: false },
    MobileScrollView: { attachTag: 'div', isPro: false },
    MobileScroller: { attachTag: 'div', isPro: false },
    MobileSplitView: { attachTag: 'div', isPro: false },
    MobileSwitch: { attachTag: 'input', isPro: false },
    MobileTabStrip: { attachTag: 'div', isPro: false },
    MobileView: { attachTag: 'div', isPro: false }
};
function genComponentsData(defName, isPro) {
    var defStr = fs.readFileSync(defName).toString();
    var jqReg = /^\s*interface\s+JQuery\s*{([\s\S]+)}/m;
    var jqMatch = defStr.match(jqReg);
    var widgetReg = /\n\s+kendo\w+\(options:[^)]+/g;
    var widgetMatches = jqMatch[1].match(widgetReg);
    console.log("Generated components:");
    widgetMatches.forEach(function (widgetLine) {
        var m = widgetLine.match(/^\s+kendo(\w+)\(options:\s*(.+)\.(\w+)$/);
        console.log(m[2] + '.' + m[1]);
        var condition = components["" + m[1]];
        if (!isPro) {
            condition = condition && !components["" + m[1]]['isPro'];
        }
        if (condition) {
            genComponentData(defStr, m[1], m[2], m[3]);
        }
    });
    fs.writeFileSync('../assets/components/tags.json', JSON.stringify(compTags));
}
var compTags = [];
function pascalToHyphenated(pascal) {
    return pascal.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function genComponentData(fileStr, widget, namespace, optionsName) {
    var namespaceReg = new RegExp("declare\\s*namespace\\s*" + namespace, "g");
    var optionsReg = new RegExp("interface\\s+" + optionsName);
    var options = null;
    var matched = namespaceReg.exec(fileStr);
    while (matched) {
        var txt = fileStr.slice(matched.index);
        var b1 = balanced('{', '}', txt);
        var m = b1.body.match(optionsReg);
        if (m) {
            var optionsIndex = m.index;
            var b2 = balanced('{', '}', b1.body.slice(optionsIndex));
            options = b2.body.trim();
            break;
        }
        matched = namespaceReg.exec(fileStr);
    }
    if (!options) {
        console.error('Definition for ' + optionsName + ' not found');
        return;
    }
    var props = options.split("\n").map(function (line) { return line.trim(); });
    var attrs = props
        .map(function (prop) {
        return pascalToHyphenated(prop.split('?')[0]
            .trim());
    });
    // del 'name'
    var nameIdx = attrs.indexOf('name');
    if (nameIdx > -1) {
        attrs.splice(nameIdx, 1);
    }
    var compTag = widget.startsWith('Mobile') ? "km-" + pascalToHyphenated(widget.slice(6)) : "k-" + pascalToHyphenated(widget);
    compTags.push(compTag);
    components[widget]['attrs'] = attrs;
    components[widget]['compTag'] = compTag;
    delete components[widget]['isPro'];
    fs.writeFileSync('../assets/components/' + compTag + '.json', JSON.stringify(components[widget]));
}
var defFileName = "../node_modules/@types/kendo-ui/index.d.ts";
genComponentsData(defFileName, true);
