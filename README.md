ActivityTracker.js
================

Javascript client side activity tracker


##Features
================
- easy to track any click interaction by adding ```data-track="true"``` to any element
- simple api to get data for user personalization or any other purpose you want
- small footprint

## Browser Support
================
- ie8+
- firefox 3.5+
- Safari 4+
- Chrome
- Opera 10+

##Dependencies
================
if you use activitytracker.full.min.js, these dependencies are already included. Otherwise you will have to include them in your project.
- requires jquery
- requires Scott Hamper's [Cookies](https://github.com/ScottHamper/Cookies)
- requires John Resig's [class script](http://ejohn.org/blog/simple-javascript-inheritance/)

##How to use
================

The easiest way to use is to add data attributes to the elements you want to track clicks on.  Setting the ```data-track`` attribute to either "true" or the name of the category you want to track the activity in.  You can optionally include trackable arguments as a data attribute. If no arguments are specified, it will use the href of the a tag or if it is not an a tag it will use the id of the element.
```<a href="#" data-track="myCategory" data-track-args="['argument 1', 'argument 2']">Trackable Link</a> ```


```ActivityTracker.track(cat, arguments);```
Manually track activity.  Must specify a category and arguments to track.

```ActivityTracker.getData(cat); ```
Get the data for a specific category. If no category is specified, it will return an array with all the categories and data you have tracked.

```ActivityTracer.clearData(cat); ```
Clears the cookie data for a specificy category. If no category is specified, it will clear all the data.