/*
Name:fallLetters
Author:RR
Date:June 06, 2012
Time:9:00AM
Version:1.0
Description: Falling letters plug-in.
*/
(function($){
	$.fn.fallLetters = function(options){	
		// the default options
		var defaults = {	
			minFont:14, // minimum font size to be displayed(in pixel)
			maxFont:20, // maximum font size to be displayed(in pixel)
			minSpeed:2000, // should be larger than the maxspeed, 1000 = 1 sec
			maxSpeed:1000, // the smaller the amount the faster it fall, 1000 = 1 sec
			fading:true // fading while falling effect
		}			
		
		// to override the defaults of each option
		var options = $.extend(defaults, options);
		return this.each(function(){
		
			// declaration of variables
			var cont=$(this);	
			var contWidth=($(this).width())-50;
			var contHeight=($(this).height())+150;
			
			// container's CSS
			cont.css({"position":"relative","overflow":"hidden"});
			
			// wrap the letters with span
			cont.children().andSelf().contents().each(function(){
				if (this.nodeType == 3) {
					var $this = $(this);
					$this.replaceWith($this.text().replace(/(\w)/g, "<span>$&</span>"));
				}
			});		
			
			// onload random span left and font
			reset();	
			cont.find("span").each(function(){
				$(this).css({"left":randomLeft(),"fontSize":randomFont(),"position":"absolute"});
			});
			
			// loops every 2 mins 
			setInterval(function(){
				cont.find("span").each(function(){
					$(this).animate({"top":contHeight+"px","opacity":ifFallAndFade()},randomSpeed(),function(){
						var Left=randomLeft();
						$(this).css({"left":Left,"fontSize":randomFont()});
						reset();
					}); 
				});
			},100);
			
			// fading while falling
			function ifFallAndFade(){
				if(options.fading){
					return 0;
				}
				else{
					return 1;
				}
			}
			
			// randomize left css of each character
			function randomLeft() { 
				var maxLeft= contWidth; 
				var left= Math.floor(Math.random() * maxLeft + 1) + 'px'; 
				return left; 
			} 
			
			// randomize the time of each character
			function randomSpeed(){
				var speed=Math.floor(Math.random() * options.minSpeed + options.maxSpeed);
				return speed;
			}
			
			// randomized the font size of each character
			function randomFont() { 
				var fontSize= Math.floor(Math.random() * options.maxFont + options.minFont) + 'px'; 
				return fontSize; 
			} 
			
			// reset or back to top, -100px so that it will be hidden
			function reset(){
				cont.find("span").css({"top":"-100px","opacity":"1"});
			}
		});	
	};
})(jQuery); 
/* 
*	NOTE:Don't put any comma(,) after the last option because
*	it is considered as an error in IE. Therefore, leave it
*	blank.
*
*	Default setting of the plug-in
*		minFont:14,
*		maxFont:20,
*		minSpeed:2000,
*		maxSpeed:1000,
*		fading:true
*
*	How to use this plugin.
*	Example:	
*		jQuery("#cont").fallLetters({
*			minFont:10,
*			maxFont:30,
*			minSpeed:2000, 
*			maxSpeed:1000,
*			fading:false
*		});
*/