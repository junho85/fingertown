/* game namespace */
var game = {
	dialogWindow: null,
	// Run on page load.
	"onload" : function() {
		// Initialize the video.
		if (!me.video.init("screen", 640, 480, true, 'auto')) {
			alert("Your browser does not support HTML5 canvas.");
			return;
		}

		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function() {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}
		
		me.plugin.register(aStarPlugin, "astar");

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);
		
		this.registerEvents();
	},
	
	registerEvents: function() {
		me.input.registerPointerEvent("mousedown", me.game.viewport, function (event) {
		    me.event.publish("mousedown", [ event ]);
		});
		
		this.mouseDown = me.event.subscribe("mousedown", function (event) {
		    console.log(event.pointerId, event.gameX, event.gameY); // etc ...
		    
		    /*var pathFinder = new game.Pathfinder(); 
		    var character = me.game.getEntityByName("mainPlayer")[0]; 
		    var tile_size = 16;
		    var initStartX = Math.round( character.pos.x / tile_size);
            var initStartY = Math.round( ( character.pos.y ) / tile_size);
            
            var initDestX = Math.round( event.gameX);
            var initDestY = Math.round( event.gameY );
            
            var start = [initStartX, initStartY];
            var end = [initDestX, initDestY];

            var followPath = pathFinder.getPath(start, end);
		    console.log("FOLLOW",followPath);
		    
		    character.destX = followPath[0][0] * tile_size;
		    character.destY = followPath[0][1] * tile_size;
		    
		    moveObject(character)
		    //path.getPath([217,2],[398,247])*/
		    console.log(context);
		});
	},

	// Run on game resources loaded.
	"loaded" : function() {
		this.dialogWindow = new game.DialogWindow();
		me.sys.gravity = 0; // globally set gravity
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.MENU, new game.TitleScreen());

		me.state.set(me.state.PLAY, new game.PlayScreen());
		
		me.state.transition("fade", "#FFFFFF", 250);


		// add our player entity in the entity pool
		me.entityPool.add("govermentPlayer", game.GovermentEntity);
		me.entityPool.add("mainPlayer", game.PlayerEntity);
		

		// enable the keyboard
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		
		me.input.bindKey(me.input.KEY.SPACE, "space", true);

		// start the game
		me.state.change(me.state.PLAY);
	}
};