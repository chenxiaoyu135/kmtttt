/*
 * ahthor: pxj
 * date: 2018-05-10
 * name: correct
 * descrition: 一个使用canvas制作截图画图的一个编辑工具
 * */
;(function (global, $, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' 
		? module.exports = factory($) : typeof define === 'function' && define.amd 
			? define(factory) : (global.Correct = factory($));
}(this, jQuery,(function ($) {
	'use strict';
	
	function Correct (objs) {
		this.canvas = document.getElementById(objs.id);
		this.gbcr = document.getElementById(objs.id).getBoundingClientRect();
		this.zoom = 0.2;
		this.zoomIndex = 5;
        this.docW = 0;
        this.docH = 0;
        this.docX = 0;
        this.docY = 0;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.img = null;
        this.id = null;
        this.speed = 10;
        this.circleColor = '#ff5050';
        this.lineWidth = 1;
        this.addP = 6;
        this.addR = 14;
        this.listP = 6;
        this.listM = 10;
        this.listR = 14;
        this.bgColor = 'rgba(0,0,0,0.7)';
        this.fontColor = 'rgba(255, 255, 255, 1)';
        this.fontSize = 16;
        this.font = '14px serif';
        this.editP = 10;
        this.editH = 30;
        this.eidtL = 54;
        this.model = [];
        this.cutX = 0;
        this.cutY = 0;
        this.cutW = 0;
        this.cutH = 0;
        this.isLine = false;
        this.isRectangle = false;
        this.isCircle = false;
        this.isText = false;
        this.isKnowledge = false;
        this.isCut = false;
        this.actKnowledgPoint = null;
        this.isActKnowledge = false;
        this.isActText = false;
        this.isActLine = false;
        this.isActRectangle = false;
        this.ctx = this.canvas.getContext('2d');
        this.fillStyle = '#fff';
        this.actFontColor = '#ff5050';
        this.canvas.width = objs.canW;
        this.canvas.height = objs.canH;
        this.executionArray = [];
        $.extend(this, objs);
        this.imgs = this.img;
        return this;
	};
	
	/**
	  * 绘制底图 
	  */
	Correct.prototype.drawImage = function (obj) {
		var type = typeof obj === 'undefined' ? 0 : obj.type;
		var self= this;
//		self.executionArray.push({
//			method: 'drawImage',
//			params: {
//				type: type
//			}
//		})
//		console.log(obj)
		var ctx = self.ctx;
		var docX = self.docX;
		var docY = self.docY;
		var docW = self.docW;
		var docH = self.docH;
		var canW = self.canW;
		var canH = self.canH;
		var zoomIndex = self.zoomIndex;
		var zoom = self.zoom;
		var bgColor = self.bgColor;
		var img = new Image();
		img.src = self.imgs;
		img.onload = function () {
			var width = img.width;
			var height = img.height;
            var size = canW / canH;
            var wsize = width / height;
            if (wsize > size) {
            	self.docW = docW = Math.round(canW * zoomIndex * zoom);
              	self.docH = docH = Math.round(canW / wsize * zoomIndex * zoom);
//            self.docH = docH = canH * zoomIndex * zoom;
//            self.docW = docW = canH * wsize * zoomIndex * zoom;
              if (type != 1) {
              	self.docX = docX = (canW - docW) / 2;
              	self.docY = docY = (canH - docH) / 2;
              }
              
            } else {
            	self.docH = docH = Math.round(canH * zoomIndex * zoom);
              	self.docW = docW = Math.round(canH * wsize * zoomIndex * zoom);
//            	self.docW = docW = canW * zoomIndex * zoom;
//            	self.docH = docH = canW / wsize * zoomIndex * zoom;
	            if (type != 1) {
	              	self.docX = docX = Math.round((canW - docW) / 2);
	              	self.docY = docY = Math.round((canH - docH) / 2);
	            }
            }
            ctx.fillStyle = self.fillStyle;
            ctx.fillRect(0, 0, canW, canH); 
            ctx.drawImage(img, docX, docY, docW, docH);
		};
	}
	
	/**
	  * 撤回上一步
	  */
	Correct.prototype.recall = function () {
		var self = this
		self.executionArray.pop();
		self.imgs = self.executionArray.length > 0 ? self.executionArray[self.executionArray.length - 1]['img'] : self.img;
		self.drawImage();
	}
	
	/**
	  * 放大
	  */
	Correct.prototype.zoomOutImage = function () {
		var self = this
		if (self.zoomIndex < 10) {
			self.zoomIndex++;
			self.imgs = self.executionArray.length > 0 ? self.executionArray[self.executionArray.length - 1]['img'] : self.img;
			self.drawImage();
		}
	}
	
	/**
	  * 缩小
	  */
	Correct.prototype.zoomInImage = function () {
		var self = this
		if (self.zoomIndex > 1) {
			self.zoomIndex--;
			self.imgs = self.executionArray.length > 0 ? self.executionArray[self.executionArray.length - 1]['img'] : self.img;
			self.drawImage();
		}
	}
	
	/**
	  * 清除所有
	  */
	Correct.prototype.clearAll = function () {
		this.isLine = false;
		this.isRectangle = false;
		this.isCircle = false;
        this.isText = false;
        this.isKnowledge = false;
        this.isCut = false;
        this.actKnowledgPoint = null;
        this.isActLine = false;
        this.isActRectangle = false;
        this.isActKnowledge = false;
        this.isActText = false;
        this.drawImage();
        $('#lineBtn').find('img').attr('src', 'image/brush_nor.png');
		$('#rectangleBtn').find('img').attr('src', 'image/tools_rectangle@2x.png');
        $('#circleBtn').find('img').attr('src', 'image/tools_circular@2x.png');
		$('#textBtn').find('img').attr('src', 'image/tools_text@2x.png');
		$('#knowledgeBtn').find('img').attr('src', 'image/tools_point@2x.png');
		$('#tempTextBox').remove();
	}
	
	/**
	  * 保存编辑过的画布并导出图片
	  */
	Correct.prototype.exportImg = function () {
		return this.canvas.toDataURL("image/png");
	}
	
	/**
	  * 预览并裁剪 
	  */
	Correct.prototype.previewCut = function () {
		var self = this;
		var ctx = self.ctx; 
		var x = self.cutX;
		var y = self.cutY;
		var w = self.cutW;
		var h = self.cutH;
		if (w == 0 || h == 0) {
			return;
		}
		var dataImg = ctx.getImageData(x, y, w, h);
		var canvas2 = document.createElement("canvas");
		
		var ctx2 = canvas2.getContext('2d');
        canvas2.width = w;
        canvas2.height = h;
        ctx2.putImageData(dataImg,0,0,0,0,canvas2.width,canvas2.height);
        var img2 = canvas2.toDataURL("image/png");
        console.log(img2)
        var canvas3 = document.createElement("canvas");
        canvas3.width = w;
        canvas3.height = h;
        var cxt3 = canvas3.getContext("2d");
        var img3 = new Image();
        img3.src = img2;
        img3.onload  = function(){
            cxt3.drawImage(img3,0, 0,canvas3.width,canvas3.height)
        }
        self.cutImg = img2;
	}
	
	/**
	  * 制作椭圆 
	  */
    Correct.prototype.bezierEllipse = function (obj) {
    	var x = obj.x, y = obj.y, a = obj.a, b = obj.b, docX = obj.docX, docY = obj.docY;
    	var self = this;
//  	self.executionArray.push({
//			method: 'bezierEllipse',
//			params: {
//				x: x,
//				y: y,
//				a: a,
//				b: b
//			}
//		})
    	var ctx = self.ctx;
        x += (docX || 0) - self.gbcr.left;
        y += (docY || 0) - self.gbcr.top;
        
        var k = .5522848,
            ox = a * k, // 水平控制点偏移量
            oy = b * k; // 垂直控制点偏移量
        ctx.beginPath();
        //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
        ctx.strokeStyle = self.circleColor;
        ctx.lineWidth = self.lineWidth;
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.stroke();
        self.executionArray.push({
			img: self.canvas.toDataURL("image/png")
		});
    }
    
    /**
   	  * 画笔开始
      */
    Correct.prototype.drawLineStart = function (obj) {
    	var x = obj.x;
    	var y = obj.y;
    	var self = this;
//  	self.executionArray.push({
//			method: 'drawLineStart',
//			params: {
//				x: x,
//				y: y
//			}
//		})
        var ctx = self.ctx;
    	x -= self.gbcr.left;
        y -= self.gbcr.top;
        ctx.isActLine = true;
    	ctx.strokeStyle = self.actFontColor;
    	ctx.beginPath();
        ctx.moveTo(x , y);
    }
    
    /**
   	  * 画笔移动
      */
    Correct.prototype.drawLineMove = function (obj) {
    	var x = obj.x;
    	var y = obj.y;
    	var self = this;
//  	self.executionArray.push({
//			method: 'drawLineMove',
//			params: {
//				x: x,
//				y: y
//			}
//		})
        var ctx = self.ctx;
        x -= self.gbcr.left;
        y -= self.gbcr.top;
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // 橡皮擦效果
//      ctx.save()  
//      ctx.beginPath()  
//      ctx.arc(x,y,10,0,2*Math.PI);  
//      ctx.clip()  
//      ctx.clearRect(0,0,self.canW,self.canH);  
//      ctx.restore();  
    }
    
    /**
   	  * 画笔结束
      */
    Correct.prototype.drawLineEnd = function (obj) {
    	var self = this;
    	
        var ctx = self.ctx;
        ctx.isActLine = false;
        self.executionArray.push({
			img: self.canvas.toDataURL("image/png")
		});
    }
    
    /**
   	  * 画矩形开始
      */
    Correct.prototype.drawRectangleStart = function (obj) {
    	var x = obj.x;
    	var y = obj.y;
    	var self = this;
//  	self.executionArray.push({
//			method: 'drawRectangleStart',
//			params: {
//				x: x,
//				y: y
//			}
//		})
        var ctx = self.ctx;
        ctx.isActRectangle = true;
    	ctx.strokeStyle = self.actFontColor;
    }
    
    /**
   	  * 画矩形移动
      */
    Correct.prototype.drawRectangleMove = function (x, y) {
//  	var self = this;
//      var ctx = self.ctx;
//      var x1 = self.startX;
//      var y1 = self.startY;
//      var x2 = x1 - self.gbcr.left;
//      var y2 = y1 - self.gbcr.top;
//      var w = x - x1;
//      var h = y - y2;
//      ctx.beginPath();
//      ctx.moveTo(x2, y2);
//      ctx.lineTo(x2 + w, y2);
//      ctx.lineTo(x2 + w, y2 + h);
//      ctx.lineTo(x2, y2 + h);
//      ctx.closePath();
//      ctx.stroke();
    }
    
    /**
   	  * 画矩形结束
      */
    Correct.prototype.drawRectangleEnd = function (obj) {
    	var x = obj.x;
    	var y = obj.y;
    	var self = this;
    	
        var ctx = self.ctx;
        var x1 = self.startX;
        var y1 = self.startY;
        var x2 = x1 - self.gbcr.left;
        var y2 = y1 - self.gbcr.top;
        var w = x - x1;
        var h = y - y1;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 + w, y2);
        ctx.lineTo(x2 + w, y2 + h);
        ctx.lineTo(x2, y2 + h);
        ctx.closePath();
        ctx.stroke();
        ctx.isActRectangle = false;
        self.executionArray.push({
			img: self.canvas.toDataURL("image/png")
		});
    }
    
    /**
   	  * 制作文本
      */
    Correct.prototype.drawText = function (obj) {
    	var text = obj.text, docX = obj.docX, docY = obj.docY;
    	var self = this;
    	
    	var ctx = self.ctx;
        var gbcr = document.querySelector('#'+self.id).getBoundingClientRect();
        var x = self.startX + (docX || 0) - gbcr.left;
        var y = self.startY + (docY || 0) - gbcr.top;
        var a = 10;
        var b = 10;
        var ox = 5;
        var oy = 5;
        
        // 添加知识点列表
        ctx.font = this.font;
        ctx.fillStyle = this.actFontColor;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
      	ctx.fillText(text, x + ox, y + b - oy / 3);
      	self.executionArray.push({
			img: self.canvas.toDataURL("image/png")
		})
    }
    
    /**
   	  * 制作文本
      */
//  Correct.prototype.drawText = function (text, docX, docY) {
//  	var self = this;
//  	var ctx = self.ctx;
//      var bgColor = self.bgColor;
//      var fontColor = self.actFontColor;
//      var fontSize = self.fontSize;
//      var lineWidth = self.lineWidth;
//      var gbcr = document.querySelector('#'+self.id).getBoundingClientRect();
//      var x = self.startX + (docX || 0) - gbcr.left;
//      var y = self.startY + (docY || 0) - gbcr.top;
//      var a = 10;
//      var b = 10;
//      var ox = 5;
//      var oy = 5;
//      var p = self.listP;
//      var r = self.listR;
//      var m = self.listM;
//      var d = 10;
//      var w = ctx.measureText(text).width;
//      var h = 30;
//      ctx.font = '12px serif';
//  	// 添加知识点列表背景
//      ctx.beginPath();
//      ctx.strokeStyle = fontColor;
//      ctx.moveTo(x + ox + m, y + b - oy / 3);
//      ctx.lineTo(x + ox + m*2 + w + p * 5 + d, y + b - oy / 3);
//      ctx.lineTo(x + ox + m*2 + w + p * 5 + d, y + b - oy / 3 + h);
//      ctx.lineTo(x + ox + m, y + b - oy / 3 + h);
//      ctx.closePath();
//      ctx.stroke();
//
//      // 添加知识点列表
//      ctx.fillStyle = fontColor;
//      
//      ctx.textAlign = 'left';
//      
//      ctx.textBaseline = 'top';
//    	ctx.fillText(text, x + ox + m + p * 2.5 + d, y + b - oy / 3 + p);
//    	ctx.beginPath();
//    	ctx.arc(x + ox + m + p * 2.5, y + b - oy / 3 + p * 2.5, d / 3, 0, Math.PI * 2);
//   	ctx.closePath();
//    	ctx.fill();
//  }
    
    /**
   	  * 制作知识点
      */
    Correct.prototype.knowledgeList = function (obj) {
    	var act = obj.act, docX = obj.docX, docY = obj.docY;
    	var self = this;
//  	self.executionArray.push({
//			method: 'knowledgeList',
//			params: {
//				act: act,
//				docX: docX,
//				docY: docY
//			}
//		})
    	var obj = self.actKnowledgPoint;
    	var ctx = self.ctx;
        var bgColor = self.bgColor;
        var fontColor = self.fontColor;
        var fontSize = self.fontSize;
        var lineWidth = self.lineWidth;
        var gbcr = document.querySelector('#'+self.id).getBoundingClientRect();
        var list = act || []
        var x = obj.x + (docX || 0) - gbcr.left;
        var y = obj.y + (docY || 0) - gbcr.top;
        var a = obj.a;
        var b = obj.b;
        var ox = obj.ox;
        var oy = obj.oy;
        var p = self.listP;
        var r = self.listR;
        var m = self.listM;
        var d = 10;
        var w = 0;
        var h = 30;
        for (var i in list) {
          var cw = ctx.measureText(list[i]).width;
          w = w < cw ? cw : w;
        }

        ctx.lineWidth = lineWidth;
        // 添加按钮背景
        ctx.beginPath();
        ctx.fillStyle = bgColor;
        ctx.arc(x + ox, y + b - oy / 3, r / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = fontColor;
        ctx.arc(x + ox, y + b - oy / 3, r / 4, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        // 添加知识点列表背景
        ctx.beginPath();
        ctx.fillStyle = bgColor;
        ctx.moveTo(x + ox + m, y + b - oy / 3);
        ctx.lineTo(x + ox + m*2 + w + p * 5 + d, y + b - oy / 3);
        ctx.lineTo(x + ox + m*2 + w + p * 5 + d, y + b - oy / 3 + h * list.length);
        ctx.lineTo(x + ox + m, y + b - oy / 3 + h * list.length);
        ctx.closePath();
        ctx.fill();

        // 添加知识点列表
        ctx.fillStyle = fontColor;
        
        ctx.textAlign = 'left';
        ctx.font = '12px serif';
        ctx.textBaseline = 'top';
        for (var i in list) {
          ctx.fillText(list[i], x + ox + m + p * 2.5 + d, y + b - oy / 3 + p + h * i);
          ctx.beginPath();
          ctx.arc(x + ox + m + p * 2.5, y + b - oy / 3 + p * 2.5 + h * i, d / 3, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
        self.executionArray.push({
			img: self.canvas.toDataURL("image/png")
		})
    };
    
    /**
      * 手势开始 
      */
    Correct.prototype.mousedown = function (e, that) {
    	var self = this
    	self.gbcr = document.getElementById(self.id).getBoundingClientRect();
    	if (self.isActText) {
	    	return;
	    }
        var x = Math.round(e.clientX);
        var y = Math.round(e.clientY);
	    self.startX = x;
	    self.startY = y;
	    $('.canvas-btns').addClass('active');
	    
	    if (self.isLine) {
	    	self.drawLineStart({x: x, y: y});
	    	return self;
	    }
	    
	    if (self.isRectangle) {
	    	self.drawRectangleStart({x: x, y: y});
	    	return self;
	    }
	    
	    if (self.isText) {
	    	var gbcr = document.querySelector('#'+self.id).getBoundingClientRect();
	    	x -= gbcr.left;
	    	y -= gbcr.top;
	    	var h = "<div id='tempTextBox' style='position: absolute; top: "+y+"px; left: "+x+"px;'>"+
	    				"<div style='border: solid 1px #ff5050; width: 200px;'><input style='background: rgba(255,255,255,.1); font-size: 14px; color: #ff5050; border: none; outline: none; padding: 5px;width: 100%; height: 100%;' type='text' id='tempTextVal'/></div>"+
	    			"</div>";
	    	$('#'+self.id).parent().append(h);
	    	self.isActText = true;
	    	$('#tempTextVal').on('blur', function(e){
	    		var val = $(this).val();
	    		self.drawText({text: val});
	    		self.isActText = false;
	    		$('#tempTextBox').remove();
	    	});
	    	return self;
	    }
	    
	    if (self.isKnowledge) {
	    	var a = 10;
	    	var b = 10;
	    	var k = .5522848,
            ox = a * k, // 水平控制点偏移量
            oy = b * k; 
            
            self.actKnowledgPoint = {
            	x: x, y: y, a: a, b: b, ox: ox, oy: oy
            };
            self.isActKnowledge = true;
            return self;
	    }
	    
    };

	/**
	  * 手势移动 
	  */
    Correct.prototype.mousemove = function (e, that) {
    	var self = this
    	var x = Math.round(e.clientX);
        var y = Math.round(e.clientY);
        var docW = self.docW;
        var docH = self.docH;
        var docX = self.docX;
        var docY = self.docY;
        var canW = self.canW;
        var canH = self.canH;
        var startX = self.startX;
        var startY = self.startY;
        var endX = self.endX;
        var endY = self.endY;
        var speed = self.speed;
        self.endX = endX = x;
        self.endY = endY = y;
	    var x1 = docX + (endX - startX) / speed;
	    var y1 = docY + (endY - startY) / speed;
	    var minX = -Math.abs(docW - canW);
	    var minY = -Math.abs(docH - canH);
	    var maxX = Math.abs(docW - canW);
	    var maxY = Math.abs(docH - canH);
	    
	    if (self.isLine || self.isRectangle || self.isCircle || self.isKnowledge || self.isText) {
	    	if (self.isLine) {
		    	self.drawLineMove({x: x, y: y});
		    	return self;
		    }
	    	if (self.isRectangle) {
		    	self.drawRectangleMove(x, y);
		    	return self;
		    }
	    	return self;
	    }
	    
//		if (self.zoomIndex * self.zoom >= 1) {
//			self.docX = x1 > 0 ? 0 : x1 < minX ? minX : x1 > maxX ? maxX : x1;
//	    	self.docY = y1 > 0 ? 0 : y1 < minY ? minY : y1 > maxY ? maxY : y1;
//		} else {
			self.docX = x1 < 1.5 * minX ? 1.5 * minX : x1 > 1.5 * maxX ? 1.5 * maxX : x1;
	    	self.docY = y1 < 1.5 * minY ? minY : y1 > 1.5 * maxY ? maxY : y1;
//		}
	    self.drawImage({type: 1});
	    return self;
    };

    /**
      * 手势结束 
      */
    Correct.prototype.mouseup = function (e) {
    	var self = this
    	var x = Math.round(e.clientX);
        var y = Math.round(e.clientY);
        var startX = self.startX;
        var startY = self.startY;
        var endX = self.endX;
        var endY = self.endY;
        self.endX = endX = x;
        self.endY = endY = y;
        
        if (self.isLine) {
	    	self.drawLineEnd({x: x, y: y});
    		return self;
	    }
        
        if (self.isRectangle) {
        	self.drawRectangleEnd({x: x, y: y});
        	return self;
        }
        
        if (self.isCircle) {
            var x1 = (endX - startX) / 2 + startX;
            var y1 = (endY - startY) / 2 + startY;
            var a = Math.abs(endX - startX);
            var s = Math.abs(endY - startY) / Math.abs(endX - startX);
            var b = a * (s * 10 < 5 ? 0.5 : s * 10 > 20 ? 2 : s);
            if (a < 10 || b < 10) {
              return;
            }
            self.bezierEllipse({
            	x: x1, y: y1, a: a, b: b
            });
            return;
        }
   	};
    return Correct;
})));

$(function(){
	// 整个画布的父块级自定义宽高
	var width = $('.canvas-container').width();
	var height = Math.round(width / 4 * 3);
	$('.canvas-container').height(height);
	
	// 第一步截图初始化画布对象
	var correct = new Correct({
		canW: width,
		canH: height,
		id: 'correct',
		img: 'https://t.sharingschool.com/upload/2018/06/21/4530cd2eec0ab92b265e1593ac62a1fd1a412c658e37ea39004d22813c760f02.PNG',
//		img: 'image/test1.jpg',
		list: ['时间飞逝雷锋精神', '时间飞逝雷锋费老司机', '时间飞逝雷锋精神，设计费老司机', '设计费老司机']
	});
	// 并构写图片至画布上
	correct.drawImage();
	
	// 选择裁剪
	$(document).on('click', '#cropperBtn', function(e){
		if (!correct) {
			return;
		}
		var src = $(this).find('img').attr('src');
		if (!correct.isCut) {
			correct.isCut = true;
			$('.canvas-mask').addClass('active');
			$(this).find('img').attr('src', 'image/tools_cut copy@2x.png');
		} else {
			correct.isCut = false;
			$('.canvas-mask').removeClass('active');
			$(this).find('img').attr('src', 'image/tools_cut@2x.png');
		}
	});
	
	// 放大
	$(document).on('click', '#scaleMax', function(e){
		if (!correct) {
			return;
		}
		correct.zoomOutImage();
	});
	
	// 缩小
	$(document).on('click', '#scaleMin', function(e){
		if (!correct) {
			return;
		}
		correct.zoomInImage();
	});
	
	// 第一步截图画布绑定鼠标按下事件
	$('#correct').mousedown(function(e){
		if (!correct) {
			return;
		}
		correct.mousedown(e);
		
		// 第一步截图画布绑定鼠标按下移动事件
		$(this).mousemove(function(e){
			correct.mousemove(e);
		});
	});
	
	// 第一步截图画布绑定鼠标弹起事件
	$('#correct').mouseup(function(e){
		e.stopPropagation();
		if (!correct) {
			return;
		}
		$(this).unbind('mousemove');
		correct.mouseup(e);
	});
	
	// 第一步截图画布绑定鼠标移开目标画图事件
	$('#correct').mouseleave(function(e){
		e.stopPropagation();
		if (!correct) {
			return;
		}
		$(this).unbind('mousemove');
		correct.mouseup(e);
	});
	
	// 临时截图块的首次按下坐标maskX1, maskY1，是否存在临时截图块hasEditMask
	var maskX1, maskY1,hasEditMask = false, maskTop, maskLeft;
	// 鼠标按下开始画裁剪框弹
	$(document).on('mousedown', '.canvas-mask',function(e){
		e.preventDefault();
		if (hasEditMask) {
			return
		}
		var gbcr = document.querySelector('#'+correct.id).getBoundingClientRect();
		maskX1 = e.clientX;
		maskY1 = e.clientY;
		$(this).mousemove(function(e){
			var maskX2 = e.clientX;
			var maskY2 = e.clientY;
			var x = Math.min(maskX1, maskX2) - gbcr.left;
			var y = Math.min(maskY1, maskY2) - gbcr.top;
			var w = Math.abs(maskX2 - maskX1);
			var h = Math.abs(maskY2 - maskY1);
			$(this).find('.canvas-mask-text').css({'top': y + 'px', 'left': x + 'px', 'width': w + 'px', 'height': h + 'px'});
			correct.cutX = x;
			correct.cutY = y;
			correct.cutW = w;
			correct.cutH = h;
			correct.previewCut();
		})
	})
	
	// 鼠标画完裁剪框弹起
	$(document).on('mouseup','.canvas-mask',function(e){
		e.stopPropagation();
		if (hasEditMask) {
			return
		}
		$(this).unbind('mousemove');
		var gcbr = document.querySelector('#'+correct.id).getBoundingClientRect();
		var maskX2 = e.clientX
		var maskY2 = e.clientY
		var x = Math.min(maskX1, maskX2) - gcbr.left;
		var y = Math.min(maskY1, maskY2) - gcbr.top;
		maskLeft = x;
		maskTop = y
		var w = Math.abs(maskX2 - maskX1);
		var h = Math.abs(maskY2 - maskY1);
		hasEditMask = true;
		$(this).find('.canvas-mask-edit').addClass('active');
		$(this).find('.canvas-mask-direction').addClass('active');
		$(this).find('.canvas-mask-text').css({'top': y + 'px', 'left': x + 'px', 'width': w + 'px', 'height': h + 'px'});
		correct.cutX = x;
		correct.cutY = y;
		correct.cutW = w;
		correct.cutH = h;
		correct.previewCut();
	})
	
	// 临时截图块的移动首次坐标moveMaskX1, moveMaskY1;
	var moveMaskX1, moveMaskY1;
	// 已经生产的裁剪框做移动，鼠标按下事件
	$(document).on('mousedown', '.canvas-mask .canvas-mask-text',function(e){
		if (!hasEditMask) {
			return
		}
		moveMaskX1 = e.clientX;
		moveMaskY1 = e.clientY;
		$(this).mousemove(function(e){
			if (!hasEditMask) {
				return
			}
			var maskX2 = e.clientX + maskLeft;
			var maskY2 = e.clientY + maskTop;
			var x = (maskX2 - moveMaskX1);
			var y = (maskY2 - moveMaskY1);

			$(this).css({'top': y + 'px', 'left': x + 'px'});
			correct.cutX = x;
			correct.cutY = y;
			correct.previewCut();
		})
	})
	
	// 已经生产的裁剪框做移动，鼠标弹起事件
	$(document).on('mouseup', '.canvas-mask .canvas-mask-text',function(e){
		e.stopPropagation();
		$(this).unbind('mousemove');
		var maskX2 = e.clientX + maskLeft;
		var maskY2 = e.clientY + maskTop;
		var x = (maskX2 - moveMaskX1) ;
		var y = (maskY2 - moveMaskY1) ;
		maskLeft = x;
		maskTop = y;
		$(this).css({'top': y + 'px', 'left': x + 'px'});
		correct.cutX = x;
		correct.cutY = y;
		correct.previewCut();
	})
	
	// 已经生产的裁剪框做移动，鼠标离开目标元素事件
	$(document).on('mouseleave', '.canvas-mask .canvas-mask-text',function(e){
		e.stopPropagation();
		$(this).unbind('mousemove');
	})
	
	// 点击原点增加大小边框
//	$(document).on('mousedown', '.canvas-mask .canvas-mask-direction-item',function(e){
//		var tar = $(e.target);
//		var tarIdx = (function(tar){
//			var arr = [1,2,3,4,5,6,7,8];
//			var index = 0
//			for (var i in arr) {
//				if (tar.is('.cmdi-'+arr[i])) {
//					index = arr[i];
//					break;
//				}
//			}
//			return index;
//		})(tar);
//		var fn = function (n) {
//			switch (n){
//				case 1:
//					
//					break;
//				default:
//					break;
//			}
//		}(tarIdx)
//		console.log(tarIdx)
//		if (!hasEditMask) {
//			return
//		}
//		moveMaskX1 = e.clientX;
//		moveMaskY1 = e.clientY;
//		$(this).mousemove(function(e){
//			if (!hasEditMask) {
//				return
//			}
//			var maskX2 = e.clientX + maskLeft;
//			var maskY2 = e.clientY + maskTop;
//			var x = (maskX2 - moveMaskX1);
//			var y = (maskY2 - moveMaskY1);
//
//			$(this).css({'top': y + 'px', 'left': x + 'px'});
//			correct.cutX = x;
//			correct.cutY = y;
//			correct.previewCut();
//		})
//	})
	
	// 裁剪取消
	$(document).on('mouseup', '.canvas-mask .canvas-mask-text .canvas-mask-cancel', function(e) {
		e.stopPropagation();
		hasEditMask = false;
		$('.canvas-mask-edit').removeClass('active');
		$('.canvas-mask-direction').removeClass('active');
		$('.canvas-mask-text').css({'top': '0px', 'left': '0px', 'width': '0px', 'height': '0px'});
	})
	
	// 裁剪确认
	$(document).on('mouseup', '.canvas-mask .canvas-mask-text .canvas-mask-true', function(e) {
		e.stopPropagation();
		// 获取裁剪图片
		var img = correct.cutImg;
		console.log(img)
		var h = '<div class="card-li-img">'+
					'<img class="card-li-photo" src="'+img+'"/>'+
					'<img class="card-li-cancel" src="image/del@2x.png"/>'+
				'</div>';
		$('.card-li-imgs').append(h);
		
		hasEditMask = false;
		$('.canvas-mask-edit').removeClass('active');
		$('.canvas-mask-direction').removeClass('active');
		$('.canvas-mask-text').css({'top': '0px', 'left': '0px', 'width': '0px', 'height': '0px'});
		
	})
	
	
	/*=======================以下为第二步骤=========================================*/
	
	// 第二步选择要批改的图片
	var correct2;
	$(document).on('click', '#checkImg .card-li-img', function(e){
		var tar = $(e.target);
		if (tar.is('.card-li-cancel')) {
			$(this).remove();
			return;
		}
		var img = $(this).find('.card-li-photo').attr('src');
		$(this).addClass('active').siblings().removeClass('active');
		correct2 = new Correct({
			canW: width,
			canH: height,
			id: 'correct_knowledge',
			img: img,
			list: ['时间飞逝雷锋精神', '时间飞逝雷锋费老司机', '时间飞逝雷锋精神，设计费老司机', '设计费老司机']
		});
		correct2.clearAll();
		correct2.drawImage();
	});
	
	// 第二步选择错题归类原因
	$('.card-li-items .card-li-item').click(function(e){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	// 第二步选择关联错题知识点
	$('.fixed-well .fixed-well-cell').click(function(e){
		var src = $(this).find('img').attr('src');
		if (src == 'image/normal.png') {
			$(this).find('img').attr('src', 'image/selected.png');
		} else {
			$(this).find('img').attr('src', 'image/normal.png');
		}
	});
	
	// 加载全部关联错题知识点
	$('#loadMoreKnowledge').click(function(e){
		
	});
	
	// 收起关联错题知识点
	$('.fixed-right-text').click(function(){
		if (!$(this).parent().hasClass('active')) {
			$(this).text('<<')
		} else {
			$(this).text('>>')
		}
		$(this).parent().toggleClass('active')
		$(this).parents('.fixed-container').toggleClass('active')
	})
	
	// 第二步图片编辑画布选择画笔按钮
	$(document).on('click', '#lineBtn', function(e){
		if (!correct2) {
			return;
		}
		var src = $(this).find('img').attr('src');
		if (!correct2.isLine) {
			$(this).find('img').attr('src', 'image/brush_nor copy.png');
			correct2.isLine = true;
			
			correct2.isCircle = false;
			correct2.isRectangle = false;
			correct2.isText = false;
			correct2.isKnowledge = false;
			$('#circleBtn').find('img').attr('src', 'image/tools_circular@2x.png');
			$('#rectangleBtn').find('img').attr('src', 'image/tools_rectangle@2x.png');
			$('#textBtn').find('img').attr('src', 'image/tools_text@2x.png');
			$('#knowledgeBtn').find('img').attr('src', 'image/tools_point@2x.png');
		} else {
			correct2.isLine = false;
			$(this).find('img').attr('src', 'image/brush_nor.png');
		}
	});
	
	// 第二步图片编辑画布选择矩形按钮
	$(document).on('click', '#rectangleBtn', function(e){
		if (!correct2) {
			return;
		}
		var src = $(this).find('img').attr('src');
		if (!correct2.isRectangle) {
			$(this).find('img').attr('src', 'image/tools_rectangle copy@2x.png');
			correct2.isRectangle = true;
			
			correct2.isLine = false;
			correct2.isCircle = false;
			correct2.isText = false;
			correct2.isKnowledge = false;
			$('#lineBtn').find('img').attr('src', 'image/brush_nor.png');
			$('#circleBtn').find('img').attr('src', 'image/tools_circular@2x.png');
			$('#textBtn').find('img').attr('src', 'image/tools_text@2x.png');
			$('#knowledgeBtn').find('img').attr('src', 'image/tools_point@2x.png');
		} else {
			correct2.isRectangle = false;
			$(this).find('img').attr('src', 'image/tools_rectangle@2x.png');
		}
	});
	
	// 第二步图片编辑画布选择画圈按钮
	$(document).on('click', '#circleBtn', function(e){
		if (!correct2) {
			return;
		}
		var src = $(this).find('img').attr('src');
		if (!correct2.isCircle) {
			$(this).find('img').attr('src', 'image/tools_circular copy@2x.png');
			correct2.isCircle = true;
			
			correct2.isLine = false;
			correct2.isRectangle = false;
			correct2.isText = false;
			correct2.isKnowledge = false;
			$('#lineBtn').find('img').attr('src', 'image/brush_nor.png');
			$('#rectangleBtn').find('img').attr('src', 'image/tools_rectangle@2x.png');
			$('#textBtn').find('img').attr('src', 'image/tools_text@2x.png');
			$('#knowledgeBtn').find('img').attr('src', 'image/tools_point@2x.png');
		} else {
			correct2.isCircle = false;
			$(this).find('img').attr('src', 'image/tools_circular@2x.png');
		}
	});
	
	// 第二步图片编辑画布选择文本编辑按钮
	$(document).on('click', '#textBtn', function(e){
		if (!correct2) {
			return;
		}
		var src = $(this).find('img').attr('src');
		if (!correct2.isText) {
			$(this).find('img').attr('src', 'image/tools_text copy@2x.png');
			correct2.isText = true;
			
			correct2.isCircle = false;
			correct2.isLine = false;
			correct2.isRectangle = false;
			correct2.isKnowledge = false;
			$('#lineBtn').find('img').attr('src', 'image/brush_nor.png');
			$('#rectangleBtn').find('img').attr('src', 'image/tools_rectangle@2x.png');
			$('#knowledgeBtn').find('img').attr('src', 'image/tools_point@2x.png');
			$('#circleBtn').find('img').attr('src', 'image/tools_circular@2x.png');
		} else {
			correct2.isText = false;
			$(this).find('img').attr('src', 'image/tools_text@2x.png');
		}
	});
	
	// 第二步图片编辑画布选择知识点编辑按钮
	$(document).on('click', '#knowledgeBtn', function(e){
		if (!correct2) {
			return;
		}
		var src = $(this).find('img').attr('src');
		if (!correct2.isKnowledge) {
			$(this).find('img').attr('src', 'image/tools_point copy@2x.png');
			correct2.isKnowledge = true;
			
			correct2.isLine = false;
			correct2.isRectangle = false;
			correct2.isCircle = false;
			correct2.isText = false;
			$('#lineBtn').find('img').attr('src', 'image/brush_nor.png');
			$('#rectangleBtn').find('img').attr('src', 'image/tools_rectangle@2x.png');
			$('#circleBtn').find('img').attr('src', 'image/tools_circular@2x.png');
			$('#textBtn').find('img').attr('src', 'image/tools_text@2x.png');
			
		} else {
			correct2.isKnowledge = false;
			$(this).find('img').attr('src', 'image/tools_point@2x.png');
		}
	});
	
	// 第二步图片编辑画布放大
	$(document).on('click', '#scaleMaxTwo', function(e){
		if (!correct2) {
			return;
		}
		correct2.zoomOutImage();
	});
	
	// 第二步图片编辑画布缩小
	$(document).on('click', '#scaleMinTwo', function(e){
		if (!correct2) {
			return;
		}
		correct2.zoomInImage();
	});
	
	// 第二步图片编辑画布撤回上一步
	$(document).on('click', '#recallBtn', function(e){
		if (!correct2) {
			return;
		}
		correct2.recall();
	});
	
	// 第二步图片编辑画布绑定鼠标按下事件
	$('#correct_knowledge').mousedown(function(e){
		if (!correct2) {
			return;
		}
		correct2.mousedown(e);
		
		// 第二步图片编辑画布绑定鼠标按下后移动事件
		$(this).mousemove(function(e){
			correct2.mousemove(e);
		});
	});
	
	// 第二步图片编辑画布绑定鼠标弹起事件
	$('#correct_knowledge').mouseup(function(e){
		e.stopPropagation();
		if (!correct2) {
			return;
		}
		$(this).unbind('mousemove');
		correct2.mouseup(e);
	});
	
	// 第二步图片编辑画布绑定鼠标移开目标元素事件
	$('#correct_knowledge').mouseleave(function(e){
		e.stopPropagation();
		if (!correct2) {
			return;
		}
		$(this).unbind('mousemove');
	});
	
	// 第二步图片编辑画布添加知识点事件
	$('#knowledgeSubmitBtn').click(function(e){
		if (!correct2 || !correct2.actKnowledgPoint || !correct2.isActKnowledge) {
			return;
		}
		// 所要描绘的知识点列表
		var doc = $('.fixed-well-cell');
		var arr = [];
		for (var i in doc) {
			var src = doc.eq(i).find('img').attr('src');
			if (src == 'image/selected.png') {
				arr.push(doc.eq(i).find('span').text())
			}
		}
		if (arr.length > 0) {
			correct2.knowledgeList({act: arr});
			correct2.isActKnowledge = false;
		}
		
		/*
		 * 这里可以做些其他事情 比如取消添加知识点弹框
		 * 
		 * */
	});
	
	// 第二步图片编辑画布取消添加知识点事件
	$('#knowledgeCancelBtn').click(function(e){
		if (!correct2 || !correct2.actKnowledgPoint || !correct2.isActKnowledge) {
			return;
		}
		correct2.isActKnowledge = false;
		
		/*
		 * 这里可以做些其他事情 比如取消添加知识点弹框
		 * 
		 * */
	});
	
	// 第二步图片编辑画布取消编辑并导出图片
	$('#cancelSaveBtn').click(function(e){
		if (!correct2) {
			return;
		}
		correct2.clearAll();
		$('.canvas-btns').removeClass('active');
	});
	
	// 第二步图片编辑画布保存编辑并导出图片
	$('#saveBtn').click(function(e){
		if (!correct2) {
			return;
		}
		var img = correct2.exportImg();
		$('#checkImg .card-li-img.active .card-li-photo').attr('src', img);
		$('#checkImg .card-li-img.active').append('<img class="card-li-icon" src="image/correct_true@2x.png"/>');
		correct2.clearAll();
		$('.canvas-btns').removeClass('active');
	});
})
