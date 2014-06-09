QSA-server
==========

Implements jQuery-like string-based selectors on server-side.

The objective of this module is to provide the function querySelectorAll and many jQuery helpers like: [parent, children, siblings, empty, text, html, ...], without depending on DOM methods available, so that it can operate over strings on server-side, to do scraping for example.

By now it parses the html into an array with items in the form:
{
    init: beggining of the tag,
    end: end position of the tag,
    isClose: if tag is a close-tag </name>,
    name: name of the tag,
    open: index of the open-tag counterpart,
    close: index of the close-tag counterpart,
}

The jQuery-like methods will operate on this structure.
Lists of classes and other attributes will be optional, and only built if you pass them in the parse method (for speed and simplicity).

Starting with JS. Python comes soon...
