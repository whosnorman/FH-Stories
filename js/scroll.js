
// shoutout to Minimill
// https://github.com/minimill/minimill.co/blob/010755778ff0cd934d39a4483078338915dd90b4/src/js/sections.js


function Sections(){
	this.lastYOffset = window.pageYOffset;
	this.sectionElements = document.getElementsByClassName('animated-section');
	this.lastWindowHeight = window.innerHeight;
	console.log(this.lastWindowHeight);

	this.bodyClassPrefix = 'in-section';

	this.sectionMap = this._computeSectionMap();
	this._enable();



	return this;

}


// create sectionMap based on current page contents
Sections.prototype._computeSectionMap = function(){

	var sectionMap = [];


	[].forEach.call(this.sectionElements, function(sectionElement) {

	console.log(sectionElement.offsetTop - (this.lastWindowHeight / 2));

	console.log(sectionElement.clientHeight);
      sectionMap.push({
        element: sectionElement,
        begin: Math.max(sectionElement.offsetTop - (this.lastWindowHeight / 2), 0),
        end: sectionElement.offsetTop - (this.lastWindowHeight / 2) + sectionElement.clientHeight,
        sectionId: sectionElement.dataset.sectionId,
      });
    }.bind(this));

    return sectionMap;
}

Sections.prototype._checkCurrentSection = function(){
	// run through sectionMap array checking which one we're currently in
	console.log(this.sectionMap);
	console.log(this.lastYOffset);
	for (var i = 0; i < this.sectionMap.length; i++) {
      if (this.lastYOffset >= this.sectionMap[i].begin && this.lastYOffset < this.sectionMap[i].end) {
        var newSectionClass = this.bodyClassPrefix + this.sectionMap[i].sectionId;
        console.log(newSectionClass);
        
        document.body.className = newSectionClass;
      }
    }
}

// to add as event listener on scroll
Sections.prototype._onScroll = function() {
	// update offset
	this.lastYOffset = window.pageYOffset;

	// update animation before next browser repaint
	window.requestAnimationFrame(this._checkCurrentSection.bind(this));
};

Sections.prototype._enable = function() {
	// set listener 
	window.addEventListener('scroll', this._onScroll.bind(this));
	// initial on scroll call
	this._onScroll();
};




