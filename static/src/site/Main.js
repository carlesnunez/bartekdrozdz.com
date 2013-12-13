Main = function() {

	var _active = false;

	var section = 	EXT.select('#main');
	var header = 	section.ext.select('.header');
	var projects = 	EXT.select('#projects');

	var boxes = 	EXT.selectAll('.box');

	boxes.forEach(function(item) {
		Box(item);
	});

	var easer = new Easer(0.1);

	var onResize = function() {
		var max = section.ext.height() - window.innerHeight;
		easer.setLimits(-max, 0);

		boxes.forEach(function(item) {
			item.box.onResize(max);
		});

		if(!_active) {
			section.ext.transform({ x: -window.innerWidth });
		}
	}

	var onScroll = function(e) {
        if(!_active) return;
        easer.updateTarget(e.deltaY);

    }

   var onRender = function() {
        if(!_active) return;

        var scr = easer.easeVal();
        
        var n = 1 - Math.norm(scr, -20, -100);
        header.ext.css('opacity', n);

        // On touch screens scroll the whole panel (for better performance) (see Box.onRender)
        if(Simplrz.touch) {
        	projects.ext.y = scr * 1.25;
        	projects.ext.transform();
        }
	}

	var onRoute = function(e) {
		var r = e.parts[0];
		var pr = e.prevRoute;
		var offset = 500;

		_active = (r == Site.MAIN);

		console.log("main.onRoute", e);

		switch(r) {
			case Site.MAIN:

				if(pr) {
					section.ext.transition({ transform: { x: 0 } }, 500, 'ease');
				} else {
					section.ext.transform({ x: 0 });
				}

				break;
			case Site.ABOUT:

				if(pr) {
					section.ext.transition({ transform: { x: offset } }, 500, 'ease');
				} else {
					section.ext.transform({ x: offset });
				}

				break;
			case Site.PROJECT:

				if(pr) {
					section.ext.transition({ transform: { x: -window.innerWidth } }, 500, 'ease');
				} else {
					section.ext.transform({ x: -window.innerWidth });
				}
				
				break;
			case Site.CONTENT:
		}
	};

	VirtualScroll.on(onScroll);
	FrameImpulse.on(onRender);
	Application.on(MSG.RESIZE, onResize);
	Application.on(MSG.ROUTE, onRoute);

	onResize();
};















